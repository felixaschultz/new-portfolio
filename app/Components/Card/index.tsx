import "./Style.css";

export default function Card({ children }: { children: React.ReactNode }) {
    return (
        <article className="card">
            {children}
        </article>
    );
}