import express from 'express';
import { verifyJwt } from '../middlewares/auth.middleware.js';
import { createAppointment, deleteAppointment, getAllAppointment, getAppointmentDetails, updateAppointmentDetails } from '../controllers/appointment.controllers.js';

const router = express.Router();

router.route('/create').post(verifyJwt, createAppointment);
router.route('/all').get(verifyJwt, getAllAppointment)
router.route('/:id').get(verifyJwt, getAppointmentDetails)
router.route('/:id').put(verifyJwt, updateAppointmentDetails)
router.route('/:id').delete(verifyJwt, deleteAppointment)

export default router;