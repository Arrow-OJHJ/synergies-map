window.I18N = window.I18N || {};
window.I18N['fr-BE'] = {
 "meta": { "name": "Français (Belgique)", "htmlLang": "fr-BE", "base": "fr" },
 "ui": {
  "brandName": "Arrow ECS Belgique",
  "brandContacts": []
 },
 "products": {
  "lightwell": {
   "desc": "Lightwell est une offre conjointe IBM–Red Hat qui aide les organisations à identifier et à remédier aux vulnérabilités présentes dans les dépendances logicielles open-source tierces, grâce à des correctifs validés.",
   "value": "Réduit le risque lié aux vulnérabilités de la chaîne d'approvisionnement logicielle open-source en fournissant des packages de remédiation validés, permettant de corriger les dépendances affectées sans recourir à des mises à niveau de versions perturbatrices.",
   "questions": [
    "Disposez-vous d'une visibilité sur les composants open-source et les dépendances transitives utilisés dans votre portefeuille d'applications ?",
    "Existe-t-il des vulnérabilités connues dans votre chaîne d'approvisionnement logicielle que vous ne pouvez pas corriger immédiatement via une mise à niveau de version ?",
    "Comment validez-vous actuellement que les correctifs appliqués aux composants open-source n'introduisent pas de régressions ?",
    "Êtes-vous soumis à des exigences réglementaires ou contractuelles vous obligeant à démontrer une remédiation rapide des risques liés à la chaîne d'approvisionnement logicielle ?"
   ],
   "differentiators": [
    "Support de remédiation validé conjointement par IBM et Red Hat pour les packages open-source",
    "Corrige les vulnérabilités sans nécessiter de mises à niveau de versions perturbatrices immédiates",
    "S'intègre à IBM Concert pour une identification et une remédiation de bout en bout des risques liés à la chaîne d'approvisionnement",
    "Soutenu par le support entreprise de Red Hat et d'IBM"
   ]
  },
  "rh_ansible": {
   "desc": "Red Hat Ansible Automation Platform est une plateforme d'automatisation d'entreprise permettant d'automatiser de manière cohérente les opérations informatiques, cloud, réseau, sécurité et applicatives à l'aide de playbooks lisibles par l'humain.",
   "value": "Permet aux organisations de déployer une automatisation gouvernée et reproductible à l'échelle des opérations informatiques, réduisant les interventions manuelles, imposant des configurations cohérentes et accélérant la remédiation dans des environnements hétérogènes.",
   "questions": [
    "Comment gérez-vous actuellement la configuration et les tâches opérationnelles sur l'ensemble de votre parc de serveurs, réseaux et cloud ?",
    "Avez-vous besoin d'appliquer des configurations de sécurité cohérentes et des remédiations à grande échelle dans votre environnement ?",
    "Cherchez-vous à standardiser et à gouverner l'automatisation entre les équipes et les unités métier ?",
    "Comment coordonnez-vous le provisionnement des infrastructures avec la configuration post-provisionnement et les opérations courantes ?"
   ],
   "differentiators": [
    "Architecture sans agent — aucun agent requis sur les nœuds gérés",
    "Des playbooks YAML lisibles par l'humain facilitent l'adoption de l'automatisation",
    "Gouvernance centralisée de l'automatisation avec contrôle d'accès basé sur les rôles via Automation Controller",
    "Complémentaire à Terraform : Ansible configure et opère après le provisionnement effectué par Terraform"
   ]
  },
  "rh_openshift": {
   "desc": "Red Hat OpenShift est une plateforme Kubernetes d'entreprise permettant de concevoir, déployer et exploiter des applications conteneurisées de manière cohérente dans des environnements on-premises, hybrides et multi-cloud.",
   "value": "Fournit une plateforme d'application cohérente et sécurisée dans des environnements hybrides, réduisant la charge opérationnelle et permettant aux développeurs de déployer et gérer des charges de travail conteneurisées en self-service, quelle que soit l'infrastructure sous-jacente.",
   "questions": [
    "Cherchez-vous à standardiser votre plateforme de conteneurs et Kubernetes entre vos environnements on-premises et cloud ?",
    "Vos équipes de développement ont-elles besoin d'une plateforme en self-service pour déployer et gérer des applications conteneurisées ?",
    "Comment gérez-vous la sécurité, les correctifs et les opérations de cycle de vie sur vos clusters Kubernetes ?",
    "Envisagez-vous de moderniser des applications existantes en les migrant vers une plateforme basée sur les conteneurs ?"
   ],
   "differentiators": [
    "Distribution Kubernetes renforcée pour les entreprises, avec sécurité intégrée, CI/CD et outillage développeur",
    "Plateforme cohérente sur site, IBM Cloud, AWS, Azure et GCP",
    "Les opérateurs Kubernetes simplifient le déploiement et la gestion du cycle de vie des charges de travail complexes",
    "Intégration validée avec IBM Fusion HCI et les IBM Cloud Paks"
   ]
  },
  "rh_openshift_ai": {
   "desc": "Red Hat OpenShift AI est une plateforme d'intelligence artificielle et de machine learning flexible et scalable, construite sur Red Hat OpenShift, permettant aux entreprises de développer et déployer des applications dotées d'IA dans des environnements hybrides.",
   "value": "Fournit un environnement unifié de niveau entreprise pour l'acquisition de données, l'entraînement, l'affinage, le déploiement et la supervision des modèles d'IA, permettant le développement d'applications IA à grande échelle sur des infrastructures on-premises et cloud.",
   "questions": [
    "Vos équipes de data science et MLOps disposent-elles d'un environnement cohérent pour le développement, l'entraînement et le déploiement de modèles sur votre infrastructure hybride ?",
    "Comment gérez-vous le cycle de vie complet de vos modèles d'IA, de l'expérimentation jusqu'au déploiement en production et à la supervision ?",
    "Cherchez-vous à accélérer la mise en production d'applications IA tout en maintenant des contrôles de gouvernance et de sécurité ?",
    "Avez-vous besoin de support d'accélération matérielle pour les charges de travail d'entraînement et d'inférence de modèles, on-premises ou dans le cloud ?"
   ],
   "differentiators": [
    "S'exécute sur Red Hat OpenShift — plateforme IA cohérente sur site et en cloud hybride",
    "Prend en charge l'acquisition de données, l'entraînement, l'affinage, le déploiement et la supervision des modèles dans une seule plateforme",
    "Support d'accélération matérielle pour les charges de travail GPU",
    "Intégration native avec watsonx.ai, watsonx.data et watsonx.governance pour une gouvernance complète du cycle de vie de l'IA"
   ]
  }
 },
 "connections": {
  "concert>lightwell": "IBM Concert identifie et hiérarchise les risques applicatifs et ceux liés à la chaîne d'approvisionnement logicielle ; Lightwell fournit un support de remédiation validé pour les dépendances open-source tierces vulnérables.",
  "concert>rh_ansible": "IBM Concert identifie et hiérarchise les risques applicatifs ; Red Hat Ansible Automation Platform automatise le déploiement cohérent des remédiations et des configurations de sécurité dans les environnements gérés.",
  "lightwell>rh_ansible": "Lightwell fournit des packages de remédiation validés pour les dépendances open-source vulnérables ; Red Hat Ansible Automation Platform automatise leur déploiement cohérent dans l'ensemble de l'environnement.",
  "terraform>rh_ansible": "Terraform provisionne l'infrastructure en tant que code ; Red Hat Ansible Automation Platform configure les systèmes et automatise les tâches opérationnelles après ou parallèlement au provisionnement — des technologies complémentaires pour l'infrastructure et les opérations.",
  "fusion_hci>rh_openshift": "IBM Fusion HCI fournit une infrastructure convergée intégrée on-premises comme socle pour les applications conteneurisées Red Hat OpenShift, incluant le calcul, le stockage et la gestion du cycle de vie.",
  "ibm_bob>rh_ansible": "IBM Bob accompagne les développeurs dans la création de code et de contenu d'automatisation ; Red Hat Ansible Automation Platform exécute et gouverne cette automatisation à l'échelle de l'entreprise dans l'ensemble de l'environnement informatique.",
  "ibm_bob>rh_openshift": "IBM Bob accélère le développement et la modernisation des applications ; Red Hat OpenShift fournit la plateforme de conteneurs d'entreprise sur laquelle ces applications sont conçues, déployées et exploitées.",
  "rh_openshift_ai>wxai": "Red Hat OpenShift AI fournit la plateforme MLOps d'entreprise pour l'entraînement, l'affinage et le déploiement des modèles ; watsonx.ai apporte les capacités de développement de modèles fondamentaux et de modèles d'IA d'IBM — formant ensemble un environnement complet de développement et de déploiement d'IA hybride.",
  "rh_openshift_ai>wxdata": "Red Hat OpenShift AI consomme des données gouvernées issues du lakehouse watsonx.data pour l'entraînement et l'inférence des modèles, permettant aux charges de travail IA d'accéder à des actifs de données hybrides dans des environnements on-premises et cloud.",
  "rh_openshift_ai>wxdi": "watsonx.data intelligence fournit des capacités de découverte de données, de gestion des métadonnées, de traçabilité et de qualité qui permettent de s'assurer que les données alimentant les pipelines d'entraînement et d'inférence de Red Hat OpenShift AI sont bien comprises et fiables.",
  "rh_openshift_ai>wxdint": "watsonx.data integration fournit les pipelines de déplacement et de transformation des données qui approvisionnent Red Hat OpenShift AI en données préparées et prêtes pour l'IA, issues de l'ensemble de l'entreprise, pour l'entraînement, l'affinage et l'inférence.",
  "rh_openshift_ai>wxgov": "watsonx.governance assure la gestion des risques liés aux modèles d'IA, la gouvernance du cycle de vie et la supervision de la conformité pour les charges de travail IA déployées sur Red Hat OpenShift AI, favorisant une IA responsable à l'échelle de l'entreprise.",
  "rh_openshift_ai>wxorch": "Red Hat OpenShift AI fournit l'infrastructure de déploiement des modèles dont dépendent les agents et workflows IA de watsonx Orchestrate, permettant une automatisation IA d'entreprise à grande échelle dans des environnements hybrides."
 }
};
