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

  var sortSelect = document.getElementById("career-sort");
  var careerList = document.getElementById("career-list");
  if (sortSelect && careerList) {
    function sortCareerItems() {
      var items = Array.prototype.slice.call(careerList.querySelectorAll(".career-item"));
      items.sort(function (a, b) {
        var diff = a.getAttribute("data-start").localeCompare(b.getAttribute("data-start"));
        return sortSelect.value === "recent" ? -diff : diff;
      });
      items.forEach(function (item) { careerList.appendChild(item); });
    }
    sortSelect.addEventListener("change", sortCareerItems);
    sortCareerItems();
  }

  var summary = document.getElementById("career-summary");
  if (summary) {
    var startYear = parseInt(summary.getAttribute("data-start-year"), 10);
    var startMonth = parseInt(summary.getAttribute("data-start-month"), 10) - 1;
    var now = new Date();
    var years = now.getFullYear() - startYear;
    if (now.getMonth() < startMonth) years--;
    var companyCount = careerList ? careerList.querySelectorAll(".career-item").length : 0;
    summary.textContent = years + "+ years across " + companyCount + " companies";
  }

  // Selected Work grid: sort cards automatically by data-date (newest
  // first), so adding a new project is just a matter of giving it a
  // date — no manual reordering of the markup required.
  var projectGrid = document.querySelector(".work .project-grid");
  if (projectGrid) {
    var projectCards = Array.prototype.slice.call(projectGrid.querySelectorAll(".project-card"));
    projectCards.sort(function (a, b) {
      return b.getAttribute("data-date").localeCompare(a.getAttribute("data-date"));
    });
    projectCards.forEach(function (card) { projectGrid.appendChild(card); });
  }

  var statProjectsCount = document.getElementById("stat-projects-count");
  if (statProjectsCount && projectGrid) {
    statProjectsCount.textContent = projectGrid.querySelectorAll(".project-card").length;
  }

  // Image lightbox: click the cover or any gallery image on a project
  // detail page to view it larger, with pinch/scroll/click-to-zoom and
  // drag-to-pan once zoomed. Click the dark backdrop to close.
  var lightboxImages = document.querySelectorAll(".case-cover img, .gallery img");
  if (lightboxImages.length) {
    var overlay = document.createElement("div");
    overlay.className = "lightbox-overlay";

    var stage = document.createElement("div");
    stage.className = "lightbox-stage";

    var lbImg = document.createElement("img");
    lbImg.className = "lightbox-img";
    stage.appendChild(lbImg);

    var closeBtn = document.createElement("button");
    closeBtn.type = "button";
    closeBtn.className = "lightbox-close";
    closeBtn.setAttribute("aria-label", "Close");
    closeBtn.innerHTML = "&times;";

    var hint = document.createElement("div");
    hint.className = "lightbox-hint";
    hint.textContent = "Click or scroll to zoom, drag to pan";

    overlay.appendChild(stage);
    overlay.appendChild(closeBtn);
    overlay.appendChild(hint);
    document.body.appendChild(overlay);

    var scale = 1, panX = 0, panY = 0;
    var MIN_SCALE = 1, MAX_SCALE = 4;

    function applyTransform() {
      lbImg.style.transform = "translate(" + panX + "px, " + panY + "px) scale(" + scale + ")";
      lbImg.style.cursor = scale > MIN_SCALE ? "zoom-out" : "zoom-in";
    }

    function resetView() {
      scale = 1;
      panX = 0;
      panY = 0;
      applyTransform();
    }

    function openLightbox(src, alt) {
      lbImg.src = src;
      lbImg.alt = alt || "";
      resetView();
      overlay.classList.add("visible");
      document.body.classList.add("lightbox-open");
    }

    function closeLightbox() {
      overlay.classList.remove("visible");
      document.body.classList.remove("lightbox-open");
    }

    lightboxImages.forEach(function (img) {
      img.classList.add("lightbox-trigger");
      img.addEventListener("click", function () {
        openLightbox(img.currentSrc || img.src, img.alt);
      });
    });

    overlay.addEventListener("click", function (e) {
      if (e.target === overlay || e.target === stage) closeLightbox();
    });
    closeBtn.addEventListener("click", closeLightbox);

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && overlay.classList.contains("visible")) closeLightbox();
    });

    // Click the image itself toggles a fixed zoom level in and out.
    lbImg.addEventListener("click", function (e) {
      e.stopPropagation();
      lbImg.style.transition = "transform 0.15s ease";
      if (scale === MIN_SCALE) {
        scale = 2.5;
      } else {
        scale = MIN_SCALE;
        panX = 0;
        panY = 0;
      }
      applyTransform();
    });

    // Mouse wheel zoom, centered roughly on the cursor via panning.
    stage.addEventListener("wheel", function (e) {
      e.preventDefault();
      lbImg.style.transition = "none";
      var delta = e.deltaY < 0 ? 0.2 : -0.2;
      scale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, scale + delta));
      if (scale === MIN_SCALE) { panX = 0; panY = 0; }
      applyTransform();
    }, { passive: false });

    // Mouse drag to pan once zoomed in.
    var dragging = false, dragStartX = 0, dragStartY = 0, panStartX = 0, panStartY = 0;
    lbImg.addEventListener("mousedown", function (e) {
      if (scale === MIN_SCALE) return;
      dragging = true;
      lbImg.classList.add("dragging");
      dragStartX = e.clientX;
      dragStartY = e.clientY;
      panStartX = panX;
      panStartY = panY;
      e.preventDefault();
    });
    window.addEventListener("mousemove", function (e) {
      if (!dragging) return;
      panX = panStartX + (e.clientX - dragStartX);
      panY = panStartY + (e.clientY - dragStartY);
      applyTransform();
    });
    window.addEventListener("mouseup", function () {
      dragging = false;
      lbImg.classList.remove("dragging");
    });

    // Touch: pinch to zoom with two fingers, drag to pan with one once zoomed.
    var touchState = null;
    function touchDistance(touches) {
      var dx = touches[0].clientX - touches[1].clientX;
      var dy = touches[0].clientY - touches[1].clientY;
      return Math.sqrt(dx * dx + dy * dy);
    }
    stage.addEventListener("touchstart", function (e) {
      lbImg.classList.add("dragging");
      if (e.touches.length === 2) {
        touchState = { mode: "pinch", startDist: touchDistance(e.touches), startScale: scale };
      } else if (e.touches.length === 1 && scale > MIN_SCALE) {
        touchState = {
          mode: "pan",
          startX: e.touches[0].clientX,
          startY: e.touches[0].clientY,
          startPanX: panX,
          startPanY: panY
        };
      }
    }, { passive: true });
    stage.addEventListener("touchmove", function (e) {
      if (!touchState) return;
      if (touchState.mode === "pinch" && e.touches.length === 2) {
        e.preventDefault();
        var newDist = touchDistance(e.touches);
        scale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, touchState.startScale * (newDist / touchState.startDist)));
        if (scale === MIN_SCALE) { panX = 0; panY = 0; }
        applyTransform();
      } else if (touchState.mode === "pan" && e.touches.length === 1) {
        e.preventDefault();
        panX = touchState.startPanX + (e.touches[0].clientX - touchState.startX);
        panY = touchState.startPanY + (e.touches[0].clientY - touchState.startY);
        applyTransform();
      }
    }, { passive: false });
    stage.addEventListener("touchend", function () {
      touchState = null;
      lbImg.classList.remove("dragging");
    });
  }
});
