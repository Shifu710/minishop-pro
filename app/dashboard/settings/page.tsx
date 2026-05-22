export default function SettingsPage() {
  return (
    <div className="grid gap-5">
      <div>
        <p className="font-bold text-cyan-700">Settings</p>
        <h1 className="text-3xl font-black">Business settings</h1>
      </div>
      <div className="grid gap-5 xl:grid-cols-2">
        <SettingsCard title="Business profile"><Field defaultValue="MiniShop Pro Demo Store" /><Field defaultValue="小店智选演示店" /><textarea className="min-h-24 rounded-xl border border-slate-200 px-3 py-2" defaultValue="Local business commerce and booking demo." /></SettingsCard>
        <SettingsCard title="Opening hours"><Field defaultValue="Mon-Sun 09:00-21:00" /><select className="rounded-xl border border-slate-200 px-3 py-2" defaultValue="Asia/Shanghai"><option>Asia/Shanghai</option><option>Asia/Singapore</option></select></SettingsCard>
        <SettingsCard title="Payment simulation"><label className="flex justify-between">Enable simulated WeChat Pay <input type="checkbox" defaultChecked /></label><p className="text-sm text-slate-500">Demo payment simulation only. No real payment is processed.</p></SettingsCard>
        <SettingsCard title="Mini program settings"><Field defaultValue="WECHAT_APP_ID placeholder" /><p className="text-sm text-slate-500">Real AppSecret and merchant credentials must stay server-side only.</p></SettingsCard>
      </div>
    </div>
  );
}

function Field({ defaultValue }: { defaultValue: string }) {
  return <input className="rounded-xl border border-slate-200 px-3 py-2" defaultValue={defaultValue} />;
}

function SettingsCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="panel p-5">
      <h2 className="mb-4 font-black">{title}</h2>
      <div className="grid gap-3">{children}</div>
    </section>
  );
}
