#!/bin/sh
set -e
python manage.py makemigrations home --noinput
python manage.py migrate --noinput
python manage.py seed_home
python manage.py ensure_admin
exec python manage.py runserver 0.0.0.0:8000
