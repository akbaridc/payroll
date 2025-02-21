import { Badge } from "@/components/ui/badge"

export function StatusBadge({ status }: { status: string }) {
    let statusName = "success";
    let variantBadge: "default" | "secondary" | "destructive" | "success" | "outline" = "success";
    if(status === "1") {
        statusName = "Active";
        variantBadge = "success";
    }

    if(status === "0"){
        statusName = "Inactive";
        variantBadge = "destructive";
    }

    if(status === "H" || status === "HL"){
        statusName = status === "H" ? "Hadir" : "Hadir Libur";
        variantBadge = "success";
    }

    if(["L", "A", "C", "I", "S", "OFF"].includes(status)){
        statusName = status === "L" ? "Libur" : status === "A" ? "Alpha" : status === "C" ? "Cuti" : status === "I" ? "Izin" : status === "OFF" ? "OFF" : "Sakit";
        variantBadge = "destructive";
    }

    return (<Badge variant={variantBadge}>{statusName}</Badge>)
}