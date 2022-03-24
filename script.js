const input = document.getElementById("search");
const dailyAverage = document.getElementById("dailyAverage");
const sunny = "/icons/sunny.svg";
const cloud = "/icons/clouds.svg";
const rain = "/icons/rain.svg";
const storm = "/icons/storm.svg";
const rainWithSum = "/icons/rainWithSun.svg";
const cloudAndSun = "/icons/cloudy.svg";
const snowy = "/icons/snowy.svg";
const url = "https://api.openweathermap.org/data/2.5/onecall";
const key = "aa3215420a208c1b266df0636f12de9c";
const urlGeocode = "http://api.openweathermap.org/geo/1.0/direct";
const content = document.querySelector(".content");

input.addEventListener("keypress", function (e) {
  if (e.keyCode === 13) {
    fetch(`${urlGeocode}?q=${input.value}&appid=${key}&limit=5`)
      .then((res) => res.json())
      .then((data) => {
        let lat = data[0].lat;
        let lon = data[0].lon;

        fetch(
          `${url}?lat=${lat}&lon=${lon}&exclude=daily&appid=${key}&units=metric`
        )
          .then((res) => res.json())
          .then((data) => {
            let date = new Date(data.current.dt * 1000);
            let hours = data.hourly.slice(1, 6);
            let html = "";

            let city = `
                <div>
                    <i class="fas fa-map-marker-alt"></i>
                    <span id="city">${input.value.toUpperCase()}</span>
                </div>
                <img src="${
                  data.current.weather[0].id >= 801 &&
                  data.current.weather[0].id <= 804
                    ? data.current.weather[0].icon === "02d"
                      ? cloudAndSun
                      : cloud
                    : data.current.weather[0].id >= 300 &&
                      data.current.weather[0].id <= 321 &&
                      data.current.weather[0].id >= 500 &&
                      data.current.weather[0].id <= 531
                    ? data.current.weather[0].icon === "09d"
                      ? rain
                      : rainWithSum
                    : data.current.weather[0].id >= 600 &&
                      data.current.weather[0].id <= 622
                    ? snowy
                    : data.current.weather[0].id >= 200 &&
                      data.current.weather[0].id <= 232
                    ? storm
                    : sunny
                }" alt="" />
                <span id="degree">${Math.round(
                  data.current.temp
                )}<span class="symbol">°</span></span>
                `;
            content.innerHTML = city;
            clearInput();

            hours.forEach((h) => {
              let d = new Date(h.dt * 1000);
              let hours = "0" + d.getHours();
              let minutes = "0" + d.getMinutes();
              let formattedTime = hours.substr(-2) + ":" + minutes.substr(-2);
              html += `
                    <div class="hours"> 
                        <span id="hour">${formattedTime}</span>
                        <img src="${
                          h.weather[0].id >= 801 && h.weather[0].id <= 804
                            ? h.weather[0].icon === "02d"
                              ? cloudAndSun
                              : cloud
                            : h.weather[0].id >= 300 &&
                              h.weather[0].id <= 321 &&
                              h.weather[0].id >= 500 &&
                              h.weather[0].id <= 531
                            ? h.weather[0].icon === "09d"
                              ? rain
                              : rainWithSum
                            : h.weather[0].id >= 600 && h.weather[0].id <= 622
                            ? snowy
                            : h.weather[0].id >= 200 && h.weather[0].id <= 232
                            ? storm
                            : sunny
                        }" alt="">
                        <span id="hourlyDegree">${Math.round(
                          h.temp
                        )}<span class="symbol"> °</span></span>
                    </div>
                    `;
              console.log(h);
              dailyAverage.innerHTML = html;
            });
            let time = date.getHours() + ":" + date.getMinutes();
            console.log(time);
            console.log(data);
          });
      })
      .catch(() => {
        let msg = `
            <span id="city">We Cannot find any City.<br/>
            Please enter another City.</span>
            `;
        content.innerHTML = msg;
      });
  }
});

let clearInput = () => (input.value = "");



let arr=[[1,2,3],[3,4,5],[6,7,8]]

let arr1 = []

arr.map(e=>{
  arr1 = arr1.concat(e)
})
console.log(arr1);