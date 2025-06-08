"use strict"

/**
 * Hämtar Nominatim APT:t, kopplar den till användarens sökning och 
 * @return {array} dataFetch, datan om användarens sökning
 */
class NominatimAPI {

    constructor() {
        //gör variabeln till en member-variabel
        this.baseUrl = "https://nominatim.openstreetmap.org/search.php";
    }

    async search(searchString) {
        let result = await this.query(searchString);

        //returnerar det första resultatet (förhoppningsvis det mest troliga)
        return result[0];
    } 

    async query(searchString) {
        //ajax-anrop
        const dataFetch = await fetch( `${this.baseUrl}?format=jsonv2&q=${encodeURIComponent(searchString)}`).then(async (response) => {
            return await response.json();
        })
       .catch((error) => {
            //till utvecklare
            console.error(error);

            //till användare
            document.getElementById("error").innerHTML = "<p>Något blev fel med anslutningen. Försök igen senare!</p>"
        })
        
        return dataFetch;
    }
}

export default NominatimAPI;