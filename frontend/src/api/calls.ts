import axios from "axios";
import { endpoints } from "./endpoints";
import { useQuery } from "@tanstack/react-query";
import { DepartmentChoice, EmployeeResultsType, EmployeeType } from "../types"


const fetchAnEmployee = (id: number): Promise<EmployeeType> => axios.get(endpoints.get_employee_endpoint(id)).then(res => res.data).catch(err => console.log(err))
const fetchEmployees = (limit: number, offset: number): Promise<EmployeeResultsType> => axios.get(endpoints.get_employees_paginated(limit, offset)).then(res => res.data).catch(err => console.error(err))
const fetchDepartmentChoices = (): Promise<Array<DepartmentChoice>> => axios.get(endpoints.department_choices).then(res => res.data).catch(err => console.error(err))

export const useFetchedAnEmployee = (id: number) => useQuery({ queryKey: ['an-employee'], queryFn: () => fetchAnEmployee(id) })
export const useFetchedEmployees = (limit: number, offset: number) => useQuery({ queryKey: ['employees'], queryFn: () => fetchEmployees(limit, offset) })
export const useFetchedDepartmentChoices = () => useQuery({ queryKey: ['department-choices'], queryFn: fetchDepartmentChoices })
