var close_time; // 시간 정보
var close_time2 = 10; // 10초 설정

clearTimeout(close_time); // 재호출 정지	//무한루프이기 때문 해당값이 발생하는 순간 정지
							//주의해서 만들어야함 왜냐하면 백그라운드에서도 계속 돌아갈수있음 js엔진이
close_time= setTimeout("close_window()", 10000);  // 1/1000 초 지정, 바로 시작 setTimeout 많이 사용함
show_time(); // 실시간 시간 보여주기

function show_time(){
        let divClock = document.getElementById('Time');
        divClock.innerText = close_time2; // 10초 삽입 시작
        close_time2--; // 1초씩 감소
    setTimeout(show_time, 1000);  //1초마다 갱신
}

function close_window() { // 함수 정의
   window.close(); // 윈도우 닫기
}

window.onload=showWindow;
