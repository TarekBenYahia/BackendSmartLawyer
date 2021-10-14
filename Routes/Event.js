const router = require("express").Router();
const Event = require("../Models/Event");







router.post('/delete', async (req, res) => {
await Event.findOneAndRemove(
   { 
      title : req.body.title,
      start : req.body.start,
      end : req.body.end,
      color : req.body.color,
   }, {useFindAndModify: false}
).then(result => {
   console.log(result)
});
  
  
  
  });

router.post('/addevent' , async (req,res) => {
   const email = req.body.email;

 

   const event = new Event({   
    userid: req.body.userid,
    title : req.body.title,
    start : req.body.start,
    end : req.body.end,
    color : req.body.color,
    draggable : req.body.draggable,
    resizable : req.body.resizable,
    allDay : req.body.allDay,
    meta : req.body.meta
   });
   try{
     const saveedEvent = await event.save();
     res.send(saveedEvent);
   }catch(err){
res.status(400).send(err);
   }
})





   
router.post('/getevents' , async (req,res) => {
    const id = req.body.userid;

    await Event.find({ userid : id} )
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

router.get('/getAllEvents/:id' , async (req,res) => {
   const id = req.params.id;

   await Event.find({ userid : id} )
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





 



module.exports = router;