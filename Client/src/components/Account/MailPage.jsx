import React, { useEffect,useState } from "react";
import { postQuestionMail, putNewsletter } from "../../axios.js";
import { getAll } from '../../axios';
import "./MailPage.css"

function MailPage() {

    const [body, setBody] = useState("");
    const [subject, setSubject] = useState("");
    const [email, setUserEmail] = useState("");
    const [errorResponse, setErrorResponse] = useState();

    async function fetchFromDatabase() {
        let items = await getAll(`https://localhost:7248/api/Users/GetByEmail`);
        setUserEmail(items.email);
    }

    useEffect(() => {
        fetchFromDatabase();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (body == null || subject == null) {
            alert("You need to fill both Subject and Body of mail");

        } else {
            let splittedEmail = email.split("@");

            if (splittedEmail[splittedEmail.length - 1] != "admin.com") {
                setErrorResponse(postQuestionMail({
                    subject: subject + " " + email,
                    body: body
                }));
            }
            else {
                setErrorResponse(putNewsletter({
                    subject: subject,
                    body: body
                }));
            }
            
            if (errorResponse == null) {
                alert("Email has been sent");
            } else {
                alert("There was an error while sending email:\n" + errorResponse);
            }

        }
    };

    const handleBody = (e) => {
        setBody(e.target.value)
    }
    const handleSubject = (e) => {
        setSubject(e.target.value)
    }

    return (
        <div className="parent-container">
            <div className="form-container category-form">
                <h1>Write mail</h1>
                <form onSubmit={handleSubmit}>
                    <label>
                        Subject:
                        <input type="text" onChange={handleSubject } required />
                    </label>
                    <label>
                        Body:
                    </label>
                    <textarea type="text" onChange={handleBody} required>
                    </textarea>

                    <br />
                    <button type="submit">Send</button>
                </form>
            </div>

        </div>
    );
}

export default MailPage;