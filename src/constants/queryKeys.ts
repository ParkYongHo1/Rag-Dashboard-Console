export const QUERY_KEYS = {
  TEST: ["test"] as const,
  DASHBOARD: {
    LIST: (params: { page: number; size: number }) =>
      ["DASHBOARD", "LIST", params] as const,
    CREATE: (params: {
      dashboardName: string;
      databaseName: string;
      dashboardDescription: string;
    }) => ["DASHBOARD", "CREATE", params] as const,

    READ: (params: { dashboardId: string; status: string }) =>
      ["DASHBOARD", "READ", params] as const,

    DETAIL: (id: string) => ["DASHBOARD", "DETAIL", id] as const,
  },
} as const;
