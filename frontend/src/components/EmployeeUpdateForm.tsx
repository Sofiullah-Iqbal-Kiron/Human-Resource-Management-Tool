// react
import { useRef } from "react";

// axios
import axios from "axios";

// react hook form
import { useForm, SubmitHandler, Controller } from "react-hook-form"

// tanstack-query
import { useMutation } from "@tanstack/react-query";

// react router dom
import { useNavigate } from "react-router-dom";

// shadcn
import { Button } from "../shadcn/ui/button";
import { Label } from "../shadcn/ui/label";
import { Input } from "../shadcn/ui/input";
import { Select, SelectContent, SelectValue, SelectItem, SelectTrigger } from "../shadcn/ui/select";
import { Textarea } from "../shadcn/ui/textarea";
import { toast } from "../shadcn/hooks/use-toast";

// local
import { EmployeeType } from "../types";
import { useFetchedDepartmentChoices } from "../api/calls";
import { endpoints } from "../api/endpoints";


export default function EmployeeUpdateForm(employee: EmployeeType) {
    const employeeImage = useRef<File | null>()
    const dept_choices = useFetchedDepartmentChoices().data
    const navigate = useNavigate()

    const createEmployee = (employeeData: EmployeeType) => {
        employeeData.photo = employeeImage.current

        return axios.patch(endpoints.get_employee_endpoint(employee.id), employeeData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }

    const mutation = useMutation({
        mutationFn: createEmployee,
        onSuccess: () => {
            toast({
                description: "Update Success."
            })
            navigate(-1)
        },
        onError: (error) => {
            toast({
                variant: "destructive",
                description: "Failed attempt, try later."
            })
            console.log(error)
        }
    })

    const { register, handleSubmit, control } = useForm<EmployeeType>({
        defaultValues: {
            first_name: employee.first_name,
            last_name: employee.last_name,
            email: employee.email,
            mobile: employee.mobile.substring(3, 14),
            date_of_birth: employee.date_of_birth,
            date_of_joining: employee.date_of_joining,
            department: employee.department,
            designation: employee.designation,
            salary: employee.salary,
            responsibilities: employee.responsibilities
        }
    })

    const onSubmit: SubmitHandler<EmployeeType> = (employeeData) => {
        employeeData.mobile = "+88" + employeeData.mobile
        // alert(JSON.stringify(employeeData))

        mutation.mutate(employeeData)
    }

    const handleFileUpload = (e: any) => {
        if (e.target.files)
            employeeImage.current = e.target.files[0]
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-6">

            <div className="flex flex-col space-y-1.5">
                <legend className="text-xl font-semibold">
                    Personal Information
                </legend>

                <div className="form-subsection">
                    <div className="w-full">
                        <Label htmlFor="first-name">First Name</Label>
                        <Input type="text" id="first-name" {...register("first_name")} aria-label="first-name" />
                    </div>
                    <div className="w-full">
                        <Label htmlFor="last-name">Last Name</Label>
                        <Input type="text" id="last-name" {...register("last_name")} aria-label="last-name" />
                    </div>
                </div>

                <div className="form-subsection">
                    <div className="w-full">
                        <Label htmlFor="email">Email</Label>
                        <Input type="email" id="email" {...register("email")} aria-label="email" />
                    </div>
                    <div className="w-full">
                        <Label htmlFor="mobile">Mobile</Label>
                        <Input type="tel" id="mobile" {...register("mobile")} aria-label="mobile" minLength={11} maxLength={11} />
                    </div>
                </div>

                <div className="form-subsection">
                    <div className="w-full">
                        <Label htmlFor="date-of-birth">Date of Birth</Label>
                        <Input type="date" id="date-of-birth" {...register("date_of_birth")} aria-label="date-of-birth" />
                    </div>
                    <div className="w-full">
                        <Label htmlFor="photo">Photo</Label>
                        <Input type="file" id="photo" {...register("photo")} aria-label="photo" onChange={handleFileUpload} />
                    </div>
                </div>
            </div>

            <div className="flex flex-col space-y-1.5">
                <legend className="text-xl font-semibold">
                    Employment Related Information
                </legend>

                <div className="form-subsection">
                    <div className="w-full">
                        <Label>Department</Label>
                        <Controller
                            name="department"
                            control={control}
                            render={({ field }) => (
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="---" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {dept_choices?.map((item, idx) => <SelectItem key={idx} value={item.value}>{item.display}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                            )}
                        />
                    </div>
                    <div className="w-full">
                        <Label htmlFor="designation">Designation</Label>
                        <Input type="text" id="designation" {...register("designation")} aria-label="designation" />
                    </div>
                </div>

                <div className="form-subsection">
                    <div className="w-full">
                        <Label htmlFor="date-of-joining">Date of Joining</Label>
                        <Input type="date" id="date-of-joining" {...register("date_of_joining")} aria-label="date-of-joining" />
                    </div>
                    <div className="w-full">
                        <Label htmlFor="salary">Salary</Label>
                        <Input type="number" id="salary" {...register("salary", { valueAsNumber: true })} aria-label="salary" />
                    </div>
                </div>

                <div>
                    <Label htmlFor="responsibilities">Job Responsibilities</Label>
                    <Textarea id="responsibilities" {...register("responsibilities")} aria-label="responsibilities" />
                </div>
            </div>

            <Button type="submit" disabled={mutation.isPending}>
                {mutation.isPending && "Saving..." || "Save Changes"}
            </Button>
        </form>
    )
}
