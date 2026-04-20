import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          Experience <span>&</span>
          <br /> Education
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Independent Data Analytics Consultant</h4>
                <h5>Freelance</h5>
              </div>
              <h3>2024 - NOW</h3>
            </div>
            <p>
              Delivered end-to-end data storytelling across self-initiated analytics projects, translating raw datasets into actionable business insights using Power BI, Python, and Excel. Implemented EDA and descriptive analytics frameworks across health and retail domains.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>B.Tech CSE (Data Science)</h4>
                <h5>Bennett University</h5>
              </div>
              <h3>2022 - 2026</h3>
            </div>
            <p>
              Pursuing Bachelor of Technology in Computer Science Engineering with a specialization in Data Science. Current GPA: 7.7/10. Active participant in data science and analytics projects.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Professional Certifications</h4>
                <h5>Coursera & Microsoft Learn</h5>
              </div>
              <h3>2024</h3>
            </div>
            <p>
              • IBM Machine Learning Professional Certificate (IBM / Coursera)<br/>
              • Microsoft Data Analyst Career Path (Microsoft Learn)<br/>
              • Algorithmic Toolbox (UC San Diego / Coursera)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
