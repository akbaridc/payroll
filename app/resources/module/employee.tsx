import { SquareTerminal } from "lucide-react";

export function Employee() {
    return {
        title: "Employee",
        url: "#",
        icon: SquareTerminal,
        items: [
            {
                title: "Master Employee",
                url: "backoffice/employee",
            },
        ],
    };
}
