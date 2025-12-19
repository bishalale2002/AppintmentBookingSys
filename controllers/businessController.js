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
