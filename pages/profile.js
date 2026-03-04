// React/Next Imports
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import fs from "fs";
import path from "path";

// Library Imports
import {doc, getDoc} from "firebase/firestore";
import { thesoutherncriticauth, thesoutherncriticdb } from "@/database/connectToDB";
import { getAuth } from "firebase/auth";

// Data/Functions/Images Imports
import CloseMobileNavMenu from "@/assets/functions/Nav/CloseMobileNavMenu";

// import { getItemsFromDB } from "@/database/getters/getItemsFromDB";

// Component Imports
import { PageHead } from "@/assets/components/global/All/PageHead";

// import { AddItemToDB } from "@/assets/components/admin/AddItemToDB";

import { DesktopNav } from "@/assets/components/global/Nav/Desktop/DesktopNav";
import { MobileNav } from "@/assets/components/global/Nav/Mobile/MobileNav";
import { MobileNavMenu } from "@/assets/components/global/Nav/Mobile/MobileNavMenu";

// Style Imports
import globalStyles from "../assets/styles/modules/Global/Global.module.css";
import "../assets/styles/modules/Login_Register/Login_Register.module.css";

//! Getting the current user's watchlist
async function fetchWatchlist(uid) {
  const accountDocRef = doc(thesoutherncriticdb, "accounts", uid);
  const accountDocSnap = await getDoc(accountDocRef);

  if (accountDocSnap.exists()) {
    const accountData = accountDocSnap.data();
    return accountData.accountWatchlist || [];
  }
  return [];
}

export async function getServerSideProps({req}) {

  // Page Head
  const pageHeadDataFilePath = path.join(
    process.cwd(),
    "public/data/",
    "pageHeadData.json"
  );
  const pageHeadDataFileContents = fs.readFileSync(
    pageHeadDataFilePath,
    "utf-8"
  );
    const pageIconData = JSON.parse(pageHeadDataFileContents);

//   const mediaItems = await getItemsFromDB();

//   // Sorting the items based on objectStorageKey
//   mediaItems.sort((a,b) => {
//       if (a.objectStorageKey < b.objectStorageKey) return -1;
//       if (a.objectStorageKey > b.objectStorageKey) return 1;
//       return 0;
//     })

    return {
      props: {
        pageIconData,
        // mediaItems,
      }
    }
}


export default function Profile({pageIconData, mediaItems}) {

    const router = useRouter();

    const [isDevelopmentMode, setIsDevelopmentMode] = useState(false);
    const [isLoggedInValue, setIsLoggedInValue] = useState(false);
    const [accountWatchlist, setAccountWatchlist] = useState([]);
    // const [reviewItems, setReviewItems] = useState(
    //     mediaItems.sort((a,b) => {
    //     if (a.objectStorageKey < b.objectStorageKey) return -1;
    //     if (a.objectStorageKey > b.objectStorageKey) return 1;
    //     return 0;
    //     })
    // );
    
    // Checking if the user is logged in
    useEffect(() => {

        const LOGGED_IN_VALUE = sessionStorage.getItem("Logged In");
        setIsLoggedInValue(!!LOGGED_IN_VALUE);

        // if (!LOGGED_IN_VALUE) {
        //     router.push("/");
        // }

        if (!sessionStorage.getItem("Logged In")) {
            router.push("/login_register")
        }

    }, []);

    // Checking if the user is in development mode
    useEffect(() => {

        if (typeof window !== "undefined") {
        if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
            setIsDevelopmentMode(true);
            console.log("IN DEVELOPMENT MODE")
        } else {
            setIsDevelopmentMode(false);
            console.log("IN PRODUCTION MODE");
        }
        }

    }, []);

    // Fetching the logged in user's watchlist
    useEffect(() => {
        if (isLoggedInValue) {
                const accountUid = sessionStorage.getItem("Logged In UID");
                fetchWatchlist(accountUid).then((watchlist) => {
                setAccountWatchlist(watchlist);
            })
        }
    }, [isLoggedInValue]);

    return (
        <div id="PAGE_ID">

            <PageHead pageHeadData={pageIconData}/>

            <div id="darkenOverlay" className={globalStyles.darken_overlay} onClick={CloseMobileNavMenu}/>

            <main id="PAGE_MAIN">

                <DesktopNav isLoggedInValue={isLoggedInValue}/>
                <MobileNav/>
                <MobileNavMenu isLoggedInValue={isLoggedInValue}/>

                {accountWatchlist.map(item => (
                    <img src={item.name}/>
                ))}

            </main>

        </div>
    )
}