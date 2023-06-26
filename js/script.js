if (annyang) {
    console.log("We have annyang");

    // annyang.setLanguage('bg');

    var commands = {
        'Hy Fyle show home' : home,
        'pp' : home,
        'Hy Fyle show weather' : weather,
        'tt' : weather
        // you can add your commands and 
        
    }


    function home() {
        console.log("Home");
        location.hash = "anchorHome";
    }

    function weather(){
        console.log("Weather");
        location.hash = "anchorWeather";
    }

    // Add Commands
    annyang.addCommands(commands);

    // Start listening
    annyang.start();
}
//Time
setInterval(() => {
    let today = new Date();
    let h = today.getHours();
    let m = today.getMinutes();
    m = checkTime(m);
    let time = h + ":" + m;
    document.getElementById("time").innerHTML = time;
    // console.log("time is ticking")
}, 1);
function checkTime(i){
    if(i < 10) {
        i = "0" + i;
    }
    return i;
}


//Notification
function getWeekDay(date){
    newDate = new Date();
    let today = newDate.getDay();
    let notificationMsg = document.getElementById("notifications");
    if(today == 5) {
        notificationMsg.innerHTML = "Get the bin out...";
    } else {
        notificationMsg.innerHTML = "No new notifications";
    }
}

// getWeekDay();

// Get Subscribers
const youtubeKey = 'AIzaSyCDVa6CRvBlzX9o5Giss0GTl43RubVfXmE';
const youtubeUsername = 'UCJskGeByzRRSvmOyZOz61ig';
const odometer = document.querySelector('.odometer');
const delay = 1000; // 10 min
// var delay = 60 * 60 * 1000; // 1 hour in msec

function getSubscribers() {

    fetch(`https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${youtubeUsername}&key=${youtubeKey}`)
    .then(response => {
        return response.json()
    }) 
    .then(data => { 
        console.log(data);
        // console.log(data["items"][0].statistics.subscriberCount);
        var subCount = parseInt(data["items"][0].statistics.subscriberCount);   
        //to see view count
        var vCount = parseInt(data["items"][0].statistics.viewCount);
        odometer.innerHTML = subCount; 
        
    })
    .catch(err => {

    })
    // i++;
}
setInterval(() => {
    getWeekDay();
    getSubscribers();
}, delay);

// Weather
// const proxy = 'https://cors-anywhere.herokuapp.com/';
let weatherIcon = document.querySelector('.weather__icon');
let weatherTitle = document.querySelector('.weather__title');

function getWeather() {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=YOUR KEY HERE`)
    .then(response => {
        return response.json()
    }) 
    .then(data => { 
        console.log(data);
        weatherTitle.innerHTML = data.weather[0].description;
        weatherIcon.classList.add(`owf-${data.weather[0].id}`);
        getWeatherPhoto(data.weather[0].description);
    })
    .catch(err => {
    })
}
getWeather();



// Unsplash change weather photo based on weather
let weatherWrapper = document.querySelector('#weather');
function getWeatherPhoto(weather) {
    let unsplashApi = 'https://api.unsplash.com/search/photos?client_id=YOUR KEY HERE&page=1&per_page=1&query='+weather;
    fetch(unsplashApi)
    .then(response => {
        return response.json()
    }) 
    .then(data => { 
        weatherWrapper.setAttribute('style', 'background-image:url('+ data.results[0].urls.regular +');');
    }) 
    .catch(err => {
    })
}