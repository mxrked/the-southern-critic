import {doc, setDoc, serverTimestamp, getDocs, collection, query, where} from "firebase/firestore";
import {createUserWithEmailAndPassword} from "firebase/auth";
import { thesoutherncriticdb, thesoutherncriticauth} from "../connectToDB";

import DeclareStorageVariable from "@/assets/functions/Global/storage/DeclareStorageVariable";
import RemoveStorageVariable from "@/assets/functions/Global/storage/RemoveStorageVariable";

export async function addAccountToDB(e) {

    e.preventDefault();

    const addAccountForm = document.getElementById("registerForm");

    // Form objects
    const accountUsername = addAccountForm.querySelector("#registerUsername");
    const accountEmail = addAccountForm.querySelector("#registerEmail");
    const accountPassword = addAccountForm.querySelector("#registerPassword");
    const accountConfirmPassword = addAccountForm.querySelector("#registerConfirmPassword");
    const newAccountPfp = "https://raw.githubusercontent.com/mxrked/freelance_projects_CDN/main/CDN_thesoutherncritic/imgs/placeholders/new-account-pfp.webp";
    // const accountWatchlist = [{name: "test1"}, {name: "test2"}, {name: "test3"}];
    const accountWatchlist = [];

    const formComments = document.getElementById("formComments");

    const accountUsernameValue = accountUsername.value.trim();
    const accountEmailValue = accountEmail.value.trim();
    const accountPasswordValue = accountPassword.value.trim();
    const accountConfirmPasswordValue = accountConfirmPassword.value.trim();

    // Checking if username is empty
    if (!accountUsernameValue) {
        // Displaying error message
        formComments.style.color = "red";
        formComments.innerHTML = "Error: Please enter an username.";
        DeclareStorageVariable("session", "Username Empty Error", true);
        return;
    } else {
        RemoveStorageVariable("session", "Username Empty Error");
        formComments.innerHTML = `&nbsp;`;
    }

    // Checking if email is empty
    if (!accountEmailValue) {
        // Displaying error message
        formComments.style.color = "red";
        formComments.innerHTML = "Error: Please enter an email address.";
        DeclareStorageVariable("session", "Email Empty Error", true);
        return;
    } else {
        RemoveStorageVariable("session", "Email Empty Error");
        formComments.innerHTML = `&nbsp;`;
    }

    // Checking if the email is valid
    const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!EMAIL_REGEX.test(accountEmailValue)) {
        // Displaying error message
        formComments.style.color = "red";
        formComments.innerHTML = "Error: Please enter a valid email address.";
        DeclareStorageVariable("session", "Invalid Email Format Error", true);
        return;
    } else {
        RemoveStorageVariable("session", "Invalid Email Format Error");
        formComments.innerHTML = `&nbsp;`;
    }

    // Checking if the passwords are atleast 6 characters long
    if (accountPasswordValue.length < 6) {
        // Displaying error message
        formComments.style.color = "red";
        formComments.innerHTML = "Error: Passwords must be atleast 6 characters long.";
        DeclareStorageVariable("session", "Password Length Error", true);
        return;
    } else {
        RemoveStorageVariable("session", "Password Length Error");
        formComments.innerHTML = `&nbsp;`;
    }

    if (accountPasswordValue !== accountConfirmPasswordValue) {
        // Displaying error message
        formComments.style.color = "red";
        formComments.innerHTML = "Error: Passwords do not match.";
        DeclareStorageVariable("session", "Password Match Error", true);
        return;
    } else {
        RemoveStorageVariable("session", "Password Match Error");
    }

    if (accountPasswordValue === accountConfirmPasswordValue) {
        try {

            // Checking if the email already exists in the database
            const emailQuery = query(
                collection(thesoutherncriticdb, "accounts"),
                where("accountEmail", "==", accountEmailValue)
            );
            const emailQuerySnapshot = await getDocs(emailQuery);

            if (!emailQuerySnapshot.empty) {
                // Email is already in use
                // alert("This email is already associated with an account. Please use a different email.");
                // Displaying error message
                formComments.style.color = "red";
                formComments.innerHTML = "Error: That email is already in use. Please try a different one."
                DeclareStorageVariable("session", "Email Already In Use Error", true);
                return;
            } else {
                RemoveStorageVariable("session", "Email Already In Use Error");
            }

            const accountCredential = await createUserWithEmailAndPassword(
                thesoutherncriticauth,
                accountEmailValue,
                accountPasswordValue
            );

            const account = accountCredential.user;

            // If the account doesnt exist
            if (!account) {
                // Displaying error message
                formComments.style.color = "red";
                formComments.innerHTML = "Error: Account was not created properly. Please try again later."
                throw new Error("User not created properly");
            }

            // Adding the account to the database
            await setDoc(doc(thesoutherncriticdb, "accounts", account.uid), {
                accountUsername: accountUsernameValue,
                accountEmail: accountEmailValue,
                accountPfp: newAccountPfp,
                accountWatchlist: accountWatchlist,
                createdAt: serverTimestamp()
            });

            // Displaying a success message on the screen for the user
            formComments.innerHTML = "✅ Account created successfully!";
            formComments.style.color = "green";
            console.log("✅ Account created successfully: ", account.uid);

            
        } catch(error) {
            console.error("❌ Registration error:", error.code, error.message);
        }
    }



    console.log(addAccountForm)

}