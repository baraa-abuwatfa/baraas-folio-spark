import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

/** Reports whether the signed-in user is the administrator, plus content counts for admins. */
export const getAdminStatus = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data: isAdmin } = await context.supabase.rpc("has_role", {
      _user_id: context.userId,
      _role: "admin",
    });
    if (!isAdmin) return { isAdmin: false as const, counts: {} as Record<string, number> };
    const { data } = await context.supabase.from("content_items").select("kind");
    const counts: Record<string, number> = {};
    for (const row of data ?? []) counts[row.kind] = (counts[row.kind] ?? 0) + 1;
    return { isAdmin: true as const, counts };
  });
