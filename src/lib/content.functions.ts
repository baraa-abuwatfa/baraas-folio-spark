import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import type { PortfolioContent } from "@/lib/portfolio-data";

/** Public read of published portfolio content. RLS limits anonymous reads to published rows. */
export const getPublicContent = createServerFn({ method: "GET" }).handler(
  async (): Promise<PortfolioContent> => {
    const url = process.env["SUPABASE_URL"]!;
    const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;
    const client = createClient<Database>(url, key, {
      auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
      global: {
        fetch: (input, init) => {
          const h = new Headers(init?.headers);
          if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`)
            h.delete("Authorization");
          h.set("apikey", key);
          return fetch(input, { ...init, headers: h });
        },
      },
    });
    const { data, error } = await client
      .from("content_items")
      .select("kind, slug, data")
      .eq("published", true)
      .order("sort_order");
    if (error) throw new Error("Portfolio content could not be loaded.");
    const of = <T,>(kind: string) =>
      (data ?? []).filter((row) => row.kind === kind).map((row) => row.data as unknown as T);
    const identity = of<PortfolioContent["identity"]>("identity")[0];
    if (!identity) throw new Error("Portfolio content is missing.");
    return {
      identity,
      categories: of("category"),
      projects: of("project"),
      services: of("service"),
      skillGroups: of("skill_group"),
      experience: of("experience"),
    };
  },
);
