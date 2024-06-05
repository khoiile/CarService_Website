import Service from "../models/Service.js";
import Schedule from "../models/Schedule.js";

export const getAllServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getServiceById = async (req, res) => {
  const { serviceId } = req.params;

  try {
    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }
    res.json(service);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

export const createService = async (req, res) => {
  try {
    const newService = new Service({
      Service_name: req.body.Service_name,
      Description: req.body.Description,
      Price: req.body.Price,
    });

    const savedService = await newService.save();
    res.status(201).json(savedService);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

export const updateService = async (req, res) => {
  const { serviceId } = req.params;

  try {
    const updatedService = await Service.findByIdAndUpdate(
      serviceId,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!updatedService) {
      return res.status(404).json({ message: "Service not found" });
    }

    res.json(updatedService);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

export const deleteService = async (req, res) => {
  const { serviceId } = req.params;

  try {
    const deletedService = await Service.findByIdAndDelete(serviceId);

    if (!deletedService) {
      return res.status(404).json({ message: "Service not found" });
    }

    res.json({ message: "Service deleted successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

export const createServices = async (req, res) => {
  try {
    const services = req.body.services;

    const existingServices = await Service.find({
      Service_ID: { $in: services.map((service) => service.Service_ID) },
    });
    if (existingServices.length > 0) {
      const existingServiceIds = existingServices.map(
        (service) => service.Service_ID
      );
      const duplicateServiceIds = services
        .filter((service) => existingServiceIds.includes(service.Service_ID))
        .map((service) => service.Service_ID);
      return res.status(400).json({
        message: `Services with these IDs already exist: ${duplicateServiceIds.join(
          ", "
        )}`,
      });
    } else {
      const savedServices = await Service.insertMany(services);
      res.status(201).json(savedServices);
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getAllSchedulesByServiceId = async (req, res) => {
  const { serviceId } = req.params;
  try {
    const schedules = await Schedule.find({ Service_ID: serviceId });
    res.status(200).json(schedules);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

export const createScheduleForService = async (req, res) => {
  const { serviceId } = req.params;
  try {
    const newSchedule = new Schedule({
      Cart_ID: req.body.Cart_ID,
      Service_ID: serviceId,
      Scheduled_Date: req.body.Scheduled_Date,
      Status: req.body.Status,
    });
    const savedSchedule = await newSchedule.save();
    res.status(201).json(savedSchedule);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

export const updateScheduleByServiceId = async (req, res) => {
  const { serviceId, scheduleId } = req.params;
  const { Cart_ID, Scheduled_Date, Status } = req.body;
  try {
    const updatedSchedule = await Schedule.findOneAndUpdate(
      { _id: scheduleId, Service_ID: serviceId },
      { Cart_ID, Scheduled_Date, Status },
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

export const deleteScheduleByServiceId = async (req, res) => {
  const { serviceId, scheduleId } = req.params;
  try {
    const deletedSchedule = await Schedule.findOneAndDelete({
      _id: scheduleId,
      Service_ID: serviceId,
    });
    if (!deletedSchedule) {
      return res.status(404).json({ message: "Schedule not found" });
    }
    res.status(200).json({ message: "Schedule deleted successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};
