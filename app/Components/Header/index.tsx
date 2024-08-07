import "./Style.css";
import { useEffect, useState } from "react";
import { Link } from "@remix-run/react";
export default function Header() {
    const [user, setUser] = useState(null);
    useEffect(() => {
        const loggedInUser = sessionStorage.getItem("token");
        if (loggedInUser) {
            setUser(loggedInUser)
        }
    }, []);
    return (
        <header className="main-header">
            <section className="header-content">
                <Link to="/"><h1 className="logo">Felix A. Schultz</h1></Link>
                <nav className="navigation">
                    <a href="/">Home</a>
                    <a href="/projects">Projects</a>
                </nav>
                {user ? <a href="/admin/dashboard">Admin Panel</a> : <div id="login" data-client_id="d2eefd7f1564fa4c9714000456183a6b0f51e8c9519e1089ec41ce905ffc0c453dfac91ae8645c41ebae9c59e7a6e5233b1339e41a15723a9ba6d934bbb3e92d" data-app-name="Felix Schultz" data-login_callback="login"></div>}
            </section>
        </header>
    );
}