const express = require('express');
const store_route = express();
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const auth = require('../middleware/auth');
const storeController = require('../controllers/storeController');


store_route.use(bodyParser.json());

store_route.use(bodyParser.urlencoded({extended : true}));
store_route.use(express.static('public'));

const storage = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null,path.join(__dirname,'../public/storeImages'),function(error,success){
            if(error) throw error;
        });
    },
    filename : function(req,file,cb){
        const name = Date.now() + '-' + file.originalname;
        cb(null,name,function(error,success){
            if(error) throw error;
        })
    }
})

const upload = multer({storage : storage});

store_route.post('/create-store',auth,upload.single('logo'),storeController.create_store);
module.exports = store_route;
