import json
from pathlib import Path

from django.core.management.base import BaseCommand
from django.db import transaction

from home.models import Article, Banner, Benefit, Brand, Campaign, HomeProduct, Promo, Video


class Command(BaseCommand):
    help = "Boş bazanı ana səhifənin hazır məzmunu ilə doldurur."

    def handle(self, *args, **options):
        if Banner.objects.exists():
            self.stdout.write("Ana səhifə artıq doludur, toxum buraxıldı.")
            return
        path = Path(__file__).resolve().parents[3] / "seed" / "home.json"
        data = json.loads(path.read_text(encoding="utf-8"))
        with transaction.atomic():
            Banner.objects.bulk_create(
                [Banner(image=item["image"], sort=item["sort"]) for item in data["banners"]]
            )
            Benefit.objects.bulk_create([Benefit(**item) for item in data["benefits"]])
            Brand.objects.bulk_create([Brand(**item) for item in data["brands"]])
            Campaign.objects.bulk_create([Campaign(**item) for item in data["campaigns"]])
            Video.objects.bulk_create([Video(**item) for item in data["videos"]])
            Article.objects.bulk_create([Article(**item) for item in data["articles"]])
            Promo.objects.bulk_create([Promo(**item) for item in data["promos"]])
            HomeProduct.objects.bulk_create([HomeProduct(**item) for item in data["products"]])
        self.stdout.write(self.style.SUCCESS(f"Ana səhifə doldu: {HomeProduct.objects.count()} məhsul."))
