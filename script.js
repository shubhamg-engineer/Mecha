const guide = document.getElementById('guide');
const speech = document.getElementById('speech');

// Blink
setInterval(() => {
  guide.style.opacity = guide.style.opacity === '0.7' ? '1' : '0.7';
}, 4000);

// Click speech
guide.onclick = () => {
  speech.innerHTML = 'At your service, Commander';
  speech.style.opacity = 1;
  setTimeout(() => speech.style.opacity = 0, 3000);
};

// ENTER
document.getElementById('enter').onclick = () => {
  document.getElementById('intro').classList.add('hidden');
  document.body.style.overflow = 'auto';
  window.scrollTo({ top: 0, behavior: 'smooth' });
  speech.innerHTML = 'Portfolio unlocked';
  speech.style.opacity = 1;
  setTimeout(() => speech.style.opacity = 0, 3000);
};

// KONAMI CODE
let k = [];
const seq = [38,38,40,40,37,39,37,39,66,65];
document.addEventListener('keydown', e => {
  k.push(e.keyCode);
  if (k.length > 10) k.shift();
  if (k.join() === seq.join()) {
    new Audio('https://assets.mixkit.co/sfx/preview/mixkit-arcade-game-jump-coin-216.mp3').play();
    speech.innerHTML = 'RESUME UNLOCKED!';
    speech.style.opacity = 1;
    setTimeout(() => speech.style.opacity = 0, 3000);
    const a = document.createElement('a');
    a.href = 'resume.pdf';
    a.download = 'ShubhamG_Resume.pdf';
    document.body.appendChild(a); a.click(); a.remove();
  }
});