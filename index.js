const http = require("http");
const fs = require('fs');
var requests = require('requests');

const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
console.log(__dirname)

// const img1 = require('./IMAGES/rober-gonzalez-GY_jpyXnKk0-unsplash.jpg');

const indexFile = fs.readFileSync(__dirname + "/public/index.html", "utf-8");

const replaceVal = (tempVal, originalVal) => {
    let temperature = tempVal.replace("{%temp%}", Number.parseInt(originalVal.main.temp) - 273);
    temperature = temperature.replace("{%location%}", originalVal.name);
    temperature = temperature.replace("{%humidity%}", originalVal.main.humidity);
    temperature = temperature.replace("{%windSpeed%}", originalVal.wind.speed);
    temperature = temperature.replace("{%cloudy%}", originalVal.clouds.all);
    temperature = temperature.replace("{%weatherCondition%}", originalVal.weather[0].main);
    temperature = temperature.replace("{%weatherCondition1%}", originalVal.weather[0].main);
    temperature = temperature.replace("{%climateDescription%}", originalVal.weather[0].description);

    return temperature;
}

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
    // console.log(req.body.search)
    if (req.url == '/') {
        requests('https://api.openweathermap.org/data/2.5/weather?q=Pune&appid=32f70067b5008aaa675e8f2330003f04', {})
            .on('data', function (chunk) {
                const weatherData = JSON.parse(chunk);

                const arrWeatherData = [weatherData];

                var realTimeDataOfWeather;
                arrWeatherData.map((val) => {
                    realTimeDataOfWeather = replaceVal(indexFile, val);
                });

                res.send(`${realTimeDataOfWeather}`);
            })
            .on('end', function (err) {
                if (err) return console.log('connection closed due to errors', err);
                res.end();
            });
    }

})

app.use(bodyParser.urlencoded({extended:true}));

app.post('/', (req, res)=>{
    console.log("The request is received");
    console.log(req.body.anotherLocation);
    const query = req.body.anotherLocation;

    if (req.url == '/') {
        requests(`https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=32f70067b5008aaa675e8f2330003f04`, {})
            .on('data', function (chunk) {
                const weatherData = JSON.parse(chunk);

                const arrWeatherData = [weatherData];

                var realTimeDataOfWeather;
                arrWeatherData.map((val) => {
                    realTimeDataOfWeather = replaceVal(indexFile, val);
                });

                res.send(`${realTimeDataOfWeather}`);
            })
            .on('end', function (err) {
                if (err) return console.log('connection closed due to errors', err);
                res.end();
            });
    }
})


app.listen(8000);