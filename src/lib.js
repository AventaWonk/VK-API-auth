import $ from 'jquery';

export function login() {
  let id = "6149824";
  let redirectUri = "https://thevkapitest.herokuapp.com";
  // let id = "6148410";
  // let redirectUri = "http://localhost:3000";
  window.location = "https://oauth.vk.com/authorize?client_id="+id+"&display=page&redirect_uri="+redirectUri+"&scope=friends&response_type=token&v=5.67&state=123456";
}

export function logout() {
  document.cookie = 'user=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  document.cookie = 'at=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

export function getUserInformation() {
  checkAuthGet();

  let auth = {
    isAuth: false,
    userName: null,
    token: null,
    getUserData: callback => {
      $.ajax({
        url: `https://api.vk.com/method/users.get?fields=city,photo_50,domain&v=5.67&access_token=${auth.token}`,
        type: "GET",
        dataType: "jsonp",
        success: callback
      });
    },
    getUserFriends: (count, callback) => {
      $.ajax({
        url: `https://api.vk.com/method/friends.get?fields=city,photo_200,domain&count=${count}&v=5.67&access_token=${auth.token}`,
        type: "GET",
        dataType: "jsonp",
        success: callback
      });
    }
  }
  let token = getCookie("at");
  if (token) {
    auth.isAuth = true;
    auth.userName = getCookie("user");
    auth.token = token;
  }
  return auth;
}

function getQueryParam(param) {
  let reg = new RegExp(param+"=\\w+&");
  let query = reg.exec(window.location.hash);
  return query[0].substring(param.length + 1, query[0].length - 1);
}

function checkAuthGet() {
  if (window.location.hash) {
    let accessToken = getQueryParam("access_token");
    let userId = getQueryParam("user_id");
    let expiresIn = getQueryParam("expires_in");
    setCookie("user", userId, expiresIn);
    setCookie("at", accessToken, expiresIn);
    window.location.hash = "";
  }
}

function getCookie(name) {
  var matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

function setCookie(name, value, lifeTime) {
  let date = new Date();
  date.setTime(date.getTime() + lifeTime * 1000);
  let cookie = `${name}=${value}; expires=${date.toUTCString()}`;
  document.cookie = cookie;
}
