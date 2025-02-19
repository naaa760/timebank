"use client";

import { Laptop, Smartphone, Info } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Device {
  id: string;
  type: "desktop" | "mobile";
  name: string;
  lastActive: Date;
  location: string;
  browser: string;
}

interface DeviceHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DeviceHistoryModal({
  isOpen,
  onClose,
}: DeviceHistoryModalProps) {
  const devices: Device[] = [
    {
      id: "1",
      type: "desktop",
      name: "MacBook Pro",
      lastActive: new Date(),
      location: "San Francisco, US",
      browser: "Chrome 121.0",
    },
    {
      id: "2",
      type: "mobile",
      name: "iPhone 13",
      lastActive: new Date(Date.now() - 24 * 60 * 60 * 1000),
      location: "San Francisco, US",
      browser: "Safari Mobile",
    },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Device History</DialogTitle>
          <DialogDescription>
            Devices that have accessed your account
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          {devices.map((device) => (
            <div
              key={device.id}
              className="flex items-start space-x-4 p-4 border rounded-lg"
            >
              {device.type === "desktop" ? (
                <Laptop className="h-5 w-5 text-muted-foreground" />
              ) : (
                <Smartphone className="h-5 w-5 text-muted-foreground" />
              )}
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">{device.name}</h4>
                  <span className="text-xs text-muted-foreground">
                    {device.lastActive.toLocaleDateString()}
                  </span>
                </div>
                <div className="mt-1 text-sm text-muted-foreground">
                  <p>{device.browser}</p>
                  <p>{device.location}</p>
                </div>
              </div>
              <button className="text-blue-500 hover:text-blue-600">
                <Info className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
