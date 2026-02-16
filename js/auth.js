(function() {
  var PASSWORD_HASH = 'a5987c4ce0e434bc564ff2dbec25f2c1c50214285f49cfee2b0d57eaae21e660';

  if (sessionStorage.getItem('authenticated') === 'true') {
    return;
  }

  document.documentElement.style.display = 'none';

  function sha256(str) {
    var encoder = new TextEncoder();
    return crypto.subtle.digest('SHA-256', encoder.encode(str)).then(function(buf) {
      return Array.from(new Uint8Array(buf))
        .map(function(b) { return b.toString(16).padStart(2, '0'); })
        .join('');
    });
  }

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
      sha256(pw).then(function(hash) {
        if (hash === PASSWORD_HASH) {
          sessionStorage.setItem('authenticated', 'true');
          location.reload();
        } else {
          document.getElementById('login-error').textContent = 'Incorrect password. Please try again.';
        }
      });
    });

    document.getElementById('login-password').focus();
  });
})();
