import Schedule from "../models/Schedule.js";

export const getAllSchedules = async (req, res) => {
  try {
    const schedules = await Schedule.find();
    res.status(200).json(schedules);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getScheduleById = async (req, res) => {
  const { scheduleId } = req.params;

  try {
    const schedule = await Schedule.findById(scheduleId);
    if (!schedule) {
      return res.status(404).json({ message: "Schedule not found" });
    }
    res.status(200).json(schedule);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

export const createSchedule = async (req, res) => {
  try {
    const newSchedule = new Schedule({
      Cart_ID: req.body.Cart_ID,
      Service_ID: req.body.Service_ID,
      Scheduled_Date: req.body.Scheduled_Date,
      Status: req.body.Status,
    });
    const existingSchedule = await Schedule.findOne({ Cart_ID });
    if (existingSchedule) {
      return res
        .status(400)
        .json({ message: "Schedule with this ID already exists" });
    } else {
      const savedSchedule = await newSchedule.save();
      res.status(201).json(savedSchedule);
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

export const updateSchedule = async (req, res) => {
  const { scheduleId } = req.params;
  const { Cart_ID, Service_ID, Scheduled_Date, Status } = req.body;

  try {
    const updatedSchedule = await Schedule.findByIdAndUpdate(
      scheduleId,
      { Cart_ID, Service_ID, Scheduled_Date, Status },
      { new: true }
    );
    if (!updatedSchedule) {
      return res.status(404).json({ message: "Schedule not found" });
    }
    res.status(200).json(updatedSchedule);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

export const deleteSchedule = async (req, res) => {
  const { scheduleId } = req.params;

  try {
    const deletedSchedule = await Schedule.findByIdAndDelete(scheduleId);
    if (!deletedSchedule) {
      return res.status(404).json({ message: "Schedule not found" });
    }
    res.status(200).json({ message: "Schedule deleted successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};
