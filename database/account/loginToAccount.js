
import { signInWithEmailAndPassword } from "firebase/auth";
import { thesoutherncriticauth, thesoutherncriticdb } from "../connectToDB";
import {doc, getDoc} from "firebase/firestore";

import DeclareStorageVariable from "@/assets/functions/Global/storage/DeclareStorageVariable";
import RemoveStorageVariable from "@/assets/functions/Global/storage/RemoveStorageVariable";

export async function loginToAccount(e) {

    e.preventDefault();

    const loginForm = document.getElementById("loginForm");

    // Form objects
    const loginEmail = loginForm.querySelector("#loginEmail").value.trim();
    const loginPassword = loginForm.querySelector("#loginPassword").value.trim();

    const formComments = document.getElementById("formComments");

    try {

        if (!loginEmail) {
            // Displaying error message
            formComments.style.color = "red";
            formComments.innerHTML = "Error: Please enter the account's email address.";
            DeclareStorageVariable("session", "Email Empty Error", true);
            return;
        } else {
            RemoveStorageVariable("session", "Email Empty Error");
            formComments.innerHTML = `&nbsp;`;
        }

        if (!loginPassword) {
            // Displaying error message
            formComments.style.color = "red";
            formComments.innerHTML = "Error: Please enter the account's password.";
            DeclareStorageVariable("session", "Password Empty Error", true);
            return;
        } else {
            RemoveStorageVariable("session", "Password Empty Error");
            formComments.innerHTML = `&nbsp;`;
        }

        const accountCredential = await signInWithEmailAndPassword(
            thesoutherncriticauth,
            loginEmail,
            loginPassword
        );

        const account = accountCredential.user;

        console.log("Logged In:", account);
        console.log("account.uid:", account.uid);

        // Grabbing and storing the username and password for later
        const accountDocRef = doc(thesoutherncriticdb, "accounts", account.uid);
        const accountDocSnap = await getDoc(accountDocRef);

        if (accountDocSnap.exists()) {

            RemoveStorageVariable("session", "Invalid Credentials Error");
            
            const accountData = accountDocSnap.data();

            console.log("Account data from Firestore:", accountData);

            DeclareStorageVariable("session", "Logged In Username", accountData.accountUsername);
            DeclareStorageVariable("session", "Logged In Email", accountData.accountEmail);
            DeclareStorageVariable("session", "Logged In Pfp", accountData.accountPfp);
            // DeclareStorageVariable("session", "Logged In Watchlist", JSON.stringify(accountData.accountWatchlist));
            DeclareStorageVariable("session", "Logged In UID", account.uid);
            DeclareStorageVariable("session", "Logged In", true);
        } else {
            // Displaying error message
            formComments.style.color = "red";
            formComments.innerHTML = "Error: That account does not exist."
            DeclareStorageVariable("session", "Invalid Credentials Error", true);
            console.error("No account document found in Firestore for UID:", account.uid);
        }


        
    } catch(error) {
        console.error(error.code, error.message);

        if (error.code === "auth/user-not-found") {
            // Displaying error message
            formComments.style.color = "red";
            formComments.innerHTML = "Error: That account does not exist."
            DeclareStorageVariable("session", "Invalid Credentials Error", true);
        } else if (error.code === "auth/wrong-password") {
            // Displaying error message
            formComments.style.color = "red";
            formComments.innerHTML = "Error: Incorrect Password."
            DeclareStorageVariable("session", "Invalid Credentials Error", true);
        } else if (error.code === "auth/invalid-email") {
            // Displaying error message
            formComments.style.color = "red";
            formComments.innerHTML = "Error: That account does not exist."
            DeclareStorageVariable("session", "Invalid Credentials Error", true);
        } else if (error.code === "auth/invalid-credential") {
            // Displaying error message 
            formComments.style.color = "red";
            formComments.innerHTML = "Error: Incorrect password or email address."
            DeclareStorageVariable("session", "Invalid Credentials Error", true);
        }else {
            console.error(error.message);
        }
    }

}