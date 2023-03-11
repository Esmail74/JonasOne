const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const Tour = require('../../models/tourModel');

const DB = process.env.DATABASE_LOCAL;
mongoose.connect(DB, {
   useNewUrlParser: true,
   useUnifiedTopology: true,
   useCreateIndex: true,
   useFindAndModify: false
}).then(() => console.log("DB Successful"));

const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8'));

const importData = async () => {
   try {
      await Tour.create(tours);
      console.log('Data Successfully loaded');
   } catch (error) {
      console.log(error);
   }
   process.exit();
};

const deleteData = async () => {
   try {
      await Tour.deleteMany();
      console.log('Data Successfully deleted');

   } catch (error) {
      console.log(error);
   }
   process.exit();
};

if (process.argv[2] === '--import') {
   importData();
} else if (process.argv[2] === '--delete') {
   console.log('im in');
   deleteData();
}