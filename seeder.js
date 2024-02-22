const fs = require('fs');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const colors = require('colors');
const connectDB = require('./config/db');

// Load env vars
dotenv.config({ path: './config/config.env' });

// Load models
const Bootcamp = require('./models/Bootcamp');
const Course = require('./models/Course');

// Connect to DB
connectDB();

// Read JSON files
const bootcamps = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/bootcamps.json`, 'utf-8')
);
const courses = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/courses.json`, 'utf-8')
);

// Import into DB
const importData = async () => {
  try {
    await Bootcamp.create(bootcamps);
    await Course.create(courses);
    console.log('Data Imported'.green.inverse);

    process.exit();
  } catch (error) {
    console.error(error);

    process.exit(1);
  }
};

const deleteData = async () => {
  try {
    await Bootcamp.deleteMany();
    await Course.deleteMany();

    console.log('Data Deleted'.red.inverse);

    process.exit();
  } catch (error) {
    console.error(error);

    process.exit(1);
  }
};

if (process.argv[2] === '-i') {
  console.log('importing...'.inverse);
  importData();
} else if (process.argv[2] === '-d') {
  console.log('deleting...'.inverse);
  deleteData();
}
