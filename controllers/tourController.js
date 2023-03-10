const Tour = require('../models/tourModel');

module.exports.checkBody = (req, res, next) => {
   if (!req.body.name || !req.body.price) {
      return res.status(400).json({
         status: 'fail',
         message: 'Missing name or price'
      });
   }
   next();
};

module.exports.getAllTours = (req, res) => {
   res.status(200).json({
      status: 'success',

   });
};

module.exports.getTour = (req, res) => {
   const id = req.params.id * 1; //Trick to convert it to number

};

module.exports.createTour = (req, res) => {
   res.status(201).json({
      status: 'success',
      data: {
         tour: newTour
      }
   });
};

module.exports.updateTour = (req, res) => {
   res.status(200).json({
      status: 'success',
      data: {
         tour: '<Updated tour here...>'
      }
   });
};

module.exports.deleteTour = (req, res) => {

   res.status(204).json({
      status: 'success',
      data: null
   });
};