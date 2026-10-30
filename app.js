const places = [
  {
    name: "Udayagiri & Khandagiri",
    region: "Bhubaneswar area",
    category: "Heritage",
    symbol: "◈",
    art: "art-rock",
    description: "Rock-cut caves and inscriptions that offer a glimpse into ancient Kalinga history.",
    experience: "Ancient history",
    note: "Confirm current visitor access and local guidance before visiting."
  },
  {
    name: "Daringbadi",
    region: "Kandhamal district",
    category: "Nature",
    symbol: "♧",
    art: "art-forest",
    description: "A highland landscape known for green hills, forest surroundings and a cooler climate.",
    experience: "Hill country",
    note: "Check weather, road conditions and seasonal access in advance."
  },
  {
    name: "Ratnagiri Buddhist Site",
    region: "Jajpur district",
    category: "Heritage",
    symbol: "⌂",
    art: "art-temple",
    description: "Archaeological remains associated with Odisha’s rich Buddhist heritage.",
    experience: "Buddhist heritage",
    note: "Check official opening details and site rules before travelling."
  },
  {
    name: "Chilika Lagoon",
    region: "Coastal Odisha",
    category: "Nature",
    symbol: "≈",
    art: "art-water",
    description: "A vast brackish-water lagoon with rich birdlife and communities shaped by the water.",
    experience: "Wetlands & wildlife",
    note: "Use authorised boat operators and follow wildlife protection guidance."
  },
  {
    name: "Pipili Appliqué",
    region: "Puri district",
    category: "Culture",
    symbol: "✿",
    art: "art-craft",
    description: "A living craft tradition of colourful appliqué work, textiles and handmade decoration.",
    experience: "Craft & makers",
    note: "Ask permission before photographing artisans; buy directly when possible."
  },
  {
    name: "Deomali Hills",
    region: "Koraput district",
    category: "Nature",
    symbol: "⌁",
    art: "art-hill",
    description: "A celebrated highland destination with broad views and a strong connection to local landscapes.",
    experience: "Mountain views",
    note: "Plan transport and safety carefully; respect local guidance and natural areas."
  }
];

const grid = document.querySelector("#destinationGrid");
const searchInput = document.querySelector("#searchInput");
const emptyState = document.querySelector("#emptyState");
let activeFilter = "All";

function renderPlaces() {
  const query = searchInput.value.trim().toLowerCase();
  const filtered = places.filter(place => {
    const matchesFilter = activeFilter === "All" || place.category === activeFilter;
    const haystack = `${place.name} ${place.region} ${place.category} ${place.description} ${place.experience}`.toLowerCase();
    return matchesFilter && haystack.includes(query);
  });

  grid.innerHTML = filtered.map((place, index) => `
    <article class="place-card">
      <div class="place-art ${place.art}">
        <span class="symbol" aria-hidden="true">${place.symbol}</span>
        <span class="region">${place.region}</span>
      </div>
      <div class="place-info">
        <div class="place-topline"><span class="category-tag">${place.category}</span><span class="place-number">${String(index + 1).padStart(2, "0")} / 06</span></div>
        <h3>${place.name}</h3>
        <p>${place.description}</p>
        <div class="place-footer"><span>${place.experience}</span><button type="button" data-place="${place.name.replace(/"/g, "&quot;")}">Travel notes <span>↗</span></button></div>
      </div>
    </article>`).join("");

  emptyState.hidden = filtered.length !== 0;
}

document.querySelectorAll(".filter").forEach(button => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    document.querySelectorAll(".filter").forEach(item => item.classList.toggle("active", item === button));
    renderPlaces();
  });
});

searchInput.addEventListener("input", renderPlaces);

grid.addEventListener("click", event => {
  const button = event.target.closest("[data-place]");
  if (!button) return;
  const place = places.find(item => item.name === button.dataset.place);
  if (place) {
    window.alert(`${place.name}\n${place.region}\n\n${place.note}\n\nMo-Vistas demo: verified route, stay and food details will be added in a future version.`);
  }
});

const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".main-nav");
menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});
nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
}));

document.querySelector("#year").textContent = new Date().getFullYear();
renderPlaces();
