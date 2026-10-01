import "./styles/Education.css";

interface EducationItem {
  course: string;
  institute: string;
  year: string;
  score: string;
  status?: string;
  highlight?: string;
}

const educationData: EducationItem[] = [
  {
    course: "Master in ML & AI",
    institute: "AlmaBetter",
    year: "2026",
    score: "Pursuing",
    status: "In Progress",
    highlight: "Specializing in Machine Learning, Deep Learning, and Advanced Data Science architectures.",
  },
  {
    course: "B.Tech Computer Science",
    institute: "Amity University",
    year: "2016 - 2021",
    score: "6.6 / 10 CGPA",
    status: "Graduated",
    highlight: "Core Computer Science, Data Structures & Algorithms, Relational Database Management Systems.",
  },
  {
    course: "Higher Secondary School",
    institute: "Shree P.V Modi Science School",
    year: "2014 - 2016",
    score: "6.2 / 10",
    status: "Completed",
    highlight: "Science & Mathematics concentration with rigorous foundation in analytical logic.",
  },
];

const Education = () => {
  return (
    <section className="education-section section-container" id="education">
      <div className="education-container">
        <h2>
          Academic <span>&</span>
          <br /> Education
        </h2>

        <div className="education-table-wrapper">
          <table className="education-table">
            <thead>
              <tr>
                <th>Course / Degree</th>
                <th>Institute</th>
                <th>Year</th>
                <th>CGPA / Score</th>
              </tr>
            </thead>
            <tbody>
              {educationData.map((item, index) => (
                <tr key={index} className="education-row">
                  <td className="education-course">
                    <span className="education-badge">{item.status}</span>
                    <h4>{item.course}</h4>
                    <p>{item.highlight}</p>
                  </td>
                  <td className="education-inst">{item.institute}</td>
                  <td className="education-year">{item.year}</td>
                  <td className="education-score">
                    <span className="score-pill">{item.score}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default Education;
