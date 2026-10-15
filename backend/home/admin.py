from django.contrib import admin

from .models import Article, Banner, Benefit, Brand, Campaign, HomeProduct, Promo, Subscriber, Video


class SortAdmin(admin.ModelAdmin):
    list_editable = ("sort",)
    ordering = ("sort", "id")


@admin.register(Banner)
class BannerAdmin(SortAdmin):
    list_display = ("id", "image", "sort")


@admin.register(Benefit)
class BenefitAdmin(SortAdmin):
    list_display = ("title_az", "href", "sort")
    search_fields = ("title_az", "title_ru")


@admin.register(Brand)
class BrandAdmin(SortAdmin):
    list_display = ("name", "sort")


@admin.register(Campaign)
class CampaignAdmin(SortAdmin):
    list_display = ("title_az", "until", "tone", "sort")
    search_fields = ("title_az", "title_ru", "slug")
    prepopulated_fields = {"slug": ("title_az",)}


@admin.register(Video)
class VideoAdmin(SortAdmin):
    list_display = ("title", "youtube_id", "sort")
    search_fields = ("title", "youtube_id")


@admin.register(Article)
class ArticleAdmin(SortAdmin):
    list_display = ("title_az", "date", "slug", "sort")
    search_fields = ("title_az", "title_ru", "slug")
    prepopulated_fields = {"slug": ("title_az",)}


@admin.register(Promo)
class PromoAdmin(SortAdmin):
    list_display = ("title_az", "href", "sort")


@admin.register(HomeProduct)
class HomeProductAdmin(admin.ModelAdmin):
    list_display = ("name_az", "category", "brand", "price", "old_price", "bestseller")
    list_filter = ("category", "brand", "bestseller")
    search_fields = ("name_az", "name_ru", "code", "slug")
    list_editable = ("price", "old_price", "bestseller")


@admin.register(Subscriber)
class SubscriberAdmin(admin.ModelAdmin):
    list_display = ("email", "created_at")
    search_fields = ("email",)
