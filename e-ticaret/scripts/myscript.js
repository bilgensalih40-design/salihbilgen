// ==========================================
// KlimaParça - myscript.js
// Web Tasarımı ve İnternet Programlama Ödevi
// Hazırlayan: [Öğrenci Adı]
// ==========================================

// ==========================================
// SEPET VERİSİ KAYIT FONKSİYONLARI
// Sepeti localStorage içinde saklıyorum
// ==========================================
function getSepetVerisi() {
    var kayit = localStorage.getItem("klimaParcaSepet");
    if (kayit) {
        try {
            return JSON.parse(kayit);
        } catch (e) {
            localStorage.removeItem("klimaParcaSepet");
        }
    }
    var varsayilanSepet = {
        items: []
    };
    localStorage.setItem("klimaParcaSepet", JSON.stringify(varsayilanSepet));
    return varsayilanSepet;
}

function setSepetVerisi(sepet) {
    localStorage.setItem("klimaParcaSepet", JSON.stringify(sepet));
}

// ==========================================
// ÜRÜN BİLGİLERİ
// Ürün adı, fiyatı, resmi ve açıklamasını tutuyorum
// ==========================================
var urunBilgileri = {
    1: {
        name: "R22 Klima Gazı (13.6 kg)",
        price: 850,
        image: "../img/r22-gaz.jpg",
        description: "R22, eski tip split ve pencere tipi klimalarda kullanılan soğutucu akışkandır.",
        stock: "Mevcut",
        features: [
            "Net Ağırlık: 13.6 kg (30 lb)",
            "CAS No: 75-45-6",
            "Kimyasal Ad: Chlorodifluoromethane (CHClF2)",
            "Kullanım: Eski model split ve pencere klimaları",
            "Dolum: Yetkili servis tarafından yapılmalıdır"
        ]
    },
    2: {
        name: "R410A Klima Gazı",
        price: 620,
        image: "../img/r410a-gaz.jpg",
        description: "R410A, yeni tip inverter klimalarda kullanılan çevre dostu soğutucu gazdır.",
        stock: "Mevcut",
        features: [
            "Net Ağırlık: 12.5 kg",
            "CAS No: 354-33-6",
            "Kimyasal Ad: Pentafluoroethane (HFC-125)",
            "Kullanım: İnverter split klimalar",
            "Yüksek verimli soğutma sağlar"
        ]
    },
    3: {
        name: "Evrensel Klima Kumandası",
        price: 180,
        image: "../img/evrensel-kumanda.webp",
        description: "Tüm marka klima modelleriyle uyumlu, kolay kullanımlı evrensel kumanda.",
        stock: "Sınırlı",
        features: [
            "Uyumluluk: Çoklu marka ve model",
            "Uzaktan kumanda ekranı var",
            "Pil tipi: AAA",
            "Programlanabilir fonksiyonlar",
            "Kolay montaj ve kullanım"
        ]
    },
    4: {
        name: "İzolasyon Bandı (3'lü Paket)",
        price: 120,
        image: "../img/izolasyon-bant.webp",
        description: "Klima boru bağlantılarında kullanılan güçlü ve su geçirmez izolasyon bandı.",
        stock: "Mevcut",
        features: [
            "3'lü paket",
            "Suya dayanıklı yüzey",
            "Kolay kesilebilir yapı",
            "Isı yalıtımı sağlar",
            "Uzun ömürlü malzeme"
        ]
    },
    5: {
        name: "İç Ünite Fan Motoru (DC)",
        price: 320,
        image: "../img/fan-motoru.jpg",
        description: "Klima iç ünitesi için yüksek verimli DC fan motoru.",
        stock: "Mevcut",
        features: [
            "DC motor teknolojisi",
            "Düşük ses seviyesi",
            "Uzun ömürlü rulman",
            "Kolay montaj",
            "Yüksek hava akışı"
        ]
    }
};

