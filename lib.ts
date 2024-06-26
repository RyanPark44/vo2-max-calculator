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
export async function fetchAthleteActivities(
  accessToken: string,
  page: number = 1,
) {
  const res = await fetch(
    `https://www.strava.com/api/v3/athlete/activities?page=${page}&per_page=10`,
    {
      headers: {
        accept: "application/json",
        authorization: `Bearer ${accessToken}`,
      },
    },
  );
  return await res.json();
}

export async function fetchActivityStream(
  accessToken: string,
  activityId: number,
) {
  const res = await fetch(
    `https://www.strava.com/api/v3/activities/${activityId}/streams?keys=distance,heartrate&key_by_type=true`,
    {
      headers: {
        accept: "application/json",
        authorization: `Bearer ${accessToken}`,
      },
    },
  );
  return await res.json();
}

//////////////////////////////////////////////////
// Physical Performance Calculation Methods
export function getLTHR(heartrateData: number[]) {
  const segmentSize = 1200; // 20 minutes in seconds
  const segmentStart = getFastestSegmentStart(heartrateData, segmentSize);

  let heartrateSum = 0;
  for (let i = segmentStart + 1; i <= segmentStart + segmentSize ; ++i) {
    heartrateSum += heartrateData[i];
  }
  return heartrateSum / segmentSize;
}

export function getThresholdPace(distanceData: number[]) {
  const segmentSize = 1200; // 20 minutes in seconds
  const segmentStart = getFastestSegmentStart(distanceData, segmentSize);
  const segmentDistance = distanceData[segmentStart + segmentSize] - distanceData[segmentStart]
  return (segmentSize / 60) / (segmentDistance / 1000)  // convert to Pace min/km
}

export function getFastestSegmentStart(distanceData: number[], segmentSize: number) {
  try {
    if (distanceData.length <= segmentSize)
      throw new Error("Activity duration is less the requested segment size.");

    let maxDistance = distanceData[segmentSize - 1];
    let segmentStart = 0;
    let currentDistance = maxDistance;

    for (let i = 0; i < distanceData.length - segmentSize; ++i) {
      currentDistance = distanceData[i + segmentSize] - distanceData[i];
      maxDistance = Math.max(maxDistance, currentDistance);
      if (maxDistance === currentDistance) segmentStart = i;
    }

    return segmentStart;
  } catch (error) {
    console.error(error);
    return -1;
  }

} 
