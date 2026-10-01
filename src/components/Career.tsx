import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container" id="career">
      <div className="career-container">
        <h2>
          Experience <span>&</span>
          <br /> Internships
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Project Manager</h4>
                <h5>Gurukul Business Consultancy</h5>
              </div>
              <h3>2025 - 2026</h3>
            </div>
            <p>
              Analyzed 50K+ transactions, improving operational efficiency by 20%. Developed 5 KPI dashboards and 15+ SOPs, accelerating data delivery by 30%.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Assistant Manager</h4>
                <h5>Cafe Coffee Day Global Ltd</h5>
              </div>
              <h3>2024 - 2025</h3>
            </div>
            <p>
              Analyzed 10K+ monthly sales records, improving inventory tracking and reducing wastage by 24%. Automated daily and monthly inventory reports to minimize stock losses.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Laravel Developer</h4>
                <h5>Next Generation Technologies</h5>
              </div>
              <h3>2022 - 2023</h3>
            </div>
            <p>
              Engineered backend APIs and optimized MySQL queries, boosting query performance by 40% for high-volume requests. Achieved a 95% enterprise client satisfaction rate.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Jr. Developer (Intern)</h4>
                <h5>Next Generation Technologies</h5>
              </div>
              <h3>2021 - 2022</h3>
            </div>
            <p>
              Gathered and analyzed client requirements to define project scope and recommend efficient development solutions. Assisted in full-stack web application development.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
