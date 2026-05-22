import Link from "next/link";
import { ArrowRight, Database, ShieldCheck, Smartphone, Workflow } from "lucide-react";

const points = [
  "Chinese-first WeChat Mini Program-style H5 preview",
  "Product, service, package, cart, checkout, and order workflows",
  "Admin dashboard for products, categories, orders, bookings, customers, promotions, analytics, and settings",
  "Prisma schema prepared for Supabase PostgreSQL",
  "Server-side mock auth and safe demo payment simulation",
  "Clear future path for real WeChat Login and WeChat Pay",
];

export default function CaseStudyPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <Link className="font-bold text-cyan-700" href="/">← Back to MiniShop Pro</Link>
      <section className="py-16">
        <p className="font-bold text-cyan-700">Portfolio case study</p>
        <h1 className="mt-3 max-w-4xl text-4xl font-black md:text-6xl">MiniShop Pro: WeChat Mini Program e-commerce and booking system</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">A China-market portfolio project that combines a WeChat Mini Program-style customer app, H5 preview, admin dashboard, booking workflow, product management, mock backend data, and a Prisma-ready database design.</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link className="btn-primary" href="/mini-preview">Open H5 preview <ArrowRight size={18} /></Link>
          <Link className="btn-secondary" href="/login">Try admin demo</Link>
          <a className="btn-secondary" href="https://github.com/Shifu710/minishop-pro" rel="noreferrer" target="_blank">GitHub ↗</a>
        </div>
      </section>
      <section className="grid gap-5 md:grid-cols-3">
        {[
          ["Problem", "Local service businesses need a simple way to sell products, accept bookings, and manage operations from one place."],
          ["Solution", "MiniShop Pro provides a mini-program-style customer flow plus a serious admin dashboard for daily management."],
          ["Target users", "Beauty salons, education centers, travel agencies, coffee shops, fitness studios, and local service businesses."],
        ].map(([title, body]) => <div className="panel p-5" key={title}><h2 className="font-black">{title}</h2><p className="mt-2 text-slate-600">{body}</p></div>)}
      </section>
      <section className="py-14">
        <h2 className="text-3xl font-black">Key features</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {points.map((point) => <div className="panel flex items-center gap-3 p-4" key={point}><ShieldCheck className="text-emerald-600" />{point}</div>)}
        </div>
      </section>
      <section className="grid gap-5 lg:grid-cols-2">
        <div className="panel p-6">
          <Smartphone className="text-cyan-700" />
          <h2 className="mt-4 text-2xl font-black">Mini program user flow</h2>
          <p className="mt-3 leading-7 text-slate-600">Users browse categories, view product/service details, add items to cart, choose booking slots, submit checkout, see simulated payment messaging, and review orders. The H5 preview exists so recruiters can click a URL without WeChat DevTools.</p>
        </div>
        <div className="panel p-6">
          <Workflow className="text-orange-600" />
          <h2 className="mt-4 text-2xl font-black">Admin dashboard flow</h2>
          <p className="mt-3 leading-7 text-slate-600">Admins log in with server-side demo auth, review metrics, manage products and services, update orders and bookings, inspect customers, manage promotions, and read analytics.</p>
        </div>
        <div className="panel p-6">
          <Database className="text-cyan-700" />
          <h2 className="mt-4 text-2xl font-black">Architecture and database design</h2>
          <p className="mt-3 leading-7 text-slate-600">The current version uses typed mock data for safe portfolio review. The Prisma schema models AdminUser, Customer, Category, Product, Order, OrderItem, Booking, Promotion, and Favorite for a future Supabase PostgreSQL upgrade.</p>
        </div>
        <div className="panel p-6">
          <ShieldCheck className="text-emerald-600" />
          <h2 className="mt-4 text-2xl font-black">Security considerations</h2>
          <p className="mt-3 leading-7 text-slate-600">This portfolio version simulates WeChat Mini Program commerce and payment workflows. Real WeChat Login, WeChat Pay, and template message notifications require official merchant credentials and should be handled through secure server-side API routes.</p>
          <p className="mt-3 leading-7 text-slate-600">本作品集版本模拟了微信小程序电商与支付流程。真实的微信登录、微信支付和模板消息需要官方商户资质，并应通过安全的服务端接口实现。</p>
        </div>
      </section>
      <section className="py-14">
        <h2 className="text-3xl font-black">AI-assisted development workflow</h2>
        <p className="mt-4 max-w-3xl leading-7 text-slate-600">I used AI-assisted development to plan the architecture, structure bilingual content, generate first component drafts, and debug implementation details. All generated code was reviewed, adjusted, and tested manually.</p>
      </section>
      <section className="pb-16">
        <h2 className="text-3xl font-black">Future improvements</h2>
        <div className="mt-5 grid gap-3 md:grid-cols-3">
          {["Real Taro WeChat build", "Supabase Auth", "Prisma API persistence", "Supabase Storage image uploads", "WeChat Pay server routes", "Gitee mirror"].map((item) => <div className="panel p-4" key={item}>{item}</div>)}
        </div>
      </section>
    </main>
  );
}
