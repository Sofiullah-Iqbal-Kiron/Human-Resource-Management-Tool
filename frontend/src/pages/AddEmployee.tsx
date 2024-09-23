import EmployeeAddForm from "../components/EmployeeAddForm";
import Header from "../components/Header";
import PageHead from "../components/PageHead";


export default function AddEmployee() {
    return (
        <section>
            <Header />
            <PageHead title="Add New Employee" />
            <div className="px-2">
                <EmployeeAddForm />
            </div>
        </section>
    )
}
