import React, { useState } from 'react'

const SignUpForm = () => {

    return (
        <div className="sign-up-form-container">

            <h1 className="title">Sign Up</h1>

            <p className="sub-text">Fill out the following form to sign up</p>

            <form className="sign-up-form">

                <div className="form-group">

                    <label htmlFor="name" className="input-label">Name</label>

                    <input type="text" className="input" placeholder="John Doe" id="name" />

                </div>

            </form>

        </div>
    )

}

export default SignUpForm
