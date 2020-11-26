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
    let time = new Date();
    let year = time.getFullYear();
    let month = time.getMonth() + 1;
    let day = time.getDate();
    let hour = time.getHours();
    let minute = time.getMinutes();

    let result = addZero(year) + addZero(month) + addZero(day) + addZero(hour) + addZero(minute);
    return result;
}

function getSensorData(n = 2) {
    let time = getTimeLocal();

    let arr = [6, 12, 60, 120, 300];

    let data = [];

    for (let i = 0; i < arr[n]; i++) {
        data.push(getRandom(15, 25));
    }

    return { time, data };
}

module.exports = { getSensorData };

