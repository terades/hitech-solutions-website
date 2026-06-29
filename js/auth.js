(function () {
  var ENABLED = '__ENABLE_AUTH__';
  var HASH    = '__AUTH_PASSWORD_HASH__';
  var KEY     = 'hitech_auth';
  var DAYS    = 30;
  var MAX     = 5;
  var LOCK_MS = 15 * 60 * 1000;
  var K_TRIES = KEY + '_tries';
  var K_LOCK  = KEY + '_lock';

  if (ENABLED !== 'true') return;

  // Legal pages must be publicly accessible (TMG §5 / DSGVO)
  if (/\/(impressum|datenschutz|cookies)\.html(\?.*)?$/.test(window.location.pathname)) return;

  // Valid session → nothing to do
  try {
    var s = JSON.parse(localStorage.getItem(KEY) || 'null');
    if (s && s.expires > Date.now()) return;
  } catch (e) {}
  localStorage.removeItem(KEY);

  // Hide body immediately before DOMContentLoaded to prevent content flash
  document.documentElement.classList.add('auth-locked');

  document.addEventListener('DOMContentLoaded', function () {
    var overlay = document.createElement('div');
    overlay.id = 'auth-overlay';
    document.body.appendChild(overlay);
    render();

    function lockExpiry() {
      var v = parseInt(localStorage.getItem(K_LOCK) || '0', 10);
      if (v && Date.now() > v) {
        localStorage.removeItem(K_LOCK);
        localStorage.removeItem(K_TRIES);
        return 0;
      }
      return v;
    }

    function tries() {
      return parseInt(localStorage.getItem(K_TRIES) || '0', 10);
    }

    function render() {
      var lock = lockExpiry();
      if (lock) {
        renderLocked(lock);
      } else {
        renderForm();
      }
    }

    function renderLocked(until) {
      overlay.innerHTML =
        '<div id="auth-box">' +
          '<img src="/assets/logo-schrift.webp" alt="HI-Tech Solutions" id="auth-logo">' +
          '<p id="auth-hint">Zu viele Fehlversuche.</p>' +
          '<p id="auth-lockout">Zugang gesperrt &mdash; bitte warte <strong id="auth-cd"></strong>.</p>' +
        '</div>';

      function tick() {
        var rem = lockExpiry();
        if (!rem) { render(); return; }
        var s = Math.ceil((rem - Date.now()) / 1000);
        var el = document.getElementById('auth-cd');
        if (el) el.textContent = Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0') + ' Min';
      }
      tick();
      var t = setInterval(function () {
        if (!lockExpiry()) { clearInterval(t); render(); } else { tick(); }
      }, 1000);
    }

    function renderForm() {
      var n = tries();
      var rem = MAX - n;
      var hint = n > 0
        ? 'Noch ' + rem + ' Versuch' + (rem !== 1 ? 'e' : '') + ' vor der Sperre.'
        : 'Bitte melde dich an, um fortzufahren.';
      overlay.innerHTML =
        '<div id="auth-box">' +
          '<img src="/assets/logo-schrift.webp" alt="HI-Tech Solutions" id="auth-logo">' +
          '<p id="auth-hint">' + hint + '</p>' +
          '<form id="auth-form" novalidate>' +
            '<input type="password" id="auth-input" placeholder="Passwort"' +
              ' autocomplete="current-password" required>' +
            '<button type="submit">Anmelden</button>' +
          '</form>' +
          '<p id="auth-error" hidden>Falsches Passwort &mdash; bitte erneut versuchen.</p>' +
        '</div>';

      document.getElementById('auth-input').focus();

      document.getElementById('auth-form').addEventListener('submit', function (e) {
        e.preventDefault();
        var pwd = document.getElementById('auth-input').value;
        sha256(pwd).then(function (h) {
          if (h === HASH) {
            localStorage.removeItem(K_TRIES);
            localStorage.removeItem(K_LOCK);
            localStorage.setItem(KEY, JSON.stringify({ expires: Date.now() + DAYS * 864e5 }));
            document.documentElement.classList.remove('auth-locked');
            overlay.remove();
          } else {
            var count = tries() + 1;
            localStorage.setItem(K_TRIES, String(count));
            if (count >= MAX) {
              localStorage.setItem(K_LOCK, String(Date.now() + LOCK_MS));
              render();
            } else {
              var err = document.getElementById('auth-error');
              if (err) err.hidden = false;
              var inp = document.getElementById('auth-input');
              if (inp) {
                inp.value = '';
                inp.focus();
                inp.classList.add('auth-shake');
                setTimeout(function () { inp.classList.remove('auth-shake'); }, 500);
              }
              var hintEl = document.getElementById('auth-hint');
              var left = MAX - count;
              if (hintEl) hintEl.textContent = 'Noch ' + left + ' Versuch' + (left !== 1 ? 'e' : '') + ' vor der Sperre.';
            }
          }
        });
      });
    }

    function sha256(str) {
      var buf = new TextEncoder().encode(str);
      return crypto.subtle.digest('SHA-256', buf).then(function (hashBuffer) {
        return Array.from(new Uint8Array(hashBuffer))
          .map(function (b) { return b.toString(16).padStart(2, '0'); })
          .join('');
      });
    }
  });
})();
