import logo from "../assets/logo.png"


export default function Header() {
    return (
        <section className="bg-primary text-center text-primary-foreground py-2 mb-1">
            <div className="w-full flex justify-center py-1">
                <img src={logo} alt="Wafi Solutions" width={300} />
            </div>
            <h3 className="text-xl">Human Resource Management System</h3>
        </section>
    )
}
