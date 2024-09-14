import { Link } from "react-router-dom"
import { Button } from "../shadcn/ui/button"
import Header from "../components/Header"


export default function Home() {
    return (
        <section>
            <Header />
            <h1 className="text-3xl text-center">
                Welcome Aboard
            </h1>
            <Link to="employees/page/1" className="w-full flex justify-center">
                <Button variant="link" size="lg">
                    View All Employees
                </Button>
            </Link>
        </section>
    )
}
