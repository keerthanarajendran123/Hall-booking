import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema({
    numberOfSeats: Number,
    amenities: String,
    pricePerHour: Number
});

const Room = mongoose.model('Room', roomSchema);

export default Room;
