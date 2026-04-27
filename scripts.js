const menuButton = document.querySelector("[data-menu-toggle]");
const nav = document.querySelector("[data-nav]");
const form = document.querySelector("[data-appointment-form]");
const toast = document.querySelector("[data-toast]");
const serviceButtons = [...document.querySelectorAll("[data-service]")];
const priceHeading = document.querySelector("[data-price-heading]");
const priceNote = document.querySelector("[data-price-note]");
const priceList = document.querySelector("[data-price-list]");

const servicePrices = {
  therapy: {
    title: "Лечение зубов",
    note: "Цены из раздела «Прейскурант терапия» на текущем сайте клиники.",
    items: [
      ["Первичная консультация стоматолога-терапевта", "500 руб."],
      ["Проводниковая анестезия", "1 500 руб."],
      ["Ультразвук + Air Flow, все зубы", "5 000 руб."],
      ["Восстановление зуба пломбой I, V, VI класс", "2 000 руб."],
      ["Восстановление зуба пломбой II, III класс", "5 000 руб."],
      ["Обработка хорошо проходимого корневого канала", "1 000 руб."],
    ],
  },
  prosthetics: {
    title: "Протезирование",
    note: "Фрагмент раздела «Прейскурант ортопедия».",
    items: [
      ["Первичная консультация стоматолога-ортопеда", "500 руб."],
      ["Изготовление коронки металлокерамической", "10 500 руб."],
      ["Восстановление зуба вкладкой, виниром, полукоронкой", "17 000 руб."],
      ["Изготовление коронки цельнолитой", "7 000 руб."],
      ["Частичный съемный протез", "17 000 руб."],
      ["Протезирование зуба с использованием имплантата", "30 000 руб."],
    ],
  },
  surgery: {
    title: "Имплантация и хирургия",
    note: "Фрагмент раздела «Прейскурант хирургия».",
    items: [
      ["Первичная консультация по хирургии", "1 000 руб."],
      ["Удаление постоянного зуба простое", "6 000 руб."],
      ["Удаление постоянного зуба средней сложности", "9 000 руб."],
      ["Удаление ретинированного или дистопированного зуба", "10 000 руб."],
      ["Синус-лифтинг", "30 000 руб."],
      ["Внутрикостная дентальная имплантация", "30 000 руб."],
    ],
  },
  whitening: {
    title: "Отбеливание",
    note: "Цены из терапевтического прайса, где указаны варианты отбеливания.",
    items: [
      ["Профессиональное отбеливание: домашние капы", "13 500 руб."],
      ["Профессиональное отбеливание внутриклинически", "18 000 руб."],
      ["Ультразвук + Air Flow, все зубы", "5 000 руб."],
    ],
  },
  ortho: {
    title: "Ортодонтия",
    note: "Фрагмент раздела «Прейскурант ортодонтия».",
    items: [
      ["Первичная консультация ортодонта", "1 500 руб."],
      ["Металлическая лигатурная брекет-система", "20 350 руб."],
      ["Самолигирующая брекет-система «Экспириенс»", "35 000 руб."],
      ["Керамическая брекет-система Н4", "36 350 руб."],
      ["Брекет-система «Damonq»", "39 350 руб."],
      ["Лингвальная индивидуальная брекет-система", "130 000 руб."],
    ],
  },
  kids: {
    title: "Детская стоматология",
    note: "Фрагмент раздела «Прейскурант детская стоматология».",
    items: [
      ["Первичный прием детского стоматолога", "600 руб."],
      ["Профилактический прием с заключением и справкой", "1 000 руб."],
      ["Диспансерный прием детского стоматолога", "бесплатно"],
      ["Ультразвук + Air Flow, все зубы", "4 000 руб."],
      ["Восстановление временного зуба пломбой", "2 300 руб."],
      ["Удаление временного зуба простое", "2 000 руб."],
    ],
  },
};

if (window.lucide) {
  window.lucide.createIcons();
}

function renderServicePrices(serviceKey) {
  const service = servicePrices[serviceKey];
  if (!service || !priceHeading || !priceNote || !priceList) {
    return;
  }

  priceHeading.textContent = service.title;
  priceNote.textContent = service.note;
  priceList.innerHTML = service.items
    .map(([name, price]) => `
      <div class="service-price-item">
        <span>${name}</span>
        <strong>${price}</strong>
      </div>
    `)
    .join("");
}

renderServicePrices("therapy");

menuButton?.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("is-open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.innerHTML = isOpen ? '<i data-lucide="x"></i>' : '<i data-lucide="menu"></i>';
  if (window.lucide) {
    window.lucide.createIcons();
  }
});

nav?.addEventListener("click", (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    nav.classList.remove("is-open");
    menuButton?.setAttribute("aria-expanded", "false");
    if (menuButton) {
      menuButton.innerHTML = '<i data-lucide="menu"></i>';
      if (window.lucide) {
        window.lucide.createIcons();
      }
    }
  }
});

form?.addEventListener("submit", (event) => {
  event.preventDefault();
  toast?.classList.add("is-visible");
  window.setTimeout(() => toast?.classList.remove("is-visible"), 4200);
  form.reset();
});

serviceButtons.forEach((button) => {
  button.addEventListener("click", () => {
    serviceButtons.forEach((item) => item.classList.remove("is-active"));
    button.classList.add("is-active");
    renderServicePrices(button.dataset.service);
    document.querySelector("#service-price-panel")?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  });
});
