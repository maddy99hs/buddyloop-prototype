// ---------- Data ----------
const PROGRAMS = {
  cultural: {
    title: "Cultural Buddy Program",
    pill: "Cultural",
    desc: "Learn typical customs, social norms, and everyday culture in a friendly, non-judgmental way.",
    bullets: [
      "Etiquette, communication style, and small talk",
      "Food, festivals, local habits and values",
      "Workplace culture basics and common expectations"
    ]
  },
  city: {
    title: "City Buddy Program",
    pill: "City",
    desc: "Get oriented in your city: transport, tickets, maps, key places, and simple local rules.",
    bullets: [
      "Bus/tram/train basics + buying tickets",
      "Finding essentials (pharmacy, supermarkets, offices)",
      "City norms (waste separation, quiet hours, zones)"
    ]
  },
  daily: {
    title: "Daily Life Buddy Program",
    pill: "Daily Life",
    desc: "Support for essential tasks like appointments, paperwork, and understanding how systems work.",
    bullets: [
      "Prepare for doctor appointments (questions, documents)",
      "Bank/post office visits + forms (navigation only)",
      "Emotional support during stressful first tasks"
    ]
  },
  uni: {
    title: "University Buddy Program",
    pill: "University",
    desc: "Short-term onboarding support for students during the first week or first month.",
    bullets: [
      "Campus orientation and where to find services",
      "Uni portals, email, schedules, exams and deadlines",
      "First-month survival tips + social integration"
    ]
  },
  any: {
    title: "Any Program",
    pill: "Any",
    desc: "We’ll match you with the most relevant buddy.",
    bullets: ["Flexible matching based on your needs."]
  }
};

const BUDDIES = [
  {
    id: "b1",
    name: "Lea (Local Buddy)",
    languages: ["german", "english"],
    programs: ["city", "daily", "cultural"],
    availability: ["weekday-evenings", "weekends"],
    tags: ["Patient explainer", "Great with transport", "Calm vibe"],
    bio: "I love helping newcomers feel confident in the city. We can start with chat, then do a public walk for transport + essentials."
  },
  {
    id: "b2",
    name: "Arjun (Student Buddy)",
    languages: ["english", "hindi"],
    programs: ["uni", "city"],
    availability: ["weekends", "flexible"],
    tags: ["Uni portals pro", "Friendly", "Fast replies"],
    bio: "I’ve been through the first-month confusion. I can help you with campus navigation, schedules, portals, and settling in."
  },
  {
    id: "b3",
    name: "Mira (Cultural Buddy)",
    languages: ["english", "german"],
    programs: ["cultural"],
    availability: ["weekday-evenings"],
    tags: ["Intercultural", "Good listener", "Café meetups"],
    bio: "Let’s make culture feel simple: norms, habits, social rules, and the 'unspoken stuff' — without pressure."
  },
  {
    id: "b4",
    name: "Sven (Daily Life Buddy)",
    languages: ["german", "english"],
    programs: ["daily", "city"],
    availability: ["weekday-days", "flexible"],
    tags: ["Appointment prep", "Organized", "Supportive"],
    bio: "I can help you prepare documents + questions for appointments and understand how processes work (no legal/medical advice)."
  }
];

// ---------- Helpers ----------
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

