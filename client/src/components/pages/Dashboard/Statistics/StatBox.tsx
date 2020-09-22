import React from 'react'

const StatBox = (props: any) => {

    const { title, value } = props;

    return (
        <div className="stat-box">
            <div className="icon-section">
                {props.children /* Icon */}
            </div>
            <div className="text-section">
                <h3 className="title">{title as string}</h3>
                <h2 className="value">{value as string}</h2>
            </div>
        </div>
    )
}

export default StatBox
