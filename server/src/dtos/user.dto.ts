import type { IUserSchema } from "../models/user.model.js";

// -------------------------------------------------------------

export interface UserDto {
  id: string;
  name: string;
  email: string;
  avatar_url: string | null;
  is_registered_seller: boolean;
}

// -------------------------------------------------------------

export function toUserDto(user: IUserSchema): UserDto {
  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    avatar_url: user.avatar_url,
    is_registered_seller: user.is_registered_seller,
  };
}
