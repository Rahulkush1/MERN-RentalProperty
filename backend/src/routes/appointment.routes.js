import express from 'express';
import { verifyJwt } from '../middlewares/auth.middleware.js';
import { createAppointment, deleteAppointment, getAllAdminAppointments, getAllUserAppointment, getAppointmentDetails, getUserAppointmentDetails, updateAppointmentDetails } from '../controllers/appointment.controllers.js';

const router = express.Router();

router.route('/create').post(verifyJwt, createAppointment);
router.route('/all').get(verifyJwt, getAllUserAppointment)
router.route('/admin/all').get(verifyJwt, getAllAdminAppointments)
router.route('/user/:id').get(verifyJwt, getUserAppointmentDetails)
router.route('/:id').get(verifyJwt, getAppointmentDetails)
router.route('/:id').put(verifyJwt, updateAppointmentDetails)
router.route('/:id').delete(verifyJwt, deleteAppointment)

export default router;