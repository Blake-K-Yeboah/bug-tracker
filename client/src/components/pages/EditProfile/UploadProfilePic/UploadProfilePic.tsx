import React, { useState, useRef } from 'react';

// Import Axios
import Axios from 'axios';

// Import types
import { Iuser } from '../../../../types';

// Import Stylesheet
import './UploadProfilePic.scss';

// Props Interface
interface PropsI {
    user: Iuser | null
}

const UploadProfilePic = ({ user }: PropsI) => {

    const [fileName, setFileName] = useState<string>('');

    const [file, setFile] = useState<File | null>(null);

    const fileRef = useRef<HTMLInputElement>(null);

    const fileChange = (files: FileList | null) => {

        let file: File | null = files ? files[0] : null;

        setFile(file);

        setFileName(file ? file.name : '');

    }

    const uploadProfilePic: () => void = () => {

        // Define formData
        const formData = new FormData();

        // Append File on to formData
        formData.append('file', file as File);

        Axios.put(`/api/users/${user ? user._id : ''}/profilepic`, formData).then(res => {

            alert('Successful. You may need to log out and in for changes to take effect');

        }).catch(err => {

            alert('An Error Occured. Try Again Later');

        });
    }

    return (
        <div className="upload-profile-pic">
            {user ? <>
            
                <h2 className="title">Upload Profile Picture</h2>

                <label htmlFor="file-name" className="file-name-label">File:</label>
                
                <br />

                <input type="text" className="file-name-input" placeholder="No Image Chosen" value={fileName} disabled/>

                <input type="file" ref={fileRef} style={{ display: 'none' }} accept="image/*" onChange={e => fileChange(e.target.files)} />

                <br />

                <button className="btn primary" onClick={() => { if (fileRef) fileRef.current!.click() }}>Choose Image</button>

                <br />

                <button className={`btn ${fileName ? 'primary' : 'disabled'}`} disabled={fileName === ''} onClick={uploadProfilePic} >Upload Profile Pic</button>

            </> : <>
            
                <div className="loader title"></div>
                <div className="loader label"></div>
                <div className="loader input"></div>
                <div className="loader button"></div>
                <div className="loader button"></div>
            
            </>}
            
        </div>
    )

}

export default UploadProfilePic
