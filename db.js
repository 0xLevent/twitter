import mongoose from 'mongoose';

const conn = () => {
  mongoose.connect("mongodb+srv://lvtknc2:denek7788@cluster0.lqeasjw.mongodb.net/twt", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to the DB successfully');
  })
  .catch((err) => {
    console.error(`DB connection error: ${err.message}`);
  });
};

export default conn;
