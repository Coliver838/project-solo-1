// --- ДАНІ ---
const games = [
  { id: 1, name: "Високосний калькулятор", category: "numerical" },
  { id: 2, name: "Вгадай число", category: "numerical" },
  { id: 3, name: "Камінь-Ножиці-Папір", category: "game" },
  { id: 4, name: "Калькулятор", category: "numerical" },
  { id: 5, name: "Калькулятор часу", category: "numerical" },
  { id: 6, name: "Google динозаврик", category: "game" },
  { id: 7, name: "Футбол", category: "game" },
  { id: 8, name: "Найбільше число", category: "numerical" },
  { id: 10, name: "Вчений", category: "acquaintance" },
];

const scientists = [
  { name: "Albert", surname: "Einstein", born: 1879, dead: 1955, id: 1 },
  { name: "Isaac", surname: "Newton", born: 1643, dead: 1727, id: 2 },
  { name: "Galileo", surname: "Galilei", born: 1564, dead: 1642, id: 3 },
  { name: "Marie", surname: "Curie", born: 1867, dead: 1934, id: 4 },
  { name: "Max", surname: "Planck", born: 1858, dead: 1947, id: 7 },
  { name: "Ada", surname: "Lovelace", born: 1815, dead: 1852, id: 9 },
];

// --- УПРАВЛІННЯ ТЕМОЮ ---
document.getElementById("theme-toggle").addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");
});

// --- МОДАЛЬНІ ВІКНА ---
function setupModal(modalId, openBtnId, closeBtnId) {
  const modal = document.getElementById(modalId);
  const openBtn = document.getElementById(openBtnId);
  const closeBtn = document.getElementById(closeBtnId);

  if (openBtn) openBtn.onclick = () => (modal.style.display = "block");
  closeBtn.onclick = () => (modal.style.display = "none");

  window.addEventListener("click", (e) => {
    if (e.target == modal) modal.style.display = "none";
  });
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") modal.style.display = "none";
  });
}

setupModal("welcome-modal", "open-welcome-modal", "close-welcome");
setupModal("subscribe-modal", null, "close-subscribe");
setupModal("game-overlay", null, "close-game");

// Збереження імені
document.getElementById("save-name").onclick = () => {
  const name = document.getElementById("user-name-input").value;
  document.getElementById("user-name-display").innerText = name || "Гість";
  document.getElementById("welcome-modal").style.display = "none";
};

// Підписка
document.getElementById("subscribe-form").onsubmit = (e) => {
  e.preventDefault();
  document.getElementById("subscribe-modal").style.display = "block";
};

// --- ГЕНЕРАЦІЯ КАРТОК ТА ФІЛЬТР ---
const container = document.getElementById("games-container");

function renderCards(filter = "all") {
  container.innerHTML = "";
  const filtered =
    filter === "all" ? games : games.filter((g) => g.category === filter);

  filtered.forEach((game) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `<h3>${game.name}</h3>`;
    card.onclick = () => openGame(game.id);
    container.appendChild(card);
  });
}

document.getElementById("category-filter").onclick = (e) => {
  if (e.target.dataset.category) renderCards(e.target.dataset.category);
};

renderCards();

// --- ЛОГІКА ІГОР ---
function openGame(id) {
  const zone = document.getElementById("game-interface");
  const overlay = document.getElementById("game-overlay");
  zone.innerHTML = "";
  overlay.style.display = "block";

  if (id === 1) {
    // Високосний
    zone.innerHTML = `<input type="number" id="year" placeholder="Рік"><button onclick="checkLeap()">Перевірити</button><p id="res"></p>`;
    window.checkLeap = () => {
      const y = document.getElementById("year").value;
      const isLeap = (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
      document.getElementById("res").innerText = isLeap
        ? "Високосний"
        : "Не високосний";
    };
  }

  if (id === 2) {
    // Вгадай число
    const compNum = Math.floor(Math.random() * 10) + 1;
    zone.innerHTML = `<h3>Вгадай від 1 до 10</h3><input type="number" id="guess"><button onclick="guessNum(${compNum})">Ок</button><p id="res"></p>`;
    window.guessNum = (comp) => {
      const user = parseInt(document.getElementById("guess").value);
      document.getElementById("res").innerText =
        user === comp
          ? `Вітаю ви вгадали число ${comp}`
          : `Ви програли, компютер загадав ${comp}`;
    };
  }

  if (id === 7) {
    // Футбол
    zone.innerHTML = `<h3>Клікни по полю</h3><div id="football-field"><div id="ball"></div></div>`;
    const field = document.getElementById("football-field");
    const ball = document.getElementById("ball");
    field.onclick = (e) => {
      let rect = field.getBoundingClientRect();
      let x = e.clientX - rect.left - ball.offsetWidth / 2;
      let y = e.clientY - rect.top - ball.offsetHeight / 2;

      if (x < 0) x = 0;
      if (y < 0) y = 0;
      if (x + ball.offsetWidth > rect.width) x = rect.width - ball.offsetWidth;
      if (y + ball.offsetHeight > rect.height)
        y = rect.height - ball.offsetHeight;

      ball.style.left = x + "px";
      ball.style.top = y + "px";
    };
  }

  if (id === 10) {
    // Вчені (Завдання з масивами)
    const born19 = scientists.filter((s) => s.born >= 1801 && s.born <= 1900);
    const totalLived = scientists.reduce(
      (acc, s) => acc + (s.dead - s.born),
      0,
    );
    const sortedAlpha = [...scientists].sort((a, b) =>
      a.surname.localeCompare(b.surname),
    );

    zone.innerHTML = `
            <p>Вчені 19ст: ${born19.map((s) => s.surname).join(", ")}</p>
            <p>Загальна кількість років: ${totalLived}</p>
            <p>Відсортовано: ${sortedAlpha.map((s) => s.surname).join(", ")}</p>
        `;
  }
}
