// React/Next Imports
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import fs from "fs";
import path from "path";

// Library Imports

// Data/Functions/Images Imports
import CloseMobileNavMenu from "@/assets/functions/Nav/CloseMobileNavMenu";

// Component Imports
import { PageHead } from "@/assets/components/global/All/PageHead";

import { DesktopNav } from "@/assets/components/global/Nav/Desktop/DesktopNav";
import { MobileNav } from "@/assets/components/global/Nav/Mobile/MobileNav";
import { MobileNavMenu } from "@/assets/components/global/Nav/Mobile/MobileNavMenu";

import { IndexTop } from "@/assets/components/pages/Index/IndexTop";

// Style Imports
import globalStyles from "../assets/styles/modules/Global/Global.module.css";
import "../assets/styles/modules/Index/Index.module.css";


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

    return {
      props: {
        pageIconData
      }
    }
}


export default function Home({pageIconData}) {

  const router = useRouter();

  const [isLoggedInValue, setIsLoggedInValue] = useState(false);

  // Checking if the user is logged in
  useEffect(() => {

      const LOGGED_IN_VALUE = sessionStorage.getItem("Logged In");
      setIsLoggedInValue(!!LOGGED_IN_VALUE);

  }, []);


  return (
    <div id="PAGE_ID">

      <PageHead pageHeadData={pageIconData}/>

      <div id="darkenOverlay" className={globalStyles.darken_overlay} onClick={CloseMobileNavMenu}/>

      <main id="PAGE_MAIN">
        <DesktopNav isLoggedInValue={isLoggedInValue}/>
        <MobileNav/>
        <MobileNavMenu isLoggedInValue={isLoggedInValue}/>

        <IndexTop/>
      </main>

    </div>
  )
}
