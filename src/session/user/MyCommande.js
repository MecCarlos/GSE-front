import React, { useState, useEffect } from "react";
import { useAuth } from "../../AuthContext";
import { Table, Button, Badge, Modal } from "react-bootstrap";
import { FaInfoCircle } from "react-icons/fa";
import "../../Style/user/MyCommande.css";

const MyCommande = () => {
  const { auth } = useAuth();
  const [commandes, setCommandes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const commandesPerPage = 20; // 20 commandes par page
  const [selectedCommande, setSelectedCommande] = useState(null);

  useEffect(() => {
    const fetchCommandes = async () => {
      try {
        const res = await fetch(`http://localhost:3001/api/commandes/${auth.user.id}`, {
          headers: { Authorization: `Bearer ${auth.token}` },
        });
        const data = await res.json();
        setCommandes(data.reverse());
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (auth.user) fetchCommandes();
  }, [auth.user, auth.token]);

  if (!auth.user) return <p>Chargement de l'utilisateur...</p>;
  if (loading) return <p>Chargement des commandes...</p>;

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

  // Badge selon l'état
  const renderBadge = (etat) => {
    let variant = "secondary";
    if (etat === "validée") variant = "info";
    else if (etat === "en_livraison") variant = "warning";
    else if (etat === "livrée") variant = "success";
    else if (etat === "annulée") variant = "danger";
    else if (etat === "en_attente") variant = "secondary";
    return <Badge bg={variant} className="etat-badge">{etat.replace("_", " ")}</Badge>;
  };

  return (
    <div className="home_page">
      <div className="home_content Mycommande_page">
        <header>
          <h2 className="mb-4 text-center">Mes commandes</h2>
        </header>

        <div className="content-section">
          {/* Filtre par état */}
          <div className="filters">
            {[
              { key: "all", label: "Toutes" },
              { key: "en_attente", label: "En attente" },
              { key: "validée", label: "Validée" },
              { key: "en_livraison", label: "En livraison" },
              { key: "livrée", label: "Livrée" },
              { key: "annulée", label: "Annulée" },
            ].map((f) => (
              <button
                key={f.key}
                className={`filter-btn ${filter === f.key ? "active" : ""}`}
                onClick={() => { setFilter(f.key); setCurrentPage(1); }}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Tableau des commandes */}
          <div className="table-container">
            <Table hover responsive className="styled-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Date</th>
                  <th>Total</th>
                  <th>État</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {currentCommandes.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center">Aucune commande à afficher</td>
                  </tr>
                ) : (
                  currentCommandes.map((c) => (
                    <tr key={c.id}>
                      <td>{c.id}</td>
                      <td>{new Date(c.createdAt).toLocaleDateString()}</td>
                      <td className="total">{c.total} FCFA</td>
                      <td>{renderBadge(c.etat)}</td>
                      <td>
                        <Button
                          variant="info"
                          size="sm"
                          onClick={() => setSelectedCommande(c)}
                        >
                          <FaInfoCircle /> Voir détails
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="pagination-container">
              <Button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              >
                ⬅ Précédent
              </Button>
              {[...Array(totalPages)].map((_, i) => (
                <Button
                  key={i}
                  className={currentPage === i + 1 ? "active" : ""}
                  variant={currentPage === i + 1 ? "primary" : "outline-primary"}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </Button>
              ))}
              <Button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              >
                Suivant ➡
              </Button>
            </div>
          )}

          {/* Modal détails */}
          <Modal show={!!selectedCommande} onHide={() => setSelectedCommande(null)} size="lg">
            <Modal.Header>
              <Modal.Title>Commande {selectedCommande?.id}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {selectedCommande?.items && selectedCommande.items.length > 0 ? (
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Produit</th>
                      <th>Options</th>
                      <th>Quantité</th>
                      <th>Prix</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedCommande.items.map((p, idx) => (
                      <tr key={idx}>
                        <td>{p.nom}</td>
                        <td>{p.options ? Object.values(p.options).join(" / ") : "-"}</td>
                        <td>{p.quantite}</td>
                        <td>{p.prix} FCFA</td>
                        <td>{p.quantite * p.prix} FCFA</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <p>Aucun produit</p>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={() => setSelectedCommande(null)}>Fermer</Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default MyCommande;
