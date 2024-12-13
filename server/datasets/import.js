import mongoose from "mongoose";

import { Event, Location } from "../models.js";

import events from "./events.json" assert { type: "json" };
import locations from "./locations.json" assert { type: "json" };

const { MONGO_URI } = process.env;

await mongoose.connect(MONGO_URI);

if (process.argv.includes("--clear")) {
	await Promise.all([Location.deleteMany({}), Event.deleteMany({})]);
}

const _locations = await Location.insertMany(locations);
await Event.insertMany(
	events.map((event) => {
		const location = _locations.find(({ id }) => id === event.lid);
		return { ...event, location: location._id };
	}),
);

await mongoose.disconnect();

console.log("Completed!");
