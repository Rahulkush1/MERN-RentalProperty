import React from "react";
import "./CircleCard.css";
import { Link } from "react-router-dom";

function CircleCard({ data }) {
  return (
    <>
        <div className="container text-center mt-5 circle">
        <Link to={`/properties?keyword=${data.name}`} className="text-decoration-none">
          <img
            src="https://picsum.photos/200/200"
            className="rounded-circle img-fluid circleCard"
            alt="img"
          />
          <p className="text-justify text-center text-dark my-2 ">
            {data.name}
          </p>
        </Link>
        </div>
    </>
  );
}

export default CircleCard;
