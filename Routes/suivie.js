const router = require("express").Router();
const Suivie = require("../Models/suivie");


const Rendezvous = require("../Models/rendezvous");  





router.post('/ajoutersuivie' , async (req,res) => {


    const suivie = new Suivie({   
        userid: req.body.userid,
        avocatid: req.body.avocatid,
        rdvid: req.body.rdvid,
        prdv: true,
        rrdv : false,
        paiment : false,
        verification : false
        
        
    });
    try{
        const savedsuivie= await suivie.save();
       res.send(savedsuivie);

          }catch(err){
       res.status(400).send(err);
          }
  
 
  });

  router.post('/getmysuivie' , async (req,res) => {
    const id = req.body.id;
  
    await  Suivie.findOne({ rdvid : id} )
         .then(data => {
         if (!data)
              res.status(404).send({ message: "no rdv " + id });
            else res.send(data);
               })
          .catch(err => {
            res
             .status(500)
              .send({ message: "not find " + id });
});


})

router.post('/rsuivie' , async (req,res) => {
    const id = req.body.id;
  
    await  Suivie.findOneAndUpdate({ rdvid : id},{ $set: { rrdv: true}}, { upsert: true })
         .then(data => {
         if (!data)
              res.status(404).send({ message: "no rdv " + id });
            else res.send(data);
               })
          .catch(err => {
            res
             .status(500)
              .send({ message: "not find " + id });
});
await  Rendezvous.findByIdAndUpdate({ _id : id},{ $set: { etat: "1"}}, { upsert: true } );

})
router.post('/paysuivie' , async (req,res) => {
    const id = req.body.id;
  
    await  Suivie.findOneAndUpdate({ rdvid : id},{ $set: { paiment: true}}, { upsert: true })
         .then(data => {
         if (!data)
              res.status(404).send({ message: "no rdv " + id });
            else res.send(data);
               })
          .catch(err => {
            res
             .status(500)
              .send({ message: "not find " + id });
});


})



module.exports = router;