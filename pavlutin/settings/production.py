import os
import dj_database_url

from .base import *


DATABASES['default'] = dj_database_url.config()

SECRET_KEY = os.environ.get('DJANGO_SECRET_KEY')

DEBUG = False
