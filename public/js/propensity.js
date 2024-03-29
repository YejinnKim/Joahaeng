var num = 1; //문제 번호
var mbti = "";

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
    11: { "title": "여행이 끝나고 집으로 향하는 길 위의 당신! 집에 도착한다면 어떤 행동을 할까 생각하는데...", "type": "JP", "A": "일단 짐을 풀고 정리를 먼저 하자. 그리고 씻고 쉬면 좋을 것 같아.", "B": "일단 집에 도착하고 몸 상태를 보자." },
    12: { "title": "여행을 다녀와서 침대에 누운 당신! 여행은 어땠나요?", "type": "TF", "A": "여행하기 좋은 휴양지였어. 교통도 편했고 맛있는 음식점도 많았지. 또 가면 좋겠다.", "B": "아름다운 볼거리가 많았던 곳이었어. 다른 친구들과 같이 또 간다면 못가본 곳을 더 찾아 갈 수 있을 것 같아." }
}
//결과 객체
var result = {
    "ESTJ": { "trip": "경영하는 여행자", "explain": "경영자에겐 여행도 성취의 일부입니다. 호불호가 명확해 고민 따윈 없습니다. 성취를 위해 이동 범위가 짧고, 여행지가 다닥다닥 붙어 있어 다음 행선지로 스피드한 이동이 가능한 여행지가 적합합니다.", "recommend":"부산", "img": "/public/img/busan.jpg"},
    "ENTJ": { "trip": "대담한 여행자", "explain": "대담한 여행자와 함께라면 불가능은 없습니다. 당신의 기지는 여행 시작 전부터 발휘되며 총대를 메 달라고 부탁한 적 없지만, 자연스럽게 책임 반장이 되어 있을 수 있습니다. 당신은 선뜻 나서기 힘든 여행지도 좋을 것 같습니다. ", "recommend":"울릉도, 독도", "img": "/public/img/dokdo.jpeg"},
    "ESFJ": { "trip": "사교적인 여행자", "explain": "로맨틱한 당신은 모든 여행을 사진이나 영상으로 남기기를 좋아합니다. 아름다운 풍경을 눈으로도 보고 사진으로도 남기고 싶은 마음이 커서 친구들에게 관광지를 훌륭하게 소개할 수 있습니다.", "recommend":"거제", "img": "/public/img/geoje.jpg"},
    "ESTP": { "trip": "영리한 여행자", "explain": "무계획도 계획이다. 당신은 하고 싶은 건 반드시 해야 합니다. 그렇다고 어떤 계획이 있는 건 또 아닙니다. 원하는 기분에 원하는 것을 하는 것이 여행의 가장 큰 기쁨입니다. 경로를 조금만 다르게 해도 새로운 장소를 바로 갈 수 있는 곳은 어떨까요?", "recommend":"제주도", "img": "/public/img/jeju.jpg"},
    "ENTP": { "trip": "호기심 많은 여행자", "explain": "한 줄의 지식이 남는 여행이야 말로 유익한 여행입니다. 지적 여행에 대한 욕구가 있는 당신은 호기심을 마음껏 내비칠 수 있는 박물관을 둘러보는 것도 좋을 것 같습니다. ", "recommend":"경주", "img": "/public/img/gyeongju.jpg"},
    "ENFJ": { "trip": "의욕 넘치는 여행자", "explain": "여행 친구의 물건까지 챙기며 여행을 신중하게 즐기는 친절한 신사입니다. 바쁜 여행보다 계획한 여행을 차근차근 담아가는 것이 좋습니다. 변수가 많은 곳보다는 충분히 휴식할 수 있는 곳이 어울릴 것 같습니다.", "recommend":"충주", "img": "/public/img/chungju.jpg"},
    "ESFP": { "trip": "즉흥적인 여행자", "explain": "여행지, 관광지보다는 함께 여행하는 친구, 여행지에서 만난 새로운 친구가 더 중요합니다. 말을 누구보다 재밌게 잘하여 멋진 풍경에서 편한 사람과 이야기를 하다보면 시간 가는 줄도 모르지요.", "recommend":"양양", "img": "/public/img/yangyang.jpg"},
    "ENFP": { "trip": "자유로운 여행자", "explain": "호탕한 웃음소리와 넘치는 리액션으로 멀리서도 눈에 띄는 존재감입니다. 당신과 함께라면 어떤 여행이든 즐겁습니다. 계획적인 여행이든 무계획인 여행이든 당신과 하는 모든 행동에 여행 친구들은 좋은 추억을 만들 것입니다.","recommend":"남해", "img": "/public/img/namhae.jpg"},
    "ISTJ": { "trip": "현실적인 여행자", "explain": "묵묵히 여행의 모든 계획을 짭니다. 시간 약속을 칼 같이 지키며 피곤하거나 힘들어도 티를 내지 않습니다. 조금의 역경이 닥쳐도 결국 견디고 아름다움을 느낄 수 있는 곳은 당신의 최고의 여행지가 될 것입니다. ","recommend":"평창", "img": "/public/img/pyeongchang.jpg"},
    "INTJ": { "trip": "전략적인 여행자", "explain": "여행을 떠나기 전 이미 여행지를 다녀온 듯한 준비성을 갖췄습니다. 완벽한 계획을 현실에 옮기며 여행을 즐길 수 있습니다. 대중교통이 잘 되어 있는 지역에서 계획한 것들을 실천 해보세요.","recommend":"강릉", "img": "/public/img/gangneung.jpg"},
    "ISFJ": { "trip": "헌신적인 여행자", "explain": "어떤 여행이든 당신이 편한 사람들과의 여행은 항상 즐겁고 행복해야 합니다. 여행 중 싸움이 나면 솔선수범으로 친구들을 화해하도록 행동합니다. 싸움이 없이 평화로운 여행을 사랑합니다.", "recommend":"태안", "img": "/public/img/taean.jpg"},
    "ISTP": { "trip": "다재다능한 여행자", "explain": "어떤 일이든 척척 해내는 당신은 모험을 하는 것도 즐길 수 있습니다. 평소에 내성적이고 순하다가도 모험에 앞서면 어려운 것 없이 앞서 행동할 수 있습니다. 그런 묘미를 즐겨보는 것도 좋을 것 같습니다.", "recommend":"무의도", "img": "/public/img/muui.jpg"},
    "INTP": { "trip": "혁신적인 여행자", "explain": "잡학박사인 당신은 효율적인 여행을 좋아합니다. 여행에 앞서 그 지역의 관광지의 배경을 알아보고 여행을 함께하는 친구들에게 알려주는 것을 좋아하죠. 당신의 친구들은 좋은 여행 가이드를 두었습니다. ", "recommend":"고창", "img": "/public/img/gochang.jpg"},
    "INFJ": { "trip": "이상적인 여행자", "explain": "여행 친구가 행복하면 당신도 행복합니다. 본인보단 상대를 위하는 행동을 많이 찾아 볼 수 있습니다. 여행 계획을 세울 때도 친구가 원하는 곳이 있다면 우선으로 선택할 것 입니다. 하지만 그런 당신도 본인을 위한 충전시간이 필요하죠.", "recommend":"고성", "img": "/public/img/goseong.jpg"},
    "ISFP": { "trip": "모험적인 여행자", "explain": "여행에 대한 로망이 가득한 당신에게 여행은 버킷리스트를 현실화 시키는 과정입니다. 비현실적인 점이 많은 여행에 눈이 쉽게 가며 친구들과 탐험처럼 여행을 즐기고 싶어합니다.", "recommend":"여수", "img": "/public/img/gapyeong.jpg"},
    "INFP": { "trip": "이타적인 여행자", "explain": "여행지에 도착하기까지 많은 마음가짐을 해야하는 당신은 낭만적인 여행지를 좋아합니다. 여행이 끝나면 누구보다 여행지에 대한 감상을 늘어놓을 수 있는 사람. 여행 준비를 짧게 하고 훅 떠나보는 여행을 하는 것은 어떨까요?", "recommend":"가평", "img": "/public/img/yeosu.jpg"}
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
        ($("#EI").val() < 2) ? mbti += "I" : mbti += "E";
        ($("#SN").val() < 2) ? mbti += "N" : mbti += "S";
        ($("#TF").val() < 2) ? mbti += "F" : mbti += "T";
        ($("#JP").val() < 2) ? mbti += "P" : mbti += "J";
        //결과화면
        $("#img").attr("src", result[mbti]["img"]);
        $("#recommend").html("# "+ result[mbti]["recommend"]);
        $("#trip").html(result[mbti]["trip"]);
        $("#explain").html(result[mbti]["explain"]);
        $("#btnSearch").attr("href", "/place/search?keyword="+result[mbti]["recommend"]+"&theme=&area=")
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

const save = () => {
    fetch('/propensity', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            mbti:mbti
        })
    }).then((res) => {
        if (res.status == 200)
            location.href = '/mytrip/propensity'
        else if (res.status == 400)
            return res.json()
    }).then((data) => {
        console.log(data)
    })
}