// script.js - FULL FINAL VERSION
document.addEventListener('DOMContentLoaded', () => {
  const guide = document.getElementById('guide');
  const speech = document.getElementById('speech');
  const mecha = document.getElementById('mecha');
  const enterBtn = document.getElementById('enter');
  const intro = document.getElementById('intro');

  // Pulse for guide
  const style = document.createElement('style');
  style.textContent = `@keyframes pulse { from {opacity: 0.7;} to {opacity: 1;} }`;
  document.head.appendChild(style);
  guide.style.animation = 'pulse 4s infinite alternate ease-in-out';

  // Guide speak
  guide.addEventListener('click', () => speak('At your service, Commander'));
  guide.addEventListener('keydown', e => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), guide.click()));

  // Enter portfolio
  enterBtn.addEventListener('click', () => {
    intro.classList.add('hidden');
    document.body.style.overflowY = 'auto';
    window.scrollTo({ top: 0, behavior: 'smooth' });
    speak('Portfolio unlocked');
  });

  // Eye tracking
  const eyes = document.querySelectorAll('.eye');
  let lastEvent = null;
  window.addEventListener('mousemove', e => lastEvent = e);
  function trackEyes() {
    if (lastEvent) {
      eyes.forEach(eye => {
        const rect = eye.getBoundingClientRect();
        const ex = rect.left + rect.width / 2;
        const ey = rect.top + rect.height / 2;
        const angle = Math.atan2(lastEvent.clientY - ey, lastEvent.clientX - ex) * 180 / Math.PI;
        eye.style.transform = `rotate(${angle}deg)`;
      });
      lastEvent = null;
    }
    requestAnimationFrame(trackEyes);
  }
  requestAnimationFrame(trackEyes);

  // Battle mode (classic mecha)
  const toggleBattle = () => {
    mecha.classList.toggle('battle');
    new Audio('https://assets.mixkit.co/sfx/preview/mixkit-sci-fi-energy-surge-1265.mp3').play().catch(() => {});
  };
  mecha.addEventListener('click', toggleBattle);
  mecha.addEventListener('keydown', e => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), toggleBattle()));

  // KONAMI CODE → ULTRA INSTINCT CHIBI
  let code = [];
  const secret = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
  
  document.addEventListener('keydown', e => {
    code.push(e.key);
    if (code.length > 10) code.shift();

    if (code.join() === secret.join()) {
      speak('EVOLUTION DETECTED...');

      // Fade out classic mecha
      mecha.style.transition = 'all 1.4s ease';
      mecha.style.opacity = '0';
      mecha.style.transform = 'scale(0.7) translateY(100px)';

      // Awaken Ultra Chibi
      setTimeout(() => {
        mecha.style.display = 'none';
        const ultra = document.getElementById('ultra-chibi');
        ultra.classList.add('revealed');
        ultra.setAttribute('aria-hidden', 'false');

        speak('ULTRA INSTINCT CHIBI — AWAKENED');
        new Audio('https://assets.mixkit.co/sfx/preview/mixkit-arcade-futuristic-bass-231.mp3').play().catch(() => {});

        // Download resume
        fetch('resume.pdf', { method: 'HEAD' }).then(res => {
          if (res.ok) {
            const a = document.createElement('a');
            a.href = 'resume.pdf';
            a.download = 'ShubhamG_Resume_ULTRA.pdf';
            document.body.appendChild(a);
            a.click();
            a.remove();
          } else {
            speak('Resume missing!');
          }
        });
      }, 1500);

      code = [];
    }
  });

  // Speech function
  function speak(text) {
    speech.textContent = text;
    speech.style.opacity = '1';
    setTimeout(() => speech.style.opacity = '0', 4000);
  }
});