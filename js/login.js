function login() {
  let form = document.querySelector("#form_main");
  let id = document.querySelector("#floatingInput");
  let password = document.querySelector("#floatingPassword");
  let check = document.querySelector("#idSaveCheck");

  form.action = "login/index_login.html";
  form.method = "get";

  if (check.checked === true) { // 아이디 체크 o
    alert("쿠키를 저장합니다.");
    setCookie("id", id.value, 1); // 1일 저장
    alert("쿠키 값 :" + id.value);
  } else { // 아이디 체크 x
    setCookie("id", id.value, 0); // 날짜를 0 - 쿠키 삭제
  }

  if (id.value.trim().length === 0 && password.value.trim().length === 0) {
    alert("아이디와 비밀번호를 모두 입력해주세요.");
    return false; // 입력값이 공백이면 함수 종료
  } else if (id.value.trim().length === 0) {
    alert("아이디를 입력해주세요.");
    return false; // 아이디가 공백이면 함수 종료
  } else if (password.value.trim().length === 0) {
    alert("비밀번호를 입력해주세요.");
    return false; // 비밀번호가 공백이면 함수 종료
  }

  if (!login_check(id.value)) {
    alert("올바른 이메일 형식이 아닙니다.");
    return false; // 이메일 형식이 올바르지 않으면 함수 종료
  }

  if (!test(password.value)) {
    alert("비밀번호 형식이 올바르지 않습니다.");
    return false; // 비밀번호 형식이 올바르지 않으면 함수 종료
  }

  session_set(); // 세션 생성
  form.submit();

  return false; // 폼 제출 방지
	login_count();
}

function login_check(id) {
  // Email format regular expression
  var emailRegex = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
  return emailRegex.test(id);
}

function test(password) {
  // Password format regular expression
  var passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{10,}$/;
  return passwordRegex.test(password);
}

function init() { // 로그인 폼에 쿠키에서 가져온 아이디 입력
  let id = document.querySelector("#floatingInput");
  let check = document.querySelector("#idSaveCheck");
  let get_id = getCookie("id");

  if (get_id) {
    id.value = get_id;
    check.checked = true;
  }
}

function get_id() {
  var getParameters = function (paramName) {
    var returnValue;
    var url = location.href;
    var parameters = (url.slice(url.indexOf('?') + 1, url.length)).split('&');
    for (var i = 0; i < parameters.length; i++) {
      var varName = parameters[i].split('=')[0];

      if (varName.toUpperCase() == paramName.toUpperCase()) {
        returnValue = parameters[i].split('=')[1];
        return decodeURIComponent(returnValue);
      }
    }
  };

  var id = getParameters('id');
  alert(id + '님 방갑습니다!'); // 메시지 창 출력
}

function login_count() {
  var loginCnt = getCookie("login_cnt");
  if (loginCnt) {
    loginCnt = parseInt(loginCnt) + 1;
  } else {
    loginCnt = 1;
  }
  setCookie("login_cnt", loginCnt, 365); // 1년 동안 저장
}
function logout_count() {
  var logoutCnt = getCookie("logout_cnt");
  if (logoutCnt) {
    logoutCnt = parseInt(logoutCnt) + 1;
  } else {
    logoutCnt = 1;
  }
  setCookie("logout_cnt", logoutCnt, 365); // 1년 동안 저장
}



function addJavascript(jsname) { // 자바스크립트 외부 연동
   var th = document.getElementsByTagName('head')[0];
   var s = document.createElement('script');
   s.setAttribute('type','text/javascript');
   s.setAttribute('src',jsname);
   th.appendChild(s);
}
addJavascript('../js/security.js'); // 암복호화 함수
addJavascript('../js/session.js'); // 세션 함수
addJavascript('../js/cookie.js'); // 쿠키 함수