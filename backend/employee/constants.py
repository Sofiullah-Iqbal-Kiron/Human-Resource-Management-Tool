from enum import Enum


class DEPARTMENT(Enum):
    DEVELOPMENT = 'development'
    DESIGN = 'design'
    HR = 'hr'
    MARKETING = 'marketing'
    SALES = 'sales'


DEPARTMENT_CHOICES = [
    (DEPARTMENT.DEVELOPMENT.value, 'Development'),
    (DEPARTMENT.DESIGN.value, 'Design'),
    (DEPARTMENT.HR.value, 'HR'),
    (DEPARTMENT.MARKETING.value, 'Marketing'),
    (DEPARTMENT.SALES.value, 'Sales'),
]

DEPT_CODE = [
    (DEPARTMENT.DEVELOPMENT, 'DEV')
]
