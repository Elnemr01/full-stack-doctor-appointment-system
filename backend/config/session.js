import session from 'express-session';
import MongoStore from 'connect-mongodb-session';

const SessionDBStore = MongoStore(session);

export const createSessionStore = () => {
    return new SessionDBStore({
        uri: process.env.DATABASE_URL,
        collection: 'sessions',
    });
};

export const sessionConfig = {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: createSessionStore(),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 30,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    },
};