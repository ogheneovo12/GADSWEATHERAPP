const functions = require("firebase-functions");
const fetch = require('node-fetch');
const api_url = "https://api.openweathermap.org/data/2.5/weather/";
const key = process.env.api_key
exports.weather = functions.https.onRequest((request,response) => {
   const number = Math.round(Math.random() * 100);
   response.send(number.toString())
 })


