"use client";
import React from "react";

interface ActivityCardProps {
  title: string;
  date: string;
  duration: number;
  distance: number;
}
const handleClick = () => {
  console.log("clicked");
};
const dateOptions: {} = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};
const ActivityCard = (activityData: ActivityCardProps) => {
  const date = new Date(activityData.date).toLocaleDateString(
    "en-us",
    dateOptions,
  );
  const hours = Math.floor(activityData.duration / 3600);
  const minutes = Math.floor(activityData.duration / 60 - hours * 60);
  const seconds = Math.floor(activityData.duration % 60);
  const distance = (activityData.distance / 1000).toFixed(2); // convert meters to kilometers
  return (
    <div
      className="card w-1/3 m-5 bg-sky-400 text-primary-content hover:bg-sky-500"
      onClick={handleClick}
    >
      <div className="card-body">
        <h2 className="card-title">{activityData.title}</h2>
        <p>{date}</p>
        <p>
          Duration: {hours > 0 ? `${hours}h` : ""}{" "}
          {minutes > 0 ? `${minutes}m` : ""} {seconds}s
        </p>
        <p>Distance: {distance} km</p>
      </div>
    </div>
  );
};

export default ActivityCard;
