import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Badge, Modal } from "react-bootstrap";
import { FaInfoCircle } from "react-icons/fa";
import "../../Style/admin/commande.css";

export const A_Commande = () => {
  const [commandes, setCommandes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCommande, setSelectedCommande] = useState(null);
  const commandesPerPage = 10;

  useEffect(() => {
    const fetchCommandes = async () => {
      try {
        const res = await axios.get("http://localhost:3001/api/admin/get-commandes");
        setCommandes(res.data.reverse());
      } catch (err) {
        console.error("Erreur chargement commandes :", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCommandes();
  }, []);

  const updateEtat = async (id, nouvelEtat) => {
    try {
      await axios.put(`http://localhost:3001/api/commandes/${id}`, { etat: nouvelEtat });
      setCommandes(prev =>
        prev.map(c => (c.id === id ? { ...c, etat: nouvelEtat } : c))
      );
    } catch (err) {
      console.error("Erreur modification état :", err);
    }
  };

  const renderBadge = (etat) => {
    let variant = "secondary";
    if (etat === "validée") variant = "info";
    else if (etat === "en_livraison") variant = "warning";
    else if (etat === "livrée") variant = "success";
    else if (etat === "annulée") variant = "danger";
    else if (etat === "en_attente") variant = "secondary";
    return <Badge bg={variant} className="etat-badge">{etat.replace("_", " ")}</Badge>;
  };

  const filteredCommandes = filter === "all" ? commandes : commandes.filter(c => c.etat === filter);

  // Pagination
  const indexOfLast = currentPage * commandesPerPage;
  const indexOfFirst = indexOfLast - commandesPerPage;
  const currentCommandes = filteredCommandes.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredCommandes.length / commandesPerPage);

  if (loading) return <p>Chargement des commandes...</p>;

  return (
    <div className="home_page">
      <div className="home_content" className="cmd-adm">
        <header>
          <h1>Gestion des Commandes</h1>
        </header>

        {/* Filtre par état */}
        <div className="filters">
          {[
            { key: "all", label: "Toutes" },
            { key: "en_attente", label: "En attente" },
            { key: "validée", label: "Validée" },
            { key: "en_livraison", label: "En livraison" },
            { key: "livrée", label: "Livrée" },
            { key: "annulée", label: "Annulée" },
          ].map(f => (
            <button
              key={f.key}
              className={`filter-btn ${filter === f.key ? "active" : ""}`}
              onClick={() => { setFilter(f.key); setCurrentPage(1); }}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Tableau */}
        <div className="table-container">
          <Table hover responsive className="styled-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Client</th>
                <th>Total</th>
                <th>État</th>
                <th>Actions</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {currentCommandes.length === 0 ? (
                <tr>
                  <td colSpan="5" style={{ textAlign: "center" }}>Aucune commande à afficher</td>
                </tr>
              ) : (
                currentCommandes.map(c => (
                  <tr key={c.id}>
                    <td>{c.id}</td>
                    <td>{c.client?.nom} ({c.client?.email})</td>
                    <td className="total">{c.total} FCFA</td>
                    <td>{renderBadge(c.etat)}</td>
                    <td className="act_box">
                      {c.etat === "en_attente" && (
                        <Button className="act_btn" variant="success" size="sm" onClick={() => updateEtat(c.id, "validée")}>
                          Valider
                        </Button>
                      )}
                      {c.etat === "validée" && (
                        <Button className="act_btn" variant="warning" size="sm" onClick={() => updateEtat(c.id, "en_livraison")}>
                          Livraison
                        </Button>
                      )}
                      
                      {c.etat !== "annulée" && c.etat !== "livrée" && (
                        <Button className="act_btn" variant="danger" size="sm" onClick={() => updateEtat(c.id, "annulée")}>
                          Annuler
                        </Button>
                      )}
                      {c.etat === "en_livraison" && (
                        <Button className="act_btn" variant="success" size="sm" onClick={() => updateEtat(c.id, "livrée")}>
                          Livrée
                        </Button>
                      )}
                    </td>
                    <td className="">
                      <Button variant="info" size="sm" onClick={() => setSelectedCommande(c)}>
                        <FaInfoCircle /> Détails
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
            <Button disabled={currentPage === 1} onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}>⬅ Précédent</Button>
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
            <Button disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}>Suivant ➡</Button>
          </div>
        )}

        {/* Modal détails */}
        <Modal show={!!selectedCommande} onHide={() => setSelectedCommande(null)} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Commande {selectedCommande?.id}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedCommande && (
              <>
                <p><strong>Client :</strong> {selectedCommande.client?.nom} ({selectedCommande.client?.email})</p>
                <p><strong>Adresse :</strong> {selectedCommande.adresseLivraison?.adresse}, {selectedCommande.adresseLivraison?.ville}, {selectedCommande.adresseLivraison?.codePostal}</p>
                <p><strong>Paiement :</strong> {selectedCommande.paiement}</p>
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
                    {selectedCommande.items && selectedCommande.items.length > 0 ? (
                      selectedCommande.items.map((p, idx) => (
                        <tr key={idx}>
                          <td>{p.nom}</td>
                          <td>{p.options ? Object.values(p.options).join(" / ") : "-"}</td>
                          <td>{p.quantite}</td>
                          <td>{p.prix} FCFA</td>
                          <td>{p.quantite * p.prix} FCFA</td>
                        </tr>
                      ))
                    ) : (
                      <tr><td colSpan="5" style={{ textAlign: 'center' }}>Aucun produit trouvé</td></tr>
                    )}
                  </tbody>
                </Table>
                <p><strong>Total :</strong> {selectedCommande.total} FCFA</p>
              </>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => setSelectedCommande(null)}>Fermer</Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};
