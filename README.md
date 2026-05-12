Dinamik & Modern Haber Yönetim Sistemi
HaberDB, güncel haber içeriklerinin hızlı, güvenilir ve etkileşimli bir şekilde sunulmasını sağlayan 
tam kapsamlı (Full-Stack) bir haber portalı ve içerik yönetim sistemidir.

Modern web standartlarına uygun olarak geliştirilmiş bu proje; hem son kullanıcılar için akıcı bir okuma deneyimi sunan 
bir arayüze (Frontend) hem de içeriklerin, kategorilerin ve veritabanı işlemlerinin güvenle yönetildiği sağlam bir 
sunucu altyapısına (Backend) sahiptir.

İki Katmanlı (Full-Stack) Mimari: İstemci (Frontend) ve Sunucu (Backend) servislerinin birbirinden izole ve 
API tabanlı haberleştiği, ölçeklenebilir modern proje yapısı.

Gelişmiş İçerik Yönetimi: Haber ekleme, düzenleme, taslak olarak kaydetme ve yayınlama süreçleri için esnek veritabanı modeli.

VDS / Sunucu Optimizasyonu: Bağımsız sunucu ortamlarında (VDS) yüksek trafikli senaryolarda bile stabil çalışacak şekilde 
tasarlanmış altyapı hazırlığı.

Kullanılan Teknolojiler
Backend (Sunucu Katmanı): Node.js, Express.js (RESTful API mimarisi)

Frontend (Kullanıcı Arayüzü): React.js / Vue.js / HTML-CSS-JS 

Veritabanı: MongoDB

Diğer Araçlar: npm paket yöneticisi, Mongoose Güvenli kimlik doğrulama modülleri (Middleware)



Kurulum ve Çalıştırma
Projeyi yerel ortamında çalıştırmak için aşağıdaki adımları izleyebilirsin. Proje frontend ve backend olmak üzere iki ana dizinden oluşmaktadır.

1. Depoyu Klonlayın
-git clone https://github.com/KULLANICI_ADIN/Haberdb.git
-cd Haberdb

2. Backend (Sunucu) Kurulumu
-cd backend
-npm install
-npm run dev   # veya npm start
NOT: backend klasörünün içinde .env dosyası oluşturarak gerekli veritabanı bağlantı URI'si ve port bilgilerini girmeyi unutmayın.

3. Frontend (Arayüz) Kurulumu
-cd frontend
-npm install
-npm run dev veya npm start

Proje Yapısı:
Haberdb/
├── backend/               # Sunucu, veritabanı modelleri, API route'ları ve middleware'ler
│   ├── middleware/        # authMiddleware.js vb. güvenlik ve kontrol katmanları
│   ├── .env               # Çevresel değişkenler (Gizli tutulmalıdır)
│   ├── package.json       # Backend bağımlılıkları
│   └── server.js          # Ana sunucu başlangıç dosyası
└── frontend/              # Kullanıcı arayüzü, bileşenler ve statik dosyalar
    ├── node_modules/      
    ├── package.json       # Frontend bağımlılıkları
    └── src/               # Sayfalar, stiller ve uygulamanın ana kodları

Bu proje gelişim ve öğrenme amacıyla tasarlanmıştır.

