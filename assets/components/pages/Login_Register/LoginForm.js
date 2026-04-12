/**
 *  
 * This is the Login Form
 * 
 */

import { useRouter } from "next/router";

import { loginToAccount } from "@/database/account/loginToAccount";

import switchToForgotPassword from "@/assets/functions/Login_Register/SwitchToForgotPassword";

import styles from "../../../styles/modules/Login_Register/Login_Register.module.css";

export const LoginForm = () => {

    const router = useRouter();

    // function submitLogin(e) {
    //     e.preventDefault();


    //     // Marking user as logged in
    //     DeclareStorageVariable("session", "Logged In", true);

    //     setTimeout(() => {
    //         router.push("/");
    //     }, 500)
    //     // alert("Logged In!");
    // }

    return (
        <form id="loginForm" className={`${styles.login_form}`}>

            <div className={`${styles.login_form_inner}`}>

                <h2>Login</h2>

                <div className={`${styles.form_group}`}>

                    <div className={`${styles.input_wrapper}`}>

                        <label>Email Address:</label>

                        <input type="email" id="loginEmail" className="lr-form-input"/>

                    </div>

                </div>

                <div className={`${styles.form_group}`}>

                    <div className={`${styles.input_wrapper}`}>

                        <label>Password:</label>

                        <input type="password" id="loginPassword" className="lr-form-input"/>

                    </div>

                </div>

                <button id="loginFormSubmit" className={`${styles.submit_btn}`} onClick={async (e) => {
                    e.preventDefault();

                    await loginToAccount(e);

                    if (!sessionStorage.getItem("Invalid Credentials Error") && !sessionStorage.getItem("Email Empty Error") && !sessionStorage.getItem("Password Empty Error")) {
                        setTimeout(() => {
                            router.push("/");
                        }, 300)
                    }
                }}>Login</button>


                <button id="forgotPassword" className={`${styles.forgot_password_btn}`} onClick={(e) => {
                    e.preventDefault();

                    switchToForgotPassword();
                }}>Forgot Password?</button>

            </div>

        </form>
    )
}