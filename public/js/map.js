var x = document.getElementById('mapx0').value
var y = document.getElementById('mapy0').value

var mapContainer = document.getElementById('map'), // 지도를 표시할 div  
    mapOption = {
        center: new kakao.maps.LatLng(y, x), // 지도의 중심좌표
        level: 6 // 지도의 확대 레벨
    };

var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

// 마커를 표시할 위치와 title 객체 배열입니다
var positions = []
for (let i = 0; i < document.getElementById('cnt').value - 1; i++) {
    var title = document.getElementById('title' + i).value
    var mapx = document.getElementById('mapx' + i).value
    var mapy = document.getElementById('mapy' + i).value

    positions.push({
        title: title, 
        latlng: new kakao.maps.LatLng(mapy, mapx)
    })
}

// 마커 이미지의 이미지 주소입니다
var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";

for (var i = 0; i < positions.length; i++) {

    // 마커 이미지의 이미지 크기 입니다
    var imageSize = new kakao.maps.Size(24, 35);

    // 마커 이미지를 생성합니다    
    var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

    // 마커를 생성합니다
    var marker = new kakao.maps.Marker({
        map: map, // 마커를 표시할 지도
        position: positions[i].latlng, // 마커를 표시할 위치
        title: positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
        image: markerImage // 마커 이미지 
    });
}