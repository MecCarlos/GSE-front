import "../Style/common/about.css";

export const AboutComp = () => {
  return (
    <div className="about_page">
           <section className="about_content">
        <div className="about_text">
          <h2>Notre mission</h2>
          <p>
            Nous nous engageons à fournir les meilleures solutions à nos clients
            en combinant innovation, expertise et passion.
          </p>

          <h2>Notre vision</h2>
          <p>
            Être un acteur majeur de la transformation digitale et accompagner
            nos partenaires dans leur réussite.
          </p>
        </div>

        <div className="about_image">
          <img
            src="/images/team.jpg"
            alt="Notre équipe"
          />
        </div>
      </section>

    </div>
  );
};
