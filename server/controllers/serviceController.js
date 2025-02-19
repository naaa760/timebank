const Service = require("../models/Service");
const ApiResponse = require("../utils/apiResponse");
const logger = require("../utils/logger");

const createService = async (req, res) => {
  try {
    const { title, description, category, hoursPerSession, tags } = req.body;
    const providerId = req.user.id;

    const service = await Service.create({
      title,
      description,
      providerId,
      category,
      hoursPerSession,
      tags,
    });

    return ApiResponse.success(res, service, "Service created successfully");
  } catch (error) {
    logger.error("Create service error:", error);
    return ApiResponse.error(res, "Failed to create service");
  }
};

const getServices = async (req, res) => {
  try {
    const services = await Service.findActive();
    return ApiResponse.success(res, services);
  } catch (error) {
    logger.error("Get services error:", error);
    return ApiResponse.error(res, "Failed to fetch services");
  }
};

const getProviderServices = async (req, res) => {
  try {
    const providerId = req.params.providerId;
    const services = await Service.findByProvider(providerId);
    return ApiResponse.success(res, services);
  } catch (error) {
    logger.error("Get provider services error:", error);
    return ApiResponse.error(res, "Failed to fetch provider services");
  }
};

module.exports = {
  createService,
  getServices,
  getProviderServices,
};