function showView(viewId){
  $$(".view").forEach(v => v.classList.remove("active"));
  $(`#view-${viewId}`).classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function programLabel(key){
  return PROGRAMS[key]?.title ?? "Program";
}

// ---------- Navigation ----------
$$("[data-nav]").forEach(btn => {
  btn.addEventListener("click", () => showView(btn.dataset.nav));
});

// Program cards -> detail
$$("[data-open-program]").forEach(btn => {
  btn.addEventListener("click", () => openProgram(btn.dataset.openProgram));
});

function openProgram(key){
  const p = PROGRAMS[key];
  $("#programTitle").textContent = p.title;
  $("#programDesc").textContent = p.desc;
  $("#programPill").textContent = p.pill;

  const ul = $("#programBullets");
  ul.innerHTML = "";
  p.bullets.forEach(b => {
    const li = document.createElement("li");
    li.textContent = b;
    ul.appendChild(li);
  });

  $("#programMatchBtn").onclick = () => {
    setMatchProgram(key);
    showView("match");
  };

  showView("program");
}

// Start match from program card
$$("[data-start-match]").forEach(btn => {
  btn.addEventListener("click", () => {
    setMatchProgram(btn.dataset.startMatch);
    showView("match");
  });
});

function setMatchProgram(key){
  $("#programSelect").value = key ?? "any";
  $("#matchProgramPill").textContent = PROGRAMS[key]?.pill ?? "Any Program";
}

// ---------- Match Form ----------
$("#matchForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const program = $("#programSelect").value;
  const language = $("#languageSelect").value;
  const availability = $("#availabilitySelect").value;
  const city = $("#cityInput").value.trim();
  const needs = $("#needsInput").value.trim();
  const meeting = $("#meetingSelect").value;

  const matches = findMatches({ program, language, availability });
  renderResults(matches, { program, language, availability, city, needs, meeting });
  showView("results");
});

function findMatches({ program, language, availability }){
  return BUDDIES
    .filter(b =>
      (program === "any" || b.programs.includes(program)) &&
      b.languages.includes(language) &&
      b.availability.includes(availability)
    )
    .slice(0, 3);
}

function renderResults(matches, meta){
  const label = programLabel(meta.program);
  $("#resultsMeta").textContent = `${matches.length} match(es) • ${label}`;

  const host = $("#resultsList");
  host.innerHTML = "";

  if(matches.length === 0){
    host.innerHTML = `
      <div class="card">
        <h3>No matches found</h3>
        <p class="muted">Try “Any Program”, change availability, or use English as the language.</p>
        <button class="primary" data-nav="match">Adjust match</button>
      </div>
    `;
    host.querySelector("[data-nav='match']").addEventListener("click", () => showView("match"));
    return;
  }

  matches.forEach(buddy => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <div class="row space-between">
        <h3 style="margin:0">${buddy.name}</h3>
        <div class="pill">Good fit</div>
      </div>
      <p class="muted">${buddy.bio}</p>
      <div class="tags">
        ${buddy.tags.map(t => `<span class="tag">${t}</span>`).join("")}
      </div>
      <div class="row">
        <button class="primary" data-view="${buddy.id}">View profile</button>
        <button class="secondary" data-msg="${buddy.id}">Message</button>
      </div>
      <p class="tiny muted">Matched for: ${PROGRAMS[meta.program]?.pill ?? "Any"} • ${meta.language} • ${meta.availability}</p>
    `;
    host.appendChild(card);
  });

  // wire buttons
  host.querySelectorAll("[data-view]").forEach(btn => {
    btn.addEventListener("click", () => openModal(btn.dataset.view));
  });
  host.querySelectorAll("[data-msg]").forEach(btn => {
    btn.addEventListener("click", () => openModal(btn.dataset.msg));
  });
}

// ---------- Modal ----------
const modal = $("#modal");
$("#modalClose").addEventListener("click", closeModal);
modal.addEventListener("click", (e) => { if(e.target === modal) closeModal(); });

function openModal(buddyId){
  const b = BUDDIES.find(x => x.id === buddyId);
  if(!b) return;

  $("#modalName").textContent = b.name;
  $("#modalBio").textContent = b.bio;

  const tags = $("#modalTags");
  tags.innerHTML = "";
  b.tags.forEach(t => {
    const span = document.createElement("span");
    span.className = "tag";
    span.textContent = t;
    tags.appendChild(span);
  });

  $("#modalRequest").onclick = () => alert("Prototype: request sent (not really) ✅");
  $("#modalMessage").onclick = () => alert("Prototype: opening chat (not really) 💬");

  modal.classList.remove("hidden");
}

function closeModal(){
  modal.classList.add("hidden");
}

// default route
showView("home");
