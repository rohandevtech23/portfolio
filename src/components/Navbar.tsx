import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { MdPhone, MdEmail, MdArrowOutward } from "react-icons/md";
import { FaLinkedinIn } from "react-icons/fa6";
import "./styles/Navbar.css";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);
export let smoother: ScrollSmoother;

const Navbar = () => {
  useEffect(() => {
    smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 0.8,
      speed: 1,
      effects: true,
      autoResize: true,
      ignoreMobileResize: true,
    });

    smoother.scrollTop(0);
    smoother.paused(true);

    ScrollTrigger.refresh();

    window.addEventListener("resize", () => {
      ScrollSmoother.refresh(true);
    });
  }, []);

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      if (smoother && window.innerWidth > 1024) {
        smoother.scrollTo("#contact", true, "top top");
      } else {
        contactSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <>
      <div className="header">
        <a href="/#" className="navbar-brand" data-cursor="disable">
          <span className="navbar-title">ROHAN BHESARA</span>
          <span className="navbar-subtitle">Data Analyst & Scientist</span>
        </a>

        <div className="header-contacts">
          <a
            href="tel:+918452972354"
            className="header-contact-item header-phone"
            data-cursor="disable"
            title="Call +91 84529 72354"
          >
            <MdPhone />
            <span>+91 84529 72354</span>
          </a>

          <a
            href="mailto:rohan.devtech23@gmail.com"
            className="header-contact-item header-email"
            data-cursor="disable"
            title="Email rohan.devtech23@gmail.com"
          >
            <MdEmail />
            <span>rohan.devtech23@gmail.com</span>
          </a>

          <a
            href="https://linkedin.com/in/rohan-bhesara/"
            target="_blank"
            rel="noreferrer"
            className="header-contact-item header-linkedin"
            data-cursor="disable"
            title="LinkedIn Profile"
          >
            <FaLinkedinIn />
            <span>LinkedIn</span>
            <MdArrowOutward className="external-arrow" />
          </a>

          <button
            onClick={handleContactClick}
            className="header-contact-btn"
            data-cursor="disable"
          >
            Contact Me
          </button>
        </div>
      </div>

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;