function sepeteEkle(id) {
    var sepet = getSepetVerisi();
    var secilenUrun = urunBilgileri[id];
    if (!secilenUrun) {
        alert("Bu ürün sepete eklenemedi.");
        return;
    }

    var varolan = sepet.items.find(function(item) {
        return item.id === id;
    });

    if (varolan) {
        varolan.qty = varolan.qty + 1;
    } else {
        sepet.items.push({
            id: id,
            name: secilenUrun.name,
            qty: 1,
            price: secilenUrun.price
        });
    }

    setSepetVerisi(sepet);
    alert(secilenUrun.name + " sepete eklendi.");
}

function getQueryParam(name) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (decodeURIComponent(pair[0]) === name) {
            return decodeURIComponent(pair[1] || "");
        }
    }
    return null;
}

function urunDetayYukle() {
    var detayResim = document.getElementById("detay-urun-resmi");
    var detayAdi = document.getElementById("detay-urun-adi");
    var detayStok = document.getElementById("detay-stok-durum");
    var detayFiyat = document.getElementById("detay-fiyat-etiket");
    var detayAciklama = document.getElementById("detay-aciklama");
    var detayOzellikListesi = document.getElementById("detay-ozellik-listesi");
    var detaySepeteEkle = document.getElementById("detay-sepete-ekle");
    var urunBulunamadi = document.getElementById("urun-bulunamadi");

    if (!detayAdi || !detayFiyat || !detayAciklama) {
        return;
    }

    var id = parseInt(getQueryParam("id"), 10);
    var urun = urunBilgileri[id];
    if (!urun) {
        if (urunBulunamadi) {
            urunBulunamadi.innerHTML = "<strong>Ürün bulunamadı.</strong> Lütfen <a href=\"urunler.html\">ürünler sayfasına</a> dönün.";
        }
        return;
    }

    if (detayResim) {
        detayResim.src = urun.image;
        detayResim.alt = urun.name;
    }
    detayAdi.textContent = urun.name;
    if (detayStok) {
        detayStok.textContent = urun.stock;
    }
    detayFiyat.innerHTML = urun.price + " TL";
    detayAciklama.textContent = urun.description;

    if (detayOzellikListesi) {
        var ozellikHtml = "";
        urun.features.forEach(function(ozellik) {
            ozellikHtml += "<li>" + ozellik + "</li>";
        });
        detayOzellikListesi.innerHTML = ozellikHtml;
    }

    if (detaySepeteEkle) {
        detaySepeteEkle.onclick = function() {
            sepeteEkle(id);
            window.location.href = "sepet.html";
        };
    }
}

function iletisimFormuKur() {
    var gonderButon = document.querySelector(".iletisim-formu .buton-gonder");
    if (!gonderButon) {
        return;
    }

    gonderButon.addEventListener("click", function() {
        var adSoyad = document.getElementById("ad-soyad");
        var email = document.getElementById("email-input");
        var mesaj = document.getElementById("mesaj-input");

        if (!adSoyad.value.trim() || !email.value.trim() || !mesaj.value.trim()) {
            alert("Lütfen tüm alanları doldurunuz.");
            return;
        }

        alert("Mesajınız alındı. En kısa sürede sizinle iletişime geçeceğiz.");
        adSoyad.value = "";
        email.value = "";
        mesaj.value = "";
    });
}

var quizSorulari = [
    {
        question: "Klima parçası olarak gaz deposu hangi ürün tipidir?",
        answers: ["Elektrik parçası", "Soğutucu akışkan", "Güç kaynağı", "Filtre"],
        correctIndex: 1
    },
    {
        question: "Evrensel kumanda genellikle ne için kullanılır?",
        answers: ["Sadece televizyon için", "Klima markasına özel", "Farklı marka klimaları kontrol etmek için", "Sadece radyatör için"],
        correctIndex: 2
    },
    {
        question: "İzolasyon bandı klima montajında hangi amaçla kullanılır?",
        answers: ["Elektrik bağlantısını sağlamak", "Boru bağlantılarını bantlamak ve yalıtmak", "Kablo düzenlemek", "Sensör koruması"],
        correctIndex: 1
    }
];

