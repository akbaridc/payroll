import { Bot } from "lucide-react";

export function Payroll() {
    return {
        title: "Payroll",
        url: "#",
        icon: Bot,
        items: [
            {
                title: "Master",
                url: "#",
                items: [
                    {
                        title: "Periode Payroll",
                        url: "backoffice/payroll/periode-payroll",
                    },
                ],
            },
            {
                title: "Utility",
                url: "#",
                items: [   
                    {
                        title: "Pre Payroll",
                        url: "backoffice/payroll/prepayroll",
                    },
                    {
                        title: "Payroll",
                        url: "backoffice/payroll/payroll",
                    },
                ],
            },
        ],
    };
}
