import Service from "../models/service.js";

export const getAllService = async (req, res, next) => {
    try {
      const services = await Service.find();
      res.status(200).json(services);
    } catch (err) {
      next(err);
    }
};

export const getService = async (req, res, next) => {
  try {
    const service = await Service.findById(req.params.id);
    res.status(200).json(service);
  } catch (err) {
    next(err);
  }
};

export const deleteService = async (req, res, next) => {
  const serviceId = req.params.id;
  try {
    await Service.findByIdAndDelete(serviceId);
    res.status(200).json("Dịch vụ này đã bị xóa!");
  } catch (err) {
    next(err);
  }
};

export const createService = async (req, res, next) => {
  try {
    let service = new Service(req.body);
    await service.save();
    res.status(200).json(service);
  } catch (err) {
    next(err);
  }
};