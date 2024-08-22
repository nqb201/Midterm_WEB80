const express = require('express');
const { createProfile, updateProfile, getProfile, deleteProfile } = require('../controllers/profile.controller');
const authMiddleware = require('../middleware/auth.middleware');
const router = express.Router();

router.post('/', authMiddleware, createProfile);
router.put('/:id', authMiddleware, updateProfile);
router.get('/:id', authMiddleware, getProfile);
router.delete('/:id', authMiddleware, deleteProfile);

module.exports = router;
