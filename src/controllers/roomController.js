import Room from '../models/Room.js';

const createRoom = async (req, res) => {
    try {
        const { numberOfSeats, amenities, pricePerHour } = req.body;
        const newRoom = new Room({ numberOfSeats, amenities, pricePerHour });
        await newRoom.save();
        res.json({ message: 'Room created successfully', room: newRoom });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export {createRoom};


