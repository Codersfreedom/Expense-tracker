import User from "../models/user.model.js";

import bcrypt from "bcryptjs";

const userResolver = {
  Query: {
    authUser: async (_,__, context) => {
      try {
        const user = await context.getUser();
        return user;
      } catch (error) {
        console.error("Error in authUser:", error);
        throw new Error(error.message || "Internal server error");
      }
    },
    user: async (_, { userId }) => {
      try {
        const user = User.findById(userId);
        return user;
      } catch (error) {
        console.error("Error in user query:", error);
        throw new Error(error.message || "Internal server error");
      }
    },
  },
  Mutation: {
    signUp: async (_, { input }, context) => {
      try {
        const { username, name, password, gender } = input;
        console.log(username);
        if (!username || !name || !password || !gender) {
          throw new Error("All fields are required");
        }
        const existUser = await User.findOne({ username });
        if (existUser) {
          throw new Error("User already exists");
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        let avatarUrl;

        if (gender === "male") {
          avatarUrl = `https://avatar.iran.liara.run/public/boy/?username=${username}`;
        } else {
          avatarUrl = `https://avatar.iran.liara.run/public/girl/?username=${username}`;
        }

        const newUser = new User({
          username,
          name,
          password: hashedPassword,
          profilePicture: avatarUrl,
          gender,
        });

        await newUser.save();
        await context.login(newUser);
        return newUser;
      } catch (error) {
        console.error("Error in SignUp:", error);
        throw new Error(error.message || "Internal server error");
      }
    },
    login: async (_, { input }, context) => {
      try {
        const { username, password } = input;
        if(!username || !password) throw new Error("All fields are required!");
        const findUser = await User.findOne({username});
        if(!findUser) throw new Error("Username doesn't exists");

        const validUser = await bcrypt.compare(password,findUser.password);
        if(!validUser) throw new Error("Invalid username or password");

        const { user } = await context.authenticate("graphql-local", {
          username,
          password,
        });

        await context.login(user);
      } catch (error) {
        console.error("Error in Login:", error);
        throw new Error(error.message || "Internal server error");
      }
    },
    logout: async (_,__,  context) => {
      try {
        await context.logout();
        context.req.session.destroy((err) => {
          if (err) throw new err();
        });
        context.res.clearCookie("connect.sid");
        return { message: "Logout successfully" };
      } catch (error) {
        console.error("Error in Logout:", error);
        throw new Error(error.message || "Internal server error");
      }
    },
  },
};

export default userResolver;
