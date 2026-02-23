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

// Component Imports
import { PageHead } from "@/assets/components/global/All/PageHead";

import { AddItemToDB } from "@/assets/components/admin/AddItemToDB";

import { DesktopNav } from "@/assets/components/global/Nav/Desktop/DesktopNav";
import { MobileNav } from "@/assets/components/global/Nav/Mobile/MobileNav";
import { MobileNavMenu } from "@/assets/components/global/Nav/Mobile/MobileNavMenu";

import { IndexTop } from "@/assets/components/pages/Index/IndexTop";
import { IndexReviews } from "@/assets/components/pages/Index/IndexReviews";

// Style Imports
import globalStyles from "../assets/styles/modules/Global/Global.module.css";
import "../assets/styles/modules/Index/Index.module.css";

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
          <div style={{padding: "30px", backgroundColor: "ghostwhite", border: "1px solid rgba(0,0,0,0.1)"}}>

            <h1 style={{fontSize: "30px", fontWeight: "bold", marginBottom: "20px"}}><strong>ADMIN ZONE:</strong></h1>

            <AddItemToDB setItems={setReviewItems}/>

            <ul style={{padding: "20px", marginTop: "30px", backgroundColor: "rgba(0,0,0,0.1)"}}>

              {reviewItems.map(item => (
                <li key={item.objectStorageKey} style={{marginTop: "20px", marginBottom: "20px"}}>
                  Name: {item.objectName} <br/>
                  Poster: <img src={item.objectPoster} style={{maxWidth: "100px"}}/> <br/> 
                  Route: <a href={item.objectRoute}>Link</a>
                  <br/>
                  <br/>
                  Review: <p>" {item.objectReview} "</p>
                  <br/>
                  Rating: <p><strong>{item.objectRating}</strong> Stars</p>
                  <br/>
                  <button onClick={() => {
                    const confirmed = window.confirm("Are you sure you want to delete this item?");
                    if (confirmed) {
                      removeItemFromDB(item.objectStorageKey, setReviewItems);
                    }
                  }}>Remove Item</button>


                  <br/>
                  <br/>
                  --------------
                  </li>
              ))}

            </ul>

          </div>
        ) : null}

        {/**
         * 
         *  <div>

          {accountWatchlist.map(item => (
            <div>

              {item.name}

            </div>
          ))}

        </div>
         * 
         */}

        <DesktopNav isLoggedInValue={isLoggedInValue}/>
        <MobileNav/>
        <MobileNavMenu isLoggedInValue={isLoggedInValue}/>

        <IndexTop/>
        <IndexReviews/>
      </main>

    </div>
  )
}
