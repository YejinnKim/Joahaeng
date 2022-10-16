var mapx = document.getElementById('mapx').value;
var mapy = document.getElementById('mapy').value;

var map = new naver.maps.Map(document.getElementById("map2"), {
    center: new naver.maps.LatLng(mapy, mapx),
    zoom: 15
});

var marker = new naver.maps.Marker({
    position: new naver.maps.LatLng(mapy, mapx),
    map: map
});