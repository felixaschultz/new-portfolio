import type { MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Card, Banner } from "../Components";
import { useEffect, useState } from "react";
import "../Styles/User.css";

export const meta: MetaFunction = () => {
  return [
    { title: "Felix A. Schultz" },
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
    <main>
      <Banner />
      <section className="content">
      </section>
    </main>
  );
}
