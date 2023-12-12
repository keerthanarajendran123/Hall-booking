import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
    customerName: String,
    date: Date,
    startTime: String,
    endTime: String,
    roomId: { type: mongoose.Schema.Types.ObjectId, ref: 'Room' }
});

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;
