import { extraProducts } from "./extra-products";
import liveCatalog from "./live-catalog.json";
import adminOverrides from "./admin-overrides.json";

export type Locale = "az" | "ru";
export type Localized = { az: string; ru: string };

export type VisualKind =
  | "phone"
  | "laptop"
  | "tablet"
  | "headphones"
  | "earbuds"
  | "tv"
  | "fridge"
  | "washer"
  | "vacuum"
  | "robot"
  | "cook"
  | "watch"
  | "groom";

export type Spec = { label: Localized; value: Localized };

export type Product = {
  id: string;
  slug: string;
  category: string;
  brand: string;
  price: number;
  oldPrice: number;
  months: number;
  rating: number;
  reviews: number;
  code: string;
  visual: VisualKind;
  tone: string;
  image?: string;
  name: Localized;
  about: Localized;
  specs: Spec[];
  bestseller?: boolean;
};

export type Category = {
  slug: string;
  group: string;
  name: Localized;
};

const baseCategories: Category[] = [
  { slug: "smartfonlar", group: "phones", name: { az: "Smartfonlar", ru: "Смартфоны" } },
  { slug: "qulaqliqlar", group: "phones", name: { az: "Qulaqlıqlar", ru: "Наушники" } },
  { slug: "plansetler", group: "phones", name: { az: "Planşetlər", ru: "Планшеты" } },
  { slug: "smart-saatlar", group: "phones", name: { az: "Smart saatlar", ru: "Смарт-часы" } },
  { slug: "notbuklar", group: "computers", name: { az: "Notbuklar", ru: "Ноутбуки" } },
  { slug: "tv-audio", group: "tv", name: { az: "TV və audio", ru: "ТВ и аудио" } },
  { slug: "soyuducular", group: "big", name: { az: "Soyuducular", ru: "Холодильники" } },
  { slug: "dondurucu-kameralar", group: "big", name: { az: "Dondurucu kameralar", ru: "Морозильники" } },
  { slug: "paltaryuyan-masinlar", group: "big", name: { az: "Paltaryuyan maşınlar", ru: "Стиральные машины" } },
  { slug: "quruducu-masinlar", group: "big", name: { az: "Quruducu maşınlar", ru: "Сушильные машины" } },
  { slug: "qabyuyan-masinlar", group: "big", name: { az: "Qabyuyan maşınlar", ru: "Посудомоечные машины" } },
  { slug: "sobalar", group: "big", name: { az: "Sobalar", ru: "Духовые шкафы" } },
  { slug: "pliteler", group: "big", name: { az: "Plitələr", ru: "Плиты" } },
  { slug: "bisirme-panelleri", group: "big", name: { az: "Bişirmə panelləri", ru: "Варочные панели" } },
  { slug: "aspiratorlar", group: "big", name: { az: "Aspiratorlar", ru: "Вытяжки" } },
  { slug: "tozsoranlar", group: "small", name: { az: "Tozsoranlar", ru: "Пылесосы" } },
  { slug: "robot-tozsoran", group: "small", name: { az: "Robot tozsoranlar", ru: "Роботы-пылесосы" } },
  { slug: "vertikal-tozsoranlar", group: "small", name: { az: "Şaquli tozsoranlar", ru: "Вертикальные пылесосы" } },
  { slug: "yuyucu-tozsoranlar", group: "small", name: { az: "Yuyucu tozsoranlar", ru: "Моющие пылесосы" } },
  { slug: "buxarli-temizleyiciler", group: "small", name: { az: "Buxarlı təmizləyicilər", ru: "Пароочистители" } },
  { slug: "utuler", group: "small", name: { az: "Ütülər", ru: "Утюги" } },
  { slug: "utu-masalari", group: "small", name: { az: "Ütü masaları", ru: "Гладильные доски" } },
  { slug: "paltar-quruducular", group: "small", name: { az: "Paltar quruducular", ru: "Сушилки для белья" } },
  { slug: "tikis-masinlari", group: "small", name: { az: "Tikiş maşınları", ru: "Швейные машины" } },
  { slug: "buxar-dolablari", group: "small", name: { az: "Buxar dolabları", ru: "Паровые шкафы" } },
  { slug: "metbex", group: "kitchen", name: { az: "Mətbəx ləvazimatı", ru: "Товары для кухни" } },
  { slug: "blenderler", group: "kitchen", name: { az: "Blenderlər", ru: "Блендеры" } },
  { slug: "mikserler", group: "kitchen", name: { az: "Mikserlər", ru: "Миксеры" } },
  { slug: "etcekenler", group: "kitchen", name: { az: "Ətçəkənlər", ru: "Мясорубки" } },
  { slug: "metbex-kombaynlari", group: "kitchen", name: { az: "Mətbəx kombaynları", ru: "Кухонные комбайны" } },
  { slug: "metbex-terezileri", group: "kitchen", name: { az: "Mətbəx tərəziləri", ru: "Кухонные весы" } },
  { slug: "fritozlar", group: "kitchen", name: { az: "Fritozlar", ru: "Фритюрницы" } },
  { slug: "tosterler", group: "kitchen", name: { az: "Tosterlər", ru: "Тостеры" } },
  { slug: "multibisiriciler", group: "kitchen", name: { az: "Multibişiricilər", ru: "Мультиварки" } },
  { slug: "mikrodalgali-sobalar", group: "kitchen", name: { az: "Mikrodalğalı sobalar", ru: "Микроволновые печи" } },
  { slug: "qurudanlar", group: "kitchen", name: { az: "Meyvə qurudanlar", ru: "Сушилки для фруктов" } },
  { slug: "elektrik-sobalar", group: "kitchen", name: { az: "Elektrik sobalar", ru: "Электрические печи" } },
  { slug: "buz-hazirlayanlar", group: "kitchen", name: { az: "Buz hazırlayanlar", ru: "Льдогенераторы" } },
  { slug: "su-vid", group: "kitchen", name: { az: "Su-vid", ru: "Су-вид" } },
  { slug: "caydanlar", group: "kitchen", name: { az: "Elektrik çaydanlar", ru: "Электрочайники" } },
  { slug: "samovarlar", group: "kitchen", name: { az: "Samovarlar", ru: "Самовары" } },
  { slug: "qehve-demleyenler", group: "kitchen", name: { az: "Qəhvə maşınları", ru: "Кофемашины" } },
  { slug: "qehve-uyudenler", group: "kitchen", name: { az: "Qəhvəüyüdənlər", ru: "Кофемолки" } },
  { slug: "sirecekenler", group: "kitchen", name: { az: "Şirəçəkənlər", ru: "Соковыжималки" } },
  { slug: "dispenserler", group: "kitchen", name: { az: "Su dispenserləri", ru: "Кулеры" } },
  { slug: "su-filtrleri", group: "kitchen", name: { az: "Su filtrləri", ru: "Фильтры для воды" } },
  { slug: "kondisionerler", group: "climate", name: { az: "Kondisionerlər", ru: "Кондиционеры" } },
  { slug: "kombiler", group: "climate", name: { az: "Kombilər", ru: "Котлы" } },
  { slug: "su-qizdiricilari", group: "climate", name: { az: "Su qızdırıcıları", ru: "Водонагреватели" } },
  { slug: "qaz-kalonkalari", group: "climate", name: { az: "Qaz kalonkaları", ru: "Газовые колонки" } },
  { slug: "nemlendiriciler", group: "climate", name: { az: "Hava nəmləndiricilər", ru: "Увлажнители" } },
  { slug: "hava-quruduculari", group: "climate", name: { az: "Hava quruducuları", ru: "Осушители" } },
  { slug: "hava-temizleyicileri", group: "climate", name: { az: "Hava təmizləyicilər", ru: "Очистители воздуха" } },
  { slug: "ventilyatorlar", group: "climate", name: { az: "Ventilyatorlar", ru: "Вентиляторы" } },
  { slug: "radiatorlar", group: "climate", name: { az: "Konvektorlar", ru: "Конвекторы" } },
  { slug: "qizdirici-ventilyatorlar", group: "climate", name: { az: "Qızdırıcı ventilyatorlar", ru: "Тепловентиляторы" } },
  { slug: "panel-radiatorlar", group: "climate", name: { az: "Panel radiatorlar", ru: "Панельные радиаторы" } },
  { slug: "fenler", group: "care", name: { az: "Fenlər", ru: "Фены" } },
  { slug: "daraqli-fenler", group: "care", name: { az: "Daraqlı fenlər", ru: "Фены-щётки" } },
  { slug: "sac-duzlendiriciler", group: "care", name: { az: "Saç ütüləri", ru: "Выпрямители" } },
  { slug: "multistaylerler", group: "care", name: { az: "Multistaylerlər", ru: "Мультистайлеры" } },
  { slug: "epilyatorlar", group: "care", name: { az: "Epilyatorlar", ru: "Эпиляторы" } },
  { slug: "fotoepilyatorlar", group: "care", name: { az: "Fotoepilyatorlar", ru: "Фотоэпиляторы" } },
  { slug: "uzqirxanlar", group: "care", name: { az: "Üzqırxanlar", ru: "Электробритвы" } },
  { slug: "sac-qirxanlar", group: "care", name: { az: "Saç qırxanlar", ru: "Машинки для стрижки" } },
  { slug: "trimmerler", group: "care", name: { az: "Trimmerlər", ru: "Триммеры" } },
  { slug: "uz-qullugu", group: "care", name: { az: "Üzə qulluq", ru: "Уход за лицом" } },
];

