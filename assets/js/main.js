document.addEventListener("DOMContentLoaded", function () {
  var toggle = document.querySelector(".menu-toggle");
  var overlay = document.querySelector("[data-menu-overlay]");
  var panel = document.querySelector("[data-menu-panel]");

  function positionPanel() {
    if (!toggle || !panel) return;
    var rect = toggle.getBoundingClientRect();
    panel.style.left = Math.round(rect.left) + "px";
    panel.style.top = Math.round(rect.bottom + 14) + "px";
  }

  function openMenu() {
    positionPanel();
    document.body.classList.add("menu-open");
    if (toggle) toggle.setAttribute("aria-expanded", "true");
  }

  function closeMenu() {
    document.body.classList.remove("menu-open");
    if (toggle) toggle.setAttribute("aria-expanded", "false");
  }

  if (toggle) {
    toggle.addEventListener("click", function () {
      if (document.body.classList.contains("menu-open")) {
        closeMenu();
      } else {
        openMenu();
      }
    });
  }

  if (overlay) overlay.addEventListener("click", closeMenu);
  if (panel) {
    panel.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", closeMenu);
    });
  }

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeMenu();
  });

  window.addEventListener("resize", function () {
    if (document.body.classList.contains("menu-open")) positionPanel();
  });

  var previewLinks = document.querySelectorAll("[data-preview]");
  if (previewLinks.length && window.matchMedia("(hover: hover)").matches) {
    var preview = document.createElement("div");
    preview.className = "hover-preview";
    var previewImg = document.createElement("img");
    preview.appendChild(previewImg);
    document.body.appendChild(preview);

    function movePreview(e) {
      var offset = 24;
      var x = e.clientX + offset;
      var y = e.clientY + offset;
      var maxX = window.innerWidth - preview.offsetWidth - 12;
      var maxY = window.innerHeight - preview.offsetHeight - 12;
      preview.style.left = Math.min(x, maxX) + "px";
      preview.style.top = Math.min(y, maxY) + "px";
    }

    previewLinks.forEach(function (link) {
      link.addEventListener("mouseenter", function (e) {
        previewImg.src = link.getAttribute("data-preview");
        preview.classList.add("visible");
        movePreview(e);
      });
      link.addEventListener("mousemove", movePreview);
      link.addEventListener("mouseleave", function () {
        preview.classList.remove("visible");
      });
    });
  }
});
