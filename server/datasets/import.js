import mongoose from "mongoose";

import { Event, Location } from "../models.js";

import events from "./events.json" with { type: "json" };
import locations from "./locations.json" with { type: "json" };

const { MONGO_URI } = process.env;

await mongoose.connect(MONGO_URI);

if (process.argv.includes("--clear")) {
	await Promise.all([Location.deleteMany({}), Event.deleteMany({})]);
}

const _locations = await Location.insertMany(locations);
await Event.insertMany(
	events.map((event) => {
		const location = _locations.find(({ id }) => id === event.location);
		return { ...event, location: location._id };
	}),
);

await mongoose.disconnect();

console.log("Completed!");
