import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.models.js";

export const verifyJwt = asyncHandler( async (req, _,next) => {
    try {
        const token = req.cookies?.accessToken || req.headers["Authorization"]?.replace("Bearer ", "");
        
        if (!token) {
            throw new ApiError(401, "Unauthorized request");
        }
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user = await User.findById(decodedToken?._id).select("-password -refresh_token");
        if (!user) {
            throw new ApiError(401, "Invalid access token");
        }
        if (!user.activated) {
            throw new ApiError(401, "User is not activated");
        }
        req.user = user;
        next();
    } catch (error) {
        throw new ApiError(401, error?.message ||  "Invalid access token");
    }
})

export const authorizeRoles = (...roles) => {
	return (req, res, next) => {
		if (!roles.includes(req.user.role)) {
			return next(
				new ApiError(
					403,
					`Role : ${req.user.role} is not allowed to access this resource`
				)
			);
		}
		next();
	};
};