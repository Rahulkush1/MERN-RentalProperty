import { User } from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import sendmail from "../utils/sendEmail.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const generateAccessAndRefereshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();

    user.refresh_token = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating referesh and access token"
    );
  }
};

const generateToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const token = await user.generateToken();
    return token;
  } catch (error) {
    throw new ApiError(500, "Something went wrong");
  }
};

const registerUser = asyncHandler(async (req, res) => {
  const { email, first_name, last_name, phone_number, password , role } = req.body;
  if (
    [first_name, last_name, email, phone_number, password].some(
      (field) => field?.trim === ""
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }
  const existedUser = await User.findOne({ email: email });

  if (existedUser) {
    throw new ApiError(409, "User with email already exists");
  }

  const avatarLocalPath = req.files?.avatar[0]?.path;

  //   if (!avatarLocalPath) {
  //     throw new ApiError(400, "Please upload an profile image");
  //   }

  const user = await User.create({
    email,
    first_name,
    last_name,
    phone_number,
    password,
    role: role.toUpperCase(),
  });

  const createdUser = await User.findById(user.id).select(
    "-password -refresh_token"
  );
  if (!createdUser) {
    throw new ApiError(500, "Somthing went wrong while registering user");
  }

  const token = await generateToken(createdUser._id);

  const options = {
    email: createdUser.email,
    subject: "Verify Your Account",
    message: `Hello ${createdUser.first_name},\n\nPlease verify your account by clicking the link below:\n\n${process.env.FRONTEND_URL}/users/verify/${token}\n\nIf you did not make this request, please ignore this email and your password will remain unchanged.\n\nSincerely,\n${process.env.FRONTEND_NAME}`,
  };
  await sendmail(options);

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  console.log(req.body)
  const { email, password } = req.body;

  if (!email) {
    throw new ApiError(400, "Email is required");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(401, "User does not exist");
  }

  if (!user.activated) {
    throw new ApiError(401, "email is not activated");
  }

  const isPasswordCorrect = await user.isPasswordCorrect(password);

  if (!isPasswordCorrect) {
    throw new ApiError(401, "Invalid user credentials");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(
    user._id
  );

  const loggedinUser = await User.findById(user._id).select(
    "-password -refresh_token"
  );

  const options = {
    expire: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 1000),
    httpOnly: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedinUser,
          accessToken: accessToken,
          refreshToken: refreshToken,
        },
        "User logged in successfully"
      )
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refresh_token: 1,
      },
    },
    {
      new: true, // return updated record
    }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logout successfully"));
});

const current_user = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select(
    "-password -refresh_token"
  )
  if (!user) {
    throw new ApiError(500, "Somthing went wrong while fetching user");
  }

  //adding additional fields for user
  const serilizedUser = {
    ...user.toObject(), // Convert Mongoose document to plain JavaScript object
    full_name: user.first_name + " " + user.last_name
  }
  return res
    .status(200)
    .json(new ApiResponse(200, serilizedUser, "User fetched successfully"));
});

const verify_account = asyncHandler(async (req, res) => {
  const token = req.params?.token;

  if (!token) {
    throw new ApiError(400, "Invalid Url");
  }

  const decodedToken = jwt.verify(token, process.env.TOKEN);
  const user = await User.findById(decodedToken?._id).select(
    "-password -refresh_token"
  );
  if (!user) {
    throw new ApiError(500, "Somthing went wrong while verifying user");
  }
  if (user.activated) {
    throw new ApiError(400, "User already activated");
  }
  const activatedUser = await User.findByIdAndUpdate(
    user._id,
    { activated: true },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, activatedUser, "User verified successfully"));
});

const resendVerficationMail = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    throw new ApiError(400, "Email is required");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  if (user.activated) {
    throw new ApiError(400, "User already activated");
  }

  const token = await generateToken(user._id);

  if (!token) {
    throw new ApiError(
      500,
      "Somthing went wrong while resending verification mail"
    );
  }
  const options = {
    email: user.email,
    subject: "Verify Your Account",
    message: `Hello ${user.first_name},\n\nPlease verify your account by clicking the link below:\n\n${process.env.FRONTEND_URL}/users/verify/${token}\n\nIf you did not make this request, please ignore this email and your password will remain unchanged.\n\nSincerely,\n${process.env.FRONTEND_NAME}`,
  };
  const mail = await sendmail(options);
  console.log(mail);
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Email sent successfully"));
});

const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    throw new ApiError(400, "Email is required");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  if (!user.activated) {
    throw new ApiError(400, "User is not activated");
  }

  const resetToken = user.getResetPasswordToken();

  if (!resetToken) {
    throw new ApiError(500, "Somthing went wrong while generating reset token");
  }

  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/users/password/reset/${resetToken}`;
  
  const options = {
    email: user.email,
    subject: "Reset Your Password",
    message: `Hello ${user.first_name},\n\nPlease reset your password by clicking the link below:\n\n${resetPasswordUrl}\n\nIf you did not make this request, please ignore this email and your password will remain unchanged.\n\nSincerely,\n${process.env.FRONTEND_NAME}`,
  }

  try {
    await sendmail(options);
    return res.status(200).json(new ApiResponse(200,{},`Email sent to ${user.email} successfully`))
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });
    throw new ApiError(500, error.message);
  }

})

const ResetPassword = asyncHandler(async (req, res) => {

  const {password} = req.body;
  const resetPasswordToken = crypto
  .createHash("sha256")
  .update(req.params.token)
    .digest("hex");
  
  if (!resetPasswordToken) {
    throw new ApiError(400, "Invalid Url");
  }

  console.log(`resetPasswordToken : ${ resetPasswordToken}`)

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    throw new ApiError(400, "Password reset token is invalid or has expired");
  }

  if (!password) {
    throw new ApiError(400, "password is required");
  }

  user.password = password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  return res
   .status(200)
   .json(new ApiResponse(200, user, "Password reset successfully"));
})

const updateUserDetails = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user?._id);

  if (!user) {
    throw new ApiError(500, "Somthing went wrong while updating user details");
  }

  if (user._id.toString() !== req.user._id.toString()) {
    throw new ApiError(401, "You are not authorized to perform this action");
  }

  const updatedUser = await User.findByIdAndUpdate(
    req.user._id,
    req.body,
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  if (!updatedUser) {
    throw new ApiError(500, "Somthing went wrong while updating user details");
  }

  return res
   .status(200)
   .json(new ApiResponse(200, user, "User details updated successfully"));
})

const updatePassword = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user?._id).select('+password');

  if (!user) {
    throw new ApiError(500, "Somthing went wrong while updating user password");
  }

  const isPasswordCorrect = await user.isPasswordCorrect(req.body.oldPassword);

  if (!isPasswordCorrect) {
    throw new ApiError(401, "Old Password is incorrect");
  }

  if (req.body.newPassword === req.body.oldPassword) {
    throw new ApiError(400, "New password cannot be same as old password");
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    throw new ApiError(400, "Password do not match");
  }

  user.password = req.body.newPassword;
  await user.save();
  return res.status(200).json(new ApiResponse(200,user,"PAssword updated successfully"))


})
export {
  registerUser,
  loginUser,
  logoutUser,
  current_user,
  verify_account,
  resendVerficationMail,
  forgotPassword,
  ResetPassword,
  updateUserDetails,
  updatePassword
};
