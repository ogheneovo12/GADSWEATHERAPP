const api_url = "https://api.openweathermap.org/data/2.5/weather/";
const input = document.querySelector("#inputui");
const btn = document.querySelector("#btnget");

//implement greeting

//change update function
//then submit
initApp();

btn.addEventListener("click", (e) => {
  e.preventDefault();
  const query = `${input.value}`;
  if (!!!query) return UI.errorAlert("please enter a valid city");
  handleSearch(`q=${query}`);
});

function handleSearch(query) {
  UI.displayLoading("main");
  getWeather(query)
    .then(
      (data) => {
        UI.removeLoading();
        UI.displayWeatherResult(data);
        updateSearchesUi();
      },
      (error) => {
        UI.removeLoading();
        UI.errorAlert(error);
      }
    )
    .catch(console.log);
}
function getWeather(query) {
  return fetch(
    `${api_url}/?${query}&units=metric&appid=47eb3373f62109aa49c6d644e4cf2d9f`
  ).then(handleResponse);

  function handleResponse(response) {
    return response.text().then((text) => {
      if (!response.ok) {
        if (response.status === 401 || response.status === 500) {
          return Promise.reject(
            "soory we couldn't accesss our server, this is our fault, our engineers are on it:( "
          );
        }
        const data = text && JSON.parse(text);
        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
      }
      const data = text && JSON.parse(text);
      relevantData = getRelevantData(data);
      StorageHelper.SaveData(relevantData);
      return relevantData;
    });
  }
}

function initApp() {
  UI.greet();
  UI.displayLoading();

  //check if the user has made any searches before 
  //if not use the user location for first search
  const searches = StorageHelper.getData();
  if (!searches || !searches.length) {
    getUserLocation()
    .then((location) => {
      handleSearch(`lat=${location.latitude}&lon=${location.longitude}`);
    })
    .catch((error) => {
      UI.errorAlert(error);
      UI.removeLoading();
    });
    return;
  }

  updateSearchesUi();
  UI.displayWeatherResult(searches.pop());
  UI.removeLoading();

}

function updateSearchesUi() {
  const searches = StorageHelper.getData();
  UI.displaySearchHistory(searches);
}
