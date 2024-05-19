---
title: Tabs in Markdown
sidebar_position: 4
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


# About the Product

1. **Project Purpose and Objectives**
    - The project aims to change the way digital assets are managed by transitioning from a manual, tedious update and management process to a dynamic, user-centric platform. This platform will enable flexible data updates, feature acquisitions, and reduced dependency on centralized updates, improving efficiency and user autonomy.
2. **Scope**
    - The project will implement an "app store" model, supporting both central and tactical networks. It will allow for both push and pull update mechanisms, application lifecycle management, version "inventory management" across devices, and personalization based on device specifics such as location and communication status. First "app" – GetMap.
3. **Partners**
    - Armored combat vehicle directorate **(Mantac)**
    - Intelligence based combat **(Lohamam)**
    - Ground forces (**Aderet)**
4. **Functional Requirements**
    - **End-User Actions**: Ability for users to manage updates, access new information, and receive dynamic data.
    - **System Capabilities**: Management of application lifecycles, inventory of software versions, and adaptation to device personalization and security requirements.
5. **Non-functional Requirements**
    - Emphasis on security and reliability, with the project utilizing SAST and STRIDE methodologies to ensure robustness and protect against vulnerabilities.
6. **Risks**
    - DevOps challenges that could complicate implementation.
    - Maintenance burden of supporting viable prototypes at all stages (ex. Getmap)
7. **Communication Plan**
    - Communication tools include a public GitHub for code management, WhatsApp for informal communication, Monday.com for project management, and Swagger for API documentation.
8. **Potential Issues and Recommendations**
    - **Enhance DevOps Capabilities**: Enable wider ability to handle implementation bugs and issues through increased DevOps support.
    - **Strengthen Communication Protocols**: Clarify the use of protocols to enhance collaboration of external partners.
    - **Continuous Security and Reliability Focus**: Maintain vigilance in security practices and operational reliability (SLA) while maintaining simplicity and ease of service.
    - **Readiness for Casus Belli (Sha'at Shin) VS Product expansion:** Manage the need for progression vs ability to maintain a viable product (as of now – GetMap) at all times.
    

<Tabs>
  <TabItem value="Core" label="Core Features" default>
    -   The purpose of GetApp is to produce a comprehensive management system of digital assets in a multi-network (Multi Domain) and multi-end device (Cross Device) environment. 
    -   The goal is to produce a system that manages every software element in the network space, as part of the "digital transformation". 
    -   The management is carried out in the "app store" model and takes place in the entire network space (stationary and tactical). 
    -   The system allows control of updating software and content to the end devices - whether by push or pull, allows management of the life of the application, obtaining a snapshot of all versions on the various end devices and taking into account the personalization of the device (location, communication status, partitioning, etc.).
  </TabItem>
  <TabItem value="specs" label="Technical Specifications">
    
   SPECS

  </TabItem>
  <TabItem value="architecture" label="Architecture">
    - The system deals with tactical distribution and was built to deal with multiple edge platforms and multiple tactical networks.
    - Today the system has been deployed in CTS and installations have been carried out in Annon environments (TNG network) as well as in Elbit's tactical radio station.
    - Since the outbreak of the Iron Swords War, the system has been implemented as the agent that distributes the contents of the mapping (in the getmap project) in EVEN.
  </TabItem>
</Tabs>

