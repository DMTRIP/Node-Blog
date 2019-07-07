const btn = document.querySelector('.btn');

const btnFront = btn.querySelector('.btn-front');
const btnYes = btn.querySelector('.btn-back .yes');
const btnNo = btn.querySelector('.btn-back .no');

btnFront.addEventListener('click', (event) => {
  const mx = event.clientX - btn.offsetLeft;
  const my = event.clientY - btn.offsetTop;

  const w = btn.offsetWidth;
  const h = btn.offsetHeight;

  const directions = [
    { id: 'top', x: w / 2, y: 0 },
    { id: 'right', x: w, y: h / 2 },
    { id: 'bottom', x: w / 2, y: h },
    { id: 'left', x: 0, y: h / 2 },
  ];

  directions.sort((a, b) => distance(mx, my, a.x, a.y) - distance(mx, my, b.x, b.y));

  btn.setAttribute('data-direction', directions.shift().id);
  btn.classList.add('is-open');
});

btnYes.addEventListener('click', (event) => {
  btn.classList.remove('is-open');
});

btnNo.addEventListener('click', (event) => {
  btn.classList.remove('is-open');
});

function distance(x1, y1, x2, y2) {
  const dx = x1 - x2;
  const dy = y1 - y2;
  return Math.sqrt(dx * dx + dy * dy);
}

// button 2 that's hard code

const btn2 = document.querySelector('.btn2');

const btnFront2 = btn2.querySelector('.btn-front2');
const btnYes2 = btn2.querySelector('.btn-back2 .yes2');
const btnNo2 = btn2.querySelector('.btn-back2 .no2');

btnFront2.addEventListener('click', (event) => {
  const mx = event.clientX - btn2.offsetLeft;
  const my = event.clientY - btn2.offsetTop;

  const w = btn2.offsetWidth;
  const h = btn2.offsetHeight;

  const directions = [
    { id: 'top', x: w / 2, y: 0 },
    { id: 'right', x: w, y: h / 2 },
    { id: 'bottom', x: w / 2, y: h },
    { id: 'left', x: 0, y: h / 2 },
  ];

  directions.sort((a, b) => distance(mx, my, a.x, a.y) - distance(mx, my, b.x, b.y));

  btn2.setAttribute('data-direction', directions.shift().id);
  btn2.classList.add('is-open');
});

btnYes2.addEventListener('click', (event) => {
  btn2.classList.remove('is-open');
});

btnNo2.addEventListener('click', (event) => {
  btn2.classList.remove('is-open');
});

function distance(x1, y1, x2, y2) {
  const dx = x1 - x2;
  const dy = y1 - y2;
  return Math.sqrt(dx * dx + dy * dy);
}

