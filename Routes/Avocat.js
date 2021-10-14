const router = require("express").Router();
const Avocat = require("../Models/Avocat");
var multer  = require('multer');

const User = require("../Models/User");
const mongoDB = require('mongodb');


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


     const avocat = new Avocat({   
         userid: req.body.userid,
         nom: req.body.nom,
         prenom: req.body.prenom,
         daten : req.body.daten,
         description: req.body.description,
         sexe: req.body.sexe,
         phone: req.body.phone,
         country: req.body.country,
         city: req.body.city,
         domaine: req.body.domaine,
         image: req.file.filename
     });

     const id=req.body.userid
  
     const profilExist = await Avocat.findOne({ userid : id})
    
     if (profilExist)
     {
         return res.status(400).send({ message: 'votre profile existe deja ' });
     }else{
  
        try{
          const savedAvocat = await avocat.save();
         res.send(savedAvocat);

            }catch(err){
         res.status(400).send(err);
            }
         }
        
});


router.post('/getprofile' , async (req,res) => {
  const id = req.body.userid;

  Avocat.findOne({ userid : id} )
       .then(data => {
         console.log(data)
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

router.get('/getAll' , async (req,res) => {
  
  await Avocat.find({},function(err,avocats){
    if (err) {
      res.send('Erreur');
    }
    res.json(avocats);
  })
});

router.get('/getAvocat/:id', (req, res) => {
  const id = req.params.id;
  var o_id = new mongoDB.ObjectID(id);

  
 Avocat.findOne({
    _id: o_id
  })
  
  .then(userFound => {
    if (!userFound){
      return res.status(404).end();
    }
    // console.log(json(userFound));
    return res.status(200).json(userFound)
  })
  .catch(err => console.log(err));
  
   });


router.get('/file/:filename', (req, res) => {
  res.sendFile(process.cwd() + '/uploads/' + req.params.filename)
 
});

router.get('/countAvocats/:sexee',(req,res)=>{

  Avocat.count({sexe:req.params.sexee},function(err,result){
    if(err) {res.send(err)}
    else {res.json(result)}
  })
});

router.get('/countSexe',(req,res)=>{
  Avocat.collection.countDocuments({},function(err,result){
    if(err) {res.send(err)}
    else{
      Avocat.collection.countDocuments({sexe:"Homme"},function(errr,ress){
        if(errr){res.send(errr)}
        else{
          Avocat.collection.countDocuments({sexe:"Femme"},function(error,resu){
            if(error) {res.send(error)}
            else{
              Avocat.collection.countDocuments({domaine:"Droit des Personnes"},function(erreur,dp){
                if(erreur) {res.send(erreur)}
                else{
                  Avocat.collection.countDocuments({domaine:"Droit Rural"},function(er,dr){
                    if(er){res.send(er)}
                    else{
                      Avocat.collection.countDocuments({domaine:"Droit Immobilier"},function(e,di){
                        if(e){res.send(e)}
                        else{
                          Avocat.collection.countDocuments({domaine:"Droit Pénal"},function(errour,dpe){
                            if(errour){res.send(errour)}
                            else{
                              Avocat.collection.countDocuments({domaine:"Droit économique"},function(faute,deee){
                                if(faute){res.send(faute)}
                                else{
                                  const StatsSexe = {
                                    Total : String(result),
                                    Homme : String(ress),
                                    Femme : String(resu),
                                    DroitPersonnes : String(dp),
                                    DroitRural : String(dr),
                                    DroitImmobillier: String(di),
                                    DroitPenal : String(dpe),
                                    Droiteco : String(deee)
                                  }
                                  res.json(StatsSexe);
                                }
                              })
                            }
                          })
                        }
                      })
                    }
                  })
                }
              })
            }
          
          })
          
        }
      })
    }
  })
});





module.exports = router;