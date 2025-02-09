import { useEffect, useState } from "react";
import "./index.css";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { FullPage , Slide } from '@ap.cx/react-fullpage';

function App() {
  //                                                                window chainging animation
  const [isScrolled, setIsStyled] = useState<boolean>(false);

  // استفاده از useEffect در سطح کامپوننت
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 200) {
        setIsStyled(true);
      } else {
        setIsStyled(false);
      }
    };

    // افزودن event listener برای اسکرول
    window.addEventListener("scroll", handleScroll);

    // پاکسازی event listener در زمان unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // فقط یکبار وقتی کامپوننت mount می‌شود فراخوانی شود

  useEffect(() => {
    // ایجاد یک Intersection Observer برای نظارت بر عناصری که به صفحه وارد می‌شوند
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // زمانی که عنصر در صفحه دیده می‌شود، کلاس "visible" به آن افزوده می‌شود
            entry.target.classList.add("visible");
          } else {
            // زمانی که عنصر از صفحه خارج می‌شود، کلاس "visible" حذف می‌شود
            entry.target.classList.remove("visible");
          }
        });
      },
      { threshold: 0.01 } // این تنظیم تعیین می‌کند که چه مقدار از عنصر باید در صفحه دیده شود
    );

    // انتخاب تمام عناصری که می‌خواهیم تحت نظر قرار دهیم
    const elements = document.querySelectorAll(".fade-in");
    elements.forEach((el) => observer.observe(el));

    // پاکسازی هنگام ترک کامپوننت
    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);
  return (
    <div className="flex flex-col h-auto">
      <div>
        <HomePage />
      </div>
      <div className="">
        <Content isScrolled={isScrolled} />
      </div>
    </div>
  );
}
function HomePage() {
  //                                                              mouse position
  interface MousePosition {
    x: number;
    y: number;
  }
  const [MousePosition, setMouseY] = useState<MousePosition>({ x:  window.innerWidth/2, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent): void => {
      if ((event.pageX >= window.innerWidth/6) && (event.pageX <= window.innerWidth*5/6 ) &&(event.pageY <= window.innerHeight*0.7)) {
        setMouseY({ x: event.pageX, y: event.pageY });   // فقط زمانی که کمتر از حداکثر باشد
      }
    };
    window.addEventListener("mousemove", handleMouseMove);

    // پاکسازی هنگام خروج از کامپوننت
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []); // اجرا فقط یک بار هنگام لود کامپوننت

  const leftBoxWidth: number = window.innerWidth - MousePosition.x;

  // const scrollToSection = (id: string) => {
  //   setTimeout(() => {
  //     const section = document.getElementById(id);
  //     if (section) {
  //       section.scrollIntoView({ behavior: "smooth" });
  //     }
  //   }, 0);
  // };
  return (
    <div
      id="homePage"
      className=" relative h-svh bg-gradient-to-t from-white via-Cyan-500 to-blue-300 flex flex-col"
    >
      <div className="flex flex-col items-center overflow-hidden">
        <div className=" name w-[30%] h-[10%]  text-white rounded-lg  top-[55%] absolute z-20 flex justify-center items-center text-6xl font-semibold">
          Hi im Hasanain
        </div>
        <img
          className=" absolute z-10 h-[69%]"
          src="/src/Clipped_image_20241120_171320.png"
          alt="image"
        />

        <img

          src="/src/programing.jpg"
          alt="programing"
          className={` w-full  absolute z-0 w- h-[69%]`}
        />
        <img
          src="/src/electronic.jpg"
          alt="electronic"
          className={` w-full absolute z-0 h-[69%]`}
          style={{
            clipPath: `inset(0  0 0 ${leftBoxWidth}px)`, // برش فقط از سمت راست
          }}
        />
      </div>
      <div className=" z-20 h-[70%]  w-full flex">
        <button
          style={{ width: `${leftBoxWidth +10}px` }}
          className={` flex justify-center text-3xl items-center text-white rounded shadow-lg hover:gradient-hover `}
        >
          Programing
        </button>
        <button
          style={{ width: `${MousePosition.x -10}px` }}
          className={` flex justify-center text-3xl items-center text-white rounded shadow-lg hover:gradient-hover`}
        >
          Electronic
        </button>
      </div>
      <div className="ml-[1%] w-[98%] h-2 bg-gradient-to-r from-Cyan-200 via-black to-Cyan-200 rounded-md"></div>
      {/* buttons */}
    </div>
  );
}
function Content({ isScrolled }: { isScrolled: boolean }) {
  const [isFinishScrolled, setScroll] = useState<boolean>(false);
  const scrollPoint = window.innerHeight;
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > scrollPoint - 100) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const scrollToSection = (id: string) => {
    setTimeout(() => {
      const section = document.getElementById(id);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }, 0);
  };

  return (
    <div className="flex bg-gradient-to-t from-blue-600 to-white  flex-col">
      {/* top setion */}
      <div className="flex  h-auto w-full">
        {/* left bar */}
        <div
          className={` flex transition-all duration-500 ease-in-out ${
            isScrolled
              ? `${
                  isFinishScrolled ? "fixed top-[100px]" : ""
                } w-1/4  flex-col items-center`
              : "h-screen fixed w-screen top-[71%]"
          }`}
        >
          <a
            className={`transition-all duration-500 ease-in-out ${
              isScrolled ? " w-3/5 h-auto mt-8" : "hidden"
            }`}
            onClick={() => scrollToSection("homePage")}
          >
            <button
              className={`transition-all duration-500 ease-in-out ${
                isScrolled
                  ? " w-full font-medium bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                  : ""
              }`}
            >
              Home page
            </button>
          </a>
          <a
            onClick={() => scrollToSection("About")}
            className={`transition-all duration-500 ease-in-out ${
              isScrolled
                ? " w-3/5 h-auto mt-8"
                : " w-1/4 h-[30%] flex justify-center items-center"
            } `}
          >
            <button
              className={`transition-all duration-500 ease-in-out ${
                isScrolled
                  ? "w-full text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                  : "rounded-lg w-full h-full flex justify-center text-3xl items-center hover:border-dotted hover:border-4 border-Cyan-800 rounded hover:gradient-hover transition duration-500 ease-in-out"
              }  `}
            >
              About
            </button>
          </a>
          <a
            onClick={() => scrollToSection("skills")}
            className={`transition-all duration-500 ease-in-out ${
              isScrolled
                ? " w-3/5 h-auto mt-8"
                : " w-1/4 h-[30%] flex justify-center items-center"
            }  `}
          >
            <button
              className={`transition-all duration-500 ease-in-out ${
                isScrolled
                  ? "w-full text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                  : "rounded-lg w-full h-full flex justify-center text-3xl items-center hover:border-dotted hover:border-4 border-Cyan-800 rounded hover:gradient-hover transition duration-500 ease-in-out"
              }`}
            >
              Skill & Tools
            </button>
          </a>
          <a
            onClick={() => scrollToSection("projects")}
            className={`transition-all duration-500 ease-in-out ${
              isScrolled
                ? " w-3/5 h-auto mt-8"
                : " w-1/4 h-[30%] flex justify-center items-center"
            }`}
          >
            <button
              className={`transition-all duration-500 ease-in-out ${
                isScrolled
                  ? "w-full text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                  : "rounded-lg w-full h-full flex justify-center text-3xl items-center hover:border-dotted hover:border-4 border-Cyan-800 rounded hover:gradient-hover transition duration-500 ease-in-out"
              }`}
            >
              Projects
            </button>
          </a>
          <a
            onClick={() => scrollToSection("contact")}
            className={`transition-all duration-500 ease-in-out ${
              isScrolled
                ? " w-3/5 h-auto mt-8"
                : " w-1/4 h-[30%] flex justify-center items-center"
            }`}
          >
            <button
              className={`transition-all duration-500 ease-in-out ${
                isScrolled
                  ? "w-full text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                  : "rounded-lg w-full h-full flex justify-center text-3xl items-center hover:border-dotted hover:border-4 border-Cyan-800 rounded hover:gradient-hover transition duration-500 ease-in-out"
              }`}
            >
              Contact
            </button>
          </a>
        </div>
        {/* <div
          className={`${
            isFinishScrolled ? "fixed top-[100px]" : ""
          } w-1/4  flex flex-col items-center`}
        >
          <a
            className=" w-3/5 h-auto mt-8"
            onClick={() => scrollToSection("homePage")}
          >
            <button className="w-full font-medium bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">
              Home page
            </button>
          </a>
          <a
            onClick={() => scrollToSection("About")}
            className=" w-3/5 h-auto mt-8"
          >
            <button className="w-full text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">
              About
            </button>
          </a>
          <a
            onClick={() => scrollToSection("skills")}
            className="w-3/5 h-auto mt-8"
          >
            <button className="w-full text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
              skill & Toolst
            </button>
          </a>
          <a
            onClick={() => scrollToSection("projects")}
            className="w-3/5 h-auto mt-8"
          >
            <button className="w-full text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
              Projects
            </button>
          </a>
          <a
            onClick={() => scrollToSection("contact")}
            className="w-3/5 h-auto mt-8"
          >
            <button className="w-full text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
              Contact
            </button>
          </a>
          <div className="w-4/5 mt-20 gap-3 flex justify-center bg-gradient-to-t  via-white w-[160px] rounded-full  h-8">
            <a href="https://discord.com/">
              <span className="[&>svg]:h-7 shadow-2xl [&>svg]:w-7 [&>svg]:fill-[#7289da]">
                <svg viewBox="0 0 640 512">
                  <path d="M524.5 69.8a1.5 1.5 0 0 0 -.8-.7A485.1 485.1 0 0 0 404.1 32a1.8 1.8 0 0 0 -1.9 .9 337.5 337.5 0 0 0 -14.9 30.6 447.8 447.8 0 0 0 -134.4 0 309.5 309.5 0 0 0 -15.1-30.6 1.9 1.9 0 0 0 -1.9-.9A483.7 483.7 0 0 0 116.1 69.1a1.7 1.7 0 0 0 -.8 .7C39.1 183.7 18.2 294.7 28.4 404.4a2 2 0 0 0 .8 1.4A487.7 487.7 0 0 0 176 479.9a1.9 1.9 0 0 0 2.1-.7A348.2 348.2 0 0 0 208.1 430.4a1.9 1.9 0 0 0 -1-2.6 321.2 321.2 0 0 1 -45.9-21.9 1.9 1.9 0 0 1 -.2-3.1c3.1-2.3 6.2-4.7 9.1-7.1a1.8 1.8 0 0 1 1.9-.3c96.2 43.9 200.4 43.9 295.5 0a1.8 1.8 0 0 1 1.9 .2c2.9 2.4 6 4.9 9.1 7.2a1.9 1.9 0 0 1 -.2 3.1 301.4 301.4 0 0 1 -45.9 21.8 1.9 1.9 0 0 0 -1 2.6 391.1 391.1 0 0 0 30 48.8 1.9 1.9 0 0 0 2.1 .7A486 486 0 0 0 610.7 405.7a1.9 1.9 0 0 0 .8-1.4C623.7 277.6 590.9 167.5 524.5 69.8zM222.5 337.6c-29 0-52.8-26.6-52.8-59.2S193.1 219.1 222.5 219.1c29.7 0 53.3 26.8 52.8 59.2C275.3 311 251.9 337.6 222.5 337.6zm195.4 0c-29 0-52.8-26.6-52.8-59.2S388.4 219.1 417.9 219.1c29.7 0 53.3 26.8 52.8 59.2C470.7 311 447.5 337.6 417.9 337.6z" />
                </svg>
              </span>
            </a>
            <a href="https://instagram.com/">
              <span className="[&>svg]:h-7 [&>svg]:w-7 [&>svg]:fill-[#c13584]">
                <svg viewBox="0 0 448 512">
                  <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
                </svg>
              </span>
            </a>
            <a href="https://telegram.com/">
              <span className="[&>svg]:h-7 [&>svg]:w-7 [&>svg]:fill-[#0088cc]">
                <svg viewBox="0 0 496 512">
                  <path d="M248 8C111 8 0 119 0 256S111 504 248 504 496 393 496 256 385 8 248 8zM363 176.7c-3.7 39.2-19.9 134.4-28.1 178.3-3.5 18.6-10.3 24.8-16.9 25.4-14.4 1.3-25.3-9.5-39.3-18.7-21.8-14.3-34.2-23.2-55.3-37.2-24.5-16.1-8.6-25 5.3-39.5 3.7-3.8 67.1-61.5 68.3-66.7 .2-.7 .3-3.1-1.2-4.4s-3.6-.8-5.1-.5q-3.3 .7-104.6 69.1-14.8 10.2-26.9 9.9c-8.9-.2-25.9-5-38.6-9.1-15.5-5-27.9-7.7-26.8-16.3q.8-6.7 18.5-13.7 108.4-47.2 144.6-62.3c68.9-28.6 83.2-33.6 92.5-33.8 2.1 0 6.6 .5 9.6 2.9a10.5 10.5 0 0 1 3.5 6.7A43.8 43.8 0 0 1 363 176.7z" />
                </svg>
              </span>
            </a>
            <a href="https://www.linkedin.com/">
              <span className="[&>svg]:h-7 [&>svg]:w-7 [&>svg]:fill-[#0077b5]">
                <svg viewBox="0 0 448 512">
                  <path d="M100.3 448H7.4V148.9h92.9zM53.8 108.1C24.1 108.1 0 83.5 0 53.8a53.8 53.8 0 0 1 107.6 0c0 29.7-24.1 54.3-53.8 54.3zM447.9 448h-92.7V302.4c0-34.7-.7-79.2-48.3-79.2-48.3 0-55.7 37.7-55.7 76.7V448h-92.8V148.9h89.1v40.8h1.3c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.3 61.9 111.3 142.3V448z" />
                </svg>
              </span>
            </a>
          </div>
          <div className="bg-black w-[160px] h-0.5 rounded-md "></div>
          </div> */}

        {/* right bar */}
        <div
          className={`w-3/4 ${
            !(isFinishScrolled !== isScrolled) ? " ml-[25%] " : ""
          }`}
        >
          {/* about setion */}
          <BasicInformation />
          {/* skills setion */}
          <Skills />
          {/* projects setion */}
          <Projects />
        </div>
      </div>
      {/* down setion (contact) */}
      <Contacting />
    </div>
  );
}
function BasicInformation() {
  const [word, setWord] = useState("");
  const [show, setShow] = useState(false);

  const scrollToSection = (id: string) => {
    setTimeout(() => {
      const section = document.getElementById(id);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }, 0);
  };

  return (
    <div id="About" className="flex flex-col">
      <div className="h-300px fade-in flex">
        <div className="h-full w-1/4 flex justify-center items-center">
          <img
            className="h-[90%] rounded-full"
            src="/src/1000031759-removebg-preview.jpg"
            alt=""
          />
        </div>
        <div className="h-full w-3/4 flex justify-center items-center font-semibold text-5xl">
          Who is hasanain ?
        </div>
      </div>
      <div className="h-300px flex justify-center items-center">
        <p className="h-[150px] w-[70%] text-2xl fade-in">
          An electronics engineer and front-end developer currently pursuing a
          Bachelor’s degree in Electrical Engineering at the
          <a
            onClick={() => {
              scrollToSection("BasicInfoBio");
              setShow(true);
              setWord("Azad university");
            }}
            className="mx-1 info whitespace-nowrap h-fit  hover:underline "
          >
            Science and Research University
          </a>
          in
          <a
            onClick={() => {
              scrollToSection("BasicInfoBio");
              setShow(true);
              setWord("Tehran");
            }}
            className="mx-1 info text-blue-700 hover:underline"
          >
            Tehran
          </a>
          . Passionate about{" "}
          <a
            onClick={() => {
              scrollToSection("BasicInfoBio");
              setShow(true);
              setWord("analog electronics");
            }}
            className="mx-1 info text-blue-700 hover:underline"
          >
            analog electronics
          </a>{" "}
          and constantly seeking to learn and execute innovative projects to
          enhance my skills and personal knowledge. in
        </p>
      </div>
      {show && <BioExplainationBasicInfo word={word} setShow={setShow} />}
    </div>
  );
}
function BioExplainationBasicInfo({
  word,
  setShow,
}: {
  word: string;
  setShow: (bool: boolean) => void;
}) {
  const wordMap: Record<string, string> = {
    Tehran:
      "Tehran, the capital of Iran, is a bustling metropolis nestled at the foot of the Alborz Mountains. As the country’s political and economic hub, it is the largest city with a population exceeding 8 million. Tehran’s architecture is a captivating mix of traditional bazaars and modern skyscrapers. The city is rich in culture, hosting landmarks like the Golestan Palace and the Tehran Museum of Contemporary Art. Amid challenges like heavy traffic and pollution, Tehran continues to thrive, offering a dynamic lifestyle with its educational institutions, vibrant food scene, and diverse cultural festivals. Tehran is a city that beautifully intertwines its historical heritage with modern development, making it a fascinating destination.",
    "Azad university":
      "The Science and Research Branch of Tehran, part of the Islamic Azad University system, is one of Iran’s premier institutions for higher education and research. Located in the northwest of Tehran, it offers a dynamic and stimulating environment for students and faculty to engage in a wide array of academic and professional pursuits. The university provides undergraduate, master’s, and doctoral programs across diverse fields such as humanities, engineering, basic sciences, and management. Equipped with modern research facilities and laboratories, the university supports numerous research projects, enhancing students’ academic experiences and productivity. Additionally, its emphasis on international collaboration allows for meaningful academic exchanges with reputable global institutions, fostering a multicultural academic atmosphere energized by innovative teaching methods. This makes the Science and Research Branch a significant educational and research center both nationally and internationally.",
    "analog electronics":
      "Analog electronics is a branch of electronics that deals with the design and analysis of systems and circuits that operate with continuously varying signals. Unlike digital electronics, which uses binary numbers and discrete logical levels, analog systems process signals that can take on any value within a continuous range of voltage or current. Key components in analog electronics include resistors, capacitors, inductors, and transistors, which work together to perform functions such as amplification, filtering, and signal conversion. Many essential applications, such as radios, audio amplifiers, and scientific measurement instruments, rely heavily on analog circuits. Although digital systems dominate in many applications today, analog electronics still plays an indispensable role in the design and implementation of systems that require precision and the natural representation of signals.",
  };
  return (
    <div id="BasicInfoBio" className="h-250px relative">
      <div className="h-full mx-20 justify-center z-0 relative items-center flex">
        {wordMap[word]}
      </div>
      <button
        onClick={() => {
          setShow(false);
        }}
        className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 absolute top-5 right-5"
      >
        <span className="sr-only">Close menu</span>
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
}
function Skills() {
  const [word, setWord] = useState("");
  const [show, setShow] = useState(false);
  const scrollToSection = (id: string) => {
    setTimeout(() => {
      const section = document.getElementById(id);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }, 0);
  };
  return (
    <div id="skills">
      <div className="flex flex-col h-auto">
        <div className="ml-[1%] w-[98%] h-2 bg-gradient-to-r from-Cyan-200 via-black to-Cyan-200 rounded-md"></div>
        <div className="h-300px fade-in flex">
          <div className="h-full text-2xl mx-20 w-3/4 mt-16">
            I am an electronics designer with intermediate to advanced
            proficiency in
            <a
              onClick={() => {
                scrollToSection("BioExplainationSkills");
                setShow(true);
                setWord("altium");
              }}
              className="mx-1 info text-blue-700 hover:underline"
            >
              Altium Designer
            </a>
            , skilled in creating and simulating complex
            <a
              onClick={() => {
                scrollToSection("BioExplainationSkills");

                setShow(true);
                setWord("pcbs");
              }}
              className="mx-1 info text-blue-700 hover:underline"
            >
              PCBs
            </a>
            . My expertise includes ensuring industry compliance and leveraging
            Altium’s powerful features for efficient and accurate designs. I
            excel at integrating seamlessly with teams for successful project
            execution.
          </div>
          <div className="h-full w-1/4 flex justify-center items-center">
            <img
              className="h-[90%] mr-10 rounded-full"
              src="/src/altium.jpg"
              alt="Altium"
            />
          </div>
        </div>
        <div className="h-300px fade-in flex">
          <div className="h-full w-1/4  flex justify-center items-center">
            <img
              className="h-[90%] ml-10 rounded-full"
              src="/src/arduino.jpg"
              alt="Altium"
            />
          </div>
          <div className="h-full text-2xl mx-20 w-3/4 mt-16">
            Expert in{" "}
            <a
              onClick={() => {
                setShow(true);
                setWord("arduino");
                scrollToSection("BioExplainationSkills");
              }}
              className="mx-1 info text-blue-700 hover:underline"
            >
              Arduino
            </a>{" "}
            , I design and implement innovative projects, including robotics and
            IoT applications. My skills cover programming, circuit design, and
            integrating{" "}
            <a
              onClick={() => {
                scrollToSection("BioExplainationSkills");
                setShow(true);
                setWord("sensors");
              }}
              className="mx-1 info text-blue-700 hover:underline"
            >
              sensors
            </a>{" "}
            and{" "}
            <a
              onClick={() => {
                setShow(true);
                setWord("modules");
                scrollToSection("BioExplainationSkills");
              }}
              className="mx-1 info text-blue-700 hover:underline"
            >
              modules
            </a>
            . I efficiently troubleshoot and optimize projects, always staying
            updated with the latest technologies.
          </div>
        </div>
        <div className="h-300px flex fade-in">
          <div className="h-full text-2xl mx-20 w-3/4 mt-16">
            As an experienced developer in electronics and programming, I
            specialize in{" "}
            <a
              onClick={() => {
                scrollToSection("BioExplainationSkills");
                setShow(true);
                setWord("AVR");
              }}
              className="mx-1 info text-blue-700 hover:underline"
            >
              AVR microcontrollers
            </a>
            and{" "}
            <a
              onClick={() => {
                setShow(true);
                setWord("Codevision");
                scrollToSection("BioExplainationSkills");
              }}
              className="mx-1 info text-blue-700 hover:underline"
            >
              CodeVisionAVR
            </a>{" "}
            software. I design and implement advanced projects, expertly
            configuring ports, timers, and communication protocols like{" "}
            <a
              onClick={() => {
                scrollToSection("BioExplainationSkills");
                setShow(true);
                setWord("UART");
              }}
              className="mx-1 info text-blue-700 hover:underline"
            >
              UART
            </a>
            ,{" "}
            <a
              onClick={() => {
                scrollToSection("BioExplainationSkills");
                setShow(true);
                setWord("SPI");
              }}
              className="mx-1 info text-blue-700 hover:underline"
            >
              SPI
            </a>
            , and{" "}
            <a
              onClick={() => {
                scrollToSection("BioExplainationSkills");
                setShow(true);
                setWord("I2C");
              }}
              className="mx-1 info text-blue-700 hover:underline"
            >
              I2C
            </a>{" "}
            . My skills in simulation and debugging, coupled with continuous
            learning, enable me to provide efficient solutions for
            microcontroller systems.{" "}
          </div>
          <div className="h-full w-1/4 flex justify-center items-center">
            <img
              className="h-[90%] mr-10 rounded-full"
              src="/src/AVR.jpg"
              alt="َAVR micro controller"
            />
          </div>
        </div>
        <div className="h-300px flex fade-in">
          <div className="h-full w-1/4  flex justify-center items-center">
            <img
              className="h-[90%] ml-10 rounded-full"
              src="/src/Proteus.png"
              alt="Altium"
            />
          </div>
          <div className="h-full text-2xl mx-20 w-3/4 mt-16">
            I am highly skilled in using Proteus software to design, simulate,
            and analyze electronic projects. My expertise allows me to
            effectively implement complex schematics and develop printed circuit
            boards (
            <a
              onClick={() => {
                scrollToSection("BioExplainationSkills");
                setShow(true);
                setWord("pcbs");
              }}
              className="mx-1 info text-blue-700 hover:underline"
            >
              PCBs
            </a>
            ). By leveraging its simulation capabilities, I optimize and
            thoroughly test designs, contributing to innovative and professional
            electronic solutions.
          </div>
        </div>
        {show && <BioExplainationSkills word={word} setShow={setShow} />}
      </div>
    </div>
  );
}

function BioExplainationSkills({
  word,
  setShow,
}: {
  word: string;
  setShow: (bool: boolean) => void;
}) {
  const wordMap: Record<string, string> = {
    altium:
      "Altium Designer is one of the most popular and powerful tools for designing and developing electronic circuits and printed circuit boards (PCBs), allowing engineers to turn complex projects from concept to final production into reality. This software provides advanced tools for schematic design, circuit simulation, and multi-layer PCB creation, enabling users to develop efficient and optimized designs in compliance with industry standards. Among Altium Designer’s standout features are its data management capabilities and team collaboration tools, which facilitate sharing and synchronization on large projects, significantly enhancing design efficiency and accuracy. Consequently, this software is an ideal tool for professional electronics designers working across various consumer to industrial projects.",
    "Azad university":
      "The Science and Research Branch of Tehran, part of the Islamic Azad University system, is one of Iran’s premier institutions for higher education and research. Located in the northwest of Tehran, it offers a dynamic and stimulating environment for students and faculty to engage in a wide array of academic and professional pursuits. The university provides undergraduate, master’s, and doctoral programs across diverse fields such as humanities, engineering, basic sciences, and management. Equipped with modern research facilities and laboratories, the university supports numerous research projects, enhancing students’ academic experiences and productivity. Additionally, its emphasis on international collaboration allows for meaningful academic exchanges with reputable global institutions, fostering a multicultural academic atmosphere energized by innovative teaching methods. This makes the Science and Research Branch a significant educational and research center both nationally and internationally.",
    pcbs: "Printed Circuit Boards (PCBs) are fundamental to electronic devices, enabling electrical and mechanical connections among components. Made with insulating materials like fiberglass and embedded copper pathways, PCBs allow for the organized connection of elements such as resistors and microprocessors. The design and production process includes schematic creation and layering. PCBs are crucial across various applications, including consumer electronics and industrial systems, aiding in device miniaturization and efficiency while reducing connection errors and simplifying maintenance.",
    arduino:
      "Arduino is an open-source electronics platform based on easy-to-use hardware and software. It empowers students, artists, designers, and anyone interested in creating innovative electronic projects to build interactive devices. Arduino boards can read inputs—such as light on a sensor, a finger on a button, or a tweet—and turn them into outputs like activating a motor, turning on an LED, or sending a message. The Arduino programming language, which is based on C/C++, and its Integrated Development Environment (IDE) allow users to upload code to their boards with ease. Due to its simplicity, flexibility, and an extensive range of libraries, Arduino has gained significant popularity among maker communities and electronics engineers. Its applications range from building small robots to Internet of Things (IoT) devices and creative art projects.",
    sensors:
      "Electronic sensors are devices that detect and translate forms of physical energy from their surrounding environment into signals understandable by electronic systems. These sensors find applications in a wide range of fields, including industrial, research, medical, and everyday uses. Types of sensors include temperature sensors, motion sensors, light sensors, and sound sensors, each capable of detecting and processing specific data from their environment. For example, in a smart home system, temperature sensors can optimize the indoor climate by controlling the HVAC system. Advances in sensor technology, alongside the development of precise data processing tools, have enabled the creation of intelligent and interactive systems. These sensors, by combining their raw data with sophisticated algorithms, achieve optimal results in both industrial and personal processes.",
    modules:
      "Electronic modules are pre-assembled components that consist of a set of electronic parts mounted together on a board to perform a specific function. These modules act as building blocks for the development and design of circuits, assisting engineers and creators in crafting electronic projects. By using ready-made modules, users can quickly and efficiently incorporate desired capabilities into their projects without spending time designing complex components. There are various types of modules, including Wi-Fi, Bluetooth, GSM, GPS, and sensor modules. For instance, in Internet of Things (IoT) projects, Wi-Fi modules are used to connect devices to the internet. The use of these modules also reduces errors and complexity in the assembly and development process, thus accelerating and simplifying project creation. These features have made electronic modules a vital tool in rapidly innovating and advancing technology.",
    AVR: "AVR microcontrollers, originally developed by Atmel and now part of Microchip Technology, are known for their efficient performance and ease of use in embedded systems. Utilizing a modified Harvard architecture, AVRs integrate flash memory for efficient instruction execution and feature a range of peripherals, such as ADCs, PWM generators, and serial communication interfaces. They are popular in applications ranging from consumer electronics to industrial controls, supported by comprehensive development tools like Atmel Studio and a strong open-source community. AVRs provide a versatile and cost-effective solution for both professionals and hobbyists in the electronics field.",
    Codevision:
      "CodeVisionAVR is a highly regarded integrated development environment (IDE) specifically designed for programming AVR microcontrollers. Developed by HP InfoTech, this software provides a robust, user-friendly platform that caters to both beginners and experienced developers. It includes an efficient C compiler optimized for AVR architecture, which assists in generating fast and compact code. The IDE offers advanced features such as an intuitive project manager, code editor, and a range of debugging tools that streamline the development process. CodeVisionAVR also includes a powerful code generator, which simplifies the configuration of microcontroller peripherals and functionalities, thereby reducing development time and potential errors. Its detailed support for the entire range of AVR microcontrollers and seamless integration with other tools like simulators and hardware programmers makes CodeVisionAVR a versatile choice for developing a wide array of embedded applications.",
    SPI: "Serial Peripheral Interface (SPI) is a synchronous serial communication protocol primarily used for short-distance communication in embedded systems, enabling full-duplex communication between a master device and one or more slave devices. SPI operates using four main signals: MOSI (Master Out Slave In), MISO (Master In Slave Out), SCK (Serial Clock), and SS (Slave Select). The protocol doesn’t require complex run-time schemes, making it simple and efficient for high-speed communication. Unlike other protocols like I2C, SPI doesn’t have a formal standard, allowing flexibility in implementation based on project requirements. It’s widely used in scenarios where low latency and high data throughput are critical, such as data transfer between microcontrollers, sensors, memory devices, and displays. Despite its simplicity and high speed, SPI’s lack of inherent error-checking and its inability to support more extensive networks without additional control logic are considerations developers must manage.",
    UART: "The Universal Asynchronous Receiver-Transmitter (UART) is a communication protocol used for asynchronous serial data exchange between devices without a clock signal for synchronization. Instead, devices must be pre-configured to agree on data format and transmission speed, defined by settings like start bits, data bits, parity, and stop bits. UART is commonly found in low-speed, low-power applications such as interfacing with microcontrollers and GPS modules due to its simplicity and point-to-point communication capabilities. While it is straightforward to implement and cost-effective, UART can be error-prone at higher speeds if there are configuration mismatches between communicating devices. Despite these challenges, its ease of integration keeps it popular in many embedded systems applications.",
    I2C: "Inter-Integrated Circuit (I2C) is a synchronous serial communication protocol designed for easy communication between integrated circuits on the same board. Using just two wires, SDA (Serial Data) and SCL (Serial Clock), I2C supports multiple masters and slaves, allowing for efficient data transfer with minimal pin usage. This protocol is widely used in embedded systems for connecting microcontrollers with peripherals like sensors and displays. While it offers simplicity and flexibility, I2C is more suited to short-distance, lower-speed applications due to its moderate data rates and potential noise issues over longer distances. Despite these limitations, its ease of use has made it a staple in consumer electronics and industrial devices.",
  };
  return (
    <div id="BioExplainationSkills" className="h-250px relative">
      <div className="h-full mx-20 justify-center z-0 relative items-center flex">
        {wordMap[word]}
      </div>
      <button
        onClick={() => {
          setShow(false);
        }}
        className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 absolute top-5 right-5"
      >
        <span className="sr-only">Close menu</span>
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
}
function Contacting() {
  return (
    <div id="contact">
      <div className="ml-[26%] w-[73%] h-2 bg-gradient-to-r from-Cyan-200 via-black to-Cyan-200 rounded-md"></div>
      <div className=" h-[600px] w-auto  flex ml-[25%]">
        <div className="w-full  p-8 flex flex-col md:flex-row">
          <div className="md:w-1/2">
            <h1 className="text-red-600 text-sm font-semibold uppercase mb-2">
              Contact
            </h1>
            <h2 className="text-3xl font-bold text-blue-900 mb-4">
              Get In Touch
            </h2>
            <p className="text-gray-700 mb-6">
              Dropping a line to say g’day, ask for my resume or see if we can
              build something amazing together? I'd love to hear from you!
            </p>
            <p className="text-gray-700 mb-6">
              Fill in your info in the form below and I look forward to hearing
              from you!
            </p>
          </div>
          <div className="md:w-1/2 md:pl-8">
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Name*"
                className="w-full p-4 border-b-2 border-red-300 focus:border-red-500 outline-none"
                required
              />
              <input
                type="email"
                placeholder="Email*"
                className="w-full p-4 border-b-2 border-red-300 focus:border-red-500 outline-none"
                required
              />
              <textarea
                placeholder="Message*"
                className="w-full p-3 border-b-2 border-red-300 focus:border-red-500 outline-none"
                rows={6}
                required
              />
              <button
                type="submit"
                className="bg-green-200 text-green-800 font-semibold py-2 px-6 rounded hover:bg-green-300"
              >
                Send Email
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
function Projects() {
  return (
    <div id="projects" className="h-auto flex flex-col items-center">
      <div className="ml-[1%] w-[98%] h-2 bg-gradient-to-r from-Cyan-200 via-black to-Cyan-200 rounded-md"></div>
      <div className="w-1/3 flex flex-col">
        <div className="h-[300px] flex justify-center items-center">
          <img src="/src/nothing.png" className="w-[250px]" alt="Nothing" />
        </div>
        <div className="h-[300px] flex justify-center items-center text-4xl">
          No projects yet
        </div>
        {/* <div className="h-1/4 flex justify-center items-center bg-orange-300">
          Link
        </div> */}
      </div>
      {/* <div className=" w-full h-1/4 flex justify-center items-center bg-green-400">
        Info
      </div>
      <div className="w-full h-1/4 flex justify-center items-center bg-red-500">
        Info about selected word
      </div> */}
    </div>
  );
}
export default App;
