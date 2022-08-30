const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const { dbConection } = require("../database/config");
class Server{ //class
    constructor(){
        //Methods
       this.app = express(); //propiedad 
       this.port=process.env.PORT
       this.paths={
        vuelos:'/api/vuelos',
       }
       //Middlewares
       this.middlewares();
       //routes
       this.routes(); 

       this. conexionDB();
    }

    async conexionDB() {
        await dbConection();
    }
    middlewares(){
        //CORS 
        this.app.use(cors());

        //Lectura y parseo del body
        this.app.use(express.json());
        this.app.use(logger('dev'));

        //Directorio public
        this.app.use(express.static('public'));
       }

    routes(){
     this.app.use(this.paths.vuelos,require('../routes/flightsRoutes'))
    }

    listen(){
        this.app.listen(this.port,()=>{
            console.log('listening on port '+ this.port);
        });
    }    
}

module.exports=Server;