/* Global Variables */
const apiKey = "b6b2df7029c59742f6a82bb1b18c3456";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

const btn = document.querySelector("#generate");
const postData = async(url = "", data = {}) => {
    const response = await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(data),
    });

    try {
        const newData = await JSON.parse(JSON.stringify(response));
        console.log(newData);
        return newData;
    } catch (error) {
        console.log("error", error);
    }
};
const updateUI = async() => {
    const request = await fetch("http://127.0.0.1:3000/all");
    try {
        const allData = await request.json();
        console.log(allData);
        document.querySelector("#date").innerHTML = "Date: " + newDate;
        document.querySelector("#temp").innerHTML =
            "Temperature: " + allData.temp + "°";
        document.querySelector("#content").innerHTML =
            "Your feelings: " + allData.feeling;
    } catch (error) {
        console.log(`Error : ${error}`);
    }
};

btn.addEventListener("click", () => {
    const zipCode = document.querySelector("#zip").value;
    const userFeeling = document.querySelector("#feelings").value;
    GetWeather(zipCode).then((data) => {
        console.log(data);
        postData("http://127.0.0.1:3000/addUserComment", {
            City: data.name,
            feeling: userFeeling,
            temp: data.temp,
        });
        updateUI();
    });
});
const GetWeather = async(zipCode) => {
    const BaseUrl = `http://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&units=metric&appid=${apiKey}`;
    const result = await fetch(BaseUrl);

    try {
        const data = await result.json();
        let newData = { name: data.name, temp: data.main.temp };
        console.log(newData);
        return newData;
    } catch (exception) {
        console.log(`Error's been defined => ${exception}`);
        alert("Make sure that you enter valid ZipCode !!!!!!!");
    }
};