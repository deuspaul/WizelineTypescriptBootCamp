//import express, { Request, response, Response } from "express";
//import { request } from "http";
import express, { Request, Response } from "express";

import * as cakeController from "./cakes/cakeController";
import Cake from "./cakes/cake"

// Our Express APP config
const app = express();
const bodyParser    = require('body-parser');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.json());

let cakeArray = [];

app.set("port", process.env.PORT || 3000);

// API Endpoints
app.get('/', (req: Request, res: Response) => res.send("Hello World"));
/* app.get('/hello_world', (req,res)=>{
    res.send('Hello World');
    }) */
   /*  app.get('/', (req,res)=>{
        res.send('Hello World');
        }) */

        app.get("/cake/:name", cakeController.getCake);

        app.get("/cakes", cakeController.allCakes);


        app.delete("/cake/:name", cakeController.deleteCake);




        




        app.post("/cake", cakeController.addCake);

        //app.post("/cake", (req: Request, res: Response) => /*res.send("huh?")*/ {

        //}         
        //);
        /* export let addCake = (req: Request, res: Response) => {
            var cake = new Cake(req.body);
            console.log(cake)
            cake.save((err: any) => {
                if (err) {
                    res.send(err);
                } else {
                    res.send(cake);
                }
            });
          }; */



          app.put("/cake/name", cakeController.updateCake);


const server = app.listen(app.get("port"), () => {
  //console.log(request);  
  //console.log(response);
  console.log("App is running on http://localhost:%d", app.get("port"));
});