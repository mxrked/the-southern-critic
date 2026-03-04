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

import { getItemsFromDB } from "@/database/getters/getItemsFromDB";
import { removeItemFromDB } from "@/database/removers/removeItemFromDB";
import { updateReviewName } from "@/database/updaters/updateReviewName";
import { updateReviewPoster } from "@/database/updaters/updateReviewPoster";
import { updateReviewText } from "@/database/updaters/updateReviewText";
import { updateReviewRating } from "@/database/updaters/updateReviewRating";
import { updateReviewType } from "@/database/updaters/updateReviewType";
import { updateReviewRoute } from "@/database/updaters/updateReviewRoute";
import { updateReviewStorageKey } from "@/database/updaters/updateReviewStorageKey";

// Component Imports
import { PageHead } from "@/assets/components/global/All/PageHead";


import { DesktopNav } from "@/assets/components/global/Nav/Desktop/DesktopNav";
import { MobileNav } from "@/assets/components/global/Nav/Mobile/MobileNav";
import { MobileNavMenu } from "@/assets/components/global/Nav/Mobile/MobileNavMenu";

import { IndexTop } from "@/assets/components/pages/Index/IndexTop";
import { IndexReviews } from "@/assets/components/pages/Index/IndexReviews";

// Style Imports
import globalStyles from "../assets/styles/modules/Global/Global.module.css";
import "../assets/styles/modules/Index/Index.module.css";
import { AdminZone } from "@/assets/components/admin/AdminZone";

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

  const mediaItems = await getItemsFromDB();

  // Sorting the items based on objectStorageKey
  mediaItems.sort((a,b) => {
      if (a.objectStorageKey < b.objectStorageKey) return -1;
      if (a.objectStorageKey > b.objectStorageKey) return 1;
      return 0;
    })

    return {
      props: {
        pageIconData,
        mediaItems,
      }
    }
}


export default function Home({pageIconData, mediaItems}) {

  const router = useRouter();

  const [isDevelopmentMode, setIsDevelopmentMode] = useState(false);
  const [isLoggedInValue, setIsLoggedInValue] = useState(false);
  const [reviewItems, setReviewItems] = useState(
    mediaItems.sort((a,b) => {
      if (a.objectStorageKey < b.objectStorageKey) return -1;
      if (a.objectStorageKey > b.objectStorageKey) return 1;
      return 0;
    })
  );
  const [accountWatchlist, setAccountWatchlist] = useState([]);

  // Fetching the current user's watchlist from Firestore once logged in
    // useEffect(() => {

    //     if (isLoggedInValue) {
    //         fetchWatchlist(isLoggedInValue, setAccountWatchlist);
    //     }
        
    //     alert(accountWatchlist)

    // }, [isLoggedInValue])


    // useEffect(() => {
    //     setTimeout(() => {
    //         console.log(accountWatchlist);
    //     }, 1000)
    // }, [accountWatchlist]);


  // Checking if the user is logged in
  useEffect(() => {

      const LOGGED_IN_VALUE = sessionStorage.getItem("Logged In");
      setIsLoggedInValue(!!LOGGED_IN_VALUE);

  }, []);

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

  }, [])

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

        {isDevelopmentMode ? (
          
          <AdminZone setReviewItems={setReviewItems} reviewItems={reviewItems}/>

        ) : null}

        <DesktopNav isLoggedInValue={isLoggedInValue}/>
        <MobileNav/>
        <MobileNavMenu isLoggedInValue={isLoggedInValue}/>

        <IndexTop/>
        <IndexReviews reviewItems={reviewItems}/>
      </main>

    </div>
  )
}
