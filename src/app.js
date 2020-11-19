import { error, log } from 'console';

import { hbs } from 'hbs';

import {
    asyncCreateSensor,
    asyncCreateData,
    asyncGetData,
    asyncGetSensorById,
    asyncGetLatestData
} from './utils/web3';

import { getSensorData } from './utils/utils';

import async from 'hbs/lib/async';


var express = require('express');

var path = require('path');

// const __dirname = dirname(fileURLToPath(import.meta.url));

var publicPath = path.join(__dirname, '../public');

var app = express();
var port = process.env.PORT || 3000;

app.set('view engine', 'hbs');
app.use(express.static(publicPath));

app.get('', (req, res, next) => {
    res.render('index');
});

app.get('/sensor/createSensor', (req, res, next) => {

    if (!req.query.sname) {
        return res.send({
            error: 'You must provide an Sensor Name.'
        })
    }

    (async () => {
        var data = await asyncCreateSensor(req.query.sname);
        res.send({
            sdata: data,
            name: "abirhasanmubin"
        });
    })();
});

app.get('/sensor/getSensor', (req, res, next) => {

    if (!req.query.sensorId) {
        return res.send({
            error: 'You must provide an Data ID.'
        })
    }

    (async () => {
        var sda = await asyncGetSensorById(req.query.sensorId);
        res.send({
            sdata: sda,
            name: "abirhasanmubin"
        });
    })();
});

app.get('/sensor/createData', (req, res, next) => {

    if (!req.query.sensorId) {
        return res.send({
            error: 'You must provide an Sensor ID.'
        })
    }

    if (!req.query.data) {
        req.query.data = 2;
    }

    var inputData = getSensorData(req.query.data);

    (async () => {
        var data = await asyncCreateData(req.query.sensorId, inputData.time.date, inputData.time.hour, inputData.time.minute, inputData.data);
        res.send({
            sdata: data,
            name: "abirhasanmubin"
        });
    })();
});

app.get('/sensor/getData', (req, res, next) => {

    if (!req.query.dataId) {
        (async () => {
            var sda = await asyncGetLatestData(req.query.dataId);
            res.send({
                sdata: sda,
                name: "abirhasanmubin"
            });
        })();
    }

    (async () => {
        var sda = await asyncGetData(req.query.dataId);
        res.send({
            sdata: sda,
            name: "abirhasanmubin"
        });
    })();
});

app.listen(port, () => {
    console.log('Server is started on port ' + port);
});
