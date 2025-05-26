import jwt from 'jsonwebtoken'


res.cookie('jwt', token, {
    httpOnly: true,
    secure: true,              // Required for cross-site cookies over HTTPS (Render is HTTPS)
    sameSite: 'None',          // Must be 'None' for cross-origin
    maxAge: 30 * 24 * 60 * 60 * 1000
});



export default generateToken
