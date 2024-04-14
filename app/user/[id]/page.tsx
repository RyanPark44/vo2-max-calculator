import React from "react";
import { getSession, fetchAthleteActivities } from "@/lib";
import { redirect } from "next/navigation";
import ActivityCard from "@/components/ActivityCard";

const Greeting = () => {
    return <h1>Welcome</h1>;
};

const page = async () => {
    try {
        const session = await getSession();
        if (!session) redirect("/login");
        const activities = await fetchAthleteActivities(session.userData.access_token);
        if (activities.errors != null) throw new Error(activities.message);
        return (
            <>
                {Greeting()}
                {activities.map((activity: any) => {
                    return (
                        <ActivityCard
                            key={activity.id}
                            title={activity.name}
                            date={activity.start_date_local}
                            duration={activity.elapsed_time}
                            distance={activity.distance}
                        />
                    );
                })}
            </>
        );
    } catch (error) { 
        console.error(error);
        return <h1>Error</h1>;
    }
};
// <pre>{JSON.stringify(session, null, 2)}</pre>
export default page;
