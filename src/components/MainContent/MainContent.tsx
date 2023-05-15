import { isMobile } from "react-device-detect";
import MortphText from "../MortphText";

import styles from "./MainContent.module.scss";

interface mainContentProps {
  pageNo: number;
}

export function MainContent(props: mainContentProps) {
  const pageNo = props.pageNo;

  const Page1Content = () => {
    return (
      <div
        style={{
          marginTop: isMobile ? "20%" : "5%",
          width: "100vw",
        }}
      >
        <div
          className={`${styles.mainContent} ${isMobile ?? styles.mobileMainContent}`}
          style={{
            marginRight: isMobile ? "5%" : "20%",
            marginLeft: isMobile ? "5%" : "20%",
          }}
        >
          <p className={styles.mainContentHeader}>{"Bio"}</p>
          <div
            className={styles.mainContentSubHeader}
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <div style={{ paddingRight: "10px" }}>{"I write"}</div>
            <MortphText texts={["software", "websites", "apps"]} />
          </div>

          <div className={styles.mainContentNormalText}>
            {
              "I'm Joan, a passionate creator living in Mexico City. My work spans across multiple disciplines from web and app design/ coding, branding and database management/ optimisation."
            }
          </div>
        </div>
      </div>
    );
  };

  const Page3Content = () => {
    return (
      <div
        style={{
          marginTop: isMobile ? "20%" : "5%",
          width: "100vw",
        }}
      >
        <div
          className={`${styles.mainContent} ${isMobile ?? styles.mobileMainContent}`}
          style={{
            marginRight: isMobile ? "5%" : "20%",
            marginLeft: isMobile ? "5%" : "20%",
          }}
        >
          <p className={`${styles.mainContentHeader} ${styles.textBrown}`}>{"Blog"}</p>
        </div>
      </div>
    );
  };

  const Content = () => {
    switch (pageNo) {
      case 0:
        return <Page1Content />;
      case 1:
        return <p key="projects">{"This will maybe be a projects page."}</p>;
      case 2:
        return <Page3Content />;
      default:
        return <Page1Content />;
    }
  };

  return (
    <div
      style={{
        minWidth: "90vw",
        display: "grid",

        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Content />
    </div>
  );
}

// {/* <Grid
//           container
//           style={{
//             width: "90vw",
//             justifyContent: "center",
//             alignItems: "center",
//           }}
//         >
//                     <Grid item>
//             <CardTilt
//               textHeader="Decaf"
//               textSubHeader="Lorem ipsum bla bla words more words. Stuff💫"
//               link1="http://nedgam.es/wp-content/uploads/2014/09/no-opensource.png"
//               icon1="https://firebasestorage.googleapis.com/v0/b/decaf-c57a3.appspot.com/o/decaf_branding%2FAsset%203%404x-8.png?alt=media&token=7ad9c6dc-e678-4c33-98ae-4b52429d0fec"
//             />
//           </Grid>
//           <Grid item>
//             <CardTilt
//               textHeader="Quokka"
//               textSubHeader="Lorem ipsum bla bla words more words. Stuff💫"
//               link1="http://nedgam.es/wp-content/uploads/2014/09/no-opensource.png"
//               icon1="https://parallelisation-react-quokka-6jabwwy4x-dartw.vercel.app/quokkaLogo_circle.png"
//               link2="http://nedgam.es/wp-content/uploads/2014/09/no-opensource.png"
//               icon2="https://cdn-icons-png.flaticon.com/512/25/25231.png"
//             />
//           </Grid>
//           <Grid item>
//             <CardTilt
//               textHeader="KBC"
//               textSubHeader="Lorem ipsum bla bla words more words. Stuff💫"
//               link1="http://nedgam.es/wp-content/uploads/2014/09/no-opensource.png"
//               icon1="https://www.kidsbeatcancer.org/images/logo.png"
//               link2="http://nedgam.es/wp-content/uploads/2014/09/no-opensource.png"
//               icon2="https://cdn-icons-png.flaticon.com/512/25/25231.png"
//             />
//           </Grid>
//         </Grid> */}
