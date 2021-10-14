const router = require("express").Router();
const Client = require("../Models/Client");
var multer  = require('multer');



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './Uploads')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1])
    }
  })
  
  const upload = multer({ storage: storage })


  router.post('/profile' ,upload.single('file') , async (req,res) => {


     const client = new Client({   
         userid: req.body.userid,
         nom: req.body.nom,
         prenom: req.body.prenom,
         daten : req.body.daten,
         description: req.body.description,
         sexe: req.body.sexe,
         phone: req.body.phone,
         country: req.body.country,
         city: req.body.city,
         image: req.file.filename
     });

     const id=req.body.userid
  
     const profilExist = await Client.findOne({ userid : id})
    
     if (profilExist)
     {
         return res.status(400).send({ message: 'votre profile existe deja ' });
     }else{
  
        try{
          const savedClient = await client.save();
         res.send(savedClient);

            }catch(err){
         res.status(400).send(err);
            }
         }
        
});



router.post('/getprofile' , async (req,res) => {
    const id = req.body.userid;
   console.log(id);
    Client.findOne({ userid : id} )
         .then(data => {
         
         if (!data)
              res.status(404).send({ message: "no data "  });
            else 
            res.send(data);
               })
          .catch(err => {
            res
             .status(500)
              .send({ message: "not find " + id });
  });
  });
  router.get('/file/:filename', (req, res) => {
    res.sendFile(process.cwd() + '/uploads/' + req.params.filename)
   
  })
module.exports = router;