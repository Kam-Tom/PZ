import React, { useEffect, useRef } from "react";
import "../css/LoginRegister.css"
import ReCAPTCHA from "react-google-recaptcha";


function LoginRegister() {
    const ReCAPTCHA1 = useRef();
    const ReCAPTCHA2 = useRef();

    function checkCaptcha(captchaRef) {
        const captchaValue = captchaRef.current.getValue();
        if (!captchaValue) {
            console.log("nie weszlo");
            confirm("Please verify the reCAPTCHA!");
        } else {
            // make form submission
            console.log("weszlo");
            alert("Form submission successful!");
        }
    }
    //obsluga przyciskow
    //przy sign in
    // checkCaptcha(ReCAPTCHA1);

    //przy sign up
    // checkCaptcha(ReCAPTCHA2);


    useEffect(() => {
        const container = document.getElementById('container');
        const registerBtn = document.getElementById('register');
        const loginBtn = document.getElementById('login');


        if (container && registerBtn && loginBtn) {
            registerBtn.addEventListener('click', () => {
            container.classList.add("active");
          });
    
            loginBtn.addEventListener('click', () => {
                
            container.classList.remove("active");
          });
        }
        return () => {
          if (registerBtn) {
              registerBtn.removeEventListener('click', () => {
              container.classList.add("active");
            });
          }
    
          if (loginBtn) {
              loginBtn.removeEventListener('click', () => {
              container.classList.remove("active");
            });
          }
        };
      }, []);

    return (
        <div className="container" id="container">
            <div className="form-container sign-up">
                <form>
                    <h1>Create Account</h1>
                    <input type="text" placeholder="Name" />
                    <input type="text" placeholder="Surname" />
                    <input type="email" placeholder="Email" />
                    <input type="password" placeholder="Password" />
                    <button>Sign Up</button>
                    <ReCAPTCHA ref={ReCAPTCHA2} sitekey="6Lf7OCQpAAAAAJTm_KnO8VH5y-9p2wXztc1gSKkR" />
                </form>
            </div>
            <div className="form-container sign-in">
                <form>
                    <h1>Sign In</h1>
                    <input type="email" placeholder="Email" />
                    <input type="password" placeholder="Password" />
                    <a href="#">Forget Your Password?</a>
                    <button>Sign In</button>
                    <ReCAPTCHA ref={ReCAPTCHA1} sitekey="6Lf7OCQpAAAAAJTm_KnO8VH5y-9p2wXztc1gSKkR"/>
                </form>
            </div>
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

export default LoginRegister
