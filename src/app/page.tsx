"use client";

import { useEffect, useMemo, useState } from "react";
import {
  BRANDS,
  type Phase,
  type Selection,
  STEPS,
} from "@/lib/configurator-data";
import { getSupabaseClient } from "@/lib/supabase";

type View = "builder" | "summary" | "compare";

type Selections = Record<string, Selection>;

type SavedPlan = {
  id: string;
  sessionCode: string;
  name: string;
  selections: Selections;
  total: number;
  createdAt: string;
};

type SupabasePlanRow = {
  id: string;
  session_code: string;
  name: string;
  selections: Selections;
  total: number;
  created_at: string;
};

const PHASES: Phase[] = [1, 2, 3];

function formatMoney(value: number) {
  if (value === 0) return "Incl.";
  return `$${value.toLocaleString()}`;
}

function recommendationTag(rec?: "pick" | "value" | "upgrade") {
  if (rec === "pick") return { className: "tag-rec", label: "Our pick" };
  if (rec === "value") return { className: "tag-value", label: "Best value" };
  if (rec === "upgrade") return { className: "tag-upgrade", label: "Upgrade" };
  return null;
}

function getTotal(selections: Selections) {
  return STEPS.reduce((sum, step) => {
    const selected = selections[step.id];
    if (!selected) return sum;
    return sum + step.options[selected.idx].price;
  }, 0);
}

function randomCode() {
  return `plan-${crypto.randomUUID().split("-")[0]}`;
}

function getStorageKey(sessionCode: string) {
  return `van-configurator:${sessionCode}`;
}

function getInitialSession() {
  if (typeof window === "undefined") {
    return { sessionCode: "", shareUrl: "" };
  }

  const url = new URL(window.location.href);
  let code = url.searchParams.get("session");

  if (!code) {
    code = randomCode();
    url.searchParams.set("session", code);
    window.history.replaceState({}, "", url);
  }

  return {
    sessionCode: code,
    shareUrl: url.toString(),
  };
}

function getInitialLocalPlans(sessionCode: string): SavedPlan[] {
  if (typeof window === "undefined" || !sessionCode) return [];
  const localRaw = window.localStorage.getItem(getStorageKey(sessionCode));
  if (!localRaw) return [];

  try {
    return JSON.parse(localRaw) as SavedPlan[];
  } catch {
    window.localStorage.removeItem(getStorageKey(sessionCode));
    return [];
  }
}

