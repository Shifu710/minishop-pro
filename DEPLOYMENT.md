# Deployment Report — MiniShop Pro

This document is the canonical deployment and release record for the **Public H5/PC Shop** feature. It matches what is live on GitHub and Vercel.

---

## Live URLs

| Purpose | URL |
|---------|-----|
| **Production site** | https://minishop-pro.vercel.app |
| **Public shop (Style 1)** | https://minishop-pro.vercel.app/t/demo-shop?style=style1 |
| **Public shop (Style 2)** | https://minishop-pro.vercel.app/t/demo-shop?style=style2 |
| **Alt demo suffix** | https://minishop-pro.vercel.app/t/7IOvjtH |
| **Admin login** | https://minishop-pro.vercel.app/login |
| **Shop link admin** | https://minishop-pro.vercel.app/dashboard/domains |
| **GitHub repository** | https://github.com/Shifu710/minishop-pro |
| **Vercel dashboard** | https://vercel.com/shifu710s-projects/minishop-pro |

---

## GitHub

| Item | Value |
|------|-------|
| **Repository** | `Shifu710/minishop-pro` |
| **Production branch** | `main` |
| **Feature branch** | `feature/public-shop-h5-pc-styles` |
| **Latest production commit** | `3411fff` — fix: checklist gaps - image fallback, empty states, admin validation |
| **Feature commit** | `8ff8176` — feat: add public shop styles and domain management |
| **Build fix commit** | `8ae2a92` — fix: run prisma generate on install and build |
| **Pushed to GitHub** | Yes |
| **Open PR (optional)** | https://github.com/Shifu710/minishop-pro/pull/new/feature/public-shop-h5-pc-styles |

`main` already includes the feature branch (fast-forward merge). The feature branch may be behind `main` if it was not updated after merge; use `main` as the source of truth.

### What was shipped

- Public route `/t/[suffix]` (no login)
- Style 1 — responsive H5/PC catalog shop
- Style 2 — mini-program UI with live API data
- Style switching (URL → localStorage → merchant default)
- Merchant suffix + domain management in admin
- APIs: public resolve, miniapp shop, admin domains
- Prisma migration `20260523120000_add_merchant_domains`

### Files never committed

The following must **not** be committed (enforced via `.gitignore`):

```text
.env
.env.local
.env.production
node_modules/
*.log
```

Only `.env.example` is tracked as a template.

---

## Vercel

| Item | Value |
|------|-------|
| **Account** | `shifu710` |
| **Project** | `minishop-pro` |
| **Deployment status** | **Ready** |
| **Latest deployment ID** | `dpl_D5DxPhtTQB2zQLYikjqACskwzbyW` |
| **Inspect deployment** | https://vercel.com/shifu710s-projects/minishop-pro/D5DxPhtTQB2zQLYikjqACskwzbyW |
| **Production alias** | https://minishop-pro.vercel.app |
| **Framework** | Next.js (see `vercel.json`) |
| **Install** | `npm install` (runs `postinstall` → `prisma generate`) |
| **Build** | `npm run build` (`prisma generate && next build`) |

### Deploy from CLI

```bash
npx vercel whoami
npx vercel deploy --prod --yes
```

If the repo is connected to Vercel, pushing `main` also triggers a deployment automatically.

---

## Environment variables (Vercel)

Configure under **Project → Settings → Environment Variables**. Do not commit secret values.

| Variable | Required | Purpose |
|----------|----------|---------|
| `NEXT_PUBLIC_APP_URL` | Recommended | Correct public shop links in admin (e.g. `https://minishop-pro.vercel.app`) |
| `DATABASE_URL` | Optional | PostgreSQL/Supabase for persistent `Merchant` / `MerchantDomain` records |
| `DEMO_EMAIL` | Optional | Admin demo login email (default: `demo@minishop.pro`) |
| `DEMO_PASSWORD` | Optional | Admin demo login password (server-side only) |
| `NEXT_PUBLIC_SUPABASE_URL` | Optional | Future Supabase integration |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Optional | Future Supabase integration |
| `SUPABASE_SERVICE_ROLE_KEY` | Optional | Server-only; future use |
| `WECHAT_APP_ID` | Optional | Placeholder for future WeChat |
| `WECHAT_APP_SECRET` | Optional | Server-only placeholder |
| `WECHAT_PAY_MCH_ID` | Optional | Placeholder |
| `WECHAT_PAY_API_KEY` | Optional | Server-only placeholder |

