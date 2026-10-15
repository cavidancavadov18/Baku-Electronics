# Baku Electronics

Lokal öyrənmə saytıdır. Real ödəniş aparmır.

## Nə lazımdır

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) quraşdırılıb və işləyir
- 3000 portu boşdur

## İşə salmaq

1. Docker Desktop-u aç. Balina işarəsi sabitləşənə qədər gözlə.
2. Bu qovluğu terminalda aç:

```powershell
cd "$env:USERPROFILE\Desktop\Baku Electronics"
```

3. İlk dəfə, və ya kod dəyişəndən sonra, konteyneri qur və işə sal:

```powershell
docker compose up --build
```

Sonrakı dəfələr qurmadan da olar:

```powershell
docker compose up
```

4. Terminalda `web` sətri dayanmadan axana qədər gözlə.
5. Brauzerdə saytı aç: [http://localhost:3000/az](http://localhost:3000/az)

`/` ünvanı özü `/az` səhifəsinə keçir. Rus dili üçün:

- [http://localhost:3000/ru](http://localhost:3000/ru)

6. Admin panel: [http://localhost:3000/admin](http://localhost:3000/admin)

| Sahə | Dəyər |
| --- | --- |
| İstifadəçi | `admin` |
| Şifrə | `admin` |

## Dayandırmaq

Terminalda `Ctrl+C` bas. Konteyneri tam söndürmək üçün:

```powershell
docker compose down
```

## Port məşğuldursa

`3000` portu başqa proqramdadırsa sayt açılmır. O proqramı bağla və yenidən `docker compose up` işlət.

## Fayl dəyişəndə

Səhifə bəzən Windows-da özü yenilənmir. Onda ayrıca terminalda:

```powershell
docker compose restart web
```

Sonra Chrome-da səhifəni bərk yenilə.
