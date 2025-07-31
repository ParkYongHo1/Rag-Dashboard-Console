export const QUERY_KEYS = {
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

  STATISTICS: {
    GET: (params: {
      dashboardId: string;
      selectGroupData: string;
      startDate: Date;
      endDate: Date;
    }) => ["STATISTICS", "GET", params] as const,
  },
} as const;
