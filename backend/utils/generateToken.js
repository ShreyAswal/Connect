import jwt from 'jsonwebtoken';

const generateTokenAndSetCookie = (userId, res) => {
    const token = jwt.sign({ userId}, process.env.JWT_SECRET, {
        expiresIn: '15d'
    });

    res.cookie('JWT',token, {
        maxAge: 15 * 24 * 60 * 60 * 1000, // milliseconds
        httpOnly: true, // cookie is not accessible via client-side JavaScript(prevents XSS attacks on the client-side) 
        sameSite: "strict", // cookie is not sent with cross-origin requests (CSRF attacks)
        secure: process.env.NODE_ENV === 'development' ? false : true // cookie is only sent via HTTPS in production

    })
}

export default generateTokenAndSetCookie;