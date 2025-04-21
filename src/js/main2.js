//webbläsaren stödjer geolokalisering
window.onload = () => {

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
        console.error("Geolokalisering stöds inte av din webbläsare");
    }
}