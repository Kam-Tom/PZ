import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { putNewPassword } from "../../axios.js";
import { getByEmail } from '../../axios';
import ValidationError from "../Main/ValidNotification.jsx";
import "./ResetPassword.css"
function ResetPassword() {

    const [searchParams, setSearchParams] = useSearchParams();
    const [passwordError, setPasswordError] = useState("Invalid password. Its must be at least 8 characters max 15, at least one uppercase letter, one lowercase letter, one number and one special character");

    const email = String(searchParams.get("email"));
    const token = String(searchParams.get("token"));
    const navigate = useNavigate();
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [user, setUser] = useState("");

    async function fetchFromDatabase() {
        var user = await getByEmail(email);
        setUser(user);
    }

    async function sendNewPassword() {
        let errorResult = await putNewPassword({
            email: email,
            password: newPassword,
            confirmPassword: confirmPassword,
            token: token.replace(/\s/g, "+")
        })

        if (errorResult == null) {
            alert("Password has been changed");
            navigate("/")
        }
        else {
            alert(errorResult.response.data.toString());
            navigate("/")
        }
    }

    useEffect(() => {
        let tokenCopy = token.replace(/\s/g, "+");
        fetchFromDatabase();
        if (user != null) {
            if (tokenCopy.localeCompare(user.resetPasswordToken) == 0) {
                alert("Tokens do not match.");
                navigate("/");
            }
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newPassword == null || confirmPassword == null) {
            alert("You need to fill fields");

        } else {
            if (passwordError == null) {
                sendNewPassword();
            }
        }
    };

    const handlePasswordBlur = (e) => {
        if (!validatePassword(e.target.value)) {
            setPasswordError('Invalid password its must be at least 8 characters max 15, at least one uppercase letter, one lowercase letter, one number and one special character');
        } else {
            setNewPassword(e.target.value);
            setPasswordError(null);
        }
    };

    const handleConfirmPasswordBlur = (e) => {
        if (e.target.value != newPassword) {
            setPasswordError('Entered passwords are not the same.');
        } else {
            setConfirmPassword(e.target.value);
            setPasswordError(null);
        }
    }

    function validatePassword(password) {
        var re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,15}$/;
        return re.test(String(password));
    }

    return (
        <div className="parent-container">
            <div className="form-container  category-form">
                <h1>Reset Your Password</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Enter new password
                    <input type="password" onChange={handlePasswordBlur} required />
                </label>
                    <label>
                    Confirm new password
                    <input type="password" onChange={handleConfirmPasswordBlur} required />
                </label>
                    <br />
                    <button type="submit">Send</button>
            </form>

            </div>
            {passwordError &&
                <div className="error-container right">
                    <table>
                        {passwordError && <tr><td><ValidationError message={passwordError} /></td></tr>}
                    </table>
                </div>
            }
        </div>
    )

}


export default ResetPassword;