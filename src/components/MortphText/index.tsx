import { CSSProperties, useEffect, useState } from "react";
import styles from "./MorphText.module.scss";

const MortphText = (props: any) => {
  const [text1, setText1] = useState("");
  const [text1Style, setText1Style] = useState<CSSProperties | undefined>();

  const [text2, setText2] = useState("");
  const [text2Style, setText2Style] = useState<CSSProperties | undefined>();

  // The strings to morph between. You can change these to anything you want!
  const texts = ["software", "websites", "apps"];

  // Controls the speed of morphing.
  const morphTime = 2;
  const cooldownTime = 0.25;

  let textIndex = texts.length - 1;
  let time = new Date().getTime();
  let morph = 0;
  let cooldown = cooldownTime;

  useEffect(() => {
    setText1(texts[textIndex % texts.length]);
    setText2(texts[(textIndex + 1) % texts.length]);
  }, []);

  useEffect(() => {
    setMounted(true);
    animate();
  }, []);

  const [mounted, setMounted] = useState(false);
  //   useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  function doMorph() {
    morph -= cooldown;
    cooldown = 0;

    let fraction = morph / morphTime;

    if (fraction > 1) {
      cooldown = cooldownTime;
      fraction = 1;
    }

    setMorph(fraction);
  }

  // A lot of the magic happens here, this is what applies the blur filter to the text.
  function setMorph(fraction: number) {
    // fraction = Math.cos(fraction * Math.PI) / -2 + .5;

    // elts.text2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
    // elts.text2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

    setText2Style({
      filter: `blur(${Math.min(8 / fraction - 8, 100)}px)`,
      opacity: `${Math.pow(fraction, 0.4) * 100}%`,
    });

    fraction = 1 - fraction;
    // elts.text1.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
    // elts.text1.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

    setText1Style({
      filter: `blur(${Math.min(8 / fraction - 8, 100)}px)`,
      opacity: `${Math.pow(fraction, 0.4) * 100}%`,
    });

    // elts.text1.textContent = texts[textIndex % texts.length];
    // elts.text2.textContent = texts[(textIndex + 1) % texts.length];

    setText1(texts[textIndex % texts.length]);
    setText2(texts[(textIndex + 1) % texts.length]);
  }

  function doCooldown() {
    morph = 0;

    // elts.text2.style.filter = "";
    // elts.text2.style.opacity = "100%";

    setText2Style({ filter: "", opacity: "100%" });

    // elts.text1.style.filter = "";
    // elts.text1.style.opacity = "0%";

    setText1Style({ filter: "", opacity: "0%" });
  }

  // Animation loop, which is called every frame.
  function animate() {
    requestAnimationFrame(animate);

    let newTime = new Date().getTime();
    let shouldIncrementIndex: boolean = cooldown > 0;
    let dt: number = (newTime - time) / 1000;
    time = newTime;

    cooldown -= dt;

    if (cooldown <= 0) {
      if (shouldIncrementIndex) {
        textIndex++;
      }

      doMorph();
    } else {
      doCooldown();
    }
  }

  return (
    <div
      style={{
        // background: "red",
        display: "flex",
        flexDirection: "row" /* , justify-content: center,align-items: center  */,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        id="container"
        className={`${styles.container}`}
        style={{
          display: "flex",
          flexDirection: "row" /* , justify-content: center,align-items: center  */,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <span id="text1" className={`${styles.text1}`} style={text1Style}>
          {text1}
        </span>
        <span id="text2" className={`${styles.text2}`} style={text2Style}>
          {text2}
        </span>
      </div>

      <svg id="filters">
        <defs>
          <filter id="threshold">
            <feColorMatrix
              in="SourceGraphic"
              type="matrix"
              values="1 0 0 0 0
                    0 1 0 0 0
                    0 0 1 0 0
                    0 0 0 255 -140"
            />
          </filter>
        </defs>
      </svg>
    </div>
  );
};

export default MortphText;
