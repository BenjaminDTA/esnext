let favoriteCityId = 'rome';
console.log(favoriteCityId);

favoriteCityId = 'paris';
console.log(favoriteCityId);

const citiesId = ["paris", "nyc", "rome", "rio-de-janeiro"];
console.log(citiesId);

//citiesId = [];
citiesId.push('tokyo');
console.log(citiesId);

function getWeather(cityId) {
    let city = cityId.toUpperCase();
    let temperature = 20;
    return { city, temperature };
}

const weather = getWeather(favoriteCityId);
console.log(weather);

let { city, temperature } = weather;
console.log(city);
console.log(temperature);

let [parisId, nycId, ...othersCitiesId] = citiesId;
console.log(parisId);
console.log(nycId);
console.log(othersCitiesId.length);

// -----------------------------------------------
class Trip {
    constructor(id, name, imageUrl) {
        this.id = id;
        this.name = name;
        this.imageUrl = imageUrl;
    }
    get price() {
        return this._price;
    }

    set price(newPrice) {
        this._price = newPrice;
    }

    toTest() { }

    toString() {
        return 'Trip [' + this.id + ', ' + this.name + ', ' + this.imageUrl + ', ' + this._price + ']';
    }
    static getDefaultTrip() {
        return new Trip('rio-de-janeiro', 'Rio de Janeiro', 'img/rio-de-janeiro.jpg');
    }

}

let parisTrip = new Trip('paris', 'Paris', "img/paris.jpg");
parisTrip.price = 100;
console.log(parisTrip);
console.log(parisTrip.name);
console.log(parisTrip.toString());

const defaultTrip = Trip.getDefaultTrip().toString();
console.log(defaultTrip);


// -----------------------------------------
class FreeTrip extends Trip {
    constructor(id, name, imageUrl) {
        super(id, name, imageUrl);
        super.price = 0;
    }
    toString() {
        return "Free" + super.toString();
    }
}

const freeTrip = new FreeTrip('nantes', 'Nantes', 'img/nantes.jpg')
console.log(freeTrip.toString());

// ---------------PROMISE-------------

class TripService {

    constructor() {


        // TODO Set of 3 trips
        this.trips = new Set();
        this.trips.add(new Trip('paris', 'Paris', 'img/paris.jpg'))
        this.trips.add(new Trip('nantes', 'Nantes', 'img/nantes.jpg'))
        this.trips.add(new Trip('rio-de-janeiro', 'Rio de Janeiro', 'img/rio-de-janeiro.jpg'))


    }

    findByName(tripName) {

        return new Promise((resolve, reject) => {

            setTimeout(() => {
                // ici l'exécution du code est asynchrone

                for (let elem of this.trips) {
                    if (tripName === elem.name) {

                        resolve(elem);
                        return;
                    }
                }
                reject(tripName)

                // TODO utiliser resolve et reject en fonction du résultat de la recherche

            }, 2000)
        });
    }
}


class PriceService {

    constructor() {
        this.prices = new Map();

        this.prices.set('paris', 100);
        this.prices.set('rio-de-janeiro', 800);
    }

    findPriceByTripId(tripId) {

        return new Promise((resolve, reject) => {

            setTimeout(() => {

                for (let [cle, valeur] of this.prices) {
                    if (tripId === cle) {
                        resolve(valeur)
                        return;
                    }
                }
                reject(tripId)
            }, 2000)
        });
    }
}
let tripService = new TripService();
tripService.findByName("Paris")
    .then(function (elem) {
        console.log('Trip Found : ' + elem)
    }, function (error) {
        console.log('No trip with name ' + error)
    });

tripService.findByName("Toulouse")
    .then(function (elem) {
        console.log('Trip Found : ' + elem)
    }, function (error) {
        console.log('No trip with name ' + error)
    });

let priceService = new PriceService();
priceService.findPriceByTripId('paris')
    .then(function (elem) {
        console.log('Price found : ' + elem)
    }, function (error) {
        console.log('No price found for trip id ' + error)
    });


tripService.findByName('Rio de Janeiro').then(trip => {
    return priceService.findPriceByTripId(trip.id)
}).then(prix => {
    console.log('Price Found : ' + prix)
})
    .catch(error => {
        console.log('No price found for trip id ' + error)
    })

tripService.findByName('Nantes').then(trip => {
    return priceService.findPriceByTripId(trip.id)
}).then(prix => {
    console.log('Price Found : ' + prix)
})
    .catch(error => {
        console.log('No price found for trip id ' + error)
    })