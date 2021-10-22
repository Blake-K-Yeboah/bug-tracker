import React from "react";

// Props Interface
interface PropsI {
    title: string;
    value: number | undefined;
    children: JSX.Element;
}

const StatBox = ({ title, value, children }: PropsI) => {
    return (
        <div className="stat-box">
            <div className="icon-section">{children /* Icon */}</div>
            <div className="text-section">
                <h3 className="title">{title as string}</h3>
                <h2 className="value">
                    {value || value === 0 ? (value as number) : "..."}
                </h2>
            </div>
        </div>
    );
};

export default StatBox;
