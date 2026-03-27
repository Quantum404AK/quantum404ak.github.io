(function () {
  var OPTIONS = [
    { value: 'dark',   label: '🌙 Dark' },
    { value: 'light',  label: '☀️ Light' },
    { value: 'system', label: '💻 System' }
  ];

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
    section.querySelectorAll('img').forEach(function (img) {
      if (isDark) {
        img.src = img.src.replace('_light.', '_dark.');
      } else {
        img.src = img.src.replace('_dark.', '_light.');
      }
    });
  }

  function applyDark(isDark) {
    if (isDark) {
      document.body.classList.remove('light-mode');
    } else {
      document.body.classList.add('light-mode');
    }
    swapContactImages(isDark);
  }

  var systemQuery = window.matchMedia('(prefers-color-scheme: dark)');

  function resolveTheme(pref) {
    if (pref === 'light')  return false;
    if (pref === 'dark')   return true;
    return systemQuery.matches; /* system */
  }

  function indexOfPref(pref) {
    for (var i = 0; i < OPTIONS.length; i++) {
      if (OPTIONS[i].value === pref) return i;
    }
    return 0;
  }

  /* ── Dropdown logic ── */
  var currentPref = getCookie('theme') || 'dark';

  document.addEventListener('DOMContentLoaded', function () {
    var dropdown = document.getElementById('theme-dropdown');
    var label    = document.getElementById('theme-dd-label');
    var menu     = dropdown ? dropdown.querySelector('.theme-dd-menu') : null;
    var items    = menu ? menu.querySelectorAll('li') : [];

    /* Update displayed label and active item highlight */
    function updateDisplay(pref) {
      var idx = indexOfPref(pref);
      if (label) label.textContent = OPTIONS[idx].label;
      items.forEach(function (li) {
        li.classList.toggle('active', li.dataset.value === pref);
      });
      /* Also update dropdown background colour in light mode */
    }

    /* Select a new preference */
    function selectPref(pref) {
      currentPref = pref;
      setCookie('theme', pref, 365);
      applyDark(resolveTheme(pref));
      updateDisplay(pref);
    }

    /* Open / close */
    function openMenu()  { if (dropdown) dropdown.classList.add('open'); }
    function closeMenu() { if (dropdown) dropdown.classList.remove('open'); }
    function toggleMenu() {
      if (dropdown) dropdown.classList.toggle('open');
    }

    /* Apply on load */
    applyDark(resolveTheme(currentPref));
    updateDisplay(currentPref);

    if (!dropdown) return;

    /* Click on pill → toggle menu */
    dropdown.querySelector('.theme-dd-selected').addEventListener('click', function (e) {
      e.stopPropagation();
      toggleMenu();
    });

    /* Click on an option */
    items.forEach(function (li) {
      li.addEventListener('click', function (e) {
        e.stopPropagation();
        selectPref(li.dataset.value);
        closeMenu();
      });
    });

    /* Scroll wheel cycles through options */
    dropdown.addEventListener('wheel', function (e) {
      e.preventDefault();
      var idx = indexOfPref(currentPref);
      if (e.deltaY > 0) {
        idx = (idx + 1) % OPTIONS.length;      /* scroll down → next */
      } else {
        idx = (idx - 1 + OPTIONS.length) % OPTIONS.length; /* scroll up → prev */
      }
      selectPref(OPTIONS[idx].value);
    }, { passive: false });

    /* Close when clicking outside */
    document.addEventListener('click', function () {
      closeMenu();
    });

    /* Keyboard: Escape closes, arrow keys cycle */
    dropdown.addEventListener('keydown', function (e) {
      var idx = indexOfPref(currentPref);
      if (e.key === 'Escape') { closeMenu(); }
      if (e.key === 'ArrowDown')  { selectPref(OPTIONS[(idx + 1) % OPTIONS.length].value); }
      if (e.key === 'ArrowUp')    { selectPref(OPTIONS[(idx - 1 + OPTIONS.length) % OPTIONS.length].value); }
      if (e.key === 'Enter' || e.key === ' ') { toggleMenu(); }
    });

    /* React to OS-level changes when preference is 'system' */
    systemQuery.addEventListener('change', function () {
      if (currentPref === 'system') {
        applyDark(systemQuery.matches);
      }
    });
  });
})();
