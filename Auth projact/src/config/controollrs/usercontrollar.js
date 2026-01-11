import bcrypt from "bcrypt";
import { User } from "../models/user.model.js";
import { sendMail } from "../services/sendMail.js";
import { generateAccessToken, generateRefreshToken } from "../utils/token.js";

export const signUp = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                statusCode: 400,
                data: null,
                success: false,
                errors: [],
                message: "All fields are required!"
            });
        }

        const user = await User.findOne({ email });
        if (user) {
            return res.status(409).json({
                statusCode: 409,
                data: null,
                success: false,
                errors: [],
                message: "This email user already exist!"
            });
        }

        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(password, salt);
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpires = new Date(Date.now() + 10 * 60 * 1000);
        const userData = {
            name,
            email,
            password: hashedPassword,
            otp,
            otpExpires
        };

        const newUser = await User.create(userData);
        await sendMail({
            to: newUser.email,
            subject: "OTP Verification",
            html: `<p>Your OTP for verification: <strong>${otp}</strong></p>`
        });
        res.status(201).json({
            statusCode: 201,
            data: newUser,
            success: true,
            errors: [],
            message: "User created successfully. Please check your email for OTP verification."
        });
    } catch (error) {
        next(error);
    }
};

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                statusCode: 400,
                data: null,
                success: false,
                errors: [],
                message: "All fields are required!"
            });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                statusCode: 404,
                data: null,
                success: false,
                errors: [],
                message: "User not found!"
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                statusCode: 401,
                data: null,
                success: false,
                errors: [],
                message: "Invalid Credential!"
            });
        }

        const accessToken = generateAccessToken(user._id);
        const refreshToken = generateRefreshToken(user._id);

        const loggedInUser = await User.findById(user._id).select("-password");
        loggedInUser.refreshToken = refreshToken;

        const options = {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 1000 * 60 * 60 * 24
        };

        res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json({
                statusCode: 200,
                data: { user: loggedInUser, accessToken, refreshToken },
                success: true,
                errors: [],
                message: "Login done successfully"
            });
    } catch (error) {
        next(error);
    }
};

export const logout = async (req, res, next) => {
    try {
        await User.findByIdAndUpdate(
            req.user._id,
            {
                $unset: {
                    refreshToken: 1
                }
            },
            {
                new: true
            }
        );

        const options = {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production"
        };

        return res
            .status(200)
            .clearCookie("refreshToken", options)
            .clearCookie("accessToken", options)
            .json({
                statusCode: 200,
                data: {},
                success: true,
                errors: [],
                message: "Logout Successfully"
            });
    } catch (error) {
        next(error);
    }
};

export const verifyOtp = async (req, res, next) => {
    try {
        const { email, otp } = req.body;

        if (!email || !otp) {
            return res.status(400).json({
                statusCode: 400,
                data: null,
                success: false,
                errors: [],
                message: "Email and OTP are required!"
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                statusCode: 404,
                data: null,
                success: false,
                errors: [],
                message: "User not found!"
            });
        }

        if (user.otp !== otp || user.otpExpires < Date.now()) {
            return res.status(400).json({
                statusCode: 400,
                data: null,
                success: false,
                errors: [],
                message: "Invalid or expired OTP!"
            });
        }

        user.isVerified = true;
        user.otp = undefined;
        user.otpExpires = undefined;

        await user.save();

        res.status(200).json({
            statusCode: 200,
            data: {},
            success: true,
            errors: [],
            message: "OTP verified successfully."
        });
    } catch (error) {
        next(error);
    }
};

export const home = async (req, res, next) => {
    try {
        return res.status(200).json({
            statusCode: 200,
            data: "Home Page",
            success: true,
            errors: [],
            message: "Home"
        });
    } catch (error) {
        next(error);
    }
};