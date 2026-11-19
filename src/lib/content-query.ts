import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { getPublicContent } from "@/lib/content.functions";

export const contentQuery = queryOptions({
  queryKey: ["portfolio-content"],
  queryFn: () => getPublicContent(),
  staleTime: 60_000,
});

export function useContent() {
  return useSuspenseQuery(contentQuery).data;
}
