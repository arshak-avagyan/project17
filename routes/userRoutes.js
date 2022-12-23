const express = require('express');
const {
  signup,
  login,
  logout,
  forgotPassword,
  resetPassword,
  updatePassword,
  protect,
} = require('../controllers/authController');

const {
  updateMe,
  deleteMe,
  deleteUser,
  updateUser,
  getUser,
  getAllUsers,
  getMe,
  uploadUserPhoto,
  resizeUserPhoto,
} = require('../controllers/userController');

const router = express.Router();

router.route('/').get(getAllUsers);

router.post('/signup', signup);
router.post('/login', login);
router.get('/logout', logout);
router.post('/forgotPassword', forgotPassword);
router.patch('/resetPassword/:token', resetPassword);

// This middleware will protect all the routes written after this line of code, or we can add protect middleware separately in each route
router.use(protect);

router.patch('/updatePassword', updatePassword);

router.get('/me', getMe, getUser);
router.patch('/updateMe', uploadUserPhoto, resizeUserPhoto, updateMe);
router.delete('/deleteMe', deleteMe);

router.route('/:id').delete(deleteUser).patch(updateUser).get(getUser);

module.exports = router;
