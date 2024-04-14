import React from "react";
import { getSession } from "@/lib";

const Greeting = () => {
    return <h1>Welcome</h1>;
};

const page = async () => {
    const session = await getSession();
    return(
    <>
        {Greeting()}
        <pre>{JSON.stringify(session, null, 2)}</pre>
    </>
    ) 
};

export default page;
