import mongoose from "mongoose";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

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

export default function Project() {
    const { title, description } = useLoaderData();
    return (
        <article>
            <h1>{title}</h1>
            <div className="content" dangerouslySetInnerHTML={{
                __html: description
            }}></div>
        </article>
    );
}