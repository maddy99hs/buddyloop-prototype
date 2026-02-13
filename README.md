# BuddyLoop – Buddy Matching Prototype

BuddyLoop is a **front-end prototype** that helps newcomers find the right kind of buddy for their **first weeks in a new place** – cultural, city navigation, daily life tasks, or university onboarding. It was created as part of the *Design Thinking Intercontinental COIL Program* (Germany • Argentina • Nigeria).

> This is a **UI-only prototype** for showcasing the concept.  
> No accounts, no real chat, and no data is stored.

---

## Problem & Concept

Moving to a new city or country can feel isolating and confusing – new systems, new culture, and a lot of “I don’t even know what to ask”.

**BuddyLoop** explores a simple idea:

> Instead of one generic “mentor”, let people choose the *type* of support they need –  
> **Cultural**, **City**, **Daily Life**, or **University** –  
> and match them with a suitable buddy.

The prototype focuses on:

- Reducing first-weeks anxiety
- Making it easier to ask for help
- Encouraging safe, public, low-pressure meetups

---

## Features

- **4 Buddy Programs**  
  – Cultural Buddy  
  – City Buddy  
  – Daily Life Buddy  
  – University Buddy :contentReference[oaicite:0]{index=0}  

- **Guided matching flow**  
  “Get matched” form with:
  - Program choice (or “Any”)  
  - Preferred language  
  - Availability  
  - City (prototype only)  
  - Short description of what you need  
  - Preferred meeting type (chat / call / public meetup) :contentReference[oaicite:1]{index=1}  

- **Simple matching logic**  
  A small buddy dataset is filtered by:
  - program
  - language
  - availability  
  and returns up to 3 matches. :contentReference[oaicite:2]{index=2}  

- **Buddy profiles in a modal**  
  Each match has:
  - name + short bio  
  - tags (style, strengths, vibe)  
  - “Request buddy” / “Message” buttons that trigger **prototype alerts** instead of real actions. :contentReference[oaicite:3]{index=3}  

- **Safety & boundaries baked into UI**  
  - Safety notice in the program detail view  
  - Footer note: “UI-only • No data stored”  
  - Modal tip: first meetings in public places, use chat first.   

---

## Tech Stack

- HTML5 (single-page layout, sections as “views”)
- CSS3 with a modern, glassy product-style UI theme
- Vanilla JavaScript (no frameworks) for view routing, matching logic, and modal behaviour



