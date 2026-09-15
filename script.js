const nav = document.querySelector('#nav');
const menuToggle = document.querySelector('.menu-toggle');
const quizForm = document.querySelector('#quizForm');
const quizResult = document.querySelector('#quizResult');
const activityResult = document.querySelector('#activityResult');
const imageDialog = document.querySelector('#imageDialog');
const dialogText = document.querySelector('#dialogText');

menuToggle?.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

document.querySelectorAll('.nav a').forEach((link) => {
  link.addEventListener('click', () => nav.classList.remove('open'));
});

document.querySelectorAll('.speak').forEach((button) => {
  button.addEventListener('click', () => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(button.dataset.text || '');
    utterance.lang = 'ar-SA';
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  });
});

document.querySelectorAll('.image-card').forEach((card) => {
  card.addEventListener('click', () => {
    dialogText.textContent = card.dataset.detail || '';
    imageDialog.showModal();
  });
});

document.querySelector('.close-dialog')?.addEventListener('click', () => imageDialog.close());

document.querySelectorAll('[data-reveal]').forEach((button) => {
  button.addEventListener('click', () => {
    activityResult.textContent = button.dataset.reveal;
  });
});

quizForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(quizForm);
  let score = 0;

  for (const value of data.values()) {
    score += Number(value);
  }

  const total = 5;
  const message = score === total
    ? 'ممتاز: فهمك للنماذج التربوية عميق.'
    : score >= 3
      ? 'جيد جدًا: راجع الصفحات التي أخطأت فيها لتعزيز الفهم.'
      : 'تحتاج إلى مراجعة: أعد قراءة النماذج الأساسية ثم حاول مرة أخرى.';

  quizResult.textContent = `نتيجتك: ${score} من ${total}. ${message}`;
});

const sections = [...document.querySelectorAll('.page')];
const navLinks = [...document.querySelectorAll('.nav a')];

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    navLinks.forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
    });
  });
}, { threshold: 0.45 });

sections.forEach((section) => observer.observe(section));
