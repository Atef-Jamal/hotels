"use server";

import { FormSchemaField } from "@/app/auth/sign-up/page";
import { connectToDB } from "@/lib/database";
import Hotel from "@/models/hotel";
import User from "@/models/user";
import bcrypt from "bcryptjs";

export const register = async (formData: FormSchemaField) => {
  try {
    const name = formData.name;
    const email = formData.email;
    const password = formData.password;
    const phone = formData.phone;

    if (!name || !email || !password || !phone) {
      return {
        error: {
          message: "all field required",
        },
      };
    }
    await connectToDB();
    const existingUser = await User.findOne({ email }).lean();

    if (existingUser) {
      return {
        error: {
          message: "this email already Exists, try to log in",
        },
      };
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      phone,
    });

    await newUser.save();

    return {
      success: {
        message: "User succefully created",
      },
    };
  } catch (err) {
    let errorMessage = "an error occurred during sign up";
    if (err instanceof Error) {
      errorMessage = err.message;
    }
    return {
      error: {
        message: errorMessage,
      },
    };
  }
};

export const getHotles = async ({ destination }: { destination: string }) => {
  try {
    await connectToDB();
    const response = await Hotel.find({
      "location.country": destination,
    }).lean();
    console.log(response[0]);
    return response;
  } catch (error) {
    console.log(error);
    throw new Error("an error occurred");
  }
};