export default function Home() {
  const initialSession = getInitialSession();
  const [view, setView] = useState<View>("builder");
  const [currentStep, setCurrentStep] = useState(0);
  const [selections, setSelections] = useState<Selections>({});
  const [savedPlans, setSavedPlans] = useState<SavedPlan[]>(() =>
    getInitialLocalPlans(initialSession.sessionCode),
  );
  const [sessionCode] = useState(initialSession.sessionCode);
  const [shareUrl] = useState(initialSession.shareUrl);
  const [planName, setPlanName] = useState("");
  const [saveMessage, setSaveMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [skipWarnByStep, setSkipWarnByStep] = useState<Record<string, boolean>>({});

  const current = STEPS[currentStep];
  const runningTotal = useMemo(() => getTotal(selections), [selections]);

  useEffect(() => {
    if (!sessionCode) return;

    const fetchFromSupabase = async () => {
      const supabase = getSupabaseClient();
      if (!supabase) return;

      const { data, error } = await supabase
        .from("configurator_plans")
        .select("*")
        .eq("session_code", sessionCode)
        .order("created_at", { ascending: false });

      if (error || !data) return;

      const remotePlans = (data as SupabasePlanRow[]).map((row) => ({
        id: row.id,
        sessionCode: row.session_code,
        name: row.name,
        selections: row.selections,
        total: row.total,
        createdAt: row.created_at,
      }));

      setSavedPlans((existing) => {
        const merged = [...remotePlans];
        for (const existingPlan of existing) {
          if (!merged.some((plan) => plan.id === existingPlan.id)) {
            merged.push(existingPlan);
          }
        }
        merged.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
        return merged;
      });
    };

    void fetchFromSupabase();
  }, [sessionCode]);

  useEffect(() => {
    if (!sessionCode) return;
    window.localStorage.setItem(getStorageKey(sessionCode), JSON.stringify(savedPlans));
  }, [savedPlans, sessionCode]);

  function selectOption(stepId: string, idx: number) {
    setSkipWarnByStep((prev) => ({ ...prev, [stepId]: false }));
    setSelections((prev) => {
      const currentSelection = prev[stepId];
      if (currentSelection && currentSelection.idx === idx) {
        const clone = { ...prev };
        delete clone[stepId];
        return clone;
      }

      return {
        ...prev,
        [stepId]: { idx, phase: 1 },
      };
    });
  }

  function setPhase(stepId: string, phase: Phase) {
    setSelections((prev) => {
      if (!prev[stepId]) return prev;
      return {
        ...prev,
        [stepId]: {
          ...prev[stepId],
          phase,
        },
      };
    });
  }

  function clearStep(stepId: string) {
    setSelections((prev) => {
      const clone = { ...prev };
      delete clone[stepId];
      return clone;
    });
  }

  function autoBuild(mode: "low" | "high") {
    const next: Selections = {};

    for (const step of STEPS) {
      let selectedIdx = 0;
      let selectedPrice = step.options[0].price;

      step.options.forEach((option, idx) => {
        if (mode === "low" && option.price < selectedPrice) {
          selectedPrice = option.price;
          selectedIdx = idx;
        }
        if (mode === "high" && option.price > selectedPrice) {
          selectedPrice = option.price;
          selectedIdx = idx;
        }
      });

      next[step.id] = { idx: selectedIdx, phase: 1 };
    }

    setSelections(next);
    setCurrentStep(0);
    setView("summary");
    setSkipWarnByStep({});
    setSaveMessage(`${mode === "low" ? "Low-end" : "High-end"} baseline loaded.`);
  }

  function savePlan() {
    if (!sessionCode) return;

    const trimmedName = planName.trim();
    const name = trimmedName || `Plan ${savedPlans.length + 1}`;

    const plan: SavedPlan = {
      id: crypto.randomUUID(),
      sessionCode,
      name,
      selections,
      total: runningTotal,
      createdAt: new Date().toISOString(),
    };

    setIsSaving(true);
    setSaveMessage("");
    setSavedPlans((prev) => [plan, ...prev]);
    setPlanName("");

    const persist = async () => {
      const supabase = getSupabaseClient();
      if (!supabase) {
        setSaveMessage("Saved locally. Add Supabase env vars to sync online.");
        setIsSaving(false);
        return;
      }

      const { error } = await supabase.from("configurator_plans").insert({
        id: plan.id,
        session_code: plan.sessionCode,
        name: plan.name,
        selections: plan.selections,
        total: plan.total,
      });

      if (error) {
        setSaveMessage("Saved locally. Supabase sync failed.");
      } else {
        setSaveMessage("Plan saved and synced to Supabase.");
      }

      setIsSaving(false);
    };

    void persist();
  }

  function loadPlan(plan: SavedPlan) {
    setSelections(plan.selections);
    setView("summary");
    setCurrentStep(0);
    setSaveMessage(`Loaded "${plan.name}" for editing.`);
  }

  function resetAll() {
    setSelections({});
    setCurrentStep(0);
    setView("builder");
    setSkipWarnByStep({});
    setSaveMessage("");
  }

  function handleSkip() {
    const step = STEPS[currentStep];
    const selected = selections[step.id];
    const shouldWarn = step.critical && !selected && !skipWarnByStep[step.id];

    if (shouldWarn) {
      setSkipWarnByStep((prev) => ({ ...prev, [step.id]: true }));
      return;
    }

    setSkipWarnByStep((prev) => ({ ...prev, [step.id]: false }));
    setCurrentStep((prev) => Math.min(STEPS.length - 1, prev + 1));
  }

  const grouped = useMemo(() => {
    const byPhase: Record<Phase | "u", Array<{ stepId: string; idx: number }>> = {
      1: [],
      2: [],
      3: [],
      u: [],
    };

    STEPS.forEach((step) => {
      const selected = selections[step.id];
      if (!selected) {
        byPhase.u.push({ stepId: step.id, idx: -1 });
      } else {
        byPhase[selected.phase].push({ stepId: step.id, idx: selected.idx });
      }
    });

    return byPhase;
  }, [selections]);

  const phaseTotals = useMemo(() => {
    const totals: Record<Phase, number> = { 1: 0, 2: 0, 3: 0 };
    for (const step of STEPS) {
      const selected = selections[step.id];
      if (!selected) continue;
      totals[selected.phase] += step.options[selected.idx].price;
    }
    return totals;
  }, [selections]);

  const progressPct = ((currentStep + 1) / STEPS.length) * 100;

  return (
    <div className="app-shell">
      <header className="topbar">
        <div>
          <div className="logo">Hitch Up AZ - Van Build</div>
          <div className="title">Jenny&apos;s 2025 Sprinter 4x4 Configurator</div>
        </div>
        <div className="running-total">
          <div className="label">Running total</div>
          <div className="amount">${runningTotal.toLocaleString()}</div>
        </div>
      </header>

      {view === "builder" && (
        <>
          <div className="progress-wrap">
            <div className="progress-bar-track">
              <div className="progress-bar-fill" style={{ width: `${progressPct}%` }} />
            </div>
            <div className="progress-meta">
              <span>
                Step {currentStep + 1} of {STEPS.length}
              </span>
              <span>
                {current.jennyChoice ? "" : "Rapp handles - "}
                {current.section} - {current.label}
              </span>
            </div>
          </div>

          <main className="main">
            <section className="step active">
              <div className="step-badge">
                {current.jennyChoice
                  ? `${current.section} - ${current.label}`
                  : `Rapp handles - ${current.section} - ${current.label}`}
              </div>
              <h1 className="step-question">{current.question}</h1>
              <div className="rec-callout">
                <strong>Our recommendation:</strong> {current.callout}
              </div>
              <p className="step-context">{current.context}</p>
              {current.critical && skipWarnByStep[current.id] && (
                <div className="skip-warn visible">
                  <strong>This is important to decide.</strong> Skipping means we&apos;ll need
                  to revisit it before ordering. Tap Skip again to continue anyway.
                </div>
              )}

              <div className="options-grid">
                {current.options.map((option, idx) => {
                  const selected = selections[current.id];
                  const isSelected = selected?.idx === idx;
                  const phase = selected?.phase ?? 0;
                  const recTag = recommendationTag(option.recommendation);

                  return (
                    <div
                      key={`${current.id}-${option.label}`}
                      className={`opt-card ${isSelected ? `selected-p${phase}` : ""} ${option.recommendation === "pick" ? "is-rec" : ""}`}
                      onClick={() => selectOption(current.id, idx)}
                    >
                      <div className="opt-tags">
                        {option.brand && (
                          <span className={`tag t-${option.brand}`}>{BRANDS[option.brand]}</span>
                        )}
                        {recTag && <span className={`tag ${recTag.className}`}>{recTag.label}</span>}
                      </div>

                      <div className="opt-card-top">
                        <span className="opt-card-name">{option.label}</span>
                        <span className="opt-card-price">{formatMoney(option.price)}</span>
                      </div>

                      <p className="opt-card-desc">{option.note}</p>

                      {isSelected && (
                        <div className="phase-picker" onClick={(event) => event.stopPropagation()}>
                          <span className="phase-picker-label">When do you want this?</span>
                          {PHASES.map((phaseOption) => (
                            <button
                              key={phaseOption}
                              type="button"
                              className={`ph-btn ${selected.phase === phaseOption ? `active-p${phaseOption}` : ""}`}
                              onClick={() => setPhase(current.id, phaseOption)}
                            >
                              {phaseOption === 1
                                ? "Now"
                                : phaseOption === 2
                                  ? "6 months"
                                  : "1 year"}
                            </button>
                          ))}
                          <button
                            type="button"
                            className="ph-desel"
                            onClick={() => clearStep(current.id)}
                          >
                            x
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          </main>

          <footer className="bottomnav">
            <button
              className="btn-back"
              type="button"
              onClick={() => {
                setSkipWarnByStep((prev) => ({ ...prev, [current.id]: false }));
                setCurrentStep((prev) => Math.max(0, prev - 1));
              }}
              disabled={currentStep === 0}
            >
              Back
            </button>
            <button
              className="btn-next"
              type="button"
              onClick={() => {
                if (currentStep === STEPS.length - 1) {
                  setView("summary");
                  return;
                }
                setSkipWarnByStep((prev) => ({ ...prev, [current.id]: false }));
                setCurrentStep((prev) => prev + 1);
              }}
            >
              {currentStep === STEPS.length - 1 ? "See Full Summary ->" : "Next ->"}
            </button>
            <button
              className="btn-skip"
              type="button"
              onClick={handleSkip}
              style={{ display: selections[current.id] ? "none" : undefined }}
            >
              Skip
            </button>
          </footer>
        </>
      )}

      {view === "summary" && (
        <main className="main">
          <section className="summary active">
            <h2>Your Build Plan</h2>
            <p className="sub">
              Share link: <code>{shareUrl || "..."}</code>
            </p>

            <div className="quick-actions">
              <button type="button" className="btn-ghost" onClick={() => autoBuild("low")}>
                Build Low-End Baseline
              </button>
              <button type="button" className="btn-ghost" onClick={() => autoBuild("high")}>
                Build High-End Baseline
              </button>
            </div>

            <div className="rec-build">
              <h3>Your Build Plan</h3>
              {Object.entries(selections).map(([stepId, selected]) => {
                const step = STEPS.find((item) => item.id === stepId);
                if (!step) return null;
                const option = step.options[selected.idx];

                return (
                  <div className="rec-row" key={`rb-${stepId}`}>
                    <span className={`rc ${step.jennyChoice ? "rc-jenny" : "rc-rapp"}`}>
                      {step.jennyChoice ? "Your choice" : "Rapp handles"}
                    </span>
                    <span className="rl">
                      {step.label} - {option.label}
                    </span>
                    <span className="rp">{formatMoney(option.price)}</span>
                  </div>
                );
              })}
            </div>

            {[1, 2, 3].map((phase) => (
              <div className="phase-block" key={`phase-${phase}`}>
                <div className={`phase-block-title ph${phase}-title`}>
                  Phase {phase} - {phase === 1 ? "Build Now" : phase === 2 ? "About 6 Months" : "About 1 Year"} - $
                  {phaseTotals[phase as Phase].toLocaleString()}
                </div>
                {grouped[phase as Phase].length === 0 && <div className="summary-row">No items in this phase yet.</div>}
                {grouped[phase as Phase].map((item) => {
                  const step = STEPS.find((s) => s.id === item.stepId);
                  if (!step) return null;
                  const option = step.options[item.idx];
                  return (
                    <div className="summary-row" key={`${phase}-${step.id}`}>
                      <div>
                        <div className="summary-cat">
                          {step.jennyChoice ? "Your choice" : "Rapp handles"} - {step.label}
                        </div>
                        <div className="summary-sel">{option.label}</div>
                      </div>
                      <div className="summary-price">${option.price.toLocaleString()}</div>
                    </div>
                  );
                })}
              </div>
            ))}

            <div className="phase-block">
              <div className="phase-block-title unassigned-title">Not selected</div>
              {grouped.u.map((item) => {
                const step = STEPS.find((s) => s.id === item.stepId);
                return (
                  <div className="summary-row" key={`u-${item.stepId}`}>
                    <div>
                      <div className="summary-cat">
                        {step?.jennyChoice ? "Your choice" : "Rapp handles"} - {step?.label}
                      </div>
                      <div className="summary-sel">Not selected</div>
                      {step?.critical && <div className="sum-critical">Discuss with Rapp</div>}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="total-bar">
              <div>
                <div className="t-label">Total parts cost</div>
                <div className="t-note">Labor at no cost - prices as of April 2026</div>
              </div>
              <div className="t-amount">${runningTotal.toLocaleString()}</div>
            </div>

            <div className="save-plan">
              <input
                value={planName}
                onChange={(event) => setPlanName(event.target.value)}
                placeholder="Name this version (e.g. High End)"
              />
              <button type="button" onClick={savePlan} disabled={isSaving}>
                {isSaving ? "Saving..." : "Save this plan"}
              </button>
            </div>

            {saveMessage && <p className="save-message">{saveMessage}</p>}

            <div className="quick-actions">
              <button type="button" className="btn-ghost" onClick={() => setView("builder")}>
                Edit selections
              </button>
              <button
                type="button"
                className="btn-ghost"
                onClick={() => setView("compare")}
                disabled={savedPlans.length < 1}
              >
                Compare plans ({savedPlans.length})
              </button>
              <button type="button" className="btn-ghost" onClick={resetAll}>
                Start Over
              </button>
            </div>
          </section>
        </main>
      )}

      {view === "compare" && (
        <main className="main">
          <section className="summary active">
            <h2>Compare Saved Plans</h2>
            <p className="sub">Session: {sessionCode}</p>

            {savedPlans.length === 0 && <p className="summary-row">No plans saved yet.</p>}

            {savedPlans.map((plan) => {
              const planPhaseTotals: Record<Phase, number> = { 1: 0, 2: 0, 3: 0 };
              Object.entries(plan.selections).forEach(([stepId, selected]) => {
                const step = STEPS.find((item) => item.id === stepId);
                if (!step) return;
                planPhaseTotals[selected.phase] += step.options[selected.idx].price;
              });

              return (
                <div className="compare-card" key={plan.id}>
                  <div className="compare-top">
                    <div>
                      <h3>{plan.name}</h3>
                      <p>{new Date(plan.createdAt).toLocaleString()}</p>
                    </div>
                    <strong>${plan.total.toLocaleString()}</strong>
                  </div>
                  <div className="compare-phases">
                    <span>P1: ${planPhaseTotals[1].toLocaleString()}</span>
                    <span>P2: ${planPhaseTotals[2].toLocaleString()}</span>
                    <span>P3: ${planPhaseTotals[3].toLocaleString()}</span>
                  </div>
                  <button type="button" className="btn-ghost" onClick={() => loadPlan(plan)}>
                    Load this plan
                  </button>
                </div>
              );
            })}

            <div className="quick-actions">
              <button type="button" className="btn-ghost" onClick={() => setView("summary")}>
                Back to summary
              </button>
            </div>
          </section>
        </main>
      )}
    </div>
  );
}
