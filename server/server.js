import cors from "cors";
import express, { json } from "express";
import session from "express-session";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

import { User, Event, Comment, Location } from "./models.js";

const { PORT, MONGO_URI, SECRET } = process.env;

const app = express();

app.use(
	json(),
	cors({
		origin: "http://localhost:5173", // replace with your frontend url
		credentials: true, // allow cookies to be sent
	}),
	session({
		name: "sid",
		secret: SECRET,
		resave: true,
		saveUninitialized: false,
		cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 }, // 7 days
	}),
);

const checkAuth = (req, res, next) => {
	if (!req.session.uid) {
		return res.status(401).end();
	}
	next();
};

const checkAdminAuth = (req, res, next) => {
	checkAuth(req, res, () => {
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
	const user = await User.findOne({ username }, "-__v -favourites")
		.lean()
		.exec();
	if (!user) {
		return res.status(401).end();
	}
	if (!(await bcrypt.compare(password, user.password))) {
		return res.status(401).end();
	}
	req.session.uid = user._id;
	req.session.username = user.username;
	req.session.admin = user.admin;
	return res.status(200).json(user);
});

app.post("/logout", checkAuth, (req, res) => {
	req.session.destroy();
	return res.status(200).end();
});

app.put("/username", checkAuth, async (req, res) => {
	const { username } = req.body;
	if (isAnyMissing(username)) {
		return res.status(400).end();
	}
	await User.findByIdAndUpdate(req.session.uid, { username }).exec();
	req.session.username = username;
	return res.status(200).end();
});

app.get("/events", async (_req, res) => {
	const events = await Event.find({}, "-__v").lean().exec();
	return res.status(200).json(events || []);
});

app.post("/events", checkAdminAuth, async (req, res) => {
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
		)
	) {
		return res.status(400).end();
	}
	const location = await Location.exists({ id: lid }).exec();
	const lastEvent = await Event.findOne().sort({ id: -1 }).lean().exec();
	const newId = lastEvent ? lastEvent.id + 1 : 1;
	if (!location) {
		return res.status(400).end();
	}
	await Event.create({
		id: newId,
		title,
		predate,
		progtime,
		desc,
		agelimit,
		price,
		presenterorg,
		lid,
	});
	return res.status(201).end();
});

app.put("/events/:id", checkAdminAuth, async (req, res) => {
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
		!mongoose.isValidObjectId(req.params.id)
	) {
		return res.status(400).end();
	}
	const location = await Location.exists({ id: lid }).exec();
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
			lid,
		},
		{ new: true },
	).exec();
	if (!event) {
		return res.status(404).end();
	}
	return res.status(200).end();
});

app.delete("/events/:id", checkAdminAuth, async (req, res) => {
	if (!mongoose.isValidObjectId(req.params.id)) {
		return res.status(400).end();
	}
	const event = await Event.findByIdAndDelete(req.params.id).exec();
	if (!event) {
		return res.status(404).end();
	}
	return res.status(200).end();
});

app.get("/users", checkAdminAuth, async (_req, res) => {
	const users = await User.find({}, "-__v").lean().exec();
	return res.status(200).json(users || []);
});

app.post("/users", async (req, res) => {
	const { username, password, admin } = req.body;
	if (isAnyMissing(username, password)) {
		return res.status(400).end();
	}
	const user = await User.exists({ username }).exec();
	if (user) {
		return res.status(409).end();
	}
	const _password = await bcrypt.hash(password, 10);
	await User.create({ username, password: _password, admin: admin || false });
	return res.status(201).end();
});

app.put("/users/:id", checkAdminAuth, async (req, res) => {
	const { username, password, admin } = req.body;
	if (
		isAnyMissing(username, password, admin) ||
		!mongoose.isValidObjectId(req.params.id)
	) {
		return res.status(400).end();
	}
	const _user = await User.exists({ username }).exec();
	if (_user && _user._id !== req.params.id) {
		return res.status(409).end();
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

app.delete("/users/:id", checkAdminAuth, async (req, res) => {
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

app.get("/locations", checkAuth, async (req, res) => {
	const locations = await Location.find({}, "-__v")
		.lean()
		.populate("numevents")
		.populate("numcomments")
		.exec();
	const { favourites } = await User.findById(req.session.uid)
		.lean()
		.populate("favourites")
		.exec();
	return res.status(200).json(
		locations.map((location) => ({
			...location,
			isFav: favourites.includes(location.id),
		})),
	);
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
	const name = req.params.name.replace(/-+/g, " ");
	const location = await Location.findOne({ name }, "-__v").lean().exec();
	if (!location) {
		return res.status(404).end();
	}
	const [events, comments] = await Promise.all([
		Event.find({ location: location._id }, "-__v -location").lean().exec(),
		Comment.find({ location: location._id }, "-__v -location")
			.lean()
			.populate("user", "username")
			.sort({ created: -1 })
			.exec(),
	]);
	return res.status(200).json({ ...location, events, comments });
});

app.post("/comments", checkAuth, async (req, res) => {
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

app.get("/favourites", checkAuth, async (req, res) => {
	const { favourites } = await User.findById(req.session.uid)
		.lean()
		.populate({
			path: "favourites",
			select: "-__v",
			populate: { path: "numevents" },
		})
		.exec();
	return res.status(200).json(favourites || []);
});

app.post("/favourites", checkAuth, async (req, res) => {
	if (!mongoose.isValidObjectId(req.body.id)) {
		return res.status(400).end();
	}
	const location = await Location.exists({ _id: req.body.id }).exec();
	if (!location) {
		return res.status(404).end();
	}
	await User.findByIdAndUpdate(req.session.uid, {
		$addToSet: { favourites: location._id },
	}).exec();
	return res.status(201).end();
});

app.delete("/favourites/:id", checkAuth, async (req, res) => {
	if (!mongoose.isValidObjectId(req.params.id)) {
		return res.status(400).end();
	}
	const location = await Location.exists({ _id: req.params.id }).exec();
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
