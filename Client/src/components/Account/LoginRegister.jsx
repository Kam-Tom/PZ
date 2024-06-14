import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginRegister.css"
import ReCAPTCHA from "react-google-recaptcha";
import { postNewUser, postLogin, postResetPassword } from "../../axios.js"
import ValidationError from "../Main/ValidNotification.jsx";

function LoginRegister({ onLogin }) {
    const ReCAPTCHA1 = useRef();
    const ReCAPTCHA2 = useRef();
    const ReCAPTCHA3 = useRef();
    const navigate = useNavigate();

    const [resetFormData, setResetFormData] = useState({
        email:"",
    });

    const [loginFormData, setLoginFormData] = useState({
        email: "",
        password: "",
    });

    const [signupFormData, setSignupFormData] = useState({
        name: "",
        surname: "",
        email: "",
        password: "",
    });

    const [isSignUp, setIsSignUp] = useState(false);
    const [isPasswordReset, setIsPasswordReset] = useState(false);
    const [nameError, setNameError] = useState(null);
    const [surNameError, setSurNameErorr] = useState(null);
    const [emailError, setEmailError] = useState("Invalid email");
    const [passwordError, serPasswordError] = useState("Invalid password. Its must be at least 8 characters max 15, at least one uppercase letter, one lowercase letter, one number and one special character");

    async function checkCaptcha(captchaRef) {
        const captchaValue = captchaRef.current.getValue();
        if (!captchaValue || isValidate()) {
            console.log("nie weszlo");
            confirm("Wrong captcha or invalid data!");
            event.preventDefault();
        } else {
            // make form submission
            console.log("weszlo");
            if (captchaRef == ReCAPTCHA1) {
                if (!loginFormData.email || !loginFormData.password) {
                    confirm("Fill all fields");
                    event.preventDefault();
                }
                else {
                    console.log("Dane do logowania", loginFormData);
                    await postLogin(loginFormData);
                    const loginToken = localStorage.getItem("loginToken");
                    if (loginToken != 'wrong') {
                        alert("Form submission successful!");
                        onLogin();
                        navigate("/");
                    }
                    else {
                        confirm("Wrong email or password!");
                        event.preventDefault();
                    }
                }
            }
            else if (captchaRef == ReCAPTCHA2) {
                if (!signupFormData.name || !signupFormData.surname || !signupFormData.email || !signupFormData.password) {
                    confirm("Fill all fields");
                    event.preventDefault();
                }
                else {
                    console.log("Dane do rejestracji", signupFormData);
                    alert("Form submission successful!");
                    await postNewUser(signupFormData);
                }
            }
        }
    }

    async function resetPassword(captchaRef) {
        event.preventDefault();
        const captchaValue = captchaRef.current.getValue();
        if (captchaValue && resetFormData.email != undefined) {
            //console.log("TO JE EMAAAAAAAILLL" + resetFormData.email.toString());
            await postResetPassword(resetFormData.email);

            
        }
        else {
            confirm("Wrong captcha or invalid data!");
        }

    }
    //obsluga przyciskow
    //przy sign in
    // checkCaptcha(ReCAPTCHA1);

    //przy sign up
    // checkCaptcha(ReCAPTCHA2);

    function handlePasswordReset() {
        setIsPasswordReset(true);
        setIsSignUp(false);
    }

    function handleBackToLogin() {
        setIsPasswordReset(false);
        setIsSignUp(false);
    }

    useEffect(() => {
        const container = document.getElementById("container");
        const registerBtn = document.getElementById("register");
        const loginBtn = document.getElementById("login");

    if (container && registerBtn && loginBtn) {
        registerBtn.addEventListener("click", () => {
            container.classList.add("active");
            setIsSignUp(true);
            setIsPasswordReset(false);
            setEmailError("Invalid email");
            serPasswordError("Invalid password. Its must be at least 8 characters max 15, at least one uppercase letter, one lowercase letter, one number and one special character");
            setNameError("Invalid name. Its must be at least 3 characters");
            setSurNameErorr("Invalid surname. Its must be at least 3 characters");
        });

        loginBtn.addEventListener("click", () => {
            container.classList.remove("active");
            setIsSignUp(false);
            setIsPasswordReset(false);
            setEmailError("Invalid email");
            serPasswordError("Invalid password. Its must be at least 8 characters max 15, at least one uppercase letter, one lowercase letter, one number and one special character");
            setNameError(null);
            setSurNameErorr(null);
        });
    }

    return () => {
        if (registerBtn) {
            registerBtn.removeEventListener("click", () => {
                container.classList.add("active");
            });
        }

        if (loginBtn) {
            loginBtn.removeEventListener("click", () => {
                container.classList.remove("active");
            });
        }
    };
  }, []);

    function validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})$/;
        return re.test(String(email).toLowerCase());
    }

    function validateNameAndSurName(name) {
        return name.length >= 3;
    }

    function validatePassword(password) {
        var re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,15}$/;
        return re.test(String(password));
    }

    function isValidate() {
        return (nameError || surNameError || emailError || passwordError);
    }

    const handleNameBlur = (e) => {
        const { name, value } = e.target;
        if (!validateNameAndSurName(e.target.value)) {
            setNameError('Invalid name its must be at least 3 characters');
        } else {
            setSignupFormData((prevData) => ({ ...prevData, [name]: value }));
            setNameError(null);
        }
    };

    const handleSurNameBlur = (e) => {
        if (!validateNameAndSurName(e.target.value)) {
            setSurNameErorr('Invalid surname its must be at least 3 characters');
        } else {
            const { name, value } = e.target;
            setSignupFormData((prevData) => ({ ...prevData, [name]: value }));
            setSurNameErorr(null);
        }
    };

    const handleEmailBlur = (e) => {
        if (!validateEmail(e.target.value)) {
            setEmailError('Invalid email');
        } else {
            const { name, value } = e.target;
            setSignupFormData((prevData) => ({ ...prevData, [name]: value }));
            setEmailError(null);
        }
    };

    const handlePasswordBlur = (e) => {
        if (!validatePassword(e.target.value)) {
            serPasswordError('Invalid password its must be at least 8 characters max 15, at least one uppercase letter, one lowercase letter, one number and one special character');
        } else {
            const { name, value } = e.target;
            setSignupFormData((prevData) => ({ ...prevData, [name]: value }));
            serPasswordError(null);
        }
    };

    const handleEmailBlurLogin = (e) => {
        if (!validateEmail(e.target.value)) {
            setEmailError('Invalid email');
        } else {
            const { name, value } = e.target;
            setLoginFormData((prevData) => ({ ...prevData, [name]: value }));
            setEmailError(null);
        }
    };

    const handleEmailBlurReset = (e) => {
        if (!validateEmail(e.target.value)) {
            setEmailError('Invalid email');
        } else {
            const { name, value } = e.target;
            setResetFormData((prevData) => ({ ...prevData, [name]: value }));
            setEmailError(null);
        }
    };

    const handlePasswordBlurLogin = (e) => {
        if (!validatePassword(e.target.value)) {
            serPasswordError('Invalid password its must be at least 8 characters max 15, at least one uppercase letter, one lowercase letter, one number and one special character');
        } else {
            const { name, value } = e.target;
            setLoginFormData((prevData) => ({ ...prevData, [name]: value }));
            serPasswordError(null);
        }
    };




    return (
        <div className="parent-container">
        <div className={`container ${isPasswordReset ? "password-reset" : ""}`} id="container">
            <div className={`back-button ${isSignUp ? "white-arrow" : "orange-arrow"}`} onClick={() => window.location.href = "/"}>
                <ion-icon name="arrow-back-outline"></ion-icon>
            </div>
            {isPasswordReset ? (
                <div className="form-container password-reset">
                    <form>
                            <h1>Reset Password</h1>
                            <input type="email" name="email" placeholder="Email" onChange={handleEmailBlurReset} />
                        <br />
                        <ReCAPTCHA ref={ReCAPTCHA3} sitekey="6Lf7OCQpAAAAAJTm_KnO8VH5y-9p2wXztc1gSKkR" />
                            {/*<a href="#" onClick={handleBackToLogin}>Back to Login</a>*/}
                            <button onClick={() => resetPassword(ReCAPTCHA3)}>Send Code</button>
                    </form>
                </div>
            ) : isSignUp ? (
                <div className="form-container sign-up">
                    <form>
                        <h1>Create Account</h1>
                        <input type="text" name="name" placeholder="Name" onChange={handleNameBlur} />
                        <input type="text" name="surname" placeholder="Surname" onChange={handleSurNameBlur} />
                        <input type="email" name="email" placeholder="Email" onChange={handleEmailBlur} />
                        <input type="password" name="password" placeholder="Password" onChange={handlePasswordBlur} />
                        <br />
                        <ReCAPTCHA ref={ReCAPTCHA2} sitekey="6Lf7OCQpAAAAAJTm_KnO8VH5y-9p2wXztc1gSKkR" />
                        <button onClick={() => checkCaptcha(ReCAPTCHA2)}>Sign Up</button>
                    </form>
                </div>
            ) : (
                <div className="form-container sign-in">
                    <div className="login-container">
                        <h1>Sign In</h1>
                        <input type="email" name="email" placeholder="Email" onChange={handleEmailBlurLogin}/>
                        <input type="password" name="password" placeholder="Password" onChange={handlePasswordBlurLogin} />
                        <br />
                        <ReCAPTCHA ref={ReCAPTCHA1} sitekey="6Lf7OCQpAAAAAJTm_KnO8VH5y-9p2wXztc1gSKkR" />
                        <a href="#" onClick={handlePasswordReset}>Forget Your Password?</a>
                        <button onClick={() => checkCaptcha(ReCAPTCHA1)}>Sign In</button>
                    </div>
                </div>
            )}
                <div className="toggle-container">
                    <div className="toggle">
                        <div className="toggle-panel toggle-left">
                            <h1>Welcome Back!</h1>
                            <p>Enter your personal details to use all site features</p>
                            <button className="hidden" id="login">Sign In</button>
                        </div>
                        <div className="toggle-panel toggle-right">
                            <h1>Hello, Friend!</h1>
                            <p>Register with your personal details to use all site features</p>
                            <button className="hidden" id="register">Sign Up</button>
                        </div>
                    </div>
                </div>
        </div>
        {((isSignUp && (nameError || surNameError || emailError || passwordError)) ||
        (!isSignUp && (emailError || passwordError))) && (
            isSignUp ? (
                <div className="error-container right">
                    <table>
                        {nameError && <tr><td><ValidationError message={nameError} /></td></tr>}
                        {surNameError && <tr><td><ValidationError message={surNameError} /></td></tr>}
                        {emailError && <tr><td><ValidationError message={emailError} /></td></tr>}
                        {passwordError && <tr><td><ValidationError message={passwordError} /></td></tr>}
                    </table>
                </div>
            ) : (
                <div className="error-container left">
                    <table>
                        {emailError && <tr><td><ValidationError message={emailError} /></td></tr>}
                        {passwordError && <tr><td><ValidationError message={passwordError} /></td></tr>}
                    </table>
                </div>
            )
        )}  
        </div>
    );
}

export default LoginRegister;
