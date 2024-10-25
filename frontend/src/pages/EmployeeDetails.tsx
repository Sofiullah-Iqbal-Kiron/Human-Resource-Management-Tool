import { useParams } from "react-router-dom"
import ErrorMessage from "../components/ErrorMessage"
import { useFetchedAnEmployee } from "../api/calls"


export default function EmployeeDetails() {
    const { employeeId } = useParams()

    if (!employeeId) return <ErrorMessage message="Invalid URL Params!" />

    const { data } = useFetchedAnEmployee(parseInt(employeeId))

    return (
        <div>
            <img src={data?.photo} alt="employee-avatar" height={300} width={260} className="ring-2 rounded-lg" />
            <span>{data?.full_name}</span>
        </div>
    )
}
