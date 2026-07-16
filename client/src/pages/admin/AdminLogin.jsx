import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock } from "lucide-react";
import { adminLogin } from "../../lib/adminApi";
import { Section } from "../../components/ui/Section";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await adminLogin(password);
      navigate("/admin/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Section className="py-32 max-w-sm mx-auto">
      <div className="card p-8">
        <div className="w-10 h-10 rounded-lg bg-[var(--color-accent-soft)] flex items-center justify-center mb-5">
          <Lock size={18} className="text-[var(--color-accent-strong)]" />
        </div>
        <h1 className="font-display text-xl font-semibold mb-1">Admin sign in</h1>
        <p className="text-sm text-[var(--color-text-muted)] mb-6">
          Internal dashboard. Not indexed, not linked from primary navigation.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            autoFocus
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Admin password"
            className="input"
          />
          {error && <p className="text-sm text-[var(--color-fail)]">{error}</p>}
          <button type="submit" className="btn btn-primary w-full justify-center" disabled={loading}>
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
        <p className="text-xs text-[var(--color-text-faint)] mt-6">
          Demo password is <code className="font-mono">complai-admin</code> unless changed via{" "}
          <code className="font-mono">ADMIN_PASSWORD</code> in the server environment.
        </p>
      </div>
    </Section>
  );
}
