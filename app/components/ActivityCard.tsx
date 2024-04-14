import React from "react";

interface ActivityCardProps {
  title: string;
  date: string;
  duration: string;
  distance: string;
}
const dateOptions: {} = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};
const ActivityCard = (activityData: ActivityCardProps) => {
  return (
    <div className="card w-1/3 m-5 bg-sky-400 text-primary-content hover:bg-sky-500">
      <div className="card-body">
        <h2 className="card-title">{activityData.title}</h2>
        <p>
          Date:{" "}
          {new Date(activityData.date).toLocaleDateString("en-us", dateOptions)}
        </p>
        <p>Duration: {activityData.duration}</p>
        <p>Distance: {activityData.distance}</p>
      </div>
    </div>
  );
};

export default ActivityCard;
