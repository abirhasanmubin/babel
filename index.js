import express from 'express';
import path, { dirname } from 'path';
import hbs from 'hbs';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

var publicPath = path.join(__dirname, '/public');

var app = express();
var port = process.env.PORT || 3000;

app.set('view engine', 'hbs');
app.use(express.static(publicPath));

app.get('', (req, res, next) => {
    res.render('index');
});

app.use('/account', (req, res, next) => {
    res.render('account', {
        account: accountData,
        msg: 'Test',
    });
});

app.listen(port, () => {
    console.log('Server is started on port ' + port);
});
