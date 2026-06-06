// script.js
// Modern vanilla JavaScript for portfolio interaction.
// This file adds smooth scrolling, section highlighting, typing effect,
// scroll reveal animations, and a back-to-top button.

document.addEventListener("DOMContentLoaded", () => {
    // 1. Smooth scrolling for anchor links.
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');

    smoothScrollLinks.forEach((link) => {
        link.addEventListener("click", (event) => {
            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const targetElement = document.querySelector(targetId);

            if (!targetElement) {
                return;
            }

            event.preventDefault();
            targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
        });
    });

    // 2. Highlight active navbar link while scrolling.
    const navLinks = document.querySelectorAll("nav a[href^='#']");
    const sections = Array.from(navLinks)
        .map((link) => document.querySelector(link.getAttribute("href")))
        .filter(Boolean);

    function updateActiveLink() {
        const scrollPosition = window.scrollY + window.innerHeight / 3;

        let activeSectionId = sections[0]?.id || "";

        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                activeSectionId = section.id;
            }
        });

        navLinks.forEach((link) => {
            if (link.getAttribute("href") === `#${activeSectionId}`) {
                link.classList.add("active");
            } else {
                link.classList.remove("active");
            }
        });
    }

    if (navLinks.length && sections.length) {
        updateActiveLink();
        window.addEventListener("scroll", updateActiveLink, { passive: true });
    }

    // 3. Typing effect in hero section.
    const typingElement = document.querySelector(".typing-text");
    const typingWords = [
        "Web Developer",
        "JavaScript Learner",
        "C++ Programmer",
        "Problem Solver",
    ];
    const typingDelay = 120;
    const erasingDelay = 60;
    const nextWordDelay = 1800;
    let typingIndex = 0;
    let charIndex = 0;
    let isErasing = false;

    function typeEffect() {
        if (!typingElement) {
            return;
        }

        const currentWord = typingWords[typingIndex];

        if (!isErasing) {
            typingElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex += 1;

            if (charIndex === currentWord.length) {
                isErasing = true;
                setTimeout(typeEffect, nextWordDelay);
                return;
            }
        } else {
            typingElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex -= 1;

            if (charIndex === 0) {
                isErasing = false;
                typingIndex = (typingIndex + 1) % typingWords.length;
            }
        }

        const delay = isErasing ? erasingDelay : typingDelay;
        setTimeout(typeEffect, delay);
    }

    if (typingElement) {
        typeEffect();
    }

    // 4. Create Back To Top button dynamically.
    const backToTopButton = document.createElement("button");
    backToTopButton.className = "back-to-top";
    backToTopButton.type = "button";
    backToTopButton.textContent = "↑ Top";
    backToTopButton.style.position = "fixed";
    backToTopButton.style.right = "1.5rem";
    backToTopButton.style.bottom = "1.5rem";
    backToTopButton.style.padding = "0.95rem 1.15rem";
    backToTopButton.style.borderRadius = "999px";
    backToTopButton.style.border = "none";
    backToTopButton.style.background = "rgba(56, 189, 248, 0.95)";
    backToTopButton.style.color = "#0f172a";
    backToTopButton.style.boxShadow = "0 18px 40px rgba(0, 0, 0, 0.2)";
    backToTopButton.style.cursor = "pointer";
    backToTopButton.style.opacity = "0";
    backToTopButton.style.transform = "translateY(24px)";
    backToTopButton.style.transition = "opacity 250ms ease, transform 250ms ease";
    backToTopButton.style.zIndex = "55";
    backToTopButton.style.display = "none";

    document.body.appendChild(backToTopButton);

    function toggleBackToTop() {
        if (window.scrollY > 300) {
            backToTopButton.style.display = "inline-flex";
            backToTopButton.style.opacity = "1";
            backToTopButton.style.transform = "translateY(0)";
        } else {
            backToTopButton.style.opacity = "0";
            backToTopButton.style.transform = "translateY(24px)";
            setTimeout(() => {
                if (window.scrollY <= 300) {
                    backToTopButton.style.display = "none";
                }
            }, 250);
        }
    }

    if (backToTopButton) {
        window.addEventListener("scroll", toggleBackToTop, { passive: true });

        backToTopButton.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    // 5. Scroll reveal animations using Intersection Observer.
    const revealSelectors = ["#about", "#skills", "#projects", "#contact"];
    const revealElements = revealSelectors
        .map((selector) => document.querySelector(selector))
        .filter(Boolean);

    const revealOptions = {
        root: null,
        rootMargin: "0px 0px -10% 0px",
        threshold: 0.15,
    };

    function revealCallback(entries, observer) {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            }
        });
    }

    if (revealElements.length) {
        const revealObserver = new IntersectionObserver(revealCallback, revealOptions);
        revealElements.forEach((element) => {
            element.classList.add("reveal-section");
            revealObserver.observe(element);
        });
    }

    // 6. Button hover and click micro-interactions.
    const buttons = document.querySelectorAll(".btn-primary, .btn-secondary, .back-to-top");

    buttons.forEach((button) => {
        button.addEventListener("mouseenter", () => {
            button.style.transform = "translateY(-2px)";
        });

        button.addEventListener("mouseleave", () => {
            button.style.transform = "translateY(0)";
        });

        button.addEventListener("mousedown", () => {
            button.style.transform = "translateY(1px)";
        });

        button.addEventListener("mouseup", () => {
            button.style.transform = "translateY(-2px)";
        });
    });

    // 7. Welcome message in the browser console.
    console.log("Welcome to Tehreem's Portfolio");
});
