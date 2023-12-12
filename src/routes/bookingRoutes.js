import express from 'express';
import { createBooking,getAllRoomsWithBookedData, getAllCustomersWithBookedData, getCustomerBookingCount} from '../controllers/bookingController.js';

const router = express.Router();

router.post('/book', createBooking);
router.get('/all-with-booked-data', getAllRoomsWithBookedData);
router.get('/customers/bookings', getAllCustomersWithBookedData);
router.get('/customers/booking-count', getCustomerBookingCount);

export default router;
