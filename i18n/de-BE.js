window.I18N = window.I18N || {};
window.I18N['de-BE'] = {
 "meta": { "name": "Deutsch (BeLux)", "htmlLang": "de-BE", "base": "de" },
 "ui": {
  "brandName": "Arrow ECS BeLux",
  "brandContacts": []
 },
 "products": {
  "lightwell": {
   "desc": "Lightwell ist ein gemeinsames Angebot von IBM und Red Hat, das Organisationen dabei unterstützt, Schwachstellen in externen Open-Source-Softwareabhängigkeiten zu identifizieren und durch validierte Korrektursoftwarepakete zu beheben.",
   "value": "Reduziert das Risiko durch Schwachstellen in der Open-Source-Softwarelieferkette, indem validierte Behebungspakete bereitgestellt werden, mit denen betroffene Abhängigkeiten korrigiert werden können – ohne aufwändige Versions-Upgrades.",
   "questions": [
    "Haben Sie Transparenz über die Open-Source-Komponenten und transitiven Abhängigkeiten in Ihrem Anwendungsportfolio?",
    "Gibt es bekannte Schwachstellen in Ihrer Softwarelieferkette, die Sie nicht sofort durch ein Versions-Upgrade beheben können?",
    "Wie validieren Sie aktuell, dass Korrekturen an Open-Source-Komponenten keine Regressionen einführen?",
    "Unterliegen Sie regulatorischen oder vertraglichen Anforderungen, die eine zeitnahe Behebung von Risiken in der Softwarelieferkette nachweisen?"
   ],
   "differentiators": [
    "Gemeinsam von IBM und Red Hat validierte Behebungsunterstützung für Open-Source-Pakete",
    "Behebt Schwachstellen ohne sofortige, aufwändige Versions-Upgrades",
    "Integration mit IBM Concert für eine durchgängige Identifizierung und Behebung von Lieferkettenrisiken",
    "Unterstützt durch den Enterprise-Support von Red Hat und IBM"
   ]
  },
  "rh_ansible": {
   "desc": "Red Hat Ansible Automation Platform ist eine Enterprise-Automatisierungsplattform zur konsistenten Automatisierung von IT-Infrastruktur-, Cloud-, Netzwerk-, Sicherheits- und Anwendungsbetrieb mithilfe von menschenlesbaren YAML-Playbooks.",
   "value": "Ermöglicht Organisationen, gesteuerte und reproduzierbare Automatisierung im IT-Betrieb zu skalieren – manuelle Eingriffe werden reduziert, konsistente Konfigurationen durchgesetzt und die Behebung in heterogenen Umgebungen beschleunigt.",
   "questions": [
    "Wie verwalten Sie aktuell Konfigurationen und Betriebsaufgaben über Ihre Server-, Netzwerk- und Cloud-Infrastruktur hinweg?",
    "Müssen Sie konsistente Sicherheitskonfigurationen und -behebungen in Ihrer Umgebung in großem Maßstab durchsetzen?",
    "Möchten Sie Automatisierung teamübergreifend und über Geschäftsbereiche hinweg standardisieren und steuern?",
    "Wie koordinieren Sie die Infrastrukturbereitstellung mit der Post-Provisioning-Konfiguration und dem laufenden Betrieb?"
   ],
   "differentiators": [
    "Agentenlose Architektur – keine Agenten auf verwalteten Knoten erforderlich",
    "Menschenlesbare YAML-Playbooks senken die Einstiegshürde für die Automatisierung",
    "Zentralisierte Automatisierungssteuerung mit rollenbasierter Zugriffskontrolle über den Automation Controller",
    "Ergänzend zu Terraform: Ansible konfiguriert und betreibt Systeme nach der Bereitstellung durch Terraform"
   ]
  },
  "rh_openshift": {
   "desc": "Red Hat OpenShift ist eine Enterprise-Kubernetes-Plattform zum Erstellen, Bereitstellen und Betreiben von Container-Anwendungen auf konsistente Weise in On-Premises-, Hybrid-Cloud- und Multi-Cloud-Umgebungen.",
   "value": "Stellt eine konsistente, sichere Anwendungsplattform in Hybrid-Umgebungen bereit, reduziert den Betriebsaufwand und ermöglicht Entwicklungsteams die Self-Service-Bereitstellung und -Verwaltung von Container-Workloads unabhängig von der zugrunde liegenden Infrastruktur.",
   "questions": [
    "Möchten Sie Ihre Container- und Kubernetes-Plattform über On-Premises- und Cloud-Umgebungen hinweg standardisieren?",
    "Benötigen Ihre Entwicklungsteams eine Self-Service-Plattform zur Bereitstellung und Verwaltung von Container-Anwendungen?",
    "Wie verwalten Sie Sicherheit, Patches und Lebenszyklusbetrieb auf Ihren Kubernetes-Clustern?",
    "Planen Sie, bestehende Anwendungen zu modernisieren, indem Sie diese auf eine containerbasierte Plattform migrieren?"
   ],
   "differentiators": [
    "Enterprise-taugliche Kubernetes-Distribution mit integrierter Sicherheit, CI/CD und Entwickler-Tools",
    "Konsistente Plattform On-Premises sowie auf IBM Cloud, AWS, Azure und GCP",
    "Kubernetes-Operatoren vereinfachen das Deployment und das Lebenszyklusmanagement komplexer Workloads",
    "Validierte Integration mit IBM Fusion HCI und IBM Cloud Paks"
   ]
  },
  "rh_openshift_ai": {
   "desc": "Red Hat OpenShift AI ist eine flexible und skalierbare KI- und Machine-Learning-Plattform, die auf Red Hat OpenShift aufbaut und Unternehmen die Entwicklung und den Einsatz von KI-Anwendungen in Hybrid-Umgebungen ermöglicht.",
   "value": "Bietet eine integrierte Enterprise-Umgebung für Datenerfassung, Modelltraining, Fine-Tuning, Deployment und Überwachung – sodass KI-Anwendungen in großem Maßstab auf On-Premises- und Cloud-Infrastruktur entwickelt werden können.",
   "questions": [
    "Verfügen Ihre Data-Science- und MLOps-Teams über eine konsistente Umgebung für Modellentwicklung, -training und -deployment in Ihrer Hybrid-Infrastruktur?",
    "Wie verwalten Sie den vollständigen Lebenszyklus Ihrer KI-Modelle – von der Experimentierphase bis zum Produktions-Deployment und zur Überwachung?",
    "Möchten Sie die Markteinführung von KI-Anwendungen beschleunigen und dabei Governance- und Sicherheitskontrollen beibehalten?",
    "Benötigen Sie Hardware-Beschleunigung für Modelltraining- und Inferenz-Workloads – On-Premises oder in der Cloud?"
   ],
   "differentiators": [
    "Läuft auf Red Hat OpenShift – konsistente KI-Plattform On-Premises und in der Hybrid-Cloud",
    "Unterstützt Datenerfassung, Modelltraining, Fine-Tuning, Deployment und Überwachung in einer einzigen Plattform",
    "Hardware-Beschleunigung für GPU-Workloads",
    "Native Integration mit watsonx.ai, watsonx.data und watsonx.governance für ein vollständiges KI-Lebenszyklusmanagement"
   ]
  }
 },
 "connections": {
  "concert>lightwell": "IBM Concert identifiziert und priorisiert Anwendungs- und Softwarelieferkettenrisiken; Lightwell stellt validierte Behebungsunterstützung für anfällige externe Open-Source-Abhängigkeiten bereit.",
  "concert>rh_ansible": "IBM Concert identifiziert und priorisiert Anwendungsrisiken; Red Hat Ansible Automation Platform automatisiert das konsistente Einspielen von Behebungen und Sicherheitskonfigurationen in verwalteten Umgebungen.",
  "lightwell>rh_ansible": "Lightwell liefert validierte Behebungspakete für anfällige Open-Source-Abhängigkeiten; Red Hat Ansible Automation Platform automatisiert deren konsistentes Deployment in der gesamten Umgebung.",
  "terraform>rh_ansible": "Terraform stellt Infrastruktur als Code bereit; Red Hat Ansible Automation Platform konfiguriert Systeme und automatisiert Betriebsaufgaben nach oder parallel zur Bereitstellung – komplementäre Technologien für Infrastruktur und Betrieb.",
  "fusion_hci>rh_openshift": "IBM Fusion HCI stellt eine integrierte konvergierte On-Premises-Infrastrukturbasis für containerisierte Red Hat OpenShift-Anwendungen bereit, einschließlich Rechenleistung, Speicher und Lebenszyklusmanagement.",
  "ibm_bob>rh_ansible": "IBM Bob unterstützt Entwickler beim Erstellen von Code und Automatisierungsinhalten; Red Hat Ansible Automation Platform führt diese Automatisierung aus und steuert sie in Enterprise-Maßstab über die gesamte IT-Umgebung.",
  "ibm_bob>rh_openshift": "IBM Bob beschleunigt die Anwendungsentwicklung und -modernisierung; Red Hat OpenShift stellt die Enterprise-Container-Plattform bereit, auf der diese Anwendungen erstellt, deployt und betrieben werden.",
  "rh_openshift_ai>wxai": "Red Hat OpenShift AI stellt die Enterprise-MLOps-Plattform für Modelltraining, Fine-Tuning und Deployment bereit; watsonx.ai liefert die Foundation-Model- und KI-Modellentwicklungsfähigkeiten von IBM – gemeinsam bilden sie eine vollständige Hybrid-KI-Entwicklungs- und Deployment-Umgebung.",
  "rh_openshift_ai>wxdata": "Red Hat OpenShift AI verarbeitet gesteuerte Daten aus dem watsonx.data-Lakehouse für Modelltraining und Inferenz und ermöglicht KI-Workloads den Zugriff auf hybride Daten-Assets in On-Premises- und Cloud-Umgebungen.",
  "rh_openshift_ai>wxdi": "watsonx.data intelligence stellt Fähigkeiten zur Datenerkennung, Metadatenverwaltung, Datenherkunft und Datenqualität bereit, die sicherstellen, dass die Daten für die Trainings- und Inferenzpipelines von Red Hat OpenShift AI verstanden und zuverlässig sind.",
  "rh_openshift_ai>wxdint": "watsonx.data integration liefert die Datenbewegungs- und Transformationspipelines, die Red Hat OpenShift AI mit aufbereiteten, KI-fähigen Daten aus dem gesamten Unternehmen für Training, Fine-Tuning und Inferenz versorgen.",
  "rh_openshift_ai>wxgov": "watsonx.governance übernimmt das KI-Modellrisikomanagement, Lebenszyklussteuerung und Compliance-Überwachung für KI-Workloads, die auf Red Hat OpenShift AI deployt werden – zur Förderung verantwortungsvoller KI im Enterprise-Maßstab.",
  "rh_openshift_ai>wxorch": "Red Hat OpenShift AI stellt die Modell-Deployment-Infrastruktur bereit, auf die KI-Agenten und Workflows von watsonx Orchestrate angewiesen sind, und ermöglicht so eine KI-Automatisierung im Enterprise-Maßstab in Hybrid-Umgebungen."
 }
};
