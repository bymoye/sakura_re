import { useEffect, useRef, useState } from "react";

const SvgBackground = () => {
  const svgRef = useRef();
  const imageListRef = useRef([]);
  const currentIndexRef = useRef(0);
  const timerRef = useRef(null);
  const [stdDeviation, setStdDeviation] = useState(0);
  const stdDeviationRef = useRef(0);
  const timerRef2 = useRef(null);

  const _blur_check = (scrollTop) => {
    return (
      (scrollTop > 100 && stdDeviationRef.current < 5) ||
      (scrollTop <= 100 && stdDeviationRef.current > 0)
    );
  };

  const _blur = () => {
    const scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;

    if (scrollTop > 100 && stdDeviationRef.current < 5) {
      stdDeviationRef.current = parseFloat(
        (stdDeviationRef.current + 0.1).toFixed(1)
      );
    } else if (scrollTop < 100 && stdDeviationRef.current > 0) {
      stdDeviationRef.current = parseFloat(
        (stdDeviationRef.current - 0.1).toFixed(1)
      );
    }
    setStdDeviation(stdDeviationRef.current);

    if (_blur_check(scrollTop)) {
      timerRef2.current = setTimeout(() => {
        requestAnimationFrame(_blur);
      }, 0);
    } else {
      clearTimeout(timerRef2.current);
      timerRef2.current = null;
    }
  };

  const blur_rs = () => {
    const scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;

    if (_blur_check(scrollTop) && timerRef2.current === null) {
      requestAnimationFrame(_blur);
    }
  };

  useEffect(() => {
    const namespaceURI = "http://www.w3.org/2000/svg";
    const svg = svgRef.current;

    const createImage = (href) => {
      const image = document.createElementNS(namespaceURI, "image");
      image.setAttribute("href", href);
      image.setAttribute("x", "-5");
      image.setAttribute("y", "-5");
      image.setAttribute("height", "102%");
      image.setAttribute("width", "102%");
      image.setAttribute("preserveAspectRatio", "xMidYMid slice");
      image.style.opacity = "0";
      image.style.transition = "opacity 2s";
      image.style.filter = "url(#svg_blurfilter)";
      return image;
    };

    const addEvent = () => {
      const background = () => {
        if (imageListRef.current.length === 0) {
          clearInterval(timerRef.current);
          return;
        }

        currentIndexRef.current =
          currentIndexRef.current === imageListRef.current.length - 1
            ? 0
            : currentIndexRef.current + 1;
        const currentImage = imageListRef.current[currentIndexRef.current];
        const previousImage = svg.querySelector("image");

        previousImage.style.opacity = "0";

        setTimeout(() => {
          previousImage.remove();
        }, 2000);

        svg.appendChild(currentImage);

        setTimeout(() => {
          currentImage.style.opacity = "1";
        }, 0);
      };

      timerRef.current = setInterval(background, 5000);

      document.addEventListener("visibilitychange", () => {
        if (document.hidden) {
          clearInterval(timerRef.current);
        } else {
          timerRef.current = setInterval(background, 5000);
        }
      });
    };

    window.addEventListener("load", () => {
      const url = `https://api.nmxc.ltd/randimg?method=${
        window.screen.height > window.screen.width ? "mobile" : "pc"
      }&number=3&encode=json`;
      fetch(url)
        .then(async (res) => {
          const data = await res.json();
          if (res.ok) {
            const imgurl = [
              "https://fp1.fghrsh.net/2020/01/14/7249e2902b45b4620019519a82db1d2e.jpg!q80.webp",
              "https://fp1.fghrsh.net/2020/01/14/bb445e2a101bbf5a4ca017782dd73b89.jpg!q80.webp",
              "https://fp1.fghrsh.net/2020/01/14/4939be2513c620c6c15b057b3137307e.jpg!q80.webp",
            ];
            imgurl.unshift(svg.querySelector("image").getAttribute("href"));
            imageListRef.current = imgurl.map((item) => createImage(item));
            addEvent();
          }
        })
        .catch((error) => {
          console.error("Failed to fetch images:", error);
        });
    });
  }, []);

  useEffect(() => {
    blur_rs();
    window.addEventListener("scroll", blur_rs);

    return () => {
      window.removeEventListener("scroll", blur_rs);
    };
  }, []);

  return (
    <svg
      style={{
        position: "fixed",
        width: "100%",
        height: "100%",
        zIndex: "-999",
      }}
      ref={svgRef}
    >
      <image
        href="https://fp1.fghrsh.net/2020/01/31/34ac8d52912eb5ffa639ab23cbced140.jpg!q80.webp"
        x="-5"
        y="-5"
        height="102%"
        width="102%"
        style={{ opacity: "1", transition: "opacity 2s" }}
        preserveAspectRatio="xMidYMid slice"
        filter="url(#svg_blurfilter)"
      ></image>
      <filter id="svg_blurfilter">
        <feGaussianBlur
          stdDeviation={stdDeviation}
          colorInterpolationFilters="sRGB"
        ></feGaussianBlur>
      </filter>
    </svg>
  );
};

export default SvgBackground;
