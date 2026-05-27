// ===================================
// User Controller
// ===================================

const { User } = require('../config/database');

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
exports.getProfile = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id);

        res.status(200).json({
            success: true,
            data: user.toJSON()
        });
    } catch (error) {
        console.error('Get profile error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching profile',
            error: error.message
        });
    }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
exports.updateProfile = async (req, res) => {
    try {
        const { first_name, last_name, phone } = req.body;

        const user = await User.findByPk(req.user.id);

        // Update only provided fields
        const updateData = {};
        if (first_name) updateData.first_name = first_name;
        if (last_name) updateData.last_name = last_name;
        if (phone !== undefined) updateData.phone = phone;

        await user.update(updateData);

        res.status(200).json({
            success: true,
            message: 'Profile updated successfully',
            data: user.toJSON()
        });
    } catch (error) {
        console.error('Update profile error:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating profile',
            error: error.message
        });
    }
};

// @desc    Change password
// @route   PUT /api/users/password
// @access  Private
exports.changePassword = async (req, res) => {
    try {
        const { current_password, new_password } = req.body;

        const user = await User.findByPk(req.user.id);

        // Verify current password
        const isPasswordValid = await user.comparePassword(current_password);
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: 'Current password is incorrect'
            });
        }

        // Update password
        await user.update({ password: new_password });

        res.status(200).json({
            success: true,
            message: 'Password changed successfully'
        });
    } catch (error) {
        console.error('Change password error:', error);
        res.status(500).json({
            success: false,
            message: 'Error changing password',
            error: error.message
        });
    }
};

// @desc    Delete user account
// @route   DELETE /api/users/account
// @access  Private
exports.deleteAccount = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id);

        // Soft delete - deactivate account
        await user.update({ is_active: false });

        res.status(200).json({
            success: true,
            message: 'Account deactivated successfully'
        });
    } catch (error) {
        console.error('Delete account error:', error);
        res.status(500).json({
            success: false,
            message: 'Error deleting account',
            error: error.message
        });
    }
};

// Made with Bob
