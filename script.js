const envelope = document.getElementById("envelope");
const resume = document.getElementById("resume");
const closeBtn = document.getElementById("closeBtn");
const flap = document.querySelector(".flap");
const seal = document.querySelector(".seal");
const typingElement = document.getElementById("typingName");
const cursorGlow = document.getElementById("cursorGlow");
const envelopeHint = document.getElementById("envelopeHint");

const fullName = "Pavan Kalyan Mendu";
let isOpen = false;

function typeWriter(text, i) {
    if (i < text.length) {
        typingElement.innerHTML = text.substring(0, i + 1);
        setTimeout(() => typeWriter(text, i + 1), 70);
    }
}

document.addEventListener("mousemove", (e) => {
    const { clientX: x, clientY: y } = e;
    gsap.to(cursorGlow, { x: x, y: y, duration: 0.6 });
    if(!isOpen) {
        const cx = window.innerWidth / 2, cy = window.innerHeight / 2;
        gsap.to(envelope, { rotationY: (x - cx) / cx * 15, rotationX: -(y - cy) / cy * 15, duration: 0.5 });
    }
});

envelope.addEventListener("click", () => {
    if (isOpen) return;
    isOpen = true;
    const tl = gsap.timeline();
    tl.to(envelopeHint, { autoAlpha: 0, duration: 0.3 })
      .to(flap, { rotationX: 180, duration: 0.6 })
      .to(seal, { opacity: 0, scale: 0, duration: 0.3 }, "-=0.4")
      .set(resume, { visibility: "visible", position: "absolute" }) 
      .to(resume, {
          opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.2)",
          onStart: () => { 
              resume.style.pointerEvents = "all"; 
              typingElement.innerHTML = ""; 
              setTimeout(() => typeWriter(fullName, 0), 500);
          },
          onComplete: () => {
              resume.style.position = "relative"; 
          }
      }, "-=0.2")
      .to(envelope, { autoAlpha: 0, duration: 0.4 }, "-=0.5");
});

closeBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    isOpen = false;
    const tl = gsap.timeline();
    tl.to(resume, { 
          opacity: 0, scale: 0.5, duration: 0.5, 
          onStart: () => { resume.style.position = "absolute"; },
          onComplete: () => { resume.style.pointerEvents = "none"; resume.style.visibility = "hidden"; }
      })
      .to(envelope, { autoAlpha: 1, duration: 0.4 }, "-=0.3")
      .to(envelopeHint, { autoAlpha: 0.8, duration: 0.4 }, "-=0.2")
      .to(flap, { rotationX: 0, duration: 0.5 }, "-=0.1")
      .to(seal, { opacity: 1, scale: 1, duration: 0.3 });
});

const particlesContainer = document.getElementById("particles");
for (let i = 0; i < 50; i++) {
    const p = document.createElement("div");
    p.className = "particle";
    const size = Math.random() * 2 + 1;
    p.style.cssText = `width:${size}px; height:${size}px; left:${Math.random()*100}%; top:${Math.random()*100}%;`;
    particlesContainer.appendChild(p);
    gsap.to(p, { y: -100, opacity: Math.random() * 0.5, duration: Math.random() * 15 + 10, repeat: -1, ease: "linear" });
}