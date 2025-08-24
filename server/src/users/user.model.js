import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "user" },
    profileImage: { type: String },
    bio: { type: String, maxlength: 200 },
    profession: { type: String },
    createdAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

// hashed password
userSchema.pre("save",async function (next) {
  const user = this;
  if(!user.isModified("password")) return next();
  const hashedPassword = await bcrypt.hash(user.password,10);
  user.password = hashedPassword;
  next();
})

// compare password
userSchema.methods.comparePassword = async function (password) {
  const user = this;
  return await bcrypt.compare(password, user.password);
};

const User = mongoose.model("User", userSchema);
export default User;
