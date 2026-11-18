// Visionneuse d'images partagée (accueil et étude de cas ORION).
// Usage : window.Lightbox.open(liste, index, déclencheur) ; liste = [{ src, alt, caption }].
(() => {
  "use strict";
  let box, img, cap, count, prevBtn, nextBtn, list = [], index = 0, opener = null;

  const icon = (d) => `<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="${d}" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

  function build() {
    box = document.createElement("div");
    box.className = "lb";
    box.setAttribute("role", "dialog");
    box.setAttribute("aria-modal", "true");
    box.setAttribute("aria-label", "Visionneuse d'images");
    box.hidden = true;
    box.innerHTML = `
      <div class="lb__backdrop" data-close></div>
      <figure class="lb__figure">
        <div class="lb__stage"><img class="lb__img" alt="" decoding="async" /></div>
        <figcaption class="lb__caption"><span class="lb__text"></span><span class="lb__count"></span></figcaption>
      </figure>
      <button class="lb__btn lb__close" type="button" aria-label="Fermer" data-close>${icon("M6 6l12 12M18 6 6 18")}</button>
      <button class="lb__btn lb__prev" type="button" aria-label="Image précédente">${icon("M15 5l-7 7 7 7")}</button>
      <button class="lb__btn lb__next" type="button" aria-label="Image suivante">${icon("M9 5l7 7-7 7")}</button>`;
    document.body.append(box);
    img = box.querySelector(".lb__img");
    cap = box.querySelector(".lb__text");
    count = box.querySelector(".lb__count");
    prevBtn = box.querySelector(".lb__prev");
    nextBtn = box.querySelector(".lb__next");
    box.addEventListener("click", (e) => e.target.closest("[data-close]") && close());
    prevBtn.addEventListener("click", () => show(index - 1));
    nextBtn.addEventListener("click", () => show(index + 1));
    box.addEventListener("keydown", (e) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") show(index - 1);
      else if (e.key === "ArrowRight") show(index + 1);
      else if (e.key === "Tab") {
        const f = [...box.querySelectorAll("button:not([hidden])")];
        const i = f.indexOf(document.activeElement);
        e.preventDefault();
        f[(i + (e.shiftKey ? -1 : 1) + f.length) % f.length].focus();
      }
    });
    // Glisser sur écran tactile
    let x0 = null;
    box.addEventListener("touchstart", (e) => { x0 = e.touches[0].clientX; }, { passive: true });
    box.addEventListener("touchend", (e) => {
      if (x0 === null) return;
      const dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 50) show(index + (dx < 0 ? 1 : -1));
      x0 = null;
    });
  }

  function show(i) {
    index = (i + list.length) % list.length;
    const item = list[index];
    box.classList.remove("is-ready");
    img.onload = () => box.classList.add("is-ready");
    img.src = item.src;
    img.alt = item.alt || "";
    cap.textContent = item.caption || item.alt || "";
    count.textContent = list.length > 1 ? `${index + 1} / ${list.length}` : "";
    const many = list.length > 1;
    prevBtn.hidden = !many;
    nextBtn.hidden = !many;
    if (img.complete) box.classList.add("is-ready");
  }

  function open(items, i = 0, trigger = null) {
    if (!box) build();
    list = items;
    opener = trigger;
    box.hidden = false;
    document.documentElement.classList.add("lb-open");
    requestAnimationFrame(() => box.classList.add("is-open"));
    show(i);
    box.querySelector(".lb__close").focus();
  }

  function close() {
    box.classList.remove("is-open");
    document.documentElement.classList.remove("lb-open");
    box.hidden = true;
    img.removeAttribute("src");
    if (opener) opener.focus();
  }

  window.Lightbox = { open };
})();
