from django.urls import path

from rest_framework.routers import DefaultRouter

from .views import EmployeeViewSet, DepartmentChoices


router = DefaultRouter()
router.register('employees', EmployeeViewSet, 'employees')

urlpatterns = [
    path('department-choices', DepartmentChoices.as_view(), name="department-choices")
] + router.urls
