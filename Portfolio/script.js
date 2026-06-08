document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");
  const navItems = document.querySelectorAll(".nav-link");

  if (hamburger) {
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("active");

      const icon = hamburger.querySelector("i");

      if (navLinks.classList.contains("active")) {
        icon.classList.remove("fa-bars");
        icon.classList.add("fa-xmark");
      } else {
        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");
      }
    });
  }

  // Close mobile menu when link is clicked
  navItems.forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");

      const icon = hamburger.querySelector("i");
      icon.classList.remove("fa-xmark");
      icon.classList.add("fa-bars");
    });
  });

  /* ==========================================
       ACTIVE NAVIGATION HIGHLIGHT
    ========================================== */
  const sections = document.querySelectorAll("section");

  function updateActiveNav() {
    let currentSection = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;

      if (
        window.scrollY >= sectionTop &&
        window.scrollY < sectionTop + sectionHeight
      ) {
        currentSection = section.getAttribute("id");
      }
    });

    navItems.forEach((link) => {
      link.classList.remove("active");

      if (link.getAttribute("href") === `#${currentSection}`) {
        link.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", updateActiveNav);
  updateActiveNav();

  /* ==========================================
       SCROLL REVEAL ANIMATION
    ========================================== */
  const revealElements = document.querySelectorAll(".reveal");

  function revealOnScroll() {
    revealElements.forEach((element) => {
      const windowHeight = window.innerHeight;
      const elementTop = element.getBoundingClientRect().top;

      const revealPoint = 120;

      if (elementTop < windowHeight - revealPoint) {
        element.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll();

  /* ==========================================
       SCROLL TO TOP BUTTON
    ========================================== */
  const scrollTopBtn = document.getElementById("scrollTopBtn");

  function toggleScrollButton() {
    if (window.scrollY > 400) {
      scrollTopBtn.style.display = "flex";
      scrollTopBtn.style.alignItems = "center";
      scrollTopBtn.style.justifyContent = "center";
    } else {
      scrollTopBtn.style.display = "none";
    }
  }

  window.addEventListener("scroll", toggleScrollButton);

  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  /* ==========================================
       CONTACT FORM VALIDATION
    ========================================== */
  const contactForm = document.getElementById("contactForm");

  const formMessage = document.getElementById("formMessage");

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("name").value.trim();

      const email = document.getElementById("email").value.trim();

      const subject = document.getElementById("subject").value.trim();

      const message = document.getElementById("message").value.trim();

      if (name === "" || email === "" || subject === "" || message === "") {
        showMessage("Please fill all fields.", "red");

        return;
      }

      if (!validateEmail(email)) {
        showMessage("Please enter a valid email address.", "red");

        return;
      }

      showMessage("Message sent successfully! (Demo Mode)", "green");

      contactForm.reset();
    });
  }

  function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailPattern.test(email);
  }

  function showMessage(message, color) {
    formMessage.textContent = message;
    formMessage.style.color = color;

    setTimeout(() => {
      formMessage.textContent = "";
    }, 4000);
  }

  /* ==========================================
       SMOOTH SCROLL FOR INTERNAL LINKS
    ========================================== */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");

      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        e.preventDefault();

        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  /* ==========================================
       HEADER SHADOW ON SCROLL
    ========================================== */
  const header = document.querySelector(".header");

  function handleHeaderShadow() {
    if (window.scrollY > 50) {
      header.style.boxShadow = "0 5px 20px rgba(0,0,0,0.1)";
    } else {
      header.style.boxShadow = "0 2px 10px rgba(0,0,0,0.05)";
    }
  }

  window.addEventListener("scroll", handleHeaderShadow);

  handleHeaderShadow();

  /* ==========================================
       SKILL BAR ANIMATION
    ========================================== */
  const progressBars = document.querySelectorAll(".progress");

  let skillsAnimated = false;

  function animateSkillBars() {
    const skillsSection = document.getElementById("skills");

    if (!skillsSection) return;

    const sectionTop = skillsSection.getBoundingClientRect().top;

    if (sectionTop < window.innerHeight - 150 && !skillsAnimated) {
      progressBars.forEach((bar) => {
        const finalWidth =
          bar.style.width || window.getComputedStyle(bar).width;

        bar.style.width = "0";

        setTimeout(() => {
          bar.style.transition = "width 1.5s ease";
          bar.style.width = finalWidth;
        }, 100);
      });

      skillsAnimated = true;
    }
  }

  window.addEventListener("scroll", animateSkillBars);

  animateSkillBars();

  /* ==========================================
       PROJECT CARD HOVER EFFECT
    ========================================== */
  const projectCards = document.querySelectorAll(".project-card");

  projectCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-12px)";
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0)";
    });
  });

  /* ==========================================
       CURRENT YEAR IN FOOTER (OPTIONAL)
    ========================================== */
  const footerParagraph = document.querySelector(".footer p");

  if (footerParagraph) {
    const currentYear = new Date().getFullYear();

    footerParagraph.innerHTML = `© ${currentYear} Pranav Prabhakar. All Rights Reserved.`;
  }

  console.log("Portfolio Website Loaded Successfully 🚀");
});
