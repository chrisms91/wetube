import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

const handleOpen = () => {
  console.log('✅ Connected to DB');
};

const handleError = (error) => {
  console.log(`❌ Error on DB connection: ${error}`);
};

db.once('open', handleOpen);
db.on('error', handleError);

// export const videos = [
//   {
//     id: 33244,
//     title: 'Video awesome',
//     description: 'This is something I love',
//     views: 24,
//     videoFile:
//       'https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4',
//     creator: {
//       id: 121212,
//       name: 'Nicolad',
//       email: 'nico@las.com',
//     },
//   },
//   {
//     id: 11297,
//     title: 'Super',
//     description: 'Tthishis description',
//     views: 24,
//     videoFile:
//       'https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4',
//     creator: {
//       id: 121212,
//       name: 'Nicolad',
//       email: 'nico@las.com',
//     },
//   },
//   {
//     id: 92394,
//     title: 'Perfect',
//     description: 'perfectooooo',
//     views: 24,
//     videoFile:
//       'https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4',
//     creator: {
//       id: 121212,
//       name: 'Nicolad',
//       email: 'nico@las.com',
//     },
//   },
//   {
//     id: 998877,
//     title: 'Sexy',
//     description: 'Tohhhhhh',
//     views: 24,
//     videoFile:
//       'https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4',
//     creator: {
//       id: 121212,
//       name: 'Nicolad',
//       email: 'nico@las.com',
//     },
//   },
// ];