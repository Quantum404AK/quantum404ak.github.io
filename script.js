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

  function swapContactImages(isDark) {
    var section = document.getElementById('contact');
    if (!section) return;
    var images = section.querySelectorAll('img');
    images.forEach(function (img) {
      if (isDark) {
        img.src = img.src.replace('_light.', '_dark.');
      } else {
        img.src = img.src.replace('_dark.', '_light.');
      }
    });
  }

  /* Apply 'light-mode' class based on a boolean */
  function applyDark(isDark) {
    if (isDark) {
      document.body.classList.remove('light-mode');
    } else {
      document.body.classList.add('light-mode');
    }
    swapContactImages(isDark);
  }

  /* Resolve the effective dark/light from the stored preference */
  function resolveTheme(pref) {
    if (pref === 'light') return false;
    if (pref === 'dark')  return true;
    /* system: follow OS preference */
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  var systemQuery = window.matchMedia('(prefers-color-scheme: dark)');
  var saved = getCookie('theme') || 'dark';

  document.addEventListener('DOMContentLoaded', function () {
    var select = document.getElementById('theme-select');

    /* Set dropdown to saved preference */
    if (select) select.value = saved;

    /* Apply on load */
    applyDark(resolveTheme(saved));

    /* Listen for OS-level changes when preference is 'system' */
    systemQuery.addEventListener('change', function () {
      var current = getCookie('theme') || 'dark';
      if (current === 'system') {
        applyDark(systemQuery.matches);
      }
    });

    /* React to dropdown changes */
    if (select) {
      select.addEventListener('change', function () {
        var newPref = select.value;
        setCookie('theme', newPref, 365);
        applyDark(resolveTheme(newPref));
      });
    }
  });
})();
