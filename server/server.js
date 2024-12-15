import cors from "cors";
import express, { json } from "express";
import session from "express-session";
import mongoose from "mongoose";

import { User, Event, Comment, Location } from "./models.js";

const { PORT, MONGO_URI, SECRET } = process.env;

const app = express();
// import "dotenv/config.js";

// const authRoutes =  './router/authRoute';
// const protectedRoutes = require('./router/protected');
// const adminRoutes = require('./router/adminRoute');

app.use(
	json(),
	cors(),
	session({
		name: "sid",
		secret: SECRET,
		resave: true,
		saveUninitialized: false,
		cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 }, // 7 days
	}),
);

const handleAuthCheck = (req, res, next) => {
	if (!req.session.uid) {
		return res.status(401).end();
	}
	next();
};

const handleAdminGuard = (req, res, next) => {
	handleAuthCheck(req, res, () => {
		if (!req.session.admin) {
			return res.status(403).end();
		}
		next();
	});
};

const isAnyMissing = (...a) => a.some((v) => v === undefined);

app.post("/login", async (req, res) => {
	const { username, password } = req.body;
	if (isAnyMissing(username, password)) {
		return res.status(400).end();
	}
	const user = await User.findOne(
		{ username, password },
		"-__v -password -favourites",
	)
		.lean()
		.exec();
	if (!user) {
		return res.status(401).end();
	}
	req.session.uid = user._id;
	req.session.username = user.username;
	req.session.admin = user.admin;
	return res.status(200).json(user);
});

app.post("/logout", handleAuthCheck, (req, res) => {
	req.session.destroy();
	return res.status(200).end();
});

app.put("/username", handleAuthCheck, async (req, res) => {
	const { username } = req.body;
	if (isAnyMissing(username)) {
		return res.status(400).end();
	}
	await User.findByIdAndUpdate(req.session.uid, { username }).exec();
	req.session.username = username;
	return res.status(200).end();
});

app.get("/events", async (_req, res) => {
	const events = await Event.find({}, "-__v")
		.lean()
		.populate("location", "-__v");
	return res.status(200).json(events || []);
});

app.post("/events", handleAdminGuard, async (req, res) => {
	const { title, predate, progtime, desc, agelimit, price, presenterorg, lid } =
		req.body;
	if (
		isAnyMissing(
			title,
			predate,
			progtime,
			desc,
			agelimit,
			price,
			presenterorg,
			lid,
		) ||
		!mongoose.isValidObjectId(lid)
	) {
		return res.status(400).end();
	}
	const location = await Location.exists({ _id: lid }).exec();
	if (!location) {
		return res.status(400).end();
	}
	await Event.create({
		title,
		predate,
		progtime,
		desc,
		agelimit,
		price,
		presenterorg,
		location: location._id,
	});
	return res.status(201).end();
});

app.put("/events/:id", handleAdminGuard, async (req, res) => {
	const { title, predate, progtime, desc, agelimit, price, presenterorg, lid } =
		req.body;
	if (
		isAnyMissing(
			title,
			predate,
			progtime,
			desc,
			agelimit,
			price,
			presenterorg,
			lid,
		) ||
		!mongoose.isValidObjectId(lid) ||
		!mongoose.isValidObjectId(req.params.id)
	) {
		return res.status(400).end();
	}
	const location = await Location.exists({ _id: lid }).exec();
	if (!location) {
		return res.status(400).end();
	}
	const event = await Event.findByIdAndUpdate(
		req.params.id,
		{
			title,
			predate,
			progtime,
			desc,
			agelimit,
			price,
			presenterorg,
			location: location._id,
		},
		{ new: true },
	).exec();
	if (!event) {
		return res.status(404).end();
	}
	return res.status(200).end();
});

app.delete("/events/:id", handleAdminGuard, async (req, res) => {
	if (!mongoose.isValidObjectId(req.params.id)) {
		return res.status(400).end();
	}
	const event = await Event.findByIdAndDelete(req.params.id).exec();
	if (!event) {
		return res.status(404).end();
	}
	return res.status(200).end();
});

app.get("/users", handleAdminGuard, async (_req, res) => {
	const users = await User.find({}, "-__v").lean().exec();
	return res.status(200).json(users || []);
});

