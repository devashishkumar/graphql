const authResolver = require("./auth");
const bookingsResolver = require("./bookings");
const eventsResolver = require("./events");

const rootResolver = {
  ...authResolver,
  ...bookingsResolver,
  ...eventsResolver
};

module.exports = rootResolver;

// const bcrypt = require("bcryptjs");
// const Event = require("./../../models/event");
// const User = require("./../../models/user");
// const Booking = require("./../../models/booking");
// const { dateToString } = require("./../../helpers/date");

// const USERID = "66efc1957c08bdea5be34454";

// const transformEvent = (event) => {
//   return {
//     ...event._doc,
//     _id: event.id,
//     date: dateToString(event._doc.date),
//     creator: user.bind(this, event.creator),
//   };
// };

// const transformBooking = (booking) => {
//   return {
//     ...booking._doc,
//     _id: booking.id,
//     user: user.bind(this, booking._doc.user),
//     event: singleEvent.bind(this, booking._doc.event),
//     createdAt: dateToString(booking._doc.createdAt),
//     updatedAt: dateToString(booking._doc.updatedAt),
//   };
// };

// /**
//  * @param eventId event id
//  * @returns get event by event id
//  */
// const singleEvent = async (eventId) => {
//   try {
//     const event = await Event.findById(eventId);
//     // return {
//     //   ...event._doc,
//     //   _id: event.id,
//     //   createdEvents: events.bind(this, event.createdEvents),
//     // };
//     return transformEvent(event);
//   } catch (err) {
//     throw err;
//   }
// };

// /**
//  * @param userId userid
//  * @returns user details by id
//  */
// const user = async (userId) => {
//   try {
//     const user = await User.findById(userId);
//     return {
//       ...user._doc,
//       _id: user.id,
//       createdEvents: events.bind(this, user._doc.createdEvents),
//     };
//   } catch (err) {
//     throw err;
//   }
// };

// /**
//  * @param eventIds event id
//  * @returns get events
//  */
// const events = async (eventIds) => {
//   try {
//     const events = await Event.find({ _id: { $in: eventIds } });
//     return events.map((event) => {
//       return transformEvent(event);
//     });
//   } catch (err) {
//     throw err;
//   }
// };

// module.exports = {
//   events: async () => {
//     try {
//       const events = await Event.find();
//       events.map((event) => {
//         return transformEvent(event);
//       });
//       return events;
//     } catch (err) {
//       throw err;
//     }
//   },
//   bookings: async (args) => {
//     try {
//       const bookings = await Booking.find();
//       return bookings.map((booking) => {
//         return transformBooking(booking);
//       });
//     } catch (err) {
//       throw err;
//     }
//   },

//   createEvent: async (args) => {
//     const event = new Event({
//       title: args.eventInput.title,
//       description: args.eventInput.description,
//       price: +args.eventInput.price,
//       date: new Date(args.eventInput.date),
//       creator: USERID,
//     });
//     let createdEvent;
//     // now saving to mongodb database
//     try {
//       const result = await event.save();
//       createdEvent = transformEvent(result);
//       const creatorId = await User.findById(USERID);
//       if (!creatorId) {
//         throw new Error("User not found.");
//       }
//       creatorId.createdEvents.push(event);
//       await creatorId.save();
//       return createdEvent;
//     } catch (err) {
//       throw err;
//     }
//   },
//   createUser: async (args) => {
//     try {
//       const existingUser = await User.findOne({ email: args.userInput.email });
//       if (existingUser) {
//         throw new Error("User Exist, Please try another email");
//       }
//       const hashPassword = await bcrypt.hash(args.userInput.password, 12);
//       const user = new User({
//         email: args.userInput.email,
//         password: hashPassword,
//       });
//       const result = await user.save();
//       if (result) {
//         return {
//           ...result._doc,
//           password: null,
//           _id: result._doc._id.toString(),
//         };
//       }
//     } catch (err) {
//       throw err;
//     }
//   },
//   createBooking: async (args) => {
//     try {
//       const fetchEvent = await Event.findOne({ _id: args.eventId });
//       const booking = new Booking({
//         user: USERID,
//         event: fetchEvent,
//       });
//       const result = await booking.save();
//       return transformBooking(result);
//     } catch (err) {
//       throw err;
//     }
//   },
//   cancelBooking: async (args) => {
//     try {
//       const booking = await Booking.findOne({ _id: args.eventId }).populate(
//         "event"
//       );
//       const event = transformEvent(booking.event);
//       await Booking.deleteOne({ _id: args.eventId });
//       return event;
//     } catch (err) {
//       throw err;
//     }
//   },
// };
