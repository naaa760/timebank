"use client";

import { useEffect } from "react";
import { useDashboard } from "@/contexts/DashboardContext";
import { Transaction, Notification } from "@/lib/api";

export function DashboardWebSocket() {
  const { dispatch } = useDashboard();

  useEffect(() => {
    const ws = new WebSocket(process.env.NEXT_PUBLIC_WS_URL || "");

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      switch (data.type) {
        case "NEW_TRANSACTION":
          dispatch({
            type: "ADD_TRANSACTION",
            payload: data.payload as Transaction,
          });
          break;
        case "NEW_NOTIFICATION":
          dispatch({
            type: "ADD_NOTIFICATION",
            payload: data.payload as Notification,
          });
          break;
      }
    };

    return () => {
      ws.close();
    };
  }, [dispatch]);

  return null;
}
