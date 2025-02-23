import { Bot } from "lucide-react";

export function Setting() {
    return {
        title: "Setting",
        url: "#",
        icon: Bot,
        items: [
            {
                title: "Master Data",
                url: "#",
                items: [
                    // {
                    //     title: "Religion",
                    //     url: "backoffice/setting/master-data/religion",
                    // },
                    {
                        title: "Division",
                        url: "backoffice/setting/master-data/divisi",
                    },
                    {
                        title: "Levels",
                        url: "backoffice/setting/master-data/level",
                    },
                    {
                        title: "Holidays",
                        url: "backoffice/setting/master-data/holiday",
                    },
                    {
                        title: "Category Absensi",
                        url: "backoffice/setting/master-data/category-absensi",
                    },
                    {
                        title: "Allowance",
                        url: "backoffice/setting/master-data/allowance",
                    },
                ],
            },
        ],
    };
}
