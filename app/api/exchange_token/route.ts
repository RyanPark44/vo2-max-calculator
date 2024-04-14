import { redirect } from 'next/navigation';
import { login } from '@/lib';

export const GET = async (req: Request) => {
    // Get the auth code and scope from the query string
    const url = new URL(req.url);
    const params = new URLSearchParams(url.search);
    const error = params.get("error");
    const authCode = params.get("code");
    const scope = params.get("scope");
    if (error || !authCode) {
        console.error("error", error);
        redirect("/login/error");
    }
    if (scope !== "read,activity:read_all") {
        console.error("scope", scope);
        redirect("/login/error");
    }
    
    // Exchange the auth code for an access token
    const token_response = await fetch("https://www.strava.com/oauth/token", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET,
            code: authCode,
            grant_type: "authorization_code",
        }),
    });
    const token_data = await token_response.json();
    console.log("token_data", token_data);
    await login(token_data);
    redirect(`/user/${token_data.athlete.id}?first_name=${token_data.athlete.firstname}`);
}
