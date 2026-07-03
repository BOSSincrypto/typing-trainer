'use strict';

// Топ частотных слов — компактные строки, разворачиваются в массивы при старте
const WORDS = {
  ru: ('и в не на я быть он с что а по это она этот к но они мы как из у который то за свой весь год от так о для ты же все тот мочь вы человек такой его сказать только или ещё бы себя один когда уже вот кто да наш мой знать стать при чтобы дело жизнь первый очень два день новый рука даже во время если нет самый ни под где надо там слово идти большой должен место иметь ничто до вода много раз хотеть люди дом сейчас лицо каждый друг видеть глаз потом сила конец теперь стоять свет мир вопрос сам без нога тут работа мама три хорошо думать всё почти жить чем голос сторона земля здесь дать город найти после снова путь начать спросить голова через давать вместе взять сидеть понять ждать смотреть маленький сын другой ночь дверь стол лес небо утро вечер сердце имя история минута окно право старый белый чёрный красный высокий сильный молодой последний общий разный народ страна война мысль правда деньги машина книга школа семья ребёнок отец мать брат сестра игра песня музыка море река гора улица дорога хлеб чай стул кот собака птица рыба').split(' '),
  en: ('the be to of and a in that have it for not on with he as you do at this but his by from they we say her she or an will my one all would there their what so up out if about who get which go me when make can like time no just him know take people into year your good some could them see other than then now look only come its over think also back after use two how our work first well way even new want because any these give day most us is was are had were said each may find long down did made part great where much before right too mean old same tell why ask men change went light kind off need house picture try again animal point mother world near build self earth father head stand own page should country found answer school grow study still learn plant cover food sun four between state keep eye never last let thought city tree cross farm hard start might story saw far sea draw left late run while press close night real life few north open seem together next white children begin got walk example ease paper group always music those both mark often letter until mile river car feet care second book carry took science eat room friend began idea fish mountain stop once base hear horse cut sure watch color face wood main').split(' ')
};

const $ = id => document.getElementById(id);
const box = $('textBox'), input = $('hidden'), hint = $('hint');
const S = {
  lang: localStorage.tt_lang === 'en' ? 'en' : 'ru',
  time: +localStorage.tt_time === 30 ? 30 : 60,
  chars: [], pos: 0, errors: 0, typed: 0,
  started: 0, timer: 0, running: false, finished: false
};

function genText(lang, n) {
  const w = WORDS[lang], out = [];
  for (let i = 0; i < n; i++) out.push(w[Math.random() * w.length | 0]);
  return out.join(' ');
}

function render() {
  const text = genText(S.lang, 80);
  S.chars = [...text];
  S.pos = S.errors = S.typed = 0;
  const frag = document.createDocumentFragment();
  for (const ch of S.chars) {
    const s = document.createElement('span');
    s.textContent = ch;
    frag.append(s);
  }
  box.replaceChildren(frag);
  box.children[0].classList.add('cur');
  box.scrollTop = 0;
}

function stats() {
  const min = (Date.now() - S.started) / 60000;
  const cpm = min > 0 ? Math.round(S.pos / min) : 0;
  const acc = S.typed ? Math.round((S.typed - S.errors) / S.typed * 100) : 100;
  return { cpm, acc };
}

function tick() {
  const left = S.time - Math.floor((Date.now() - S.started) / 1000);
  $('hudTime').textContent = Math.max(0, left);
  const { cpm, acc } = stats();
  $('hudWpm').textContent = cpm;
  $('hudAcc').textContent = acc;
  if (left <= 0) finish();
}

function start() {
  S.started = Date.now();
  S.running = true;
  hint.hidden = true;
  S.timer = setInterval(tick, 500);
}

function finish() {
  clearInterval(S.timer);
  S.running = false;
  S.finished = true;
  const { cpm, acc } = stats();
  saveResult(cpm, acc);
  $('doneWpm').textContent = cpm + ' зн/мин';
  $('doneDetail').textContent = `точность ${acc}% · ошибок ${S.errors} · ${S.lang === 'ru' ? 'русский' : 'английский'} · ${S.time}с`;
  $('screenRun').hidden = true;
  $('screenDone').hidden = false;
  renderStats();
  input.blur();
}

function loadHist() {
  try {
    const h = JSON.parse(localStorage.tt_hist || '[]');
    return Array.isArray(h) ? h : [];
  } catch {
    return [];
  }
}

function saveResult(cpm, acc) {
  const h = loadHist();
  h.unshift({ d: Date.now(), cpm, acc, l: S.lang, t: S.time });
  try { localStorage.tt_hist = JSON.stringify(h.slice(0, 10)); } catch { /* приватный режим */ }
}

function renderStats() {
  const h = loadHist();
  $('history').replaceChildren(...h.map(r => {
    const div = document.createElement('div');
    const date = new Date(r.d).toLocaleDateString('ru', { day: 'numeric', month: 'short' });
    const left = document.createElement('span');
    left.textContent = `${date} · ${r.l} · ${r.t}с`;
    const b = document.createElement('b');
    b.textContent = r.cpm;
    const right = document.createElement('span');
    right.append(b, ` зн/мин · ${r.acc}%`);
    div.append(left, right);
    return div;
  }));
}

function reset() {
  clearInterval(S.timer);
  S.running = false;
  S.finished = false;
  $('screenDone').hidden = true;
  $('screenRun').hidden = false;
  $('hudTime').textContent = S.time;
  $('hudWpm').textContent = 0;
  $('hudAcc').textContent = 100;
  hint.hidden = false;
  input.value = '';
  render();
}

function onInput() {
  const v = input.value;
  input.value = '';
  if (!v || S.finished) return;
  if (!S.running) start();
  for (const ch of v) {
    if (S.pos >= S.chars.length) break;
    const el = box.children[S.pos];
    S.typed++;
    if (ch === S.chars[S.pos]) el.classList.add('c');
    else { el.classList.add('w'); S.errors++; }
    el.classList.remove('cur');
    S.pos++;
  }
  if (S.pos >= S.chars.length) return finish();
  const cur = box.children[S.pos];
  cur.classList.add('cur');
  // держим текущую строку в видимой области
  const y = cur.offsetTop - box.offsetTop;
  if (y > box.clientHeight / 2) box.scrollTop = y - box.clientHeight / 2;
}

// Backspace не поддерживаем намеренно: ошибка фиксируется, движемся дальше —
// это стандарт тренажёров и сильно упрощает логику на мобильных IME
input.addEventListener('input', onInput);
box.addEventListener('click', () => input.focus({ preventScroll: true }));
$('againBtn').addEventListener('click', () => { reset(); input.focus({ preventScroll: true }); });

for (const seg of ['langSeg', 'timeSeg']) {
  $(seg).addEventListener('click', e => {
    const b = e.target.closest('button');
    if (!b) return;
    for (const x of $(seg).children) x.classList.toggle('on', x === b);
    if (b.dataset.lang) { S.lang = b.dataset.lang; localStorage.tt_lang = S.lang; }
    if (b.dataset.time) { S.time = +b.dataset.time; localStorage.tt_time = S.time; }
    reset();
  });
}

// восстановление сохранённых настроек
for (const b of $('langSeg').children) b.classList.toggle('on', b.dataset.lang === S.lang);
for (const b of $('timeSeg').children) b.classList.toggle('on', +b.dataset.time === S.time);
reset();

if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js');
