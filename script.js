function initApp() {
  const games = [
    { id: 1, name: "Високосний калькулятор", category: "numerical" },
    { id: 2, name: "Вгадай число", category: "numerical" },
    { id: 3, name: "Камінь-Ножиці-Папір", category: "game" },
    { id: 4, name: "Калькулятор", category: "numerical" },
    { id: 5, name: "Калькулятор часу", category: "numerical" },
    { id: 6, name: "Google динозаврик", category: "game" },
    { id: 7, name: "Футбол", category: "game" },
    { id: 8, name: "Найбільше число", category: "numerical" },
    { id: 9, name: "Наша команда", category: "acquaintance" },
    { id: 10, name: "Вчений", category: "acquaintance" },
    { id: 11, name: "Меморі картки", category: "game" },
    { id: 12, name: "Швидкий клік", category: "game" },
  ];

  const scientists = [
    { name: "Albert", surname: "Einstein", born: 1879, dead: 1955, id: 1 },
    { name: "Isaac", surname: "Newton", born: 1643, dead: 1727, id: 2 },
    { name: "Galileo", surname: "Galilei", born: 1564, dead: 1642, id: 3 },
    { name: "Marie", surname: "Curie", born: 1867, dead: 1934, id: 4 },
    { name: "Johannes", surname: "Kepler", born: 1571, dead: 1630, id: 5 },
    { name: "Nicolaus", surname: "Copernicus", born: 1473, dead: 1543, id: 6 },
    { name: "Max", surname: "Planck", born: 1858, dead: 1947, id: 7 },
    { name: "Katherine", surname: "Blodgett", born: 1898, dead: 1979, id: 8 },
    { name: "Ada", surname: "Lovelace", born: 1815, dead: 1852, id: 9 },
    { name: "Sarah E.", surname: "Goode", born: 1855, dead: 1905, id: 10 },
    { name: "Lise", surname: "Meitner", born: 1878, dead: 1968, id: 11 },
    { name: "Hanna", surname: "Hammarström", born: 1829, dead: 1909, id: 12 },
  ];

  const categoryNames = {
    all: "усі категорії",
    numerical: "числові завдання",
    game: "ігри",
    acquaintance: "знайомство",
  };

  const gamesGrid = document.querySelector("#gamesGrid");
  const filterLabel = document.querySelector("#filterLabel");
  const dropdown = document.querySelector(".dropdown");
  const interactiveToggle = document.querySelector("#interactiveToggle");
  const categoryMenu = document.querySelector("#categoryMenu");
  const themeToggle = document.querySelector("#themeToggle");
  const userName = document.querySelector("#userName");
  const greetingModal = document.querySelector("#greetingModal");
  const subscribeModal = document.querySelector("#subscribeModal");
  let activeModal = null;
  let rpsScore = { user: 0, computer: 0, draw: 0 };
  let teamIndex = 0;
  let dinoTimer = null;
  let dinoScore = 0;
  let clickerTimer = null;

  const team = [
    { emoji: "👩‍💻", name: "Аня", role: "Верстка та дизайн" },
    { emoji: "🧑‍🔬", name: "Максим", role: "JavaScript-логіка" },
    { emoji: "🎮", name: "Оля", role: "Тестування ігор" },
  ];

  function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  }

  function renderGames(category = "all") {
    clearInterval(dinoTimer);
    clearInterval(clickerTimer);
    const visibleGames =
      category === "all"
        ? games
        : games.filter((game) => game.category === category);
    filterLabel.textContent = `Показано: ${categoryNames[category]}`;
    gamesGrid.innerHTML = visibleGames.map(createCardMarkup).join("");
    initCardLogic();
  }

  function createCardMarkup(game) {
    return `
    <article class="card" id="game-${game.id}" data-category="${game.category}">
      <div class="card__head">
        <h3>${game.name}</h3>
        <span class="badge">${categoryNames[game.category]}</span>
      </div>
      ${getGameContent(game.id)}
    </article>
  `;
  }

  function getGameContent(id) {
    const templates = {
      1: `
      <div class="game-row">
        <input data-leap-input type="number" placeholder="Рік народження" />
        <button class="primary-btn" data-leap-btn type="button">Перевірити</button>
      </div>
      <p class="result" data-result></p>
    `,
      2: `
      <div class="game-row">
        <input data-guess-input type="number" min="1" max="10" placeholder="Число 1-10" />
        <button class="primary-btn" data-guess-btn type="button">Вгадати</button>
      </div>
      <p class="result" data-result></p>
    `,
      3: `
      <div class="choice-row">
        <button class="choice-btn" data-rps="камінь">🪨</button>
        <button class="choice-btn" data-rps="ножиці">✂️</button>
        <button class="choice-btn" data-rps="папір">📄</button>
      </div>
      <p class="scoreboard" data-score>Ви: 0 • Комп’ютер: 0 • Нічия: 0</p>
      <p class="result" data-result></p>
    `,
      4: `
      <div class="calculator-row">
        <input data-calc-a type="number" placeholder="a" />
        <select data-operation>
          <option value="+">+</option>
          <option value="-">-</option>
          <option value="*">×</option>
          <option value="/">÷</option>
        </select>
        <input data-calc-b type="number" placeholder="b" />
        <button class="primary-btn" data-calc-btn type="button">Обчислити</button>
      </div>
      <p class="result" data-result></p>
    `,
      5: `
      <div class="game-row">
        <input data-minutes type="number" min="0" placeholder="Кількість хвилин" />
        <button class="primary-btn" data-time-btn type="button">Перетворити</button>
      </div>
      <p class="result" data-result></p>
    `,
      6: `
      <div class="dino-game" data-dino-game>
        <div class="dino-score">Очки: <span data-dino-score>0</span></div>
        <div class="dino" data-dino>🦖</div>
        <div class="cactus" data-cactus>🌵</div>
      </div>
      <div class="game-row">
        <button class="primary-btn" data-dino-start type="button">Старт</button>
        <button class="primary-btn" data-dino-btn type="button">Стрибок</button>
        <span>Натисни кнопку або Space, щоб перестрибнути кактус.</span>
      </div>
      <p class="result" data-dino-status>Гру готово. Натисни “Старт”.</p>
    `,
      7: `
      <div class="football-field" data-field>
        <div class="goal goal--left">ГОЛ</div>
        <div class="goal goal--right">ГОЛ</div>
        <div class="ball" data-ball>⚽</div>
      </div>
      <div class="game-row">
        <button class="primary-btn" data-football-reset type="button">Повернути м’яч</button>
        <span data-football-score>Голи: 0</span>
      </div>
      <p class="result">
        Клікни по полю: м’яч летить до курсора, але не виходить за межі. Попади у ворота!
      </p>
    `,
      8: `
      <div class="game-row">
        <input data-max-a type="text" placeholder="Перше число" />
        <input data-max-b type="text" placeholder="Друге число" />
        <input data-max-c type="text" placeholder="Третє число" />
        <button class="primary-btn" data-max-btn type="button">Знайти</button>
      </div>
      <p class="result" data-result></p>
    `,
      9: `
      <div class="slider">
        <button class="primary-btn" data-prev type="button">‹</button>
        <div class="slide-card" data-slide></div>
        <button class="primary-btn" data-next type="button">›</button>
      </div>
    `,
      10: `
      <div class="scientist-actions">
        <button data-task="century19">Народилися в 19 ст.</button>
        <button data-task="sumAge">Сума років життя</button>
        <button data-task="alphabet">Алфавіт</button>
        <button data-task="ageSort">За віком</button>
        <button data-task="removeOld">Без 15-17 ст.</button>
        <button data-task="latestBorn">Найпізніше народився</button>
        <button data-task="einstein">Рік Einstein</button>
        <button data-task="surnameC">Прізвище на C</button>
        <button data-task="removeA">Без імен на A</button>
        <button data-task="longShort">Найбільше/найменше</button>
        <button data-task="sameLetters">Однакові ініціали</button>
        <button data-task="all19">Чи всі в 19 ст.</button>
      </div>
      <div class="scientist-output" data-scientist-output>
        Натисни кнопку, щоб побачити результат.
      </div>
    `,
      11: `
      <p class="game-help">Знайди всі однакові пари символів.</p>
      <div class="memory-board" data-memory-board></div>
      <div class="game-row">
        <button class="primary-btn" data-memory-restart type="button">Нова гра</button>
        <span data-memory-status>Ходи: 0 • Пари: 0/4</span>
      </div>
    `,
      12: `
      <p class="game-help">За 10 секунд натисни зелену ціль якомога більше разів.</p>
      <div class="clicker-arena" data-clicker-arena>
        <button class="clicker-target" data-clicker-target type="button">🎯</button>
      </div>
      <div class="game-row">
        <button class="primary-btn" data-clicker-start type="button">Почати</button>
        <span data-clicker-status>Очки: 0 • Час: 10</span>
      </div>
    `,
    };

    return templates[id];
  }

  function initCardLogic() {
    document.querySelectorAll("[data-leap-btn]").forEach((button) => {
      button.addEventListener("click", () => {
        const card = button.closest(".card");
        const year = Number(card.querySelector("[data-leap-input]").value);
        const result = card.querySelector("[data-result]");
        if (!Number.isInteger(year) || year <= 0) {
          result.textContent = "Введіть коректний рік.";
          result.classList.add("error");
          return;
        }
        result.classList.remove("error");
        result.textContent = isLeapYear(year)
          ? `${year} — високосний рік.`
          : `${year} — не високосний рік.`;
      });
    });

    document.querySelectorAll("[data-guess-btn]").forEach((button) => {
      button.addEventListener("click", () => {
        const card = button.closest(".card");
        const userValue = Number(
          card.querySelector("[data-guess-input]").value,
        );
        const computerValue = Math.floor(Math.random() * 10) + 1;
        const result = card.querySelector("[data-result]");
        if (!Number.isInteger(userValue) || userValue < 1 || userValue > 10) {
          result.textContent = "Введіть ціле число від 1 до 10.";
          result.classList.add("error");
          return;
        }
        result.classList.remove("error");
        result.textContent =
          userValue === computerValue
            ? `Вітаю ви вгадали число ${computerValue}`
            : `Ви програли, компютер загадав ${computerValue}`;
      });
    });

    document.querySelectorAll("[data-rps]").forEach((button) => {
      button.addEventListener("click", () => playRps(button));
    });

    document.querySelectorAll("[data-calc-btn]").forEach((button) => {
      button.addEventListener("click", () => calculate(button));
    });

    document.querySelectorAll("[data-time-btn]").forEach((button) => {
      button.addEventListener("click", () => {
        const card = button.closest(".card");
        const minutes = Number(card.querySelector("[data-minutes]").value);
        const result = card.querySelector("[data-result]");
        if (!Number.isInteger(minutes) || minutes < 0) {
          result.textContent = "Введіть невід’ємне ціле число.";
          result.classList.add("error");
          return;
        }
        result.classList.remove("error");
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = String(minutes % 60).padStart(2, "0");

        result.textContent = `${minutes} хв = ${hours}:${remainingMinutes}`;
      });
    });

    document
      .querySelectorAll("[data-dino-start]")
      .forEach((button) =>
        button.addEventListener("click", () =>
          startDinoGame(button.closest(".card")),
        ),
      );
    document
      .querySelectorAll("[data-dino-btn]")
      .forEach((button) => button.addEventListener("click", jumpDino));
    document.querySelectorAll("[data-field]").forEach(initFootball);
    document
      .querySelectorAll("[data-max-btn]")
      .forEach((button) =>
        button.addEventListener("click", () => findMax(button)),
      );
    document.querySelectorAll("[data-slide]").forEach(renderTeamSlide);
    document
      .querySelectorAll("[data-prev]")
      .forEach((button) =>
        button.addEventListener("click", () => changeSlide(-1)),
      );
    document
      .querySelectorAll("[data-next]")
      .forEach((button) =>
        button.addEventListener("click", () => changeSlide(1)),
      );
    document
      .querySelectorAll("[data-task]")
      .forEach((button) =>
        button.addEventListener("click", () => runScientistTask(button)),
      );
    document.querySelectorAll("[data-memory-board]").forEach(initMemoryGame);
    document
      .querySelectorAll("[data-memory-restart]")
      .forEach((button) =>
        button.addEventListener("click", () =>
          initMemoryGame(
            button.closest(".card").querySelector("[data-memory-board]"),
          ),
        ),
      );
    document
      .querySelectorAll("[data-clicker-start]")
      .forEach((button) =>
        button.addEventListener("click", () =>
          startClicker(button.closest(".card")),
        ),
      );
  }

  function playRps(button) {
    const card = button.closest(".card");
    const userChoice = button.dataset.rps;
    const choices = ["камінь", "ножиці", "папір"];
    const computerChoice = choices[Math.floor(Math.random() * choices.length)];
    let message = "Нічия!";
    if (userChoice === computerChoice) {
      rpsScore.draw += 1;
    } else if (
      (userChoice === "камінь" && computerChoice === "ножиці") ||
      (userChoice === "ножиці" && computerChoice === "папір") ||
      (userChoice === "папір" && computerChoice === "камінь")
    ) {
      rpsScore.user += 1;
      message = "Ви виграли!";
    } else {
      rpsScore.computer += 1;
      message = "Виграв комп’ютер!";
    }
    card.querySelector("[data-score]").textContent =
      `Ви: ${rpsScore.user} • Комп’ютер: ${rpsScore.computer} • Нічия: ${rpsScore.draw}`;
    card.querySelector("[data-result]").textContent =
      `${message} Комп’ютер обрав: ${computerChoice}.`;
  }

  function calculate(button) {
    const card = button.closest(".card");
    const a = Number(card.querySelector("[data-calc-a]").value);
    const b = Number(card.querySelector("[data-calc-b]").value);
    const operation = card.querySelector("[data-operation]").value;
    const result = card.querySelector("[data-result]");
    if (!Number.isFinite(a) || !Number.isFinite(b)) {
      result.textContent = "Введіть два числа.";
      result.classList.add("error");
      return;
    }
    const operations = {
      "+": { name: "Сумма", value: a + b },
      "-": { name: "Різниця", value: a - b },
      "*": { name: "Добуток", value: a * b },
      "/": {
        name: "Частка",
        value: b === 0 ? "неможлива (ділення на 0)" : a / b,
      },
    };
    result.classList.remove("error");
    result.textContent = `${operations[operation].name} чисел ${a} і ${b} = ${operations[operation].value}`;
  }

  function startDinoGame(card) {
    const game = card.querySelector("[data-dino-game]");
    const status = card.querySelector("[data-dino-status]");
    const score = card.querySelector("[data-dino-score]");
    clearInterval(dinoTimer);
    dinoScore = 0;
    score.textContent = dinoScore;
    status.textContent = "Гра почалась! Стрибай через кактус.";
    game.classList.remove("game-over");
    game.classList.add("is-running");
    dinoTimer = setInterval(() => {
      dinoScore += 1;
      score.textContent = dinoScore;
      const dinoRect = card
        .querySelector("[data-dino]")
        .getBoundingClientRect();
      const cactusRect = card
        .querySelector("[data-cactus]")
        .getBoundingClientRect();
      const isCollision =
        dinoRect.left < cactusRect.right - 8 &&
        dinoRect.right > cactusRect.left + 8 &&
        dinoRect.bottom > cactusRect.top + 8;
      if (isCollision) {
        clearInterval(dinoTimer);
        game.classList.remove("is-running");
        game.classList.add("game-over");
        status.textContent = [
          `Гру завершено! Ваш результат: ${dinoScore} очок.`,
          "Натисни “Старт”, щоб зіграти ще.",
        ].join(" ");
      }
    }, 100);
  }

  function jumpDino() {
    document
      .querySelectorAll("[data-dino-game].is-running [data-dino]")
      .forEach((dino) => {
        if (dino.classList.contains("jump")) return;
        dino.classList.add("jump");
        setTimeout(() => dino.classList.remove("jump"), 520);
      });
  }

  function initFootball(field) {
    const ball = field.querySelector("[data-ball]");
    const score = field.closest(".card").querySelector("[data-football-score]");
    const reset = field.closest(".card").querySelector("[data-football-reset]");
    let goals = 0;
    const moveBall = (left, top) => {
      ball.style.left = `${left}px`;
      ball.style.top = `${top}px`;
      const goalZone =
        left < 28 || left > field.clientWidth - ball.offsetWidth - 28;
      const goalHeight =
        top > field.clientHeight / 2 - 50 && top < field.clientHeight / 2 + 50;
      if (goalZone && goalHeight) {
        goals += 1;
        score.textContent = `Голи: ${goals}`;
      }
    };
    const centerBall = () =>
      moveBall(
        field.clientWidth / 2 - ball.offsetWidth / 2,
        field.clientHeight / 2 - ball.offsetHeight / 2,
      );
    centerBall();
    reset.addEventListener("click", centerBall);
    field.addEventListener("click", (event) => {
      const rect = field.getBoundingClientRect();
      const radiusX = ball.offsetWidth / 2;
      const radiusY = ball.offsetHeight / 2;
      const maxLeft = field.clientWidth - ball.offsetWidth;
      const maxTop = field.clientHeight - ball.offsetHeight;
      const left = Math.min(
        Math.max(event.clientX - rect.left - radiusX, 0),
        maxLeft,
      );
      const top = Math.min(
        Math.max(event.clientY - rect.top - radiusY, 0),
        maxTop,
      );
      moveBall(left, top);
    });
  }

  function findMax(button) {
    const card = button.closest(".card");
    const inputs = ["[data-max-a]", "[data-max-b]", "[data-max-c]"].map(
      (selector) => card.querySelector(selector).value.trim(),
    );
    const numbers = inputs.map(Number);
    const result = card.querySelector("[data-result]");
    if (
      inputs.some((value) => value === "") ||
      numbers.some((value) => !Number.isFinite(value))
    ) {
      result.textContent = "Усі введені символи мають бути числами.";
      result.classList.add("error");
      return;
    }
    result.classList.remove("error");
    result.textContent = `Найбільше число: ${Math.max(...numbers)}`;
  }

  function renderTeamSlide() {
    const slide = document.querySelector("[data-slide]");
    const previous = document.querySelector("[data-prev]");
    const next = document.querySelector("[data-next]");
    if (!slide) return;
    const member = team[teamIndex];
    slide.innerHTML = `<div class="avatar">${member.emoji}</div><h4>${member.name}</h4><p>${member.role}</p>`;
    previous.disabled = teamIndex === 0;
    next.disabled = teamIndex === team.length - 1;
  }

  function changeSlide(direction) {
    teamIndex = Math.min(Math.max(teamIndex + direction, 0), team.length - 1);
    renderTeamSlide();
  }

  function initMemoryGame(board) {
    const card = board.closest(".card");
    const status = card.querySelector("[data-memory-status]");
    const icons = ["🍎", "🍌", "🍇", "🍓"];
    const deck = [...icons, ...icons].sort(() => Math.random() - 0.5);
    let opened = [];
    let matched = 0;
    let moves = 0;
    board.innerHTML = deck
      .map(
        (icon, index) =>
          `<button class="memory-card" data-icon="${icon}" data-index="${index}" type="button">?</button>`,
      )
      .join("");
    status.textContent = "Ходи: 0 • Пари: 0/4";
    board.querySelectorAll(".memory-card").forEach((button) => {
      button.addEventListener("click", () => {
        if (
          button.classList.contains("open") ||
          button.classList.contains("matched") ||
          opened.length === 2
        )
          return;
        button.textContent = button.dataset.icon;
        button.classList.add("open");
        opened.push(button);
        if (opened.length !== 2) return;
        moves += 1;
        const isPair = opened[0].dataset.icon === opened[1].dataset.icon;
        if (isPair) {
          opened.forEach((item) => item.classList.add("matched"));
          matched += 1;
          opened = [];
        } else {
          setTimeout(() => {
            opened.forEach((item) => {
              item.textContent = "?";
              item.classList.remove("open");
            });
            opened = [];
          }, 700);
        }
        status.textContent =
          matched === icons.length
            ? `Перемога! Ходи: ${moves}`
            : `Ходи: ${moves} • Пари: ${matched}/4`;
      });
    });
  }

  function startClicker(card) {
    const arena = card.querySelector("[data-clicker-arena]");
    const target = card.querySelector("[data-clicker-target]");
    const status = card.querySelector("[data-clicker-status]");
    const start = card.querySelector("[data-clicker-start]");
    let points = 0;
    let timeLeft = 10;
    clearInterval(clickerTimer);
    start.disabled = true;
    target.disabled = false;
    target.classList.add("is-active");
    const moveTarget = () => {
      target.style.left = `${Math.random() * (arena.clientWidth - target.offsetWidth)}px`;
      target.style.top = `${Math.random() * (arena.clientHeight - target.offsetHeight)}px`;
    };
    const hitTarget = () => {
      points += 1;
      moveTarget();
      status.textContent = `Очки: ${points} • Час: ${timeLeft}`;
    };
    target.onclick = hitTarget;
    moveTarget();
    status.textContent = `Очки: ${points} • Час: ${timeLeft}`;
    clickerTimer = setInterval(() => {
      timeLeft -= 1;
      status.textContent = `Очки: ${points} • Час: ${timeLeft}`;
      if (timeLeft === 0) {
        clearInterval(clickerTimer);
        target.disabled = true;
        target.classList.remove("is-active");
        start.disabled = false;
        status.textContent = `Фініш! Ви набрали ${points} очок.`;
      }
    }, 1000);
  }

  function formatScientists(list) {
    return list
      .map(
        (person) =>
          `${person.name} ${person.surname} (${person.born}-${person.dead})`,
      )
      .join("<br>");
  }

  function runScientistTask(button) {
    const output = button
      .closest(".card")
      .querySelector("[data-scientist-output]");
    const tasks = {
      century19: () =>
        formatScientists(
          scientists.filter(({ born }) => born >= 1801 && born <= 1900),
        ),
      sumAge: () => {
        const totalYears = scientists.reduce(
          (sum, person) => sum + person.dead - person.born,
          0,
        );

        return `Усі вчені прожили разом ${totalYears} років.`;
      },
      alphabet: () =>
        formatScientists(
          [...scientists].sort((a, b) => a.surname.localeCompare(b.surname)),
        ),
      ageSort: () =>
        formatScientists(
          [...scientists].sort((a, b) => b.dead - b.born - (a.dead - a.born)),
        ),
      removeOld: () =>
        formatScientists(
          scientists.filter(({ born }) => born < 1401 || born > 1700),
        ),
      latestBorn: () =>
        formatScientists([
          scientists.reduce((latest, person) =>
            person.born > latest.born ? person : latest,
          ),
        ]),
      einstein: () =>
        `Albert Einstein народився у ${scientists.find(({ surname }) => surname === "Einstein").born} році.`,
      surnameC: () =>
        formatScientists(
          scientists.filter(({ surname }) => surname.startsWith("C")),
        ),
      removeA: () =>
        formatScientists(
          scientists.filter(({ name }) => !name.startsWith("A")),
        ),
      longShort: () => {
        const sorted = [...scientists].sort(
          (a, b) => b.dead - b.born - (a.dead - a.born),
        );
        const longestLived = formatScientists([sorted[0]]);
        const shortestLived = formatScientists([sorted.at(-1)]);

        return `Найбільше прожив: ${longestLived}<br>Найменше прожив: ${shortestLived}`;
      },
      sameLetters: () =>
        formatScientists(
          scientists.filter(({ name, surname }) => name[0] === surname[0]),
        ),
      all19: () =>
        scientists.every(({ born, dead }) => born <= 1900 && dead >= 1801)
          ? "Так, усі працювали в 19 столітті."
          : "Ні, не всі працювали в 19 столітті.",
    };
    output.innerHTML = tasks[button.dataset.task]();
  }

  function openModal(modal) {
    activeModal = modal;
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
  }

  function closeModal(modal = activeModal) {
    if (!modal) return;
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    activeModal = null;
  }

  interactiveToggle.addEventListener("click", () => {
    const isOpen = dropdown.classList.toggle("open");
    interactiveToggle.setAttribute("aria-expanded", String(isOpen));
  });

  categoryMenu.addEventListener("click", (event) => {
    if (!event.target.matches("button")) return;
    renderGames(event.target.dataset.category);
    dropdown.classList.remove("open");
    interactiveToggle.setAttribute("aria-expanded", "false");
  });

  themeToggle.addEventListener("click", () =>
    document.body.classList.toggle("dark-theme"),
  );
  document
    .querySelector("#openGreeting")
    .addEventListener("click", () => openModal(greetingModal));
  document
    .querySelector("#subscribeForm")
    .addEventListener("submit", (event) => {
      event.preventDefault();
      event.currentTarget.reset();
      openModal(subscribeModal);
    });
  document.querySelector("#nameForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const value = document.querySelector("#nameInput").value.trim();
    if (value) userName.textContent = value;
    event.currentTarget.reset();
    closeModal(greetingModal);
  });
  document.addEventListener("click", (event) => {
    if (event.target.matches("[data-close-modal]"))
      closeModal(event.target.closest(".modal"));
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeModal();
    if (event.code === "Space" && document.querySelector("[data-dino]"))
      jumpDino();
  });

  renderGames();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initApp);
} else {
  initApp();
}