export const groups: { id: string; name: Localized }[] = [
  { id: "phones", name: { az: "Telefonlar və qadcetlər", ru: "Телефоны и гаджеты" } },
  { id: "computers", name: { az: "Notbuklar və kompüterlər", ru: "Ноутбуки и компьютеры" } },
  { id: "tv", name: { az: "TV, audio və video", ru: "ТВ, аудио и видео" } },
  { id: "big", name: { az: "Böyük məişət texnikası", ru: "Крупная бытовая техника" } },
  { id: "small", name: { az: "Kiçik məişət texnikası", ru: "Мелкая бытовая техника" } },
  { id: "kitchen", name: { az: "Mətbəx ləvazimatları", ru: "Товары для кухни" } },
  { id: "climate", name: { az: "İqlim texnikası", ru: "Климатическая техника" } },
  { id: "care", name: { az: "Gözəllik və baxım", ru: "Красота и уход" } },
  { id: "more", name: { az: "Digər məhsullar", ru: "Другие товары" } },
];

export const catalogMenu: { id: string; name: Localized; icon: string; prefixes: string[]; banner?: string }[] = [
  { id: "phones", name: { az: "Smartfonlar və planşetlər", ru: "Смартфоны и планшеты" }, icon: "https://media.bakuelectronics.az/media/category/icons/smartfon-smartsaat.svg", prefixes: ["telefonlar-plansetler", "telefonlar-qadcetler"], banner: "https://media.bakuelectronics.az/media/megamenu/ttec_Kidi_Pro_2KSW03.png" },
  { id: "computers", name: { az: "Notbuklar və kompüter texnikası", ru: "Ноутбуки и компьютерная техника" }, icon: "https://media.bakuelectronics.az/media/category/icons/notbuk-laptop-komputer.svg", prefixes: ["noutbuklar-komputerler-planshetler"], banner: "https://media.bakuelectronics.az/media/megamenu/Mouse_MF160.png" },
  { id: "games", name: { az: "Oyun konsolları və aksessuarlar", ru: "Игровые консоли и аксессуары" }, icon: "https://media.bakuelectronics.az/media/category/icons/oyun-konsol.svg", prefixes: ["oyun-konsollari-oyunlar"] },
  { id: "tv", name: { az: "TV, audio və video", ru: "ТВ, аудио и видео" }, icon: "https://media.bakuelectronics.az/media/category/icons/televizor-audio.svg", prefixes: ["tv-audio-video"] },
  { id: "big", name: { az: "Böyük məişət texnikası", ru: "Крупная бытовая техника" }, icon: "https://media.bakuelectronics.az/media/category/icons/boyuk-meiset-texnika.svg", prefixes: ["boyuk-meiset-texnikasi"], banner: "https://media.bakuelectronics.az/media/megamenu/YWM-FO6S302W.png" },
  { id: "small", name: { az: "Kiçik məişət texnikası", ru: "Мелкая бытовая техника" }, icon: "https://media.bakuelectronics.az/media/category/icons/kicik-meiset-texnika_1.svg", prefixes: ["kicik-meiset-texnikasi"], banner: "https://media.bakuelectronics.az/media/megamenu/7211005024.png" },
  { id: "climate", name: { az: "İqlim texnikası", ru: "Климатическая техника" }, icon: "https://media.bakuelectronics.az/media/category/icons/iqlim-kondisioner-kombi_1.svg", prefixes: ["iqlim-texnikasi", "qizdiricilar", "serinlik-dunyasi"] },
  { id: "care", name: { az: "Gözəllik və baxım", ru: "Красота и уход" }, icon: "https://media.bakuelectronics.az/media/category/icons/gozellik-saglamliq_1.svg", prefixes: ["gozellik-ve-baxim", "gunesh-stili"] },
  { id: "auto", name: { az: "Avto və moto", ru: "Авто и мото" }, icon: "https://media.bakuelectronics.az/media/category/icons/avto-moto_1.svg", prefixes: ["Avto-ve-moto-mehsullari"] },
  { id: "medical", name: { az: "Tibbi məhsulları", ru: "Медицинские товары" }, icon: "https://media.bakuelectronics.az/media/category/icons/tibbi-mehsullar.svg", prefixes: ["tibbi-mehsullari"] },
  { id: "garden", name: { az: "Ev və bağ", ru: "Дом и сад" }, icon: "https://media.bakuelectronics.az/media/category/icons/ev-bag.svg", prefixes: ["ev-bag"] },
  { id: "decor", name: { az: "Mebel, tekstil və dekor", ru: "Мебель, текстиль и декор" }, icon: "https://media.bakuelectronics.az/media/category/icons/mebel-tekstil-dekor.svg", prefixes: ["mebel-tekstil-v-dekor"] },
  { id: "kitchen", name: { az: "Qab-qacaq, tava-qazan", ru: "Посуда и кастрюли" }, icon: "https://media.bakuelectronics.az/media/category/icons/qab-qacaq-tava-qazan.svg", prefixes: ["qab-qacaq-tava-qazan"] },
  { id: "kids", name: { az: "Uşaq aləmi", ru: "Детский мир" }, icon: "https://media.bakuelectronics.az/media/category/icons/usaq-alemi.svg", prefixes: ["usaq-alemi"] },
  { id: "books", name: { az: "Kitablar", ru: "Книги" }, icon: "https://media.bakuelectronics.az/media/category/icons/kitablar.svg", prefixes: ["Kitablar", "kitablar"] },
  { id: "sport", name: { az: "İdman, turizm və hobbi", ru: "Спорт, туризм и хобби" }, icon: "https://media.bakuelectronics.az/media/category/icons/idman.svg", prefixes: ["idman-ve-hobbi", "aktiv-ve-saglam-yasham"] },
  { id: "pets", name: { az: "Ev heyvanları üçün məhsullar", ru: "Товары для животных" }, icon: "https://media.bakuelectronics.az/media/category/icons/ev-heyvanlari-ucun-mehsullar.svg", prefixes: ["ev-heyvanlari-ucun"] },
  { id: "build", name: { az: "Tikinti və təmir", ru: "Строительство и ремонт" }, icon: "https://media.bakuelectronics.az/media/category/icons/tikinti-temir.svg", prefixes: ["tikinti-ve-temir"] },
  { id: "carekit", name: { az: "Avadanlıqlara qulluq", ru: "Уход за техникой" }, icon: "https://media.bakuelectronics.az/media/category/icons/avadanliqlara-qulluq.svg", prefixes: ["avadanliqlara-qulluq"] },
  { id: "gifts", name: { az: "Hədiyyə kartları", ru: "Подарочные карты" }, icon: "https://media.bakuelectronics.az/media/category/icons/hediyye-kartlar.svg", prefixes: ["xidmetler-ve-hediyye-kartlari"] },
];

const jpgIds = new Set(["p25", "p31", "p48", "p77", "p80", "p90", "p91"]);

export function productImage(product: { id: string; image?: string }) {
  if (product.image) return product.image;
  return `/products/${product.id}.${jpgIds.has(product.id) ? "jpg" : "webp"}`;
}

const spec = (azL: string, ruL: string, azV: string, ruV: string): Spec => ({
  label: { az: azL, ru: ruL },
  value: { az: azV, ru: ruV },
});

