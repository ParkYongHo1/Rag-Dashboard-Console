export const QUERY_KEYS = {
  TEST: ["test"] as const,
  DASHBOARD: {
    LIST: (params: { page: number; size: number }) =>
      ["DASHBOARD", "LIST", params] as const,
    DETAIL: (id: string) => ["DASHBOARD", "DETAIL", id] as const,
  },
} as const;
