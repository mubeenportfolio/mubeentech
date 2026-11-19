const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

const sections = document.querySelectorAll("main section[id]");
const navItems = document.querySelectorAll(".nav-links a");

const updateActiveLink = () => {
  let current = "home";
  sections.forEach((section) => {
    if (window.scrollY >= section.offsetTop - 180) current = section.id;
  });
  navItems.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
  });
};

window.addEventListener("scroll", updateActiveLink, { passive: true });

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
document.getElementById("year").textContent = new Date().getFullYear();

const serviceDetails = {
  "web-development": {
    title: "Web Development",
    summary: "A responsive website tailored to your goals, audience, and content.",
    includes: [
      "Landing pages or multi-page website layouts",
      "Responsive layouts for phones, tablets, and desktops",
      "Contact details and clear calls to action",
      "Basic accessibility and cross-browser checks"
    ]
  },
  "frontend-design": {
    title: "Frontend Design",
    summary: "A polished, easy-to-use interface that presents your brand clearly.",
    includes: [
      "Page layout, typography, and color styling",
      "Responsive interface components",
      "Accessible navigation and interaction states",
      "UI refinement based on your feedback"
    ]
  },
  "app-development": {
    title: "App Development",
    summary: "Mobile-focused app screens and user flows planned around your idea.",
    includes: [
      "App screen layouts and interface styling",
      "Core user flows and screen structure",
      "Responsive patterns for different device sizes",
      "Discussion of suitable cross-platform approaches"
    ]
  },
  "it-support": {
    title: "IT Support",
    summary: "Practical help investigating common hardware, software, and system issues.",
    includes: [
      "Initial troubleshooting and issue diagnosis",
      "Operating system and application setup guidance",
      "Basic device and connectivity checks",
      "Clear next steps based on the issue"
    ]
  },
  "skill-advisor": {
    title: "Skill Advisor",
    summary: "A focused conversation to help plan your next steps in technology.",
    includes: [
      "Review of your current interests and experience",
      "Suggestions for relevant IT and development skills",
      "A practical, step-by-step learning path",
      "Guidance on choosing projects to practise"
    ]
  }
};

const serviceDialog = document.getElementById("service-dialog");
const serviceDialogClose = serviceDialog.querySelector(".service-dialog-close");
const serviceDialogTitle = document.getElementById("service-dialog-title");
const serviceDialogSummary = document.getElementById("service-dialog-summary");
const serviceDialogList = document.getElementById("service-dialog-list");
const serviceDialogWhatsapp = document.getElementById("service-dialog-whatsapp");

const openServiceDialog = (card) => {
  const service = serviceDetails[card.dataset.service];
  if (!service) throw new Error(`Unknown service: ${card.dataset.service}`);

  serviceDialogTitle.textContent = service.title;
  serviceDialogSummary.textContent = service.summary;
  serviceDialogList.replaceChildren(...service.includes.map((item) => {
    const listItem = document.createElement("li");
    listItem.textContent = item;
    return listItem;
  }));
  const message = `Hi Mubeen, I'm interested in your ${service.title} service. Could you share more details?`;
  serviceDialogWhatsapp.href = `https://wa.me/923409164926?text=${encodeURIComponent(message)}`;
  serviceDialog.showModal();
};

document.querySelectorAll(".service-card").forEach((card) => {
  card.addEventListener("click", () => openServiceDialog(card));
  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openServiceDialog(card);
    }
  });
});

serviceDialogClose.addEventListener("click", () => serviceDialog.close());
serviceDialog.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    event.preventDefault();
    serviceDialog.close();
  }
});
serviceDialog.addEventListener("click", (event) => {
  if (event.target === serviceDialog) serviceDialog.close();
});
