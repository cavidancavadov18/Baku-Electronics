import type { Localized } from "./products";
import { liveStores } from "./live-stores";

export type Store = {
  id: string;
  city: Localized;
  name: Localized;
  address: Localized;
  hours: string;
  phone: string;
};

export const stores: Store[] = liveStores;

export type Campaign = {
  slug: string;
  tone: "red" | "navy" | "gold";
  title: Localized;
  text: Localized;
  until: string;
  image: string;
};

export const campaigns: Campaign[] = [
  {
    slug: "18-ay",
    tone: "red",
    title: { az: "18 ayadək faizsiz böl", ru: "Без процентов до 18 месяцев" },
    text: {
      az: "Seçilmiş məhsulların endirimli qiymətini 3 aydan 18 aya qədər bərabər hissələrə bölmək olar. İlkin ödəniş məhsul səhifəsində dəyişir.",
      ru: "Цену со скидкой на выбранные товары можно разделить на равные части от 3 до 18 месяцев. Первый взнос меняется на странице товара.",
    },
    until: "31.10.2026",
    image: "https://media.bakuelectronics.az/media/page/slider/Samsung-modell%C9%99rinin-endirilmi%C5%9F-qiym%C4%B1tini-12-aya-b%C3%B6l-923-x-520.png",
  },
  {
    slug: "nagd",
    tone: "navy",
    title: { az: "Nağd alışda əlavə endirim", ru: "Дополнительная скидка при оплате наличными" },
    text: {
      az: "Nağd və ya kartla tam ödənişdə seçilmiş məişət texnikası və televizorlarda əlavə endirim tətbiq olunur.",
      ru: "При полной оплате наличными или картой на выбранную технику и телевизоры действует дополнительная скидка.",
    },
    until: "31.10.2026",
    image: "https://media.bakuelectronics.az/media/page/slider/d%C9%99li_dolu923x520_copy.webp",
  },
  {
    slug: "payiz",
    tone: "gold",
    title: { az: "Payız fürsətləri", ru: "Осенние предложения" },
    text: {
      az: "Smartfon, notbuk, planşet və robot tozsoranlarda mövsümi dəst. Kataloqda tablar üzrə baxmaq olar.",
      ru: "Сезонный набор смартфонов, ноутбуков, планшетов и роботов-пылесосов. В каталоге их можно смотреть по вкладкам.",
    },
    until: "15.11.2026",
    image: "https://media.bakuelectronics.az/media/page/slider/923x520_pay%C4%B1z.webp",
  },
  {
    slug: "super-cume",
    tone: "red",
    title: { az: "Super cümə seçimləri", ru: "Подборка суперпятницы" },
    text: {
      az: "Həftəsonu üçün qulaqlıq, kiçik məişət və mətbəx dəstlərində qısa müddətli qiymət.",
      ru: "Короткая цена выходного дня на наушники, мелкую технику и кухонные наборы.",
    },
    until: "11.10.2026",
    image: "https://media.bakuelectronics.az/media/page/slider/923x520-dreame_22.webp",
  },
];

export const partners: { name: string; logo: string; text: Localized }[] = [
  { name: "ABB Bank", logo: "https://media.bakuelectronics.az/media/sitepartners/logo/abb-logo.jpg", text: { az: "Bank xidmətləri", ru: "Банковские услуги" } },
  { name: "bir bank", logo: "https://media.bakuelectronics.az/media/sitepartners/logo/birbank.png", text: { az: "Bank xidmətləri", ru: "Банковские услуги" } },
  { name: "Leo Bank", logo: "https://media.bakuelectronics.az/media/sitepartners/logo/leobank.webp", text: { az: "Bank xidmətləri", ru: "Банковские услуги" } },
  { name: "Bank of Baku", logo: "https://media.bakuelectronics.az/media/sitepartners/logo/Bank_of_Baku.webp", text: { az: "Bank xidmətləri", ru: "Банковские услуги" } },
  { name: "A kart", logo: "https://media.bakuelectronics.az/media/sitepartners/logo/A_kart.webp", text: { az: "Ödəniş xidmətləri", ru: "Платёжные услуги" } },
  { name: "Uni Bank", logo: "https://media.bakuelectronics.az/media/sitepartners/logo/Untitled-1-06.webp", text: { az: "Bank xidmətləri", ru: "Банковские услуги" } },
  { name: "Wolt", logo: "https://media.bakuelectronics.az/media/sitepartners/logo/wolt_1.webp", text: { az: "Çatdırılma xidməti", ru: "Служба доставки" } },
  { name: "Sosial tərəfdaş", logo: "https://media.bakuelectronics.az/media/sitepartners/logo/sosial_terefdas.webp", text: { az: "Təqaüdçülərə endirim", ru: "Скидка для пенсионеров" } },
];

export type Article = {
  slug: string;
  date: string;
  title: Localized;
  lead: Localized;
  image: string;
  body: Localized[];
};

