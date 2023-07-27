const express = require('express');

const { routesUser, routesAuthentication, routesBudget, routesServiceSolicitation, routesService, routesProfile, routesServices } = require('./routes');

const cors = require('cors');
const app = express();
const port = process.env.PORT || 3333;
app.use(cors());
app.use(express.json());

app.use(routesUser, routesAuthentication, routesBudget, routesServiceSolicitation, routesService, routesProfile, routesServices );

app.listen(port, (error) => {
    if(error) {
        console.log('eita erro...');
        return;
    }
    console.log('showw');
});
