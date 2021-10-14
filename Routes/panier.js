const router = require("express").Router();
const Panier = require("../Models/panier");
var multer  = require('multer');

router.post('/creerPanier', async(req,res)=>{
    const id = req.body.userid;
    const userName = req.body.userName;
    const cart = {}
    const products = new Panier ({
        userid: id,
       userName: userName,
       Produits: cart 
    });
    const verif= Panier.findOne(
        { userid : id}
        )
    if(verif){
        const savedPanier = products.save();
    res.send(savedPanier);
console.log("done")
    }
    else{
        res.send("existant")
    }
});
router.post('/AjoutCommande' , async (req,res) => {
    const id = req.body.idUser;
    console.log("slm");
   

    const panierr = {
      id : req.body.id,
      nomP: req.body.nomP,
      quantite: req.body.quantite,
      total : req.body.total,
      image : req.body.image
      
  }
  console.log(panierr);
    await  Panier.findOneAndUpdate(
      { userid : id},
      { $push: { Produits: panierr}}
      ).exec();

      res.send(true);
      console.log("done");
  });


  module.exports = router;