const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

 
const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));

const clientSchema = new mongoose.Schema({
    client_id: Number,
    fname: String,
    mname: String,
    lname: String,
    phone: String,
    email: String,
    passport: String,
});

const Client = mongoose.model("Client", clientSchema);

const airplaneSchema = new mongoose.Schema({
    airplane_id: Number,
    max_seats: Number,
});

const Airplane = mongoose.model("Airplane", airplaneSchema);

const flightStatusSchema = new mongoose.Schema({
    status_id: Number,
    status_name: String,
});
const FlightStatus = mongoose.model("FlightStatus", flightStatusSchema);

const airportSchema = new mongoose.Schema({
    airport_code: String,
    airport_name: String,
});

const Airport = mongoose.model("Airport", airportSchema);

const gateSchema = new mongoose.Schema({
    gate_no: Number,
});
const Gate = mongoose.model("Gate", gateSchema);

const reviewSchema = new mongoose.Schema({
    review_id: Number,
});
const Review = mongoose.model("Review", reviewSchema);

const scheduleSchema = new mongoose.Schema({
    schedule_id: Number,
    departure_time: Date,
    arrival_time: Date,
    duration_time: Number
});
const Schedule = mongoose.model("Schedule", scheduleSchema);

const flightSchema = new mongoose.Schema({
    flight_no: Number,
    schedule_id: Number,
    flightStatus_id: Number,
    airplane_id: Number
});
const Flight = mongoose.model("Flight", flightSchema);

const TicketSchema = new mongoose.Schema({
    ticket_id: Number,
    seat_no: String,
    departure_time: Date,
    gate_no: String,
    airport_code: String,
  });
const Ticket = mongoose.model("Ticket", TicketSchema);

const bookingSchema = new mongoose.Schema({
    booking_id: Number,
});

const Booking = mongoose.model("Booking", bookingSchema);

const AdminSchema = new mongoose.Schema({
    username: String,
    password: String,
  });
const Admin = mongoose.model("Admin", AdminSchema);

const FlightBookingSchema = new mongoose.Schema({
    departure: String,
    arrival: String,
    departureDate: Date,
    returnDate: Date,
    class: String,
    price: Number,
  });
const FlightBooking = mongoose.model("FlightBooking", FlightBookingSchema);

const CustomerSchema = new mongoose.Schema({
  email: String,
  password: String,
});

const Customer = mongoose.model("Customer", CustomerSchema);

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/api/post', async (req, res) => {
  try {
      const newClientData = req.body; // Assuming client data is sent directly in the request body
      const newClient = await Client.create(newClientData);
      res.status(201).json(newClient); // Respond with the newly created client object
  } catch (err) {
      res.status(500).json({ err: err.message });
  }
});

app.get("/api/get", async (req, res) => {
    try {
        const clients = await Client.find();
        res.send(clients);
    } catch (err) {
        res.status(500).send({ err: err.message });
    }
});

app.get("/airplane/api/get", async (req, res) => {
    try {
        const airplanes = await Airplane.find();
        res.send(airplanes);
    } catch (err) {
        res.status(500).send({ err: err.message });
    }
});

app.get("/flightStatus/api/get", async (req, res) => {
    try {
        const flightStatuses = await FlightStatus.find();
        res.send(flightStatuses);
    } catch (err) {
        res.status(500).send({ err: err.message });
    }
});

app.get("/airport/api/get", async (req, res) => {
    try {
        const airports = await Airport.find();
        res.send(airports);
    } catch (err) {
        res.status(500).send({ err: err.message });
    }
});

app.get("/gates/api/get", async (req, res) => {
    try {
        const gates = await Gate.find();
        res.send(gates);
    } catch (err) {
        res.status(500).send({ err: err.message });
    }
});

app.get("/reviews/api/get", async (req, res) => {
    try {
        const reviews = await Review.find();
        res.send(reviews);
    } catch (err) {
        res.status(500).send({ err: err.message });
    }
});

app.get("/schedule/api/get", async (req, res) => {
    try {
        const schedules = await Schedule.find();
        res.send(schedules);
    } catch (err) {
        res.status(500).send({ err: err.message });
    }
});

app.get("/flight/api/get", async (req, res) => {
    try {
        const flights = await Flight.find();
        res.send(flights);
    } catch (err) {
        res.status(500).send({ err: err.message });
    }
});

app.get("/ticket/api/get", async (req, res) => {
    try {
        const tickets = await Ticket.find();
        res.send(tickets);
    } catch (err) {
        res.status(500).send({ err: err.message });
    }
});

