const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = require("./app");

const DB = process.env.DATABASE_LOCAL;
mongoose.connect(DB, {
   useNewUrlParser: true,
   useUnifiedTopology: true,
   useCreateIndex: true,
   useFindAndModify: false
}).then(() => console.log("DB Successful"));


// const testTour = new Tour({
//    name: 'The Park Camper',
//    price: 997,
// });

// testTour.save().then(doc => {
//    console.log(doc);
// }).catch(err => {
//    console.log(err.message);
// });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
   console.log(`Example app listening on port ` + PORT);
});
