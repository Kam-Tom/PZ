import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { verifyEmail } from "../../axios.js";
import "./EmailVerification.css"
function EmailVerification() {

    const [searchParams, setSearchParams] = useSearchParams();

    const email = String(searchParams.get("email"));
    const token = String(searchParams.get("token"));

    const [labelInformation, setLabelInformation] = useState("Email Verification in progress.Please wait.");

    const navigate = useNavigate();
    async function sendVerificationRequest() {
        let errorResult = await verifyEmail({
            email: email,
            token: token.replace(/\s/g, "+")
        })

        if (errorResult == null) {
             setLabelInformation("Verification complete");
        }
        else {
            setLabelInformation(errorResult.response.data.toString());
        }
    }

    useEffect(() => {
        sendVerificationRequest();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate("/");
    };

    return (
        <div className="parent-container">
            <div className="form-container  category-form">
                <h1>Email Verification</h1>
            <form onSubmit={handleSubmit}>
                    <label>
                        {labelInformation}
                </label>
                    <br />
                    <button type="submit">Ok</button>
            </form>

            </div>
        </div>
    )

}



export default EmailVerification;