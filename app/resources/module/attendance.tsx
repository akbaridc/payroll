import { Bot } from "lucide-react";

export function Attendance() {
    return {
        title: "Attendance",
        url: "#",
        icon: Bot,
        items: [
            {
                title: "Utility",
                url: "#",
                items: [
                    {
                        title: "Attendance Recap",
                        url: "backoffice/attendance/utility/attendance-recap",
                    },
                ],
            },
            {
                title: "Attendance Time Sheet",
                url: "backoffice/attendance/attendance-time-sheet",
            },
        ],
    };
}
