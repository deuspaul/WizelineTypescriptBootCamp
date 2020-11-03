import { Request, Response } from "express";
import Cake from "./cake"
const util = require('util')

let cakeArray = {};

export let addCake = (req: Request, res: Response) => {
  
    //var cake = new Cake(req.body);
    //console.log(cake)
    /* cake.save((err: any) => {
        if (err) {
            res.send(err);
        } else {
            res.send(cake);
        }
    }); */

    console.log("the req" + req)
    console.log("the reqbody: "+ req.body);
    let Cakez = new Cake(req.body);
    console.log(Cakez);
    Cakez.save((err: any) => {
        if (err) {
            res.send(err);
        } else {
            //res.send(Cakez);
            //cakeArray.push({name: Cakez.name, price: Cakez.price, flavors: Cakez.flavors})
            console.log("the cake flavors are: "+Cakez.flavors);
            //console.log("the cake name is: "+Cakez.name);
            console.log("the cake price is: "+Cakez.price);
            /* cakeArray.push(Cakez.name);
            cakeArray[Cakez.name].push(Cakez.price);
            cakeArray[Cakez.name].push(Cakez.flavors); */
            //cakeArray.Cakez.name = Cakez.price;
            cakeArray[Cakez.name] = {"price": Cakez.price, "flavors": Cakez.flavors};
            console.log(cakeArray);
            res.send(cakeArray);
        }
    })





  };

export let allCakes = (req: Request, res: Response) => {
        //console.log(req);
        //let cake = Cake.find(function(err: any, cake: any){if(err){res.send(err)}else{res.send(cake)}});
        //res.send(cake);
 /*    let cake = Cake.findBy(req.params.id, (err: any, cake: any) => {
        if (err) {
            res.send(err);
        } else {
            res.send(cake);
        }
      }); */
       
   let cakes = Cake.find((err: any, cakes: any) => {
    //console.log("the cake array has:"+cakeArray); 
    //console.log(util.inspect(cakeArray))
    if (err) {
        res.send(err);
    } else {
      console.log(cakes.length);  
      cakes.forEach(element => {
        cakeArray[element.name] = {"price": element.price, "flavors": element.flavors};
      });
      console.log(cakeArray);
      res.send(cakes);
        
        //res.send(cakeArray);
    }
  } );
};

export let getCake = (req: Request, res: Response) => {
  console.log(req.params.name);
  //console.log(typeof(cakeArray));
  //let cakeDetails = Object.values(cakeArray);
  //let cakeDetails = cakeArray.find(i => i.name == req.params.name);
  //const key = Object.keys(cakeArray).find(key => cakeArray[key] === req.params.name);
  //const key = cakeArray;
  //console.log(key);
  //console.log("object is above");
  /* if (Object.values(cakeArray).includes(req.params.name)){
    console.log("eureka");
  } */

  for (let k in cakeArray){
    //console.log(k);
    if (k == req.params.name){
      console.log(cakeArray[k]);
      let cakeDetails = cakeArray[k];
    }
  }
  if (cakeDetails){
    console.log("found in memory, no need to query the DB");
    res.send(cakeDetails)
  }else{
  let cake = Cake.find({name: req.params.name}, (err: any, cake: any) => {
    if (err) {
        res.send(err);
    } else {
        console.log("not found in memory, querying DB");
        if (cake==""){
          console.log("cake was not found in the DB, it must have been deleted");
          res.send("cake was not found in the database, it must have been deleted");
        } else {
          console.log("cake found in database, returning info:");
          res.send(cake);
        }
        
    }
  });
  }
};








export let deleteCake = (req: Request, res: Response) => {
  console.log(req.params.name);
  let cake = Cake.deleteOne({name :req.params.name }, (err: any) => {
    if (err) {
        res.send(err);
    } else {
        res.send("cake deleted successfully");
        for(let k in cakeArray){
          if(k == req.params.name){
            console.log("Now deleting entry from array"+cakeArray[k];
            delete cakeArray[k];
            )
          }
        }
    }
  });
};



export let updateCake = (req: Request, res: Response) => {
  console.log("body:");
  console.log(req.body);
  console.log("name");
  console.log(req.body.name);
  let cake = Cake.findOneAndUpdate(
      {name: req.body.name},
      {price: req.body.price, flavors: req.body.flavors},
      (err: any, cake: any) => {
        if (err) {
            res.send(err);
        } else {
            res.send("Cake updated successfully");
            for(let k in cakeArray){
              if(k == req.body.name){
                console.log("Updating the following in memory entry: "+cakeArray[k];
                cakeArray[k] = {"price": req.body.price, "flavors": req.body.flavors};
                )
              }
            }
        }
      }
  );
};

