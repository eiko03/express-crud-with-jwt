const express = require ('express');
const router = express.Router();
const PostController = require('../controllers/PostController');
const verify = require('../../auth/middleware/verification_token');

router.get('/',verify,PostController.index);
router.post('/',verify,PostController.create);
router.get('/:postid',verify,PostController.show);
router.delete('/:postid',verify,PostController.destroy);
router.patch('/:postid',verify,PostController.update);

module.exports = router