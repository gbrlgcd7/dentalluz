/* ==========================================================================
   DentalLuz — Main JavaScript
   ========================================================================== */

/* --------------------------------------------------------------------------
   Vagas — contador persistente com localStorage
   -------------------------------------------------------------------------- */
(function () {
  var CHAVE = 'dv_vagas';
  var atual = parseInt(localStorage.getItem(CHAVE), 10);

  if (isNaN(atual)) {
    atual = 3;
  } else {
    atual = Math.max(1, atual - 1);
  }

  localStorage.setItem(CHAVE, atual);

  document.querySelectorAll('#vagas-count, #vagas-hero').forEach(function (el) {
    if (el) el.textContent = atual;
  });

  var vagasLabel = document.getElementById('vagas-label');
  if (vagasLabel) {
    vagasLabel.textContent = atual <= 1 ? '🔴 Última vaga!' : 'Reserve o seu horário.';
  }
})();

/* --------------------------------------------------------------------------
   Formulário — envio via WhatsApp
   -------------------------------------------------------------------------- */
function handleSubmit(e) {
  e.preventDefault();
  var nome      = document.getElementById('nome').value;
  var numero    = document.getElementById('whatsapp').value;
  var tratamento = document.getElementById('interesse').value;
  var mensagem  = 'Olá! Meu nome é ' + nome +
                  '. Gostaria de agendar uma avaliação gratuita de ' + tratamento +
                  '. Meu WhatsApp é ' + numero + '.';
  window.open('https://wa.me/5511998724431?text=' + encodeURIComponent(mensagem), '_blank');
}

/* --------------------------------------------------------------------------
   Nav — hamburguer (mobile)
   -------------------------------------------------------------------------- */
(function () {
  var burger = document.getElementById('nav-burger');
  var links  = document.getElementById('nav-links');
  if (!burger || !links) return;

  burger.addEventListener('click', function () {
    var open = links.classList.toggle('open');
    burger.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });

  // Fecha ao clicar em um link
  links.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      links.classList.remove('open');
      burger.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });
})();

/* --------------------------------------------------------------------------
   Nav — compactar ao rolar
   -------------------------------------------------------------------------- */
window.addEventListener('scroll', function () {
  var nav = document.querySelector('nav');
  if (!nav) return;
  var isMobile = window.innerWidth <= 900;
  var pad = isMobile ? '12px 24px' : (window.scrollY > 50 ? '12px 40px' : '18px 40px');
  nav.style.padding = pad;
});

/* --------------------------------------------------------------------------
   Fade-up — elementos genéricos
   -------------------------------------------------------------------------- */
var fadeObserver = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.15 });

document.querySelectorAll('.fade-up').forEach(function (el) {
  fadeObserver.observe(el);
});

/* --------------------------------------------------------------------------
   Cards de dor — entrada sequencial
   -------------------------------------------------------------------------- */
var dorSection = document.querySelector('section[style*="background:var(--white)"]');
var dorCards   = document.querySelectorAll('.dor-card');
var dorDelays  = [0, 150, 300];

var dorObserver = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      dorCards.forEach(function (card, i) {
        setTimeout(function () {
          card.style.opacity   = '1';
          card.style.transform = 'translateY(0)';
        }, dorDelays[i]);
      });
      dorObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

if (dorSection) dorObserver.observe(dorSection);

/* --------------------------------------------------------------------------
   Linha azul dos cards de dor — animação de entrada
   -------------------------------------------------------------------------- */
var linhas = document.querySelectorAll('.dor-linha');

var linhaObserver = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.style.width   = '100%';
      entry.target.style.opacity = '1';
      linhaObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

linhas.forEach(function (el) { linhaObserver.observe(el); });

/* --------------------------------------------------------------------------
   Diferenciais — entrada sequencial ao rolar
   -------------------------------------------------------------------------- */
var difCards = document.querySelectorAll('.diferencial-card');

var difObserver = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      difCards.forEach(function (card, i) {
        setTimeout(function () {
          card.classList.add('dif-visible');
        }, i * 120);
      });
      difObserver.disconnect();
    }
  });
}, { threshold: 0.15 });

if (difCards.length) {
  difObserver.observe(difCards[0].closest('section'));
}
