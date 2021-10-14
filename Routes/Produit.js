const router = require("express").Router();

var multer  = require('multer');
const Produit = require("../Models/Produit");

const storage = multer.diskStorage({
   destination: function (req, file, cb) {
     cb(null, './uploads')
   },
   filename: function (req, file, cb) {
     cb(null, Date.now() + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1])
   }
 })
  
 const upload = multer({ storage: storage })

 router.post('/ajouterProduit'  ,upload.single('file'), async (req,res) => {  
     const product = new Produit({   
         nom: req.body.nom,
         image: req.file.filename,
         desc: req.body.desc,
        quantite: req.body.quantite,
        prix: req.body.prix
     });
  
     try{
       const savedProduct = await product.save();
       res.send(savedProduct);
     }catch(err){
  res.status(400).send(err);
     }
  });
  router.get('/getAllProducts' , async (req,res) => {
  
    await Produit.find({},function(err,avocats){
      if (err) {
        res.send('Erreur');
      }
      res.json(avocats);
    })
  });


  module.exports = router;