from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.viewsets import ModelViewSet

from .models import Employee
from .serializers import EmployeeSerializer
from .constants import DEPARTMENT_CHOICES


class EmployeeViewSet(ModelViewSet):
    serializer_class = EmployeeSerializer
    queryset = Employee.objects.all()


class DepartmentChoices(APIView):
    def get(self, request):
        department_choices = []

        for dept in DEPARTMENT_CHOICES:
            item = {
                "value": dept[0],
                "display": dept[1]
            }
            department_choices.append(item)

        return Response(department_choices, status=status.HTTP_200_OK)
