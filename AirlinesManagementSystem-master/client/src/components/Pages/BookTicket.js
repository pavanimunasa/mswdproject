// Importing necessary dependencies
import React, { useState, useEffect } from "react";
import { FaPlaneArrival, FaPlaneDeparture } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router-dom";
import Axios from "axios";

// Defining the BookTicket component
const BookTicket = () => {
  // Initializing necessary variables and states
  const history = useHistory();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { id } = useParams();
  const [data, setData] = useState([]);
  
  // Function to load data on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await Axios.get("http://localhost:3000/airport/api/get");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    loadData();
  }, []);
  
  // Function to handle form submission
  const onSubmit = (data) => {
    Axios.post("http://localhost:3000/BookTicket", {
      departure: data.departure,
      arrival: data.arrival,
      departureDate: data.departureDate,
      returnDate: data.returnDate,
      class: data.class,
      price: data.price,
    }).then((response) => {
      if (response.data.err) console.log(response.data.err);
    }).catch((err) => {
      console.error("Error submitting data:", err);
    });
    setTimeout(() => history.push(`/AvailableFlights/${id}`), 100);
  };
  
  // List of Indian cities
  const indianCities = [
    "Mumbai", "Delhi", "Bangalore", "Chennai", "Kolkata",
    "Hyderabad", "Pune", "Ahmedabad", "Jaipur", "Surat"
  ];

  // Rendering the component JSX
  return (
    <div className="bg-img">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div className="grid justify-center space-y-5 pb-10">
            {/* Departure section */}
            <div>
              <div>
                <div className="relative" style={{ marginTop: "50px" }}>
                  <p className="font-bold text-xl uppercase">Flying from</p>
                  <select
                    style={{ marginTop: "-15px"}}
                    className={`w-full h-16 text-2xl pl-20 rounded-lg ${errors.departure && " focus:border-red-500 focus:ring-red-500 border-red-500"}`}
                    {...register("departure", {
                      required: {
                        value: true,
                        message: "Departure is required",
                      },
                    })}
                  >
                    <option value="" disabled selected>--Select Airport--</option>
                    {indianCities.map((city, index) => (
                      <option key={index} value={city}>{city}</option>
                    ))}
                  </select>
                  <FaPlaneDeparture className="text-4xl absolute left-5 top-10 " />
                </div>
                <div>
                  {errors.departure && (
                    <span className="text-sm text-red-500">
                      {errors.departure.message}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Arrival section */}
            <div>
              <div>
                <div className="relative">
                  <p className="font-bold text-xl uppercase">Flying to</p>
                  <select
                    style={{ marginTop: "-15px"}}
                    className={`w-full h-16 text-2xl pl-20 rounded-lg ${errors.arrival && " focus:border-red-500 focus:ring-red-500 border-red-500"}`}
                    {...register("arrival", {
                      required: {
                        value: true,
                        message: "Arrival is required",
                      },
                    })}
                  >
                    <option value="" disabled selected>--Select Airport--</option>
                    {indianCities.map((city, index) => (
                      <option key={index} value={city}>{city}</option>
                    ))}
                  </select>
                  <FaPlaneArrival className="text-4xl absolute left-5 top-10 " />
                </div>
                <div>
                  {errors.arrival && (
                    <span className="text-sm text-red-500">
                      {errors.arrival.message}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Departure Date section */}
            <div>
              <div>
                <div className="relative">
                  <p className="font-bold text-xl uppercase">Departure Date</p>
                  <input
                    type="date"
                    className={`w-full h-16 text-2xl rounded-lg ${errors.departureDate && " focus:border-red-500 focus:ring-red-500 border-red-500"}`}
                    {...register("departureDate", {
                      required: {
                        value: true,
                        message: "Departure date is required",
                      },
                    })}
                  />
                </div>
                <div>
                  {errors.departureDate && (
                    <span className="text-sm text-red-500">
                      {errors.departureDate.message}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Return Date section */}
            <div>
              <div>
                <div className="relative">
                  <p className="font-bold text-xl uppercase">Return Date</p>
                  <input
                    type="date"
                    className={`w-full h-16 text-2xl rounded-lg ${errors.returnDate && " focus:border-red-500 focus:ring-red-500 border-red-500"}`}
                    {...register("returnDate", {
                      required: {
                        value: true,
                        message: "Return date is required",
                      },
                    })}
                  />
                </div>
                <div>
                  {errors.returnDate && (
                    <span className="text-sm text-red-500">
                      {errors.returnDate.message}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Other form sections... */}

        {/* Button section */}
        <div>
          <input
            type="submit"
            value="Find flight"
            className="w-full h-16 font-bold text-3xl uppercase rounded-lg bg-green-100 hover:bg-white"
          />
        </div>
      </form>
    </div>
  );
};

export default BookTicket;
