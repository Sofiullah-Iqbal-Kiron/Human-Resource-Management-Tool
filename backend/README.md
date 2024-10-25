# Preamble

Backend server of HRMS. The verbose Human Resource Management System entirely developed by [me](https://github.com/Sofiullah-Iqbal-Kiron).

### Setup

#### 1. Create virtual environment

`python -m venv env`

#### 2. Activate virtual environment

`env/Scripts/activate`

#### 3. Install necessary packages

`python -m pip install -r requirements.txt`

#### 4. Change directory to the actual django project

`cd project`

#### 5. Run migrations

`python manage.py makemigrations`

#### 6. Migrate migrations to the database

`python manage.py migrate`

#### 7. Run backend sever locally

`python manage.py runserver`

### ToDo

- [ ] Use PostgreeSQL
