# 🦠 La Casa De Covid

Modern ve şık tasarımlı COVID-19 istatistik takip uygulaması. Dünya genelinde ve ülke bazında COVID-19 verilerini gerçek zamanlı olarak görüntüleyin.

![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-4.4.3-3178C6?style=flat-square&logo=typescript)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

## ✨ Özellikler

- 🌍 **Global İstatistikler** - Dünya geneli toplam vaka, ölüm, aktif vaka ve iyileşen sayıları
- 🔍 **Ülke Arama** - 200+ ülke arasında arama yapabilme (A-Z sıralı)
- 🏛️ **Bölge/Eyalet Verileri** - Seçilen ülkenin bölge/eyalet bazlı detaylı verileri
- 🏙️ **Şehir Verileri** - Varsa şehir bazlı COVID-19 istatistikleri
- 📊 **Gerçek Zamanlı Veri** - covid-api.com API'si ile güncel veriler
- 💾 **Akıllı Önbellekleme** - 24 saat localStorage cache ile hızlı yükleme
- 🎨 **Premium Tasarım** - Glassmorphism ve gradient efektleri ile modern UI

## 🛠️ Teknolojiler

| Teknoloji | Versiyon | Açıklama |
|-----------|----------|----------|
| React | 18.2.0 | UI Framework |
| TypeScript | 4.4.3 | Tip güvenliği |
| Axios | 0.21.4 | HTTP istekleri |
| React Router | 6.3.0 | Sayfa yönlendirme |

## 📁 Proje Yapısı

```
src/
├── components/
│   ├── ui/                      # UI Bileşenleri
│   │   ├── region-select.tsx    # Ülke arama select
│   │   ├── location-search-select.tsx # Bölge/Şehir arama
│   │   ├── button.tsx           # Button bileşeni
│   │   ├── card.tsx             # Card bileşeni
│   │   └── ...
│   ├── Header.tsx               # Uygulama header'ı
│   ├── Layout.tsx               # Ana layout
│   ├── CovidGlobal.tsx          # Global istatistik kartları
│   ├── CovidSummary.tsx         # Ülke özet listesi
│   └── SummaryCard.tsx          # Ülke özet kartı
├── services/
│   ├── region.services.ts       # Ülke listesi servisi (24s cache)
│   ├── summary.services.ts      # Global veriler servisi (24s cache)
│   └── country.services.ts      # Ülke detay servisi
├── types/
│   └── summary.type.ts          # TypeScript tipleri
├── pages/
│   └── Home.tsx                 # Ana sayfa
└── index.tsx                    # Uygulama girişi
```

## 🚀 Kurulum

```bash
# Repoyu klonlayın
git clone https://github.com/zzafergok/covidlist.git

# Proje dizinine gidin
cd covidlist

# Bağımlılıkları yükleyin
yarn install

# Geliştirme sunucusunu başlatın
yarn start
```

Uygulama [http://localhost:3000](http://localhost:3000) adresinde açılacaktır.

## 📜 Kullanılabilir Scriptler

| Script | Açıklama |
|--------|----------|
| `yarn start` | Geliştirme modunda uygulamayı başlatır |
| `yarn build` | Production build oluşturur |
| `yarn eject` | CRA yapılandırmasını dışa aktarır |

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
