import React, { useEffect } from "react";
import SideBar from "./SideBar";
import "./Dashboard.css";
// import MetaData from "../Layout/MetaData";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Doughnut, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  ArcElement,
  Legend,
} from "chart.js";
import { useDispatch, useSelector } from "react-redux";
import { getAdminProperties } from "../../../Action/propertyAction";
import { getAdminAppointments } from "../../../Action/appointmentAction";
import { getAdminBookings } from "../../../Action/bookingAction";
import { toast } from "react-toastify";
// import { clearErrors, getAdminProducts } from "../../action/productAction";

const DashBoard = () => {
  ChartJS.register(
    CategoryScale,
    ArcElement,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
  const dispatch = useDispatch();
  const { properties } = useSelector((state) => state.properties);
  const {appointments} = useSelector((state) => state.appointment);
  const {bookings} = useSelector(state => state.booking);
  // const { orders } = useSelector((state) => state.allOrders);
  // const { users } = useSelector((state) => state.allUsers);

  let sold = 0;

  properties &&
  	properties.forEach((item) => {
  		if (item.attributes.status === 'sold') {
			sold += 1;
  		}
  	});

	let totalEarn = 0;
	bookings.forEach((booking) => {
		totalEarn += booking.attributes.payment.data.attributes.property_price
	})
  useEffect(() => {
    dispatch(getAdminProperties());
	dispatch(getAdminAppointments())
	dispatch(getAdminBookings())
    // dispatch(getAllOrders());
    // dispatch(getAllUsers());
  }, [dispatch]);

  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0, totalEarn],

      },
    ],
  };

  const doughnutState = {
  	labels: ["Sold", "Available"],
  	datasets: [
  		{
  			backgroundColor: ["#00A6B4", "#6800B4"],
  			hoverBackgroundColor: ["#4B5000", "#35014F"],
  			data: [sold, properties.length - sold],
  		},
  	],
  };
  return (
    <div className="dashboard">
      {/* <MetaData title="Dashboard - Admin Panel" /> */}
      <div>
        <div className="row">
          <div className="col-lg-3">
            <SideBar />
          </div>
          <div className="col-lg-9 dashboardContainer">
            <Typography component="h1">Dashboard</Typography>
            <div className="dashboardSummary">
              <div>
                <p>
                  Total Amount <br /> ₹{totalEarn}
                </p>
              </div>
              <div className="dashboardSummaryBox2">
                <Link to="/admin/products">
                  <p>Properties</p>
                  <p>{properties && properties.length}</p>
                </Link>
                <Link to="/admin/orders">
                  <p>Bookings</p>
                  <p>{bookings && bookings.length}</p>
                </Link>
                <Link to="/admin/users">
                  <p>Appointments</p>
                  <p>{appointments && appointments.length}</p>
                </Link>	
              </div>
            </div>
            <div className="lineChart">
              <Line data={lineState} />
            </div>

            <div className="doughnutChart">
              <Doughnut data={doughnutState} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
