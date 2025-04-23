(g=>{var h,a,k,p="The Google Maps JavaScript API",c="google",l="importLibrary",q="__ib__",m=document,b=window;b=b[c]||(b[c]={});var d=b.maps||(b.maps={}),r=new 
Set,e=new URLSearchParams,u=()=>h||(h=new Promise(async(f,n)=>{await (a=m.createElement("script"));e.set("libraries",[...r]+"");for(k in g)e.set
    (k.replace(/[A-Z]/g,t=>"_"+t[0].toLowerCase()),g[k]);e.set("callback",c+".maps."+q);a.src=`https://maps.${c}apis.com/maps/api/js?`+e;d[q]=f;a.onerror=()=>
        h=n(Error(p+" could not load."));a.nonce=m.querySelector("script[nonce]")?.nonce||"";m.head.append(a)}));d[l]?console.warn(p+" only loads once. Ignoring:",g):
    d[l]=(f,...n)=>r.add(f)&&u().then(()=>d[l](f,...n))})({
    key: "AIzaSyDHL3cUaEZ6-TsKbQ7jEoUPdf5af4uzN2M",
    v: "weekly",
    // Use the 'v' parameter to indicate the version to use (weekly, beta, alpha, etc.).
    // Add other bootstrap parameters as needed, using camel case.
  });

 //I KONSOLLEN STÅR DET ATT AWAIT BARA FÅR ANVÄNDAS I ASYNC FUNCTIONS, ASYNC GENERATORS OCH MODULES 

//webbläsaren stödjer geolokalisering
window.onload = () => {

    //kollar om man kan läsa in användarens position
    if ("geolocation" in navigator) {

        navigator.geolocation.getCurrentPosition(function (position) {
            let latitude = position.coords.latitude;
            let longitude = position.coords.longitude;

            console.log(`Latitude: ${latitude}`);
            console.log(`Longitude: ${longitude}`);
        }, function (error) {
            console.error("Fel vid hämtning av position:", error.message);
        });
    } else {
        console.error("Din webbläsare stödjer inte geolokalisering");
    }
}

//MAP WITH MARKER
// Initialize and add the map
let map;

async function initMap() {
  // The location of Uluru
  const position = { lat: -25.344, lng: 131.031 };
  // Request needed libraries.
  //@ts-ignore
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

  // The map, centered at Uluru
  map = new Map(document.getElementById("map"), {
    zoom: 4,
    center: position,
    mapId: "DEMO_MAP_ID",
  });

  // The marker, positioned at Uluru
  const marker = new AdvancedMarkerElement({
    map: map,
    position: position,
    title: "Uluru",
  });
}

initMap();



//google maps embed api
//google maps javascript api - infoga karta med javascript
//med en rad kod kan man göra en navigera hit-knap
//ex-kod 50:16
//för att få en sökfras att översättas till en position använder mattias nominatim API
/*
    ange fråpn vilken domänadress nyckeln ska nvändas från så den blir låst och inte kan användas någonannanstans ifrån, nyckeln behöver därför inte gömmas
*/