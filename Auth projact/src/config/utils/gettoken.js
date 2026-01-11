import jwt from "jsonwebtoken";

export const generateAccessToken = (userId) => {
    const token = jwt.sign(
        { _id: userId },
        process.env.JWT_SECRET_ACCESS_KEY,
        { expiresIn: process.env.JWT_SECRET_ACCESS_KEY_EXPIRESIN || "1d" }
    );

    return token;
};

export const generateRefreshToken = (userId) => {
    const token = jwt.sign(
        { _id: userId },
        process.env.JWT_SECRET_REFRESH_KEY,
        { expiresIn: process.env.JWT_SECRET_REFRESH_KEY_EXPIRESIN || "7d" }
    );

    return token;
};