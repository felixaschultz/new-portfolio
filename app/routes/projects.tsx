import mongoose from "mongoose";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Card } from "~/Components";

import "../Styles/project.css";

export const loader = async ({ params }) => {
    const project = await mongoose.model("Project").find().sort({ createdAt: -1 });

    if (!project) {
        return json({ message: "Project not found" }, { status: 404 });
    }

    return { project };
};

export const meta = ({ data }) => {
    return [
        {
            title: "Projects | Felix A. Schultz",
        }
    ];
};

export default function Project() {
    const { project } = useLoaderData();
    return (
        <article className="content">
            <h1 className="project-title">Projects</h1>
            <div className="projects grid">
                {project.map((project) => (
                    <Card key={project._id} link={`/project/${project.link}`}>
                        <h3>{project.title}</h3>
                    </Card>
                ))}
            </div>
        </article>
    );
}