const Tour = require('../models/tourModel');




//#region Routes
module.exports.getAllTours = async (req, res) => {
   try {
      //Build a query
      // 1A) Filtering
      const queryObj = { ...req.query }; //Three dot remove it from being reference type and turn it to value type
      const excludedFields = ['page', 'sort', 'limit', 'fields'];
      excludedFields.forEach(x => delete queryObj[x]);

      // 1B) Advance Filtering
      let queryStr = JSON.stringify(queryObj);
      queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

      let query = Tour.find(JSON.parse(queryStr));

      // 2) Sorting
      if (req.query.sort) {
         const sortBy = req.query.sort.split(',').join(' ');
         // We use split and join because we cant use space in url bar.
         // query.sort take argument like: 'price -ratingsAverage' first asc sorting on prise then desc sorting on ratingsAverage
         query = query.sort(sortBy);
      } else {
         // Default sorting when user did not specify sorting
         // query = query.sort('-createdAt');
      }

      // 3) Limiting
      if (req.query.fields) {
         const fields = req.query.fields.split(',').join(' ');
         // select take a string like "name duration price ratingAverage"
         query = query.select(fields);
      } else {
         // Remove __v that mongoose add to our table.
         query = query.select('-__v');
      }

      // 4) Pagination
      const page = req.query.page * 1 || 1; // Trick to convert string to number
      const limit = req.query.limit * 1 || 100; // || Make 100 default if user did not specify it
      const skip = (page - 1) * limit;

      query = query.skip(skip).limit(limit);

      if (req.query.page) {
         const numTours = await Tour.countDocuments();
         if (skip >= numTours) throw new Error('This page does not exists');
      }

      // 5) Execute query
      const tours = await query;
      // query.sort().select().skip().limit()

      res.status(200).json({
         status: 'success',
         count: tours.length,
         data: {
            tours
         }
      });
   } catch (err) {
      res.status(404).json({
         status: 'fail',
         message: err
      });
   }
};
// todo it hahaha
module.exports.getTour = async (req, res) => {
   try {
      const tour = await Tour.findById(req.params.id);
      res.status(200).json({
         status: 'success',
         data: {
            tour
         }
      }); Hello;
   } catch (err) {
      res.status(404).json({
         status: 'fail',
         message: err
      });
   };
};
// xx.yy
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

module.exports.updateTour = async (req, res) => {
   try {
      const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
         new: true,
         runValidators: true
      });
      res.status(200).json({
         status: 'success',
         data: {
            tour
         }
      });
   } catch (err) {
      res.status(400).json({
         status: 'fail',
         message: err
      });
   }
};

module.exports.deleteTour = async (req, res) => {
   try {
      await Tour.findByIdAndDelete(req.params.id);

      res.status(204).json({
         status: 'success',
         data: null
      });
   } catch (err) {
      res.status(400).json({
         status: 'fail',
         message: err
      });
   }

};
//#endregion