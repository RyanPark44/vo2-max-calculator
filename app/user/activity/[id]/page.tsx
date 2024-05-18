import React from "react";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";
import {
    getSession,
    fetchActivityStream,
    getLTHR,
    getThresholdPace,
} from "@/lib";

const page = async ({ params }: { params: { id: string } }) => {
    try {
        // Verify session is active
        const session = await getSession();
        if (!session) redirect("/login");

        // Fetch activity stream data
        const { id: activityId } = params;
        if (!activityId) throw new Error("No activity ID provided");
        const activityData = await fetchActivityStream(
            session.userData.access_token,
            +activityId,
        );
        if (activityData.errors != null) throw new Error(activityData.message);

        const thresholdPace = getThresholdPace(activityData.distance.data);
        const thresholdPaceMinutes = Math.floor(thresholdPace);
        const thresholdPaceSeconds = Math.floor((thresholdPace % 1) * 60)
            .toString()
            .padStart(2, "0");
        const lactateThresholdHeartRate = getLTHR(activityData.heartrate.data);

        return (
            <>
                <Navbar />
                <p>LTHR: {Math.round(lactateThresholdHeartRate)}</p>
                <p>
                    Threshold Pace: {thresholdPaceMinutes}:{thresholdPaceSeconds} km
                </p>
            </>
        );
    } catch (error) {
        console.error(error);
        return <h1 className="text-error">Error</h1>;
    }
};

export default page;