var quizDurumu = {
    index: 0,
    score: 0,
    answered: false
};

function quizSoruYukle() {
    var soruMetni = document.getElementById("quiz-soru-metin");
    var secenekler = document.getElementById("quiz-secenekler");
    var sonucAlani = document.getElementById("quiz-sonuc");
    var ileriButon = document.getElementById("quiz-ileri-buton");

    if (!soruMetni || !secenekler || !ileriButon) {
        return;
    }

    var soru = quizSorulari[quizDurumu.index];
    soruMetni.textContent = "Soru " + (quizDurumu.index + 1) + ": " + soru.question;
    secenekler.innerHTML = "";
    sonucAlani.textContent = "";
    quizDurumu.answered = false;

    soru.answers.forEach(function(text, idx) {
        var button = document.createElement("button");
        button.textContent = text;
        button.type = "button";
        button.addEventListener("click", function() {
            if (quizDurumu.answered) {
                return;
            }
            quizDurumu.answered = true;
            var dogru = idx === soru.correctIndex;
            if (dogru) {
                quizDurumu.score += 1;
                button.classList.add("secenek-dogru");
                sonucAlani.textContent = "Doğru! Devam etmek için Sonraki butonuna basın.";
            } else {
                button.classList.add("secenek-yanlis");
                sonucAlani.textContent = "Yanlış cevap. Doğru cevap: " + soru.answers[soru.correctIndex] + ".";
            }
            var butonlar = secenekler.querySelectorAll("button");
            butonlar.forEach(function(btn, buttonIndex) {
                btn.disabled = true;
                if (buttonIndex === soru.correctIndex) {
                    btn.classList.add("secenek-dogru");
                }
            });
        });
        secenekler.appendChild(button);
    });

    if (quizDurumu.index === 0) {
        ileriButon.textContent = "Sonraki";
    }
}

function quizIlerle() {
    if (!quizDurumu.answered) {
        alert("Lütfen bir seçenek seçin.");
        return;
    }
    quizDurumu.index += 1;

    if (quizDurumu.index >= quizSorulari.length) {
        quizBitir();
        return;
    }
    quizSoruYukle();
}

function quizBitir() {
    var soruMetni = document.getElementById("quiz-soru-metin");
    var secenekler = document.getElementById("quiz-secenekler");
    var sonucAlani = document.getElementById("quiz-sonuc");
    var ileriButon = document.getElementById("quiz-ileri-buton");
    var tekrarButon = document.getElementById("quiz-tekrar-buton");

    if (!soruMetni || !secenekler || !sonucAlani || !ileriButon || !tekrarButon) {
        return;
    }

    soruMetni.textContent = "Quiz tamamlandı!";
    secenekler.innerHTML = "";
    sonucAlani.textContent = "Puanınız: " + quizDurumu.score + " / " + quizSorulari.length + ".\nSüreç boyunca JavaScript ile karar vererek sonuçlar hesaplandı.";
    ileriButon.classList.add("gizli");
    tekrarButon.classList.remove("gizli");
}

function quizTekrarla() {
    quizDurumu.index = 0;
    quizDurumu.score = 0;
    quizDurumu.answered = false;
    var ileriButon = document.getElementById("quiz-ileri-buton");
    var tekrarButon = document.getElementById("quiz-tekrar-buton");
    if (ileriButon && tekrarButon) {
        ileriButon.classList.remove("gizli");
        tekrarButon.classList.add("gizli");
        ileriButon.textContent = "Sonraki";
    }
    quizSoruYukle();
}

