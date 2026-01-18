# 🦠 La Casa De Covid

Modern, şık tasarımlı ve yüksek performanslı COVID-19 istatistik takip uygulaması. Dünya genelinde ve ülke bazında COVID-19 verilerini gerçek zamanlı olarak görüntüleyin.

![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Vite-6.0.0-646CFF?style=flat-square&logo=vite)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0.0-3178C6?style=flat-square&logo=typescript)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

## ✨ Özellikler

- 🌍 **Global İstatistikler** - Dünya geneli toplam vaka, ölüm, aktif vaka ve iyileşen sayıları
- 🔍 **Ülke Arama** - 200+ ülke arasında hızlı arama (A-Z sıralı)
- 🏛️ **Bölge/Eyalet Verileri** - Seçilen ülkenin bölge/eyalet bazlı detaylı verileri
- 🏙️ **Şehir Verileri** - Varsa şehir bazlı COVID-19 istatistikleri
- 📊 **Gerçek Zamanlı Veri** - covid-api.com API'si ile güncel veriler
- 💾 **Akıllı Önbellekleme** - 24 saat localStorage cache ile min. API isteği
- ⚡ **Yüksek Performans** - Vite tabanlı hızlı geliştirme ve build
- 🎨 **Premium Tasarım** - Glassmorphism, gradient efektler ve animasyonlar
- 🧩 **Atomic Design** - Atom, Molekül ve Organizma yapısına dayalı modüler mimari

## 🛠️ Teknolojiler

| Teknoloji | Açıklama |
|-----------|----------|
| **React 18** | UI Kütüphanesi |
| **Vite** | Build Tool & Dev Server |
| **TypeScript** | Tip Güvenliği |
| **Axios** | HTTP İstekleri |
| **Lucide React** | Modern İkon Seti |
| **CSS Modules** | Özelleştirilmiş Styling |

## 📁 Proje Yapısı (Atomic Design)

Proje, **Atomic Design** metodolojisine uygun olarak yeniden yapılandırılmıştır:

```
src/
├── components/
│   ├── home/                    # Home sayfası bileşenleri
│   │   ├── atoms/               # Temel yapı taşları (Badge, StatBox)
│   │   ├── molecules/           # Birleşik bileşenler (Card, DetailCard)
│   │   └── organisms/           # Karmaşık bölümler (Grid, FilterSection)
│   ├── ui/                      # Genel UI setleri
│   │   ├── region-select.tsx    # Ülke seçimi
│   │   ├── location-search-select.tsx # Bölge/Şehir arama
│   │   └── ...
│   ├── Layout.tsx               # Ana şablon
│   └── Header.tsx               # Üst bar
├── services/
│   ├── region.services.ts       # Bölge servisi
│   ├── summary.services.ts      # Özet servisi
│   └── country.services.ts      # Ülke detay servisi
├── types/                       # TypeScript tanımları
├── assets/                      # Stil ve görseller
└── pages/
    └── Home.tsx                 # Ana sayfa (Page Template)
```

# Repoyu klonlayın
git clone https://github.com/zzafergok/la-casa-de-covid.git

# Proje dizinine gidin
cd la-casa-de-covid

# Bağımlılıkları yükleyin
yarn install

# Geliştirme sunucusunu başlatın
yarn dev
```

Uygulama [http://localhost:5173](http://localhost:5173) adresinde açılacaktır.

## 📜 Kullanılabilir Scriptler

| Script | Açıklama |
|--------|----------|
| `yarn dev` | Vite geliştirme sunucusunu başlatır |
| `yarn build` | Production için optimize build alır |
| `yarn preview` | Build alınan projeyi önizler |

## 🌐 API

Uygulama [covid-api.com](https://covid-api.com) API'sini kullanmaktadır.

### Kullanılan Endpointler

| Endpoint | Açıklama | Cache |
|----------|----------|-------|
| `/reports/total` | Global toplam veriler | 24 saat |
| `/regions` | Ülke listesi | 24 saat |
| `/reports?iso=XXX` | Ülke detay verileri | Yok |

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/zzafergok">Zafer Gök</a>
</p>
