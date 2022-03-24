const input = document.getElementById("search");
const dailyAverage = document.getElementById("dailyAverage")
const sunny = "/icons/sunny.svg";
const cloud = "/icons/cloudy.svg";
const rain = "/icons/rain.svg";
const url = "https://api.openweathermap.org/data/2.5/onecall";
const key = "aa3215420a208c1b266df0636f12de9c";
const urlGeocode = "http://api.openweathermap.org/geo/1.0/direct"

input.addEventListener("keypress",function(e){
    if(e.keyCode === 13){

        fetch(`${urlGeocode}?q=${input.value}&appid=${key}&limit=5`)
        .then(res=>res.json())
        .then(data=>{
            let lat = data[0].lat;
            let lon = data[0].lon;
            
            fetch(`${url}?lat=${lat}&lon=${lon}&exclude=daily&appid=${key}&units=metric`)
            .then(res=>res.json())
            .then(data=>{
                let date = new Date(data.current.dt * 1000);
                let hours = data.hourly.slice(0,5);
                let html = "";
                hours.forEach(h => {
                    let d = new Date(h.dt*1000);
                    let hours ="0" + d.getHours();
                    let minutes = "0" + d.getMinutes();
                    let formattedTime = hours.substr(-2) + ':' + minutes.substr(-2)
                    // html+=`
                    // <div class="hours">
                    //     <span id="hour">${formattedTime}</span>
                    //     <img src="" alt="">
                    //     <span id="hourlyDegree">${Math.round(h.temp)}<span class="symbol"> °</span></span>
                    // </div>
                    // `
                    
                    if(h.weather[0].id>=801 && h.weather[0].id<=804){
                        if(h.weather[0].icon === "02d")
                        html+=`
                    <div class="hours">
                        <span id="hour">${formattedTime}</span>
                        <img src="${cloud}" alt="">
                        <span id="hourlyDegree">${Math.round(h.temp)}<span class="symbol"> °</span></span>
                    </div>
                    `
                    }
                    
                    else if((h.weather[0].id>=300 && h.weather[0].id<=321)
                    &&(h.weather[0].id>=500 && h.weather[0].id<=531)){
                        console.log("rain")
                    }
                    
                    else if(h.weather[0].id>=600 && h.weather[0].id<=622){
                        console.log("ssnow")
                    }
                    else if(h.weather[0].id === 800){
                        console.log("sunny")
                    }
                    console.log(h)
                    dailyAverage.innerHTML = html;
            });
            let time = date.getHours() +":"+ date.getMinutes();
                console.log(time);
                console.log(data);
            })
        })
    }
})
