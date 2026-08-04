

export const rateLimitOpts= {
    windowMs: 10 * 60 * 1000,
    limit: 200,
    message: 'Too many requests from this IP, please try again after 10 minutes',
    statusCode: 429,
}
