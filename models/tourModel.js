const mongoose = require('mongoose');
const slugify = require('slugify');
const validator = require('validator');

const tourSchema = new mongoose.Schema(
   {
      name: {
         type: String,
         required: [true, 'A tour must have a name'],
         unique: true,
         trim: true,
         maxLength: [40, 'A tour must have at most 40 characters'],
         minlength: [10, 'A tour must have at least 10 characters'],
      },
      slug: String,
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
         required: [true, 'A tour must have difficulty'],
         enum: {
            values: ['easy', 'medium', 'difficult'],
            message: 'Difficulty must be easy, medium or difficult'
         }
      },
      ratingsQuantity: {
         type: Number,
         default: 0
      },
      ratingsAverage: {
         type: Number,
         default: 4.5,
         min: [1, 'Ratings must have above 1.0'],
         max: [5, 'Ratings must have below 5.0']
      },
      price: {
         type: Number,
         required: [true, 'A tour must have price'],
      },
      priceDiscount: {
         type: Number,
         validate: {
            validator: function (val) {
               // this keyword only point to current doc on New document creation
               return val < this.price;
            },
            message: 'Discount price ({VALUE}) must be less than price'
         }
      },
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
         default: Date.now(),
         select: false
      },
      startDates: [Date],
      secretTour: {
         type: Boolean,
         default: false
      }
   },
   {
      toJSON: { virtuals: true },
      toObject: { virtuals: true },
   }
);

// virtual are fields that will send to user but not store in database
tourSchema.virtual('durationWeeks').get(function () {
   return this.duration / 7;
});

// DOCUMENT MIDDLEWARE: runs before .save() and .create()
tourSchema.pre('save', function (next) {
   this.slug = slugify(this.name, { lower: true });
   next();
});

// tourSchema.pre('save', function (next) {
//    console.log(`Will save document...`);
//    next();
// });

// // DOCUMENT MIDDLEWARE: runs after .save() and .create()
// tourSchema.post('save', function (doc, next) {
//    console.log(doc);
//    next();
// });

// QUERY MIDDLEWARE: Starts before every query to database.
// /^find/ is regex that make to work for all find, findById findByIdAndDelete and ...
tourSchema.pre(/^find/, function (next) {
   this.find({ secretTour: { $ne: true } });
   this.start = Date.now(); // For calculating time of query
   next();
});

tourSchema.post(/^find/, function (doc, next) {
   console.log(`Query done in ${Date.now() - this.start} Milliseconds`); // Log time that query spend to run
   next();
});

// AGGREGATION MIDDLEWARE: Hide secretTours from all aggregate requests
tourSchema.pre('aggregate', function (next) {
   this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });

   console.log(this.pipeline());
   next();
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;