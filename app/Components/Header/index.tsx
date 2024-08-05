import "./Style.css";
export default function Header() {

    return (
        <header className="main-header">
            <section className="header-content">
                <nav className="navigation">
                    <a href="/">Home</a>
                    <a href="/about">About</a>
                    <a href="/contact">Contact</a>
                </nav>
                <div id="login" data-client_id="d2eefd7f1564fa4c9714000456183a6b0f51e8c9519e1089ec41ce905ffc0c453dfac91ae8645c41ebae9c59e7a6e5233b1339e41a15723a9ba6d934bbb3e92d" data-app-name="Felix Schultz" data-login_callback="login"></div>
            </section>
        </header>
    );
}