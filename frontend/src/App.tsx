// 3'rd party
import { Route, Routes } from "react-router-dom";
import { Toaster } from "./shadcn/ui/toaster";

// local
import Home from "./pages/Home";
import Employees from "./pages/Employees";
import AddEmployee from "./pages/AddEmployee";
import UpdateEmployee from "./pages/UpdateEmployee";
import EmployeeDetails from "./pages/EmployeeDetails";
import ThemeProvider from "./components/ThemeProvider";


export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="employees/page/:pageNo" element={<Employees />} />
        <Route path="employees/:employeeId/details" element={<EmployeeDetails />} />
        <Route path="employees/:employeeId/update" element={<UpdateEmployee />} />
        <Route path="employees/add" element={<AddEmployee />} />
      </Routes>

      <Toaster />
    </ThemeProvider>
  )
}
