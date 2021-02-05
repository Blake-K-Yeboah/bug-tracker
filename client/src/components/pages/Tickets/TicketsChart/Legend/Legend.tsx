import React from 'react'

// Import Styling
import './Legend.scss';

interface PropsI {
    values: {
        notStarted: number;
        inProgress: number;
        completed: number;
    }
}

const Legend = ({ values }: PropsI) => {

    const total = Object.values(values).reduce((total, value) => total + value);

    return (
        <div className="legend">

            <h4 className="title">Legend</h4>

            <div className="pair">
                <div className="key red"></div>
                <span className="value">Not Started ({Math.floor((values.notStarted / total) * 100)}%)</span>
            </div>

            <div className="pair">
                <div className="key orange"></div>
                <span className="value">In Progress ({Math.floor((values.inProgress / total) * 100)}%)</span>
            </div>

            <div className="pair">
                <div className="key green"></div>
                <span className="value">Completed ({Math.floor((values.completed / total) * 100)}%)</span>
            </div>

        </div>
    )
}

export default Legend
