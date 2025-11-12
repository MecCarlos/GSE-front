import "../Style/common/about.css";
import i1 from "../assets/images/i1.jpg";
import i2 from "../assets/images/i1.jpg";
import i3 from "../assets/images/i1.jpg";
import { FaRocket, FaUsers, FaAward, FaHandshake, FaLightbulb, FaChartLine } from 'react-icons/fa';

export const AboutComp = () => {
  return (
    <div className="about_page">
      {/* En-tête Hero */}
      <section className="about_hero">
        <div className="hero_content">
          <h1 className="hero_title">
            Innovateurs Passionnés, 
            <span className="highlight"> Créateurs d'Opportunités</span>
          </h1>
          <p className="hero_subtitle">
            Nous transformons les idées ambitieuses en réalités concrètes grâce 
            à l'expertise, l'innovation et un engagement sans faille envers l'excellence.
          </p>
          <div className="hero_stats">
            <div className="stat_item">
              <span className="stat_number">50+</span>
              <span className="stat_label">Projets Réalisés</span>
            </div>
            <div className="stat_item">
              <span className="stat_number">15+</span>
              <span className="stat_label">Partenaires</span>
            </div>
            <div className="stat_item">
              <span className="stat_number">98%</span>
              <span className="stat_label">Satisfaction Client</span>
            </div>
          </div>
        </div>
        <div className="hero_visual">
          <div className="floating_cards">
            <div className="card card_1">
              <FaRocket className="card_icon" />
              <span>Innovation</span>
            </div>
            <div className="card card_2">
              <FaUsers className="card_icon" />
              <span>Équipe</span>
            </div>
            <div className="card card_3">
              <FaAward className="card_icon" />
              <span>Excellence</span>
            </div>
          </div>
        </div>
      </section>

      {/* Section Notre Histoire */}
      <section className="story_section">
        <div className="container">
          <div className="section_header">
            <h2>Notre Histoire</h2>
            <p>Un parcours marqué par l'innovation et la croissance</p>
          </div>
          <div className="story_timeline">
            <div className="timeline_item">
              <div className="timeline_year">2023</div>
              <div className="timeline_content">
                <h3>Fondation</h3>
                <p>Création de l'entreprise avec une vision claire : révolutionner le secteur par l'innovation technologique.</p>
              </div>
            </div>
            <div className="timeline_item">
              <div className="timeline_year">2024</div>
              <div className="timeline_content">
                <h3>Expansion</h3>
                <p>Ouverture de nouveaux marchés et diversification de nos services pour répondre à une demande croissante.</p>
              </div>
            </div>
            <div className="timeline_item">
              <div className="timeline_year">2025</div>
              <div className="timeline_content">
                <h3>Leadership</h3>
                <p>Reconnaissance en tant que leader dans notre domaine avec des solutions innovantes primées.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Mission & Vision */}
      <section className="mission_vision_section">
        <div className="container">
          <div className="mv_grid">
            {/* Mission */}
            <div className="mv_card mission_card">
              <div className="mv_icon">
                <FaRocket />
              </div>
              <h3>Notre Mission</h3>
              <p>
                Fournir des **solutions exceptionnelles** qui transcendent les attentes 
                de nos clients. Nous combinons **expertise technique**, **innovation continue** 
                et **approche centrée sur l'humain** pour créer un impact durable.
              </p>
              <div className="mv_features">
                <span className="feature">✓ Innovation</span>
                <span className="feature">✓ Qualité</span>
                <span className="feature">✓ Impact</span>
              </div>
            </div>

            {/* Vision */}
            <div className="mv_card vision_card">
              <div className="mv_icon">
                <FaChartLine />
              </div>
              <h3>Notre Vision</h3>
              <p>
                Devenir **l'acteur de référence** dans la transformation digitale, 
                en inspirant le changement et en créant un écosystème où l'innovation 
                et l'excellence deviennent la norme pour toutes nos collaborations.
              </p>
              <div className="mv_features">
                <span className="feature">✓ Leadership</span>
                <span className="feature">✓ Innovation</span>
                <span className="feature">✓ Durabilité</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Valeurs */}
      <section className="values_section">
        <div className="container">
          <div className="section_header">
            <h2>Nos Valeurs Fondamentales</h2>
            <p>Les principes qui guident chacune de nos actions</p>
          </div>
          <div className="values_grid">
            <div className="value_card">
              <div className="value_icon">
                <FaLightbulb />
              </div>
              <h4>Innovation</h4>
              <p>Nous repoussons constamment les limites du possible en explorant de nouvelles technologies et méthodologies.</p>
            </div>
            
            <div className="value_card">
              <div className="value_icon">
                <FaHandshake />
              </div>
              <h4>Confiance</h4>
              <p>Nous bâtissons des relations durables basées sur la transparence, l'intégrité et le respect mutuel.</p>
            </div>
            
            <div className="value_card">
              <div className="value_icon">
                <FaAward />
              </div>
              <h4>Excellence</h4>
              <p>Nous visons la perfection dans l'exécution et ne nous contentons jamais du statu quo.</p>
            </div>
            
            <div className="value_card">
              <div className="value_icon">
                <FaUsers />
              </div>
              <h4>Collaboration</h4>
              <p>Nous croyons en la force du travail d'équipe et de l'intelligence collective.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section Équipe */}
      <section className="team_section">
        <div className="container">
          <div className="section_header">
            <h2>Notre Équipe</h2>
            <p>Des talents passionnés réunis par une vision commune</p>
          </div>
          <div className="team_grid">
            <div className="team_member">
              <div className="member_photo">
                <img src={i1} alt="Directeur Général" />
              </div>
              <h4>Jean Dupont</h4>
              <p className="member_role">Directeur Général</p>
              <p className="member_bio">Visionnaire avec 15 ans d'expérience dans l'innovation technologique.</p>
            </div>
            
            <div className="team_member">
              <div className="member_photo">
                <img src={i2} alt="Directrice Technique" />
              </div>
              <h4>Marie Lambert</h4>
              <p className="member_role">Directrice Technique</p>
              <p className="member_bio">Expert en architecture logicielle et gestion de projets complexes.</p>
            </div>
            
            <div className="team_member">
              <div className="member_photo">
                <img src={i3} alt="Chef de Projet Innovation" />
              </div>
              <h4>Thomas Martin</h4>
              <p className="member_role">Chef de Projet Innovation</p>
              <p className="member_bio">Spécialiste en transformation digitale et stratégies d'innovation.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {/* <section className="cta_section">
        <div className="container">
          <div className="cta_content">
            <h2>Prêt à Transformer Vos Idées en Réalité ?</h2>
            <p>Rejoignez les nombreuses entreprises qui nous font confiance pour leurs projets les plus ambitieux.</p>
            <div className="cta_buttons">
              <button className="btn btn_primary">Démarrer un Projet</button>
              <button className="btn btn_secondary">Nous Contacter</button>
            </div>
          </div>
        </div>
      </section> */}
    </div>
  );
};