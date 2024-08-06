import mongoose from "mongoose";
import { useLoaderData } from "@remix-run/react";

export const loader = async ({ request }) => {
    const projects = await mongoose.model("Project").find({
        published: true
    });

    return { projects };
};

export const meta = {
    title: "Admin Dashboard",
    description: "Admin Dashboard",
};

export default function AdminDashboard() {
    const { projects } = useLoaderData();
    return (
        <div>
            <h1>Admin Dashboard</h1>
            <ul>
                {projects.map((project) => (
                    <li key={project._id}>
                        <a href={`/admin/projects/${project._id}`}>{project.title}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
}