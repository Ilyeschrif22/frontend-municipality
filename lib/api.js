const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  // Méthode générique pour les requêtes HTTP
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const token = this.getToken();
    
    const defaultHeaders = {
      'Content-Type': 'application/json',
    };

    if (token) {
      defaultHeaders['Authorization'] = `Bearer ${token}`;
    }

    const config = {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      // Pour les réponses vides (DELETE, etc.)
      if (response.status === 204) {
        return null;
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Gestion du token JWT
  getToken() {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('authToken');
    }
    return null;
  }

  setToken(token) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('authToken', token);
    }
  }

  removeToken() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('authToken');
    }
  }

  // === AUTHENTIFICATION ===
  async login(credentials) {
    const response = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    
    if (response.token) {
      this.setToken(response.token);
    }
    
    return response;
  }

  async validateToken() {
    return await this.request('/auth/validate');
  }

  logout() {
    this.removeToken();
  }

  // === CITOYENS ===
  async getAllCitoyens() {
    return await this.request('/citoyens');
  }

  async getCitoyenById(id) {
    return await this.request(`/citoyens/${id}`);
  }

  async getCitoyenByCin(cin) {
    return await this.request(`/citoyens/cin/${cin}`);
  }

  async getCitoyensByMunicipalite(municipaliteId) {
    return await this.request(`/citoyens/municipalite/${municipaliteId}`);
  }

  async searchCitoyens(nom) {
    return await this.request(`/citoyens/search?nom=${encodeURIComponent(nom)}`);
  }

  async createCitoyen(citoyenData) {
    return await this.request('/citoyens', {
      method: 'POST',
      body: JSON.stringify(citoyenData),
    });
  }

  async updateCitoyen(id, citoyenData) {
    return await this.request(`/citoyens/${id}`, {
      method: 'PUT',
      body: JSON.stringify(citoyenData),
    });
  }

  async deleteCitoyen(id) {
    return await this.request(`/citoyens/${id}`, {
      method: 'DELETE',
    });
  }

  // === DEMANDES ===
  async getAllDemandes() {
    return await this.request('/demandes');
  }

  async getDemandeById(id) {
    return await this.request(`/demandes/${id}`);
  }

  async getDemandesByCitoyen(citoyenId) {
    return await this.request(`/demandes/citoyen/${citoyenId}`);
  }

  async getDemandesByStatut(statut) {
    return await this.request(`/demandes/statut/${statut}`);
  }

  async getDemandesByMunicipalite(municipaliteId) {
    return await this.request(`/demandes/municipalite/${municipaliteId}`);
  }

  async searchDemandes(objet) {
    return await this.request(`/demandes/search?objet=${encodeURIComponent(objet)}`);
  }

  async createDemande(demandeData) {
    return await this.request('/demandes', {
      method: 'POST',
      body: JSON.stringify(demandeData),
    });
  }

  async updateDemande(id, demandeData) {
    return await this.request(`/demandes/${id}`, {
      method: 'PUT',
      body: JSON.stringify(demandeData),
    });
  }

  async deleteDemande(id) {
    return await this.request(`/demandes/${id}`, {
      method: 'DELETE',
    });
  }

  // === DOCUMENTS ===
  async getAllDocuments() {
    return await this.request('/documents');
  }

  async getDocumentById(id) {
    return await this.request(`/documents/${id}`);
  }

  async getDocumentsByDemande(demandeId) {
    return await this.request(`/documents/demande/${demandeId}`);
  }

  async getDocumentsByType(typeId) {
    return await this.request(`/documents/type/${typeId}`);
  }

  async createDocument(documentData) {
    return await this.request('/documents', {
      method: 'POST',
      body: JSON.stringify(documentData),
    });
  }

  async updateDocument(id, documentData) {
    return await this.request(`/documents/${id}`, {
      method: 'PUT',
      body: JSON.stringify(documentData),
    });
  }

  async deleteDocument(id) {
    return await this.request(`/documents/${id}`, {
      method: 'DELETE',
    });
  }

  // === AGENTS ===
  async getAllAgents() {
    return await this.request('/agents');
  }

  async getAgentById(id) {
    return await this.request(`/agents/${id}`);
  }

  async getAgentsByMunicipalite(municipaliteId) {
    return await this.request(`/agents/municipalite/${municipaliteId}`);
  }

  async createAgent(agentData) {
    return await this.request('/agents', {
      method: 'POST',
      body: JSON.stringify(agentData),
    });
  }

  async updateAgent(id, agentData) {
    return await this.request(`/agents/${id}`, {
      method: 'PUT',
      body: JSON.stringify(agentData),
    });
  }

  async deleteAgent(id) {
    return await this.request(`/agents/${id}`, {
      method: 'DELETE',
    });
  }

  // === MUNICIPALITES ===
  async getAllMunicipalites() {
    return await this.request('/municipalites');
  }

  async getMunicipaliteById(id) {
    return await this.request(`/municipalites/${id}`);
  }

  async createMunicipalite(municipaliteData) {
    return await this.request('/municipalites', {
      method: 'POST',
      body: JSON.stringify(municipaliteData),
    });
  }

  async updateMunicipalite(id, municipaliteData) {
    return await this.request(`/municipalites/${id}`, {
      method: 'PUT',
      body: JSON.stringify(municipaliteData),
    });
  }

  async deleteMunicipalite(id) {
    return await this.request(`/municipalites/${id}`, {
      method: 'DELETE',
    });
  }

  // === PIECES JOINTES ===
  async uploadPieceJointe(formData) {
    const token = this.getToken();
    
    const response = await fetch(`${this.baseURL}/pieces-jointes/upload`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Upload failed: ${response.status}`);
    }

    return await response.json();
  }

  async getPieceJointeById(id) {
    return await this.request(`/pieces-jointes/${id}`);
  }

  async deletePieceJointe(id) {
    return await this.request(`/pieces-jointes/${id}`, {
      method: 'DELETE',
    });
  }

  // === SUIVI ===
  async getSuiviByDemande(demandeId) {
    return await this.request(`/suivi/demande/${demandeId}`);
  }

  async createSuivi(suiviData) {
    return await this.request('/suivi', {
      method: 'POST',
      body: JSON.stringify(suiviData),
    });
  }

  // === TYPES DE DOCUMENTS ===
  async getAllTypeDocuments() {
    return await this.request('/types-documents');
  }

  async getTypeDocumentById(id) {
    return await this.request(`/types-documents/${id}`);
  }
}

// Instance singleton
const apiService = new ApiService();

export default apiService; 