function quizBolumunuKur() {
    var ileriButon = document.getElementById("quiz-ileri-buton");
    var tekrarButon = document.getElementById("quiz-tekrar-buton");
    if (!ileriButon || !tekrarButon) {
        return;
    }
    ileriButon.addEventListener("click", function() {
        if (quizDurumu.index === 0 && !quizDurumu.answered && document.getElementById("quiz-secenekler").childElementCount === 0) {
            quizSoruYukle();
            return;
        }
        if (quizDurumu.index < quizSorulari.length) {
            quizIlerle();
        }
    });
    tekrarButon.addEventListener("click", quizTekrarla);
    quizSoruYukle();
}

function sepetUrunleriniYukle() {
    var sepetListesi = document.getElementById("sepet-urun-listesi");
    if (!sepetListesi) {
        return;
    }

    var sepet = getSepetVerisi();
    if (!sepet.items || sepet.items.length === 0) {
        sepetListesi.innerHTML = "<p>Sepetinizde ürün yok.</p>";
        toplamHesapla();
        return;
    }

    var html = "";
    sepet.items.forEach(function(item) {
        var satirToplam = item.price * item.qty;
        html +=
            '<div class="sepet-urun-satiri" id="urun-satir-' + item.id + '">' +
            '<span class="sepet-urun-adi">' + item.name + '</span>' +
            '<span class="sepet-adet-bilgisi">Adet: ' + item.qty + '</span>' +
            '<span class="sepet-satir-fiyat">Birim: ' + item.price + ' TL</span>' +
            '<span class="sepet-satir-toplam">Toplam: ' + satirToplam + ' TL</span>' +
            '<button class="buton-sil" onclick="urunSil(' + item.id + ')">Sil</button>' +
            '</div><hr>';
    });
    sepetListesi.innerHTML = html;
    toplamHesapla();
}

function toplamHesapla() {
    var sepet = getSepetVerisi();
    var toplamFiyat = 0;

    if (sepet.items) {
        sepet.items.forEach(function(item) {
            toplamFiyat += item.price * item.qty;
        });
    }

    var toplamAlani = document.getElementById("toplam-fiyat-alani");
    if (toplamAlani) {
        toplamAlani.innerHTML = "<strong>" + toplamFiyat + " TL</strong>";
    }

    var kargoMesajAlani = document.getElementById("kargo-bedava-yazisi");
    if (!kargoMesajAlani) {
        return;
    }

    if (toplamFiyat === 0) {
        kargoMesajAlani.innerText = "Sepetinizde ürün yok.";
        kargoMesajAlani.style.color = "#333333";
        return;
    }

    if (toplamFiyat >= 1000) {
        kargoMesajAlani.innerText = "Siparişiniz onaylandı. Teşekkürler.";
        kargoMesajAlani.style.color = "#007700";
    } else {
        kargoMesajAlani.innerText = "Kargo ücreti 29.90 TL olarak hesaplanır.";
        kargoMesajAlani.style.color = "#cc0000";
    }
}

function urunSil(id) {
    var sepet = getSepetVerisi();
    sepet.items = sepet.items.filter(function(item) {
        return item.id !== id;
    });
    setSepetVerisi(sepet);
    sepetUrunleriniYukle();
}

window.onload = function() {
    urunDetayYukle();
    iletisimFormuKur();
    if (document.getElementById("toplam-fiyat-alani")) {
        sepetUrunleriniYukle();
    }
    quizBolumunuKur();
};

function siparisTamamla() {
    toplamHesapla();
    var sepet = getSepetVerisi();
    var toplamFiyat = 0;
    if (sepet.items) {
        sepet.items.forEach(function(item) {
            toplamFiyat += item.price * item.qty;
        });
    }

    if (toplamFiyat > 0) {
        alert("Siparişiniz tamamlandı! Teşekkür ederiz.");
        setSepetVerisi({ items: [] });
        sepetUrunleriniYukle();
    } else {
        alert("Sepetinizde ürün yok. Lütfen önce ürün ekleyin.");
    }
}

