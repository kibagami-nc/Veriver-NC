# Veriver NC - Application de Protection de l'Environnement

## 📋 Description du Projet

Veriver NC est une application web et mobile dédiée à la protection de l'environnement en Nouvelle-Calédonie. Elle permet aux citoyens de signaler les zones polluées, d'organiser et de participer à des opérations de nettoyage collaboratives, tout en créant une communauté engagée autour de la préservation du territoire.

## 🎯 Fonctionnalités Principales

- Signalement de zones polluées avec photos, descriptions et localisation GPS
- Carte interactive avec visualisation en temps réel des zones signalées
- Organisation et participation à des événements de nettoyage collaboratifs
- Système de badges et classements pour encourager l'engagement
- Profils utilisateurs avec suivi des contributions
- Notifications pour nouveaux événements et mises à jour

## 🏗️ Stack Technologique

### Backend
- Java 17+ avec Spring Boot 3.x
- PostgreSQL 15+
- Spring Data JPA / Hibernate
- Spring Security + JWT
- API RESTful
- Swagger/OpenAPI pour documentation

### Frontend Web
- Angular 17+
- Tailwind CSS ou Bootstrap 5
- Leaflet.js ou Google Maps API pour la cartographie
- NgRx pour state management (optionnel)

### Frontend Mobile
- Option 1 (Recommandée) : Flutter
- Option 2 : React Native
- Option 3 : Ionic avec Angular

---

## 📝 PARTIES À DÉVELOPPER

## 1️⃣ CONFIGURATION INITIALE

### 1.1 Base de Données PostgreSQL
- Installer PostgreSQL 15+
- Créer la base de données "veriver_nc"
- Créer un utilisateur dédié avec les permissions nécessaires
- Configurer les connexions et le pooling

### 1.2 Backend Spring Boot
- Initialiser le projet Spring Boot avec Spring Initializr
- Configurer le fichier application.yml (connexion BDD, JWT, upload fichiers)
- Configurer Maven/Gradle avec toutes les dépendances nécessaires
- Mettre en place la structure du projet (packages : config, controller, service, repository, model, dto, security, exception)

### 1.3 Frontend Web Angular
- Initialiser le projet Angular avec Angular CLI
- Installer et configurer Tailwind CSS ou Bootstrap 5
- Configurer les environnements (development, production)
- Mettre en place la structure modulaire (core, shared, features)
- Installer les dépendances (Leaflet, HTTP client, etc.)

### 1.4 Frontend Mobile
- Initialiser le projet Flutter/React Native/Ionic
- Configurer les permissions (caméra, localisation, stockage)
- Installer les packages nécessaires (maps, camera, geolocation, HTTP client)
- Configurer les environnements et les constantes API

---

## 2️⃣ BASE DE DONNÉES

### 2.1 Modélisation
- Concevoir le schéma relationnel complet
- Définir les relations entre les entités
- Prévoir les index pour optimisation

### 2.2 Entités à Créer
- **User** : Utilisateurs de l'application (id, username, email, password, firstName, lastName, profilePicture, points, role, createdAt)
- **PollutionReport** : Signalements de pollution (id, title, description, latitude, longitude, reportType, severity, status, photos, userId, createdAt, updatedAt)
- **CleanupEvent** : Événements de nettoyage (id, title, description, latitude, longitude, eventDate, duration, maxParticipants, materialsNeeded, organizerId, status, beforePhotos, afterPhotos, wasteCollected, createdAt)
- **EventParticipation** : Inscriptions aux événements (id, eventId, userId, status, registeredAt)
- **Badge** : Badges disponibles (id, name, description, icon, criteria, points)
- **UserBadge** : Badges obtenus par utilisateurs (id, userId, badgeId, earnedAt)
- **Notification** : Notifications utilisateurs (id, userId, type, message, isRead, createdAt)

### 2.3 Migration de Données
- Créer les scripts de migration avec Flyway ou Liquibase
- Préparer les données de test (utilisateurs, badges prédéfinis)
- Créer les seeds pour l'environnement de développement

---

## 3️⃣ BACKEND - AUTHENTIFICATION & SÉCURITÉ

