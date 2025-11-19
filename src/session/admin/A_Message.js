// A_Message.js
import React, { useState, useEffect } from "react";
import { API_URL } from "../../config";
import "../../Style/common/catalogue.css";
import PageHeader from "../../components/Header";
import "../../Style/admin/message.css";

export const A_Message = () => {
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    non_lus: 0,
    aujourdhui: 0,
    cette_semaine: 0
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchMessages = async (page = 1, search = "") => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${API_URL}/admin/contacts?page=${page}&limit=10&search=${search}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setMessages(data.data);
        setTotalPages(data.pagination.pages);
        setCurrentPage(data.pagination.page);
      }
    } catch (error) {
      console.error("Erreur chargement messages:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/admin/contacts-stats`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setStats(data.data);
      }
    } catch (error) {
      console.error("Erreur chargement stats:", error);
    }
  };

  useEffect(() => {
    fetchMessages();
    fetchStats();
  }, []);

  const markAsRead = async (messageId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${API_URL}/admin/contacts/${messageId}/read`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        // Mettre à jour localement
        setMessages(messages.map(msg => 
          msg.id === messageId ? { ...msg, lu: true } : msg
        ));
        
        if (selectedMessage?.id === messageId) {
          setSelectedMessage({ ...selectedMessage, lu: true });
        }
        
        // Recharger les stats
        fetchStats();
      }
    } catch (error) {
      console.error("Erreur marquer comme lu:", error);
    }
  };

  const deleteMessage = async (messageId) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer ce message ?")) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${API_URL}/admin/contacts/${messageId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        setMessages(messages.filter(msg => msg.id !== messageId));
        if (selectedMessage?.id === messageId) {
          setSelectedMessage(null);
        }
        fetchStats();
      }
    } catch (error) {
      console.error("Erreur suppression:", error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchMessages(1, searchTerm);
  };

  const handlePageChange = (page) => {
    fetchMessages(page, searchTerm);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  if (loading) {
    return (
      <div className="home_page">
        <PageHeader
          title="Messages"
          description="Découvrez les préoccupations des utilisateurs"
          background="primary pattern"
        />
        <div className="loading">Chargement des messages...</div>
      </div>
    );
  }

  return (
    <div className="home_page">
      <PageHeader
        title="Messages"
        description="Découvrez les préoccupations des utilisateurs"
        background="primary pattern"
      />

      <div className="messages-container">
        {/* Statistiques */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-number">{stats.total}</div>
            <div className="stat-label">Total Messages</div>
          </div>
          <div className="stat-card unread">
            <div className="stat-number">{stats.non_lus}</div>
            <div className="stat-label">Non Lus</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{stats.aujourdhui}</div>
            <div className="stat-label">Aujourd'hui</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{stats.cette_semaine}</div>
            <div className="stat-label">Cette Semaine</div>
          </div>
        </div>

        {/* Barre de recherche */}
        <form onSubmit={handleSearch} className="search-bar">
          <input
            type="text"
            placeholder="Rechercher par nom, email ou objet..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-btn">
            🔍
          </button>
        </form>

        <div className="messages-layout">
          {/* Liste des messages */}
          <div className="messages-list">
            <h3>Messages reçus ({messages.length})</h3>
            
            {messages.length === 0 ? (
              <div className="no-messages">
                Aucun message trouvé
              </div>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={`message-item ${!message.lu ? "unread" : ""} ${
                    selectedMessage?.id === message.id ? "selected" : ""
                  }`}
                  onClick={() => {
                    setSelectedMessage(message);
                    if (!message.lu) {
                      markAsRead(message.id);
                    }
                  }}
                >
                  <div className="message-header">
                    <div className="message-sender">
                      <strong>{message.nom}</strong>
                      <span className="message-email">{message.email}</span>
                    </div>
                    <div className="message-meta">
                      <span className="message-date">
                        {formatDate(message.date_envoi)}
                      </span>
                      {!message.lu && <span className="unread-badge">Nouveau</span>}
                    </div>
                  </div>
                  
                  <div className="message-subject">{message.objet}</div>
                  <div className="message-preview">
                    {message.message.substring(0, 100)}...
                  </div>
                  
                  <div className="message-actions">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteMessage(message.id);
                      }}
                      className="btn-delete"
                      title="Supprimer"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="pagination">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  ← Précédent
                </button>
                
                <span>
                  Page {currentPage} sur {totalPages}
                </span>
                
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Suivant →
                </button>
              </div>
            )}
          </div>

          {/* Détails du message sélectionné */}
          <div className="message-details">
            {selectedMessage ? (
              <div className="message-detail-card">
                <div className="detail-header">
                  <h3>{selectedMessage.objet}</h3>
                  <div className="detail-actions">
                    <button
                      onClick={() => deleteMessage(selectedMessage.id)}
                      className="btn-delete"
                    >
                      Supprimer
                    </button>
                  </div>
                </div>

                <div className="sender-info">
                  <div>
                    <strong>De:</strong> {selectedMessage.nom}
                  </div>
                  <div>
                    <strong>Email:</strong>{" "}
                    <a href={`mailto:${selectedMessage.email}`}>
                      {selectedMessage.email}
                    </a>
                  </div>
                  <div>
                    <strong>Date:</strong> {formatDate(selectedMessage.date_envoi)}
                  </div>
                  {selectedMessage.date_lecture && (
                    <div>
                      <strong>Lu le:</strong> {formatDate(selectedMessage.date_lecture)}
                    </div>
                  )}
                </div>

                <div className="message-content">
                  <h4>Message:</h4>
                  <div className="content-text">
                    {selectedMessage.message}
                  </div>
                </div>

                {/* <div className="technical-info">
                  <h4>Informations techniques:</h4>
                  <div>
                    <strong>IP:</strong> {selectedMessage.ip}
                  </div>
                  <div>
                    <strong>User Agent:</strong> {selectedMessage.user_agent}
                  </div>
                </div> */}
              </div>
            ) : (
              <div className="no-selection">
                <div className="no-selection-icon">📨</div>
                <h3>Sélectionnez un message</h3>
                <p>Cliquez sur un message dans la liste pour afficher son contenu</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};