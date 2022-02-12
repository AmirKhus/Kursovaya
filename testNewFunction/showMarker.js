// See post: http://asmaloney.com/2015/06/code/clustering-markers-on-leaflet-maps

var map = L.map('map', {
    center: [10.0, 5.0],
    minZoom: 2,
    zoom: 2,
})

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    subdomains: ['a', 'b', 'c'],
}).addTo(map)

L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}',
    {    attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        subdomains: ['a', 'b', 'c'],
    }).addTo(map);

var myURL = jQuery('script[src$="showMarker.js"]')
    .attr('src')
    .replace('showMarker.js', '')

var myIcon = L.icon({
    iconUrl: myURL + '../maps/images/pin24.png',
    iconRetinaUrl: myURL + '../maps/images/pin48.png',
    iconSize: [29, 24],
    iconAnchor: [9, 21],
    popupAnchor: [0, -14],
})


var musorIcon = L.icon({
    iconUrl: myURL + '../maps/images/musor.png',
    iconRetinaUrl: myURL + '../maps/images/musor.png',
    iconSize: [29, 24],
    iconAnchor: [9, 21],
    popupAnchor: [0, -14],
})

var filterIcon = L.icon({
    iconUrl: myURL + '../maps/images/filter.png',
    iconRetinaUrl: myURL + '../maps/images/filter.png',
    iconSize: [29, 24],
    iconAnchor: [9, 21],
    popupAnchor: [0, -14],
})


var markerClusters = L.markerClusterGroup()

let arrVidMusora = [];

for (var i = 0; i < markers.length; ++i) {
    //заполнение массива с видами мусора
    if (arrVidMusora.indexOf(markers[i].typeOfEnvironmentalProblem) === -1)
        arrVidMusora.push(markers[i].typeOfEnvironmentalProblem)

    if (markers[i].id > 0) {
        var popup =
            markers[i].name +
            '<br/>' +
            markers[i].typeOfEnvironmentalProblem +
            '<br/>' +
            markers[i].city +
            '<br/><b>IATA/FAA:</b> ' +
            markers[i].iata_faa +
            '<br/><b>ICAO:</b> ' +
            markers[i].icao +
            '<br/><b>Altitude:</b> ' +
            Math.round(markers[i].alt * 0.3048) +
            ' m' +
            '<br/><b>Timezone:</b> ' +
            markers[i].tz

        if (markers[i].id%2 === 0 ) {
            var m = L.marker([markers[i].lat, markers[i].lng], {
                icon: musorIcon,
                tags: [markers[i].typeOfEnvironmentalProblem],
            }).bindPopup(popup,
                {removable: true, editable: true,tags: ['fast']}
            );

            markerClusters.addLayer(m)
        }else {
            var m = L.marker([markers[i].lat, markers[i].lng], {
                icon: myIcon,
                tags: [markers[i].typeOfEnvironmentalProblem],
            }).bindPopup(popup,
                {removable: true, editable: true,tags: ['fast']}
            );

            markerClusters.addLayer(m)
        }
    }
}

map.addLayer(markerClusters)

// функция кнопки с фильрацией
L.control.tagFilterButton({
    data: arrVidMusora,
    icon: '<img src = "../maps/images/filter.png">',
    filterOnEveryClick: true
}).addTo(map);
