# Jenny Van Build Configurator

Interactive configurator for Jenny's build:
- Multi-step option selection with phase planning (build now / 6 months / 1 year)
- Running total and final summary
- One-click low-end and high-end baseline builds
- Save multiple plan versions and compare totals
- Shareable session link
- Supabase persistence (with localStorage fallback)

## Stack

- Next.js (App Router)
- Supabase (`@supabase/supabase-js`)
- Vercel hosting
- GitHub for source control

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Create env file:

```bash
cp .env.example .env.local
```

3. Fill `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_ANON_KEY
```

4. Run the app:

```bash
npm run dev
```

## Supabase Setup

1. Create a new Supabase project.
2. Open SQL Editor.
3. Run `supabase/schema.sql`.

That creates `configurator_plans` used for saved plan versions and comparisons.

## Deploy to GitHub + Vercel

### 1) Initialize git and push

```bash
git init
git add .
git commit -m "Initial van configurator app"
gh repo create jenny-van-configurator --public --source=. --remote=origin --push
```

If you prefer creating the repo manually in GitHub UI, create an empty repo and run:

```bash
git remote add origin https://github.com/<your-user>/jenny-van-configurator.git
git branch -M main
git push -u origin main
```

### 2) Import in Vercel

1. Go to [Vercel New Project](https://vercel.com/new).
2. Import `jenny-van-configurator`.
3. Add env vars:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy.

### 3) Share with Jenny

After deploy, open the production URL. The app automatically generates a session link like:

`https://your-app.vercel.app/?session=plan-abc123`

Share that URL with Jenny so she can save and compare versions in one shared session.
