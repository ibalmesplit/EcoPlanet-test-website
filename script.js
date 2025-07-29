const map = L.map("map").setView([48.0196, 66.9237], 5);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "&copy; OpenStreetMap contributors",
}).addTo(map);

const greenIcon = L.icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

// Центры переработки с типами отходов для фильтрации
const centers = [
  // Алматы
  {
    coords: [43.2330, 76.9450],
    name: "Eco Recycling Алматы",
    description: "Plastic, Paper, Metal.",
    types: ["Plastic", "Paper", "Metal"],
  },
  {
    coords: [43.2500, 76.9200],
    name: "Green Point Алматы",
    description: "Plastic, Paper.",
    types: ["Plastic", "Paper"],
  },
  {
    coords: [43.2150, 76.9400],
    name: "Recycling Hub Алматы",
    description: "Metal, Paper.",
    types: ["Metal", "Paper"],
  },

  // Нур-Султан (Астана)
  {
    coords: [51.1605, 71.4704],
    name: "SmartRecycle Нур-Султан",
    description: "Plastic, Paper, Metal.",
    types: ["Plastic", "Paper", "Metal"],
  },
  {
    coords: [51.1500, 71.4600],
    name: "EcoPoint Нур-Султан",
    description: "Plastic, Paper.",
    types: ["Plastic", "Paper"],
  },
  {
    coords: [51.1700, 71.4800],
    name: "Recycle Center Нур-Султан",
    description: "Plastic, Paper.",
    types: ["Plastic", "Paper"],
  },

  // Шымкент
  {
    coords: [42.3417, 69.5901],
    name: "ЭкоЛайф Шымкент",
    description: "Paper, Plastic.",
    types: ["Plastic"],
  },
  {
    coords: [42.3300, 69.5800],
    name: "GreenWay Шымкент",
    description: "Plastic, Paper, Metal.",
    types: ["Plastic", "Paper", "Metal"],
  },

  // Караганда
  {
    coords: [49.8031, 73.1021],
    name: "ЭкоГород Караганда",
    description: "Цикл сортировки.",
    types: ["Plastic", "Paper", "Metal"],
  },
  {
    coords: [49.8100, 73.1100],
    name: "Recycle Karaganda",
    description: "Plastic and Metal.",
    types: ["Plastic", "Metal"],
  },

  // Актау
  {
    coords: [43.652, 51.1975],
    name: "EcoPoint Актау",
    description: "Plastic, Paper, Metal.",
    types: ["Plastic", "Metal"],
  },
  {
    coords: [43.6550, 51.2000],
    name: "GreenWay Актау",
    description: "Paper, Plastic.",
    types: ["Paper", "Plastic"],
  },

  // Актобе
  {
    coords: [50.2839, 57.167],
    name: "KazRecycle Актобе",
    description: "Сбор от бизнеса и граждан.",
    types: ["Paper", "Metal"],
  },
  {
    coords: [50.2800, 57.1600],
    name: "EcoHub Актобе",
    description: "Plastic, Paper.",
    types: ["Plastic", "Paper"],
  },

  // Костанай
  {
    coords: [53.2194, 63.6287],
    name: "Green Center Костанай",
    description: "Paper, Metal.",
    types: ["Paper", "Metal"],
  },
  {
    coords: [53.2200, 63.6300],
    name: "Recycle KZ Костанай",
    description: "Plastic, Metal.",
    types: ["Plastic", "Metal"],
  },

  // Павлодар
  {
    coords: [52.2912, 76.9455],
    name: "EcoPoint Павлодар",
    description: "Plastic, Metal.",
    types: ["Plastic", "Metal"],
  },
  {
    coords: [52.2900, 76.9400],
    name: "Recycle Pavlodar",
    description: "Paper, Plastic.",
    types: ["Paper", "Plastic"],
  },

  // Петропавловск
  {
    coords: [54.8753, 69.1617],
    name: "Green Planet Петропавловск",
    description: "Plastic, Paper, Metal.",
    types: ["Plastic", "Paper", "Metal"],
  },
  {
    coords: [54.8700, 69.1600],
    name: "Recycle Center Петропавловск",
    description: "Plastic, Metal.",
    types: ["Plastic", "Metal"],
  },

  // Усть-Каменогорск
  {
    coords: [49.9478, 82.6232],
    name: "Eco Recycling Усть-Каменогорск",
    description: "Plastic, Paper.",
    types: ["Plastic", "Paper"],
  },
  {
    coords: [49.9500, 82.6200],
    name: "Green Hub Усть-Каменогорск",
    description: "Plastic, Paper.",
    types: ["Plastic", "Paper"],
  },

  // Талдыкорган
  {
    coords: [45.0000, 78.4000],
    name: "EcoPoint Талдыкорган",
    description: "Plastic, Paper.",
    types: ["Plastic", "Paper"],
  },

  // Темиртау
  {
    coords: [49.7722, 72.9333],
    name: "Recycle Temirtau",
    description: "Plastic, Metal.",
    types: ["Plastic", "Metal"],
  },

  // Тараз
  {
    coords: [42.9000, 71.4000],
    name: "EcoCenter Тараз",
    description: "Plastic, Paper.",
    types: ["Plastic", "Paper"],
  },

  // Кызылорда
  {
    coords: [44.8500, 65.5000],
    name: "GreenWay Кызылорда",
    description: "Plastic, Paper, Metal.",
    types: ["Plastic", "Paper", "Metal"],
  },

  // Петропавловск (дополнительный)
  {
    coords: [54.8790, 69.1650],
    name: "Recycle Plus Петропавловск",
    description: "Plastic, Metal.",
    types: ["Plastic", "Metal"],
  },
];

