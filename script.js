document.addEventListener("DOMContentLoaded", () => {
  const textEl = document.getElementById("typed-text");
  const text = "Katta Teja";
  let index = 0;
  let isDeleting = false;
  let delay = 150;

  function typeLoop() {
    if (isDeleting) {
      textEl.textContent = text.substring(0, index--);
    } else {
      textEl.textContent = text.substring(0, index++);
    }

    // Control typing speed
    if (!isDeleting && index === text.length + 1) {
      isDeleting = true;
      delay = 100;
      setTimeout(typeLoop, 1000); // pause before deleting
      return;
    } else if (isDeleting && index === -1) {
      isDeleting = false;
      delay = 200;
      setTimeout(typeLoop, 500); // pause before retyping
      return;
    }

    setTimeout(typeLoop, delay);
  }

  typeLoop();
});




  function typeText(element, text, speed = 30) {
    let index = 0;

    // Create an offscreen element to calculate full height
    const ghost = document.createElement("p");
    ghost.style.position = "absolute";
    ghost.style.visibility = "hidden";
    ghost.style.pointerEvents = "none";
    ghost.style.whiteSpace = "pre-line";
    ghost.style.width = element.offsetWidth + "px";
    ghost.textContent = text;
    document.body.appendChild(ghost);

    // Fix height to prevent layout shift
    element.style.minHeight = ghost.offsetHeight + "px";

    document.body.removeChild(ghost);

    function typeChar() {
      if (index < text.length) {
        element.textContent += text.charAt(index);
        index++;
        setTimeout(typeChar, speed);
      }
    }

    typeChar();
  }

  document.addEventListener("DOMContentLoaded", () => {
    const animatedTextEl = document.querySelector("#animated-text");
    if (animatedTextEl) {
      const originalText = animatedTextEl.textContent.trim();
      animatedTextEl.textContent = ""; // Clear the text first
      typeText(animatedTextEl, originalText, 25);
    }
  });






document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-links a");
  const animatedElements = document.querySelectorAll("[data-animate]");

  const activateNavLink = () => {
    let currentSectionId = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120; // more buffer for mobile
      const sectionHeight = section.offsetHeight;

      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${currentSectionId}`);
    });
  };

  const animateOnScroll = () => {
    animatedElements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 80) {
        el.classList.add("in-view");
      }
    });
  };

  const handleScroll = () => {
    activateNavLink();
    animateOnScroll();
  };

  // Add throttling to improve performance
  let throttleTimeout;
  window.addEventListener("scroll", () => {
    if (!throttleTimeout) {
      throttleTimeout = setTimeout(() => {
        handleScroll();
        throttleTimeout = null;
      }, 100); // run every 100ms max
    }
  });

  // Initial run (in case user is already scrolled)
  handleScroll();
});
