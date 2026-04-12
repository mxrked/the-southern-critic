/**
 * 
 *  This is the switchToForgotPassword function
 * 
 */

import ClearInputFields from "../Global/forms/ClearInputFields";

export default function switchToForgotPassword() {

        const LOGIN_FORM_HOLDER = document.getElementById("loginFormHolder");
        const REGISTER_FORM_HOLDER = document.getElementById("registerFormHolder");
        const FORGOT_PASSWORD_FORM_HOLDER = document.getElementById("forgotPasswordFormHolder");
        const SWITCH_TO_REGISTER_BTN = document.getElementById("switchToRegister");
        const SWITCH_TO_LOGIN_BTN = document.getElementById("switchToLogin");

        LOGIN_FORM_HOLDER.style.display = 'none';
        FORGOT_PASSWORD_FORM_HOLDER.style.display = 'block';
        REGISTER_FORM_HOLDER.style.display = 'none';
        SWITCH_TO_REGISTER_BTN.style.display = 'none'
        SWITCH_TO_LOGIN_BTN.style.display = 'block';

        ClearInputFields(".lr-form-input");
}