"use client";

import { useCallback, useEffect, useState } from "react";
import { Copy, ExternalLink, Pencil, Plus, Trash2 } from "lucide-react";
import { buildPublicShopUrl, getDefaultAppDomain } from "@/lib/shop/constants";
import { validateDomain, validateSuffix } from "@/lib/shop/suffix";
import type { MerchantDomainRecord, ShopStyle, ShopStatus } from "@/lib/shop/types";

type FormState = {
  merchantId: string;
  merchantName: string;
  domain: string;
  suffix: string;
  defaultStyle: ShopStyle;
  status: ShopStatus;
  remark: string;
};

const emptyForm = (): FormState => ({
  merchantId: `merchant-${Date.now()}`,
  merchantName: "",
  domain: typeof window !== "undefined" ? window.location.host : getDefaultAppDomain(),
  suffix: "",
  defaultStyle: "style1",
  status: "active",
  remark: "",
});

export default function DomainsPage() {
  const [domains, setDomains] = useState<MerchantDomainRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm());
  const [saving, setSaving] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/domains");
      const json = (await res.json()) as { success: boolean; data?: MerchantDomainRecord[]; error?: string };
      if (!json.success) {
        setError(json.error ?? "Failed to load domains");
        return;
      }
      setDomains(json.data ?? []);
    } catch {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function fetchDomains() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/admin/domains");
        const json = (await res.json()) as {
          success: boolean;
          data?: MerchantDomainRecord[];
          error?: string;
        };
        if (cancelled) return;
        if (!json.success) {
          setError(json.error ?? "Failed to load domains");
          return;
        }
        setDomains(json.data ?? []);
      } catch {
        if (cancelled) return;
        setError("Network error");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void fetchDomains();
    return () => {
      cancelled = true;
    };
  }, []);

  function openCreate() {
    setEditingId(null);
    setForm(emptyForm());
    setFormOpen(true);
  }

  function openEdit(record: MerchantDomainRecord) {
    setEditingId(record.id);
    setForm({
      merchantId: record.merchantId,
      merchantName: record.merchantName,
      domain: record.domain,
      suffix: record.suffix,
      defaultStyle: record.defaultStyle,
      status: record.status,
      remark: record.remark ?? "",
    });
    setFormOpen(true);
  }

  function validateForm(): boolean {
    const errors: Record<string, string> = {};
    if (!form.merchantName.trim()) errors.merchantName = "Merchant name is required.";
    if (!form.merchantId.trim()) errors.merchantId = "Merchant ID is required.";
    const suffixCheck = validateSuffix(form.suffix);
    if (!suffixCheck.valid) errors.suffix = suffixCheck.error ?? "Invalid suffix.";
    const domainCheck = validateDomain(form.domain);
    if (!domainCheck.valid) errors.domain = domainCheck.error ?? "Invalid domain.";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validateForm()) return;
    setSaving(true);
    setError(null);
    try {
      const url = editingId ? `/api/admin/domains/${editingId}` : "/api/admin/domains";
      const method = editingId ? "PATCH" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const json = (await res.json()) as { success: boolean; error?: string };
      if (!json.success) {
        setError(json.error ?? "Save failed");
        return;
      }
      setFormOpen(false);
      await load();
    } catch {
      setError("Network error while saving");
    } finally {
      setSaving(false);
    }
  }

  async function toggleStatus(record: MerchantDomainRecord) {
    const next: ShopStatus = record.status === "active" ? "disabled" : "active";
    await fetch(`/api/admin/domains/${record.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: next }),
    });
    await load();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this domain record?")) return;
    await fetch(`/api/admin/domains/${id}`, { method: "DELETE" });
    await load();
  }

  async function copyLink(record: MerchantDomainRecord) {
    const link = buildPublicShopUrl(record.domain, record.suffix);
    await navigator.clipboard.writeText(link);
  }

  return (
    <div className="grid gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black">Domain & Shop Link Management</h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage merchant suffixes, domains, and public shop URLs.
          </p>
        </div>
        <button className="btn-primary" onClick={openCreate} type="button">
          <Plus size={18} />
          Add domain
        </button>
      </div>

      {error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      {formOpen ? (
        <form className="panel grid gap-4 p-6" onSubmit={(e) => void handleSubmit(e)}>
          <h2 className="text-lg font-bold">{editingId ? "Edit" : "Create"} shop link</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Merchant name *">
              <input
                className="w-full rounded-xl border px-3 py-2"
                onChange={(e) => setForm((f) => ({ ...f, merchantName: e.target.value }))}
                required
                value={form.merchantName}
              />
            </Field>
            <Field label="Merchant ID *">
              <input
                className="w-full rounded-xl border px-3 py-2"
                onChange={(e) => setForm((f) => ({ ...f, merchantId: e.target.value }))}
                required
                value={form.merchantId}
              />
            </Field>
            <Field error={formErrors.domain} label="Domain *">
              <input
                className="w-full rounded-xl border px-3 py-2"
                onChange={(e) => setForm((f) => ({ ...f, domain: e.target.value }))}
                pattern="(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,}"
                placeholder="your-domain.com"
                required
                title="Valid domain, e.g. shop.example.com"
                value={form.domain}
              />
            </Field>
            <Field error={formErrors.suffix} label="Shop suffix *">
              <input
                className="w-full rounded-xl border px-3 py-2"
                maxLength={50}
                minLength={3}
                onChange={(e) => setForm((f) => ({ ...f, suffix: e.target.value }))}
                pattern="[a-zA-Z0-9_-]{3,50}"
                placeholder="demo-shop"
                required
                title="3-50 characters: letters, numbers, hyphen, underscore"
                value={form.suffix}
              />
            </Field>
            <Field label="Default style *">
              <select
                className="w-full rounded-xl border px-3 py-2"
                onChange={(e) =>
                  setForm((f) => ({ ...f, defaultStyle: e.target.value as ShopStyle }))
                }
                value={form.defaultStyle}
              >
                <option value="style1">Style 1</option>
                <option value="style2">Style 2</option>
              </select>
            </Field>
            <Field label="Status *">
              <select
                className="w-full rounded-xl border px-3 py-2"
                onChange={(e) => setForm((f) => ({ ...f, status: e.target.value as ShopStatus }))}
                value={form.status}
              >
                <option value="active">Active</option>
                <option value="disabled">Disabled</option>
              </select>
            </Field>
            <Field label="Remark">
              <input
                className="w-full rounded-xl border px-3 py-2 md:col-span-2"
                onChange={(e) => setForm((f) => ({ ...f, remark: e.target.value }))}
                value={form.remark}
              />
            </Field>
          </div>
          <div className="flex gap-2">
            <button className="btn-primary" disabled={saving} type="submit">
              {saving ? "Saving..." : "Save"}
            </button>
            <button
              className="btn-secondary"
              onClick={() => setFormOpen(false)}
              type="button"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : null}

      <div className="panel overflow-x-auto">
        <table className="w-full min-w-[900px] text-left text-sm">
          <thead>
            <tr className="border-b text-slate-500">
              <th className="p-4">Merchant</th>
              <th className="p-4">Domain</th>
              <th className="p-4">Suffix</th>
              <th className="p-4">Public link</th>
              <th className="p-4">Style</th>
              <th className="p-4">Status</th>
              <th className="p-4">Updated</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td className="p-6 text-slate-500" colSpan={8}>
                  Loading...
                </td>
              </tr>
            ) : domains.length === 0 ? (
              <tr>
                <td className="p-6 text-slate-500" colSpan={8}>
                  No domain records yet.
                </td>
              </tr>
            ) : (
              domains.map((record) => {
                const link = buildPublicShopUrl(record.domain, record.suffix);
                return (
                  <tr className="border-b border-slate-100" key={record.id}>
                    <td className="p-4 font-semibold">{record.merchantName}</td>
                    <td className="p-4">{record.domain}</td>
                    <td className="p-4 font-mono text-xs">{record.suffix}</td>
                    <td className="p-4">
                      <a
                        className="text-cyan-700 hover:underline"
                        href={link}
                        rel="noreferrer"
                        target="_blank"
                      >
                        {link}
                      </a>
                    </td>
                    <td className="p-4">{record.defaultStyle}</td>
                    <td className="p-4">
                      <button
                        className={`rounded-full px-2 py-1 text-xs font-bold ${
                          record.status === "active"
                            ? "bg-green-100 text-green-700"
                            : "bg-slate-100 text-slate-600"
                        }`}
                        onClick={() => void toggleStatus(record)}
                        type="button"
                      >
                        {record.status}
                      </button>
                    </td>
                    <td className="p-4 text-xs text-slate-500">
                      {new Date(record.updatedAt).toLocaleString()}
                    </td>
                    <td className="p-4">
                      <div className="flex flex-wrap gap-2">
                        <button
                          className="rounded-lg border px-2 py-1 hover:bg-slate-50"
                          onClick={() => void copyLink(record)}
                          title="Copy link"
                          type="button"
                        >
                          <Copy size={14} />
                        </button>
                        <a
                          className="rounded-lg border px-2 py-1 hover:bg-slate-50"
                          href={`/t/${record.suffix}`}
                          rel="noreferrer"
                          target="_blank"
                          title="Preview"
                        >
                          <ExternalLink size={14} />
                        </a>
                        <button
                          className="rounded-lg border px-2 py-1 hover:bg-slate-50"
                          onClick={() => openEdit(record)}
                          type="button"
                        >
                          <Pencil size={14} />
                        </button>
                        <button
                          className="rounded-lg border px-2 py-1 text-red-600 hover:bg-red-50"
                          onClick={() => void handleDelete(record.id)}
                          type="button"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Field({
  label,
  children,
  error,
}: {
  label: string;
  children: React.ReactNode;
  error?: string;
}) {
  return (
    <label className="grid gap-1 text-sm">
      <span className="font-semibold text-slate-700">{label}</span>
      {children}
      {error ? <span className="text-xs text-red-600">{error}</span> : null}
    </label>
  );
}
