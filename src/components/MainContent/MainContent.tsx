import { Grid } from "@mui/material";
import { useWallet } from "@solana/wallet-adapter-react";
import { CardTilt } from "../Cards/CardTilt";

import styles from "./MainContent.module.scss";

interface mainContentProps {
  pageNo: number;
}

export function MainContent(props: mainContentProps) {
  const pageNo = props.pageNo;

  const wallet = useWallet();

  const Page1Content = () => {
    return (
      <div>
        <div className={styles.mainContent}>
          <p className={styles.mainContentHeader}>{"Projects"}</p>
          <p className={styles.mainContentSubHeader}>Bla bla bla</p>
        </div>
        <Grid
          container
          style={{
            width: "90vw",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Grid item>
            <CardTilt
              textHeader="Decaf"
              textSubHeader="Lorem ipsum bla bla words more words. Stuff💫"
              link1="http://nedgam.es/wp-content/uploads/2014/09/no-opensource.png"
              icon1="https://firebasestorage.googleapis.com/v0/b/decaf-c57a3.appspot.com/o/decaf_branding%2FAsset%203%404x-8.png?alt=media&token=7ad9c6dc-e678-4c33-98ae-4b52429d0fec"
            />
          </Grid>
          <Grid item>
            <CardTilt
              textHeader="Quokka"
              textSubHeader="Lorem ipsum bla bla words more words. Stuff💫"
              link1="http://nedgam.es/wp-content/uploads/2014/09/no-opensource.png"
              icon1="https://parallelisation-react-quokka-6jabwwy4x-dartw.vercel.app/quokkaLogo_circle.png"
              link2="http://nedgam.es/wp-content/uploads/2014/09/no-opensource.png"
              icon2="https://cdn-icons-png.flaticon.com/512/25/25231.png"
            />
          </Grid>
          <Grid item>
            <CardTilt
              textHeader="KBC"
              textSubHeader="Lorem ipsum bla bla words more words. Stuff💫"
              link1="http://nedgam.es/wp-content/uploads/2014/09/no-opensource.png"
              icon1="https://www.kidsbeatcancer.org/images/logo.png"
              link2="http://nedgam.es/wp-content/uploads/2014/09/no-opensource.png"
              icon2="https://cdn-icons-png.flaticon.com/512/25/25231.png"
            />
          </Grid>
        </Grid>
      </div>
    );
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
      {pageNo == 0 && <Page1Content />}
      {pageNo == 1 && (
        <p key="projects">{"This will maybe be a projects page."}</p>
      )}
      {pageNo == 2 && <p key="find-me">{"Another page???"}</p>}
    </div>
  );
}
