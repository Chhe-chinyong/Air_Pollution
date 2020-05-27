console.log("Hello from script.js");


const location1 = document.querySelector('#var-location');
const img = document.querySelector('#var-img');
const temp = document.querySelector('#temp');
const humid = document.querySelector('#humid');
const wind = document.querySelector('#wind');
const tempImg = document.querySelector('#tempImg');
const condition = document.querySelector("#var-condition");
const air = document.querySelector('#var-air');



fetch('http://localhost:3000/weather').then((response) => {
    response.json()
        .then((data) => {
            console.log(data);
            air.textContent = data.air;
            location1.textContent = data.city + ", " + data.country;
            temp.textContent = data.temp;
            humid.textContent = data.humid;
            wind.textContent = data.wind;
            tempImg.src = '/image/'+data.ic+'png';
            if (data.air <= 50)
            {   
                img.src= '/image/pollute/ic-face-green.svg';
                condition.textContent = "Good";
            }

            if (data.air > 50 && data.air <= 100)
            {
                img.src= '/image/pollute/ic-face-yellow.svg';
                condition.textContent = "Moderate";

            }

            if (data.air > 100 && data.air <= 150)
            {
                img.src= '/image/pollute/ic-face-orange.svg';
                condition.textContent = "Unhealthy for sensitive groups";

            }

            if (data.air > 150 && data.air <= 200)
            {
                img.src= '/image/pollute/ic-face-red.svg';
                condition.textContent = "Unhealthy";

            }

            if (data.air > 200 && data.air <= 300)
            {
                img.src= '/image/pollute/ic-face-maroon.svg';
                condition.textContent = "Very Unhealthy";

            }
            if (data.air > 300 && data.air <= 500)
            {
                img.src= '/image/pollute/ic-face-red.svg';
                condition.textContent = "Hazardous";

            }
           
        })
})