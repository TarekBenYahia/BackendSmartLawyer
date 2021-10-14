const router = require("express").Router();
const Post = require("../Models/Post");
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

router.post('/addpost' ,upload.single('file') , async (req,res) => {
    const blog = new Post({   
        userid: req.body.userid,
        message: req.body.message,
        image: req.file.filename,
        nom: req.body.nom,
        prenom: req.body.prenom,
        imageuser: req.body.imageuser,
        role: req.body.role

    });
       try{
         const savedpost = await blog.save();
        res.send(savedpost);

           }catch(err){
        res.status(400).send(err);
           }
});

router.post('/getmypost' , async (req,res) => {
    const id = req.body.userid;
  
    await  Post.find({ userid : id} ).sort({datepost: -1})
         .then(data => {
         if (!data)
              res.status(404).send({ message: "no event " + id });
            else res.send(data);
               })
          .catch(err => {
            res
             .status(500)
              .send({ message: "not find " + id });
});
});

router.get('/getmypostT/:id' , async (req,res) => {
  const id = req.params.id;

  await  Post.find({ _id : id} ).sort({datepost: -1})
       .then(data => {
       if (!data)
            res.status(404).send({ message: "no event " + id });
          else res.send(data);
             })
        .catch(err => {
          res
           .status(500)
            .send({ message: "not find " + id });
});
})


router.post('/getallpost' , async (req,res) => {
  
  await Post.find({},function(err,post){
    if (err) {
      res.send('Erreur');
    }
    res.send(post);
  })
});

router.get('/getAllposts' , async (req,res) => {
  
  await Post.find({},function(err,post){
    if (err) {
      res.send('Erreur');
    }
    res.send(post);
  })
});


router.post('/addcomment' , async (req,res) => {
    const id = req.body.postid;
 
  const comme = {
      message : req.body.message,
      nom : req.body.nom,
      prenom : req.body.prenom,
      userid : req.body.userid,
      rating : req.body.rating,
      imagecomment : req.body.imagecomment
  }

  await Post.findOneAndUpdate(
      { _id : id},
      {$push : {comments :comme}},
      {useFindAndModify: false}
  ).exec()
  res.send(comme);
 
})

router.post('/deletepost' , async (req,res) => {
  const id = req.body.postid;


await Post.findOneAndDelete(
    { _id : id}
).exec()
res.send(id);

})


router.post('/deletecomment' , async (req,res) => {
  const comment = req.body.comment;
  const idposte = req.body.idposte;

await Post.findOneAndUpdate(
    { _id : idposte},
    { $pull: { comments: comment}}
).exec()
res.send(id);

})


router.post('/like' , async (req,res) => {
  const id = req.body.postid;
  const idu = req.body.idUser;
  const like = {
    idUser : idu,
    
}
  await  Post.findOneAndUpdate(
    { _id : id},
    { $push: { likes: like}}
    );
    res.send(true);
})

router.post('/dislike' , async (req,res) => {
  const id = req.body.postid;
  const idu = req.body.idUser;
  const like = {
    idUser : idu,
    
}
  await  Post.findOneAndUpdate(
    { _id : id},
    { $pull: { likes: like}}
    );
    res.send(true);
})


module.exports = router;