### 3.1 Système d'Authentification
- Créer le système d'inscription (validation email, hashage mot de passe avec BCrypt)
- Implémenter la connexion avec génération de JWT
- Mettre en place le refresh token
- Créer l'endpoint "me" pour récupérer l'utilisateur connecté

### 3.2 Sécurité
- Configurer Spring Security avec JWT filter
- Implémenter la gestion des rôles (USER, ADMIN, ORGANIZER)
- Configurer CORS pour autoriser les domaines frontend
- Mettre en place la validation des entrées
- Implémenter le rate limiting sur les endpoints sensibles
- Configurer la protection CSRF

### 3.3 Gestion des Sessions
- Implémenter la déconnexion
- Gérer l'expiration des tokens
- Créer le système de renouvellement automatique des tokens

---

## 4️⃣ BACKEND - GESTION DES SIGNALEMENTS

### 4.1 CRUD Signalements
- Créer l'endpoint de création de signalement (POST /api/reports)
- Créer l'endpoint de récupération de tous les signalements (GET /api/reports)
- Créer l'endpoint de détails d'un signalement (GET /api/reports/{id})
- Créer l'endpoint de modification (PUT /api/reports/{id})
- Créer l'endpoint de suppression (DELETE /api/reports/{id})

### 4.2 Gestion des Photos
- Implémenter l'upload de photos multiples
- Créer le système de stockage des fichiers (local ou cloud)
- Générer des miniatures pour optimisation
- Implémenter la validation des formats et tailles
- Créer l'endpoint de suppression de photos

### 4.3 Fonctionnalités Avancées
- Implémenter les filtres (par type, gravité, statut, date)
- Créer la pagination des résultats
- Implémenter la recherche par zone géographique (radius search)
- Créer l'endpoint spécifique pour la carte (données optimisées avec clustering)
- Implémenter le changement de statut (REPORTED → IN_PROGRESS → CLEANED)

---

## 5️⃣ BACKEND - GESTION DES ÉVÉNEMENTS

### 5.1 CRUD Événements
- Créer l'endpoint de création d'événement (POST /api/events)
- Créer l'endpoint de liste des événements (GET /api/events)
- Créer l'endpoint de détails (GET /api/events/{id})
- Créer l'endpoint de modification (PUT /api/events/{id})
- Créer l'endpoint de suppression (DELETE /api/events/{id})

### 5.2 Gestion des Participations
- Créer l'endpoint d'inscription à un événement (POST /api/events/{id}/register)
- Créer l'endpoint de désinscription (DELETE /api/events/{id}/register)
- Implémenter la limite de participants
- Créer l'endpoint de liste des participants (GET /api/events/{id}/participants)
- Gérer les statuts de participation (REGISTERED, CONFIRMED, ATTENDED, CANCELLED)

### 5.3 Finalisation d'Événement
- Créer l'endpoint de marquage comme terminé (POST /api/events/{id}/complete)
- Implémenter l'upload des photos avant/après
- Créer le système de saisie des résultats (quantité déchets collectés)
- Calculer et attribuer les points aux participants
- Vérifier et attribuer les badges associés

### 5.4 Fonctionnalités Avancées
- Implémenter les filtres (par date, statut, localisation)
- Créer la recherche d'événements à proximité
- Implémenter le calendrier des événements
- Créer les rappels automatiques avant événement

---

## 6️⃣ BACKEND - GAMIFICATION

### 6.1 Système de Points
- Implémenter le calcul automatique des points (signalement: 10pts, participation: 50pts, organisation: 100pts)
- Créer la mise à jour du score utilisateur
- Implémenter l'historique des points gagnés

### 6.2 Système de Badges
- Créer les badges prédéfinis (Premier signalement, 10 signalements, Participation à événements, etc.)
- Implémenter la vérification automatique des critères
- Créer l'attribution automatique des badges
- Développer l'endpoint de récupération des badges utilisateur (GET /api/users/{id}/badges)

### 6.3 Classements
- Créer le classement global (GET /api/users/leaderboard)
- Implémenter le classement mensuel
- Créer le classement par catégorie (signalements, événements)
- Développer le système de réinitialisation mensuelle

