(function () {
  var ENABLED = '__ENABLE_AUTH__';
  var HASH = '__AUTH_PASSWORD_HASH__';
  var KEY = 'hitech_auth';
  var DAYS = 30;

  if (ENABLED !== 'true') return;

  var stored = localStorage.getItem(KEY);
  if (stored) {
    try {
      var data = JSON.parse(stored);
      if (data.expires > Date.now()) return;
    } catch (e) {}
    localStorage.removeItem(KEY);
  }

  document.documentElement.classList.add('auth-locked');

  document.addEventListener('DOMContentLoaded', function () {
    var overlay = document.createElement('div');
    overlay.id = 'auth-overlay';
    overlay.innerHTML =
      '<div id="auth-box">' +
        '<img src="/assets/logo-schrift.webp" alt="HI-Tech Solutions" id="auth-logo">' +
        '<p id="auth-hint">Bitte melde dich an, um fortzufahren.</p>' +
        '<form id="auth-form" novalidate>' +
          '<input type="password" id="auth-input" placeholder="Passwort" autocomplete="current-password" required>' +
          '<button type="submit">Anmelden</button>' +
        '</form>' +
        '<p id="auth-error" hidden>Falsches Passwort &mdash; bitte erneut versuchen.</p>' +
      '</div>';

    document.body.appendChild(overlay);
    document.getElementById('auth-input').focus();

    document.getElementById('auth-form').addEventListener('submit', function (e) {
      e.preventDefault();
      var pwd = document.getElementById('auth-input').value;
      sha256(pwd).then(function (hash) {
        if (hash === HASH) {
          localStorage.setItem(KEY, JSON.stringify({ expires: Date.now() + DAYS * 864e5 }));
          document.documentElement.classList.remove('auth-locked');
          overlay.remove();
        } else {
          var err = document.getElementById('auth-error');
          err.hidden = false;
          var input = document.getElementById('auth-input');
          input.value = '';
          input.focus();
          input.classList.add('auth-shake');
          setTimeout(function () { input.classList.remove('auth-shake'); }, 500);
        }
      });
    });
  });

  function sha256(str) {
    var buf = new TextEncoder().encode(str);
    return crypto.subtle.digest('SHA-256', buf).then(function (hashBuffer) {
      return Array.from(new Uint8Array(hashBuffer))
        .map(function (b) { return b.toString(16).padStart(2, '0'); })
        .join('');
    });
  }
})();
