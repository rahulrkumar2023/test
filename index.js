import express, { urlencoded } from "express";
import path from "path"
import expressEjsLayouts from "express-ejs-layouts";

import ProductController from "./src/contollers/product.controller.js";
import validateProduct from "./src/middlewares/newProductValidation.middleware.js";
import { uploadFile } from "./src/middlewares/imageUpload.middleware.js";


const server = express();
server.use(urlencoded({extended : true}));

server.set("view engine" , "ejs");
server.set("views" , path.join( path.resolve() , "src" , "views" ));

const productController = new ProductController();
server.use(express.static("src/views"));
server.use(expressEjsLayouts);

server.get("/" , (req , res)=>productController.getProducts(req , res));
server.get("/new" , productController.getAddForm);
server.post("/" , uploadFile.single('imageUrl'),validateProduct , productController.addNewProduct);

//update Product
server.get("/update-product/:id" , (req,res) =>{ productController.getUpdateProduct(req,res)});
server.post("/update-product" , (req,res) => productController.postUpdateProduct(req,res))

//delete product
server.delete("delete-product/:id" , (req,res)=>productController.deleteProduct(req, res));

server.listen(8080 , ()=>{
    console.log("Server running on port 8080");
});

