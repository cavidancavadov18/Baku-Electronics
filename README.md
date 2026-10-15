# Baku Electronics

Lokal öyrənmə saytıdır. Real ödəniş aparmır.

## Nə lazımdır

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) quraşdırılıb və işləyir
- 3000, 8000 və 5432 portları boşdur

## İşə salmaq

1. Docker Desktop-u aç. Balina işarəsi sabitləşənə qədər gözlə.
2. Bu qovluğu terminalda aç:

```powershell
cd "$env:USERPROFILE\Desktop\Baku Electronics"
```

3. İlk dəfə, və ya kod dəyişəndən sonra, konteynerləri qur və işə sal:

```powershell
docker compose up --build
```

Sonrakı dəfələr qurmadan da olar:

```powershell
docker compose up
```

4. Terminalda `db`, `backend` və `web` sətirləri dayanmadan axana qədər gözlə. Backend açılarkən verilənlər bazası hazır olur və ana səhifənin məlumatı bir dəfə yazılır. Sonrakı açılışda admin-də etdiyin dəyişiklik qalır.
5. Brauzerdə saytı aç: [http://localhost:3000/az](http://localhost:3000/az)

`/` ünvanı özü `/az` səhifəsinə keçir. Rus dili üçün:

- [http://localhost:3000/ru](http://localhost:3000/ru)

6. Django admin: [http://localhost:8000/admin](http://localhost:8000/admin)

| Sahə | Dəyər |
| --- | --- |
| İstifadəçi | `admin` |
| Şifrə | `admin` |

7. API sənədi: [http://localhost:8000/api/docs](http://localhost:8000/api/docs)

## Dayandırmaq

Terminalda `Ctrl+C` bas. Konteynerləri tam söndürmək üçün:

```powershell
docker compose down
```

Verilənlər bazası volume-da qalır. Bazanı da silmək lazımdırsa:

```powershell
docker compose down -v
```

## Port məşğuldursa

`3000` və ya `8000` portu başqa proqramdadırsa sayt açılmır. O proqramı bağla və yenidən `docker compose up` işlət.

## Fayl dəyişəndə

Səhifə bəzən Windows-da özü yenilənmir. Onda ayrıca terminalda:

```powershell
docker compose restart web
```

Backend Python faylı dəyişəndə server özü yenilənir. Sonra Chrome-da səhifəni bərk yenilə.
