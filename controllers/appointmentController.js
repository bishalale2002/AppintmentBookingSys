const Appointment = require("../models/Appointment");
const Business = require("../models/Business");

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

    // 1️⃣ Basic validation
    if (
      !businessId ||
      !date ||
      !start ||
      !end ||
      !customerName ||
      !customerPhone
    ) {
      return res.status(400).json({
        message: "Missing required fields",
      });
    }

    // 2️⃣ Find business
    const business = await Business.findById(businessId);
    if (!business) {
      return res.status(404).json({ message: "Business not found" });
    }

    const bookingDate = new Date(date);

    // 3️⃣ Holiday check
    const isHoliday = business.holidays.some(
      (h) => new Date(h).toDateString() === bookingDate.toDateString()
    );

    if (isHoliday) {
      return res.status(400).json({
        message: "Business is closed on this date",
      });
    }

    // 4️⃣ Find day schedule
    const dayName = bookingDate.toLocaleDateString("en-US", {
      weekday: "long",
    });

    const daySchedule = business.weeklySchedule.find(
      (d) => d.day === dayName
    );

    if (!daySchedule) {
      return res.status(400).json({
        message: "Business is closed on this day",
      });
    }

    // 5️⃣ Check slot exists
    const slot = daySchedule.slots.find(
      (s) => s.start === start && s.end === end
    );

    if (!slot) {
      return res.status(400).json({
        message: "Selected slot is not available",
      });
    }

    // 6️⃣ Count existing bookings for this date & slot
    const bookedCount = await Appointment.countDocuments({
      business: businessId,
      date: bookingDate,
      start,
      end,
      status: "booked",
    });

    // 7️⃣ Capacity check
    if (bookedCount >= slot.capacity) {
      return res.status(400).json({
        message: "Slot is fully booked",
      });
    }

    // 8️⃣ Create appointment
    const appointment = await Appointment.create({
      business: businessId,
      date: bookingDate,
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
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
