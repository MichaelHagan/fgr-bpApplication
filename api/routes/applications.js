const express = require('express');
const router = express.Router();
const { authenticate } = require('../utils/authentication');
const multer = require('multer');
const upload = multer({ dest: './public/uploads' });
const {
  getAllApplications,
  getApplicationById,
  addApplication,
  editApplicationById,
  deleteApplicationById
} = require("../controllers/applicationController");

//Get all applications
router.get('/', authenticate, getAllApplications)


//Get single application
router.get('/:id', authenticate, getApplicationById)

//Add application
router.post('/', upload.single('file'), addApplication)

//Update application
router.put('/:id', authenticate, upload.single('file'), editApplicationById)

//Delete application
router.delete('/:id', authenticate, deleteApplicationById)


module.exports = router;