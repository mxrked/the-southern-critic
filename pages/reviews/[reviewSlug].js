// React/Next Imports
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import fs from "fs";
import path from "path";

// Library Imports
import { LazyLoadImage } from "react-lazy-load-image-component";
import {doc, getDoc, collection, query, where, getDocs} from "firebase/firestore";
import { thesoutherncriticdb } from "@/database/connectToDB";

// Data/Functions/Images Imports
import CloseMobileNavMenu from "@/assets/functions/Nav/CloseMobileNavMenu";

// Component Imports
import { PageHead } from "@/assets/components/global/All/PageHead";

// import { AddItemToDB } from "@/assets/components/admin/AddItemToDB";

import { DesktopNav } from "@/assets/components/global/Nav/Desktop/DesktopNav";
import { MobileNav } from "@/assets/components/global/Nav/Mobile/MobileNav";
import { MobileNavMenu } from "@/assets/components/global/Nav/Mobile/MobileNavMenu";

import { ReviewMain } from "@/assets/components/pages/Reviews/ReviewMain";

import { Footer } from "@/assets/components/global/Footer/Footer";

// Style Imports
import globalStyles from "../../assets/styles/modules/Global/Global.module.css";
import "../../assets/styles/modules/Reviews/Reviews.module.css";

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

// This is used to render stars for the rating
const renderRatingStars = (rating) => {
    if (!rating) return null;

    const FULL_STARS = Math.floor(rating);
    const HAS_HALF_STAR = rating % 1 !== 0;
    const EMPTY_STARS = 5 - FULL_STARS - (HAS_HALF_STAR ? 1 : 0);

    return (
        <>
            {"★".repeat(FULL_STARS)}
            {HAS_HALF_STAR && "½"}
            {"☆".repeat(EMPTY_STARS)}
        </>
    )
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



export default function ReviewPage({pageIconData, mediaItems}) {
    const router = useRouter();
    const {reviewSlug} = router.query;

    const [isDevelopmentMode, setIsDevelopmentMode] = useState(false);
    const [isLoggedInValue, setIsLoggedInValue] = useState(false);
    const [accountWatchlist, setAccountWatchlist] = useState([]);
    const [reviewItem, setReviewItem] = useState(null);

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

    // Fetching the review in the database that matches the slug
    const fetchReviewBySlug = async (slug) => {
        if (!slug) return null;

        const ROUTE_TO_MATCH = `/reviews/${slug}`;

        const ROUTE_TO_MATCH_QUERY = query(
            collection(thesoutherncriticdb, "media"),
            where("objectRoute", "==", ROUTE_TO_MATCH)
        );

        const ROUTE_TO_MATCH_QUERY_SNAPSHOT = await getDocs(ROUTE_TO_MATCH_QUERY);

        if (!ROUTE_TO_MATCH_QUERY_SNAPSHOT.empty) {
            return ROUTE_TO_MATCH_QUERY_SNAPSHOT.docs[0].data();
        }

        return null;
    }

    useEffect(() => {
        if (reviewSlug) {
            fetchReviewBySlug(reviewSlug).then((data) => {
                setReviewItem(data);
            })
        }
    }, [reviewSlug])


    // Review Object Variables
    const reviewCreatedTime = reviewItem?.createdAt.toDate().toLocaleDateString(); // Turns the database time object to a string
    const reviewName = reviewItem?.objectName;
    const reviewPoster = reviewItem?.objectPoster;
    const reviewRating = reviewItem?.objectRating;
    const reviewText = reviewItem?.objectReview;
    const reviewItemType = reviewItem?.objectType;
    const reviewItemRoute = reviewItem?.objectRoute;
    const reviewStorageKey = reviewItem?.objectStorageKey;

    const REVIEW = [reviewCreatedTime, reviewName, reviewPoster, reviewRating, reviewText, reviewItemType, reviewItemRoute, reviewStorageKey];

    return (
        <div id="PAGE_ID">

            <PageHead pageHeadData={pageIconData}/>

            <div id="darkenOverlay" className={globalStyles.darken_overlay} onClick={CloseMobileNavMenu}/>

            <main id="PAGE_MAIN">

                <DesktopNav isLoggedInValue={isLoggedInValue}/>
                <MobileNav/>
                <MobileNavMenu isLoggedInValue={isLoggedInValue}/>


                {/** <LazyLoadImage src={reviewPoster}/> */}

                <ReviewMain review={REVIEW}/>
                
                <Footer/>

            </main>

        </div>
    )

}