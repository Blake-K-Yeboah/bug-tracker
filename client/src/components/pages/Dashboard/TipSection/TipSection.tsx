import React from 'react'

// Import Styling
import './TipSection.scss';

// Import ICON
import { AiOutlineStar } from "react-icons/ai";

const TipSection = () => {

    // TODO: FINISH TIP ARRAY
    const tipArray: string[] = [
        "Useful profile actions can be found by pressing the menu icon in navbar",
        "You can browse every change ever made on the history page",
        "The side bar has useful navigation links to every page",
        "",
        "",
        "",
        "",
        ""
    ];
    
    return (
        <div className="tip-section">
            
            <h3 className="heading">Bug Tracker Tips</h3>

            <p className="tip">
                <AiOutlineStar className="star-icon"/>
                {tipArray[0]}
            </p>
            <p className="tip">
                <AiOutlineStar className="star-icon"/>
                {tipArray[1]}
            </p>
            <p className="tip">
                <AiOutlineStar className="star-icon"/>
                {tipArray[2]}
            </p>
        </div>
    )
}

export default TipSection;
