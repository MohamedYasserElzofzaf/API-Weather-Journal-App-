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
        headers: JSON.stringify(data),
        body: JSON.stringify(data),
    });

    try {
        const newData = await response.json();
        console.log(newData);
        return newData;
    } catch (error) {
        console.log("Error", error);
    }
};
const updateUI = async() => {
    const request = await fetch("/postData");
    try {
        const allData = await request.json();
        document.querySelector("#date").innerHTML = "Date: " + newDate;
        document.querySelector("#temp").innerHTML =
            "Temperature: " + allData.temp + "°";
        document.querySelector("#content").innerHTML =
            "Your feelings today: " + allData.feeling;
        return allData;
    } catch (error) {
        console.log(`Error : ${error}`);
    }
};
async function GetWeather(zipCode, userFeeling) {
    try {
        const response = await fetch(
            `http://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${apiKey}&units=metric`
        );
        if (response.status === 404 || response.status === 400) {
            return alert("Make sure that you enter valid ZipCode !!!!!!!");
        }
        const data = await response.json();
        const temp = data.main.temp;
        // console.log(temp);
        return temp;
    } catch (exception) {
        console.log(`Error's been defined => ${exception}`);
    }
}
btn.addEventListener("click", async() => {
    const zipCode = document.querySelector("#zip").value;
    const userFeeling = document.querySelector("#feelings").value;
    if (!zipCode) {
        return alert("Enter the zip code please!!!!!");
    }
    if (!userFeeling) {
        return alert("please tell us what you feel !!!");
    }
    GetWeather(zipCode, userFeeling).then((data) => {
        postData("/postData", { date: newDate, temp: temp, feeling: userFeeling });
        updateUI();
    });
});