export const articles: Article[] = [
  {
    slug: "premium-smartfon-secimi",
    date: "05.10.2026",
    image: "https://media.bakuelectronics.az/media/news/premium-smartfon-secimi.png",
    title: {
      az: "Premium Smartfon seçimi: Samsung Galaxy, Honor yoxsa Apple?",
      ru: "Премиум-смартфон: Samsung Galaxy, Honor или Apple?",
    },
    lead: {
      az: "Premium smartfon almaq qərarı verdinsə, amma Samsung Galaxy S25, Apple iPhone 17/18 seriyası ya da Honor Magic arasında çaşıb qalmısansa — bu məqalə tam sənin üçündür.",
      ru: "Если выбираете премиум-смартфон и путаетесь между Samsung Galaxy S25, Apple iPhone 17/18 и Honor Magic — эта статья для вас.",
    },
    body: [
      {
        az: "Apple seçəndə eyni hesabla planşet, saat və qulaqlıq bir-birini tanıyır. Şəkil köçürmək və zəngi qulaqlığa keçirmək əlavə tətbiq istəmir.",
        ru: "С Apple планшет, часы и наушники узнают один аккаунт. Перенос фото и перевод звонка на наушники не требуют лишнего приложения.",
      },
      {
        az: "Samsung Ultra böyük ekran və qələm istəyənlər üçündür. Qeyd, imza və ekran bölünməsi ofis işində vaxt qazandırır.",
        ru: "Samsung Ultra — для тех, кому нужны большой экран и стилус. Заметки, подпись и разделение экрана экономят время в работе.",
      },
      {
        az: "Büdcəni saxlamaq lazımdırsa, orta sinif Samsung və Xiaomi modelləri 256 GB yaddaşla gündəlik işi örtür. Seçimdən əvvəl ekran ölçüsünü əldə yoxlayın.",
        ru: "Если бюджет важнее, средний класс Samsung и Xiaomi с 256 ГБ закрывает день. Перед выбором подержите размер экрана в руке.",
      },
    ],
  },
  {
    slug: "iphone-18-pro-pro-max-duo-hansi-secmeli",
    date: "29.09.2026",
    image: "https://media.bakuelectronics.az/media/news/iphone18-pro-pro-max-duo.png",
    title: {
      az: "iPhone 18 Pro, 18 Pro Max, yoxsa Duo?",
      ru: "iPhone 18 Pro, 18 Pro Max или Duo?",
    },
    lead: {
      az: "Hər üç modeli texniki xüsusiyyətlər, praktik istifadə və diqqət edilməli məqamlar baxımından izah edirik.",
      ru: "Разбираем все три модели по характеристикам, сценариям использования и важным деталям.",
    },
    body: [
      {
        az: "Pro Max cibə ağır gəlir, amma video və xəritə üçün ekranı rahatdır. Bir əllə yazırsınızsa, Pro ölçüsü daha düzgündür.",
        ru: "Pro Max тяжеловат для кармана, зато экран удобен для видео и карт. Если печатаете одной рукой, размер Pro уместнее.",
      },
      {
        az: "512 GB yalnız 4K video saxlayanlara lazımdır. Şəkilləri buluda köçürürsünüzsə, 256 GB illərlə kifayət edir.",
        ru: "512 ГБ нужны тем, кто хранит видео 4K. Если фото уходят в облако, 256 ГБ хватает на годы.",
      },
      {
        az: "Hissə-hissə ödənişdə aylıq məbləği müqayisə edin. Kiçik modelin 12 aylıq ödənişi böyük modelin qiymət fərqini bağlaya bilər.",
        ru: "При оплате частями сравните ежемесячную сумму. Платёж меньшей модели за 12 месяцев может перекрыть разницу в цене.",
      },
    ],
  },
  {
    slug: "led-oled-led-televizor-ferqi",
    date: "25.09.2026",
    image: "https://media.bakuelectronics.az/media/news/qled-oled-led-televizor-ferqi-hansi-secmeli.png",
    title: {
      az: "QLED, OLED yoxsa LED? Televizor seçərkən ekran texnologiyası niyə önəmlidir?",
      ru: "QLED, OLED или LED? Почему технология экрана важна при выборе телевизора",
    },
    lead: {
      az: "QLED, Neo QLED, OLED, LED və QNED oxşar görünsə də, qiymət və şəkil fərqi buradadır.",
      ru: "QLED, Neo QLED, OLED, LED и QNED выглядят похоже, но цена и картинка расходятся именно здесь.",
    },
    body: [
      {
        az: "OLED qaranlıq otaqda kinoya yaxındır: qara həqiqətən qaradır. Pəncərə qarşısında isə parlaq QLED gündüz daha oxunaqlı qalır.",
        ru: "OLED близок к кино в тёмной комнате: чёрный действительно чёрный. Напротив окна яркий QLED днём читается лучше.",
      },
      {
        az: "32 düym mətbəx və yataq üçündür. Qonaq otağında divardan 2.5 metr aralı oturursunuzsa, 55 düym daha rahatdır.",
        ru: "32 дюйма — для кухни и спальни. Если в гостиной сидите в 2.5 метра от стены, удобнее 55 дюймов.",
      },
      {
        az: "Zəmanət müddətini yoxlayın. Böyük ekranlarda panel və işıq zolağı ayrıca şərtlərlə gələ bilər.",
        ru: "Проверьте срок гарантии. На больших экранах панель и подсветка могут идти с отдельными условиями.",
      },
    ],
  },
  {
    slug: "yeni-hekayelere-hazir-ol",
    date: "22.09.2026",
    image: "https://media.bakuelectronics.az/media/news/BE_Qezet_Blog_Cover_1225x645_1.png",
    title: { az: "Yeni hekayələrə hazır ol!", ru: "Готовьтесь к новым историям!" },
    lead: {
      az: "Baku Electronics-in yeni mövsüm hekayələri: məhsul seçimi, kampaniya və mağaza xəbərləri bir yerdə.",
      ru: "Новые сезонные истории Baku Electronics: выбор техники, акции и новости магазинов.",
    },
    body: [
      { az: "Payız kampaniyalarında smartfon, məişət texnikası və aksesuar bir arada çıxır. Seçimdən əvvəl həm nağd endirimi, həm də 18 ayadək faizsiz bölgünü müqayisə edin.", ru: "В осенних акциях рядом смартфоны, техника и аксессуары. До выбора сравните скидку за наличные и беспроцентную рассрочку до 18 месяцев." },
    ],
  },
  {
    slug: "trade-in-iphone-18-pro",
    date: "18.09.2026",
    image: "https://media.bakuelectronics.az/media/news/18-ayadek-faizsiz-25-sentyabradek_1.webp",
    title: { az: "iPhone 18 Pro modellərini Trade-In ilə əldə edin", ru: "iPhone 18 Pro по программе Trade-In" },
    lead: { az: "iPhone 18 Pro — 18 ayadək faizsiz taksitlə.", ru: "iPhone 18 Pro — беспроцентная рассрочка до 18 месяцев." },
    body: [
      { az: "Köhnə telefonu təhvil verib yeni iPhone 18 Pro modelinə keçid etmək olar. Yekun məbləğ modelə və təhvil verilən cihazın vəziyyətinə görə dəyişir.", ru: "Старый телефон можно сдать и перейти на iPhone 18 Pro. Итог зависит от модели и состояния сдаваемого устройства." },
    ],
  },
  {
    slug: "apple-watch-ultra-4-18-ayadek-faizsiz-25-sentyabradek",
    date: "18.09.2026",
    image: "https://media.bakuelectronics.az/media/news/18-ayadek-faizsiz-25-sentyabradek_3.webp",
    title: { az: "Apple Watch Ultra 4 — 18 ayadək faizsiz", ru: "Apple Watch Ultra 4 — без процентов до 18 месяцев" },
    lead: { az: "Apple Watch Ultra 4 seçilmiş müddətdə faizsiz taksitlə satılır.", ru: "Apple Watch Ultra 4 продаётся в беспроцентную рассрочку." },
    body: [
      { az: "Ultra seriyası idman və uzun batareya istəyənlər üçündür. Aylıq ödənişi məhsul səhifəsindəki kalkulyatorda yoxlayın.", ru: "Серия Ultra — для спорта и долгой батареи. Ежемесячный платёж смотрите в калькуляторе на странице товара." },
    ],
  },
  {
    slug: "apple-watch-series-12-18-ayadek-faizsiz-25-sentyabradek",
    date: "18.09.2026",
    image: "https://media.bakuelectronics.az/media/news/18-ayadek-faizsiz-25-sentyabradek_2.webp",
    title: { az: "Apple Watch Series 12 — 18 ayadək faizsiz", ru: "Apple Watch Series 12 — без процентов до 18 месяцев" },
    lead: { az: "Apple Watch Series 12 gündəlik istifadə üçün daha yüngül seçimdir.", ru: "Apple Watch Series 12 — более лёгкий выбор на каждый день." },
    body: [
      { az: "Series modelləri zəng, bildiriş və idman izləməsi üçün kifayət edir. Ultra ilə fərq əsasən korpus, batareya və qiymətdədir.", ru: "Серия Series закрывает звонки, уведомления и спорт. От Ultra её отличают корпус, батарея и цена." },
    ],
  },
  {
    slug: "airpods-5-18-ayadek-faizsiz-25-sentyabradek",
    date: "18.09.2026",
    image: "https://media.bakuelectronics.az/media/news/18-ayadek-faizsiz-25-sentyabradek_4.webp",
    title: { az: "AirPods 5 — 18 ayadək faizsiz", ru: "AirPods 5 — без процентов до 18 месяцев" },
    lead: { az: "AirPods 5 seçilmiş kampaniya müddətində satışdadır.", ru: "AirPods 5 доступны в период выбранной акции." },
    body: [
      { az: "Qulaqlığı telefonla birlikdə alanda aylıq yükü ayrıca hesablayın. Səbət nümunədir, real ödəniş bu saytda açılmır.", ru: "Если берёте наушники вместе с телефоном, посчитайте платёж отдельно. Корзина — образец, настоящая оплата здесь не открывается." },
    ],
  },
];

export function getArticle(slug: string) {
  return articles.find((item) => item.slug === slug);
}
