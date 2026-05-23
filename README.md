# MiniShop Pro — WeChat Mini Program E-commerce & Booking

**小店智选** — China-market portfolio demo: WeChat-style mini shop, public H5/PC storefront, and admin dashboard.

[![Live Demo](https://img.shields.io/badge/Live-minishop--pro.vercel.app-0891b2?style=for-the-badge)](https://minishop-pro.vercel.app)
[![GitHub](https://img.shields.io/badge/GitHub-Shifu710%2Fminishop--pro-181717?style=for-the-badge)](https://github.com/Shifu710/minishop-pro)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square)](https://nextjs.org/)

---

## Quick links

| Link | URL |
|------|-----|
| **Production** | https://minishop-pro.vercel.app |
| **Public shop (share with friends)** | https://minishop-pro.vercel.app/t/demo-shop |
| **Style 1 (catalog / PC)** | https://minishop-pro.vercel.app/t/demo-shop?style=style1 |
| **Style 2 (mini-app UI)** | https://minishop-pro.vercel.app/t/demo-shop?style=style2 |
| **Admin login** | https://minishop-pro.vercel.app/login |
| **Shop links & domains** | https://minishop-pro.vercel.app/dashboard/domains |
| **Deployment report** | [DEPLOYMENT.md](./DEPLOYMENT.md) |

---

## What this project does

- **Public shop** — Anyone opens `/t/{suffix}` and sees the merchant catalog (no login).
- **Two storefront styles** — Style 1 (WeCatalog-style H5/PC) and Style 2 (mini-program tabs), switchable in the UI.
- **Per-merchant links** — Unique suffix per shop (e.g. `/t/demo-shop`, `/t/7IOvjtH`).
- **Admin** — Manage domains, suffixes, default style, and copy preview links.
- **Demo mode** — Mock catalog + simulated checkout; no real WeChat Pay.

---

## Demo credentials

| Field | Value |
|-------|-------|
| Email | `demo@minishop.pro` |
| Password | `demo123456` |

Auth is server-side only (`POST /api/auth/demo`). Password is never validated in the browser.

---

## Run locally

Requires **Node.js 18+**. Use **npm** (lockfile: `package-lock.json`).

```bash
git clone https://github.com/Shifu710/minishop-pro.git
cd minishop-pro
cp .env.example .env.local   # optional
npm install
npm run dev
```

Open http://localhost:3000

### Quality checks

```bash
npm run lint
npm run typecheck
npm run build
```

---

## Public shop routes

```text
/t/demo-shop              → default style for merchant
/t/demo-shop?style=style1 → catalog layout
/t/demo-shop?style=style2 → mini-app layout
/t/7IOvjtH                → second demo merchant
```

**Style priority:** URL `?style=` → browser localStorage → merchant `defaultStyle` → `style1`.

**API (no auth):**

```http
GET /api/public/shop/resolve?suffix=demo-shop
```

---

## Admin: shop link management

After login, open **Dashboard → Shop Links** (`/dashboard/domains`):

- List merchants, domains, suffixes, full public URLs
- Create / edit / enable / disable
- Copy link and preview in a new tab
- Suffix validation (3–50 chars, reserved words blocked on server)

---

## Tech stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 16, React 19, Tailwind CSS 4, Ant Design |
| API | Next.js Route Handlers |
| Database (optional) | Prisma + PostgreSQL (Supabase-ready) |
| Deploy | Vercel |
| Mini program scaffold | Taro 4 under `apps/mini-program/` |

---

## Environment variables

Copy `.env.example` to `.env.local` for local development. **Do not commit** `.env` or `.env.local`.

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_APP_URL` | Recommended on Vercel | Base URL for generated shop links |
| `DATABASE_URL` | Optional | Persistent merchants/domains; without it, in-memory seed is used |
| `DEMO_EMAIL` / `DEMO_PASSWORD` | Optional | Demo admin login |
| `NEXT_PUBLIC_SUPABASE_*` | Optional | Future Supabase use |
| `WECHAT_*` | Optional | Placeholders only; not used in Phase 1 |

Full deployment and Vercel setup: **[DEPLOYMENT.md](./DEPLOYMENT.md)**

---

## Database & migration

```bash
npm run prisma:generate
npm run prisma:migrate    # local dev
npx prisma migrate deploy # production
npm run prisma:seed
```

Migration `20260523120000_add_merchant_domains` adds `Merchant` and `MerchantDomain` tables. Catalog data still comes from typed mock data via `lib/shop/shop-data-adapter.ts` until Prisma catalog APIs are wired.

---

## Repository layout (feature highlights)

```text
app/t/[suffix]/              Public shop page
app/dashboard/domains/       Admin domain management
app/api/public/shop/resolve/ Public shop API
app/api/miniapp/             Mini-program shop APIs
app/api/admin/domains/       Protected admin APIs
components/shop/             Style1Shop, Style2Shop, PublicShopPage
lib/shop/                    Resolve, suffix validation, merchant store
prisma/migrations/           Merchant domain migration
DEPLOYMENT.md                Deployment report (GitHub + Vercel)
```

---

## GitHub & release status

| Item | Status |
|------|--------|
| **Branch** | `main` (production) |
| **Feature branch** | `feature/public-shop-h5-pc-styles` (merged) |
| **Latest commit** | `3411fff` |
| **Vercel** | Ready — https://minishop-pro.vercel.app |

See **[DEPLOYMENT.md](./DEPLOYMENT.md)** for commit hashes, smoke tests, env checklist, and troubleshooting.

---

## Security

- No WeChat secrets or payment keys in the repo
- `.env*` ignored (except `.env.example`)
- Public APIs expose only shop-safe fields
- Admin APIs require `minishop_session` cookie
- Checkout is simulation only

---

## Other pages

| Path | Description |
|------|-------------|
| `/` | Landing |
| `/mini-preview` | Embedded Style 2 preview |
| `/case-study/minishop-pro` | Portfolio case study |
| `/dashboard/*` | Admin (products, orders, analytics, …) |

---

## Future work

- Full Taro WeChat build in DevTools
- Prisma-backed catalog CRUD
- Supabase Auth & Storage
- Real WeChat Login / Pay (server-side only)

---

## Summary

**EN:** MiniShop Pro is a WeChat Mini Program-style commerce and booking demo with a public shareable shop, dual storefront styles, domain/suffix admin, and Vercel deployment.

**中文:** 小店智选是微信小程序风格的电商与预约演示项目，支持公开店铺链接、双风格前台、后台域名/后缀管理及 Vercel 线上部署。完整部署说明见 [DEPLOYMENT.md](./DEPLOYMENT.md)。
