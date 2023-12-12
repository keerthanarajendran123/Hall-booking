import Booking from '../models/Booking.js';

const createBooking = async (req, res) => {
    try {
        const { customerName, date, startTime, endTime, roomId } = req.body;
        const existingBooking = await Booking.findOne({
            date,
            roomId,
            $or: [
                { startTime: { $lt: endTime }, endTime: { $gt: startTime } }, 
                { startTime: { $eq: startTime }, endTime: { $eq: endTime } }
            ]
        });

        if (existingBooking) {
            return res.status(400).json({ error: 'Room is already booked at this time.' });
        }

        const newBooking = new Booking({ customerName, date, startTime, endTime, roomId });
        await newBooking.save();
        res.json({ message: 'Room booked successfully', booking: newBooking });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



const getAllRoomsWithBookedData = async (req, res) => {
    try {
        const bookings = await Booking.find();
        const roomsWithBookedData = bookings.map(booking => ({
            roomId: booking.roomId,
            bookedStatus: 'Booked',
            customerName: booking.customerName,
            date: booking.date,
            startTime: booking.startTime,
            endTime: booking.endTime
        }));

        res.json({ roomsWithBookedData });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const getAllCustomersWithBookedData = async (req, res) => {
    try {
        const bookings = await Booking.find();
        const customersBookings = bookings.map(booking => ({
            customerName: booking.customerName,
            roomId: booking.roomId,
            date: booking.date,
            startTime: booking.startTime,
            endTime: booking.endTime
        }));

        res.json({ customersBookings });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getCustomerBookingCount = async (req, res) => {
    try {
        const bookings = await Booking.find();
        const customersMap = {};

        bookings.forEach(booking => {
            if (!customersMap[booking.customerName]) {
                customersMap[booking.customerName] = {
                    bookingCount: 0,
                    bookings: []
                };
            }

            customersMap[booking.customerName].bookingCount++;
            customersMap[booking.customerName].bookings.push({
                roomName: booking.roomId.roomName,
                date: booking.date,
                startTime: booking.startTime,
                endTime: booking.endTime,
                bookingId: booking._id,
                bookingDate: booking.date,
                bookedStatus: 'Booked',
                roomId: booking.roomId
            });
        });

        const customers = Object.keys(customersMap).map(customerName => ({
            customerName,
            ...customersMap[customerName]
        }));

        res.json({ customers });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export { getAllRoomsWithBookedData ,getAllCustomersWithBookedData, getCustomerBookingCount,createBooking };
