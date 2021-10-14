const router = require("express").Router();
const Rendezvous = require("../Models/rendezvous");
const Avocat = require("../Models/Avocat");
const Client = require("../Models/Client");


const User = require("../Models/User");

  
    
router.post('/addrendezvous' , async (req,res) => {
    
    const rendezvous = new Rendezvous({   
     userid: req.body.userid,
     avocatid : req.body.avocatid,
     sujet : req.body.sujet,
     date : req.body.date,
     etat : req.body.etat,
    });
    try{
      const saveedRendezvous = await rendezvous.save();
      res.send(saveedRendezvous);
    }catch(err){
 res.status(400).send(err);
    }
 }),



router.get('/getAllRendezvous' , async (req,res) => {
  
  await Rendezvous.find({},function(err,rendezvous){
    if (err) {
      res.send('Erreur');
    }
    res.json(rendezvous);
  })
});

router.post('/ajouterRdv' , async (req,res) => {


    const rendezvous = new Rendezvous({   
        userid: req.body.userid,
        avocatid: req.body.avocatid,
        sujet: req.body.sujet,
        date : req.body.date,
        etat: '0',
       
    });
    try{
        const savedrdv = await rendezvous.save();
       res.send(savedrdv);

          }catch(err){
       res.status(400).send(err);
          }
  
 
  });

router.get('/getMyRdvList/:id', (req, res) => {
  const id = req.params.id;
 // var o_id = new mongoDB.ObjectID(id);  
 Rendezvous.find({
    userid: id
  })
  .then(data => {
    if (!data){
      return res.status(404).end();
    }
    // console.log(json(userFound));
    return res.status(200).json(data)
  }) 
  .catch(err => console.log(err));
  
   });


   router.get('/getNomAvocat/:id', (req, res) => {
    const id = req.params.id;
   // var o_id = new mongoDB.ObjectID(id);  
   Avocat.findOne({
      _id: id
    })
    .then(data => {
      if (!data){
        return res.status(404).end();
      }
      // console.log(json(userFound));
      return res.status(200).json(data)
    })
    .catch(err => console.log(err));
    
     });
     router.get('/getAvocatUserId/:id', (req, res) => {
      const id = req.params.id;
     // var o_id = new mongoDB.ObjectID(id);  
     Avocat.findOne({
        userid: id
      })
      .then(data => {
        if (!data){
          return res.status(404).end();
        }
        // console.log(json(userFound));
        return res.status(200).json(data)
      })
      .catch(err => console.log(err));
      
       });

     router.get('/getMyRdvListAvocat/:id', (req, res) => {
      const id = req.params.id;
     // var o_id = new mongoDB.ObjectID(id);  
     Rendezvous.find({
        avocatid: id
      })
      .then(data => {
        if (!data){
          return res.status(404).end();
        }
        // console.log(json(userFound));
        return res.status(200).json(data)
      })
      .catch(err => console.log(err)); 
      
       });

       router.get('/getNomClient/:id', (req, res) => {
        const id = req.params.id;
       // var o_id = new mongoDB.ObjectID(id);  
       Client.findOne({
          userid: id
        })
        .then(data => {
          if (!data){
            return res.status(404).end();
          }
          // console.log(json(userFound));
          return res.status(200).json(data)
        })
        .catch(err => console.log(err));
        
         });
  







module.exports = router;