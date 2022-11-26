console.log("This is a Index.js");

let newDate = new Date();
let currentDay = newDate.getDay();
let currentHours = newDate.getHours();
let currentMinutes = newDate.getMinutes();
let currentSeconds = newDate.getSeconds();

setInterval(() => {
    // let Daynew = new Date();
    // currentSeconds = Daynew.getSeconds();
    // console.log(currentSeconds)

    let newDate = new Date();
    let currentDay = newDate.getDay();
    let currentDate = newDate.getDate();
    let currentYear = newDate.getFullYear();
    // currentYear = currentYear[2] + currentYear[3];
    let currentMonth = newDate.getMonth();
    let currentHours = newDate.getHours();
    let currentMinutes = newDate.getMinutes();
    if(currentMinutes < 10){
        currentMinutes = '0'+currentMinutes;
    }
    let currentSeconds = newDate.getSeconds();

    // console.log(`${currentHours} ${currentMinutes} ${currentSeconds}`)

    let weeks = ['Sunday','Monday', 'Tuesday','Wednesday','Thrusday','Friday','Saturday'];
    let months = ['Jan','Feb','Mar','Apr','May','June','July','Aug','Sep','Oct','Nov','Dec'];
    let displayDate = document.querySelector(".date");
    displayDate.innerHTML = `${currentHours}:${currentMinutes}-${weeks[currentDay]}, ${currentYear} ${months[currentMonth]}' ${currentDate}`;
    console.log( `${currentHours}:${currentMinutes}-${weeks[currentDay]}, ${currentYear} ${months[currentMonth]}' ${currentDate}`)
}, 1000);
