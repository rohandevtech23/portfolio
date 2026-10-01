import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

interface ProjectItem {
  id: string;
  name: string;
  category: string;
  tools: string;
  description: string;
  image: string;
  link: string;
}

const projectsData: ProjectItem[] = [
  {
    id: "01",
    name: "Enterprise AI Assistant & Search",
    category: "Generative AI & RAG",
    tools: "Python, FastAPI, LangChain, RAG, ChromaDB, SQL, Next.js",
    description:
      "Architected a RAG semantic search pipeline over 15+ enterprise docs, optimizing 50K+ ChromaDB embeddings for sub-200ms latency across 500+ concurrent users.",
    image: "/images/enterprise_ai_search.jpg",
    link: "https://github.com/rohandevtech23",
  },
  {
    id: "02",
    name: "Educational Video Analytics QA",
    category: "AI Video Analytics & NLP",
    tools: "Python, FastAPI, LangChain, ChromaDB, OpenAI, Whisper",
    description:
      "Automated an ETL audio pipeline across 100+ lecture hours achieving 95% transcription accuracy via Whisper. Partitioned into 1K+ vector chunks in ChromaDB.",
    image: "/images/video_rag_analytics.jpg",
    link: "https://github.com/rohandevtech23",
  },
  {
    id: "03",
    name: "Airbnb Market Demand Dashboard",
    category: "EDA & Market Analytics",
    tools: "Python, Power BI, Pandas, Matplotlib, Seaborn",
    description:
      "Extracted actionable pricing insights via EDA on 25K+ property listings. Visualized market demand distributions in Matplotlib and Power BI across 12 target regions.",
    image: "/images/airbnb_market_demand.jpg",
    link: "https://github.com/rohandevtech23",
  },
  {
    id: "04",
    name: "Banking Loan Analytics Dashboard",
    category: "Financial BI & KPI Analytics",
    tools: "Python, Power BI, Pandas, Matplotlib, Excel, SQL, DAX",
    description:
      "Analyzed 200K+ loan records and built interactive KPI cards and trend dashboards to track lending KPIs, good/bad loans, regional performance, and funding trends.",
    image: "/images/banking_loan_dashboard.jpg",
    link: "https://github.com/rohandevtech23",
  },
];

const Work = () => {
  useGSAP(() => {
    const workFlex = document.querySelector(".work-flex") as HTMLElement;
    const workContainer = document.querySelector(".work-container") as HTMLElement;
    if (!workFlex || !workContainer) return;

    function getTranslateDistance() {
      const boxes = Array.from(document.querySelectorAll(".work-box")) as HTMLElement[];
      const container = document.querySelector(".work-container") as HTMLElement;
      if (!boxes.length || !container) return 1600;
      const lastBox = boxes[boxes.length - 1];
      const totalWidth = lastBox.offsetLeft + lastBox.offsetWidth;
      const containerWidth = container.clientWidth;
      const dist = totalWidth - containerWidth + 80;
      return Math.max(dist, 1000);
    }

    let timeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".work-section",
        start: "top top",
        end: () => `+=${getTranslateDistance() + 350}`,
        scrub: 1,
        pin: true,
        pinSpacing: true,
        pinType: !ScrollTrigger.isTouch ? "transform" : "fixed",
        anticipatePin: 1,
        invalidateOnRefresh: true,
        id: "work",
      },
    });

    timeline.to(".work-flex", {
      x: () => -getTranslateDistance(),
      ease: "none",
    });

    const handleResize = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", handleResize);

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", handleResize);
      timeline.kill();
      ScrollTrigger.getById("work")?.kill();
    };
  }, []);
  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          Featured <span>Projects</span>
        </h2>
        <div className="work-flex">
          {projectsData.map((project) => (
            <div className="work-box" key={project.id}>
              <div className="work-info">
                <div className="work-title">
                  <h3>{project.id}</h3>

                  <div>
                    <h4>{project.name}</h4>
                    <p>{project.category}</p>
                  </div>
                </div>
                <h4>Tools and features</h4>
                <p>{project.tools}</p>
                <p style={{ marginTop: "12px", fontSize: "14px", lineHeight: "1.4", color: "#c8c6d1" }}>
                  {project.description}
                </p>
              </div>
              <WorkImage image={project.image} alt={project.name} link={project.link} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
