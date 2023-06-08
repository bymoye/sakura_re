import { useEffect, useRef, useState } from "react";

const SvgBackground = () => {
  const svgRef = useRef();
  const imageListRef = useRef([]);
  const currentIndexRef = useRef(0);
  const timerRef = useRef(null);
  const timerRef2 = useRef(null);
  const [stdDeviation, setStdDeviation] = useState(0);
  const stdDeviationRef = useRef(0);

  const _blur_check = (scrollTop) => {
    return (
      (scrollTop > 100 && stdDeviationRef.current < 5) ||
      (scrollTop <= 100 && stdDeviationRef.current > 0)
    );
  };

  const _blur = () => {
    const scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;

    const delta = scrollTop > 100 ? 0.1 : -0.1;
    stdDeviationRef.current = parseFloat(
      (stdDeviationRef.current + delta).toFixed(1)
    );
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
    blur_rs();
    window.addEventListener("scroll", blur_rs);

    return () => {
      window.removeEventListener("scroll", blur_rs);
    };
  }, []);

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
      image.style.filter = "url(#svg_blurfilter)";
      return image;
    };

    const createAnimate = () => {
      const animate = document.createElementNS(namespaceURI, "animate");
      animate.setAttribute("attributeName", "opacity");
      animate.setAttribute("from", "0");
      animate.setAttribute("to", "1");
      animate.setAttribute("dur", "2s");
      animate.setAttribute("begin", "null");
      animate.setAttribute("repeatCount", "1");
      animate.setAttribute("fill", "freeze");
      return animate;
    };

    const addEvent = () => {
      /// 打开定时器
      const startTimer = () => {
        timerRef.current = setInterval(background, 5000);
      };
      /// 关闭定时器
      const stopTimer = () => {
        clearInterval(timerRef.current);
      };
      /// 切换背景
      const background = () => {
        if (imageListRef.current.length === 0) {
          stopTimer();
          return;
        }

        currentIndexRef.current =
          (currentIndexRef.current + 1) % imageListRef.current.length;
        const currentImage = imageListRef.current[currentIndexRef.current];
        const previousImage = svg.querySelector("image");
        const animate = createAnimate();
        svg.appendChild(currentImage);
        currentImage.appendChild(animate);
        animate.beginElement();

        animate.addEventListener("endEvent", function _event() {
          animate.remove();
          previousImage.remove();
          animate.removeEventListener("endEvent", _event);
        });
      };

      /// 默认开启定时器
      startTimer();
      /// 监听页面可见性
      document.addEventListener("visibilitychange", () => {
        document.hidden ? stopTimer() : startTimer();
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
