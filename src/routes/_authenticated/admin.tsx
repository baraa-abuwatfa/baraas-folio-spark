import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { getAdminStatus } from "@/lib/admin.functions";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Admin Dashboard | Baraa" },
      { name: "description", content: "Private content administration for Baraa’s portfolio." },
      { property: "og:title", content: "Admin Dashboard | Baraa" },
      { property: "og:description", content: "Private content administration." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminPage,
});

const labels: Record<string, string> = {
  project: "Projects",
  experience: "Experience entries",
  skill_group: "Skill groups",
  service: "Services",
  category: "Project categories",
  identity: "Profile links",
};

function AdminPage() {
  const fetchStatus = useServerFn(getAdminStatus);
  const status = useQuery({ queryKey: ["admin-status"], queryFn: () => fetchStatus() });
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  async function signOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }
  return (
    <section className="section reveal" dir="ltr">
      <div className="container max-w-3xl">
        <span className="section-kicker">PRIVATE AREA</span>
        <h1 className="page-title">Admin Dashboard</h1>
        {status.isPending && <p>Checking your access…</p>}
        {status.isError && <p role="alert">Your access could not be checked. Please refresh.</p>}
        {status.data && !status.data.isAdmin && (
          <p role="alert" className="mt-4">
            This account does not have administrator permissions.
          </p>
        )}
        {status.data?.isAdmin && (
          <>
            <p className="mt-4">
              Administrator access confirmed. Content management tools will be added in the next
              phase.
            </p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {Object.entries(labels).map(([kind, label]) => (
                <li key={kind} className="rounded-lg border border-border bg-card p-4">
                  <strong className="block text-2xl text-foreground">
                    {status.data.counts[kind] ?? 0}
                  </strong>
                  <span className="text-sm text-muted-foreground">{label} in the database</span>
                </li>
              ))}
            </ul>
          </>
        )}
        <Button variant="outline" className="mt-8" onClick={signOut}>
          Sign out
        </Button>
      </div>
    </section>
  );
}
