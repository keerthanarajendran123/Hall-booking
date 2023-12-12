// import express from 'express';
// import dotenv from 'dotenv';
// import connectDB from './src/db/index.js'; 
// import roomRoutes from './src/routes/roomRoutes.js';
// import bookingRoutes from './src/routes/bookingRoutes.js';

// dotenv.config();
// const app = express();

// app.use(express.json());

// connectDB();

// app.use('/rooms', roomRoutes);
// app.use('/bookings', bookingRoutes);

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });

// export default app;


import express from 'express';
import dotenv from 'dotenv';
import connectDB from './src/db/index.js'; 
import roomRoutes from './src/routes/roomRoutes.js';
import bookingRoutes from './src/routes/bookingRoutes.js';

dotenv.config();
const app = express();

// Middleware to add a welcome message
app.use((req, res, next) => {
    res.header('Content-Type', 'text/html');
    res.write('<h1>Welcome to Hall Booking App</h1>');
    next();
});

app.use(express.json());

connectDB();

app.use('/rooms', roomRoutes);
app.use('/bookings', bookingRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

export default app;
