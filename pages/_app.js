// React/Next Imports
import { use, useEffect, useState } from "react";
import { useRouter } from "next/router";

// Library Imports
import "bootstrap/dist/css/bootstrap.min.css";

import { AnimatePresence } from "framer-motion";

import "lazysizes";
import "lazysizes/plugins/parent-fit/ls.parent-fit";

import NProgress from "nprogress";

// Data/Functions/Images Imports
import CheckScreenOrientation from "@/assets/functions/Global/checkers/CheckScreenOrientation";
import CheckUserDevice from "@/assets/functions/Global/checkers/CheckUserDevice";
import RemoveStorageVariable from "@/assets/functions/Global/storage/RemoveStorageVariable";

// Component Imports

// Style Imports
import "../assets/styles/tools/global_classnames/global_classnames.css";
import "../assets/styles/tools/overrides/overrides.css";
import "../assets/styles/tools/resets/resets.css";
import "../assets/styles/tools/library_styles/nprogress/nprogress.css";

//TODO: This is used to indicate if the client has not paid for the project and/or the monthly invoice(s)
let IS_PAYMENT_REQUIRED = false;

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  // //! SENDS USER TO PAYMENT LOCKED SCREEN
  // useEffect(() => {
  //   const handleRedirect = async () => {
  //     if (IS_PAYMENT_REQUIRED && !redirected) {
  //       // Set redirected to true to prevent further redirects
  //       setRedirected(true);

  //       // Redirect to the payment_required page without adding a new entry to the history stack
  //       await router.push("/payment_required", undefined, {
  //         shallow: true,
  //         replace: true,
  //       });
  //     }
  //   };

  //   handleRedirect();
  // }, [IS_PAYMENT_REQUIRED, redirected, router]);

  //? GLOBALS
  //! NProgress Init
  useEffect(() => {
    // NProgress.done(); // Prevents NProgress from being stuck after page route completed
    if (!IS_PAYMENT_REQUIRED) {
      router.events.on("routeChangeStart", () => {
        NProgress.start();
      });
      router.events.on("routeChangeComplete", () => {
        NProgress.done();
      });
    }
  }, [router, router.events]);


  //? CHECKERS
  //! Check Page Orientation
  useEffect(() => {
    window.addEventListener("orientationchange", () => {
      CheckScreenOrientation();
    });
  }, []);

  //! Clearing Open Mobile Nav Menu SS Value
  useEffect(() => {
    RemoveStorageVariable("session", "Mobile Nav Menu Opened");
  }, [])

  //! Check User Device
  useEffect(() => {
    let mobile,
      desktop = false;

    // Page Load
    window.addEventListener("load", () => {
      setTimeout(() => {
        CheckUserDevice(mobile, desktop);
      }, 500);
    });

    if (document.readyState === "complete") {
      setTimeout(() => {
        CheckUserDevice(mobile, desktop);
      }, 500);
    }

    // Resize
    window.addEventListener("resize", () => {
      CheckUserDevice(mobile, desktop);
    });
  }, []);




  return <Component {...pageProps} />;
}

export default MyApp;
