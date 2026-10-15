from django.db import models


class Banner(models.Model):
    image = models.URLField(max_length=500)
    sort = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["sort", "id"]
        verbose_name = "Banner"
        verbose_name_plural = "Bannerlər"

    def __str__(self):
        return self.image


class Benefit(models.Model):
    icon = models.URLField(max_length=500)
    title_az = models.CharField(max_length=200)
    title_ru = models.CharField(max_length=200)
    text_az = models.CharField(max_length=300)
    text_ru = models.CharField(max_length=300)
    href = models.CharField(max_length=200)
    sort = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["sort", "id"]
        verbose_name = "Üstünlük"
        verbose_name_plural = "Üstünlüklər"

    def __str__(self):
        return self.title_az


class Brand(models.Model):
    name = models.CharField(max_length=80, unique=True)
    sort = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["sort", "id"]
        verbose_name = "Brend"
        verbose_name_plural = "Brendlər"

    def __str__(self):
        return self.name


class Campaign(models.Model):
    TONES = [("red", "Qırmızı"), ("navy", "Tünd"), ("gold", "Qızılı")]

    slug = models.SlugField(max_length=180, unique=True)
    tone = models.CharField(max_length=10, choices=TONES, default="red")
    title_az = models.CharField(max_length=200)
    title_ru = models.CharField(max_length=200)
    text_az = models.TextField()
    text_ru = models.TextField()
    until = models.CharField(max_length=20)
    image = models.URLField(max_length=500)
    sort = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["sort", "id"]
        verbose_name = "Kampaniya"
        verbose_name_plural = "Kampaniyalar"

    def __str__(self):
        return self.title_az


class Video(models.Model):
    youtube_id = models.CharField(max_length=40)
    title = models.CharField(max_length=200)
    href = models.URLField(max_length=300)
    sort = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["sort", "id"]
        verbose_name = "Video"
        verbose_name_plural = "Videolar"

    def __str__(self):
        return self.title


class Article(models.Model):
    slug = models.SlugField(max_length=180, unique=True)
    date = models.CharField(max_length=20)
    image = models.URLField(max_length=500)
    title_az = models.CharField(max_length=300)
    title_ru = models.CharField(max_length=300)
    lead_az = models.TextField()
    lead_ru = models.TextField()
    sort = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["sort", "id"]
        verbose_name = "Xəbər"
        verbose_name_plural = "Xəbərlər"

    def __str__(self):
        return self.title_az


class Promo(models.Model):
    key = models.SlugField(unique=True)
    kicker_az = models.CharField(max_length=120)
    kicker_ru = models.CharField(max_length=120)
    title_az = models.CharField(max_length=200)
    title_ru = models.CharField(max_length=200)
    href = models.CharField(max_length=200)
    sort = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["sort", "id"]
        verbose_name = "Promo kart"
        verbose_name_plural = "Promo kartlar"

    def __str__(self):
        return self.title_az


class HomeProduct(models.Model):
    external_id = models.CharField(max_length=80, unique=True)
    slug = models.SlugField(max_length=180)
    category = models.CharField(max_length=80)
    brand = models.CharField(max_length=80)
    price = models.DecimalField(max_digits=12, decimal_places=2)
    old_price = models.DecimalField(max_digits=12, decimal_places=2)
    months = models.PositiveIntegerField(default=12)
    rating = models.PositiveSmallIntegerField(default=5)
    reviews = models.PositiveIntegerField(default=0)
    code = models.CharField(max_length=40)
    image = models.CharField(max_length=500)
    name_az = models.CharField(max_length=300)
    name_ru = models.CharField(max_length=300)
    bestseller = models.BooleanField(default=False)

    class Meta:
        ordering = ["-bestseller", "-reviews", "id"]
        verbose_name = "Məhsul"
        verbose_name_plural = "Məhsullar"

    def __str__(self):
        return self.name_az


class Subscriber(models.Model):
    email = models.EmailField(unique=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]
        verbose_name = "Abunə"
        verbose_name_plural = "Abunələr"

    def __str__(self):
        return self.email
