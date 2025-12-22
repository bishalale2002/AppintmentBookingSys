exports.businessOwner = async (req, res) => {
  try {
    const {
      businessName,
      businessType,
      ownerName,
      weeklySchedule,
      holidays,
    } = req.body;

    const business = await Business.create({
      businessName,
      businessType,
      ownerName,
      businessOwner: req.admin._id,
      weeklySchedule,
      holidays,
    });

    res.status(201).json({
      success: true,
      message: "Business registered successfully",
      business,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * @desc    Update business weekly schedule & holidays
 * @route   PUT /api/business/:businessId/schedule
 * @access  Private (Admin)
 */
exports.updateBusinessSchedule = async (req, res) => {
  try {
    const { businessId } = req.params;
    const { weeklySchedule, holidays } = req.body;

    const business = await Business.findOne({
      _id: businessId,
      businessOwner: req.admin._id,
    });

    if (!business) {
      return res.status(404).json({
        success: false,
        message: "Business not found or unauthorized",
      });
    }

    // Update only provided fields
    if (weeklySchedule) business.weeklySchedule = weeklySchedule;
    if (holidays) business.holidays = holidays;

    await business.save();

    res.status(200).json({
      success: true,
      message: "Business schedule updated successfully",
      business,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
/**
 * @desc    Delete entire business
 * @route   DELETE /api/business/:businessId
 * @access  Private (Admin)
 */
exports.deleteBusiness = async (req, res) => {
  try {
    const { businessId } = req.params;

    const business = await Business.findOneAndDelete({
      _id: businessId,
      businessOwner: req.admin._id,
    });

    if (!business) {
      return res.status(404).json({
        success: false,
        message: "Business not found or unauthorized",
      });
    }

    res.status(200).json({
      success: true,
      message: "Business deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
