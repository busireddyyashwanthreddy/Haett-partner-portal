import { signToken } from "../config/jwt.js";

export const buildAuthResponse = (user) => {
  const token = signToken({ id: user._id.toString(), role: user.role });

  return {
    token,
    user: user.toSafeObject(),
  };
};
