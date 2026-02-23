/**
 * 
 *  This is the Login Register Main component
 * 
 */

import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";

import switchToLogin from "@/assets/functions/Login_Register/SwitchToLogin";
import switchToRegister from "@/assets/functions/Login_Register/SwitchToRegister";

import styles from "../../../styles/modules/Login_Register/Login_Register.module.css";

export const LoginRegisterMain = () => {


    return (
        <section id="loginRegisterMain" className={`${styles.login_register_main}`}>

            <div className={`${styles.login_register_main_inner}`}>

                <div className={`${styles.login_register_main_inner_top}`}>

                    <h1>Ready To Start Watching?</h1>

                    <p>Start tracking your favorite movies and TV shows by creating an account today.</p>

                </div>



                <div className={`${styles.form_comments_holder}`}>

                    <span id="formComments" className={styles.form_comments}>&nbsp;</span>

                </div>

                <div className={`${styles.login_register_main_inner_forms}`}>

                    <div className={`${styles.login_register_main_inner_forms_inner}`}>

                        <div className={`${styles.login_form_holder}`} id="loginFormHolder">

                            <LoginForm/>

                        </div>

                        <div className={`${styles.register_form_holder}`} id="registerFormHolder">

                            <RegisterForm/>

                        </div>

                        <div className={`${styles.button_border}`}/>

                    </div>

                    <button id="switchToRegister" className={`${styles.switch_btn}`} onClick={() => {
                            switchToRegister();
                        }}>Create An Account?</button>

                    <button id="switchToLogin" className={`${styles.switch_btn} ${styles.login_switch_btn}`} onClick={() => {
                            switchToLogin();
                        }}>Already Have An Account?</button>

                </div>

            </div>

        </section>
    )
}