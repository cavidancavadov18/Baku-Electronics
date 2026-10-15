import type { Localized } from "./products";

export type InfoBlock = { heading: Localized; paragraphs: Localized[] };

export type InfoPage = {
  slug: string;
  title: Localized;
  lead: Localized;
  blocks: InfoBlock[];
};

const b = (azH: string, ruH: string, pairs: [string, string][]): InfoBlock => ({
  heading: { az: azH, ru: ruH },
  paragraphs: pairs.map(([az, ru]) => ({ az, ru })),
});

export const infoPages: InfoPage[] = [
  {
    slug: "haqqimizda",
    title: { az: "Haqqımızda", ru: "О нас" },
    lead: {
      az: "Baku Electronics məişət texnikası, telefon və elektronika mağazalar şəbəkəsidir. Bu sayt həmin vitrinin nümunə versiyasıdır.",
      ru: "Baku Electronics — сеть магазинов бытовой техники, телефонов и электроники. Этот сайт — образец той витрины.",
    },
    blocks: [
      b("Nə satırıq", "Что продаём", [
        [
          "Kataloqda smartfon, notbuk, planşet, televizor, böyük və kiçik məişət texnikası var. Hər kartda endirimli qiymət və aylıq bölgü göstərilir.",
          "В каталоге смартфоны, ноутбуки, планшеты, телевизоры, крупная и мелкая техника. На карточке видны цена со скидкой и месячный платёж.",
        ],
        [
          "Məhsul səhifəsində kod, xüsusiyyət və oxşar modellər durur ki, seçim yarımçıq qalmasın.",
          "На странице товара есть код, характеристики и похожие модели, чтобы выбор не обрывался.",
        ],
      ]),
      b("Mağaza və çatdırılma", "Магазин и доставка", [
        [
          "Bakı, Sumqayıt və Gəncədə ünvanlar «Mağazalar» səhifəsindədir. Bakı, Sumqayıt və Xırdalan üçün nümunə çatdırılma müddəti 24 saatdır.",
          "Адреса в Баку, Сумгаите и Гяндже — на странице «Магазины». Для Баку, Сумгаита и Хырдалана образец срока доставки — 24 часа.",
        ],
      ]),
    ],
  },
  {
    slug: "catdirilma-ve-odenis",
    title: { az: "Çatdırılma və ödəniş", ru: "Доставка и оплата" },
    lead: {
      az: "Sifarişi ünvana gətirmək və ya mağazadan götürmək olar. Ödəniş kart, nağd, taksit və qapıda qəbul olunur.",
      ru: "Заказ можно привезти на адрес или забрать в магазине. Оплата картой, наличными, такситом и при получении.",
    },
    blocks: [
      b("Çatdırılma", "Доставка", [
        [
          "Bakı, Sumqayıt və Xırdalana standart çatdırılma 24 saat ərzində planlanır. Bölgələrə müddət məsafədən asılı olaraq 2–5 iş günüdür.",
          "В Баку, Сумгаит и Хырдалан стандартная доставка планируется за 24 часа. В регионы срок 2–5 рабочих дней в зависимости от расстояния.",
        ],
        [
          "Böyük məişət texnikası mərtəbəyə qədər qaldırılır. Quraşdırma ayrıca xidmət səhifəsində yazılıb.",
          "Крупную технику поднимают до этажа. Установка описана на отдельной странице услуг.",
        ],
      ]),
      b("Ödəniş", "Оплата", [
        [
          "Tam ödəniş nağd və ya bank kartı ilə olur. Hissə-hissə seçimdə müddət 3, 6, 9, 12, 15, 18, 21 və 24 aydır.",
          "Полная оплата — наличные или банковская карта. При оплате частями срок: 3, 6, 9, 12, 15, 18, 21 и 24 месяца.",
        ],
        [
          "Bu nümunə saytda real kart əməliyyatı aparılmır. Səbət yalnız sizin brauzerinizdə qalır.",
          "На этом образце сайта реальная операция по карте не проводится. Корзина остаётся только в вашем браузере.",
        ],
      ]),
    ],
  },
  {
    slug: "zemanet",
    title: { az: "Zəmanət", ru: "Гарантия" },
    lead: {
      az: "Hər məhsulun kartında zəmanət müddəti yazılır. Qüsur zavod şərtinə düşəndə servis qəbul edir.",
      ru: "Срок гарантии указан в карточке товара. Если дефект попадает под заводские условия, его принимает сервис.",
    },
    blocks: [
      b("Müddət", "Срок", [
        [
          "Telefon və qulaqlıqlarda adətən 12 ay, böyük məişət və televizorda 24 ay göstərilir. Dəqiq rəqəm məhsulun xüsusiyyət cədvəlindədir.",
          "У телефонов и наушников обычно 12 месяцев, у крупной техники и телевизоров — 24. Точная цифра в таблице характеристик.",
        ],
      ]),
      b("Nə örtülmür", "Что не покрывается", [
        [
          "Maye izi, sınmış ekran və sərbəst açılmış korpus zəmanətdən kənardır. Çatdırılma zamanı zədə varsa, qəbul anında qeyd edin.",
          "Следы жидкости, разбитый экран и вскрытый корпус вне гарантии. Если повреждение при доставке, отметьте его в момент приёмки.",
        ],
      ]),
    ],
  },
  {
    slug: "xidmetler",
    title: { az: "Xidmətlər", ru: "Услуги" },
    lead: {
      az: "Alışla birlikdə quraşdırma, köhnə texnikanın aparılması və ekran qoruyucu yapışdırılması sifariş olunur.",
      ru: "Вместе с покупкой можно заказать установку, вывоз старой техники и наклейку защитного стекла.",
    },
    blocks: [
      b("Quraşdırma", "Установка", [
        [
          "Paltaryuyan, soyuducu və televizorun yerinə qoyulması mağaza xidmətidir. Usta qoşulmanı yoxlayır və qısa təlimat verir.",
          "Установка стиральной машины, холодильника и телевизора — услуга магазина. Мастер проверяет подключение и коротко объясняет.",
        ],
      ]),
      b("Əlavə işlər", "Дополнительно", [
        [
          "Köhnə cihazın aparılması və məlumat köçürməsi ayrıca qiymətləndirilir. Müraciət formasında modeli yazın.",
          "Вывоз старого устройства и перенос данных оцениваются отдельно. Напишите модель в форме обращения.",
        ],
      ]),
    ],
  },
  {
    slug: "qaytarilma-ve-imtina-sertleri",
    title: { az: "Qaytarılma və imtina şərtləri", ru: "Условия возврата и отказа" },
    lead: {
      az: "Uyğun gəlməyən məhsulu 30 gün ərzində, istifadə izi olmadan dəyişmək və ya qaytarmaq olar.",
      ru: "Неподошедший товар можно обменять или вернуть в течение 30 дней, если нет следов использования.",
    },
    blocks: [
      b("Şərt", "Условие", [
        [
          "Qutu, çek və tam dəst olmalıdır. Gigiyena möhürü açılmış qulaqlıq və trimmer qaytarılmır.",
          "Нужны коробка, чек и полный комплект. Наушники и триммер со вскрытой гигиенической пломбой не возвращаются.",
        ],
        [
          "Qüsur aşkar olunarsa, servis aktı ilə dəyişmə və ya təmir seçilir. Müddət zəmanət səhifəsindəki qaydaya uyğundur.",
          "Если найден дефект, по акту сервиса выбирают замену или ремонт. Срок соответствует правилам на странице гарантии.",
        ],
      ]),
    ],
  },
  {
    slug: "nisye-alis",
    title: { az: "Nisyə alış", ru: "Покупка в кредит" },
    lead: {
      az: "Endirimli qiyməti aylara bölmək olar. Məhsul səhifəsində müddəti və ilkin ödənişi özünüz seçirsiniz.",
      ru: "Цену со скидкой можно разложить по месяцам. На странице товара вы сами выбираете срок и первый взнос.",
    },
    blocks: [
      b("Necə hesablanır", "Как считается", [
        [
          "Aylıq məbləğ (qiymət − ilkin ödəniş) / ay sayıdır. 12 və 18 ay ən çox seçilən müddətlərdir.",
          "Месячная сумма — это (цена − первый взнос) / число месяцев. Чаще всего выбирают 12 и 18 месяцев.",
        ],
        [
          "Birbank, Bolkart və Tamkart sətirləri eyni kalkulyatoru göstərir. Real bank təsdiqi bu nümunə saytda yoxdur.",
          "Строки Birbank, Bolkart и Tamkart показывают тот же калькулятор. Реального одобрения банка на образце сайта нет.",
        ],
      ]),
    ],
  },
  {
    slug: "ayliq-odenis",
    title: { az: "Aylıq ödəniş", ru: "Ежемесячный платёж" },
    lead: {
      az: "Kart üzrə aylıq ödəniş məhsulun qiymətindən və seçilən aydan asılıdır. İlkin məbləği artırdıqca ay kiçilir.",
      ru: "Ежемесячный платёж зависит от цены и выбранного срока. Чем больше первый взнос, тем меньше месяц.",
    },
    blocks: [
      b("Nümunə", "Пример", [
        [
          "3119.99 ₼ qiymət, 0 ilkin ödəniş və 12 ay təxminən 260 ₼ aylıq edir. Rəqəm məhsul səhifəsində yenidən hesablanır.",
          "Цена 3119.99 ₼, нулевой взнос и 12 месяцев дают около 260 ₼ в месяц. Цифра заново считается на странице товара.",
        ],
        [
          "Aktiv müqaviləni yoxlamaq üçün FİN və müqavilə nömrəsi formasını doldurun. Cavab nümunə mətndir.",
          "Чтобы проверить активный договор, заполните FIN и номер. Ответ будет образцовым текстом.",
        ],
      ]),
    ],
  },
  {
    slug: "arxayin-al",
    title: { az: "Arxayın al", ru: "Покупай спокойно" },
    lead: {
      az: "30 gün ərzində dəyişmə və qaytarma, şəffaf qiymət və servis ünvanı bir yerdədir.",
      ru: "Обмен и возврат за 30 дней, понятная цена и адрес сервиса собраны в одном месте.",
    },
    blocks: [
      b("Vəd", "Обещание", [
        [
          "Qiymətin üstündə köhnə və yeni rəqəm birlikdə durur. Endirim məbləği kartın küncündə ayrıca yazılır.",
          "Над ценой вместе стоят старая и новая цифры. Сумма скидки отдельно написана в углу карточки.",
        ],
        [
          "Sualınız qalarsa, 143 nömrəsinə zəng edin və ya müraciət formasını göndərin. İş saatı 09:00–21:00.",
          "Если вопрос остался, звоните на 143 или отправьте форму. Часы работы 09:00–21:00.",
        ],
      ]),
    ],
  },
  {
    slug: "musteri-karti",
    title: { az: "Müştəri kartı", ru: "Карта клиента" },
    lead: {
      az: "Kart alış məbləğinə görə bonus toplayır. Bonus növbəti alışda qiymətdən düşülür.",
      ru: "Карта копит бонус с суммы покупки. Бонус списывается со следующей цены.",
    },
    blocks: [
      b("Necə alınır", "Как получить", [
        [
          "Mağazada şəxsiyyət vəsiqəsi ilə kart açılır. Bu saytda hesab səhifəsinə ad və telefon yazmaq kifayətdir, kart nömrəsi verilmir.",
          "В магазине карту открывают с удостоверением. На сайте достаточно имени и телефона на странице аккаунта, номер карты не выдаётся.",
        ],
        [
          "Bonus kampaniya mallarına şamil olunmaya bilər. Şərt hər aksiyanın mətnində ayrıca durur.",
          "Бонус может не действовать на акционные товары. Условие отдельно стоит в тексте каждой акции.",
        ],
      ]),
    ],
  },
  {
    slug: "mexfilik-siyaseti",
    title: { az: "Məxfilik siyasəti", ru: "Политика конфиденциальности" },
    lead: {
      az: "Bu nümunə sayt şəxsi məlumatı serverə göndərmir. Ad, telefon və səbət yalnız brauzerin yaddaşında qalır.",
      ru: "Этот образец сайта не отправляет личные данные на сервер. Имя, телефон и корзина остаются только в памяти браузера.",
    },
    blocks: [
      b("Nə saxlanılır", "Что хранится", [
        [
          "Səbət, sevimlilər, müqayisə, tema və hesab məlumatı localStorage açarlarında durur. Brauzer məlumatını siləndə onlar da silinir.",
          "Корзина, избранное, сравнение, тема и данные аккаунта лежат в ключах localStorage. При очистке браузера они удаляются.",
        ],
        [
          "Axtarış sorğusu ünvan sətrində qalır və başqa serverə ötürülmür. Xəbər bülleteni ünvanı da yalnız ekranda təsdiqlənir.",
          "Поисковый запрос остаётся в адресной строке и никуда не передаётся. Адрес рассылки тоже подтверждается только на экране.",
        ],
      ]),
    ],
  },
  {
    slug: "servis-merkezleri",
    title: { az: "Servis mərkəzləri", ru: "Сервисные центры" },
    lead: {
      az: "Zəmanətli təmir üçün cihazı çeklə birlikdə yaxın mərkəzə təhvil verin.",
      ru: "Для гарантийного ремонта сдайте устройство вместе с чеком в ближайший центр.",
    },
    blocks: [
      b("Bakı", "Баку", [
        [
          "Nərimanov servisi: Təbriz küçəsi 44. Qəbul 10:00–19:00, bazar istirahət. Telefon: 143.",
          "Сервис Нариманова: ул. Тебриз 44. Приём 10:00–19:00, воскресенье выходной. Телефон: 143.",
        ],
        [
          "Xətai servisi: Babək prospekti 18. Ekran, batareya və məişət mühərriki burada baxılır.",
          "Сервис Хатаи: проспект Бабека 18. Здесь смотрят экран, батарею и двигатели бытовой техники.",
        ],
      ]),
      b("Bölgə", "Регионы", [
        [
          "Sumqayıt və Gəncə mağazalarının servis guşəsi həftə içi 11:00–18:00 işləyir. Böyük texnika ünvandan götürülə bilər.",
          "Сервисный угол магазинов Сумгаита и Гянджи работает по будням 11:00–18:00. Крупную технику могут забрать с адреса.",
        ],
      ]),
    ],
  },
  {
    slug: "karyera",
    title: { az: "Karyera", ru: "Карьера" },
    lead: {
      az: "Mağaza satıcısı, anbar və servis vakansiyaları il boyu açılır. Müraciət formasından göndərin.",
      ru: "Вакансии продавца, склада и сервиса открываются в течение года. Отправьте заявку через форму обращения.",
    },
    blocks: [
      b("Açıq istiqamətlər", "Открытые направления", [
        [
          "Satış məsləhətçisi məhsulun aylıq ödənişini və zəmanətini alıcıya izah edir. Təcrübə şərti deyil, məhsulu oxumaq vacibdir.",
          "Консультант объясняет покупателю месячный платёж и гарантию. Опыт не обязателен, важно читать карточку товара.",
        ],
        [
          "Anbar əməkdaşı sifarişi yığır və çatdırılma marşrutuna verir. Növbə 09:00–18:00.",
          "Сотрудник склада собирает заказ и передаёт его на маршрут доставки. Смена 09:00–18:00.",
        ],
      ]),
    ],
  },
  {
    slug: "tetbiq",
    title: { az: "Mobil tətbiq", ru: "Мобильное приложение" },
    lead: {
      az: "Tətbiqdə kataloq, səbət və kampaniya bildirişi toplanır. Bu nümunədə tətbiq mağazasına keçid yoxdur, imkanlar burada yazılıb.",
      ru: "В приложении собраны каталог, корзина и уведомления акций. В этом образце нет перехода в магазин приложений, возможности описаны здесь.",
    },
    blocks: [
      b("Nə edir", "Что умеет", [
        [
          "Barkodla mağazada qiymət yoxlamaq, sevimli məhsulu saxlamaq və aylıq ödəniş tarixini görmək.",
          "Проверять цену по штрихкоду в магазине, хранить избранное и видеть дату месячного платежа.",
        ],
        [
          "Bildirişlər kampaniya bitməmişdən bir gün əvvəl gəlir. Söndürmək hesab bölməsindədir.",
          "Уведомление приходит за день до конца акции. Отключение — в разделе аккаунта.",
        ],
      ]),
    ],
  },
];

export function getInfo(slug: string) {
  return infoPages.find((page) => page.slug === slug);
}
