const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    date_of_birth: Date,
    place_of_birth: String,
    nationality: String,
    education: [String],
    skills: [String],
    projects: [
        {
            project_name: String,
            description: String,
            role: String,
            start_date: Date,
            end_date: Date,
        },
    ],
    work_experience: [
        {
            company_name: String,
            role: String,
            start_date: Date,
            end_date: Date,
        },
    ],
    interests: [String],
    goals: [String],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});

module.exports = mongoose.model('Profile', ProfileSchema);
