// Автоцентр «Автореал-Югра» — Логика телефонной версии

document.addEventListener('DOMContentLoaded', () => {
  // 1. Статус работы сервиса (UTC+5, Ханты-Мансийск)
  updateMobileStatus();

  // 2. Открытие / закрытие бокового меню
  const menuToggle = document.getElementById('mMenuToggle');
  const drawer = document.getElementById('mDrawer');
  const drawerOverlay = document.getElementById('mDrawerOverlay');
  const drawerClose = document.getElementById('mDrawerClose');

  function toggleDrawer(open) {
    const shouldOpen = open !== undefined ? open : !drawer.classList.contains('active');
    if (shouldOpen) {
      drawer.classList.add('active');
      drawerOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    } else {
      drawer.classList.remove('active');
      drawerOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (menuToggle) menuToggle.addEventListener('click', () => toggleDrawer(true));
  if (drawerClose) drawerClose.addEventListener('click', () => toggleDrawer(false));
  if (drawerOverlay) drawerOverlay.addEventListener('click', () => toggleDrawer(false));

  // Закрывать меню при клике по любому пункту
  document.querySelectorAll('.m-nav-link').forEach(link => {
    link.addEventListener('click', () => toggleDrawer(false));
  });
});

// Проверка рабочих часов: Пн-Сб с 09:00 до 19:00
function updateMobileStatus() {
  const badge = document.getElementById('mobileStatusBadge');
  const text = document.getElementById('mobileStatusText');
  if (!badge || !text) return;

  const now = new Date();
  const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
  const khmTime = new Date(utc + (3600000 * 5));

  const day = khmTime.getDay(); // 0 = Вс, 1..6 = Пн..Сб
  const currentMinutes = khmTime.getHours() * 60 + khmTime.getMinutes();
  const openMinutes = 9 * 60;   // 09:00
  const closeMinutes = 19 * 60; // 19:00

  const isOpen = (day >= 1 && day <= 6) && (currentMinutes >= openMinutes && currentMinutes < closeMinutes);

  if (isOpen) {
    badge.classList.remove('closed');
    text.textContent = 'Сейчас открыто (до 19:00)';
  } else {
    badge.classList.add('closed');
    if (day === 0) {
      text.textContent = 'Сегодня выходной';
    } else {
      text.textContent = 'Сейчас закрыто';
    }
  }
}
