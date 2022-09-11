var num = 1; //문제 번호
//문제 정보 객체
var q = {
    1: { "title": "문득 여행이 가고 싶어진 당신! 당신이 정한 여행 메이트는?", "type": "EI", "A": "자신이 속한 팀 또는 단체", "B": "홀로 여행 또는 정말 편한 사람 한 두명" },
    2: { "title": "여행지를 고민하는 당신! 여행의 주 된 지역을 결정 하고자 하는데", "type": "SN", "A": "이전에 감명 깊게 가봤던 곳을 선택한다.", "B": "한 번도 가보지 못한 곳을 선택한다." },
    3: { "title": "여행 매이트와 계획을 의논하는 당신! 어떤 계획을 짤까?", "type": "JP", "A": "흠, 이 지역 맛집을 가자고 했으니깐 어느 관광지를 다녀오면서 가볼까?", "B": "바다 여행이니깐 바다만 봐도 충분하지~" },
    4: { "title": "금강산도 식후경! 여행지 맛집 음식점을 찾고자 하는데...", "type": "SN", "A": "같은 여행지에 다녀온 친구에게 연락하여 맛집 정보를 얻는다.", "B": "검색 사이트를 이용하여 리뷰를 모두 훑어본 후 맛집을 정한다." },
    5: { "title": "식당에 들어간 당신! 자리가 없어 합석을 하거나 기다려야 하는데...", "type": "EI", "A": "합석 OK, 여행지에서 새로운 친구를 만날 수 있지 않을까?", "B": "합석X, 새로운 사람을 알아가는 것 보단 여행 매이트와 맛있는 식사를 하고 싶어." },
    6: { "title": "바닷가의 주상절리를 감상하는 당신! 어떤 생각을 먼저 하게 될까?", "type": "TF", "A": "와, 용암이 굳으면서 이런 형태를 만들 수 있다니. 정말 엄청나다.", "B": "와, 파도가 주상절리에 부딪히는 모습이 너무 아름답다." },
    7: { "title": "목적지로 이동 중인 당신! 앞쪽으로 사람들이 줄 서있는 가게가 눈에 띤다! ", "type": "JP", "A": "일단 목적지로 이동하고 한 번 검색해보자!", "B": "얼마나 맛있길래 사람이 많을까? 한 번 들려보자!" },
    8: { "title": "관광지 구경 중 잠시 쉬어 가고자 하는 당신! 가격, 맛 평은 비슷한 카페 두 곳 중 어느 곳으로 들어갈까?", "type": "EI", "A": "사람이 많은 카페. 사람이 많은 곳엔 그만한 이유가 있겠지.", "B": "사람이 적고 조용한 카페. 맛, 가격이 비슷하면 조용한 곳이 좋지." },
    9: { "title": "여행 중에 여행 메이트와 싸운 당신! 어떻게 화해를 하면 좋을까?", "type": "TF", "A": "내가 이런저런 행동을 잘못한 것 같아... 미안해.", "B": "내가 말이 너무 심해서 네 마음이 상했을 것 같아... 미안해." },
    10: { "title": "저녁을 먹고 마무리 정리를 하는 당신! 메이트와 어떤 이야기를 나눌까?", "type": "SN", "A": "오늘 감명 깊게 느꼈던 여행지를 이야기 한다.", "B": "내일 일정에 대한 이야기를 나눈다." },
    11: { "title": "문제 11번", "type": "JP", "A": "J", "B": "P" },
    12: { "title": "문제 12번", "type": "TF", "A": "T", "B": "F" }
}
//결과 객체
var result = {
    "ESTJ": { "trip": "경형적인 여행자", "explain": "ESTJ 설명", "img": "backpacking.jpg" },
    "ENTJ": { "trip": "대담한 여행자", "explain": "ENTJ 설명", "img": "backpacking.jpg" },
    "ESFJ": { "trip": "사교적인 여행자", "explain": "ESFJ 설명", "img": "backpacking.jpg" },
    "ESTP": { "trip": "영리한 여행자", "explain": "ESTP 설명", "img": "backpacking.jpg" },
    "ENTP": { "trip": "호기심 많은 여행자", "explain": "ENTP 설명", "img": "backpacking.jpg" },
    "ENFJ": { "trip": "의욕 넘치는 여행자", "explain": "ENFJ 설명", "img": "backpacking.jpg" },
    "ENFJ": { "trip": "즉흥적인 여행자", "explain": "ENFJ 설명", "img": "backpacking.jpg" },
    "ESFP": { "trip": "자유로운 여행자", "explain": "ESFP 설명", "img": "backpacking.jpg" },
    "ENFP": { "trip": "현실적인 여행자", "explain": "ENFP 설명", "img": "backpacking.jpg" },
    "ISTJ": { "trip": "전략적인 여행자", "explain": "ISTJ 설명", "img": "backpacking.jpg" },
    "ISFJ": { "trip": "헌신적인 여행자", "explain": "ISFJ 설명", "img": "backpacking.jpg" },
    "ISTP": { "trip": "다재다능한 여행자", "explain": "ISTP 설명", "img": "backpacking.jpg" },
    "INTP": { "trip": "혁신적인 여행자", "explain": "INTP 설명", "img": "backpacking.jpg" },
    "INFJ": { "trip": "이상적인 여행자", "explain": "INFJ 설명", "img": "backpacking.jpg" },
    "ISFP": { "trip": "모험적인 여행자", "explain": "ISFP 설명", "img": "backpacking.jpg" },
    "INFP": { "trip": "이타적인 여행자", "explain": "INFP 설명", "img": "backpacking.jpg" }
}
//시작 버튼
function start() {
    $(".start").hide();
    $(".question").show();
    next();
}
//A(위) 버튼 클릭 이벤트
$("#A").click(function () {
    var type = $("#type").val();
    var preValue = $("#" + type).val();
    $("#" + type).val(parseInt(preValue) + 1);
    next();
});
//B(아래) 버튼 클릭 이벤트
$("#B").click(function () {
    //A값만 저장하므로 그냥 next함수 호출
    next();
});
function next() {
    if (num == 13) {
        $(".question").hide();
        $(".result").show();
        //mbti로직
        var mbti = "";
        ($("#EI").val() < 2) ? mbti += "I" : mbti += "E";
        ($("#SN").val() < 2) ? mbti += "N" : mbti += "S";
        ($("#TF").val() < 2) ? mbti += "F" : mbti += "T";
        ($("#JP").val() < 2) ? mbti += "P" : mbti += "J";
        //결과화면
        $("#img").attr("src", result[mbti]["img"]);
        $("#trip").html(result[mbti]["trip"]);
        $("#explain").html(result[mbti]["explain"]);
    } else {
        //마지막 문제가 아니라면
        //프로그레스 바 증가
        $(".progress-bar").attr('style', 'width: calc(100/12*' + num + '%)');
        //문제 번호로 객체에서 문제 정보로 변환
        $("#title").html(q[num]["title"]);
        $("#type").val(q[num]["type"]);
        $("#A").html(q[num]["A"]);
        $("#B").html(q[num]["B"]);
        //문제 번호 변환
        num++;
    }
}