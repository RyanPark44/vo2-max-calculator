"use client";
import React from "react";
import { useRouter } from "next/navigation";

interface ActivityCardProps {
  key: number;
  id: number;
  title: string;
  date: string;
  duration: number;
  distance: number;
}
const dateOptions: {} = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};
const ActivityCard = (activityData: ActivityCardProps) => {
  // Router hook to navigate to activity page
  const router = useRouter();

  // Handle click event to navigate to activity page
  const handleClick = (event: any) => {
    const activityId = event.target.closest(".card").dataset.id
    router.push(`./activity/${activityId}`);
  };
  // Format date, duration, and distance
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
      className="card m-5 bg-sky-400 text-primary-content hover:bg-sky-500"
      data-id={activityData.id}
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