---

## 7️⃣ BACKEND - NOTIFICATIONS

### 7.1 Système de Notifications
- Créer le modèle et la base pour les notifications
- Implémenter la création de notifications (nouvel événement, inscription confirmée, badge obtenu)
- Créer l'endpoint de récupération des notifications (GET /api/notifications)
- Implémenter le marquage comme lu (PUT /api/notifications/{id}/read)
- Créer la suppression des notifications

### 7.2 Notifications Push (Mobile)
- Intégrer Firebase Cloud Messaging
- Créer le système d'envoi de notifications push
- Gérer les tokens de devices
- Implémenter les préférences de notifications

---

## 8️⃣ BACKEND - GESTION UTILISATEURS

### 8.1 Profils Utilisateurs
- Créer l'endpoint de récupération du profil (GET /api/users/{id})
- Implémenter la modification du profil (PUT /api/users/{id})
- Créer l'upload de photo de profil
- Développer les statistiques utilisateur (nombre de signalements, événements, points)

### 8.2 Administration
- Créer les endpoints d'administration (liste utilisateurs, suspension, suppression)
- Implémenter la modération des signalements
- Créer la validation/rejet des signalements
- Développer la gestion des rôles

---

## 9️⃣ FRONTEND WEB - AUTHENTIFICATION

### 9.1 Pages d'Authentification
- Créer la page d'inscription avec formulaire de validation
- Créer la page de connexion
- Implémenter la validation côté client
- Créer le service d'authentification (AuthService)
- Implémenter le stockage du token (localStorage ou sessionStorage)
- Créer les guards de route (authentification requise)

### 9.2 Gestion de Session
- Implémenter l'intercepteur HTTP pour ajouter le token JWT
- Créer le système de refresh token automatique
- Implémenter la déconnexion
- Gérer la redirection après expiration du token

---

## 🔟 FRONTEND WEB - CARTE INTERACTIVE

### 10.1 Intégration Carte
- Intégrer Leaflet.js ou Google Maps
- Configurer les API keys
- Créer le composant de carte principal
- Implémenter la géolocalisation de l'utilisateur

### 10.2 Affichage des Signalements
- Créer les markers personnalisés par type de pollution
- Implémenter le clustering des markers pour performance
- Créer les popups d'information au clic
- Développer les calques pour filtrer par type/gravité
- Implémenter le zoom automatique sur zone

### 10.3 Fonctionnalités Avancées
- Créer la recherche par adresse/localisation
- Implémenter le dessin de zones de recherche (radius)
- Développer l'affichage des événements sur la carte
- Créer la navigation vers les détails depuis la carte

---

## 1️⃣1️⃣ FRONTEND WEB - SIGNALEMENTS

### 11.1 Liste des Signalements
- Créer la page de liste avec cards
- Implémenter la pagination
- Créer les filtres (type, gravité, statut, date)
- Développer la recherche
- Implémenter le tri (date, gravité)

### 11.2 Détails Signalement
- Créer la page de détails avec toutes les informations
- Implémenter la galerie de photos avec lightbox
- Afficher la mini-carte de localisation
- Créer la section commentaires (si fonctionnalité ajoutée)

### 11.3 Création de Signalement
- Créer le formulaire multi-étapes
- Implémenter l'upload de photos (drag & drop, preview)
- Intégrer la sélection de localisation sur carte
- Créer la validation du formulaire
- Implémenter la soumission avec feedback

### 11.4 Modification/Suppression
- Créer la page d'édition (réservée au créateur)
- Implémenter la suppression avec confirmation
- Gérer les permissions

---

## 1️⃣2️⃣ FRONTEND WEB - ÉVÉNEMENTS

### 12.1 Liste des Événements
- Créer la page de liste avec cards d'événements
- Implémenter les filtres (date, statut, proximité)
- Créer la vue calendrier
- Développer la vue liste
- Implémenter la recherche

### 12.2 Détails Événement
- Créer la page de détails complète
- Afficher les informations pratiques (date, lieu, matériel)
- Implémenter le compteur de participants
- Créer la liste des participants inscrits
- Afficher les photos avant/après (si complété)

