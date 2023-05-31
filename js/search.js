document.getElementById("search_btn").addEventListener('click', search_message);

var search_array = []; // 빈 배열 – 전역 변수
var filtered_words = ["비속어1", "비속어2", "비속어3"]; // 필터링할 문자열 배열
var max_searches = 10; // 최대 검색어 수

function search_message() {
   let search_str = document.querySelector("#search_txt");
   if (search_str.value.length === 0) {
      alert("검색어가 비었습니다. 입력해주세요"); 
   } else {
      if (hasFilteredWord(search_str.value)) {
         alert("검색어에 비속어가 포함되어 있습니다. 검색을 중단합니다.");
         return; // 검색 중단
      }
      
      alert("검색을 수행합니다!");
      search_array.push(search_str.value); // 배열에 검색어 추가

      if (search_array.length > max_searches) {
         search_array.shift(); // 배열의 첫 번째 요소 제거 (가장 오래된 검색어)
      }

      let text = document.getElementById("search_message").innerHTML = search_array.toString(); // 값 변환
      document.querySelector("#form_main").submit();
   }
}

function hasFilteredWord(searchStr) {
   for (let i = 0; i < filtered_words.length; i++) {
      if (searchStr.includes(filtered_words[i])) {
         return true;
      }
   }
   return false;
}
