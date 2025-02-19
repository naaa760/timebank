"use client";

import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  ReactNode,
} from "react";
import {
  UserProfile,
  Transaction,
  Service,
  Notification,
  fetchUserProfile,
  fetchTransactions,
  fetchNotifications,
} from "@/lib/api";
import { communityApi } from "@/lib/api/community";

interface DashboardState {
  profile: UserProfile | null;
  transactions: Transaction[];
  services: Service[];
  notifications: Notification[];
  loading: {
    profile: boolean;
    transactions: boolean;
    services: boolean;
    notifications: boolean;
  };
  error: {
    profile: string | null;
    transactions: string | null;
    services: string | null;
    notifications: string | null;
  };
}

type DashboardAction =
  | { type: "SET_PROFILE"; payload: UserProfile }
  | { type: "SET_TRANSACTIONS"; payload: Transaction[] }
  | { type: "SET_SERVICES"; payload: Service[] }
  | { type: "SET_NOTIFICATIONS"; payload: Notification[] }
  | {
      type: "SET_LOADING";
      key: keyof DashboardState["loading"];
      value: boolean;
    }
  | {
      type: "SET_ERROR";
      key: keyof DashboardState["error"];
      value: string | null;
    }
  | { type: "ADD_TRANSACTION"; payload: Transaction }
  | { type: "ADD_NOTIFICATION"; payload: Notification }
  | { type: "ADD_SERVICE"; payload: Service };

const DashboardContext = createContext<{
  state: DashboardState;
  dispatch: React.Dispatch<DashboardAction>;
} | null>(null);

function dashboardReducer(
  state: DashboardState,
  action: DashboardAction
): DashboardState {
  switch (action.type) {
    case "SET_PROFILE":
      return { ...state, profile: action.payload };
    case "SET_TRANSACTIONS":
      return { ...state, transactions: action.payload };
    case "SET_SERVICES":
      return { ...state, services: action.payload };
    case "SET_NOTIFICATIONS":
      return { ...state, notifications: action.payload };
    case "SET_LOADING":
      return {
        ...state,
        loading: { ...state.loading, [action.key]: action.value },
      };
    case "SET_ERROR":
      return {
        ...state,
        error: { ...state.error, [action.key]: action.value },
      };
    case "ADD_TRANSACTION":
      return {
        ...state,
        transactions: [action.payload, ...state.transactions],
      };
    case "ADD_NOTIFICATION":
      return {
        ...state,
        notifications: [action.payload, ...state.notifications],
      };
    case "ADD_SERVICE":
      return {
        ...state,
        services: [...state.services, action.payload],
      };
    default:
      return state;
  }
}

function DashboardProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(dashboardReducer, {
    loading: {
      profile: true,
      transactions: true,
      services: true,
      notifications: true,
    },
    error: {
      profile: null,
      transactions: null,
      services: null,
      notifications: null,
    },
    profile: null,
    transactions: [],
    services: [],
    notifications: [],
  });

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch profile
        dispatch({ type: "SET_LOADING", key: "profile", value: true });
        const profile = await fetchUserProfile();
        dispatch({ type: "SET_PROFILE", payload: profile });
      } catch {
        dispatch({
          type: "SET_ERROR",
          key: "profile",
          value: "Failed to load profile",
        });
      } finally {
        dispatch({ type: "SET_LOADING", key: "profile", value: false });
      }

      try {
        // Fetch transactions
        dispatch({ type: "SET_LOADING", key: "transactions", value: true });
        const transactions = await fetchTransactions();
        dispatch({ type: "SET_TRANSACTIONS", payload: transactions });
      } catch {
        dispatch({
          type: "SET_ERROR",
          key: "transactions",
          value: "Failed to load transactions",
        });
      } finally {
        dispatch({ type: "SET_LOADING", key: "transactions", value: false });
      }

      try {
        // Fetch services
        dispatch({ type: "SET_LOADING", key: "services", value: true });
        const services = await communityApi.getServices();
        dispatch({ type: "SET_SERVICES", payload: services });
      } catch {
        dispatch({
          type: "SET_ERROR",
          key: "services",
          value: "Failed to load services",
        });
      } finally {
        dispatch({ type: "SET_LOADING", key: "services", value: false });
      }

      try {
        // Fetch notifications
        dispatch({ type: "SET_LOADING", key: "notifications", value: true });
        const notifications = await fetchNotifications();
        dispatch({ type: "SET_NOTIFICATIONS", payload: notifications });
      } catch {
        dispatch({
          type: "SET_ERROR",
          key: "notifications",
          value: "Failed to load notifications",
        });
      } finally {
        dispatch({ type: "SET_LOADING", key: "notifications", value: false });
      }
    }

    fetchData();
  }, []);

  return (
    <DashboardContext.Provider value={{ state, dispatch }}>
      {children}
    </DashboardContext.Provider>
  );
}

function useDashboard() {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }
  return context;
}

export { DashboardProvider, useDashboard };
