function getRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

function addZero(number) {
    if (number < 10) return '0' + number.toString();
    return number.toString();
}

function getTimeLocal() {
    var time = new Date();
    var year = time.getFullYear();
    var month = time.getMonth();
    var day = time.getDate();
    var hour = time.getHours();
    var minute = time.getMinutes();

    var date = year + month + day;
    return { date, hour, minute };
}

function getSensorData(n) {
    var time = getTimeLocal();

    var data = [];

    for (let i = 0; i < 60 * n; i++) {
        data.push(getRandom(15, 25));
    }

    return { time, data };
}



module.exports = { getSensorData };



// var asy = require('./test')

// let result = asy.asyncGetData(0);

// console.log(result);

