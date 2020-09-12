 const country = document.querySelector("#country");
 const city =  document.querySelector("#city");
 const temperature = document.querySelector("#temp");
 const describtion = document.querySelector("#desc");
 const output = document.querySelector(".output");
 const [timeEl,humidityEl,minmaxEl] = document.querySelectorAll(".output_further > li");
 const alertMessage =  document.querySelector(".alertMessage");
 const alert =  document.querySelector(".alert");
 const historyEl = document.querySelector(".history");
 const defaultMinor = document.querySelector("#default");
 const minorContainer = document.querySelector(".minor_main");
 const iconEl= document.querySelector("#iconel");
 const greetEl = document.querySelector("#greeting");

 const loadWrapper = document.createElement("div");
 
 loadWrapper.setAttribute("class","spinner-wrapper");
 loadWrapper.innerHTML= `<div class="spinner"></div>`



 class UI{
    static displayWeatherResult(weather){
       this.setCountry(weather.country);
       this.setCity(weather.city);
       this.setTemperature(weather.temperature);
       this.setDescription(weather.description);
       this.setOtherDetails(weather.time,weather.humidity,weather.min,weather.max);
       this.setIcon(weather.icon);
       //this.setIcon("cloudy");
    }
    
    static setCountry(value){
     country.textContent = value;
    }
    static setCity(value){
        city.textContent=value;
    }
    static setOtherDetails(time,humidity,min,max){
         timeEl.textContent=time;   
         humidityEl.textContent = `humidity ${humidity}`
         minmaxEl.getElementsByClassName("range")[0].textContent=min;
         minmaxEl.getElementsByClassName("range")[1].textContent=max;

    }
    static greet(){
        greetEl.textContent = getGreeting();
    }
    static setTemperature(value){
       temperature.textContent=value;
    }
    static setDescription(value){
       describtion.textContent=value;
     }
    static alertApp(message){
        alertMessage.textContent = message;
        alert.classList.add(`tr`);
        setTimeout(this.closeAlert,4000)
    }
    static errorAlert(message){
        alert.classList.add("error");
        this.alertApp(message);
    }
    static closeAlert(){
        alert.classList.remove(`tr`);
    }
    static setIcon(icon){
      iconEl.setAttribute("src",`http://openweathermap.org/img/w/${icon}.png`);
    }
    static removeLoading(){
       output.removeChild(loadWrapper);
    }
    static displayLoading(pos){
       output.insertAdjacentElement('afterbegin',loadWrapper);
       //set forcast class to skeleton
    }
    static displaySearchHistory(history){
        if(history && history.length <=0)return;
        let fragment = document.createDocumentFragment();
        for(let i=history.length-1; i>=0; i--){
         fragment.appendChild( this.createMinorOutput(history[i]))
        }
       minorContainer.textContent ="";
       minorContainer.append(fragment)
    }
    static createMinorOutput(data){
      const minor = document.createElement("div");
      minor.setAttribute("class","mini_output shadow")
      minor.innerHTML= `<div class="mini_output__main flex">
                <div class="mini_output__main__icon cloud">
                  <img src="http://openweathermap.org/img/w/${data.icon}.png" alt="weather icon"/>
                </div>
                <div class="mini_output__text flex">
                      <span class="mini_output__text_temperature">${data.temperature}</span>
                      <span class="mini_output__text_city">
                          <p>${data.city}</p>
                          <p><i>${data.country}</i></p>
                      </span>
                </div>
            </div>
            <p style="text-align:center;">${data.description}</p>
                <ul class="minor_other_details">
                   <li>humidity ${data.time}</li> 
                   <li>humidity ${data.humidity}</li> 
                   <li id="min-max">
                        <span><span class="range">${data.min}</span><sup>&#176;c</sup></span>
                        <small>-</small>
                        <span><span class="range">${data.max}</span><sup>&#176;c</sup></span>
                    </li> 
                </ul>
           `
         return minor;
    }
}