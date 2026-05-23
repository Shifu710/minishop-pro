# MiniShop Pro - WeChat Mini Program E-commerce & Booking System

MiniShop Pro, Chinese name 小店智选, is a China-market portfolio project that simulates a WeChat Mini Program e-commerce and service booking system with a modern admin dashboard.

## Why I Built This

I built this project to demonstrate React-based mini-program product thinking, commerce flows, booking workflows, admin dashboard management, database modeling, and security awareness for Chinese-market applications.

## Target Users

Small restaurants, beauty salons, education centers, local service businesses, travel agencies, mini e-commerce stores, fitness studios, and consultation businesses.

## Key Features

- WeChat Mini Program-style H5 preview for recruiters
- Chinese-first customer app flow: home, category, cart, checkout, orders, profile
- Demo payment simulation with clear safety copy
- Admin dashboard with products, categories, orders, bookings, customers, promotions, analytics, settings
- Server-side demo login route
- Mock data fallback with realistic products, services, customers, orders, bookings, and promotions
- Prisma schema for Supabase PostgreSQL upgrade
- Public case study page
- Security notes for WeChat AppSecret and WeChat Pay

## Demo Account

Email: `demo@minishop.pro`

Password: `demo123456`

The credential check happens server-side through `/api/auth/demo`; the password is not checked in client-side code.

## Runtime Requirements

- Node.js 18+
- pnpm recommended for the monorepo structure
- npm also works for the deployed Next.js demo host

## Run Admin Dashboard

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Public Shop (H5 / PC)

Visitors can open a merchant shop without login:

```txt
/t/demo-shop
/t/demo-shop?style=style1
/t/demo-shop?style=style2
/t/7IOvjtH
```

- **Style 1** — responsive catalog layout (WeCatalog-style reference)
- **Style 2** — mini-program tab UI with live API data
- Style priority: URL `?style=` → localStorage → merchant default

Admin manages suffixes and domains at `/dashboard/domains` (login required).

## H5 Preview

The recruiter-friendly H5 preview is available at:

```txt
/mini-preview
```

This embeds the live public shop (`demo-shop`) in Style 2. Full public routes are at `/t/{suffix}`.

## Taro Mini Program Source

Taro-style source scaffolding is located in:

```txt
apps/mini-program/src
```

Planned real Taro commands:

```bash
cd apps/mini-program
pnpm install
pnpm build:h5
pnpm build:weapp
```

The current deployed H5 preview is hosted by the Next.js app for reliable recruiter access.

## Environment Variables

See `.env.example`.

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase public project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-only service key |
| `DATABASE_URL` | Supabase PostgreSQL URL for Prisma |
| `DEMO_EMAIL` | Server-side demo email |
| `DEMO_PASSWORD` | Server-side demo password |
| `WECHAT_APP_ID` | WeChat placeholder |
| `WECHAT_APP_SECRET` | Server-only WeChat secret placeholder |
| `WECHAT_PAY_MCH_ID` | WeChat Pay merchant placeholder |
| `WECHAT_PAY_API_KEY` | Server-only WeChat Pay key placeholder |

## Database Setup

```bash
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
```

Phase 1 uses typed mock data first. The Prisma schema is ready for Supabase PostgreSQL.

### Merchant domain migration

Migration `20260523120000_add_merchant_domains` adds:

- `Merchant` — shop profile, `shopSuffix`, `defaultStyle`, `shopStatus`
- `MerchantDomain` — custom domain, suffix, primary flag, status

Apply on Supabase/PostgreSQL:

```bash
npx prisma migrate deploy
npm run prisma:seed
```

Without `DATABASE_URL`, domain records use an in-memory seed (`demo-shop`, `7IOvjtH`) so public shops work on Vercel without a database.

## Mock Data / Demo Mode

This project uses mock data, simulated payment, and demo mode so recruiters can explore the product without private WeChat merchant credentials. The architecture is designed so real WeChat Login, WeChat Pay, and template message features can be added later through secure server-side API routes.

## WeChat Integration Note

Real WeChat Login, WeChat Pay, AppSecret, and merchant credentials are intentionally not implemented in Phase 1. They require official credentials and should never be exposed in frontend code.

## Security Notes

- No real WeChat credentials are committed
- `.env` and `.env.local` are ignored
- Demo auth is handled server-side
- Payment is simulation only
- No real payment data is stored
- Real payment routes should validate input and run server-side only

## AI-Assisted Development Workflow

This project was built using an AI-assisted workflow. I used Claude, ChatGPT, and Cursor to help plan the architecture, generate initial components, debug issues, and improve bilingual documentation.

All generated code was reviewed, adjusted, and tested manually. AI was used as a development accelerator, while the product direction, technical decisions, and final implementation were controlled by me.

## Future Improvements

- Full Taro 4 WeChat build verification in WeChat DevTools
- Supabase Auth
- Prisma API persistence
- Supabase Storage image uploads
- Real WeChat Login
- Real WeChat Pay through secure server routes
- Template message notifications
- Gitee mirror for Chinese recruiters

## English + Chinese Summary

MiniShop Pro is a WeChat Mini Program-style commerce and booking system with an admin dashboard, H5 preview, safe demo payment flow, and Prisma-ready backend architecture.

小店智选是一个微信小程序风格的电商与预约管理系统，包含 H5 预览、后台管理、模拟支付流程和可升级到 Prisma/Supabase 的后端架构。
