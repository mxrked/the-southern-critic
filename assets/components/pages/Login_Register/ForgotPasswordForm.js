/**
 *  
 * This is the Forgot Password Form
 * 
 */

import { useRouter } from "next/router";

import { forgotPassword } from "@/database/account/forgotPassword";
import switchToLogin from "@/assets/functions/Login_Register/SwitchToLogin";

import styles from "../../../styles/modules/Login_Register/Login_Register.module.css";

export const ForgotPasswordForm = () => {

    const router = useRouter();

    return (
        <form id="forgotPasswordForm" className={`${styles.forgot_password_form}`} onSubmit={async (e) => {
            e.preventDefault();

            const forgotPasswordWasSuccessful = await forgotPassword(e);

            if (forgotPasswordWasSuccessful) {
                switchToLogin();
            }

        }}>

            <div className={`${styles.forgot_password_form_inner}`}>

                <h2>Reset Password</h2>

                <div className={`${styles.form_group}`}>

                    <div className={`${styles.input_wrapper}`}>

                        <label>Email Address:</label>

                        <input type="email" id="forgotPasswordEmail" className="lr-form-input"/>

                    </div>

                </div>

                <button id="forgotPasswordFormSubmit" className={`${styles.submit_btn}`} type={"submit"}>SEND RESET LINK</button>


            </div>

        </form>
    )

}