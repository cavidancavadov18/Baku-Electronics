from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand


class Command(BaseCommand):
    help = "Superuser yoxdursa admin / admin yaradır."

    def handle(self, *args, **options):
        user = get_user_model()
        if user.objects.filter(is_superuser=True).exists():
            self.stdout.write("Admin artıq var.")
            return
        user.objects.create_superuser("admin", "admin@bakuelectronics.local", "admin")
        self.stdout.write(self.style.SUCCESS("Admin yaradıldı."))
