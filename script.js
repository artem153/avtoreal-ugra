// Автоцентр «Автореал-Югра» — Скрипты интерфейса

document.addEventListener('DOMContentLoaded', () => {
  // 1. Динамический индикатор работы (Ханты-Мансийск, UTC+5)
  updateWorkStatus();

  // 2. Мобильное меню (боковая шторка и оверлей)
  const mobileToggle = document.getElementById('mobileToggle');
  const mainNav = document.getElementById('mainNav');
  const navOverlay = document.getElementById('navOverlay');

  function toggleMenu(open) {
    const shouldOpen = open !== undefined ? open : !mainNav.classList.contains('active');
    if (shouldOpen) {
      mainNav.classList.add('active');
      mobileToggle.classList.add('active');
      if (navOverlay) navOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    } else {
      mainNav.classList.remove('active');
      mobileToggle.classList.remove('active');
      if (navOverlay) navOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (mobileToggle && mainNav) {
    mobileToggle.addEventListener('click', () => toggleMenu());
    if (navOverlay) navOverlay.addEventListener('click', () => toggleMenu(false));

    mainNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => toggleMenu(false));
    });
  }
});

// Проверка рабочих часов: Пн-Сб с 09:00 до 19:00, Вс — выходной
function updateWorkStatus() {
  const badge = document.getElementById('workStatusBadge');
  const text = document.getElementById('workStatusText');
  if (!badge || !text) return;

  // Рассчитываем текущее время в часовом поясе Ханты-Мансийска (UTC+5)
  const now = new Date();
  const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
  const khmTime = new Date(utc + (3600000 * 5));

  const day = khmTime.getDay(); // 0 = Вс, 1 = Пн, ..., 6 = Сб
  const hours = khmTime.getHours();
  const minutes = khmTime.getMinutes();
  const currentMinutes = hours * 60 + minutes;

  const openMinutes = 9 * 60; // 09:00
  const closeMinutes = 19 * 60; // 19:00

  const isWorkDay = (day >= 1 && day <= 6);
  const isOpen = isWorkDay && (currentMinutes >= openMinutes && currentMinutes < closeMinutes);

  if (isOpen) {
    badge.classList.remove('closed');
    text.textContent = 'Сейчас открыто (до 19:00)';
  } else {
    badge.classList.add('closed');
    if (day === 0) {
      text.textContent = 'Сегодня выходной (откроемся в пн в 09:00)';
    } else if (currentMinutes < openMinutes) {
      text.textContent = 'Сейчас закрыто (откроемся в 09:00)';
    } else {
      text.textContent = 'Сейчас закрыто (откроемся завтра в 09:00)';
    }
  }
}

// Лайтбокс для просмотра фотографий
function openLightbox(src, caption) {
  const lightbox = document.getElementById('photoLightbox');
  const img = document.getElementById('lightboxImg');
  const cap = document.getElementById('lightboxCaption');
  if (!lightbox || !img) return;

  img.src = src;
  if (cap) cap.textContent = caption || '';
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox(e) {
  if (e && e.target && e.target.id === 'lightboxImg') return;
  const lightbox = document.getElementById('photoLightbox');
  if (lightbox) {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }
}


