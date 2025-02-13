import { Bot } from "lucide-react";

export function Payroll() {
    return {
        title: "Payroll",
        url: "#",
        icon: Bot,
        items: [
            {
                title: "Periode Payroll",
                url: "backoffice/payroll/periode-payroll",
            },
            {
                title: "Pre Payroll",
                url: "backoffice/payroll/prepayroll",
            },
            {
                title: "Master",
                url: "#",
                items: [
                    {
                        title: "By Grade",
                        url: "#",
                    },
                    {
                        title: "By Title",
                        url: "#",
                    },
                    {
                        title: "By Grade and Title",
                        url: "#",
                    },
                    {
                        title: "By Employee",
                        url: "#",
                    },
                ],
            },
            {
                title: "Transaction",
                url: "#",
                items: [
                    {
                        title: "Payroll Transaction",
                        url: "#",
                    },
                ],
            },
            {
                title: "Report",
                url: "#",
                items: [
                    {
                        title: "Pay Slip",
                        url: "#",
                    },
                    {
                        title: "Salary Report",
                        url: "#",
                    },
                ],
            },
            {
                title: "Utility",
                url: "#",
                items: [
                    {
                        title: "Payroll Process",
                        url: "#",
                    },
                    {
                        title: "Closing Payroll",
                        url: "#",
                    },
                ],
            },
        ],
    };
}