app.get("/booking/api/get", async (req, res) => {
    try {
        const bookings = await Booking.find();
        res.send(bookings);
    } catch (err) {
        res.status(500).send({ err: err.message });
    }
});

app.post('/api/post', async (req, res) => {
    try {
        const newClient = new Client(req.body);
        await newClient.save();
        res.status(201).send(newClient);
    } catch (err) {
        res.status(500).send({ err: err.message });
    }
});

app.post('/airplane/api/post', async (req, res) => {
    try {
        const newAirplane = new Airplane(req.body);
        await newAirplane.save();
        res.status(201).send(newAirplane);
    } catch (err) {
        res.status(500).send({ err: err.message });
    }
});

app.post('/schedule/api/post', async (req, res) => {
    try {
        const newSchedule = new Schedule(req.body);
        await newSchedule.save();
        res.status(201).send(newSchedule);
    } catch (err) {
        res.status(500).send({ err: err.message });
    }
});

app.post('/flight/api/post', async (req, res) => {
    try {
        const newFlight = new Flight(req.body);
        await newFlight.save();
        res.status(201).send(newFlight);
    } catch (err) {
        res.status(500).send({ err: err.message });
    }
});

app.delete('/api/remove/:id', async (req, res) => {
    try {
        await Client.deleteOne({ client_id: req.params.id });
        res.status(204).send();
    } catch (err) {
        res.status(500).send({ err: err.message });
    }
});

app.delete('/airplane/api/remove/:id', async (req, res) => {
    try {
        await Airplane.deleteOne({ airplane_id: req.params.id });
        res.status(204).send();
    } catch (err) {
        res.status(500).send({ err: err.message });
    }
});

app.delete('/schedule/api/remove/:id', async (req, res) => {
    try {
        await Schedule.deleteOne({ schedule_id: req.params.id });
        res.status(204).send();
    } catch (err) {
        res.status(500).send({ err: err.message });
    }
});

app.delete('/flight/api/remove/:id', async (req, res) => {
    try {
        await Flight.deleteOne({ flight_no: req.params.id });
        res.status(204).send();
    } catch (err) {
        res.status(500).send({ err: err.message });
    }
});

app.get("/api/get/:id", async (req, res) => {
    try {
        const client = await Client.findOne({ client_id: req.params.id });
        res.json(client);
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
});

app.get("/airplane/api/get/:id", async (req, res) => {
    try {
        const airplane = await Airplane.findOne({ airplane_id: req.params.id });
        res.json(airplane);
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
});

app.get("/flightStatus/api/get/:id", async (req, res) => {
    try {
        const flightStatus = await FlightStatus.findOne({ flightStatus_id: req.params.id });
        res.json(flightStatus);
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
});

app.get("/airport/api/get/:id", async (req, res) => {
    try {
        const airport = await Airport.findOne({ airport_code: req.params.id });
        res.json(airport);
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
});

app.get("/gates/api/get/:id", async (req, res) => {
    try {
        const gate = await Gate.findOne({ gate_no: req.params.id });
        res.json(gate);
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
});

app.get("/reviews/api/get/:id", async (req, res) => {
    try {
        const reviews = await CustomerReview.find({ client_id: req.params.id });
        res.json(reviews);
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
});

app.get("/schedule/api/get/:id", async (req, res) => {
    try {
        const schedule = await Schedule.findOne({ schedule_id: req.params.id });
        res.json(schedule);
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
});

app.put("/api/update/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const updatedClient = await Client.findByIdAndUpdate(id, req.body, { new: true });
      res.json(updatedClient);
    } catch (err) {
      res.status(500).json({ err: err.message });
    }
  });
  
  // Route handler to update airplane data by ID
app.put("/airplane/api/update/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const updatedAirplane = await Airplane.findByIdAndUpdate(id, req.body, { new: true });
      res.json(updatedAirplane);
    } catch (err) {
      res.status(500).json({ err: err.message });
    }
  });
  
  // Route handler to update schedule data by ID
app.put("/schedule/api/update/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const updatedSchedule = await Schedule.findByIdAndUpdate(id, req.body, { new: true });
      res.json(updatedSchedule);
    } catch (err) {
      res.status(500).json({ err: err.message });
    }
  });
  
  // Route handler to update ticket data by ID
app.put("/ticket/api/update/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const updatedTicket = await Ticket.findByIdAndUpdate(id, req.body, { new: true });
      res.json(updatedTicket);
    } catch (err) {
      res.status(500).json({ err: err.message });
    }
  });
