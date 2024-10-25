from django.core.exceptions import ValidationError


def salary_validator(value):
    if int(value) < 100:
        raise ValidationError("Salary is too low!")
