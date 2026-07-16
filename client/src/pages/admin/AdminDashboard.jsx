import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, Users, Mail, CreditCard, RefreshCw } from "lucide-react";
import {
  getAdminToken,
  clearAdminToken,
  getStats,
  getLeads,
  updateLeadStatus,
  getNewsletterSignups,
  getSubscriptions,
  getAuditLog,
} from "../../lib/adminApi";
import { Section } from "../../components/ui/Section";
import StatusPill from "../../components/ui/StatusPill";
import BarChart from "../../components/ui/charts/BarChart";
import LineChart from "../../components/ui/charts/LineChart";

const TABS = ["Overview", "Leads", "Newsletter", "Subscriptions", "Audit Log"];

const LEAD_STATUS_TO_PILL = { new: "warn", contacted: "pass", closed: "fail" };

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [tab, setTab] = useState("Overview");
  const [stats, setStats] = useState(null);
  const [leads, setLeads] = useState([]);
  const [newsletter, setNewsletter] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);
  const [auditLog, setAuditLog] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!getAdminToken()) {
      navigate("/admin/login");
      return;
    }
    loadOverview();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function loadOverview() {
    setLoading(true);
    setError("");
    try {
      const data = await getStats();
      setStats(data);
    } catch (err) {
      setError(err.message);
      if (!getAdminToken()) navigate("/admin/login");
    } finally {
      setLoading(false);
    }
  }

  async function loadTab(nextTab) {
    setTab(nextTab);
    setError("");
    try {
      if (nextTab === "Leads" && leads.length === 0) {
        const data = await getLeads();
        setLeads(data.leads || []);
      }
      if (nextTab === "Newsletter" && newsletter.length === 0) {
        const data = await getNewsletterSignups();
        setNewsletter(data.signups || []);
      }
      if (nextTab === "Subscriptions" && subscriptions.length === 0) {
        const data = await getSubscriptions();
        setSubscriptions(data.subscriptions || []);
      }
      if (nextTab === "Audit Log" && auditLog.length === 0) {
        const data = await getAuditLog();
        setAuditLog(data.entries || []);
      }
    } catch (err) {
      setError(err.message);
      if (!getAdminToken()) navigate("/admin/login");
    }
  }

  async function handleStatusChange(id, status) {
    try {
      await updateLeadStatus(id, status);
      setLeads((prev) => prev.map((l) => (l._id === id ? { ...l, status } : l)));
    } catch (err) {
      setError(err.message);
    }
  }

  function handleLogout() {
    clearAdminToken();
    navigate("/admin/login");
  }

  const noDb = stats && stats.connected === false;

  return (
    <Section className="py-12">
      <div className="flex items-center justify-between mb-8 flex-wrap gap-3">
        <div>
          <p className="eyebrow mb-1">Internal</p>
          <h1 className="font-display text-2xl font-semibold">Admin dashboard</h1>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={loadOverview} className="btn btn-secondary" title="Refresh">
            <RefreshCw size={15} />
          </button>
          <button onClick={handleLogout} className="btn btn-secondary">
            <LogOut size={15} /> Sign out
          </button>
        </div>
      </div>

      {noDb && (
        <div className="card p-4 mb-6 border-[var(--color-warn)] bg-[var(--color-warn-soft)]">
          <p className="text-sm text-[var(--color-warn)]">{stats.message}</p>
        </div>
      )}
      {error && <p className="text-sm text-[var(--color-fail)] mb-4">{error}</p>}

      <div className="flex gap-1 mb-8 border-b border-[var(--color-border)]">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => loadTab(t)}
            className={`px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors ${
              tab === t
                ? "border-[var(--color-accent-strong)] text-[var(--color-text)]"
                : "border-transparent text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {loading && tab === "Overview" && <p className="text-sm text-[var(--color-text-muted)]">Loading...</p>}

      {tab === "Overview" && stats && stats.connected && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <StatCard icon={<Users size={16} />} label="Total leads" value={stats.leadCount} />
            <StatCard icon={<Mail size={16} />} label="Newsletter subscribers" value={stats.newsletterCount} />
            <StatCard icon={<CreditCard size={16} />} label="Active mock subscriptions" value={stats.subscriptionCount} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="card p-6">
              <p className="eyebrow mb-4">Leads, last 14 days</p>
              <LineChart data={(stats.leadsByDay || []).map((d) => ({ label: d.date, value: d.count }))} />
            </div>
            <div className="card p-6">
              <p className="eyebrow mb-4">Assistant questions by intent</p>
              <BarChart data={(stats.intentBreakdown || []).map((d) => ({ label: d.intent, value: d.count }))} />
            </div>
          </div>

          <div className="card p-6">
            <p className="eyebrow mb-4">Recent leads</p>
            <LeadsTable leads={stats.recentLeads || []} onStatusChange={handleStatusChange} />
          </div>
        </div>
      )}

      {tab === "Leads" && (
        <div className="card p-6">
          <LeadsTable leads={leads} onStatusChange={handleStatusChange} full />
        </div>
      )}

      {tab === "Newsletter" && (
        <div className="card p-6 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--color-border)] text-left text-xs font-mono uppercase tracking-wide text-[var(--color-text-faint)]">
                <th className="py-2 pe-4">Email</th>
                <th className="py-2 pe-4">Source</th>
                <th className="py-2">Subscribed</th>
              </tr>
            </thead>
            <tbody>
              {newsletter.map((n) => (
                <tr key={n._id} className="border-b border-[var(--color-border)]">
                  <td className="py-2 pe-4">{n.email}</td>
                  <td className="py-2 pe-4 text-[var(--color-text-muted)]">{n.source}</td>
                  <td className="py-2 text-[var(--color-text-muted)]">{new Date(n.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
              {newsletter.length === 0 && (
                <tr><td colSpan={3} className="py-6 text-center text-[var(--color-text-faint)]">No signups yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {tab === "Subscriptions" && (
        <div className="card p-6 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--color-border)] text-left text-xs font-mono uppercase tracking-wide text-[var(--color-text-faint)]">
                <th className="py-2 pe-4">Customer</th>
                <th className="py-2 pe-4">Plan</th>
                <th className="py-2 pe-4">Card</th>
                <th className="py-2 pe-4">Invoice</th>
                <th className="py-2">Created</th>
              </tr>
            </thead>
            <tbody>
              {subscriptions.map((s) => (
                <tr key={s._id} className="border-b border-[var(--color-border)]">
                  <td className="py-2 pe-4">{s.name}<br /><span className="text-xs text-[var(--color-text-faint)]">{s.email}</span></td>
                  <td className="py-2 pe-4">{s.planName}<br /><span className="text-xs text-[var(--color-text-faint)]">{s.priceLabel}</span></td>
                  <td className="py-2 pe-4 font-mono text-xs">{s.cardBrand} •••• {s.cardLast4}</td>
                  <td className="py-2 pe-4 font-mono text-xs">{s.mockInvoiceId}</td>
                  <td className="py-2 text-[var(--color-text-muted)]">{new Date(s.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
              {subscriptions.length === 0 && (
                <tr><td colSpan={5} className="py-6 text-center text-[var(--color-text-faint)]">No subscriptions yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {tab === "Audit Log" && (
        <div className="card p-6 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--color-border)] text-left text-xs font-mono uppercase tracking-wide text-[var(--color-text-faint)]">
                <th className="py-2 pe-4">Action</th>
                <th className="py-2 pe-4">Detail</th>
                <th className="py-2 pe-4">IP</th>
                <th className="py-2">When</th>
              </tr>
            </thead>
            <tbody>
              {auditLog.map((entry) => (
                <tr key={entry._id} className="border-b border-[var(--color-border)]">
                  <td className="py-2 pe-4">
                    <StatusPill
                      status={entry.action === "login_failure" ? "fail" : entry.action === "login_success" ? "pass" : "warn"}
                      label={entry.action.replace(/_/g, " ")}
                    />
                  </td>
                  <td className="py-2 pe-4 text-[var(--color-text-muted)]">{entry.detail}</td>
                  <td className="py-2 pe-4 font-mono text-xs text-[var(--color-text-faint)]">{entry.ip}</td>
                  <td className="py-2 text-[var(--color-text-muted)]">{new Date(entry.createdAt).toLocaleString()}</td>
                </tr>
              ))}
              {auditLog.length === 0 && (
                <tr><td colSpan={4} className="py-6 text-center text-[var(--color-text-faint)]">No audit entries yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </Section>
  );
}

function StatCard({ icon, label, value }) {
  return (
    <div className="card p-6">
      <div className="flex items-center gap-2 text-[var(--color-accent-strong)] mb-3">{icon}</div>
      <p className="font-display text-3xl font-semibold">{value}</p>
      <p className="text-sm text-[var(--color-text-muted)] mt-1">{label}</p>
    </div>
  );
}

function LeadsTable({ leads, onStatusChange, full = false }) {
  if (leads.length === 0) {
    return <p className="text-sm text-[var(--color-text-faint)]">No leads yet.</p>;
  }
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-[var(--color-border)] text-left text-xs font-mono uppercase tracking-wide text-[var(--color-text-faint)]">
            <th className="py-2 pe-4">Name</th>
            <th className="py-2 pe-4">Company</th>
            <th className="py-2 pe-4">Message</th>
            <th className="py-2 pe-4">Demo?</th>
            <th className="py-2 pe-4">Status</th>
            {full && <th className="py-2">Update</th>}
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr key={lead._id} className="border-b border-[var(--color-border)] align-top">
              <td className="py-2.5 pe-4">
                {lead.name}
                <br />
                <span className="text-xs text-[var(--color-text-faint)]">{lead.email}</span>
              </td>
              <td className="py-2.5 pe-4 text-[var(--color-text-muted)]">{lead.company || "—"}</td>
              <td className="py-2.5 pe-4 text-[var(--color-text-muted)] max-w-[240px] truncate" title={lead.message}>
                {lead.message}
              </td>
              <td className="py-2.5 pe-4">{lead.requestedDemo ? "Yes" : "No"}</td>
              <td className="py-2.5 pe-4">
                <StatusPill status={LEAD_STATUS_TO_PILL[lead.status] || "warn"} label={lead.status} />
              </td>
              {full && (
                <td className="py-2.5">
                  <select
                    value={lead.status}
                    onChange={(e) => onStatusChange(lead._id, e.target.value)}
                    className="input py-1 text-xs"
                  >
                    <option value="new">new</option>
                    <option value="contacted">contacted</option>
                    <option value="closed">closed</option>
                  </select>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
