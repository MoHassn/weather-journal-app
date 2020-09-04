/* Global Variables */
// open weather map API key
const WEATHER_API_KEY = "920bee757139179f39e31b5d4b32c386";
// Create a new date instance dynamically with JS
const newDate = () => {
  let d = new Date();
  return d.getMonth() + "." + d.getDate() + "." + d.getFullYear();
};

// Add event Listener to the generate button to get weather data on click

const generateButton = document.querySelector("#generate");
generateButton.addEventListener("click", () => {
  // get the data from the inputs
  const zipCode = document.querySelector("#zip").value;
  const userFeelings = document.querySelector("#feelings").value;
  const date = newDate();
  getWeatherData(zipCode, WEATHER_API_KEY)
    .then((weatherData) => {
      const temp = weatherData.main.temp;
      updateServerData({ temp, userFeelings, date });
    })
    .then(getServerData)
    .then(updateUI)
    .catch((e) => {
      console.log("An Error happened", e);
    });
});

// get the weather data
const getWeatherData = async (zipCode, API_KEY) => {
  const data = await fetch(
    `http://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${API_KEY}`
  );
  return await data.json();
};

// post data to the server
const updateServerData = async (data) => {
  const response = await fetch("/updateData", {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  try {
    response.json();
  } catch (e) {
    console.log("Error occurred in the post request", e);
  }
};

// get data from server

const getServerData = async () => {
  const response = await fetch("/data");
  const data = await response.json();
  return data;
};

// update the ui with the data

const updateUI = ({ temp, userFeelings, date }) => {
  // select each element and change its value with the data;
  document.querySelector("#temp").innerText = temp;
  document.querySelector("#content").innerText = userFeelings;
  document.querySelector("#date").innerText = date;
};
