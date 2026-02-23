// React/Next Imports
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import fs from "fs";
import path from "path";

// Library Imports

// Data/Functions/Images Imports
import CloseMobileNavMenu from "@/assets/functions/Nav/CloseMobileNavMenu";

// import { getItemsFromDB } from "@/database/getters/getItemsFromDB";

// Component Imports
import { PageHead } from "@/assets/components/global/All/PageHead";

// import { AddItemToDB } from "@/assets/components/admin/AddItemToDB";

import { DesktopNav } from "@/assets/components/global/Nav/Desktop/DesktopNav";
import { MobileNav } from "@/assets/components/global/Nav/Mobile/MobileNav";
import { MobileNavMenu } from "@/assets/components/global/Nav/Mobile/MobileNavMenu";

import { LoginRegisterMain } from "@/assets/components/pages/Login_Register/LoginRegisterMain";

// Style Imports
import globalStyles from "../assets/styles/modules/Global/Global.module.css";
import "../assets/styles/modules/Login_Register/Login_Register.module.css";


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


export default function LoginRegister({pageIconData, mediaItems}) {

    const router = useRouter();

    const [isDevelopmentMode, setIsDevelopmentMode] = useState(false);
    const [isLoggedInValue, setIsLoggedInValue] = useState(false);
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

    }, []);

    useEffect(() => {

        if (isLoggedInValue) {
            
            router.push("/");

        }

    }, [isLoggedInValue])

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





    return (
        <div id="PAGE_ID">

            <PageHead pageHeadData={pageIconData}/>

            <div id="darkenOverlay" className={globalStyles.darken_overlay} onClick={CloseMobileNavMenu}/>

            <main id="PAGE_MAIN">

                <DesktopNav isLoggedInValue={isLoggedInValue}/>
                <MobileNav/>
                <MobileNavMenu isLoggedInValue={isLoggedInValue}/>

                <LoginRegisterMain/>

            </main>

        </div>
    )
}