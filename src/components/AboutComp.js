import "../Style/common/about.css";
import i1 from "../assets/images/gildas.png";
// import i2 from "../assets/images/i1.jpg";
// import i3 from "../assets/images/i1.jpg";
import { FaShippingFast, FaHeadset, FaShieldAlt, FaAward, FaUsers, FaChartLine, FaRecycle, FaHeart } from 'react-icons/fa';

export const AboutComp = () => {
  return (
    <div className="about-ecommerce">
      {/* En-tête Hero */}
      <section className="about-hero">
        <div className="about-hero-content">
          <h1 className="about-hero-title">
            Votre Partenaire 
            <span className="about-hero-highlight"> E-Commerce de Confiance</span>
          </h1>
          <p className="about-hero-subtitle">
            Découvrez une expérience shopping exceptionnelle avec des produits de qualité, 
            une livraison express et un service client dédié.
          </p>
          {/* <div className="about-hero-stats">
            <div className="about-stat-item">
              <span className="about-stat-number">0.5K+</span>
              <span className="about-stat-label">Clients Satisfaits</span>
            </div>
            <div className="about-stat-item">
              <span className="about-stat-number">1K+</span>
              <span className="about-stat-label">Produits</span>
            </div>
            <div className="about-stat-item">
              <span className="about-stat-number">24h</span>
              <span className="about-stat-label">Livraison Express</span>
            </div>
            <div className="about-stat-item">
              <span className="about-stat-number">98%</span>
              <span className="about-stat-label">Satisfaction</span>
            </div>
          </div> */}
        </div>
        <div className="about-hero-visual">
          <div className="about-floating-cards">
            <div className="about-card about-card-1">
              <FaShippingFast className="about-card-icon" />
              <span>Livraison Rapide</span>
            </div>
            <div className="about-card about-card-3">
              <FaShieldAlt className="about-card-icon" />
              <span>Paiement Sécurisé</span>
            </div>
            <div className="about-card about-card-2">
              <FaHeadset className="about-card-icon" />
              <span>Support 24/7</span>
            </div>
            
          </div>
        </div>
      </section>

      {/* Section Notre Histoire */}
      <section className="about-story-section">
        <div className="about-container">
          <div className="about-section-header">
            <h2>Notre Histoire</h2>
            <p>De petites débuts à une plateforme e-commerce de référence</p>
          </div>
          <div className="about-story-timeline">
            <div className="about-timeline-item">
              <div className="about-timeline-year">2020</div>
              <div className="about-timeline-content">
                <h3>Lancement</h3>
                <p>Création de notre boutique en ligne avec une sélection soignée de produits authentiques et durables.</p>
              </div>
            </div>
            <div className="about-timeline-item">
              <div className="about-timeline-year">2022</div>
              <div className="about-timeline-content">
                <h3>Expansion</h3>
                <p>Élargissement de notre catalogue et mise en place de la livraison express dans toute la France.</p>
              </div>
            </div>
            <div className="about-timeline-item">
              <div className="about-timeline-year">2024</div>
              <div className="about-timeline-content">
                <h3>Innovation</h3>
                <p>Lancement de notre application mobile et intégration de nouvelles technologies de paiement sécurisé.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Mission & Vision */}
      <section className="about-mission-section">
        <div className="about-container">
          <div className="about-mission-grid">
            <div className="about-mission-card">
              <div className="about-mission-icon">
                <FaShippingFast />
              </div>
              <h3>Notre Mission</h3>
              <p>
                Rendre le shopping en ligne <strong>simple, sécurisé et agréable</strong> pour tous. 
                Nous nous engageons à proposer des produits de qualité, une livraison rapide 
                et un service client d'exception à chaque étape de votre expérience.
              </p>
              <div className="about-mission-features">
                <span className="about-feature">✓ Qualité Premium</span>
                <span className="about-feature">✓ Livraison Express</span>
                <span className="about-feature">✓ Service Client</span>
              </div>
            </div>

            <div className="about-vision-card">
              <div className="about-vision-icon">
                <FaChartLine />
              </div>
              <h3>Notre Vision</h3>
              <p>
                Devenir <strong>la plateforme e-commerce préférée</strong> des consommateurs en 
                redéfinissant les standards du commerce en ligne grâce à l'innovation 
                technologique et un engagement sans faille envers la satisfaction client.
              </p>
              <div className="about-vision-features">
                <span className="about-feature">✓ Innovation</span>
                <span className="about-feature">✓ Confiance</span>
                <span className="about-feature">✓ Croissance</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Valeurs */}
      <section className="about-values-section">
        <div className="about-container">
          <div className="about-section-header">
            <h2>Nos Engagements</h2>
            <p>Les principes qui guident chacune de nos actions</p>
          </div>
          <div className="about-values-grid">
            <div className="about-value-card">
              <div className="about-value-icon">
                <FaShieldAlt />
              </div>
              <h4>Sécurité</h4>
              <p>Paiements 100% sécurisés et protection de vos données personnelles avec chiffrement de bout en bout.</p>
            </div>
            
            <div className="about-value-card">
              <div className="about-value-icon">
                <FaShippingFast />
              </div>
              <h4>Livraison Express</h4>
              <p>Expédition sous 24h et livraison rapide partout en France avec suivi en temps réel.</p>
            </div>
            
            <div className="about-value-card">
              <div className="about-value-icon">
                <FaHeadset />
              </div>
              <h4>Support Premium</h4>
              <p>Équipe dédiée disponible 7j/7 par chat, email et téléphone pour répondre à vos questions.</p>
            </div>
            
            <div className="about-value-card">
              <div className="about-value-icon">
                <FaAward />
              </div>
              <h4>Qualité Garantie</h4>
              <p>Sélection rigoureuse de produits et satisfaction garantie avec retour facile sous 30 jours.</p>
            </div>

            <div className="about-value-card">
              <div className="about-value-icon">
                <FaRecycle />
              </div>
              <h4>Éco-responsable</h4>
              <p>Emballages recyclables et partenaires engagés dans une démarche environnementale responsable.</p>
            </div>

            <div className="about-value-card">
              <div className="about-value-icon">
                <FaHeart />
              </div>
              <h4>Passion du Service</h4>
              <p>Notre équipe passionnée s'engage à vous offrir la meilleure expérience client possible.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section Équipe */}
      <section className="about-team-section">
        <div className="about-container">
          <div className="about-section-header">
            <h2>Responsable</h2>
            <p>Une personne passionnés dédiés à votre satisfaction</p>
          </div>
          <div className="about-team-grid">
            <div className="about-team-member">
              <div className="about-member-photo">
                <img src={i1} alt="Directrice Générale" />
                <div className="about-member-overlay">
                  {/* <div className="about-member-social">
                    <span>📧</span>
                    <span>💼</span>
                    <span>📱</span>
                  </div> */}
                </div>
              </div>
              <h4>Quenum Gildas</h4>
              {/* <p className="about-member-role">Directrice Générale</p> */}
              <p className="about-member-bio">PDG d'<>Olatech Coopoation</>, a votre services.</p>
            </div>
            
            {/* <div className="about-team-member">
              <div className="about-member-photo">
                <img src={i2} alt="Responsable Logistique" />
                <div className="about-member-overlay">
                  <div className="about-member-social">
                    <span>📧</span>
                    <span>💼</span>
                    <span>📱</span>
                  </div>
                </div>
              </div>
              <h4>Thomas Leroy</h4>
              <p className="about-member-role">Responsable Logistique</p>
              <p className="about-member-bio">Expert en supply chain et optimisation des livraisons.</p>
            </div>
             */}

            {/* <div className="about-team-member">
              <div className="about-member-photo">
                <img src={i3} alt="Responsable Service Client" />
                <div className="about-member-overlay">
                  <div className="about-member-social">
                    <span>📧</span>
                    <span>💼</span>
                    <span>📱</span>
                  </div>
                </div>
              </div>
              <h4>Laura Petit</h4>
              <p className="about-member-role">Responsable Service Client</p>
              <p className="about-member-bio">Passionnée par l'expérience client et la satisfaction.</p>
            </div> */}
          </div>
        </div>
      </section>

      {/* Section CTA */}
      {/* <section className="about-cta-section">
        <div className="about-container">
          <div className="about-cta-content">
            <h2>Prêt à Découvrir Notre Univers ?</h2>
            <p>Rejoignez des milliers de clients satisfaits et vivez une expérience shopping exceptionnelle</p>
            <div className="about-cta-buttons">
              <button className="about-btn about-btn-primary">Découvrir nos produits</button>
              <button className="about-btn about-btn-secondary">Nous contacter</button>
            </div>
          </div>
        </div>
      </section> */}
    </div>
  );
};