---
layout: post
title:  "Three Pillars of NFV"
date:   2018-09-10 23:30:00 +0530
categories: NFV cloud telco
---

Considering and integrating some basic concepts from an early stage will definitely pay off in the latter part of any NFV journey. While it is possible to virtualize an entire network ignoring these concepts, it will end up in a situation that is not very different from a legacy telecom network where PNFs  (Physical Network Functions) are one to one replaced by VNFs (Virtual Network Functions) with the current inefficiencies still prevailing. <!--more--> 

# The concepts

In a previous article we discussed about the [benefits that NFV brings in to the telecom network]({{ site.baseurl }}{% post_url  2018-08-07-benefits-of-nfv %}). However in order to effectively reap those benefits it is essential to understand some basic concepts, upon which all these benefits rely on. 
There are three basic concepts: simple, agile and programmable- that should be integrated in to every NFV transformation. 

![Three basic Concepts]({{ "/assets/images/nfv_concepts.png" | absolute_url }})

Most of our expected benefits of NFV are built upon these three concepts. So let's look in to them in detail.

## Programmable

Network engineers working on traditional telecom networks had a lot of manual and routine work such as commissioning new network nodes, testing services, taking backups, ad-hoc service provisioning, faulty hardware replacement, capacity expansions, software upgrades and so on. We must also not forget that this type of work had to be repeated for each of the physical network nodes separately. As the networks scaled up exponentially in size due to recent demands in broadband services, the amount of manual work also increased accordingly.

With the advent of NFV a certain part of this work which involves the infrastructure, becomes eligible for being programmed. For example an expansion in a PNF would require buying more hardware, installing, power up, testing, software loading, and commissioning. It was impossible if not extremely difficult to automate a majority of these tasks. However with a VNF capacity expansion would be equivalent to spinning up more VMs and commissioning, which is quite a good opportunity to be programmed and automated. 

However network strategists should not forget that quite a big portion of these opportunities of programmability depends on the support of the VNF itself. So in order to implement an effectively programmable network not only the NFV infrastructure but also the VNF should support programmability. Evidently the opportunities for programmability should be evaluated on a cases by case basis and appropriate frameworks and policies should be set in place if we are to effectively operationalize the benefits of programmability.

## Agile

In common English terms agile means being able to move quickly and easily. When applied to telecom networks this can be defined as being able to adjust quickly and easily for different scenarios. The scenarios can vary from recovering from fault, implementing a new service, handling a traffic spike etc.

So are the telecom networks agile today? Comparative to technical systems operating at their counterparts or competitors such as OTT players we should admit that telecom networks are still quite primitive when it comes to being agile. By default NFV will bring in some forms of agility to limited scopes. However if we overlooked the corresponding support from VNFs that limited agility will never be enough.

Let’s consider an example scenario of implementing a new service. Traditionally we would follow a procedure such as paper based technical evaluation, capacity forecast, commercial model evaluation, shipping hardware, allocating space and power, install, commission and acceptance testing, after which the service would be put in to live operation. This procedure easily take more than 12 months to complete, in average. 

In the NFV world we could bypass all these steps and deploy the VNF as a POC (Proof of Concept) or pilot service and evaluate the actual potential of the new service and then go for the fully fledged deployment by dynamically scaling out capacity. However in order to accomplish this, the VNF should support a suitable dynamic licensing model (preferably an OpEx licensing model). Without that the new service deployment will be stuck in a lengthy commercial evaluation and negotiation while the agility of NFV will stay hibernated. While it is true that VNF licensing models are decided by VNF vendors and not by operators, the operators also have a role to play on insisting the vendors for adapting new license models. Additionally opening up their doors for new VNF vendors entering to the market can increase the bargaining power of the telecom operator.

## Simple

Any engineer with hands-on experience in a telecom network would witness that the legacy telecom systems are far from being simple. Each of the nodes had their own hardware and software architectures, with proprietary set of instructions (commonly known as MML - Man Machine Language). So effectively in order to manage a network with equipment from  multiple vendors, multiple engineers were required who were proficient in the equipment of each of the vendors.

NFV eliminate the vendor specific hardware, replacing it with COTS servers. While the inner working of NFV is quite complex it can effectively hide all these complexities from the application engineers and expose a simplified interface for VNFs to work with. Still a considerable portion of the functionality of telecom services reside on the VNF. In order to hide their complexity the VNFs need to provide unified APIs and data models so that operation of a VNF also become simpler for the network engineers.
 
# How to operationalize these concepts?
At this point it should be crystal clear that NFV transformation is simply not about bringing in the most advanced or feature-rich NFV infrastructure with a cutting-edge NFV Orchestrator. A lot of benefits of NFV relies more on the functionality of VNF than on features of NFVi. 

![NFV benefits rely more on VNF than on NFV]({{ "/assets/images/nfv_pillars.png" | absolute_url }})

An NFV transformation should never be considered as bringing in a new application or a tool. NFV requires disruptive changes to the entire operating ecosystem of telecom operators in order to yield its full benefit and the three concepts described above would provide a baseline for identifying those changes. If this ecosystem change is not executed properly NFV would be just another new technology that would be silently absorbed in to the existing ecosystem and may end up not living up to its originally claimed expectations.
