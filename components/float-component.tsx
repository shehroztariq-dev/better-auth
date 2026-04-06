import React from "react";
import { Button } from "./ui/button";
import { Plus, Sidebar } from "lucide-react";
import { SidebarTrigger } from "./ui/sidebar";

interface FloatComponentProps {
  position?:
    | "bottom-right"
    | "bottom-left"
    | "top-right"
    | "top-left"
    | "bottom-center"
    | "top-center";
  className: string;
}

export default function FloatComponent({
  position = "bottom-center",
  className,
}: FloatComponentProps) {
  const positionClasses = {
    "bottom-right": "bottom-4 right-4 left-auto transform-none",
    "bottom-left": "bottom-4 left-4 transform-none",
    "top-right": "top-4 right-4 transform-none",
    "top-left": "top-4 left-4 transform-none",
    "bottom-center": "bottom-4 left-1/2 -translate-x-1/2",
    "top-center": "top-4 left-1/2 -translate-x-1/2",
  };

  return (
    <div
      className={`fixed z-50 ${positionClasses[position]} ${className} bg-secondary h-10 w-10 rounded-full items-center flex justify-center`}>
      <SidebarTrigger />
    </div>
  );
}
