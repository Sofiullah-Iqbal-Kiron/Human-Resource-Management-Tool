# rest framework
from rest_framework.serializers import ModelSerializer, DateField

# local
from .models import Employee


class EmployeeSerializer(ModelSerializer):
    class Meta:
        model = Employee
        fields = [
            'id',

            # personal info
            'first_name',
            'last_name',
            'email',
            'mobile',
            'date_of_birth',
            'photo',

            # employment related fields
            'date_of_joining',
            'department',
            'designation',
            'salary',
            'date_of_leave',
            'responsibilities',

            # read only properties
            'full_name',
            'still_employee'
        ]
