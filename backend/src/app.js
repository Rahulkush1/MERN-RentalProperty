import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

app.use(cookieParser());
app.use(cors(
    {
        origin: ['http://localhost:3000'],
        credentials: true,
    }
))


app.use(express.static('public'));
app.use(express.urlencoded({ extended: true , limit: '16kb'}));
app.use(express.json({ limit: '16kb'}));


//routes
import userRoutes from "./routes/user.routes.js"
import propertyRoutes from "./routes/property.routes.js"
import reviewRoutes from "./routes/review.routes.js"
import appointmentRoutes from "./routes/appointment.routes.js"
import paymentRoutes from "./routes/payment.routes.js"
import bookingRoutes from "./routes/booking.routes.js"

app.use('/api/v1/users', userRoutes)
app.use('/api/v1/property', propertyRoutes)
app.use('/api/v1/review', reviewRoutes)
app.use('/api/v1/appointment', appointmentRoutes)
app.use('/api/v1/payment', paymentRoutes)
app.use('/api/v1/booking', bookingRoutes)



//error middleware

import errorMiddleware from "./middlewares/error.middleware.js"

app.use(errorMiddleware)

export {app};
