const { query } = require("express");

/* Global Variables */
const apiKey = "b6b2df7029c59742f6a82bb1b18c3456";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

const btn = document.querySelector("#generate");
btn.addEventListener("click", () => {
    const zipCode = document.querySelector("#zip").value;
    const userFeeling = document.querySelector("feelings").value;
    GetWeather(zipCode).then((data) => {
        console.log(data);
        postData("http://127.0.0.1:3000/addUserComment", {
            City: data.name,
            temp: data.temp,
            feeling: userFeeling,
        });
        updateUI();
    });
});
const GetWeather = async(zipCode) => {
    const BaseUrl = `http://api.openweathermap.org/data/2.5/weather?zip=${zipcode}&units=metric&appid=${apiKey}`;
    const result = await fetch(BaseUrl);

    try {
        const data = await result.json();
        // let temperature = data.main.temp;
        // let cityName = data.name;
        let newData = { name: data.name, temp: data.main.temp };
        console.log(newData);
        return newData;
    } catch (exception) {
        console.log(`an error has been occurred => ${exception}`);
        alert("Please enter right zip code !!");
    }
    const postData = async(url = "", data = {}) => {
        const response = await fetch(url, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            credentials: "same-origin", // include, *same-origin, omit
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data), // body data type must match "Content-Type" header
        });

        try {
            const newData = await JSON.parse(JSON.stringify(response));
            console.log(newData);
            return newData;
        } catch (error) {
            console.log("error", error);
            // appropriately handle the error
        }
    };
    const updateUI = async() => {
        const request = await fetch("http://127.0.0.1:8000/all");
        try {
            const allData = await request.json();
            console.log(allData);
            document.getElementById("date").innerHTML = "Date : " + newDate;
            document.getElementById("temp").innerHTML =
                "Temperature : " + allData.temp + "°C";
            document.getElementById("content").innerHTML =
                "Your Feelings : " + allData.feeling;
        } catch (error) {
            console.log(`error : ${error}`);
        }
    };
};