import React from "react";
import Link from "next/link";

const redirectUri = "http://localhost:3000/api/exchange_token";
const stravaUrl = `http://www.strava.com/oauth/authorize?client_id=${process.env.CLIENT_ID}&response_type=code&redirect_uri=${redirectUri}&approval_prompt=force&scope=activity:read_all`;

const page = () => {
  return (
    <>
      
      
      <h1 className="text-2xl font-bold">Welcome to VO2 Max Calculator</h1>
      <Link className="btn btn-primary" href={stravaUrl}>
        Login to Strava
      </Link>
    </>
  );
};

export default page;
