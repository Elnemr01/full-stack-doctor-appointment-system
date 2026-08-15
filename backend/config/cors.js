const allowedOrigins=[
        'http://localhost:5173',
        'https://full-stack-doctor-appointment-syste-bay.vercel.app',
        'https://full-stack-doctor-appointment-syste-fawn.vercel.app'
    ]


export const corsConfig = {
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
};