import React, { useState, useEffect } from "react";
import { useAuth } from "../../AuthContext";
import { Table, Button, Badge, Modal, Card, Row, Col } from "react-bootstrap";
import { FaInfoCircle, FaEye, FaCalendarAlt, FaMoneyBillWave, FaTruck, FaBoxOpen, FaCheckCircle, FaTimesCircle, FaClock, FaFilter } from "react-icons/fa";
import PageHeader from "../../components/Header"
import "../../Style/user/MyCommande.css";

const MyCommande = () => {
  const { auth } = useAuth(); 
  const [commandes, setCommandes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCommande, setSelectedCommande] = useState(null);
  const [stats, setStats] = useState({ total: 0, en_attente: 0, livree: 0 });
  const commandesPerPage = 10;

  useEffect(() => {
    const fetchCommandes = async () => {
      try {
        const res = await fetch(`http://localhost:3001/api/commandes/${auth.user.id}`, {
          headers: { Authorization: `Bearer ${auth.token}` },
        });
        const data = await res.json();
        setCommandes(data.reverse());
        
        // Calcul des statistiques
        const stats = {
          total: data.length,
          en_attente: data.filter(c => c.etat === "en_attente").length,
          livree: data.filter(c => c.etat === "livrée").length
        };
        setStats(stats);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (auth.user) fetchCommandes();
  }, [auth.user, auth.token]);

  // Filtrage des commandes
  const filteredCommandes = commandes.filter((c) => {
    if (filter === "all") return true;
    return c.etat === filter;
  });

  // Pagination
  const indexOfLast = currentPage * commandesPerPage;
  const indexOfFirst = indexOfLast - commandesPerPage;
  const currentCommandes = filteredCommandes.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredCommandes.length / commandesPerPage);

  // Badge selon l'état avec icônes
  const renderBadge = (etat) => {
    const config = {
      "en_attente": { variant: "secondary", icon: FaClock, label: "En attente" },
      "validée": { variant: "info", icon: FaCheckCircle, label: "Validée" },
      "en_livraison": { variant: "warning", icon: FaTruck, label: "En livraison" },
      "livrée": { variant: "success", icon: FaBoxOpen, label: "Livrée" },
      "annulée": { variant: "danger", icon: FaTimesCircle, label: "Annulée" }
    };
    
    const { variant, icon: Icon, label } = config[etat] || config.en_attente;
    
    return (
      <Badge bg={variant} className="etat-badge">
        <Icon className="me-1" />
        {label}
      </Badge>
    );
  };

  // Formatage de la date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Calcul du statut de progression
  const getProgressStatus = (etat) => {
    const steps = ["en_attente", "validée", "en_livraison", "livrée"];
    const currentStep = steps.indexOf(etat);
    return {
      currentStep: currentStep >= 0 ? currentStep : 0,
      totalSteps: steps.length
    };
  };

  if (!auth.user) return <p>Chargement de l'utilisateur...</p>;

  return (
    <div className="home_page">
      <div className="home_content Mycommande_page">
        {/* Utilisation du composant PageHeader */}
        <PageHeader 
          title="Mes Commandes" 
          description="Suivez l'état de vos commandes en temps réel"
          background="primary pattern"
        />

        <div className="commande-container">
          {loading ? (
            <div className="loading-state">
              <div className="spinner"></div>
              <p>Chargement de vos commandes...</p>
            </div>
          ) : (
            <>
              {/* Cartes de statistiques */}
              <Row className="stats-cards">
                <Col md={4}>
                  <Card className="stat-card total">
                    <Card.Body>
                      <FaMoneyBillWave className="stat-icon" />
                      <div className="stat-content">
                        <h3>{stats.total}</h3>
                        <p>Commandes totales</p>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={4}>
                  <Card className="stat-card pending">
                    <Card.Body>
                      <FaClock className="stat-icon" />
                      <div className="stat-content">
                        <h3>{stats.en_attente}</h3>
                        <p>En attente</p>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={4}>
                  <Card className="stat-card delivered">
                    <Card.Body>
                      <FaBoxOpen className="stat-icon" />
                      <div className="stat-content">
                        <h3>{stats.livree}</h3>
                        <p>Livrées</p>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>

              {/* Filtres */}
              <Card className="filters-card">
                <Card.Body>
                  <div className="filters-header">
                    <FaFilter className="me-2" />
                    <span>Filtrer par statut</span>
                  </div>
                  <div className="filters">
                    {[
                      { key: "all", label: "Toutes les commandes", count: commandes.length },
                      { key: "en_attente", label: "En attente", count: stats.en_attente },
                      { key: "validée", label: "Validées", count: commandes.filter(c => c.etat === "validée").length },
                      { key: "en_livraison", label: "En livraison", count: commandes.filter(c => c.etat === "en_livraison").length },
                      { key: "livrée", label: "Livrées", count: stats.livree },
                      { key: "annulée", label: "Annulées", count: commandes.filter(c => c.etat === "annulée").length },
                    ].map((f) => (
                      <button
                        key={f.key}
                        className={`filter-btn ${filter === f.key ? "active" : ""}`}
                        onClick={() => { setFilter(f.key); setCurrentPage(1); }}
                      >
                        <span className="filter-label">{f.label}</span>
                        <span className="filter-count">{f.count}</span>
                      </button>
                    ))}
                  </div>
                </Card.Body>
              </Card>

              {/* Liste des commandes */}
              <Card className="commandes-card">
                <Card.Body>
                  {currentCommandes.length === 0 ? (
                    <div className="empty-state">
                      <FaBoxOpen className="empty-icon" />
                      <h3>Aucune commande trouvée</h3>
                      <p>
                        {filter === "all" 
                          ? "Vous n'avez pas encore passé de commande."
                          : `Aucune commande avec le statut "${filter}".`
                        }
                      </p>
                    </div>
                  ) : (
                    <>
                      <div className="table-responsive">
                        <Table hover className="commandes-table">
                          <thead>
                            <tr>
                              <th>Commande</th>
                              <th>Date</th>
                              <th>Montant</th>
                              <th>Statut</th>
                              <th>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {currentCommandes.map((commande) => (
                              <tr key={commande.id} className="commande-row">
                                <td>
                                  <div className="commande-id">#{commande.id}</div>
                                  <small className="text-muted">
                                    {commande.items?.length || 0} article(s)
                                  </small>
                                </td>
                                <td>
                                  <div className="date-cell">
                                    <FaCalendarAlt className="me-2" />
                                    {formatDate(commande.createdAt)}
                                  </div>
                                </td>
                                <td>
                                  <div className="amount-cell">
                                    <strong>{commande.total} FCFA</strong>
                                  </div>
                                </td>
                                <td>
                                  {renderBadge(commande.etat)}
                                  <div className="progress-indicator">
                                    <div 
                                      className="progress-bar"
                                      style={{
                                        width: `${(getProgressStatus(commande.etat).currentStep / getProgressStatus(commande.etat).totalSteps) * 100}%`
                                      }}
                                    ></div>
                                  </div>
                                </td>
                                <td>
                                  <Button
                                    variant=""
                                    onClick={() => setSelectedCommande(commande)}
                                    id="detail-btn"
                                  >
                                    Détails
                                  </Button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      </div>

                      {/* Pagination */}
                      {totalPages > 1 && (
                        <div className="pagination-container">
                          <Button
                            variant="outline-primary"
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(currentPage - 1)}
                            className="pagination-btn"
                          >
                            Précédent
                          </Button>
                          
                          <div className="pagination-numbers">
                            {[...Array(totalPages)].map((_, i) => (
                              <button
                                key={i + 1}
                                className={`page-number ${currentPage === i + 1 ? 'active' : ''}`}
                                onClick={() => setCurrentPage(i + 1)}
                              >
                                {i + 1}
                              </button>
                            ))}
                          </div>

                          <Button
                            variant="outline-primary"
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage(currentPage + 1)}
                            className="pagination-btn"
                          >
                            Suivant
                          </Button>
                        </div>
                      )}
                    </>
                  )}
                </Card.Body>
              </Card>
            </>
          )}
        </div>

        {/* Modal de détails */}
        <Modal 
          show={!!selectedCommande} 
          onHide={() => setSelectedCommande(null)} 
          size="lg"
          className="commande-detail-modal modal-dialog-centered"
        >
          <Modal.Header closeButton>
            <Modal.Title>
              Commande {selectedCommande?.id}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedCommande && (
              <div className="commande-detail">
                {/* En-tête de la commande */}
                <Row className="detail-header">
                  <Col md={6}>
                    <div className="detail-item">
                      <strong>Date de commande:</strong>
                      <span>{formatDate(selectedCommande.createdAt)}</span>
                    </div>
                    <div className="detail-item">
                      <strong>Statut:</strong>
                      {renderBadge(selectedCommande.etat)}
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="detail-item">
                      <strong>Total:</strong>
                      <span className="total-amount">{selectedCommande.total} FCFA</span>
                    </div>
                    <div className="detail-item">
                      <strong>Méthode de paiement:</strong>
                      <span>{selectedCommande.paiement || "Non spécifié"}</span>
                    </div>
                  </Col>
                </Row>

                {/* Articles de la commande */}
                <div className="detail-section">
                  <h5>Articles commandés</h5>
                  {selectedCommande.items && selectedCommande.items.length > 0 ? (
                    <div className="products-list">
                      {selectedCommande.items.map((produit, idx) => (
                        <div key={idx} className="product-item">
                          <div className="product-info">
                            <div className="product-name">{produit.nom}</div>
                            <div className="product-variant">
                              {produit.options ? Object.values(produit.options).join(" / ") : "Aucune option"}
                            </div>
                          </div>
                          <div className="product-quantity">x{produit.quantite}</div>
                          <div className="product-price">{produit.prix} FCFA</div>
                          <div className="product-total">
                            {produit.quantite * produit.prix} FCFA
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted">Aucun produit dans cette commande</p>
                  )}
                </div>

                {/* Adresse de livraison */}
                {selectedCommande.adresseLivraison && (
                  <div className="detail-section">
                    <h5>Adresse de livraison</h5>
                    <div className="address-info">
                      <div>{selectedCommande.adresseLivraison.adresse}</div>
                      <div>
                        {selectedCommande.adresseLivraison.codePostal} {selectedCommande.adresseLivraison.ville}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

export default MyCommande;