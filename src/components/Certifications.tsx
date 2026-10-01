import { MdArrowOutward, MdVerified } from "react-icons/md";
import "./styles/Certifications.css";

interface CertItem {
  title: string;
  issuer: string;
  date: string;
  link?: string;
  tag: string;
}

const certificationsData: CertItem[] = [
  {
    title: "Full Stack Web Developer",
    issuer: "Coding Ninjas",
    date: "Feb 2022",
    link: "https://drive.google.com/drive/folders/1GLQiufQk-fKsfbNdF8swaA5Rxdjbl45a?usp=sharing",
    tag: "Full Stack",
  },
  {
    title: "Jr. Developer Certification",
    issuer: "Next Generation Technologies",
    date: "Mar 2022",
    tag: "Engineering",
  },
  {
    title: "Laravel Backend Developer",
    issuer: "Next Generation Technologies",
    date: "Sep 2023",
    tag: "Backend & DB",
  },
  {
    title: "Project Manager Certification",
    issuer: "Gurukul Business Consultancy",
    date: "Mar 2026",
    tag: "Management",
  },
  {
    title: "Data Analyst Certification",
    issuer: "AlmaBetter",
    date: "Sep 2026",
    tag: "Data Analytics",
  },
];

const Certifications = () => {
  return (
    <div className="certs-section section-container" id="certs">
      <div className="certs-container">
        <h2>
          Online <span>&</span>
          <br /> Certifications
        </h2>

        <div className="certs-grid">
          {certificationsData.map((cert, index) => (
            <div className="cert-card" key={index}>
              <div className="cert-card-top">
                <span className="cert-tag">{cert.tag}</span>
                <span className="cert-date">{cert.date}</span>
              </div>
              <div className="cert-card-body">
                <div className="cert-icon">
                  <MdVerified />
                </div>
                <div>
                  <h3>{cert.title}</h3>
                  <h4>{cert.issuer}</h4>
                </div>
              </div>
              {cert.link && (
                <a
                  href={cert.link}
                  target="_blank"
                  rel="noreferrer"
                  className="cert-link"
                  data-cursor="disable"
                >
                  View Credential <MdArrowOutward />
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Certifications;
