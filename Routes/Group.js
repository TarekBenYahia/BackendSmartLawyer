const router = require("express").Router();
const Group = require("../Models/Group");

var multer  = require('multer');

const storage = multer.diskStorage({
   destination: function (req, file, cb) {
     cb(null, './uploads')
   },
   filename: function (req, file, cb) {
     cb(null, Date.now() + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1])
   }
 })
 
 const upload = multer({ storage: storage })


router.post('/ajouter'  ,upload.single('file'), async (req,res) => {
  const userss = {
    id : req.body.userid, 
}

   const group = new Group({   
       nom: req.body.nom,
       desc: req.body.desc,
       image: req.file.filename,
      type: req.body.type,
      userid: req.body.userid,
      cat : req.body.cat,
      user : userss
   });

   try{
     const savedgroup = await group.save();
     res.send(savedgroup);
   }catch(err){
res.status(400).send(err);
   }
})

router.get('/getgroups' , async (req,res) => {

    const group =  Group;
     await group.find( )
         .then(data => {
         if (!data)
              res.status(404).send({ message: "Pas de group "});
            else res.send(data);
               })
          .catch(err => {
            res
             .status(500)
              .send({ message: "not find " });
});
})


router.post('/mygroup'  , async (req,res) => {

Group.find({"userid" : req.body.myid})
.then(data => {
  if (!data)
       res.status(404).send({ message: "no data "  });
     else 
     res.send(data);
        })
   .catch(err => {
     res
      .status(500)
       .send({ message: "not find "});
});

})

router.post('/group'  , async (req,res) => {

  Group.findOne({_id : req.body.myid})
  .then(data => {
    if (!data)
         res.status(404).send({ message: "no data "  });
       else 
       res.send(data);
          })
     .catch(err => {
       res
        .status(500)
         .send({ message: "not find "});
  });
  
  })


module.exports = router;