### 12.3 Création d'Événement
- Créer le formulaire de création (accessible selon rôle)
- Implémenter le sélecteur de date/heure
- Créer la sélection de localisation sur carte
- Développer le champ de matériel nécessaire (chips)
- Implémenter la validation et soumission

### 12.4 Inscription/Participation
- Créer le bouton d'inscription avec état (inscrit/complet)
- Implémenter la désinscription
- Créer les confirmations modales
- Développer le suivi des événements inscrits (Mon profil)

### 12.5 Finalisation (Organisateur)
- Créer l'interface de finalisation d'événement
- Implémenter l'upload photos avant/après
- Créer le formulaire de saisie des résultats
- Développer le résumé et partage des résultats

---

## 1️⃣3️⃣ FRONTEND WEB - PROFIL UTILISATEUR

### 13.1 Page de Profil
- Créer la page de profil avec photo
- Afficher les statistiques (points, signalements, événements)
- Créer la section badges obtenus
- Implémenter l'historique des contributions
- Afficher le classement personnel

### 13.2 Édition de Profil
- Créer le formulaire d'édition
- Implémenter le changement de photo de profil
- Créer la validation des champs
- Développer le changement de mot de passe

### 13.3 Mes Contributions
- Créer l'onglet "Mes signalements"
- Créer l'onglet "Mes événements organisés"
- Créer l'onglet "Événements auxquels je participe"
- Implémenter les actions rapides (modifier, supprimer)

---

## 1️⃣4️⃣ FRONTEND WEB - GAMIFICATION

### 14.1 Système de Badges
- Créer la page de tous les badges disponibles
- Implémenter l'affichage des badges obtenus/non obtenus
- Créer les tooltips avec critères d'obtention
- Développer les animations d'obtention de badge

### 14.2 Classements
- Créer la page de classement global
- Implémenter les onglets (global, mensuel, catégories)
- Développer le podium visuel (top 3)
- Créer l'affichage de position personnelle
- Implémenter la pagination du classement

---

## 1️⃣5️⃣ FRONTEND WEB - NOTIFICATIONS

### 15.1 Centre de Notifications
- Créer l'icône de notification avec compteur
- Développer le dropdown de notifications
- Implémenter le marquage comme lu
- Créer la page complète des notifications
- Développer les filtres (lues/non lues, par type)

---

## 1️⃣6️⃣ FRONTEND WEB - ADMINISTRATION

### 16.1 Dashboard Admin
- Créer le tableau de bord avec statistiques
- Afficher les graphiques (signalements par mois, événements, utilisateurs actifs)
- Implémenter les KPIs

### 16.2 Gestion Utilisateurs
- Créer la liste des utilisateurs avec recherche
- Implémenter la suspension/activation de comptes
- Développer la modification des rôles
- Créer la suppression de comptes

### 16.3 Modération
- Créer l'interface de modération des signalements
- Implémenter la validation/rejet
- Développer la gestion des signalements inappropriés
- Créer les outils de modération des événements

---

## 1️⃣7️⃣ FRONTEND MOBILE - CONFIGURATION

### 17.1 Structure de Base
- Configurer la navigation (stack, tabs)
- Créer les écrans de base (splash, onboarding)
- Implémenter le thème et les styles globaux
- Configurer les services HTTP

### 17.2 Permissions
- Implémenter la demande de permission caméra
- Configurer la permission de localisation
- Implémenter la permission de stockage
- Gérer les refus de permissions avec alternatives

---

## 1️⃣8️⃣ FRONTEND MOBILE - AUTHENTIFICATION

### 18.1 Écrans d'Authentification
- Créer l'écran d'inscription
- Créer l'écran de connexion
- Implémenter la validation des formulaires
- Créer le stockage sécurisé du token (Keychain/Keystore)
- Développer la biométrie (Touch ID/Face ID) optionnelle

---

## 1️⃣9️⃣ FRONTEND MOBILE - CARTE

