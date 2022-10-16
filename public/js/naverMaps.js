var x = document.getElementById('mapx0').value
var y = document.getElementById('mapy0').value

var map = new naver.maps.Map(document.getElementById('map'), {
    center: new naver.maps.LatLng(y, x),
    zoom: 13
});

var positions = []
for (var i = 0; i < document.getElementById('cnt').value; i++) {
    var title = document.getElementById('title' + i).value
    var mapx = document.getElementById('mapx' + i).value
    var mapy = document.getElementById('mapy' + i).value

    positions.push({
        title: title, 
        latlng: new naver.maps.LatLng(mapy, mapx)
    })
}

for (var i = 0; i < positions.length; i++) {
    var marker = new naver.maps.Marker({
        map: map,
        position: positions[i].latlng,
        title: positions[i].title
    });
}
