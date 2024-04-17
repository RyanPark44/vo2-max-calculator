import React from "react";
import { redirect } from "next/navigation";
import { getSession, fetchActivityStream } from "@/lib";

const page = async ( { params }: { params: { id: string } } ) => {
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

        return (
            <>
                <h1 className="text-2xl font-bold">{activityData.name}</h1>
                <h3>Heart Rate</h3>
                <pre>{JSON.stringify(activityData.heartrate, null, 2)}</pre>
            </>
        );
    } catch (error) {
        console.error(error);
        return <h1>Error</h1>;
    }
};

export default page;
