/**
 *
 *  This is the page's meta data and tab settings
 *
 */

import { useRouter } from "next/router";
import Head from "next/head";

function formatSlug(slug) {
    if (!slug) return "";

    return slug.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
}

export const PageHead = ({pageHeadData}) => {

    const router = useRouter();

    const {reviewSlug} = router.query;

    const SE = "The Southern Critic";
    
    let title, keywords, description;

    // Changing the title based on the page
    switch (router.pathname) {
        case "/":
            title = SE + " - TV/Film Critic";
            keywords = [];
            description = "";
            break;
        case "/reviews":
            title = SE + " - Reviews";
            keywords = [];
            description = "";
            break;
        case "/reviews/[reviewSlug]":
            title = reviewSlug 
            ? `${SE} - ${formatSlug(reviewSlug)}`
            : SE + " - Review";
            keywords = [];
            description = "";
            break;
        case "/watchlist":
            title = SE + " - Watchlist";
            keywords = [];
            description = "";
            break;
        case "/login_register":
            title = SE + " - Login/Register";
            keywords = [];
            description = "";
            break;
        case "/profile":
            title = SE + " - My Profile";
            keywords = [];
            description = "";
            break;
    }


    return (
        <Head>

            <title>{title}</title>

            <meta charSet="UTF-8"/>
            <meta name="description" content={description}/>
            <meta name="keywords" content={keywords}/>

            {/** Icons */}
            <link rel="icon" type="image/x-icon" href={pageHeadData.favicon} />
            <link
                rel="icon"
                type="image/png"
                sizes="16x16"
                href={pageHeadData.f16}
            />
            <link
                rel="icon"
                type="image/png"
                sizes="32x32"
                href={pageHeadData.f32}
            />
            <link
                rel="icon"
                type="image/png"
                sizes="48x48"
                href={pageHeadData.f48}
            />
            <link
                rel="icon"
                type="image/png"
                sizes="64x64"
                href={pageHeadData.f64}
            />
            <link
                rel="icon"
                type="image/png"
                sizes="96x96"
                href={pageHeadData.f96}
            />
            <link
                rel="icon"
                type="image/png"
                sizes="128x128"
                href={pageHeadData.f128}
            />
            <link
                rel="icon"
                type="image/png"
                sizes="192x192"
                href={pageHeadData.f192}
            />
            <link
                rel="icon"
                type="image/png"
                sizes="512x512"
                href={pageHeadData.f512}
            />
            <link rel="apple-touch-icon" sizes="57x57" href={pageHeadData.ati57} />
            <link rel="apple-touch-icon" sizes="76x76" href={pageHeadData.ati76} />
            <link
                rel="apple-touch-icon"
                sizes="120x120"
                href={pageHeadData.ati120}
            />
            <link
                rel="apple-touch-icon"
                sizes="152x152"
                href={pageHeadData.ati152}
            />
            <link
                rel="apple-touch-icon"
                sizes="180x180"
                href={pageHeadData.ati180}
            />
            <link
                rel="icon"
                type="image/png"
                sizes="72x72"
                href={pageHeadData.an72}
            />
            <link
                rel="icon"
                type="image/png"
                sizes="96x96"
                href={pageHeadData.an96}
            />
            <link
                rel="icon"
                type="image/png"
                sizes="144x144"
                href={pageHeadData.an144}
            />
            <link
                rel="icon"
                type="image/png"
                sizes="192x192"
                href={pageHeadData.an192}
            />
            <meta name="msapplication-TileColor" content="#ffffff" />
            <meta name="msapplication-TileImage" content={pageHeadData.ms32} />
            <meta
                name="msapplication-square70x70logo"
                content={pageHeadData.ms70}
            />
            <meta
                name="msapplication-square150x150logo"
                content={pageHeadData.ms150}
            />
            <meta
                name="msapplication-wide310x150logo"
                content={pageHeadData.ms310}
            />

        </Head>
    )
    

}
