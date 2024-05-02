import mongoose from "mongoose";
import { Appointment } from "../models/appointment.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const createAppointment = asyncHandler(async (req, res) => {
  const { name, email, phone, date, property_id } = req.body;

  if (!name || !email || !phone || !date || !property_id) {
    throw new ApiError(400, "All fields are required");
  }

  const appointment = await Appointment.create({
    name,
    email,
    phone,
    date,
    user: req.user?._id,
    property: new mongoose.Types.ObjectId(property_id),
  });

  const createdAppointment = await Appointment.findById(appointment?._id);

  if (!createdAppointment) {
    throw new ApiError(
      400,
      "Something went wrong while created a new appointment"
    );
  }

  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        createdAppointment,
        "Appointment created successfully"
      )
    );
});

const getAllAppointment = asyncHandler(async (req, res) => {
  const { self_appointment } = req.body;

  let appointments = Appointment.find();

    if (self_appointment) {
        appointments =  await appointments.find({ user: req.user._id });
  } else {
    appointments = await appointments.find().populate({
      path: "property",
        match: { user: req.user._id },
      select: 'name price status numOfReviews ratings user '
    });
  }

  if (!appointments) {
    throw new ApiError(400, "Appointment not found");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, appointments, "Appointment retrieved successfully")
    );
});

const getAppointmentDetails = asyncHandler(async (req, res) => {

    const appointment = await Appointment.findById(req.params.id).populate({
        path: "property",
      select: 'name price status numOfReviews ratings user '
    });

    if (!appointment) {
        throw new ApiError(404, "Appointment not found");
    }

    return res.status(200).json(new ApiResponse(200, appointment, "Appointment retrieved successfully"))
})


const updateAppointmentDetails = asyncHandler(async (req, res) => {
    const appointment = await Appointment.findById(req.params.id).populate({
        path: "property",
        select: 'name price status numOfReviews ratings user '
    })

    if (!appointment) {
        throw new ApiError(404, "Appointment not found");
    }

    if (appointment.property.user.toString() !== req.user._id.toString()) {
        throw new ApiError(401, "You are not authorized to update this appointment");
    }
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    ).populate({
        path: "property",
      select: 'name price status numOfReviews ratings user '
    });

    if (!updatedAppointment) {
        throw new ApiError(400, "Appointment not updated");
    }

    return res.status(200).json(new ApiResponse(200, updatedAppointment, "Appointment updated successfully"))
})

const deleteAppointment = asyncHandler(async (req, res) => {
    const appointment = await Appointment.findById(req.params.id).populate({
        path: "property",
        select: 'name price status numOfReviews ratings user '
    })
    if (!appointment) {
        throw new ApiError(404, "Appointment not found");
    }

    if (appointment.property.user.toString() !== req.user._id.toString()) {
        throw new ApiError(401, "You are not authorized to delete this appointment");
    }

    const deletedAppointment = await Appointment.findByIdAndDelete(appointment._id);

    if (!deleteAppointment) {
        throw new ApiError(400, "Something went wrong while deleting appointment");
    }

    return res.status(200).json(new ApiResponse(200, {}, "Appointment deleted successfully"))
    
})
export { createAppointment, getAllAppointment, getAppointmentDetails, updateAppointmentDetails, deleteAppointment };
