

const APIKEY = '3265874a2c77ae4a04bb96236a642d2f';             // Yeh line mein humne ek constant variable APIKEY define kiya hai jismein OpenWeatherMap API ka access key store hota hai. Is key ka istemal API se data fetch karne ke liye hota hai.

const form = document.querySelector("form");              //Is line mein humne HTML document se <form> element ko select kiya hai aur form variable mein store kiya hai. Is form ka istemal user se city ka name input lene ke liye hota hai.

const weather = document.querySelector("#weather");       // Yeh line mein humne HTML document se <div> element ko select kiya hai jismein weather information display hoti hai. Is element ka istemal API se aane wale data ko dikhane ke liye hota hai.

const search = document.querySelector("#search");       // Is line mein humne HTML document se <input> element ko select kiya hai jismein user city ka name enter karta hai. Is input element ka istemal city ka naam collect karne ke liye hota hai.





//Yeh ek asynchronous function hai jiska kaam hai OpenWeatherMap API se current weather data fetch karna. Is function mein hum pehle "Loading..." message ko display karte hain, phir API se data fetch karte hain, aur us data ko showweather function mein pass karte hain.

const getweather = async (city) => {
    weather.innerHTML = `<h2>Loading ...</h2>`;
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEY}&units=metric`;
    const response = await fetch(URL);
    const data = await response.json();
    return showweather(data);
}



//Yeh function API se aane wale weather data ko display karta hai. Agar API se "404" error code aata hai toh yeh "City Not Found" message display karta hai. Agar data milta hai toh us data ko HTML mein display karta hai.

const showweather = (data) => {
    if (data.cod === "404") { // Use 'cod' instead of 'code'
        weather.innerHTML = `<h2>City Not Found</h2>`;
        return;
    }
    weather.innerHTML = 
    `
     <div>
         <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="">
     </div>






    <div>
        <h2>${data.main.temp} ℃</h2>
        <h3>${data.weather[0].main}</h3>
    </div>`
    ;
}



//Is line mein hum form par ek event listener lagate hain jo form submit hone par call hota hai. Is event listener mein hum getweather function ko call karte hain jisse city ka name API ke liye pass kiya ja sake, aur phir event ko prevent karte hain taki page refresh na ho.

form.addEventListener(
    "submit",
    function (event) {
        getweather(search.value);
        event.preventDefault();
    }
);








