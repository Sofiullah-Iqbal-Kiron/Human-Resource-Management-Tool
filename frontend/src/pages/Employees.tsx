import { useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { PlusCircle as AddIcon } from "lucide-react";
import { Button } from "../shadcn/ui/button";
import { Input } from "../shadcn/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "../shadcn/ui/select";

import EmployeeTable from "../components/EmployeeTable";
import PageHead from "../components/PageHead";
import Header from "../components/Header";
import { ACTION_ICON_SIZE } from "../constants";
import { useFetchedDepartmentChoices, useFetchedEmployees } from "../api/calls";
import EmployeeTablePaginator from "../components/EmployeeTablePaginator";


export default function Employees() {
    const { pageNo } = useParams()
    const pageNumber = parseInt(pageNo ?? "1")

    const pageLimit = useRef<number>(10)
    let employeeCount = useFetchedEmployees(pageLimit.current, (pageNumber - 1) * pageLimit.current).data?.count
    let employees = useFetchedEmployees(pageLimit.current, (pageNumber - 1) * pageLimit.current).data?.results

    const dept_choices = useFetchedDepartmentChoices().data

    // real time search with filtering
    const [name, setName] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [mobile, setMobile] = useState<string>("")
    const [department, setDepartment] = useState<string>("")
    const [designation, setDesignation] = useState<string>("")
    if (employees) {
        employees = employees.filter(item => item.full_name.toLowerCase().includes(name.toLowerCase()))
        employees = employees.filter(item => item.email.toLowerCase().includes(email.toLowerCase()))
        employees = employees.filter(item => item.mobile.toLowerCase().includes(mobile.toLowerCase()))
        employees = employees.filter(item => item.department.toLowerCase().includes(department.toLowerCase()))
        employees = employees.filter(item => item.designation.toLowerCase().includes(designation.toLowerCase()))
    }

    return (
        <section className="mb-10">
            <Header />

            <div className="flex justify-between items-center px-2">
                <PageHead title="Employee List" />

                <Link to="../employees/add">
                    <Button size="lg" variant="secondary" className="space-x-1.5 text-green-700">
                        <AddIcon size={ACTION_ICON_SIZE} />
                        <span>Add Employee</span>
                    </Button>
                </Link>
            </div>

            {/* real time search and filter fields */}
            <div className="flex flex-row space-x-2 p-2">
                <Input type="text" placeholder="name" onChange={e => setName(e.target.value)} />
                <Input type="text" placeholder="email" onChange={e => setEmail(e.target.value)} />
                <Input type="text" placeholder="mobile" onChange={e => setMobile(e.target.value)} />

                <Select onValueChange={v => setDepartment(v.trim())}>
                    <SelectTrigger>
                        <SelectValue placeholder="department" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value=" ">All</SelectItem>
                        {dept_choices?.map((item, idx) => <SelectItem key={idx} value={item.value}>{item.display}</SelectItem>)}
                    </SelectContent>
                </Select>
                <Input type="text" placeholder="designation" onChange={e => setDesignation(e.target.value)} />
            </div>

            {/* render the actual table if all data fetched from backend without any error */}
            {employees && employeeCount && <EmployeeTable employees={employees} totalEmployees={employeeCount} />}

            {/* paginator */}
            {employeeCount && <EmployeeTablePaginator pageCount={Math.ceil(employeeCount / pageLimit.current)} pageNumber={pageNumber} />}
        </section>
    )
}
