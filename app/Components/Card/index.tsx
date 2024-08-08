import "./Style.css";
import { Link } from "react-router-dom";

export default function Card({ children, link }) {
    return (
        <Link to={link} className="card">
            {children}
        </Link>
    );
}