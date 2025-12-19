exports.bookAppointment = async (req, res) => {
  try {
    const {
      businessId,
      date,
      start,
      end,
      customerName,
      customerPhone,
      customerEmail,
    } = req.body;

    if (!customerName || !customerPhone) {
      return res.status(400).json({
        message: "Customer name and phone are required",
      });
    }

    // capacity + slot checks here (same logic as before)

    const appointment = await Appointment.create({
      business: businessId,
      date,
      start,
      end,
      customerName,
      customerPhone,
      customerEmail,
    });

    res.status(201).json({
      success: true,
      message: "Appointment booked successfully",
      appointment,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