**Not used by this project:** `DEEPSEEK_API_KEY`, `OPENAI_API_KEY`, `NEXT_PUBLIC_API_BASE_URL`.

### Without `DATABASE_URL`

The app uses an **in-memory seed** for domain records (`demo-shop`, `7IOvjtH`). Public shops work on every deploy; admin-created domains reset when the serverless instance restarts unless a database is connected.

### With `DATABASE_URL`

```bash
npx prisma migrate deploy
npm run prisma:seed
```

---

## Local build and test (before push)

Package manager: **npm** (`package-lock.json`).

```bash
npm install
npm run lint
npm run typecheck
npm run build
```

| Step | Status (last verified) |
|------|------------------------|
| `npm install` | Pass |
| `npm run lint` | Pass |
| `npm run typecheck` | Pass |
| `npm run build` | Pass |

---

## Production smoke tests

| Test | How to verify | Expected |
|------|----------------|----------|
| Public resolve API | `GET /api/public/shop/resolve?suffix=demo-shop` | `success: true` with merchant, categories, products |
| Invalid suffix | `GET /api/public/shop/resolve?suffix=invalid-xyz` | HTTP 404, shop not found |
| Public shop page | Open `/t/demo-shop` | Shop loads without login |
| Style 1 | `/t/demo-shop?style=style1` | Catalog layout |
| Style 2 | `/t/demo-shop?style=style2` | Mini-app tab UI |
| Admin domains API | `GET /api/admin/domains` without cookie | 401 Unauthorized |
| Admin UI | Login → `/dashboard/domains` | List, create, edit, copy link, preview |

### Demo admin login

- Email: `demo@minishop.pro`
- Password: `demo123456`

---

## API reference (public shop feature)

| Method | Path | Auth |
|--------|------|------|
| `GET` | `/api/public/shop/resolve?suffix={suffix}&host={host}` | None |
| `GET` | `/api/miniapp/shop/detail?merchantId={id}` | None |
| `GET` | `/api/miniapp/categories?merchantId={id}` | None |
| `GET` | `/api/miniapp/products?merchantId={id}` | None |
| `GET` / `POST` | `/api/admin/domains` | Admin session cookie |
| `PATCH` / `DELETE` | `/api/admin/domains/[id]` | Admin session cookie |

---

## Suffix rules

- Length: 3–50 characters
- Pattern: `^[a-zA-Z0-9_-]{3,50}$`
- Reserved: `admin`, `api`, `login`, `dashboard`, `static`, `assets`, `public`, `user`, `users`, `system`, `settings`
- Public link format: `https://{domain}/t/{suffix}`

---

## Changelog (deployment-related)

| Date | Commit | Note |
|------|--------|------|
| — | `8ff8176` | Public shop, styles, domain admin, APIs, migration |
| — | `8ae2a92` | `postinstall` + build run `prisma generate` (Vercel fix) |
| — | `3411fff` | Image fallback, empty states, admin form validation, README |

---

## Support / troubleshooting

| Issue | Action |
|-------|--------|
| Vercel build: `merchantDomain` type error | Ensure `postinstall` runs `prisma generate` (see `package.json`) |
| Shop links show `localhost` | Set `NEXT_PUBLIC_APP_URL` on Vercel |
| New domains disappear after deploy | Set `DATABASE_URL` and run migrations |
| Admin pages redirect to login | Use demo credentials; cookie `minishop_session=demo-session` |

For full product documentation, see [README.md](./README.md).