const curatedProducts: Product[] = [
  {
    id: "p1",
    slug: "iphone-17-pro-256-silver",
    category: "smartfonlar",
    brand: "Apple",
    price: 3099.99,
    oldPrice: 3599.99,
    months: 12,
    rating: 5,
    reviews: 18,
    code: "222749",
    visual: "phone",
    tone: "#d9dde3",
    bestseller: true,
    name: { az: "Smartfon Apple iPhone 17 Pro 256GB Silver", ru: "Смартфон Apple iPhone 17 Pro 256GB Silver" },
    about: {
      az: "Alüminium korpus, üçlü kamera bloku və bütün gün davam edən batareya. Gündəlik iş, foto və video üçün üst seqment seçimdir.",
      ru: "Алюминиевый корпус, блок тройной камеры и батарея на весь день. Выбор верхнего сегмента для работы, фото и видео.",
    },
    specs: [
      spec("Yaddaş", "Память", "256 GB", "256 GB"),
      spec("Ekran", "Экран", "6.3\" OLED 120 Hz", "6.3\" OLED 120 Гц"),
      spec("Rəng", "Цвет", "Silver", "Silver"),
      spec("Zəmanət", "Гарантия", "12 ay", "12 месяцев"),
    ],
  },
  {
    id: "p2",
    slug: "samsung-galaxy-s26-ultra",
    category: "smartfonlar",
    brand: "Samsung",
    price: 3119.99,
    oldPrice: 3499.99,
    months: 12,
    rating: 5,
    reviews: 11,
    code: "227385",
    visual: "phone",
    tone: "#5b4b8a",
    bestseller: true,
    name: {
      az: "Smartfon Samsung Galaxy S26 Ultra 12GB/256GB Cobalt Violet",
      ru: "Смартфон Samsung Galaxy S26 Ultra 12GB/256GB Cobalt Violet",
    },
    about: {
      az: "Böyük ekran, S Pen dəstəyi və güclü gecə çəkilişi. Qeydlər və məzmun yaradanlar üçün rahatdır.",
      ru: "Большой экран, поддержка S Pen и сильная ночная съёмка. Удобен для заметок и контента.",
    },
    specs: [
      spec("Yaddaş", "Память", "12/256 GB", "12/256 GB"),
      spec("Ekran", "Экран", "6.9\" Dynamic AMOLED", "6.9\" Dynamic AMOLED"),
      spec("Rəng", "Цвет", "Cobalt Violet", "Cobalt Violet"),
      spec("Zəmanət", "Гарантия", "12 ay", "12 месяцев"),
    ],
  },
  {
    id: "p3",
    slug: "samsung-galaxy-a57",
    category: "smartfonlar",
    brand: "Samsung",
    price: 1119.99,
    oldPrice: 1259.99,
    months: 12,
    rating: 4,
    reviews: 7,
    code: "227881",
    visual: "phone",
    tone: "#8d8f93",
    bestseller: true,
    name: { az: "Smartfon Samsung Galaxy A57 8GB/256GB Gray", ru: "Смартфон Samsung Galaxy A57 8GB/256GB Gray" },
    about: {
      az: "Gündəlik istifadə üçün balanslı smartfon: aydın ekran, geniş yaddaş və uzun yeniləmə dəstəyi.",
      ru: "Сбалансированный смартфон на каждый день: ясный экран, большой объём памяти и долгая поддержка.",
    },
    specs: [
      spec("Yaddaş", "Память", "8/256 GB", "8/256 GB"),
      spec("Ekran", "Экран", "6.7\" Super AMOLED", "6.7\" Super AMOLED"),
      spec("Rəng", "Цвет", "Gray", "Gray"),
      spec("Zəmanət", "Гарантия", "12 ay", "12 месяцев"),
    ],
  },
  {
    id: "p4",
    slug: "iphone-17-pro-max-512",
    category: "smartfonlar",
    brand: "Apple",
    price: 3999.99,
    oldPrice: 4499.99,
    months: 12,
    rating: 5,
    reviews: 9,
    code: "222762",
    visual: "phone",
    tone: "#e07a3d",
    bestseller: true,
    name: {
      az: "Smartfon Apple iPhone 17 Pro Max 512GB Cosmic Orange",
      ru: "Смартфон Apple iPhone 17 Pro Max 512GB Cosmic Orange",
    },
    about: {
      az: "Ən böyük ekran və 512 GB yaddaş. Video, səyahət və peşəkar çəkiliş üçün ehtiyatla seçilir.",
      ru: "Самый большой экран и 512 ГБ памяти. Запас для видео, поездок и профессиональной съёмки.",
    },
    specs: [
      spec("Yaddaş", "Память", "512 GB", "512 GB"),
      spec("Ekran", "Экран", "6.9\" OLED 120 Hz", "6.9\" OLED 120 Гц"),
      spec("Rəng", "Цвет", "Cosmic Orange", "Cosmic Orange"),
      spec("Zəmanət", "Гарантия", "12 ay", "12 месяцев"),
    ],
  },
  {
    id: "p5",
    slug: "xiaomi-redmi-17",
    category: "smartfonlar",
    brand: "Xiaomi",
    price: 559.99,
    oldPrice: 649.99,
    months: 12,
    rating: 4,
    reviews: 14,
    code: "234698",
    visual: "phone",
    tone: "#1c1c1c",
    name: { az: "Smartfon Xiaomi Redmi 17 8GB/256GB Black", ru: "Смартфон Xiaomi Redmi 17 8GB/256GB Black" },
    about: {
      az: "Sürətli şarj və geniş yaddaşla büdcəyə uyğun gündəlik telefon.",
      ru: "Повседневный телефон с быстрой зарядкой и большим объёмом памяти.",
    },
    specs: [
      spec("Yaddaş", "Память", "8/256 GB", "8/256 GB"),
      spec("Ekran", "Экран", "6.7\" 120 Hz", "6.7\" 120 Гц"),
      spec("Rəng", "Цвет", "Black", "Black"),
      spec("Zəmanət", "Гарантия", "12 ay", "12 месяцев"),
    ],
  },
  {
    id: "p6",
    slug: "asus-tuf-gaming",
    category: "notbuklar",
    brand: "ASUS",
    price: 2899.99,
    oldPrice: 3499.99,
    months: 12,
    rating: 5,
    reviews: 6,
    code: "232043",
    visual: "laptop",
    tone: "#2b2b2b",
    bestseller: true,
    name: {
      az: "Notbuk ASUS TUF Gaming 16\" Ryzen 7 / 16GB / 1TB / RTX 5050",
      ru: "Ноутбук ASUS TUF Gaming 16\" Ryzen 7 / 16GB / 1TB / RTX 5050",
    },
    about: {
      az: "Oyun və montaj üçün soyutması güclü 16 düym notbuk. RTX qrafikası müasir oyunları açır.",
      ru: "16-дюймовый ноутбук с сильным охлаждением для игр и монтажа. Графика RTX тянет современные игры.",
    },
    specs: [
      spec("Prosessor", "Процессор", "Ryzen 7 260", "Ryzen 7 260"),
      spec("Yaddaş", "Память", "16 GB / 1 TB SSD", "16 GB / 1 TB SSD"),
      spec("Video", "Видео", "RTX 5050 8 GB", "RTX 5050 8 GB"),
      spec("Ekran", "Экран", "16\" 165 Hz", "16\" 165 Гц"),
    ],
  },
  {
    id: "p7",
    slug: "lenovo-ideapad-slim-3",
    category: "notbuklar",
    brand: "Lenovo",
    price: 1749.99,
    oldPrice: 2099.99,
    months: 12,
    rating: 4,
    reviews: 8,
    code: "223873",
    visual: "laptop",
    tone: "#6e737a",
    name: {
      az: "Notbuk Lenovo IdeaPad Slim 3 15.3\" i7 / 16GB / 512GB",
      ru: "Ноутбук Lenovo IdeaPad Slim 3 15.3\" i7 / 16GB / 512GB",
    },
    about: {
      az: "Təhsil və ofis üçün nazik korpus, IPS ekran və səssiz iş.",
      ru: "Тонкий корпус, IPS-экран и тихая работа для учёбы и офиса.",
    },
    specs: [
      spec("Prosessor", "Процессор", "Intel Core i7-13620H", "Intel Core i7-13620H"),
      spec("Yaddaş", "Память", "16 GB / 512 GB SSD", "16 GB / 512 GB SSD"),
      spec("Ekran", "Экран", "15.3\" WUXGA IPS", "15.3\" WUXGA IPS"),
      spec("Sistem", "Система", "FreeDOS", "FreeDOS"),
    ],
  },
  {
    id: "p8",
    slug: "macbook-air-13",
    category: "notbuklar",
    brand: "Apple",
    price: 3249.99,
    oldPrice: 3899.99,
    months: 12,
    rating: 5,
    reviews: 15,
    code: "235551",
    visual: "laptop",
    tone: "#e8e6e1",
    bestseller: true,
    name: { az: "Notbuk Apple MacBook Air 13\" M5 16GB/512GB Silver", ru: "Ноутбук Apple MacBook Air 13\" M5 16GB/512GB Silver" },
    about: {
      az: "Yüngül gövdə və uzun batareya. Mətn, dizayn və səyahət üçün sakit notbuk.",
      ru: "Лёгкий корпус и долгая батарея. Тихий ноутбук для текста, дизайна и поездок.",
    },
    specs: [
      spec("Çip", "Чип", "Apple M5", "Apple M5"),
      spec("Yaddaş", "Память", "16 GB / 512 GB", "16 GB / 512 GB"),
      spec("Ekran", "Экран", "13.6\" Liquid Retina", "13.6\" Liquid Retina"),
      spec("Çəki", "Вес", "1.24 kq", "1.24 кг"),
    ],
  },
  {
    id: "p9",
    slug: "ipad-air-11-m4",
    category: "plansetler",
    brand: "Apple",
    price: 2159.99,
    oldPrice: 2259.99,
    months: 12,
    rating: 5,
    reviews: 5,
    code: "235520",
    visual: "tablet",
    tone: "#4a4e57",
    name: { az: "Planşet Apple iPad Air 11\" M4 128GB Wi-Fi Space Gray", ru: "Планшет Apple iPad Air 11\" M4 128GB Wi-Fi Space Gray" },
    about: {
      az: "Dərs, qeyd və yüngül dizayn üçün nazik planşet. Apple Pencil ilə uyğundur.",
      ru: "Тонкий планшет для учёбы, заметок и лёгкого дизайна. Совместим с Apple Pencil.",
    },
    specs: [
      spec("Yaddaş", "Память", "128 GB", "128 GB"),
      spec("Ekran", "Экран", "11\" Liquid Retina", "11\" Liquid Retina"),
      spec("Bağlantı", "Связь", "Wi-Fi", "Wi-Fi"),
      spec("Rəng", "Цвет", "Space Gray", "Space Gray"),
    ],
  },
  {
    id: "p10",
    slug: "honor-pad-x7",
    category: "plansetler",
    brand: "HONOR",
    price: 259.99,
    oldPrice: 279.99,
    months: 12,
    rating: 4,
    reviews: 4,
    code: "231363",
    visual: "tablet",
    tone: "#3a3d44",
    bestseller: true,
    name: { az: "Planşet HONOR Pad X7 4GB/64GB Wi-Fi Space Gray", ru: "Планшет HONOR Pad X7 4GB/64GB Wi-Fi Space Gray" },
    about: {
      az: "Uşaq dərsi və video üçün sərfəli planşet. Yüngüldür və bir əllə tutulur.",
      ru: "Доступный планшет для уроков и видео. Лёгкий, удобно держать одной рукой.",
    },
    specs: [
      spec("Yaddaş", "Память", "4/64 GB", "4/64 GB"),
      spec("Ekran", "Экран", "11\" IPS", "11\" IPS"),
      spec("Bağlantı", "Связь", "Wi-Fi", "Wi-Fi"),
      spec("Rəng", "Цвет", "Space Gray", "Space Gray"),
    ],
  },
  {
    id: "p11",
    slug: "lenovo-idea-tab",
    category: "plansetler",
    brand: "Lenovo",
    price: 729.99,
    oldPrice: 829.99,
    months: 12,
    rating: 4,
    reviews: 3,
    code: "222782",
    visual: "tablet",
    tone: "#9aa0a6",
    bestseller: true,
    name: { az: "Planşet Lenovo Idea Tab 8GB/256GB Grey + qələm", ru: "Планшет Lenovo Idea Tab 8GB/256GB Grey + стилус" },
    about: {
      az: "Dəstə daxil qələm ilə qeyd və eskiz üçün hazır planşet.",
      ru: "Планшет со стилусом в комплекте для заметок и эскизов.",
    },
    specs: [
      spec("Yaddaş", "Память", "8/256 GB", "8/256 GB"),
      spec("Ekran", "Экран", "11\" 90 Hz", "11\" 90 Гц"),
      spec("Dəst", "Комплект", "Qələm daxildir", "Стилус в комплекте"),
      spec("Rəng", "Цвет", "Grey", "Grey"),
    ],
  },
  {
    id: "p12",
    slug: "airpods-4-anc",
    category: "qulaqliqlar",
    brand: "Apple",
    price: 499.99,
    oldPrice: 559.99,
    months: 12,
    rating: 5,
    reviews: 22,
    code: "212473",
    visual: "earbuds",
    tone: "#f2f2f2",
    bestseller: true,
    name: { az: "Simsiz qulaqlıq Apple AirPods 4 ANC", ru: "Беспроводные наушники Apple AirPods 4 ANC" },
    about: {
      az: "Aktiv səs-küy azaltma və rahat oturuş. Şəhərdə və zənglərdə təmiz səs verir.",
      ru: "Активное шумоподавление и удобная посадка. Чистый звук в городе и на звонках.",
    },
    specs: [
      spec("Növ", "Тип", "Qulaqdaxili, simsiz", "Вкладыши, беспроводные"),
      spec("Səs-küy", "Шум", "Aktiv azaltma", "Активное подавление"),
      spec("Korpus", "Кейс", "USB-C", "USB-C"),
      spec("Zəmanət", "Гарантия", "12 ay", "12 месяцев"),
    ],
  },
  {
    id: "p13",
    slug: "sony-wh-ch520",
    category: "qulaqliqlar",
    brand: "Sony",
    price: 89.99,
    oldPrice: 109.99,
    months: 12,
    rating: 4,
    reviews: 10,
    code: "192631",
    visual: "headphones",
    tone: "#2f6fed",
    name: { az: "Simsiz qulaqlıq Sony WH-CH520 Blue", ru: "Беспроводные наушники Sony WH-CH520 Blue" },
    about: {
      az: "Yüngül qulaqüstü model. Gün ərzində musiqi və dərs üçün batareyası uzun çəkir.",
      ru: "Лёгкая накладная модель. Батареи хватает на день музыки и учёбы.",
    },
    specs: [
      spec("Növ", "Тип", "Qulaqüstü, simsiz", "Накладные, беспроводные"),
      spec("Rəng", "Цвет", "Blue", "Blue"),
      spec("Bağlantı", "Связь", "Bluetooth", "Bluetooth"),
      spec("Zəmanət", "Гарантия", "12 ay", "12 месяцев"),
    ],
  },
  {
    id: "p14",
    slug: "apple-earpods-usbc",
    category: "qulaqliqlar",
    brand: "Apple",
    price: 59.99,
    oldPrice: 69.99,
    months: 12,
    rating: 4,
    reviews: 6,
    code: "217592",
    visual: "earbuds",
    tone: "#ffffff",
    bestseller: true,
    name: { az: "Qulaqlıq Apple EarPods USB-C", ru: "Наушники Apple EarPods USB-C" },
    about: {
      az: "Simli, yüngül və zəng üçün mikrofonlu. Ehtiyat qulaqlıq kimi əlverişlidir.",
      ru: "Проводные, лёгкие, с микрофоном для звонков. Удобны как запасная пара.",
    },
    specs: [
      spec("Növ", "Тип", "Simli", "Проводные"),
      spec("Giriş", "Разъём", "USB-C", "USB-C"),
      spec("Mikrofon", "Микрофон", "Var", "Есть"),
      spec("Rəng", "Цвет", "Ağ", "Белый"),
    ],
  },
  {
    id: "p15",
    slug: "tcl-qled-32",
    category: "tv-audio",
    brand: "TCL",
    price: 349.99,
    oldPrice: 439.99,
    months: 18,
    rating: 4,
    reviews: 5,
    code: "222825",
    visual: "tv",
    tone: "#111318",
    bestseller: true,
    name: { az: "Televizor TCL QLED 32S5K", ru: "Телевизор TCL QLED 32S5K" },
    about: {
      az: "Mətbəx və yataq otağı üçün yığcam QLED. Smart tətbiqlər və aydın rəng verir.",
      ru: "Компактный QLED для кухни и спальни. Смарт-приложения и чистые цвета.",
    },
    specs: [
      spec("Diaqonal", "Диагональ", "32\"", "32\""),
      spec("Panel", "Панель", "QLED", "QLED"),
      spec("Əməliyyat", "Система", "Google TV", "Google TV"),
      spec("Zəmanət", "Гарантия", "24 ay", "24 месяца"),
    ],
  },
  {
    id: "p16",
    slug: "yoshiro-tv-32",
    category: "tv-audio",
    brand: "Yoshiro",
    price: 249.99,
    oldPrice: 369.99,
    months: 12,
    rating: 4,
    reviews: 2,
    code: "222631",
    visual: "tv",
    tone: "#1a1c22",
    bestseller: true,
    name: { az: "Televizor Yoshiro YTV-32HAG770B", ru: "Телевизор Yoshiro YTV-32HAG770B" },
    about: {
      az: "Kiçik otaqlar üçün sərfəli smart televizor. HDMI və Wi-Fi ilə gəlir.",
      ru: "Доступный смарт-телевизор для небольшой комнаты. HDMI и Wi-Fi в комплекте.",
    },
    specs: [
      spec("Diaqonal", "Диагональ", "32\"", "32\""),
      spec("Panel", "Панель", "LED", "LED"),
      spec("Smart", "Смарт", "Var", "Есть"),
      spec("Zəmanət", "Гарантия", "24 ay", "24 месяца"),
    ],
  },
  {
    id: "p17",
    slug: "samsung-oled-55",
    category: "tv-audio",
    brand: "Samsung",
    price: 2499.99,
    oldPrice: 3799.99,
    months: 12,
    rating: 5,
    reviews: 4,
    code: "222611",
    visual: "tv",
    tone: "#0e0e10",
    name: { az: "Televizor Samsung OLED QE55S85FAEXRU", ru: "Телевизор Samsung OLED QE55S85FAEXRU" },
    about: {
      az: "Dərin qara rəng və kinoteatr səsi. Qonaq otağının əsas ekranı üçün nəzərdə tutulub.",
      ru: "Глубокий чёрный и киношный звук. Основной экран для гостиной.",
    },
    specs: [
      spec("Diaqonal", "Диагональ", "55\"", "55\""),
      spec("Panel", "Панель", "OLED", "OLED"),
      spec("Yenilənmə", "Частота", "120 Hz", "120 Гц"),
      spec("Zəmanət", "Гарантия", "24 ay", "24 месяца"),
    ],
  },
  {
    id: "p18",
    slug: "yoshiro-soyuducu",
    category: "soyuducular",
    brand: "Yoshiro",
    price: 379.99,
    oldPrice: 499.99,
    months: 18,
    rating: 4,
    reviews: 3,
    code: "202921",
    visual: "fridge",
    tone: "#f7f7f5",
    bestseller: true,
    name: { az: "Soyuducu Yoshiro YRF-T206DF55HW", ru: "Холодильник Yoshiro YRF-T206DF55HW" },
    about: {
      az: "Kiçik mətbəx üçün ikikameralı soyuducu. Səssiz işləyir və az yer tutur.",
      ru: "Двухкамерный холодильник для небольшой кухни. Работает тихо и занимает мало места.",
    },
    specs: [
      spec("Növ", "Тип", "İkikameralı", "Двухкамерный"),
      spec("Rəng", "Цвет", "Ağ", "Белый"),
      spec("Sinif", "Класс", "A+", "A+"),
      spec("Zəmanət", "Гарантия", "24 ay", "24 месяца"),
    ],
  },
  {
    id: "p19",
    slug: "samsung-soyuducu",
    category: "soyuducular",
    brand: "Samsung",
    price: 2549.99,
    oldPrice: 2999.99,
    months: 12,
    rating: 5,
    reviews: 6,
    code: "216246",
    visual: "fridge",
    tone: "#ece7df",
    name: { az: "Soyuducu Samsung RS70F65Q1TWR", ru: "Холодильник Samsung RS70F65Q1TWR" },
    about: {
      az: "Geniş ailə üçün yan-yana soyuducu. No Frost sistemi əriməni unutdurur.",
      ru: "Холодильник side-by-side для большой семьи. No Frost избавляет от разморозки.",
    },
    specs: [
      spec("Növ", "Тип", "Side-by-side", "Side-by-side"),
      spec("Sistem", "Система", "No Frost", "No Frost"),
      spec("Rəng", "Цвет", "Gümüşü", "Серебристый"),
      spec("Zəmanət", "Гарантия", "24 ay", "24 месяца"),
    ],
  },
  {
    id: "p20",
    slug: "bosch-paltaryuyan",
    category: "paltaryuyan-masinlar",
    brand: "Bosch",
    price: 2149.99,
    oldPrice: 3149.99,
    months: 12,
    rating: 5,
    reviews: 8,
    code: "202826",
    visual: "washer",
    tone: "#f4f4f4",
    name: { az: "Paltaryuyan maşın Bosch WGB256A0ME", ru: "Стиральная машина Bosch WGB256A0ME" },
    about: {
      az: "9 kq yükləmə və sakit sıxma. Ailə üçün həftəlik yuyulmanı bir dövrəyə yığır.",
      ru: "Загрузка 9 кг и тихий отжим. Недельная стирка семьи помещается в один цикл.",
    },
    specs: [
      spec("Yükləmə", "Загрузка", "9 kq", "9 кг"),
      spec("Sıxma", "Отжим", "1400 dövr", "1400 об/мин"),
      spec("Sinif", "Класс", "A", "A"),
      spec("Zəmanət", "Гарантия", "24 ay", "24 месяца"),
    ],
  },
  {
    id: "p21",
    slug: "samsung-tozsoran",
    category: "tozsoranlar",
    brand: "Samsung",
    price: 119.99,
    oldPrice: 189.99,
    months: 12,
    rating: 4,
    reviews: 9,
    code: "132868",
    visual: "vacuum",
    tone: "#c23b3b",
    bestseller: true,
    name: { az: "Tozsoran Samsung SC45", ru: "Пылесос Samsung SC45" },
    about: {
      az: "Klassik tozsoran, güclü soruma və yuyulan filtr. Xalça və döşəmə üçün uyğundur.",
      ru: "Классический пылесос с сильной тягой и моющимся фильтром. Для ковра и пола.",
    },
    specs: [
      spec("Növ", "Тип", "Klassik", "Классический"),
      spec("Güc", "Мощность", "2000 Vt", "2000 Вт"),
      spec("Filtr", "Фильтр", "Yuyulan", "Моющийся"),
      spec("Zəmanət", "Гарантия", "12 ay", "12 месяцев"),
    ],
  },
  {
    id: "p22",
    slug: "tefal-tozsoran",
    category: "tozsoranlar",
    brand: "Tefal",
    price: 139.99,
    oldPrice: 259.99,
    months: 12,
    rating: 4,
    reviews: 5,
    code: "222164",
    visual: "vacuum",
    tone: "#5c6670",
    bestseller: true,
    name: { az: "Tozsoran Tefal Swift Power Cyclonic", ru: "Пылесос Tefal Swift Power Cyclonic" },
    about: {
      az: "Siklon sistemi toz torbasız işləyir. Yüngül gövdə mənzili tez gəzməyə imkan verir.",
      ru: "Циклонная система без мешка. Лёгкий корпус быстро проходит квартиру.",
    },
    specs: [
      spec("Növ", "Тип", "Siklon", "Циклонный"),
      spec("Torba", "Мешок", "Yoxdur", "Нет"),
      spec("Çəki", "Вес", "4.2 kq", "4.2 кг"),
      spec("Zəmanət", "Гарантия", "24 ay", "24 месяца"),
    ],
  },
  {
    id: "p23",
    slug: "karcher-buxar",
    category: "buxarli-temizleyiciler",
    brand: "Karcher",
    price: 249.99,
    oldPrice: 349.99,
    months: 12,
    rating: 4,
    reviews: 4,
    code: "198199",
    visual: "vacuum",
    tone: "#f0c419",
    bestseller: true,
    name: { az: "Buxarlı təmizləyici Karcher KST 2", ru: "Пароочиститель Karcher KST 2" },
    about: {
      az: "Mətbəx və vanna üçün buxarla təmizlik. Kimyəvi vasitəsiz ləkələri götürür.",
      ru: "Паровая уборка кухни и ванной. Снимает пятна без агрессивной химии.",
    },
    specs: [
      spec("Növ", "Тип", "Buxarlı", "Паровой"),
      spec("Hazırlıq", "Нагрев", "3 dəq", "3 мин"),
      spec("Çən", "Бак", "1 litr", "1 литр"),
      spec("Zəmanət", "Гарантия", "24 ay", "24 месяца"),
    ],
  },
  {
    id: "p24",
    slug: "philips-oneblade",
    category: "uzqirxanlar",
    brand: "Philips",
    price: 159.99,
    oldPrice: 269.99,
    months: 18,
    rating: 5,
    reviews: 12,
    code: "216115",
    visual: "groom",
    tone: "#1f6b4a",
    bestseller: true,
    name: { az: "Trimmer Philips OneBlade Pro 360", ru: "Триммер Philips OneBlade Pro 360" },
    about: {
      az: "Saqqal və kontur üçün elastik bıçaq. Yaş və quru istifadə olunur.",
      ru: "Гибкое лезвие для бороды и контура. Можно использовать на сухую и на влажную кожу.",
    },
    specs: [
      spec("Növ", "Тип", "Trimmer", "Триммер"),
      spec("İstifadə", "Использование", "Yaş və quru", "Влажное и сухое"),
      spec("Başlıq", "Насадки", "3 ədəd", "3 шт."),
      spec("Zəmanət", "Гарантия", "24 ay", "24 месяца"),
    ],
  },
  {
    id: "p25",
    slug: "tefal-qazan-desti",
    category: "metbex",
    brand: "Tefal",
    price: 239.99,
    oldPrice: 399.99,
    months: 12,
    rating: 5,
    reviews: 7,
    code: "180706",
    visual: "cook",
    tone: "#c45c26",
    bestseller: true,
    name: {
      az: "Tava və qazan dəsti Tefal Ingenio 12 parça",
      ru: "Набор сковород и кастрюль Tefal Ingenio, 12 предметов",
    },
    about: {
      az: "Çıxarılan qulp sayəsində dəst az yer tutur. Titan örtük yapışmanı azaldır.",
      ru: "Съёмная ручка экономит место. Титановое покрытие меньше прилипает.",
    },
    specs: [
      spec("Parça", "Предметы", "12", "12"),
      spec("Örtük", "Покрытие", "Titanium", "Titanium"),
      spec("Qulp", "Ручка", "Çıxarılan", "Съёмная"),
      spec("Plitə", "Плита", "İnduksiya daxil", "Включая индукцию"),
    ],
  },
  {
    id: "p26",
    slug: "delonghi-ec9255",
    category: "qehve-demleyenler",
    brand: "DeLonghi",
    price: 1249.99,
    oldPrice: 1499.99,
    months: 12,
    rating: 5,
    reviews: 3,
    code: "234605",
    visual: "cook",
    tone: "#222222",
    name: { az: "Qəhvə maşını DeLonghi EC9255.T", ru: "Кофемашина DeLonghi EC9255.T" },
    about: {
      az: "Espresso və süd köpüyü üçün avtomat qəhvə maşını. Səhər qəhvəsini bir düymə ilə hazırlayır.",
      ru: "Автоматическая кофемашина для эспрессо и молочной пены. Утренняя чашка — одной кнопкой.",
    },
    specs: [
      spec("Növ", "Тип", "Avtomat espresso", "Автоматическая"),
      spec("Model", "Модель", "EC9255.T", "EC9255.T"),
      spec("Süd", "Молоко", "Kapuçino", "Капучино"),
      spec("Zəmanət", "Гарантия", "24 ay", "24 месяца"),
    ],
  },
  {
    id: "p27",
    slug: "xiaomi-robot-6",
    category: "robot-tozsoran",
    brand: "Xiaomi",
    price: 1499.99,
    oldPrice: 2099.99,
    months: 18,
    rating: 5,
    reviews: 6,
    code: "235324",
    visual: "robot",
    tone: "#f3f1ec",
    name: { az: "Robot tozsoran Xiaomi 6 White", ru: "Робот-пылесос Xiaomi 6 White" },
    about: {
      az: "Ağ korpuslu robot tozsoran. Xəritə qurur və mənzilin döşəməsini özü təmizləyir.",
      ru: "Белый робот-пылесос. Строит карту и сам убирает пол в квартире.",
    },
    specs: [
      spec("Növ", "Тип", "Robot + stansiya", "Робот + станция"),
      spec("Yuma", "Мытьё", "Var", "Есть"),
      spec("Naviqasiya", "Навигация", "LiDAR", "LiDAR"),
      spec("Zəmanət", "Гарантия", "24 ay", "24 месяца"),
    ],
  },
  {
    id: "p28",
    slug: "dreame-x60-pro-master",
    category: "robot-tozsoran",
    brand: "Dreame",
    price: 4099.99,
    oldPrice: 4699.99,
    months: 18,
    rating: 5,
    reviews: 4,
    code: "236051",
    visual: "robot",
    tone: "#ececec",
    name: { az: "Robot tozsoran Dreame X60 Pro Master", ru: "Робот-пылесос Dreame X60 Pro Master" },
    about: {
      az: "Yuma və özünü boşaltma stansiyası olan üst model. Böyük ev üçün nəzərdə tutulub.",
      ru: "Флагман со станцией мойки и самоочистки. Рассчитан на большой дом.",
    },
    specs: [
      spec("Növ", "Тип", "Robot", "Робот"),
      spec("Baza", "База", "Özünü boşaldan", "Самоочистка"),
      spec("Sahə", "Площадь", "120 m²", "120 м²"),
      spec("Zəmanət", "Гарантия", "24 ay", "24 месяца"),
    ],
  },
  {
    id: "p29",
    slug: "apple-watch-series",
    category: "smart-saatlar",
    brand: "Apple",
    price: 1049.99,
    oldPrice: 1299.99,
    months: 12,
    rating: 5,
    reviews: 9,
    code: "213534",
    visual: "watch",
    tone: "#e10600",
    name: { az: "Smart saat Apple Watch Series 10 GPS 46mm Silver", ru: "Смарт-часы Apple Watch Series 10 GPS 46mm Silver" },
    about: {
      az: "Ürək ritmi, məşq və bildirişlər biləkdə. Alüminium korpus gündəlik istifadə üçündür.",
      ru: "Пульс, тренировки и уведомления на запястье. Алюминиевый корпус для каждого дня.",
    },
    specs: [
      spec("Ölçü", "Размер", "46 mm", "46 мм"),
      spec("Korpus", "Корпус", "Alüminium", "Алюминий"),
      spec("Su", "Вода", "50 m", "50 м"),
      spec("Zəmanət", "Гарантия", "12 ay", "12 месяцев"),
    ],
  },
  {
    id: "p30",
    slug: "iphone-17-pro-256-cosmic-orange",
    category: "smartfonlar",
    brand: "Apple",
    price: 3099.99,
    oldPrice: 3599.99,
    months: 12,
    rating: 5,
    reviews: 8,
    code: "222750",
    visual: "phone",
    tone: "#e07a3d",
    bestseller: true,
    name: { az: "Smartfon Apple iPhone 17 Pro 256GB Cosmic Orange", ru: "Смартфон Apple iPhone 17 Pro 256GB Cosmic Orange" },
    about: { az: "Narıncı alüminium korpus və üçlü kamera platosu. Rəngi satış şəklindəki Cosmic Orange modelinə uyğundur.", ru: "Оранжевый алюминиевый корпус и плато тройной камеры. Цвет совпадает с витринным Cosmic Orange." },
    specs: [spec("Yaddaş", "Память", "256 GB", "256 GB"), spec("Ekran", "Экран", "6.3\" OLED", "6.3\" OLED"), spec("Rəng", "Цвет", "Cosmic Orange", "Cosmic Orange"), spec("Zəmanət", "Гарантия", "12 ay", "12 месяцев")],
  },
  {
    id: "p38",
    slug: "iphone-17-pro-256-deep-blue",
    category: "smartfonlar",
    brand: "Apple",
    price: 3099.99,
    oldPrice: 3599.99,
    months: 12,
    rating: 5,
    reviews: 6,
    code: "222751",
    visual: "phone",
    tone: "#243044",
    bestseller: true,
    name: { az: "Smartfon Apple iPhone 17 Pro 256GB Deep Blue", ru: "Смартфон Apple iPhone 17 Pro 256GB Deep Blue" },
    about: { az: "Tünd göy korpus. Kamera bloku 17 Pro formasındadır: üç linza bir platoda.", ru: "Тёмно-синий корпус. Блок камеры в форме 17 Pro: три объектива на одном плато." },
    specs: [spec("Yaddaş", "Память", "256 GB", "256 GB"), spec("Ekran", "Экран", "6.3\" OLED", "6.3\" OLED"), spec("Rəng", "Цвет", "Deep Blue", "Deep Blue"), spec("Zəmanət", "Гарантия", "12 ay", "12 месяцев")],
  },
  {
    id: "p31",
    slug: "iphone-16-pro-256-natural-titanium",
    category: "smartfonlar",
    brand: "Apple",
    price: 3199.99,
    oldPrice: 3199.99,
    months: 6,
    rating: 5,
    reviews: 21,
    code: "212620",
    visual: "phone",
    tone: "#d7d2cb",
    bestseller: true,
    name: { az: "Smartfon Apple iPhone 16 Pro 256GB Natural Titanium", ru: "Смартфон Apple iPhone 16 Pro 256GB Natural Titanium" },
    about: { az: "Titan korpus və ayrıca üçlü kamera adası. 17 Pro-dan fərqli olaraq kamera bloku kənara qədər uzanmır.", ru: "Титановый корпус и отдельный остров тройной камеры. В отличие от 17 Pro блок камеры не доходит до края." },
    specs: [spec("Yaddaş", "Память", "256 GB", "256 GB"), spec("Korpus", "Корпус", "Natural Titanium", "Natural Titanium"), spec("Ekran", "Экран", "6.3\" OLED", "6.3\" OLED"), spec("Zəmanət", "Гарантия", "12 ay", "12 месяцев")],
  },
  {
    id: "p32",
    slug: "iphone-16-pro-256-desert-titanium",
    category: "smartfonlar",
    brand: "Apple",
    price: 3199.99,
    oldPrice: 3199.99,
    months: 6,
    rating: 5,
    reviews: 14,
    code: "212619",
    visual: "phone",
    tone: "#c4a574",
    name: { az: "Smartfon Apple iPhone 16 Pro 256GB Desert Titanium", ru: "Смартфон Apple iPhone 16 Pro 256GB Desert Titanium" },
    about: { az: "Səhra titan rəngi. Üç linza kvadrat kamera adasında yerləşir.", ru: "Пустынный титан. Три объектива в квадратном острове камеры." },
    specs: [spec("Yaddaş", "Память", "256 GB", "256 GB"), spec("Rəng", "Цвет", "Desert Titanium", "Desert Titanium"), spec("Ekran", "Экран", "6.3\" OLED", "6.3\" OLED"), spec("Zəmanət", "Гарантия", "12 ay", "12 месяцев")],
  },
  {
    id: "p33",
    slug: "iphone-16-pro-max-512-desert",
    category: "smartfonlar",
    brand: "Apple",
    price: 3799.99,
    oldPrice: 3899.99,
    months: 12,
    rating: 5,
    reviews: 9,
    code: "212635",
    visual: "phone",
    tone: "#c4a574",
    name: { az: "Smartfon Apple iPhone 16 Pro Max 512GB Desert Titanium", ru: "Смартфон Apple iPhone 16 Pro Max 512GB Desert Titanium" },
    about: { az: "Böyük ekranlı 16 Pro Max, səhra titan rəngində. 512 GB video və şəkil üçün ehtiyatdır.", ru: "Большой 16 Pro Max в цвете Desert Titanium. 512 ГБ — запас для видео и фото." },
    specs: [spec("Yaddaş", "Память", "512 GB", "512 GB"), spec("Ekran", "Экран", "6.9\" OLED", "6.9\" OLED"), spec("Rəng", "Цвет", "Desert Titanium", "Desert Titanium"), spec("Zəmanət", "Гарантия", "12 ay", "12 месяцев")],
  },
  {
    id: "p34",
    slug: "iphone-18-pro-256-burgundy",
    category: "smartfonlar",
    brand: "Apple",
    price: 3589.99,
    oldPrice: 3899.99,
    months: 6,
    rating: 5,
    reviews: 4,
    code: "235685",
    visual: "phone",
    tone: "#6b2433",
    bestseller: true,
    name: { az: "Smartfon Apple iPhone 18 Pro 256GB Burgundy", ru: "Смартфон Apple iPhone 18 Pro 256GB Burgundy" },
    about: { az: "Tünd albalı rəng. Kamera platosu bütün eni tutur: solda üç linza, sağda fləş.", ru: "Тёмно-вишнёвый цвет. Плато камеры на всю ширину: три объектива слева, вспышка справа." },
    specs: [spec("Yaddaş", "Память", "256 GB", "256 GB"), spec("Rəng", "Цвет", "Burgundy", "Burgundy"), spec("Ekran", "Экран", "6.3\" OLED", "6.3\" OLED"), spec("Zəmanət", "Гарантия", "12 ay", "12 месяцев")],
  },
  {
    id: "p35",
    slug: "iphone-18-pro-256-glacier",
    category: "smartfonlar",
    brand: "Apple",
    price: 3589.99,
    oldPrice: 3899.99,
    months: 12,
    rating: 5,
    reviews: 3,
    code: "235686",
    visual: "phone",
    tone: "#b7c6d4",
    bestseller: true,
    name: { az: "Smartfon Apple iPhone 18 Pro 256GB Glacier", ru: "Смартфон Apple iPhone 18 Pro 256GB Glacier" },
    about: { az: "Açıq buz mavi rəng. 18 Pro-nun tam enli kamera platosu ilə gəlir.", ru: "Светлый ледяной голубой. Полное по ширине плато камеры 18 Pro." },
    specs: [spec("Yaddaş", "Память", "256 GB", "256 GB"), spec("Rəng", "Цвет", "Glacier", "Glacier"), spec("Ekran", "Экран", "6.3\" OLED", "6.3\" OLED"), spec("Zəmanət", "Гарантия", "12 ay", "12 месяцев")],
  },
  {
    id: "p36",
    slug: "iphone-18-pro-256-silver",
    category: "smartfonlar",
    brand: "Apple",
    price: 3589.99,
    oldPrice: 3899.99,
    months: 6,
    rating: 5,
    reviews: 5,
    code: "235684",
    visual: "phone",
    tone: "#e6e6e8",
    name: { az: "Smartfon Apple iPhone 18 Pro 256GB Silver", ru: "Смартфон Apple iPhone 18 Pro 256GB Silver" },
    about: { az: "Gümüşü 18 Pro. Arxa şüşə və kamera platosu eyni rəngdədir.", ru: "Серебристый 18 Pro. Заднее стекло и плато камеры одного цвета." },
    specs: [spec("Yaddaş", "Память", "256 GB", "256 GB"), spec("Rəng", "Цвет", "Silver", "Silver"), spec("Ekran", "Экран", "6.3\" OLED", "6.3\" OLED"), spec("Zəmanət", "Гарантия", "12 ay", "12 месяцев")],
  },
  {
    id: "p37",
    slug: "iphone-18-pro-256-black",
    category: "smartfonlar",
    brand: "Apple",
    price: 3589.99,
    oldPrice: 3899.99,
    months: 6,
    rating: 5,
    reviews: 7,
    code: "235683",
    visual: "phone",
    tone: "#1a1a1a",
    name: { az: "Smartfon Apple iPhone 18 Pro 256GB Black", ru: "Смартфон Apple iPhone 18 Pro 256GB Black" },
    about: { az: "Qara 18 Pro. Tam enli kamera platosu və qara arxa panel.", ru: "Чёрный 18 Pro. Плато камеры на всю ширину и чёрная задняя панель." },
    specs: [spec("Yaddaş", "Память", "256 GB", "256 GB"), spec("Rəng", "Цвет", "Black", "Black"), spec("Ekran", "Экран", "6.3\" OLED", "6.3\" OLED"), spec("Zəmanət", "Гарантия", "12 ay", "12 месяцев")],
  },
  {
    id: "p49",
    slug: "iphone-18-pro-max-256-burgundy",
    category: "smartfonlar",
    brand: "Apple",
    price: 3879.99,
    oldPrice: 4199.99,
    months: 6,
    rating: 5,
    reviews: 2,
    code: "235701",
    visual: "phone",
    tone: "#6b2433",
    name: { az: "Smartfon Apple iPhone 18 Pro Max 256GB Burgundy", ru: "Смартфон Apple iPhone 18 Pro Max 256GB Burgundy" },
    about: { az: "Ən böyük 18 Pro Max, tünd albalı rəngdə. Eyni tam enli kamera platosu.", ru: "Самый большой 18 Pro Max в тёмно-вишнёвом цвете. То же плато камеры на всю ширину." },
    specs: [spec("Yaddaş", "Память", "256 GB", "256 GB"), spec("Ekran", "Экран", "6.9\" OLED", "6.9\" OLED"), spec("Rəng", "Цвет", "Burgundy", "Burgundy"), spec("Zəmanət", "Гарантия", "12 ay", "12 месяцев")],
  },
  {
    id: "p47",
    slug: "samsung-galaxy-s26-plus",
    category: "smartfonlar",
    brand: "Samsung",
    price: 2429.99,
    oldPrice: 2749.99,
    months: 12,
    rating: 5,
    reviews: 6,
    code: "227382",
    visual: "phone",
    tone: "#f4f4f6",
    name: { az: "Smartfon Samsung Galaxy S26 Plus 12GB/256GB White", ru: "Смартфон Samsung Galaxy S26 Plus 12GB/256GB White" },
    about: { az: "Ağ S26 Plus. Şaquli üçlü kamera və deşikli ekran.", ru: "Белый S26 Plus. Вертикальная тройная камера и экран с отверстием." },
    specs: [spec("Yaddaş", "Память", "12/256 GB", "12/256 GB"), spec("Rəng", "Цвет", "White", "White"), spec("Ekran", "Экран", "6.7\" AMOLED", "6.7\" AMOLED"), spec("Zəmanət", "Гарантия", "12 ay", "12 месяцев")],
  },
  {
    id: "p48",
    slug: "samsung-galaxy-s25-ultra",
    category: "smartfonlar",
    brand: "Samsung",
    price: 3699.99,
    oldPrice: 3699.99,
    months: 6,
    rating: 5,
    reviews: 12,
    code: "215482",
    visual: "phone",
    tone: "#e8e4dc",
    name: { az: "Smartfon Samsung Galaxy S25 Ultra 12GB/1TB Titanium White", ru: "Смартфон Samsung Galaxy S25 Ultra 12GB/1TB Titanium White" },
    about: { az: "Düz künclü Ultra korpus və S Pen. Titan ağ rəng.", ru: "Плоские грани Ultra и S Pen. Титановый белый цвет." },
    specs: [spec("Yaddaş", "Память", "12 GB / 1 TB", "12 GB / 1 TB"), spec("Rəng", "Цвет", "Titanium White", "Titanium White"), spec("Qələm", "Стилус", "S Pen", "S Pen"), spec("Zəmanət", "Гарантия", "12 ay", "12 месяцев")],
  },
  {
    id: "p39",
    slug: "macbook-air-15-sky-blue",
    category: "notbuklar",
    brand: "Apple",
    price: 3739.99,
    oldPrice: 4499.99,
    months: 12,
    rating: 5,
    reviews: 4,
    code: "236053",
    visual: "laptop",
    tone: "#9ec3e0",
    name: { az: "Notbuk Apple MacBook Air 15\" M5 16GB/512GB Sky Blue", ru: "Ноутбук Apple MacBook Air 15\" M5 16GB/512GB Sky Blue" },
    about: { az: "Göy rəngli 15 düym Air. Böyük ekran və yüngül gövdə.", ru: "Голубой 15-дюймовый Air. Большой экран и лёгкий корпус." },
    specs: [spec("Çip", "Чип", "Apple M5", "Apple M5"), spec("Yaddaş", "Память", "16 GB / 512 GB", "16 GB / 512 GB"), spec("Ekran", "Экран", "15.3\"", "15.3\""), spec("Rəng", "Цвет", "Sky Blue", "Sky Blue")],
  },
  {
    id: "p40",
    slug: "macbook-pro-14-space-black",
    category: "notbuklar",
    brand: "Apple",
    price: 5009.99,
    oldPrice: 5999.99,
    months: 6,
    rating: 5,
    reviews: 5,
    code: "223856",
    visual: "laptop",
    tone: "#2a2a2c",
    bestseller: true,
    name: { az: "Notbuk Apple MacBook Pro 14\" M5 16GB/1TB Space Black", ru: "Ноутбук Apple MacBook Pro 14\" M5 16GB/1TB Space Black" },
    about: { az: "Space Black Pro. Montaj və proqramlaşdırma üçün daha parlaq ekran.", ru: "Space Black Pro. Более яркий экран для монтажа и разработки." },
    specs: [spec("Çip", "Чип", "Apple M5", "Apple M5"), spec("Yaddaş", "Память", "16 GB / 1 TB", "16 GB / 1 TB"), spec("Ekran", "Экран", "14.2\" Liquid Retina XDR", "14.2\" Liquid Retina XDR"), spec("Rəng", "Цвет", "Space Black", "Space Black")],
  },
  {
    id: "p41",
    slug: "lenovo-loq-15",
    category: "notbuklar",
    brand: "Lenovo",
    price: 3699.99,
    oldPrice: 4499.99,
    months: 12,
    rating: 5,
    reviews: 3,
    code: "236054",
    visual: "laptop",
    tone: "#4a4e55",
    name: { az: "Notbuk Lenovo LOQ 15\" i7 / 16GB / 1TB / RTX 5060", ru: "Ноутбук Lenovo LOQ 15\" i7 / 16GB / 1TB / RTX 5060" },
    about: { az: "Oyun üçün Luna Grey LOQ. RTX 5060 qrafikası və 15.6 düym ekran.", ru: "Игровой LOQ цвета Luna Grey. Графика RTX 5060 и экран 15.6 дюйма." },
    specs: [spec("Prosessor", "Процессор", "Intel Core i7", "Intel Core i7"), spec("Video", "Видео", "RTX 5060 8 GB", "RTX 5060 8 GB"), spec("Yaddaş", "Память", "16 GB / 1 TB", "16 GB / 1 TB"), spec("Ekran", "Экран", "15.6\" FHD IPS", "15.6\" FHD IPS")],
  },
  {
    id: "p42",
    slug: "hp-15-fd0250",
    category: "notbuklar",
    brand: "HP",
    price: 1399.99,
    oldPrice: 1599.99,
    months: 12,
    rating: 4,
    reviews: 2,
    code: "236030",
    visual: "laptop",
    tone: "#d9dde3",
    name: { az: "Notbuk HP 15-fd0250wm i5 / 8GB / 512GB", ru: "Ноутбук HP 15-fd0250wm i5 / 8GB / 512GB" },
    about: { az: "Ofis və dərs üçün Windows 11 notbuku.", ru: "Ноутбук с Windows 11 для офиса и учёбы." },
    specs: [spec("Prosessor", "Процессор", "Intel Core i5-1334U", "Intel Core i5-1334U"), spec("Yaddaş", "Память", "8 GB / 512 GB", "8 GB / 512 GB"), spec("Ekran", "Экран", "15.6\" HD", "15.6\" HD"), spec("Sistem", "Система", "Windows 11", "Windows 11")],
  },
  {
    id: "p43",
    slug: "samsung-mikrodalga",
    category: "mikrodalgali-sobalar",
    brand: "Samsung",
    price: 259.99,
    oldPrice: 439.99,
    months: 12,
    rating: 4,
    reviews: 3,
    code: "203174",
    visual: "cook",
    tone: "#111111",
    name: { az: "Mikrodalğalı soba Samsung MG23DG4524AGBW", ru: "Микроволновая печь Samsung MG23DG4524AGBW" },
    about: { az: "Qızdırma və qril üçün tezgahüstü mikrodalğalı soba.", ru: "Настольная микроволновка с грилем." },
    specs: [spec("Növ", "Тип", "Mikrodalğalı + qril", "СВЧ + гриль"), spec("Rəng", "Цвет", "Qara", "Чёрный"), spec("Zəmanət", "Гарантия", "24 ay", "24 месяца"), spec("Yerləşmə", "Установка", "Sərbəst", "Отдельностоящая")],
  },
  {
    id: "p44",
    slug: "kondisioner-tcl-9000",
    category: "kondisionerler",
    brand: "TCL",
    price: 519.99,
    oldPrice: 749.99,
    months: 18,
    rating: 4,
    reviews: 2,
    code: "232630",
    visual: "fridge",
    tone: "#f7f7f7",
    name: { az: "Kondisioner TCL TAC-09CHSD 9000 BTU", ru: "Кондиционер TCL TAC-09CHSD 9000 BTU" },
    about: { az: "20–30 m² otaq üçün split kondisioner dəsti.", ru: "Сплит-система для комнаты 20–30 м²." },
    specs: [spec("Güc", "Мощность", "9000 BTU", "9000 BTU"), spec("Sahə", "Площадь", "20–30 m²", "20–30 м²"), spec("Dəst", "Комплект", "Daxili + xarici", "Внутренний + наружный"), spec("Zəmanət", "Гарантия", "36 ay", "36 месяцев")],
  },
  {
    id: "p45",
    slug: "blender-philips-hr2683",
    category: "blenderler",
    brand: "Philips",
    price: 229.99,
    oldPrice: 229.99,
    months: 12,
    rating: 4,
    reviews: 5,
    code: "236006",
    visual: "cook",
    tone: "#f2f2f2",
    name: { az: "Blender Philips HR2683 Series 5000", ru: "Блендер Philips HR2683 Series 5000" },
    about: { az: "Smoothie və sous üçün stolüstü blender.", ru: "Настольный блендер для смузи и соусов." },
    specs: [spec("Növ", "Тип", "Stolüstü blender", "Настольный блендер"), spec("Seriya", "Серия", "5000", "5000"), spec("Zəmanət", "Гарантия", "24 ay", "24 месяца"), spec("Rəng", "Цвет", "Ağ", "Белый")],
  },
  {
    id: "p46",
    slug: "utu-philips-dst5040",
    category: "utuler",
    brand: "Philips",
    price: 239.99,
    oldPrice: 239.99,
    months: 12,
    rating: 4,
    reviews: 4,
    code: "236002",
    visual: "groom",
    tone: "#2f5fbf",
    name: { az: "Buxarlı ütü Philips DST5040/86 Series 5000", ru: "Паровой утюг Philips DST5040/86 Series 5000" },
    about: { az: "Gündəlik ütüləmə üçün buxarlı ütü. Keramika altlıq sürüşür.", ru: "Паровой утюг на каждый день. Керамическая подошва скользит." },
    specs: [spec("Növ", "Тип", "Buxarlı ütü", "Паровой утюг"), spec("Seriya", "Серия", "5000", "5000"), spec("Zəmanət", "Гарантия", "24 ay", "24 месяца"), spec("Buxar", "Пар", "Var", "Есть")],
  },
  ...extraProducts,
];

