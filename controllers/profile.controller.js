const Profile = require('../models/profile');

exports.createProfile = async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(400).json({ message: 'User ID is missing' });
        }

        const profile = new Profile({
            ...req.body,
            user: req.user.id,
        });

        const savedProfile = await profile.save();
        res.status(201).json(savedProfile);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.getProfile = async (req, res) => {
    try {
        const profile = await Profile.findById(req.params.id);

        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }

        res.json(profile);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

exports.updateProfile = async (req, res) => {
    try {
        const profile = await Profile.findById(req.params.id);

        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }

        if (!req.user || !req.user.id) {
            return res.status(400).json({ message: 'User ID is missing' });
        }

        if (profile.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        const updatedProfile = await Profile.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        res.json(updatedProfile);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

exports.deleteProfile = async (req, res) => {
    try {
        const profile = await Profile.findById(req.params.id);

        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }

        if (!req.user || !req.user.id) {
            return res.status(400).json({ message: 'User ID is missing' });
        }

        if (profile.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        await profile.remove();
        res.json({ message: 'Profile deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
