import React from 'react'

// Import Styling
import './EditDetails.scss'

const EditDetails = ({ project }: any) => {

    // TODO Update Name Handler
    // TODO Update Description Handler
    
    return (

        <div className="edit-details">
            {project ? <>

                <h2 className="title">Edit '{project.name}' Details</h2>

                <div className="edit-input-container">

                    <label htmlFor="name" className="label">Name:</label>

                    <div className="input-group">

                        <input type="text" placeholder="Name:" id="name" />

                        <button className="btn primary input-group-btn">Update</button>

                    </div>

                </div>

                <div className="edit-input-container">

                    <label htmlFor="description" className="label">Description:</label>

                    <div className="input-group">

                        <input type="text" placeholder="Description:" id="description" />

                        <button className="btn primary input-group-btn">Update</button>

                    </div>
                    
                </div>
            
            </> : ''}

        </div>

    )

}

export default EditDetails
