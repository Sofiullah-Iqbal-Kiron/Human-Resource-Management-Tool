import { useState } from "react"
import { Button } from "../shadcn/ui/button"
import { Table, TableHead, TableBody, TableRow, TableCell, TableCaption } from "../shadcn/ui/table"
import { DollarSign as DollarIcon, ChevronsUpDown as IsSortableIcon } from "lucide-react"

import { EmployeeType } from "../types"
import EmployeeDelete from "./actions/EmployeeDelete"
import EmployeeEdit from "./actions/EmployeeEdit"
import { ACTION_ICON_SIZE } from "../constants"
import { Link } from "react-router-dom"


type EmployeeTableHeaderItemType = {
    header: string,
    sortable: boolean,
    sortKey: string
}

interface EmployeeTableHeaderProps {
    items: Array<EmployeeTableHeaderItemType>,
    setSortKey: any,
    sortOrder: "asc" | "desc" | null,
    setSortOrder: any
}

function EmployeeTableHeader({ items, setSortKey, sortOrder, setSortOrder }: EmployeeTableHeaderProps) {
    const handleSortButtonClick = (sortable: boolean, sortKey: string) => {
        if (!sortable) return

        setSortKey(sortKey)
        setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    }

    return (
        <TableRow className="bg-primary hover:bg-primary">
            {items.map((item, idx) =>
                <TableHead key={`employee-table-header-item-${idx}`} className="text-primary-foreground">
                    <div className="flex items-center space-x-1">
                        <span>{item.header}</span>
                        {
                            item.sortable &&
                            <Button size="icon" variant="default" onClick={() => handleSortButtonClick(item.sortable, item.sortKey)} className="size-4 bg-transparent">
                                <IsSortableIcon size={ACTION_ICON_SIZE} />
                            </Button>
                        }
                    </div>
                </TableHead>
            )}
        </TableRow>
    )
}

function EmployeeRow(employee: EmployeeType) {
    let mobile = employee.mobile
    mobile = mobile.substring(0, 3) + ' ' + mobile.substring(3, 14)

    return (
        <TableRow>
            <TableCell>{employee.id}</TableCell>
            <TableCell>
                {employee.photo && <img src={employee.photo} alt={employee.full_name} loading="lazy" width={40} height={40} className="rounded" /> || <span className="text-red-500">NULL</span>}
            </TableCell>
            <TableCell>
                <Link to="">
                    <Button size="sm" variant="link">
                        {employee.full_name}
                    </Button>
                </Link>
            </TableCell>
            <TableCell>{employee.email}</TableCell>
            <TableCell>{mobile}</TableCell>
            <TableCell>{employee.date_of_birth}</TableCell>
            <TableCell>{employee.date_of_joining}</TableCell>
            <TableCell className="capitalize">{employee.department}</TableCell>
            <TableCell className="text-wrap">{employee.designation}</TableCell>
            <TableCell>
                <div className="font-mono flex items-center">
                    <DollarIcon size={15} />
                    <span>{employee.salary}</span>
                </div>
            </TableCell>

            <TableCell>
                <div className="flex space-x-0">
                    <EmployeeEdit {...employee} />
                    <EmployeeDelete {...employee} />
                </div>
            </TableCell>
        </TableRow>
    )
}

interface EmployeeTableProps {
    employees: Array<EmployeeType>,
    totalEmployees: number
}

export default function EmployeeTable({ employees, totalEmployees }: EmployeeTableProps) {
    const [sortKey, setSortKey] = useState<string>("")
    const [sortOrder, setSortOrder] = useState<"asc" | "desc" | null>(null)

    // const sortComparator = (ob1: EmployeeType, ob2: EmployeeType) => {
    //     let ans = 0
    //     switch (sortKey) {
    //         case "full_name":
    //             ob1.full_name < ob2.full_name

    //     }

    //     return 1
    // }

    // if (sortOrder) {
    //     employees.sort((a, b) => sortComparator(a, b))
    // }

    const headerItems: Array<EmployeeTableHeaderItemType> = [
        { header: "ID", sortable: false, sortKey: "id" },
        { header: "Photo", sortable: false, sortKey: "photo" },
        { header: "Full Name", sortable: true, sortKey: "full_name" },
        { header: "Email", sortable: true, sortKey: "email" },
        { header: "Mobile", sortable: false, sortKey: "mobile" },
        { header: "Date of Birth", sortable: true, sortKey: "date_of_birth" },
        { header: "Date of Joining", sortable: true, sortKey: "date_of_joining" },
        { header: "Department", sortable: false, sortKey: "department" },
        { header: "Designation", sortable: false, sortKey: "designation" },
        { header: "Salary", sortable: true, sortKey: "salary" },
        { header: "Actions", sortable: false, sortKey: "actions" },
    ]

    return (
        <div className="px-2">
            <Table className="border rounded-md">
                <TableCaption>
                    <span className="font-mono text-lg">{employees.length}</span> out of <span className="font-mono text-lg">{totalEmployees}</span>
                </TableCaption>

                <TableBody>
                    <EmployeeTableHeader items={headerItems} setSortKey={setSortKey} sortOrder={sortOrder} setSortOrder={setSortOrder} />
                    {employees.map((item, idx) => <EmployeeRow key={idx} {...item} />)}
                </TableBody>
            </Table>
        </div>
    )
}
