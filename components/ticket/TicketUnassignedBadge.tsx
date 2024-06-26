import { Badge } from "@/components/ui/badge"
import { TriangleAlert } from "lucide-react"

const TicketUnassignedBadge = () => {
  return (
    <Badge className="ml-1 text-white">
      <TriangleAlert width={15} height={15} />
      <span className="px-1 font-medium">Unassigned</span>
    </Badge>
  )
}

export default TicketUnassignedBadge