### 19.1 Carte Native
- Intégrer Google Maps ou Mapbox
- Implémenter la géolocalisation en temps réel
- Créer les markers personnalisés
- Développer les info-windows
- Implémenter le clustering

### 19.2 Navigation
- Créer l'ouverture dans l'app de navigation (Google Maps, Waze)
- Implémenter le calcul d'itinéraire
- Développer la navigation vers un point

### 19.3 Mode Hors-Ligne
- Implémenter le cache de la carte
- Créer le téléchargement des données pour zone
- Gérer la synchronisation à la reconnexion

---

## 2️⃣0️⃣ FRONTEND MOBILE - SIGNALEMENTS

### 20.1 Liste et Détails
- Créer l'écran de liste avec pull-to-refresh
- Implémenter les filtres natifs
- Créer l'écran de détails
- Développer la galerie de photos native

### 20.2 Création de Signalement
- Créer l'écran de création avec steps
- Implémenter la capture photo (caméra)
- Créer la sélection depuis galerie
- Implémenter la sélection de localisation (carte ou géolocalisation auto)
- Développer le formulaire avec validation
- Créer la soumission avec indicateur de progression

---

## 2️⃣1️⃣ FRONTEND MOBILE - ÉVÉNEMENTS

### 21.1 Liste et Détails
- Créer l'écran de liste avec filtres
- Implémenter la vue calendrier native
- Créer l'écran de détails complet
- Développer l'ajout au calendrier de l'appareil

### 21.2 Participation
- Implémenter l'inscription/désinscription
- Créer les rappels/alarmes
- Développer la navigation vers l'événement
- Créer les notifications avant événement

### 21.3 Création (Organisateurs)
- Créer l'écran de création d'événement
- Implémenter tous les champs nécessaires
- Développer la sélection de localisation

---

## 2️⃣2️⃣ FRONTEND MOBILE - PROFIL

### 22.1 Écran de Profil
- Créer l'écran de profil avec statistiques
- Afficher les badges
- Implémenter l'édition de profil
- Créer le changement de photo (caméra/galerie)

### 22.2 Mes Activités
- Créer l'écran de mes signalements
- Créer l'écran de mes événements
- Implémenter les actions contextuelles

---

## 2️⃣3️⃣ FRONTEND MOBILE - NOTIFICATIONS PUSH

### 23.1 Configuration Firebase
- Configurer Firebase pour Android
- Configurer Firebase pour iOS
- Implémenter l'enregistrement du token
- Créer la gestion des permissions

### 23.2 Réception et Affichage
- Implémenter la réception des notifications
- Créer les notifications locales
- Développer la navigation depuis notification
- Gérer les notifications en background/foreground

---

## 2️⃣4️⃣ FRONTEND MOBILE - FONCTIONNALITÉS AVANCÉES

### 24.1 Mode Hors-Ligne
- Implémenter le stockage local (SQLite/Realm)
- Créer la synchronisation en arrière-plan
- Gérer les conflits de synchronisation
- Développer les indicateurs d'état réseau

### 24.2 Performances
- Implémenter le lazy loading des images
- Créer le cache des données
- Optimiser les requêtes API
- Développer le pagination infinie

---

## 2️⃣5️⃣ TESTS

### 25.1 Tests Backend
- Créer les tests unitaires (JUnit) pour services
- Développer les tests d'intégration pour repositories
- Implémenter les tests API avec MockMvc
- Créer les tests de sécurité

### 25.2 Tests Frontend Web
- Créer les tests unitaires (Jasmine/Karma) pour composants
- Développer les tests de services
- Implémenter les tests E2E (Cypress/Protractor)

### 25.3 Tests Mobile
- Créer les tests unitaires (Flutter Test/Jest)
- Développer les tests de widgets/composants
- Implémenter les tests d'intégration

---

## 2️⃣6️⃣ DÉPLOIEMENT

### 26.1 Backend
- Configurer l'environnement de production
- Créer le fichier Docker pour backend
- Implémenter les scripts de déploiement
- Configurer le reverse proxy (Nginx)
- Mettre en place SSL/TLS
- Configurer le logging production

