const router = require('express').Router();
const Stats = require('../models/stats.model');

router.route('/').get((req, res) => {
    Stats.find()
      .then(exercises => res.json(exercises))
      .catch(err => res.status(400).json('Error: ' + err));
  });

router.post('/add/:id', (req, res) =>{
    const performance= req.body.performance;
    const strength = req.body.strength;
    const weakness = req.body.weakness;
    const journal = req.body.journal;
    const rating = req.body.rating;
    // const date = Date.parse(req.body.date);

    const newStats = new Stats({
        performance,
        strength,
        weakness,
        journal,
        rating,
        // date,
      });

    newStats.save()
    .then(() => res.json('Stats has been added'))
    .catch(err => res.status(400).json('Error : ' + err));
});


// router.route('/add/:id').post((req, res) => {
//     const username = req.body.username;
//     const description = req.body.description;
//     const duration = Number(req.body.duration);
//     // const date = Date.parse(req.body.date);
  
//     const newExercise = new Exercise({
//       username,
//       description,
//       duration,
//       // date,
//     });
  
//     newExercise.save()
//     .then(() => res.json('Exercise added!'))
//     .catch(err => res.status(400).json('Error: ' + err));
//   });

router.route('/:id').get((req, res) => {
    Stats.findById(req.params.id)
      .then(stats => res.json(stats))
      .catch(err => res.status(400).json('Error: ' + err));
  });


  
router.route('/:id').delete((req, res) => {
    Stats.findByIdAndDelete(req.params.id)
      .then(() => res.json('Exercise deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });


  //patch
  
// router.route('/:id').patch((req, res) => {
//     // const {performance, journal, strength, weakness, rating} = req.params;
//      try{
//         const updatePost = Stats.updateOne({id: req.params._id}, 
//           {$set: {performance: req.params.performance}});
//             // {$set: {'performance': performance, 'journal': journal, 'strength': strength, 'weakness': weakness, 'rating': rating}}
//             // );
//         res.json(updatePost);
//         // updatePost.save();

//     }catch(err){
//         res.json({message: err});
//     }
//   });

  router.patch('/:id', function(req, res, next) {
    Stats.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  });


    // Stats.findById(req.params.id)
    //   .then(stats => {
    //     stats.performance = req.body.performance;
    //     stats.strength = req.body.strength;
    //     stats.weakness = req.body.weakness;
    //     stats.journal = req.body.journal;
    //     stats.rating = Number(req.body.rating);
    //     stats.date = Date.parse(req.body.date);
  
    //     stats.save()
    //       .then(() => res.json('Exercise updated!'))
    //       .catch(err => res.status(400).json('Error: ' + err));
    //   })
    //   .catch(err => res.status(400).json('Error: ' + err));

module.exports = router;


