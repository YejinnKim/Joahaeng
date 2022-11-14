var map = new naver.maps.Map(document.getElementById('directions'), {
    zoom: 11
});

const polymap = (start, goal, path, duration) => {
    let polyline = new naver.maps.Polyline({
        map: map,
        path: path,
        strokeColor: '#E51D1A',
        strokeStyle: 'solid',
        strokeOpacity: 0.5,
        strokeWeight: 5,
        clickable: true
    });

    let info = path[parseInt(path.length / 2)]
    let infowindow = new naver.maps.InfoWindow({
        content: `<div class="p-2">${start.title}에서 ${goal.title}까지<br>${duration}분</div>`
    });
    naver.maps.Event.addListener(polyline, 'mouseover', function() {
        infowindow.open(map, new naver.maps.LatLng(info.y, info.x));
        polyline.setOptions({strokeOpacity: 1});
    });
    naver.maps.Event.addListener(polyline, 'mouseout', function() {
        infowindow.close();
        polyline.setOptions({strokeOpacity: 0.5});
    });
}

const direction = (p1, p2) => { 
    fetch('/mytrip/directions', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            start: `${p1.mapx},${p1.mapy}`,
            goal: `${p2.mapx},${p2.mapy}`
        })
    }).then((res) => res.json())
    .then((res) => {
        let path = res.route.traoptimal[0].path.map((element) => new naver.maps.LatLng(element[1], element[0]))
        let duration = parseInt(res.route.traoptimal[0].summary.duration / 60000)
        polymap(p1, p2, path, duration)
        return (duration)
    })
    .then((duration) => {
        let data = document.createElement("div")
        data.innerHTML = `<h3>${p1.title} -> ${p2.title}<br>소요시간: ${duration}분</h3>`
        document.getElementById('directions_txt').append(data)
    })
}

const mark = (place) => {
    let marker = new naver.maps.Marker({
        map: map,
        position: new naver.maps.LatLng(place.mapy, place.mapx)
    });
    let infowindow = new naver.maps.InfoWindow({
        content: `<div class="p-2">${place.title}</div>`
    });
    naver.maps.Event.addListener(marker, 'mouseover', function() {
        infowindow.open(map, marker);
    });
    naver.maps.Event.addListener(marker, 'mouseout', function() {
        infowindow.close();
    });
}

const directions = () => {
    let len = document.getElementById("len").value
    let places = []
    for (let i=0; i<len; i++) {
        places.push({
            title: document.getElementById('dtitle' + i).value, 
            mapy: parseFloat(document.getElementById('dmapy' + i).value), 
            mapx: parseFloat(document.getElementById('dmapx' + i).value)})
    }
    map.setOptions("center", new naver.maps.LatLng(places[1].mapy, places[1].mapx))
    for (let i = 0; i< places.length; i++) {
        mark(places[i])
    }
    for (let i = 0; i < places.length - 1; i++) {
        direction(places[i], places[i + 1])
    }
}

const filterArea = (area) => {
    fetch('/mytrip/area', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({area: area})
    }).then((res) => res.json())
    .then((res) => {
        document.getElementById("databox").innerHTML = ""
        let i = 0
        for(value of res.result) {
            let data = document.createElement("li")
            data.setAttribute("class", "col-md-3")
            data.setAttribute("id", `li_${i}`)
            data.setAttribute("style", "list-style: none;")
            data.innerHTML =
            `<div class="property-item rounded overflow-hidden">
                <div class="position-relative overflow-hidden">
                    <a href="/place/detail?contentid=${value.contentid}">
                        <img class="img-fluid" src="${value.image}" alt="" style="width: 100%; height: 140px;">
                    </a>
                </div>
                <div class="p-4 pb-0">
                    <a class="d-block mb-2" href="/place/detail?contentid=${value.contentid}">${value.title}</a>
                    <p><i class="fa fa-map-marker-alt text-primary me-2"></i>${value.addr}</p>
                </div>
            <input type="hidden" id="dtitle${i}" value="${value.title}">
            <input type="hidden" id="dmapx${i}" value="${value.mapx}">
            <input type="hidden" id="dmapy${i}" value="${value.mapy}">
            <input class="btn btn-outline-primary mb-4" type="button" value="<" onclick="move_li('UP', '${i}');">
            <input class="btn btn-outline-primary mb-4" type="button" value=">" onclick="move_li('DOWN', '${i}');">    
            <input class="btn btn-outline-primary mb-4" type="button" value="제거" onclick="move_li('DEL', '${i}');">
            </div>
            `
            document.getElementById("databox").append(data)
            i++
        }
        let tmp = document.createElement("input")
        tmp.setAttribute("type", "hidden")
        tmp.setAttribute("id", "len")
        tmp.setAttribute("value", i)
        document.getElementById("databox").appendChild(tmp)
    })
}

const move_li = (gbn, no) => {
    var $li = $("#li_"+no);
    if (gbn == "UP")
        $li.prev().before($li);
    else if (gbn == "DOWN")
        $li.next().after($li);
    else 
        $li.remove()
}
