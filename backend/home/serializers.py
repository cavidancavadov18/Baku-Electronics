from rest_framework import serializers

from .models import Article, Banner, Benefit, Brand, Campaign, HomeProduct, Promo, Subscriber, Video


def pair(az, ru):
    return {"az": az, "ru": ru}


class HomeSerializer(serializers.Serializer):
    def to_representation(self, _instance):
        return {
            "banners": [item.image for item in Banner.objects.all()],
            "benefits": [
                {
                    "icon": item.icon,
                    "title": pair(item.title_az, item.title_ru),
                    "text": pair(item.text_az, item.text_ru),
                    "href": item.href,
                }
                for item in Benefit.objects.all()
            ],
            "brands": [item.name for item in Brand.objects.all()],
            "campaigns": [
                {
                    "slug": item.slug,
                    "tone": item.tone,
                    "title": pair(item.title_az, item.title_ru),
                    "text": pair(item.text_az, item.text_ru),
                    "until": item.until,
                    "image": item.image,
                }
                for item in Campaign.objects.all()
            ],
            "videos": [
                {"id": item.youtube_id, "title": item.title, "href": item.href}
                for item in Video.objects.all()
            ],
            "articles": [
                {
                    "slug": item.slug,
                    "date": item.date,
                    "image": item.image,
                    "title": pair(item.title_az, item.title_ru),
                    "lead": pair(item.lead_az, item.lead_ru),
                }
                for item in Article.objects.all()
            ],
            "promos": [
                {
                    "key": item.key,
                    "kicker": pair(item.kicker_az, item.kicker_ru),
                    "title": pair(item.title_az, item.title_ru),
                    "href": item.href,
                }
                for item in Promo.objects.all()
            ],
            "products": [
                {
                    "id": item.external_id,
                    "slug": item.slug,
                    "category": item.category,
                    "brand": item.brand,
                    "price": float(item.price),
                    "oldPrice": float(item.old_price),
                    "months": item.months,
                    "rating": item.rating,
                    "reviews": item.reviews,
                    "code": item.code,
                    "image": item.image,
                    "name": pair(item.name_az, item.name_ru),
                    "bestseller": item.bestseller,
                }
                for item in HomeProduct.objects.all()
            ],
        }


class SubscribeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subscriber
        fields = ["email"]
