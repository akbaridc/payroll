// resources/sidebarResource.ts
import { SquareTerminal, Bot } from "lucide-react";

export function SidebarResource() {
  return {
    sidebarItem: [
      {
        title: "Dashboard",
        url: "#",
        icon: SquareTerminal,
      },
      {
        title: "Employee",
        url: "#",
        icon: SquareTerminal,
        items: [
          {
            title: "Employee",
            url: "#",
            icon: SquareTerminal,
          },
          {
            title: "Transaction",
            url: "#",
            icon: SquareTerminal,
          },
          {
            title: "Report",
            url: "#",
            icon: SquareTerminal,
          },
          {
            title: "Utility",
            url: "#",
            icon: SquareTerminal,
          },
        ],
      },
      {
        title: "Attendance",
        url: "#",
        icon: Bot,
        items: [
          {
            title: "Genesis",
            url: "#",
          },
          {
            title: "Explorer",
            url: "#",
          },
          {
            title: "Quantum",
            url: "#",
          },
        ],
      },
      {
        title: "Payroll",
        url: "#",
        icon: Bot,
        items: [
          {
            title: "Genesis",
            url: "#",
          },
          {
            title: "Explorer",
            url: "#",
          },
          {
            title: "Quantum",
            url: "#",
          },
        ],
      },
      {
        title: "Setting",
        url: "#",
        icon: Bot,
        items: [
          {
            title: "Genesis",
            url: "#",
          },
          {
            title: "Explorer",
            url: "#",
          },
          {
            title: "Quantum",
            url: "#",
          },
        ],
      },
    ],
  };
}
