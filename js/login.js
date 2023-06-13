function addJavascript(jsname) { // 자바스크립트 외부 연동
	var th = document.getElementsByTagName('head')[0];
	var s = document.createElement('script');
	s.setAttribute('type','text/javascript');
	s.setAttribute('src',jsname);
	th.appendChild(s);
}
addJavascript('/js/security.js'); // 암복호화 함수
addJavascript('/js/session.js'); // 세션 함수
addJavascript('/js/cookie.js'); // 쿠키 함수

function init(){ // 로그인 폼에 쿠키에서 가져온 아이디 입력
    let id = document.querySelector("#floatingInput");
    let check = document.querySelector("#idSaveCheck");
    let get_id = getCookie("id");
   
    if(get_id) { 
    id.value = get_id; 
    check.checked = true; 
    }
	session_check(); // 세션 유무 검사
}

function login() {
    let form = document.querySelector("#form_main");
    let id = document.querySelector("#floatingInput");
    let password = document.querySelector("#floatingPassword");
    let check = document.querySelector("#idSaveCheck");

    form.action = "login/index_login.html";
    form.method = "get";

    if (check.checked == true) {
        alert("쿠키를 저장합니다.");
        setCookie("id", id.value, 1); // 1일 저장
        alert("쿠키 값 :" + id.value);
    } else {
        setCookie("id", id.value, 0); // 날짜를 0 - 쿠키 삭제
    }

    if (id.value.length === 0 || password.value.length === 0) {
        alert("아이디와 비밀번호를 모두 입력해주세요.");
    } else {
        if (login_check()) {
            login_count(); // 로그인 횟수 카운팅
            if (getCookie("login_cnt") >= 3) {
                alert("로그인 제한됩니다.");
                return; // 로그인 제한되면 함수 종료
            }
            session_set(); // 세션 생성
            form.submit();
        }
    }
}


function logout(){
	logout_count(); 
    session_del(); // 세션 삭제
    location.href='../index.html';
}
function login_check(){
    let id = document.querySelector("#floatingInput");
    let password = document.querySelector("#floatingPassword");
    
    let reg = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/;
    let regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
    if(regex.test(id.value)){
    	if(reg.test(password.value)){
            return true;
        }
        else{
            alert("영문 숫자 특수기호 조합 8자리 이상으로 비밀번호를 입력해주세요.");
            return false;
            }
    }
    else{
        alert("@example.com 이메일 주소를 포함해서 입력해주세요");
        return false;
        }
}
function get_id(){
    if(true){
        decrypt_text();
    }
    else{
    var getParameters = function(paramName){ // 변수 = 함수(이름)
    var returnValue; // 리턴값을 위한 변수 선언
    var url = location.href; // 현재 접속 중인 주소 정보 저장
    var parameters = (url.slice(url.indexOf('?') + 1, url.length)).split('&'); // ?기준 slice 한 후 split 으로 나눔
        for(var i = 0; i < parameters.length; i++) { 
		    var varName = parameters[i].split('=')[0];
            
            if (varName.toUpperCase() == paramName.toUpperCase()) {
                returnValue = parameters[i].split('=')[1];
                return decodeURIComponent(returnValue);
            // 나누어진 값의 비교를 통해 paramName 으로 요청된 데이터의 값만 return
		    }
	    } // 2중 for문 끝
}; // 함수 끝
alert(getParameters('id') + '님 반갑습니다아아!'); // 메시지 창 출력
	}
}


function login_count() {
  var cnt = getCookie("login_cnt");
  if (cnt === "") {
    setCookie("login_cnt", 1, 1);
  } else {
    setCookie("login_cnt", Number(cnt) + 1, 1);
  }
}

function logout_count() { // 로그아웃 횟수 체크
  let cnt = getCookie("logout_cnt");
  if(cnt == "") {
    setCookie("logout_cnt", 1, 1);
  }
  else {
    setCookie("logout_cnt", Number(cnt)+1, 1);
  }
}


function displayCounts() {
  let loginCnt = getCookie("login_cnt");
  let logoutCnt = getCookie("logout_cnt");

  let loginCountElem = document.getElementById("loginCount");
  let logoutCountElem = document.getElementById("logoutCount");

  loginCountElem.textContent = "로그인 횟수: " + loginCnt;
  logoutCountElem.textContent = "로그아웃 횟수: " + logoutCnt;
}