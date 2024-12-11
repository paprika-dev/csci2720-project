const express = require('express');
const User = require('../model/User');
const isAdmin = require('../middleware/adminMiddleware');
const router = express.Router();

router.get('/users', isAdmin, async (req, res) => {
    try {
        const users = await User.find(); // Fetch all users
        if (!users || users.length === 0) {
            return res.status(404).json({ message: "User data not found." });
        }
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error });
    }
});

router.delete('/delete/:username', isAdmin, async (req, res) => {
    const username = req.params.username;

    try {
        const user = await User.findOneAndDelete({ username }); // Delete user by username
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }
        res.status(200).json({ message: "User deleted successfully." });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error });
    }
});

router.put('/update/:id', isAdmin, async (req, res) => {
    const id = req.params.id;
    const updateData = req.body;

    try {
        const user = await User.findByIdAndUpdate(id, updateData, { new: true }); // Update user info by ID
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }
        res.status(200).json({ message: "User updated successfully.", user });
    } catch (error) {
        res.status(500).json({ message: 'Error updating user', error });
    }
});

module.exports = router;