type LiveCategory = { slug: string; group: string; name: string };
type LiveProduct = {
  id: string;
  slug: string;
  category: string;
  brand: string;
  price: number;
  oldPrice: number;
  months: number;
  rating: number;
  reviews: number;
  code: string;
  name: string;
  image: string;
};

const live = liveCatalog as { categories: LiveCategory[]; products: LiveProduct[] };

export const categories: Category[] = [
  ...baseCategories,
  ...live.categories
    .filter((item) => !baseCategories.some((base) => base.slug === item.slug))
    .map((item) => ({
      slug: item.slug,
      group: groups.some((group) => group.id === item.group) ? item.group : "more",
      name: { az: item.name, ru: item.name },
    })),
];

const knownCodes = new Set(curatedProducts.map((item) => item.code));

const liveProducts: Product[] = live.products
  .filter((item) => item.image && item.price > 0 && !knownCodes.has(String(item.code)))
  .map((item) => ({
    id: item.id,
    slug: item.slug,
    category: item.category,
    brand: item.brand,
    price: item.price,
    oldPrice: item.oldPrice,
    months: item.months || 12,
    rating: item.rating || 5,
    reviews: item.reviews || 0,
    code: String(item.code),
    visual: "cook",
    tone: "#ffffff",
    image: item.image,
    name: { az: item.name, ru: item.name },
    about: { az: item.name, ru: item.name },
    specs: [spec("Məhsul kodu", "Код товара", String(item.code), String(item.code))],
  }));