app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    try {
      const admin = await Admin.findOne({ username, password });
      if (admin) {
        res.json(admin);
      } else {
        res.json({ msg: 'Invalid Admin Login' });
      }
    } catch (err) {
      res.status(500).json({ err: err.message });
    }
  });
  
  // Route handler for customer login
app.post("/customerlogin", async (req, res) => {
    const { email, password } = req.body;
    try {
      const client = await Client.findOne({ email, password });
      if (client) {
        res.json(client);
      } else {
        res.json({ msg: 'Invalid Customer Login' });
      }
    } catch (err) {
      res.status(500).json({ err: err.message });
    }
  });
  
  // Route handler to get customer login
app.post("/getcustomerlogin", async (req, res) => {
    const { email, password } = req.body;
    try {
      const client = await Client.findOne({ email, password }, { _id: 1 });
      if (client) {
        res.json(client);
      } else {
        res.json({ msg: 'Invalid Customer Login' });
      }
    } catch (err) {
      res.status(500).json({ err: err.message });
    }
  });
app.post("/signup", async (req, res) => {
    const { fname, mname, lname, phone, email, passport, password } = req.body;
    try {
      const client = await Client.create({
        fname,
        mname,
        lname,
        phone,
        email,
        passport,
        password,
      });
      res.json(client);
    } catch (err) {
      res.status(500).json({ err: err.message });
    }
  });
  
  // Route handler for getting client information
app.get("/CustomerPanel/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const client = await Client.findById(id);
      res.json(client.fname);
    } catch (err) {
      res.status(500).json({ err: err.message });
    }
  });
  
  // Route handler for booking a flight
app.post("/BookTicket", async (req, res) => {
    const {
      departure,
      arrival,
      departureDate,
      returnDate,
      classs,
      price,
    } = req.body;
    try {
      const flightBooking = await FlightBooking.create({
        departure,
        arrival,
        departureDate,
        returnDate,
        class: classs,
        price,
      });
      res.json(flightBooking);
    } catch (err) {
      res.status(500).json({ err: err.message });
    }
  });
  
  // Route handler for searching flights
app.get("/SearchFlights", async (req, res) => {
    try {
      const flights = await FlightBooking.find({});
      res.json(flights);
    } catch (err) {
      res.status(500).json({ err: err.message });
    }
  });

app.delete('/removeSearch', async (req, res) => {
    try {
      await FlightBooking.deleteMany({});
      res.send("All flight bookings removed");
    } catch (err) {
      res.status(500).json({ err: err.message });
    }
  });
  
  // Route handler for available flights
app.post("/AvailableFlights", async (req, res) => {
    const { departureDate, returnDate, fares } = req.body;
    console.log(departureDate);
    console.log(returnDate);
    console.log(fares.slice(2, 6));
  
    try {
      const flights = await FlightBooking.find({
        departure_time: { $regex: new RegExp(departureDate), $options: "i" },
        arrival_time: { $regex: new RegExp(returnDate), $options: "i" },
        fares: fares.slice(2, 6),
      });
      res.send(flights);
    } catch (err) {
      res.status(500).json({ err: err.message });
    }
  });
  
  // Route handler for updating flight booking
app.post("/UpdateFlightBooking", async (req, res) => {
    const { id } = req.body;
  
    try {
      const flightBooking = await FlightBooking.findOne({ flight_no: null });
      if (flightBooking) {
        const flight = await Flight.findOne({ schedule_id: id });
        if (flight) {
          flightBooking.flight_no = flight.flight_no;
          await flightBooking.save();
          res.send("Flight booking updated");
        } else {
          res.status(404).json({ err: "Flight schedule not found" });
        }
      } else {
        res.status(404).json({ err: "Flight booking not found" });
      }
    } catch (err) {
      res.status(500).json({ err: err.message });
    }
  });

app.get("/invoice/:id", async (req, res) => {
    try {
      const client = await Client.findById(req.params.id);
      res.send(client);
    } catch (err) {
      res.status(500).json({ err: err.message });
    }
  });
  
  // Route handler for retrieving flight fares
app.get("/invoicefares", async (req, res) => {
    try {
      // Define the FlightBooking model/schema if necessary
      const FlightBooking = mongoose.model("FlightBooking", flightBookingSchema);
      const fares = await FlightBooking.find({}, { flight_no: 1, departure: 1, price: 1 });
      res.send(fares);
    } catch (err) {
      res.status(500).json({ err: err.message });
    }
  });
  
  // Route handler for confirming invoice and generating tickets
