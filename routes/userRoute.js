const express = require('express');

const user_route = express();

const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');

user_route.use(bodyParser.json());
user_route.use(bodyParser.urlencoded({extended  :true}));
user_route.use(express.static('public'));

const storage = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null,path.join(__dirname , '../public/userImages'),function(error,success){
            if(error) throw error;
        });
    },

    filename : function(req,file,cb){
        const name = Date.now() + '-' + file.originalname;
        cb(null,name,function(error,success){
            if(error) throw error

        })
    }

    
});


const upload = multer({storage :storage});

const userController = require('../controllers/userController');

user_route.post('/register',upload.single('image'),userController.register_user);
user_route.post('/login',userController.user_login);

module.exports = user_route;

