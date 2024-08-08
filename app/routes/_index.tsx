import type { MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Card, Banner } from "../Components";
import { useEffect, useState } from "react";
import "../Styles/User.css";
import { Link, useLoaderData } from "@remix-run/react";
import mongoose from "mongoose";
import Me from "../assets/images/Felix-11.jpg";


export const meta: MetaFunction = () => {
  return [
    { title: "Felix A. Schultz" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader = async ({ request }) => {
  const projects = await mongoose.model("Project").find().sort({ createdAt: -1 }).limit(3);

  return { projects };
};

export default function Index() {
  const [User, setUser] = useState(null);
  const { projects } = useLoaderData();
  useEffect(() => {
    const User = JSON.parse(sessionStorage.getItem("token"));
    setUser(User);
  }, []);

  return (
    <main>
      <Banner />
      <section className="content">
        <article>
          <div className="projects grid">
            {projects.map((project) => (
              <Card key={project._id} link={`/project/${project.link}`}>
                <h3>{project.title}</h3>
              </Card>
            ))}
          </div>
          <Link to="/projects">View All Projects</Link>
        </article>
      </section>
      <article className="about grid">
        <section className="about-info">
          <h2>Moin! Mit navn er Felix. Jeg er en Fullstack Developer basseret i Aarhus og råder i Sønderjylland & Tyskland</h2>
          <p>
            I 2016 med 18 år blev jeg konstateret nyresyge, jeg fik at vide da jeg kom på sygehuset at jeg kun havde en nyrefunktion på 3%. Jeg måtte kæmpe om mit liv i 3,5 år med fejloperation, ydliger sygdom som virus. I juli 2019 blev jeg så endelig Transplanteret uden komplikationer. I 2020 startede jeg min uddannelse som Multimediendesigner og afsluttede den i 2022 med et 12-tal. I min fritid går jeg gerne ud med mit kamera og drone og optager nogle video klip, og billeder omkring mig og naturen. Jeg ser også gerne serier & film i fritiden, sammentidlig kan jeg godt finde på at udvikle lidt for sjovt på forskellige hoppy projekter eller andre små ting. I August 2023 har jeg startet min Professionsbachelor i Webudvikling på Erhvervsakademiet Aarhus, efter jeg i 2022 afsluttede min Multimediedesigner uddannelse.
          </p>
        </section>
        <img src={Me} alt="Felix A. Schultz" className="about-img" />
      </article>
    </main>
  );
}
