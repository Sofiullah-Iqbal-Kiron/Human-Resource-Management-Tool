export type EmployeeType = {
    id: number,
    first_name: string,
    last_name: string,
    email: string,
    mobile: string,
    date_of_birth: string,
    photo?: any,
    date_of_joining: string,
    department: string,
    designation: string,
    salary: number,
    date_of_leave: string | null,
    responsibilities: string,
    full_name: string,
    still_employee: boolean
}

export type EmployeeResultsType = {
    count: number,
    next: string,
    previous: string
    results: Array<EmployeeType>
}

export type DepartmentChoice = {
    value: string,
    display: string
}