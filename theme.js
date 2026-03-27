(function () {
  function getCookie(name) {
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
      var parts = cookies[i].trim().split('=');
      if (parts[0] === name) return parts[1];
    }
    return null;
  }

  function setCookie(name, value, days) {
    var expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = name + '=' + value + '; expires=' + expires + '; path=/';
  }

  function applyTheme(mode) {
    var btn = document.getElementById('theme-toggle');
    if (mode === 'light') {
      document.body.classList.add('light-mode');
      if (btn) btn.textContent = '☀️';
    } else {
      document.body.classList.remove('light-mode');
      if (btn) btn.textContent = '🌙';
    }
  }

  var saved = getCookie('theme');
  var currentTheme = saved || 'dark';

  document.addEventListener('DOMContentLoaded', function () {
    applyTheme(currentTheme);

    var btn = document.getElementById('theme-toggle');
    if (btn) {
      btn.addEventListener('click', function () {
        var isLight = document.body.classList.contains('light-mode');
        var newTheme = isLight ? 'dark' : 'light';
        applyTheme(newTheme);
        setCookie('theme', newTheme, 365);
      });
    }
  });
})();
