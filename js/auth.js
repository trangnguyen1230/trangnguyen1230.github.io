(function() {
  var SITE_PASSWORD = 'trang2026';

  if (sessionStorage.getItem('authenticated') === 'true') {
    return;
  }

  document.documentElement.style.display = 'none';

  document.addEventListener('DOMContentLoaded', function() {
    document.documentElement.style.display = '';
    document.body.innerHTML =
      '<div class="login-gate">' +
        '<h1>Trang Nguyen</h1>' +
        '<p>This site is password protected.</p>' +
        '<form id="login-form">' +
          '<input type="password" id="login-password" placeholder="Enter password" autocomplete="off">' +
          '<button type="submit" class="btn">Enter</button>' +
        '</form>' +
        '<div id="login-error" class="error"></div>' +
      '</div>';

    document.getElementById('login-form').addEventListener('submit', function(e) {
      e.preventDefault();
      var pw = document.getElementById('login-password').value;
      if (pw === SITE_PASSWORD) {
        sessionStorage.setItem('authenticated', 'true');
        location.reload();
      } else {
        document.getElementById('login-error').textContent = 'Incorrect password. Please try again.';
      }
    });

    document.getElementById('login-password').focus();
  });
})();
