var Session;

class Sess {
  
  constructor() {
    this.header = 'MyAppName-User';
  }
  
  create(resp) {
    var token = resp.headers[this.header];
    
    if (token) {
      this.setCookie(this.header, token);
    } else {
      console.warn('Not creating session -- no token provided');
    }
  }
  
  authed() {
    return !!this.getCookie(this.header);
  }
  
  setCookie(name, value, days) {
    days = days || 30;
    var date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    var expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + "; " + expires;
  }

  getCookie(name) {
    name = (name + '=') || '=';
    var cookies = document.cookie.split(';');

    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i];

      while (cookie.charAt(0) === ' ') {
        cookie = cookie.substring(1);
      }

      if (cookie.indexOf(name) === 0) {
        return cookie.substring(name.length, cookie.length);
      }
    }

    return '';
  }
}

function getInstance() {
  if (!Session) {
    Session = new Sess();
  }
  
  return Session;
}

export default getInstance();