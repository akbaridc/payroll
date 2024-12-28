// resources/sidebarResource.ts
import { SquareTerminal } from "lucide-react";
import { Employee } from "./module/employee";
import { Attendance } from "./module/attendance";
import { Payroll } from "./module/payroll";
import { Setting } from "./module/setting";

export function SidebarResource() {
  return {
    sidebarItem: [
      {
        title: "Dashboard",
        url: "#",
        icon: SquareTerminal,
      },
      Employee(),
      Attendance(),
      Payroll(),
      Setting(),
    ],
  };
}
