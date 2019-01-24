const mongoose = require('mongoose');
var express = require('express');
var bodyParser = require('body-parser');
var path = require("path");
var cors = require('cors');
const config = require('./config');

var app = express();

var Product = require("./Models/product");

// Connection Mongo
mongoose.connect(config.DB).then(
    () => {console.log('Database is connected') },
    err => { console.log('Can not connect to the database' + err)
});

var products = new Product({
    columns: ['Name', 'Specifications', 'Prices', 'AnnouncementDate'],
    rows: [
        {
            Name: 'Leica D-Lux 7',
            Specifications: '17 megapixels | 3″ screen | 24 – 75 mm (3.1×)',
            Prices: 'Check prices',
            AnnouncementDate: 'Announced 2 months ago'
        },
        {
            Name: 'Leica Q-P',
            Specifications: '24 megapixels | 3″ screen',
            Prices: 'Check prices',
            AnnouncementDate: 'Announced 2 months ago'
        }, {
            Name: 'Leica M10-D',
            Specifications: '24 megapixels | Full frame sensor',
            'Prices': 'Check prices',
            AnnouncementDate: 'Announced 3 months ago'
        }, {
            Name: 'Zeiss ZX1',
            Specifications: '37 megapixels | 4.34″ screen',
            Prices: 'Check prices',
            AnnouncementDate: 'Announced 4 months ago'
        }, {
            Name: 'Fujifilm GFX 50R',
            Specifications: '51 megapixels | 3.2″ screen | Medium format sensor',
            Prices: '$4,499.00 - $6,584.60',
            AnnouncementDate: 'Announced 4 months ago'
        }, {
            Name: 'Ricoh GR III',
            Specifications: '24 megapixels | 3″ screen',
            Prices: 'Check prices',
            AnnouncementDate: 'Announced 4 months ago'
        }, {
            Name: 'Canon PowerShot SX70 HS',
            Specifications: '20 megapixels | 3″ screen | 21 – 1365 mm (65×)',
            Prices: '$549.00',
            AnnouncementDate: 'Announced 4 months ago'
        }, {
            Name: 'Sony Cyber-shot DSC-HX99',
            Specifications: '18 megapixels | 3″ screen | 24 – 720 mm (30×)',
            Prices: 'Check prices',
            AnnouncementDate: 'Announced 4 months ago'
        }, {
            Name: 'Panasonic Lumix DC-LX100 II',
            Specifications: '17 megapixels | 3″ screen | 24 – 75 mm (3.1×)',
            Prices: '$997.99 - $1,095.98',
            AnnouncementDate: 'Announced 5 months ago'
        }, {
            Name: 'Nikon D3500',
            Specifications: undefined,
            Prices: '$396.95 - $713.90',
            AnnouncementDate: 'Announced 5 months ago'
        }
    ]
});

products.save(() => {console.log("Your bee has been saved.")});

// use bodyParser to parse application/json content-type
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,"./src")));

// enable all CORS requests
app.use(cors());

let port = 5000 || process.env.PORT

app.get('/products', (req, res) => {
    res.send(products)
});

// start the server
app.listen(port, () => {
    console.log('Server is running on Port: ', port);
});