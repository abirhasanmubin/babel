

var i1 = document.querySelector('#ips10');
var i2 = document.querySelector('#ips5');
var i3 = document.querySelector('#ips1');


var i02 = document.querySelector('#ips02');
var i05 = document.querySelector('#ips05');

var m1 = document.querySelector('#data01');
var m2 = document.querySelector('#data02');
var m3 = document.querySelector('#data05');


var m02 = document.querySelector('#data02');
var m05 = document.querySelector('#data05');

var td1 = document.querySelector('#data10T');
var td2 = document.querySelector('#data5T');
var td3 = document.querySelector('#data1T');


var td02 = document.querySelector('#data02T');
var td05 = document.querySelector('#data05T');

var d1 = document.querySelector('#dataS');
var d2 = document.querySelector('#dataR');
var td = document.querySelector('#dataT');


i1.addEventListener('click', async (event) => {
    event.preventDefault();
    var t1 = performance.now();
    await fetch('/sensor/createData?sensorId=0').then(response => {
        response.json().then(data => {
            m1.textContent = data.sdata.transactionHash;
            console.log(data.sdata.transactionHash);
        })
        t2 = performance.now();
        td1.textContent = ((t2 - t1) / 1000).toString() + ' s';
    })
})
i2.addEventListener('click', async (event) => {
    event.preventDefault();
    var t1 = performance.now();
    await fetch('/sensor/createData?sensorId=0').then(response => {
        response.json().then(data => {
            m2.textContent = data.sdata.transactionHash;
            console.log(data.sdata.transactionHash);
        })
        t2 = performance.now();
        td2.textContent = ((t2 - t1) / 1000).toString() + ' s';
    })
})
i3.addEventListener('click', async (event) => {
    event.preventDefault();
    var t1 = performance.now();
    await fetch('/sensor/createData?sensorId=0').then(response => {
        response.json().then(data => {
            m3.textContent = data.sdata.transactionHash;
            console.log(data.sdata.transactionHash);
        })
        t2 = performance.now();
        td3.textContent = ((t2 - t1) / 1000).toString() + ' s';
    })
})

i02.addEventListener('click', async (event) => {
    event.preventDefault();
    var t1 = performance.now();
    await fetch('/sensor/createData?sensorId=0').then(response => {
        response.json().then(data => {
            m02.textContent = data.sdata.transactionHash;
            console.log(data.sdata.transactionHash);
        })
        t2 = performance.now();
        td02.textContent = ((t2 - t1) / 1000).toString() + ' s';
    })
})
i05.addEventListener('click', async (event) => {
    event.preventDefault();
    var t1 = performance.now();
    await fetch('/sensor/createData?sensorId=0').then(response => {
        response.json().then(data => {
            m05.textContent = data.sdata.transactionHash;
            console.log(data.sdata.transactionHash);
        })
        t2 = performance.now();
        td05.textContent = ((t2 - t1) / 1000).toString() + ' s';
    })
})

d1.addEventListener('click', async (event) => {
    event.preventDefault();
    var t1 = performance.now();
    await fetch('/sensor/getData?dataId=20').then(response => {
        response.json().then(data => {
            d2.textContent = data.sdata;
            console.log(data.sdata);
        })
        t2 = performance.now();
        td.textContent = ((t2 - t1) / 1000).toString() + ' s';
    })
})
