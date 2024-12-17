import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	admin: {
		type: Boolean,
		required: true,
		default: false,
	},
	favourites: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Location",
		},
	],
});

export const User = mongoose.model("User", UserSchema);

const EventSchema = new mongoose.Schema({
	id: {
		type: String,
		required: true,
		unique: true,
	},
	title: {
		type: String,
		required: true,
	},
	predate: {
		type: String,
	},
	progtime: {
		type: String,
	},
	desc: {
		type: String,
	},
	agelimit: {
		type: String,
	},
	price: {
		type: String,
	},
	presenterorg: {
		type: String,
	},
	location: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Location",
		required: true,
	},
});

export const Event = mongoose.model("Event", EventSchema);

const LocationSchema = new mongoose.Schema({
	id: {
		type: String,
		required: true,
		unique: true,
	}, // not used for referencing; only kept for display purpose
	name: {
		type: String,
		required: true,
		unique: true,
	},
	category: {
		type: String,
		required: true,
	},
	thumbnail: {
		type: String,
	},
	latitude: {
		type: Number,
		required: true,
	},
	longitude: {
		type: Number,
		required: true,
	},
	// events: [
	// 	{
	// 		type: mongoose.Schema.Types.ObjectId,
	// 		ref: "Event",
	// 	},
	// ],
	// comments: [
	// 	{
	// 		type: mongoose.Schema.Types.ObjectId,
	// 		ref: "Comment",
	// 	},
	// ],
});
LocationSchema.virtual("numevents", {
	ref: "Event",
	localField: "_id",
	foreignField: "location",
	count: true,
});
LocationSchema.virtual("numcomments", {
	ref: "Comment",
	localField: "_id",
	foreignField: "location",
	count: true,
});

export const Location = mongoose.model("Location", LocationSchema);

const CommentSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	location: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Location",
		required: true,
	},
	text: {
		type: String,
		required: true,
	},
	created: {
		type: Date,
		required: true,
		default: () => Date.now(),
	},
});

export const Comment = mongoose.model("Comment", CommentSchema);
