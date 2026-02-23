/**
 *  
 * This is the Register Form
 * 
 */


import { addAccountToDB } from "@/database/setters/addAccountToDB";

import switchToLogin from "@/assets/functions/Login_Register/SwitchToLogin";

import styles from "../../../styles/modules/Login_Register/Login_Register.module.css";

export const RegisterForm = () => {

    return (
        <form id="registerForm" className={`${styles.register_form}`}>

            <div className={`${styles.register_form_inner}`}>

                <h2>Create An Account</h2>

                <div className={`${styles.form_group}`}>

                    <div className={`${styles.input_wrapper}`}>

                        <label>Username:</label>

                        <input type="text" id="registerUsername" className="lr-form-input"/>

                    </div>

                </div>

                <div className={`${styles.form_group}`}>

                    <div className={`${styles.input_wrapper}`}>

                        <label>Email Address:</label>

                        <input type="email" id="registerEmail" className="lr-form-input"/>

                    </div>

                </div>

                <div className={`${styles.form_group}`}>

                    <div className={`${styles.input_wrapper}`}>

                        <label>Password:</label>

                        <input type="password" id="registerPassword" className="lr-form-input"/>

                    </div>

                </div>

                <div className={`${styles.form_group}`}>

                    <div className={`${styles.input_wrapper}`}>

                        <label>Confirm Password:</label>

                        <input type="password" id="registerConfirmPassword" className="lr-form-input"/>
                    
                    </div>

                </div>

                <button id="registerFormSubmit" className={`${styles.submit_btn}`} onClick={(e) => {
                    addAccountToDB(e);

                    // Switch to login screen after a few seconds if there are no errors that were found
                    setTimeout(() => {
                        if (!sessionStorage.getItem("Email Already In Use Error") && !sessionStorage.getItem("Password Length Error") && !sessionStorage.getItem("Password Match Error") && !sessionStorage.getItem("Username Empty Error") && !sessionStorage.getItem("Email Empty Error") && !sessionStorage.getItem("Invalid Email Format Error")) {
                            switchToLogin();
                        }
                    }, 500)
                }}>Sign Up</button>

            </div>

        </form>
    )
}