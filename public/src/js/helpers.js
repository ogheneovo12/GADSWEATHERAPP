class StorageHelper {
  static itemName = "weatherSearch";
  static SaveData(data) {
    let oldData = this.getData() || [];
    //check if we already have that city then update
    if (oldData.length > 0) {
      //remove oldata if exists, then append
      oldData = oldData.filter((weather) => weather.city !== data.city);
    }
    oldData.push(data);
    localStorage.setItem(this.itemName, JSON.stringify(oldData));
  }
  static getData() {
    return JSON.parse(localStorage.getItem(this.itemName));
  }
}


function getRelevantData(data) {
  const {
    name,
    main: { temp, humidity, pressure, temp_max, temp_min },
    weather,
    sys: { country: countryCode },
    dt,
  } = data;
  const { name: country, flag } = getCountry(countryCode);

  return {
    city: name,
    country,
    flag,
    temperature: temp,
    description: weather[0].description,
    humidity,
    pressure,
    dt,
    time: new Date(dt * 1000).toDateString(),
    min: temp_min,
    max: temp_max,
    icon:weather[0].icon
  };
}


function getCountry(countryCode) {
  return countries.find((country) => country.alpha2Code == countryCode);
}

function getGreeting(){
  const now = new  Date().toLocaleTimeString().split(' ')
  if(now[1]== "AM")return "GOOD MORNING";
  if(period == "PM"){
    const hour = +now[0].split(":")[0]
    if(hour == 12 || hour < 4)return "GOOD AFTERNOON";
    return "GOOD EVENING"
  }
}