let markers = [];

/**
 * Добавляет метки на карту с учётом фильтров по типам отходов
 * @param {string[]} filterTypes - массив активных типов для фильтрации
 */
function addMarkers(filterTypes) {
  // Удаляем предыдущие метки с карты
  markers.forEach((marker) => map.removeLayer(marker));
  markers = [];

  centers.forEach((center) => {
    // Если фильтр пустой или тип отходов совпадает с фильтром
    if (
      filterTypes.length === 0 ||
      center.types.some((type) => filterTypes.includes(type))
    ) {
      const marker = L.marker(center.coords, { icon: greenIcon })
        .addTo(map)
        .bindPopup(`<b>${center.name}</b><br>${center.description}`);

      markers.push(marker);
    }
  });
}

// Изначально показываем все метки с активными фильтрами
const filters = Array.from(document.querySelectorAll(".filter"));
let activeFilters = filters.filter((ch) => ch.checked).map((ch) => ch.value);

addMarkers(activeFilters);

// Обработчик изменения фильтров
filters.forEach((checkbox) => {
  checkbox.addEventListener("change", () => {
    activeFilters = filters.filter((ch) => ch.checked).map((ch) => ch.value);
    addMarkers(activeFilters);
  });
});

// Кнопка определения геолокации пользователя
const locateBtn = document.getElementById("locate-btn");
locateBtn.addEventListener("click", () => {
  if (!navigator.geolocation) {
    alert("Геолокация не поддерживается вашим браузером.");
    return;
  }

  locateBtn.disabled = true;
  locateBtn.textContent = "Определяем...";

  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const { latitude, longitude } = pos.coords;
      map.setView([latitude, longitude], 14);

      // Добавляем маркер для текущего местоположения пользователя
      const userMarker = L.circleMarker([latitude, longitude], {
        radius: 10,
        color: "#2f7a33",
        fillColor: "#3a9a43",
        fillOpacity: 0.7,
      }).addTo(map);

      userMarker.bindPopup("Вы здесь").openPopup();

      locateBtn.disabled = false;
      locateBtn.textContent = "📍 Мое местоположение";
    },
    () => {
      alert("Не удалось определить местоположение.");
      locateBtn.disabled = false;
      locateBtn.textContent = "📍 Мое местоположение";
    }
  );
});

const express = require('express');
const Stripe = require('stripe');
const app = express();
require('dotenv').config();

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

app.use(express.static('public'));
app.use(express.json());

app.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{
      price_data: {
        currency: 'usd',
        product_data: {
          name: 'EcoPlanet Donation',
        },
        unit_amount: req.body.amount * 100,
      },
      quantity: 1,
    }],
    mode: 'payment',
    success_url: 'https://yourdomain.kz/success',
    cancel_url: 'https://yourdomain.kz/cancel',
  });

  res.json({ id: session.id });
});