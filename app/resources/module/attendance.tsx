import { Bot } from "lucide-react";

export function Attendance() {
    return {
        title: "Attendance",
        url: "#",
        icon: Bot,
        items: [
            {
                title: "Employee Group Shift",
                url: "#",
            },
            {
                title: "Transaction",
                url: "#",
                items: [
                    {
                        title: "Basic",
                        url: "#",
                    },
                    {
                        title: "Change Shift",
                        url: "#",
                    },
                    {
                        title: "Check Clock",
                        url: "#",
                    },
                    {
                        title: "Check Clock Request",
                        url: "#",
                    },
                    {
                        title: "Request Form",
                        url: "#",
                        items: [
                            {
                                title: "Annual Leave",
                                url: "#",
                            },
                            {
                                title: "Sabbatical Leave",
                                url: "#",
                            },
                            {
                                title: "Other Leave",
                                url: "#",
                            },
                            {
                                title: "Permit in the Middle",
                                url: "#",
                            },
                            {
                                title: "Leave Request",
                                url: "#",
                            },
                        ],
                    },
                    {
                        title: "Change Work Hour",
                        url: "#",
                    },
                    {
                        title: "Create Shift Schedule",
                        url: "#",
                    },
                ],
            },
            {
                title: "Report",
                url: "#",
                items: [
                    {
                        title: "Raw Data",
                        url: "#",
                    },
                    {
                        title: "Attendance Summary and Detail",
                        url: "#",
                    },
                ],
            },
            {
                title: "Utility",
                url: "#",
                items: [
                    {
                        title: "Check Clock Approval",
                        url: "#",
                    },
                    {
                        title: "Request Form Approval",
                        url: "#",
                    },
                    {
                        title: "Change Work Hour Approval",
                        url: "#",
                    },
                    {
                        title: "Attendance Recap",
                        url: "#",
                    },
                    {
                        title: "Basic Attendance Recap",
                        url: "#",
                    },
                    {
                        //attendance yesterday and now
                        title: "Manual Attendance Process",
                        url: "#",
                    },
                ],
            },
            {
                title: "Attendance Time Sheet",
                url: "backoffice/attendance/attendance-time-sheet",
            },
            {
                title: "Attendance Control",
                url: "#",
            },
            {
                title: "Scheduling Management",
                url: "#",
            },
        ],
    };
}
