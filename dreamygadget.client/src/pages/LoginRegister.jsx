import React, { useEffect } from "react";
import "../css/LoginRegister.css"

function LoginRegister() {
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
                </form>
            </div>
            <div className="form-container sign-in">
                <form>
                    <h1>Sign In</h1>
                    <input type="email" placeholder="Email" />
                    <input type="password" placeholder="Password" />
                    <a href="#">Forget Your Password?</a>
                    <button>Sign In</button>
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
