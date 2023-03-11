class APIFeatures {
   constructor(query, queryString) {
      this.query = query;
      this.queryString = queryString;
   }

   //#region How to use it:
   // const features = new APIFeatures(Tour.find(), req.query)
   //    .filter().sort().limitFields().paginate();
   // const tours = await features.query;
   //#endregion

   // url?
   filter() {
      const queryObj = { ...this.queryString }; //Three dot remove it from being reference type and turn it to value type
      const excludedFields = ['page', 'sort', 'limit', 'fields'];
      excludedFields.forEach(x => delete queryObj[x]);

      let queryStr = JSON.stringify(queryObj);
      queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

      this.query.find(JSON.parse(queryStr));
      // let query = Tour.find(JSON.parse(queryStr));
      return this; // Now we can chain methods
   }

   // url?sort=name,-price,createdAt
   sort() {
      if (this.queryString.sort) {
         const sortBy = this.queryString.sort.split(',').join(' ');
         // We use split and join because we cant use space in url bar.
         // query.sort take argument like: 'price -ratingsAverage' first asc sorting on prise then desc sorting on ratingsAverage
         this.query = this.query.sort(sortBy);
      } else {
         // Default sorting when user did not specify sorting
         this.query = this.query.sort('-createdAt');
      }
      return this;
   }

   // url?fields=name,price,createdAt // or url?fields=-__v,-createdAt
   limitFields() {
      if (this.queryString.fields) {
         const fields = this.queryString.fields.split(',').join(' ');
         // select, take a string like "name duration price ratingAverage"
         this.query = this.query.select(fields);
      } else {
         // Remove __v that mongoose automatically add to our table.
         this.query = this.query.select('-__v');
      }

      return this;
   }

   // url?page=3,limit=10 // divide every page to 10 record and show page 3
   paginate() {
      const page = this.queryString.page * 1 || 1; // Trick to convert string to number
      const limit = this.queryString.limit * 1 || 100; // || Make 100 default if user did not specify it
      const skip = (page - 1) * limit;

      this.query = this.query.skip(skip).limit(limit);

      return this;
   }
}

module.exports = APIFeatures;