### 26.2 Frontend Web
- Créer le build de production optimisé
- Configurer l'hébergement (Vercel, Netlify, ou serveur)
- Implémenter le CDN pour assets
- Configurer le cache browser

### 26.3 Base de Données
- Créer les backups automatiques
- Implémenter la réplication (si nécessaire)
- Configurer les index de performance
- Mettre en place le monitoring

### 26.4 Mobile
- Préparer les builds pour stores (Android APK/AAB, iOS IPA)
- Créer les comptes développeur (Google Play, App Store)
- Préparer les assets (icônes, screenshots, descriptions)
- Configurer les signing keys
- Soumettre aux stores

### 26.5 Infrastructure
- Créer le fichier docker-compose.yml complet
- Configurer l'orchestration (Kubernetes si nécessaire)
- Implémenter le monitoring (Prometheus, Grafana)
- Configurer les alertes
- Mettre en place les logs centralisés

---

## 2️⃣7️⃣ DOCUMENTATION

### 27.1 Documentation Technique
- Rédiger la documentation API (Swagger/OpenAPI)
- Créer le guide d'installation développeur
- Documenter l'architecture du projet
- Créer les diagrammes (architecture, BDD, flux)

### 27.2 Documentation Utilisateur
- Rédiger le guide utilisateur web
- Créer le guide utilisateur mobile
- Développer les FAQ
- Créer les tutoriels vidéo (optionnel)

---

## 2️⃣8️⃣ FONCTIONNALITÉS BONUS (Phase 3)

### 28.1 Statistiques Avancées
- Créer des graphiques d'évolution (pollution, nettoyages)
- Implémenter les rapports mensuels/annuels
- Développer les heatmaps de pollution
- Créer les exports de données (CSV, PDF)

### 28.2 Intégration Collectivités
- Créer un portail pour collectivités
- Implémenter l'API publique
- Développer les webhooks
- Créer les rapports automatiques

### 28.3 Fonctionnalités Sociales
- Implémenter le partage sur réseaux sociaux
- Créer un système de commentaires
- Développer un fil d'actualité
- Implémenter le suivi d'utilisateurs

### 28.4 IA et Automatisation
- Implémenter la détection automatique du type de pollution (IA sur photos)
- Créer des suggestions d'événements basées sur signalements
- Développer des prédictions de zones à risque

---

## 📊 ROADMAP

### Phase 1 - MVP (3-4 mois)
- Configuration initiale complète
- Authentification et sécurité
- Signalements (CRUD complet)
- Carte interactive
- Événements (création et participation)
- Frontend Web complet
- API complète

### Phase 2 - Mobile et Gamification (2-3 mois)
- Application mobile complète
- Système de badges et points
- Classements
- Notifications push
- Profils utilisateurs avancés
- Tests et déploiement

### Phase 3 - Fonctionnalités Avancées (2-3 mois)
- Statistiques avancées
- Intégration collectivités
- API publique
- Mode hors-ligne optimisé
- Fonctionnalités sociales
- IA et automatisation

---

## 🔧 OUTILS DE DÉVELOPPEMENT RECOMMANDÉS

- **IDE Backend** : IntelliJ IDEA ou Eclipse
- **IDE Frontend** : Visual Studio Code
- **IDE Mobile** : Android Studio, Xcode, ou VS Code (Flutter)
- **Gestion de version** : Git + GitHub/GitLab
- **Gestion de projet** : Jira, Trello, ou GitHub Projects
- **Design** : Figma pour maquettes
- **Tests API** : Postman ou Insomnia
- **CI/CD** : GitHub Actions, GitLab CI, ou Jenkins
- **Monitoring** : Sentry pour erreurs, Google Analytics
- **Communication** : Slack ou Discord

---

## 📞 ÉQUIPE RECOMMANDÉE

- Chef de projet / Product Owner
- Développeur Backend Java/Spring Boot
- Développeur Frontend Angular
- Développeur Mobile Flutter/React Native
- Designer UI/UX
- Testeur QA
- DevOps (si infrastructure complexe)

---

**Veriver NC** - Ensemble pour une Nouvelle-Calédonie plus propre 🌴
