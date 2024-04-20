import React from "react";
import { getSession, fetchAthleteActivities } from "@/lib";
import { redirect } from "next/navigation";
import ActivityCard from "@/components/ActivityCard";
import CardContainer from "@/components/CardContainer";

const page = async () => {
    try {
        const session = await getSession();
        if (!session) redirect("/login");
        const activities = await fetchAthleteActivities(session.userData.access_token);
        if (activities.errors != null) throw new Error(activities.message);
        return (
            <>
                <h1 className="text-2xl font-bold">Your Last 10 Activities</h1>
                <CardContainer />
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
            </>
        );
    } catch (error) { 
        console.error(error);
        return <h1>Error</h1>;
    }
};
// <pre>{JSON.stringify(session, null, 2)}</pre>
export default page;
