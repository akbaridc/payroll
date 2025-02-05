import { Badge } from "@/components/ui/badge"

export function StatusBadge({ status }: { status: string }) {
    const statusName = status === '1' ? "Active" : "Inactive";
    const variantBadge = status === '1' ? "success" : "destructive";

    return (<Badge variant={variantBadge}>{statusName}</Badge>)
}