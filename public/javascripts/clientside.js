var i1 = document.querySelector('#ips10');
var m1 = document.querySelector('#data10');
var td1 = document.querySelector('#data10T');

var i2 = document.querySelector('#ips5');
var m2 = document.querySelector('#data5');
var td2 = document.querySelector('#data5T');

var i3 = document.querySelector('#ips1');
var m3 = document.querySelector('#data1');
var td3 = document.querySelector('#data1T');

var i02 = document.querySelector('#ips02');
var m02 = document.querySelector('#data02');
var td02 = document.querySelector('#data02T');

var i05 = document.querySelector('#ips05');
var m05 = document.querySelector('#data05');
var td05 = document.querySelector('#data05T');

var d1 = document.querySelector('#dataS');
var d2 = document.querySelector('#dataR');
var td = document.querySelector('#dataT');


i1.addEventListener('click', async (event) => {
    event.preventDefault();
    var t1 = performance.now();
    await fetch('/sensor/createData?sensorId=0&data=0').then(response => {
        response.json().then(data => {
            m1.textContent = 'TxnHash: ' + data.sdata.transactionHash + '\n\n Gas Used: ' + data.sdata.gasUsed;
        })
        t2 = performance.now();
        td1.textContent = (((t2 - t1) / 1000).toPrecision(3)).toString() + ' seconds';
    })
})
i2.addEventListener('click', async (event) => {
    event.preventDefault();
    var t1 = performance.now();
    await fetch('/sensor/createData?sensorId=0&data=1').then(response => {
        response.json().then(data => {
            m2.textContent = 'TxnHash: ' + data.sdata.transactionHash + '\n\n Gas Used: ' + data.sdata.gasUsed;
        })
        t2 = performance.now();
        td2.textContent = (((t2 - t1) / 1000).toPrecision(3)).toString() + ' seconds';
    })
})
i3.addEventListener('click', async (event) => {
    event.preventDefault();
    var t1 = performance.now();
    await fetch('/sensor/createData?sensorId=0&data=2').then(response => {
        response.json().then(data => {
            m3.textContent = 'TxnHash: ' + data.sdata.transactionHash + '\n\n Gas Used: ' + data.sdata.gasUsed;
        })
        t2 = performance.now();
        td3.textContent = (((t2 - t1) / 1000).toPrecision(3)).toString() + ' seconds';
    })
})

i02.addEventListener('click', async (event) => {
    event.preventDefault();
    var t1 = performance.now();
    await fetch('/sensor/createData?sensorId=0&data=3').then(response => {
        response.json().then(data => {
            m02.textContent = 'TxnHash: ' + data.sdata.transactionHash + '\n\n Gas Used: ' + data.sdata.gasUsed;
        })
        t2 = performance.now();
        td02.textContent = (((t2 - t1) / 1000).toPrecision(3)).toString() + ' seconds';
    })
})
i05.addEventListener('click', async (event) => {
    event.preventDefault();
    var t1 = performance.now();
    await fetch('/sensor/createData?sensorId=0&data=4').then(response => {
        response.json().then(data => {
            m05.textContent = 'TxnHash: ' + data.sdata.transactionHash + '\n\n Gas Used: ' + data.sdata.gasUsed;
        })
        t2 = performance.now();
        td05.textContent = (((t2 - t1) / 1000).toPrecision(3)).toString() + ' seconds';
    })
})

d1.addEventListener('click', async (event) => {
    event.preventDefault();
    var t1 = performance.now();
    await fetch('/sensor/getData?dataId=69').then(response => {
        response.json().then(data => {
            d2.textContent = data.sdata;
        })
        t2 = performance.now();
        td.textContent = (((t2 - t1) / 1000).toPrecision(3)).toString() + ' seconds';
    })
})