app.post("/invoiceconfirm", async (req, res) => {
    const { id, departure } = req.body;
    try {
      const ticket = await Ticket.create({
        seat_no: "Generated Seat No",
        departure_time: new Date(), // Adjust as necessary
        gate_no: "Generated Gate No",
        airport_code: "Generated Airport Code",
      });
      res.send(ticket);
    } catch (err) {
      res.status(500).json({ err: err.message });
    }
  });

app.post("/invoiceconfirmAgain", async (req, res) => {
    const { id, flight_no, fares } = req.body;
    try {
      await Booking.updateOne(
        { client_id: null, flight_no: null, fares: null },
        { client_id: id, flight_no: flight_no, fares: fares }
      );
      res.send("Booking updated successfully.");
    } catch (err) {
      res.status(500).json({ err: err.message });
    }
  });
  
  // Route handler for showing passenger details
app.get("/showPass/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const passengers = await Booking.find({ client_id: id }).populate("client_id");
      res.send(passengers);
    } catch (err) {
      res.status(500).json({ err: err.message });
    }
  });
  
  // Route handler for adding a review
app.post("/addreview/:id", async (req, res) => {
    const { id } = req.params;
    const { review } = req.body;
    try {
      await Review.create({ client_id: id, review: review });
      res.send("Review added successfully.");
    } catch (err) {
      res.status(500).json({ err: err.message });
    }
  });
  
  // Route handler for retrieving reviews
app.get("/getreview", async (req, res) => {
    try {
      const reviews = await Review.find().populate("client_id", "fname lname");
      res.send(reviews);
    } catch (err) {
      res.status(500).json({ err: err.message });
    }
  });
  
  // Route handler for retrieving statistics
app.get("/getstats", async (req, res) => {
    try {
      const stats = await Booking.aggregate([
        { $group: { _id: null, countt: { $sum: 1 }, summ: { $sum: "$fares" } } }
      ]);
      res.send(stats);
    } catch (err) {
      res.status(500).json({ err: err.message });
    }
  });

app.post("/invoiceconfirmAgain", async (req, res) => {
    const { id, flight_no, fares } = req.body;
    try {
      await Booking.updateOne(
        { client_id: null, flight_no: null, fares: null },
        { client_id: id, flight_no: flight_no, fares: fares }
      );
      res.send("Booking updated successfully.");
    } catch (err) {
      res.status(500).json({ err: err.message });
    }
  });
  
  // Route handler for showing passenger details
app.get("/showPass/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const passengers = await Booking.find({ client_id: id }).populate("client_id");
      res.send(passengers);
    } catch (err) {
      res.status(500).json({ err: err.message });
    }
  });
  
  // Route handler for adding a review
app.post("/addreview/:id", async (req, res) => {
    const { id } = req.params;
    const { review } = req.body;
    try {
      await Review.create({ client_id: id, review: review });
      res.send("Review added successfully.");
    } catch (err) {
      res.status(500).json({ err: err.message });
    }
  });
  
  // Route handler for retrieving reviews
app.get("/getreview", async (req, res) => {
    try {
      const reviews = await Review.find().populate("client_id", "fname lname");
      res.send(reviews);
    } catch (err) {
      res.status(500).json({ err: err.message });
    }
  });
  
  // Route handler for retrieving statistics
app.get("/getstats", async (req, res) => {
    try {
      const stats = await Booking.aggregate([
        { $group: { _id: null, countt: { $sum: 1 }, summ: { $sum: "$fares" } } }
      ]);
      res.send(stats);
    } catch (err) {
      res.status(500).json({ err: err.message });
    }
  });
  
app.post("/Signup", async (req, res) => {
    const { email, password } = req.body;
    try {
      const existingCustomer = await Customer.findOne({ email: email });
      if (existingCustomer) {
        res.status(400).send("User already exists.");
      } else {
        const newCustomer = new Customer({ email, password });
        await newCustomer.save();
        res.redirect("/userlogin");
      }
    } catch (error) {
      res.status(500).send("Internal server error.");
    }
  });
  
  // Route for customer login
app.post("/CustomerSignin", async (req, res) => {
    const { email, password } = req.body;
    try {
      const customer = await Customer.findOne({ email, password });
      if (customer) {
        // Redirect to user login page if login is successful
        res.redirect("/userlogin");
      } else {
        res.status(401).send("Invalid credentials.");
      }
    } catch (error) {
      res.status(500).send("Internal server error.");
    }
  });
  
  // Route for user login page
app.get("/Signin", (req, res) => {
    res.send("User login page"); // Render your user login page here
  });
  

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});