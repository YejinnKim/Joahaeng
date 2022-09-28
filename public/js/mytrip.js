// propensity 데이터 불러오는 코드 시작
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

var mbti = '';

$(window).on("load", function(){
    mbti = document.getElementById('mbti').textContent;
    console.log(mbti);
    $("#img").attr("src", result[mbti]["img"]);
    $("#recommend").html("# "+ result[mbti]["recommend"]);
    $("#trip").html(result[mbti]["trip"]);
    $("#explain").html(result[mbti]["explain"]);
})