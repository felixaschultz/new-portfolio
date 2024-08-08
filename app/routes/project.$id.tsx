import mongoose from "mongoose";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import "../Styles/project.css";

export const loader = async ({ params }) => {
    const project = await mongoose.model("Project").findOne({ link: params.id });

    if (!project) {
        return json({ message: "Project not found" }, { status: 404 });
    }

    return {
        title: project.title,
        description: project.description,
        image: project.image
    };
};

export const meta = ({ data }) => {
    return [
        {
            title: data.title + " | Felix A. Schultz",
        }
    ];
};

export default function Project() {
    const { title, description } = useLoaderData();
    return (
        <article className="content">
            <h1 className="project-title">{title}</h1>
            <div dangerouslySetInnerHTML={{
                __html: description
            }}></div>
        </article>
    );
}