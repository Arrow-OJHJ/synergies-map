# IBM Synergies Map

An interactive visualisation tool for exploring IBM Software & Infrastructure cross-sell opportunities and product connections.

## Overview

This single-page HTML application helps Arrow ECS UK partners identify synergies between IBM products across six strategic plays. Click any product to reveal its connections and cross-sell opportunities.

## Features

- **Interactive Product Map**: 33 IBM products organised across 6 categories
- **6 Strategic Plays**: Automation, AI & Data, Cloud Ops, Security, Infrastructure, Storage
- **Visual Connections**: Colour-coded relationship mapping between products (connections inherit the colour of the lower category on the map)
- **Product Details**: Click any product to view its play associations and connections
- **Responsive Layout**: Adapts to different screen sizes with equal spacing algorithm
- **Optimised Performance**: Event delegation, error handling, and efficient rendering

## Usage

Simply open [`IBM_Synergies_Map.html`](IBM_Synergies_Map.html) in a web browser. No installation or dependencies required.

**Interaction:**
- Click any product node to highlight its connections
- Click again to deselect
- Click connected products in the sidebar to navigate between them
- Use the "Show all products" button to reset the view

## Product Categories

- **Automation & Integration**: API Connect, Event Automation, webMethods, Terraform, Concert, Maximo
- **Observability & FinOps**: Instana, SevOne, Turbonomic, Apptio, Apptio Cloudability
- **Security & Governance**: Guardium, Verify, Vault
- **Data & AI Platform**: watsonx.ai, watsonx.data, watsonx.data intelligence, watsonx.data integration, watsonx.governance, watsonx Orchestrate, Code Assistant (Ansible)
- **Infrastructure & Systems**: LinuxONE, Power Systems, AIX, IBM i, Linux on Power
- **Storage Solutions**: FlashSystem, Storage Control, Storage Insights, Storage Virtualize, Storage Fusion, Storage Ceph, Storage Scale

## Technical Details

- Pure HTML/CSS/JavaScript (no external dependencies)
- IBM Plex font family
- SVG-based connection rendering with animated paths
- Responsive design with smart equal spacing algorithm
- Configurable layout and animation parameters
- Event delegation for optimal performance
- Comprehensive error handling and validation
- Production-ready code quality

---

**Arrow ECS UK**