app.post("/users", handleAdminGuard, async (req, res) => {
	const { username, password, admin } = req.body;
	if (isAnyMissing(username, password, admin)) {
		return res.status(400).end();
	}
	const user = await User.exists({ username }).exec();
	if (user) {
		return res.status(409).end();
	}
	await User.create({ username, password, admin });
	return res.status(201).end();
});

app.put("/users/:id", handleAdminGuard, async (req, res) => {
	const { username, password, admin } = res.body;
	if (
		isAnyMissing(username, password, admin) ||
		!mongoose.isValidObjectId(req.params.id)
	) {
		return res.status(400).end();
	}
	const user = await User.findByIdAndUpdate(
		req.params.id,
		{ username, password, admin },
		{ new: true },
	).exec();
	if (!user) {
		return res.status(404).end();
	}
	return res.status(200).end();
});

app.delete("/users/:id", handleAdminGuard, async (req, res) => {
	if (!mongoose.isValidObjectId(req.params.id)) {
		return res.status(400).end();
	}
	if (req.params.id === req.session.uid) {
		return res.status(403).end();
	}
	const user = await User.findByIdAndDelete(req.params.id).exec();
	if (!user) {
		return res.status(404).end();
	}
	return res.status(200).end();
});

app.get("/locations", async (_req, res) => {
	const locations = await Location.find({}, "-__v")
		.lean()
		.populate("numevents")
		.populate("numcomments")
		.exec();
	return res.status(200).json(locations || []);
});

// app.get("/locations/:id", async (req, res) => {
// 	if (!mongoose.isValidObjectId(req.params.id)) {
// 		return res.status(400).end();
// 	}
// 	const location = await Location.findById(req.params.id, "-__v").lean().exec();
// 	if (!location) {
// 		return res.status(404).end();
// 	}
// 	const [events, comments] = await Promise.all([
// 		Event.find({ location: location._id }, "-__v -location").lean().exec(),
// 		Comment.find({ location: location._id }, "-__v -location").lean().exec(),
// 	]);
// 	return res.status(200).json({ ...location, events, comments });
// });

app.get("/locations/:name", async (req, res) => {
	const reqname = req.params.name.replace(/-+/g, " ");
	const location = await Location.findOne({ name: reqname }, "-__v")
		.lean()
		.exec();
	if (!location) {
		return res.status(404).end();
	}
	const [events, comments] = await Promise.all([
		Event.find({ location: location._id }, "-__v -location").lean().exec(),
		Comment.find({ location: location._id }, "-__v -location").lean().populate("user", "-__v").exec(),
	]);
	return res.status(200).json({ ...location, events, comments });
});

app.post("/comments", handleAuthCheck, async (req, res) => {
	const { lid, text } = req.body;
	if (isAnyMissing(text) || !mongoose.isValidObjectId(lid)) {
		return res.status(400).end();
	}
	const location = await Location.exists({ _id: lid }).exec();
	if (!location) {
		return res.status(404).end();
	}
	await Comment.create({
		user: req.session.uid,
		location: location._id,
		text,
	});
	return res.status(201).end();
});

app.get("/favourites", handleAuthCheck, async (req, res) => {
	const { favourites } = await User.findById(req.session.uid)
		.lean()
		.populate("favourites", "-__v")
		.exec();
	return res.status(200).json(favourites || []);
});

app.post("/favourites", handleAuthCheck, async (req, res) => {
	if (!mongoose.isValidObjectId(req.query.id)) {
		return res.status(400).end();
	}
	const location = await Location.exists({ _id: req.query.id }).exec();
	if (!location) {
		return res.status(404).end();
	}
	await User.findByIdAndUpdate(req.session.uid, {
		$addToSet: { favourites: location._id },
	}).exec();
	return res.status(201).end();
});

app.delete("/favourites", handleAuthCheck, async (req, res) => {
	if (!mongoose.isValidObjectId(req.query.id)) {
		return res.status(400).end();
	}
	const location = await Location.exists({ _id: req.query.id }).exec();
	if (!location) {
		return res.status(404).end();
	}
	await User.findByIdAndUpdate(req.session.uid, {
		$pull: { favourites: location._id },
	}).exec();
	return res.status(200).end();
});

app.all("*", (_req, res) => res.status(404).end());

await mongoose.connect(MONGO_URI);

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}...`);
});
