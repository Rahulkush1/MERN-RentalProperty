import mongoose, {Schema} from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        
    },
    activated: {
        type: Boolean,
        default: false
    },
    phone_number: {
        type: String,
    },
    avatar: {
        type: String,
    },
    refresh_token: {
        type: String,
    },
    customer_id: {
        type: String,
    },
    address: {
        type: Schema.Types.ObjectId,
        ref: "Address",
    },
    role: {
        type: String,
        enum: ["ADMIN", "OWNER", "BROKER", "USER"],
        default: "USER",
    },
    customer: {
        type: String,
    },
    resetPasswordToken: String,
	resetPasswordExpire: Date,
    
},{timestamps: true});

userSchema.pre('save', async function (next) {
    if(!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 10)
    next();
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password,this.password)
}

userSchema.methods.generateAccessToken = async function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            first_name: this.first_name,

        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken = async function(){
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateToken = async function(){
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.TOKEN,
        {
            expiresIn: process.env.TOKEN_EXPIRY
        }
    )
}

userSchema.methods.getResetPasswordToken = function () {
	const resetToken = crypto.randomBytes(20).toString("hex");

	// Hashing and add to userSchema
	this.resetPasswordToken = crypto
		.createHash("sha256")
		.update(resetToken)
		.digest("hex");
	this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
	console.log(this.resetPasswordToken)
	return resetToken;
};


export const  User = mongoose.model("User",userSchema);