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

    // Total amount of tickets to determine percentage of each
    const total = Object.values(values).reduce((total, value) => total + value);

    // Percentage Values to Output
    const percentageValues = Object.values(values).map(value => Math.round((value / total) * 1000) / 10); // Round to one decimal place for ease of reading

    return (
        <div className="legend">

            <h4 className="title">Legend</h4>

            <div className="pair">
                <div className="key red"></div>
                <span className="value">Not Started ({percentageValues[0]}%)</span>
            </div>

            <div className="pair">
                <div className="key orange"></div>
                <span className="value">In Progress ({percentageValues[1]}%)</span>
            </div>

            <div className="pair">
                <div className="key green"></div>
                <span className="value">Completed ({percentageValues[2]}%)</span>
            </div>

        </div>
    )
}

export default Legend
