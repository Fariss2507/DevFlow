import "./PerspectiveGrid.css";
import { useRef } from "react";

export default function PerspectiveGrid() {
    const wrapperRef = useRef(null);

    const handleMove = (e) => {
        const rect = wrapperRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        wrapperRef.current.style.setProperty("--mouse-x", `${x}px`);
        wrapperRef.current.style.setProperty("--mouse-y", `${y}px`);
    };

    const cells = [];
    for (let i = 0; i < 324; i++) {
        cells.push(<div key={i} className="grid-cell" />);
    }

    return (
        <div
            ref={wrapperRef}
            className="perspective-wrapper"
            onMouseMove={handleMove}
        >
            <div className="spotlight"></div>
            <div className="grid">{cells}</div>
            <div className="hero">
                <span>DEVFLOW</span>
                <h2>Organize<br />Everything.</h2>
                <p>Projects, Notes, Tasks, Bugs and Snippets in one workspace.</p>
            </div>
        </div>
    );
}
