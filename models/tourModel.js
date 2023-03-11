const mongoose = require('mongoose');
const tourSchema = new mongoose.Schema({
   name: {
      type: String,
      required: [true, 'A tour must have a name'],
      unique: true,
   },
   duration: {
      type: Number,
      required: [true, 'A tour must have duration']
   },
   maxGroupSize: {
      type: Number,
      required: [true, 'A tour must have group size']
   },
   difficulty: {
      type: String,
      required: [true, 'A tour must have difficulty']
   },
   ratingsQuantity: {
      type: Number,
      default: 0
   },
   ratingsAverage: {
      type: Number,
      default: 4.5,
   },
   price: {
      type: Number,
      required: [true, 'A tour must have price'],
   },
   priceDiscount: Number,
   summary: {
      type: String,
      trim: true,
      required: [true, 'A tour must have description']
   },
   description: {
      type: String,
      trim: true
   },
   imageCover: {
      type: String,
      required: [true, 'A tour must have cover image']
   },
   images: [String],
   createdAt: {
      type: Date,
      default: Date.now()
   },
   startDates: [Date]
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;