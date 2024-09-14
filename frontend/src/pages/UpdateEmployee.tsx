// react router dom
import { useParams } from "react-router-dom"

// local
import EmployeeUpdateForm from "../components/EmployeeUpdateForm"
import Header from "../components/Header"
import PageHead from "../components/PageHead"
import { useFetchedAnEmployee } from "../api/calls"


function NoEmployee() {
    return <span>No Employee Found!</span>
}

export default function UpdateEmployee() {
    let { employeeId } = useParams()

    if (!employeeId)
        return <NoEmployee />

    const { data, isSuccess } = useFetchedAnEmployee(parseInt(employeeId))

    if (isSuccess) {
        return (
            <section>
                <Header />
                <PageHead title="Update Employee" />
                <div className="px-2">
                    <EmployeeUpdateForm {...data} />
                </div>
            </section>
        )
    }

    return <NoEmployee />
}
