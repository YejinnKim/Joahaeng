var mapx = document.getElementById('mapx').value;
var mapy = document.getElementById('mapy').value;
var mlevel = document.getElementById('mlevel').value;

var mapContainer = document.getElementById('detail_map'), // 지도를 표시할 div 
    mapOption = { 
        center: new kakao.maps.LatLng(mapy, mapx), // 지도의 중심좌표
        level: mlevel // 지도의 확대 레벨
    };

var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

// 마커가 표시될 위치입니다 
var markerPosition  = new kakao.maps.LatLng(mapy, mapx); 

// 마커를 생성합니다
var marker = new kakao.maps.Marker({
    position: markerPosition
});

// 마커가 지도 위에 표시되도록 설정합니다
marker.setMap(map);
