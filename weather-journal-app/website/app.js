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
    getDate(zipCode).then(function(data) {
        console.log(data);
        postData("http://127.0.0.1:8000/addUserComment", {
            City: data.name,
            temp: data.temp,
            feeling: userFeeling,
        });
        updateUI();
    });
});