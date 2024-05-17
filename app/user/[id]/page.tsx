import React from "react";
import { getSession, fetchAthleteActivities } from "@/lib";
import { redirect } from "next/navigation";
import ActivityCard from "@/components/ActivityCard";
import Navbar from "@/components/Navbar";

const page = async () => {
    try {
        const session = await getSession();
        if (!session) redirect("/login");
        const activities = await fetchAthleteActivities(session.userData.access_token);
        if (activities.errors != null) throw new Error(activities.message);
        return (
            <>
                <Navbar />
                <h1 className="text-2xl font-bold text-center pt-8">Welcome, {session.userData.athlete.firstname}!</h1>
                <h1 className="text-2xl font-bold text-center">Select an activity to calculate your Lactate Threshold Heart Rate (LTHR):</h1>
                <h3 className="text-l font-bold ml-8">Your last 10 activities</h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {activities.map((activity: any) => {
                        return (
                            <ActivityCard
                                key={activity.id}
                                id={activity.id}
                                title={activity.name}
                                date={activity.start_date_local}
                                duration={activity.elapsed_time}
                                distance={activity.distance}
                            />
                        );
                    })}
                </div>
            </>
        );
    } catch (error) { 
        console.error(error);
        return <h1>Error</h1>;
    }
};
export default page;
