
let apiKey = "7148a5cf284fb307839dfec679c68845";
const d = new Date();
let B = d.toString();
let arr = B.split(" ")[5];

let timeZone = arr;



let fetchDataBtn = document.getElementById("fetchdata")

let firstWindow = document.getElementById("firstwindow");

let secondWindow = document.getElementById("secondwindow");

let detailsSection = document.getElementById("details");







fetchDataBtn.addEventListener("click" , ()=> {
    firstWindow.classList.toggle("d-none")
    secondWindow.classList.toggle("d-none")
    detailsSection.classList.toggle("d-none")
    getLocation();
})



function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
}






function showPosition(position) {
    var lat = position.coords.latitude;
    var long = position.coords.longitude;
    document.getElementById("maps").src = "https://maps.google.com/maps?q=" + lat + "," + long + "&z=15&output=embed";
   

    document.getElementById("lat").innerHTML = `Lat: ${lat}`;
    document.getElementById("long").innerHTML = `Long: ${long}`;


    fetchWeth(lat, long);
  }

  function fetchWeth(lat,long){
    const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;
    fetch(api)
    .then(responce => responce.json())
    .then(data =>{
        getdata(data);
    })
    .catch(err => {
        console.log(err)
    })
  }

  function getdata(weatherData) {
    let location = document.getElementById("location");
    let windspeed = document.getElementById("windspeed");
    let humidity = document.getElementById("humidity");
    let timezone = document.getElementById("timezone");
    let pressure = document.getElementById("pressure");
    let winddirection = document.getElementById("winddirection");
    let uv = document.getElementById("uv");
    let feelslike = document.getElementById("feelslike");
   

    location.innerHTML = `Location: ${weatherData.name}`;
    windspeed.innerHTML = `Wind Speed:  ${weatherData.wind.speed} kmph`;
    humidity.innerHTML = `Humidity:  ${weatherData.main.humidity} %`;
    timezone.innerHTML = `Time Zone:  ${timeZone}`;
    pressure.innerHTML = `Pressure: ${ weatherData.main.pressure} mbar`;
    winddirection.innerHTML = `Wind Direction:  ${weatherData.wind.deg}&deg; west`;
    uv.innerHTML = `UV Index: 23`; // Not provided by the current API endpoint
    feelslike.innerHTML = `Feels Like:  ${weatherData.main.feels_like}&deg;`;
  }



// getLocation();