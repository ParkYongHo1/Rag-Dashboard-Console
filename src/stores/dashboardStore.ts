// stores/dashboardStore.ts
import { create } from "zustand";

export interface DatabaseColumn {
  databaseColumn: string;
  dataType: string;
}

export interface DashboardDefaultInfo {
  dashboardName: string;
  tableName: string;
  dashboardDescription: string;
}

export interface GroupData {
  groupId: number;
  databaseColumn: string;
  databaseColumnAlias: string;
  data: string;
}

export interface AggregatedData {
  aggregatedId: number;
  aggregatedDatabaseColumn: string;
  dataType: string;
  databaseColumnAlias: string;
  condition: string;
  conditionValue: string;
  statMethod: string;
}

export interface GroupItem {
  groupId: number;
  databaseColumn: string;
  databaseColumnAlias: string;
  data: string;
}

export interface DashboardDetailInfo {
  groupData: GroupData;
  aggregatedData: AggregatedData;
}

export interface DashboardData {
  createdAt: string;
  updatedAt: string;
  databaseColumnList: DatabaseColumn[];
  dashboardDefaultInfo: DashboardDefaultInfo;
  dashboardDetailInfo: DashboardDetailInfo;
}

export interface DashboardState {
  currentDashboard: DashboardData | null;

  groupItems: GroupItem[];

  // 로딩 상태
  isLoading: boolean;

  // 액션들
  setCurrentDashboard: (data: DashboardData) => void;
  setDashboardDefaultInfo: (info: DashboardDefaultInfo) => void;
  setDashboardDetailInfo: (info: DashboardDetailInfo) => void;
  setGroupItems: (items: GroupItem[]) => void;
  addGroupItem: (item: GroupItem) => void;
  updateGroupItem: (id: number, updates: Partial<GroupItem>) => void;
  deleteGroupItem: (id: number) => void;
  reorderGroupItems: (startIndex: number, endIndex: number) => void;
  clearCurrentDashboard: () => void;
  setLoading: (loading: boolean) => void;

  // 편의 getter들
  getDatabaseColumnList: () => DatabaseColumn[];
  getTableNamesList: () => string[];
}

export const useDashboardStore = create<DashboardState>((set, get) => ({
  currentDashboard: null,
  groupItems: [],
  isLoading: false,

  setCurrentDashboard: (data) => {
    set({ currentDashboard: data });
  },

  setDashboardDefaultInfo: (info) =>
    set((state) => ({
      currentDashboard: state.currentDashboard
        ? { ...state.currentDashboard, dashboardDefaultInfo: info }
        : null,
    })),

  setDashboardDetailInfo: (info) =>
    set((state) => ({
      currentDashboard: state.currentDashboard
        ? { ...state.currentDashboard, dashboardDetailInfo: info }
        : null,
    })),

  setGroupItems: (items) => set({ groupItems: items }),

  addGroupItem: (item) =>
    set((state) => ({
      groupItems: [...state.groupItems, item],
    })),

  updateGroupItem: (id, updates) =>
    set((state) => ({
      groupItems: state.groupItems.map((item) =>
        item.groupId === id ? { ...item, ...updates } : item
      ),
    })),

  deleteGroupItem: (id) =>
    set((state) => ({
      groupItems: state.groupItems.filter((item) => item.groupId !== id),
    })),

  reorderGroupItems: (startIndex, endIndex) => {
    set((state) => {
      const newItems = [...state.groupItems];
      const [removed] = newItems.splice(startIndex, 1);
      newItems.splice(endIndex, 0, removed);
      return { groupItems: newItems };
    });
  },

  clearCurrentDashboard: () => set({ currentDashboard: null, groupItems: [] }),

  setLoading: (loading) => set({ isLoading: loading }),

  getDatabaseColumnList: () => get().currentDashboard?.databaseColumnList || [],

  getTableNamesList: () => {
    const columns = get().currentDashboard?.databaseColumnList || [];
    return [...new Set(columns.map((col) => col.databaseColumn))];
  },
}));
