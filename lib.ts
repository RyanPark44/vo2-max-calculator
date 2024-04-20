import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

//////////////////////////////////////////////////
// Cookie Encryption and Decryption Melthods
const secretKey = "secret";
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("15 minutes from now")
    .sign(key);
}

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload;
}

export async function login(userData: any) {
  const expires = new Date(Date.now() + 20 * 60 * 1000);
  const session = await encrypt({ userData, expires });
  cookies().set("session", session, { expires, httpOnly: true });
}

export async function logout() {
  cookies().set("session", "", { expires: new Date(0) });
}

export async function getSession() {
  const session = cookies().get("session")?.value;
  if (!session) return null;
  return await decrypt(session);
}

export async function updateSession(request: NextRequest) {
  const session = request.cookies.get("session")?.value;
  if (!session) return null;

  const parsed = await decrypt(session);
  parsed.expires = new Date(Date.now() + 20 * 60 * 1000);
  const res = NextResponse.next();
  res.cookies.set({
    name: "session",
    value: await encrypt(parsed),
    expires: parsed.expires,
    httpOnly: true,
  });
  return res;
}
//////////////////////////////////////////////////
// Strava API Fetch Methods
export async function fetchAthleteActivities(accessToken: string, page: number = 1) {
  const res = await fetch(`https://www.strava.com/api/v3/athlete/activities?page=${page}&per_page=10`, {
    headers: {
      accept: "application/json",
      authorization: `Bearer ${accessToken}`
    }
  });
  return await res.json();
}

export async function fetchActivityStream(accessToken: string, activityId: number) {
  const res = await fetch(`https://www.strava.com/api/v3/activities/${activityId}/streams?keys=heartrate,time&key_by_type=true`, {
    headers: {
      accept: "application/json",
      authorization: `Bearer ${accessToken}`
    }
  });
  return await res.json();
}

//////////////////////////////////////////////////
// Vo2 Max Calculation Methods
export function highestAverageHeartRate(heartRateData: number[], windowSizeMinutes: number = 30) {
  if (heartRateData.length <= 0 || windowSizeMinutes <= 0) return 0;
  windowSizeMinutes *= 60; // Convert to seconds

  // Calculate the initial window sum
  let windowSum = heartRateData.reduce((acc, val) => {return acc + val}, 0);
  let maxSum = windowSum;

  // Slide the window and calculate the sum
  for (let i = windowSizeMinutes; i < heartRateData.length; i++) {
    windowSum = windowSum - heartRateData[i - windowSizeMinutes] + heartRateData[i];
    maxSum = Math.max(maxSum, windowSum);
  }

  return maxSum / windowSizeMinutes;
}
