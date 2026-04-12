import { sendPasswordResetEmail } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { thesoutherncriticauth, thesoutherncriticdb} from "../connectToDB";

import DeclareStorageVariable from "@/assets/functions/Global/storage/DeclareStorageVariable";
import RemoveStorageVariable from "@/assets/functions/Global/storage/RemoveStorageVariable";

export async function forgotPassword(e) {

    e.preventDefault();

    const forgotPasswordForm = document.getElementById("forgotPasswordForm");
    const forgotPasswordEmail = document.getElementById("forgotPasswordEmail");
    const formComments = document.getElementById("formComments");

    const forgotPasswordEmailValue = forgotPasswordEmail.value.trim();

    // Checking if email is empty
    if (!forgotPasswordEmailValue) {
        formComments.style.color = "red";
        formComments.innerHTML = "Error: Please enter an email address.";
        DeclareStorageVariable("session", "Forgot Password Email Empty Error", true);
        return;
    } else {
        RemoveStorageVariable("session", "Forgot Password Email Empty Error");
        formComments.innerHTML = `&nbsp;`;
    }

    // Checking if the email is valid
    const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!EMAIL_REGEX.test(forgotPasswordEmailValue)) {
        formComments.style.color = "red";
        formComments.innerHTML = "Error: Please enter a valid email address.";
        DeclareStorageVariable("session", "Forgot Password Invalid Email Format Error", true);
        return;
    } else {
        RemoveStorageVariable("session", "Forgot Password Invalid Email Format Error");
        formComments.innerHTML = `&nbsp;`;
    }

    try {

        // Checking to see if the email is associated to any accounts
        const emailQuery = query(
            collection(thesoutherncriticdb, "accounts"),
            where("accountEmail", "==", forgotPasswordEmailValue)
        );

        const emailQuerySnapshot = await getDocs(emailQuery);

        if (emailQuerySnapshot.empty) {
            formComments.style.color = "red";
            formComments.innerHTML = "Error: No account was found with that email address.";
            DeclareStorageVariable("session", "Forgot Password User Not Found Error", true);
            return false;
        } else {
            RemoveStorageVariable("session", "Forgot Password User Not Found Error");
        }

        /* // TODO:
        ! Setting a custom reset password page
        const resetPasswordActionCodeSettings = {
            url: "http://localhost:3000/reset_password",
            handleCodeInApp: false
        }
        */

        // await sendPasswordResetEmail(thesoutherncriticauth, forgotPasswordEmailValue, resetPasswordActionCodeSettings);
        await sendPasswordResetEmail(thesoutherncriticauth, forgotPasswordEmailValue);
        
        formComments.style.color = "green";
        formComments.innerHTML = "✅ Password reset email sent successfully. Please check your inbox, junk/spam folder(s).";

        forgotPasswordEmail.value = "";

        RemoveStorageVariable("session", "Forgot Password Send Error");
        console.log("✅ Password reset email sent to:", forgotPasswordEmailValue);

    } catch(error) {
        
        console.error("❌ Forgot password error:", error.code, error.message);

        formComments.style.color = "red";

        if (error.code === "auth/user-not-found") {
            formComments.innerHTML = "Error: No account was found with that email address.";
        } else if (error.code === "auth/invalid-email") {
            formComments.innerHTML = "Error: Please enter a valid email address.";
        } else if (error.code === "auth/too-many-requests") {
            formComments.innerHTML = "Error: Too many attempts. Please try again later.";
        } else {
            formComments.innerHTML = "Error: Could not send reset email. Please try again later.";
        }

        DeclareStorageVariable("session", "Forgot Password Send Error", true);
    }


}