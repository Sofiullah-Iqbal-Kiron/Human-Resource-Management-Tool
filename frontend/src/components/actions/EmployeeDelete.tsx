import { useState } from "react"

import { Button } from "../../../src/shadcn/ui/button"
import { Dialog, DialogTitle, DialogTrigger, DialogDescription, DialogContent, DialogClose, DialogFooter, DialogHeader } from "../../../src/shadcn/ui/dialog"
import { Trash2 as DeleteIcon } from "lucide-react"
import { useQueryClient } from "@tanstack/react-query"
import axios from "axios"

import { EmployeeType } from "@/src/types"
import { ACTION_ICON_SIZE } from "../../constants"
import { endpoints } from "../../../src/api/endpoints"
import { toast } from "../../shadcn/hooks/use-toast"


export default function EmployeeDelete(employee: EmployeeType) {
    const [deleting, setDeleting] = useState<boolean | undefined>(undefined)
    const queryClient = useQueryClient()

    const deleteSuccess = () => {
        setDeleting(false)
        queryClient.invalidateQueries({ queryKey: ["employees"] })
        toast({
            description: `Employee "${employee.full_name}" has been deleted.`
        })
    }

    const deleteFailed = () => {
        setDeleting(false)
        toast({
            variant: "destructive",
            description: `Delete Failed!`
        })
    }

    const deleteEmployee = () => {
        if (deleting === undefined) setDeleting(true)
        toast({
            description: `Deleting "${employee.full_name}"...`
        })
        axios.delete(endpoints.get_employee_endpoint(employee.id)).then(_ => deleteSuccess()).catch(_ => deleteFailed())
    }

    return (
        <Dialog>
            <DialogTrigger>
                <Button variant="ghost" size="icon">
                    <DeleteIcon size={ACTION_ICON_SIZE} className="text-red-700" />
                </Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Are you sure to delete this employee?
                    </DialogTitle>
                </DialogHeader>

                <DialogDescription className="flex flex-col">
                    <span>{employee.full_name}</span>
                    <span className="capitalize">{employee.department} department</span>
                    <span>{employee.designation}</span>
                </DialogDescription>

                <p className="text-sm">Once deleted, can not be retrieved.</p>

                <DialogFooter>
                    <DialogClose>
                        <Button size="sm">Cancel</Button>
                    </DialogClose>
                    <DialogClose>
                        <Button size="sm" variant="destructive" onClick={deleteEmployee}>
                            Delete
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
