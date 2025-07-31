// Script de test pour vérifier la connectivité avec l'API backend
const API_BASE_URL = 'http://localhost:8080/api';

async function testAPI() {
  console.log('🧪 Test de connectivité avec l\'API backend...');
  console.log('URL de base:', API_BASE_URL);

  try {
    // Test 1: Types de documents
    console.log('\n📋 Test 1: Récupération des types de documents...');
    const typesResponse = await fetch(`${API_BASE_URL}/types-documents`);
    console.log('Status:', typesResponse.status);
    
    if (typesResponse.ok) {
      const types = await typesResponse.json();
      console.log('✅ Types de documents récupérés:', types.length, 'types');
      console.log('Premier type:', types[0]);
    } else {
      console.log('❌ Erreur lors de la récupération des types de documents');
    }

    // Test 2: Citoyens
    console.log('\n👥 Test 2: Récupération des citoyens...');
    const citoyensResponse = await fetch(`${API_BASE_URL}/citoyens`);
    console.log('Status:', citoyensResponse.status);
    
    if (citoyensResponse.ok) {
      const citoyens = await citoyensResponse.json();
      console.log('✅ Citoyens récupérés:', citoyens.length, 'citoyens');
      console.log('Premier citoyen:', citoyens[0]);
    } else {
      console.log('❌ Erreur lors de la récupération des citoyens');
    }

    // Test 3: Demandes
    console.log('\n📝 Test 3: Récupération des demandes...');
    const demandesResponse = await fetch(`${API_BASE_URL}/demandes`);
    console.log('Status:', demandesResponse.status);
    
    if (demandesResponse.ok) {
      const demandes = await demandesResponse.json();
      console.log('✅ Demandes récupérées:', demandes.length, 'demandes');
      console.log('Première demande:', demandes[0]);
    } else {
      console.log('❌ Erreur lors de la récupération des demandes');
    }

    // Test 4: Municipalités
    console.log('\n🏛️ Test 4: Récupération des municipalités...');
    const municipalitesResponse = await fetch(`${API_BASE_URL}/municipalites`);
    console.log('Status:', municipalitesResponse.status);
    
    if (municipalitesResponse.ok) {
      const municipalites = await municipalitesResponse.json();
      console.log('✅ Municipalités récupérées:', municipalites.length, 'municipalités');
      console.log('Première municipalité:', municipalites[0]);
    } else {
      console.log('❌ Erreur lors de la récupération des municipalités');
    }

    console.log('\n🎉 Tests terminés!');

  } catch (error) {
    console.error('❌ Erreur lors des tests:', error.message);
    console.log('\n🔧 Vérifications à faire:');
    console.log('1. Le backend Spring Boot est-il démarré sur le port 8080?');
    console.log('2. La base de données PostgreSQL est-elle accessible?');
    console.log('3. Les données de test ont-elles été insérées?');
    console.log('4. Le CORS est-il configuré correctement?');
  }
}

// Exécuter les tests
testAPI(); 