const header = document.getElementById("header");
const navToggle = document.getElementById("nav-toggle");
const navMenu = document.getElementById("nav-menu");
const navLinks = document.querySelectorAll(".nav-link");
const projectCards = document.querySelectorAll(".project-card[data-project]");
const modal = document.getElementById("project-modal");
const modalTitle = document.getElementById("modal-title");
const modalBody = document.getElementById("modal-body");
const year = document.getElementById("year");

if (year) {
  year.textContent = new Date().getFullYear();
}

function updateHeaderState() {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 12);
}

window.addEventListener("scroll", updateHeaderState, { passive: true });
updateHeaderState();

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.forEach((item) => item.classList.remove("active"));
    link.classList.add("active");
    if (navMenu) navMenu.classList.remove("is-open");
    if (navToggle) navToggle.setAttribute("aria-expanded", "false");
  });
});

const projectDetails = {
  "aura": {
    title: "Aura",
    content: `
      <div class="content-block">
        <div>
          <h4>Overview</h4>
          <p>A Salesforce internal initiative building AI agents for the SRE team, using Mastra to orchestrate agentic reliability workflows.</p>
        </div>
        <div>
          <h4>Problem space</h4>
          <p>Incident investigation can require engineers to gather operational context and diagnostic information across multiple tools and systems.</p>
        </div>
        <div>
          <h4>Engineering approach</h4>
          <ul>
            <li>Mastra-based orchestration for SRE-focused agent workflows.</li>
            <li>Slack MCP integrations and diagnostic aggregation to bring relevant operational context together.</li>
            <li>Workflow design focused on supporting investigation and mitigation guidance, with engineers retaining operational judgment.</li>
          </ul>
        </div>
        <div>
          <h4>Scope</h4>
          <p>Internal Salesforce work. Implementation details are kept high-level; no impact metrics are published here.</p>
        </div>
      </div>
    `
  },
  "legalbuddy": {
    title: "LegalBuddy",
    content: `
      <div class="content-block">
        <div>
          <h4>Overview</h4>
          <p>An Android assistant for legal workflows, designed around grounded responses, evidence-backed reasoning, and claim verification.</p>
        </div>
        <div>
          <h4>Problem</h4>
          <p>Legal answers need to be inspectable. The product emphasizes grounding and traceability instead of asking users to trust unsupported model output.</p>
        </div>
        <div>
          <h4>Design decisions</h4>
          <ul>
            <li>Kotlin Android application with a Jetpack Compose interface.</li>
            <li>MVVM structure with Room persistence for local application state.</li>
            <li>Server-sent events (SSE) for streamed responses and OpenRouter-backed model calls.</li>
            <li>Evidence spans and claim verification to make responses easier to check.</li>
          </ul>
        </div>
        <div>
          <h4>Stack</h4>
          <p>Kotlin, Android, Compose, MVVM, Room, SSE, OpenRouter.</p>
        </div>
      </div>
    `
  }
};

function openProjectModal(projectKey) {
  const details = projectDetails[projectKey];
  if (!details || !modal || !modalTitle || !modalBody) return;

  modalTitle.textContent = details.title;
  modalBody.innerHTML = details.content;
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
}

function closeProjectModal() {
  if (!modal) return;
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
}

projectCards.forEach((projectCard) => {
  const trigger = projectCard.querySelector(".project-trigger");
  if (!trigger) return;

  trigger.addEventListener("click", () => {
    openProjectModal(projectCard.dataset.project);
  });
});

const modalClose = document.querySelector(".modal-close");
if (modalClose) {
  modalClose.addEventListener("click", closeProjectModal);
}

if (modal) {
  modal.addEventListener("click", (event) => {
    const target = event.target;
    if (target instanceof HTMLElement && target.dataset.close === "true") {
      closeProjectModal();
    }
  });
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal && modal.classList.contains("is-open")) {
    closeProjectModal();
  }
});

const revealItems = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

revealItems.forEach((item) => revealObserver.observe(item));




