import React, { useEffect, useRef, useState } from "react";
import "./LoginRegister.css"
import ReCAPTCHA from "react-google-recaptcha";
import { postNewUser, postLogin } from "../../axios.js"

function LoginRegister() {
    const ReCAPTCHA1 = useRef();
    const ReCAPTCHA2 = useRef();
    const ReCAPTCHA3 = useRef();

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

    async function checkCaptcha(captchaRef) {
        const captchaValue = captchaRef.current.getValue();
        if (!captchaValue) {
            console.log("nie weszlo");
            confirm("Please verify the reCAPTCHA!");
        } else {
            // make form submission
            console.log("weszlo");
            alert("Form submission successful!");
            if(captchaRef == ReCAPTCHA1) {
                console.log("Dane do logowania", loginFormData);
                await postLogin(loginFormData);
            }
            else if(captchaRef == ReCAPTCHA2) {
                console.log("Dane do rejestracji", signupFormData);
                postNewUser(signupFormData);
            }
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

    const handleLoginInputChange = (e) => {
        const { name, value } = e.target;
        setLoginFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSignupInputChange = (e) => {
        const { name, value } = e.target;
        setSignupFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    useEffect(() => {
        const container = document.getElementById("container");
        const registerBtn = document.getElementById("register");
        const loginBtn = document.getElementById("login");

    if (container && registerBtn && loginBtn) {
        registerBtn.addEventListener("click", () => {
            container.classList.add("active");
            setIsSignUp(true);
            setIsPasswordReset(false);
        });

        loginBtn.addEventListener("click", () => {
            container.classList.remove("active");
            setIsSignUp(false);
            setIsPasswordReset(false);
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

    return (
        <div className={`container ${isPasswordReset ? "password-reset" : ""}`} id="container">
            <div className={`back-button ${isSignUp ? "white-arrow" : "orange-arrow"}`} onClick={() => window.location.href = "/"}>
                <ion-icon name="arrow-back-outline"></ion-icon>
            </div>
            {isPasswordReset ? (
                <div className="form-container password-reset">
                    <form>
                        <h1>Reset Password</h1>
                        <input type="email" placeholder="Email" />
                        <br />
                        <ReCAPTCHA ref={ReCAPTCHA3} sitekey="6Lf7OCQpAAAAAJTm_KnO8VH5y-9p2wXztc1gSKkR" />
                        <a href="#" onClick={handleBackToLogin}>Back to Login</a>
                        <button onClick={() => checkCaptcha(ReCAPTCHA3)}>Send Code</button>
                    </form>
                </div>
            ) : isSignUp ? (
                <div className="form-container sign-up">
                    <form>
                        <h1>Create Account</h1>
                        <input type="text" name="name" placeholder="Name" onChange={handleSignupInputChange} value={signupFormData.name} />
                        <input type="text" name="surname" placeholder="Surname" onChange={handleSignupInputChange} value={signupFormData.surname} />
                        <input type="email" name="email" placeholder="Email" onChange={handleSignupInputChange} value={signupFormData.email} />
                        <input type="password" name="password" placeholder="Password" onChange={handleSignupInputChange} value={signupFormData.password} />
                        <br />
                        <ReCAPTCHA ref={ReCAPTCHA2} sitekey="6Lf7OCQpAAAAAJTm_KnO8VH5y-9p2wXztc1gSKkR" />
                        <button onClick={() => checkCaptcha(ReCAPTCHA2)}>Sign Up</button>
                    </form>
                </div>
            ) : (
                <div className="form-container sign-in">
                    <form>
                        <h1>Sign In</h1>
                        <input type="email" name="email" placeholder="Email" onChange={handleLoginInputChange} value={loginFormData.email} />
                        <input type="password" name="password" placeholder="Password" onChange={handleLoginInputChange} value={loginFormData.password} />
                        <br />
                        <ReCAPTCHA ref={ReCAPTCHA1} sitekey="6Lf7OCQpAAAAAJTm_KnO8VH5y-9p2wXztc1gSKkR" />
                        <a href="#" onClick={handlePasswordReset}>Forget Your Password?</a>
                        <button onClick={() => checkCaptcha(ReCAPTCHA1)}>Sign In</button>
                    </form>
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
    );
}

export default LoginRegister;
