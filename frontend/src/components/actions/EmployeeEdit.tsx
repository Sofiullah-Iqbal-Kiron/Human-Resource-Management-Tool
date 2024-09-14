import { Button } from "../../shadcn/ui/button"
import { Edit as EditIcon } from "lucide-react"
import { Link } from "react-router-dom"

import { EmployeeType } from "@/src/types"
import { ACTION_ICON_SIZE } from "../../constants"


export default function EmployeeEdit(employee: EmployeeType) {
    return (
        <Link to={`../employees/${employee.id}/update`}>
            <Button variant="ghost" size="icon">
                <EditIcon size={ACTION_ICON_SIZE} className="text-cyan-700" />
            </Button>
        </Link>
    )
}
