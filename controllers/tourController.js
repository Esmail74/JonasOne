const Tour = require('../models/tourModel');




//#region Routes
module.exports.getAllTours = (req, res) => {
   res.status(200).json({
      status: 'success',

   });
};

module.exports.getTour = (req, res) => {
   const id = req.params.id * 1; //Trick to convert it to number

};

module.exports.createTour = async (req, res) => {
   try {
      const newTour = await Tour.create(req.body);

      res.status(201).json({
         status: 'success',
         data: {
            tour: newTour
         }
      });
   } catch (err) {
      res.status(400).json({
         status: 'fail',
         message: 'Invalid data sent!'
      });
   }

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
//#endregion