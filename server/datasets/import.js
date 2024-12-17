import mongoose from "mongoose";
import bcrypt from "bcrypt";

import { Event, Location, User, Comment } from "../models.js";

import events from "./events.json" assert { type: "json" };
import locations from "./locations.json" assert { type: "json" };
import users from "./users.json" assert { type: "json" };
import comments from "./comments.json" assert { type: "json" };

const { MONGO_URI } = process.env;

await mongoose.connect(MONGO_URI);

if (process.argv.includes("--clear")) {
	await Promise.all([
		Location.deleteMany({}),
		Event.deleteMany({}),
		User.deleteMany({}),
		Comment.deleteMany({}),
	]);
}

const _locations = await Location.insertMany(locations);

await Event.insertMany(
	events.map((event) => {
		const location = _locations.find(({ id }) => id === event.lid);
		return { ...event, location: location._id };
	}),
);

const _users = await User.insertMany(
	await Promise.all(
		users.map(async (user) => {
			const favourites = user.favourites?.map(
				(lid) => _locations.find(({ id }) => id === lid)._id,
			);
			const password = await bcrypt.hash(user.password, 10);
			return { ...user, favourites, password };
		}),
	),
);

await Comment.insertMany(
	comments.map((comment) => {
		const user = _users.find(({ username }) => username === comment.username);
		const location = _locations.find(({ id }) => id === comment.lid);
		return { ...comment, user: user._id, location: location._id };
	}),
);

await mongoose.disconnect();

console.log("Completed!");
