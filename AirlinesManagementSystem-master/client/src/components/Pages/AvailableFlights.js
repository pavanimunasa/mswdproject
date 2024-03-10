import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "./styles/Tables.css";

const AvailableFlights = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Mock data for sample flights
    const sampleFlights = [
      {
        airplane_id: "A123",
        max_seats: 150,
        departure_time: "08:00 AM",
        arrival_time: "10:30 AM",
        status: "On time",
        fares: 200,
      },
      {
        airplane_id: "B456",
        max_seats: 200,
        departure_time: "10:00 AM",
        arrival_time: "12:30 PM",
        status: "Delayed",
        fares: 250,
      },
      {
        airplane_id: "C789",
        max_seats: 180,
        departure_time: "12:00 PM",
        arrival_time: "02:30 PM",
        status: "On time",
        fares: 220,
      },
      {
        airplane_id: "D101",
        max_seats: 170,
        departure_time: "02:00 PM",
        arrival_time: "04:30 PM",
        status: "On time",
        fares: 230,
      },
      {
        airplane_id: "E202",
        max_seats: 160,
        departure_time: "04:00 PM",
        arrival_time: "06:30 PM",
        status: "On time",
        fares: 240,
      },
      {
        airplane_id: "F303",
        max_seats: 190,
        departure_time: "06:00 PM",
        arrival_time: "08:30 PM",
        status: "On time",
        fares: 260,
      },
      {
        airplane_id: "G404",
        max_seats: 170,
        departure_time: "08:00 PM",
        arrival_time: "10:30 PM",
        status: "On time",
        fares: 250,
      },
      {
        airplane_id: "H505",
        max_seats: 180,
        departure_time: "10:00 PM",
        arrival_time: "12:30 AM",
        status: "On time",
        fares: 240,
      },
      {
        airplane_id: "I606",
        max_seats: 200,
        departure_time: "12:00 AM",
        arrival_time: "02:30 AM",
        status: "On time",
        fares: 230,
      },
      {
        airplane_id: "J707",
        max_seats: 160,
        departure_time: "02:00 AM",
        arrival_time: "04:30 AM",
        status: "On time",
        fares: 220,
      },
      // Add more sample flights as needed...
    ];

    setData(sampleFlights);
  }, []);

  const { id } = useParams();

  return (
    <div className="bg-pic">
      <table className="styled-table">
        <thead>
          <tr>
            <th>Airplane ID</th>
            <th>Max Seats</th>
            <th>Departure Time</th>
            <th>Arrival Time</th>
            <th>Flight Status</th>
            <th>Fare</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} style={{ backgroundColor: "white" }}>
              <td>{item.airplane_id}</td>
              <td>{item.max_seats}</td>
              <td>{item.departure_time}</td>
              <td>{item.arrival_time}</td>
              <td>{item.status}</td>
              <td>${item.fares}</td>
              <td>
                <Link to={id > 0 ? `/Invoice/${item.airplane_id + id}` : "/CustomerSignin"}>
                  <button className={id > 0 ? "btn btn-book" : "btn btn-login"} style={{ fontSize: "18px" }}>
                    {id > 0 ? "Book" : "Login"}
                  </button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AvailableFlights;
