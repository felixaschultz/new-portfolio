import type { MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import Card from "../Components/Card";
import { useEffect, useState } from "react";
import "../Styles/User.css";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const [User, setUser] = useState(null);
  useEffect(() => {
    const User = JSON.parse(sessionStorage.getItem("token"));
    setUser(User);
  }, []);

  return (
    <main className="content">
      <h1>Welcome to Remix!</h1>
      <Card>
        {User ? (
          <>
            <img src={User.user.avatar} alt="User Avatar" className="avatar" />
            <div>
              <h2>Welcome {User.user.name.firstName}</h2>
              <p>{User.user.email}</p>
              <a href={User.account_url} rel="noopener noreferrer" target="_blank">My Account</a>
            </div>
          </>
        ) : null}
      </Card>
    </main>
  );
}
