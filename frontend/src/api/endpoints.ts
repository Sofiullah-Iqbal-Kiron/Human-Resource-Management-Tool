const API_BASE = "http://127.0.0.1:8000/api/v1"

export const endpoints = {
    employees: `${API_BASE}/employees/`,
    get_employees_paginated: (limit: number, offset: number) => `${API_BASE}/employees/?limit=${limit}&offset=${offset}`,
    get_employee_endpoint: (id: number) => `${API_BASE}/employees/${id}/`,
    department_choices: `${API_BASE}/department-choices`,
}