export const products: Product[] = [...curatedProducts, ...liveProducts];

type Override = { name?: string; price?: number; oldPrice?: number; hidden?: boolean };
const overrides = adminOverrides as Record<string, Override>;

export function publicProduct(product: Product): Product | null {
  const patch = overrides[product.id];
  if (patch?.hidden) return null;
  if (!patch) return product;
  const name = patch.name?.trim();
  return {
    ...product,
    price: typeof patch.price === "number" ? patch.price : product.price,
    oldPrice: typeof patch.oldPrice === "number" ? patch.oldPrice : product.oldPrice,
    name: name ? { az: name, ru: name } : product.name,
    about: name ? { az: name, ru: name } : product.about,
  };
}

export function getProduct(slug: string) {
  const found = products.find((item) => item.slug === slug);
  return found ? publicProduct(found) ?? undefined : undefined;
}

export function categoryBySlug(slug: string) {
  return categories.find((item) => item.slug === slug);
}

export function brands() {
  return [...new Set(products.map((item) => item.brand))].sort();
}

export function monthlyAmount(price: number, months: number, down = 0) {
  const base = Math.max(price - down, 0);
  return Math.round((base / months) * 100) / 100;
}

export type SortKey = "popular" | "price-asc" | "price-desc" | "discount";

export function filterProducts(options: {
  category?: string;
  brand?: string;
  query?: string;
  sort?: SortKey;
}) {
  const query = options.query?.trim().toLocaleLowerCase() ?? "";
  let list = products.flatMap((item) => {
    const next = publicProduct(item);
    return next ? [next] : [];
  }).filter((item) => {
    if (options.category && item.category !== options.category) return false;
    if (options.brand && item.brand !== options.brand) return false;
    if (!query) return true;
    const hay = `${item.name.az} ${item.name.ru} ${item.brand} ${item.code}`.toLocaleLowerCase();
    return hay.includes(query);
  });

  const discount = (item: Product) => item.oldPrice - item.price;
  if (options.sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
  else if (options.sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
  else if (options.sort === "discount") list = [...list].sort((a, b) => discount(b) - discount(a));
  else list = [...list].sort((a, b) => Number(b.bestseller) - Number(a.bestseller) || b.reviews - a.reviews);

  return list;
}

export function searchSuggestions(query: string, limit = 8) {
  const q = query.trim().toLocaleLowerCase("az");
  if (!q) return [];
  const starts: Product[] = [];
  const contains: Product[] = [];
  for (const item of products) {
    const az = item.name.az.toLocaleLowerCase("az");
    const ru = item.name.ru.toLocaleLowerCase("ru");
    const brand = item.brand.toLocaleLowerCase("az");
    const prefix = az.startsWith(q) || ru.startsWith(q) || brand.startsWith(q);
    const hit = prefix || az.includes(q) || ru.includes(q) || item.code.includes(q);
    if (!hit) continue;
    const next = publicProduct(item);
    if (!next) continue;
    if (prefix) {
      starts.push(next);
      if (starts.length >= limit) break;
    } else if (contains.length < limit) contains.push(next);
  }
  return [...starts, ...contains].slice(0, limit);
}
