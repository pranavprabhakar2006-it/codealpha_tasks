document.addEventListener("DOMContentLoaded", () => {
  /* ==========================================
       ELEMENTS
    ========================================== */

  const filterButtons = document.querySelectorAll(".filter-btn");

  const galleryItems = document.querySelectorAll(".gallery-item");

  const searchInput = document.getElementById("searchInput");

  const lightbox = document.getElementById("lightbox");

  const lightboxImage = document.getElementById("lightbox-image");

  const closeBtn = document.querySelector(".close-btn");

  const nextBtn = document.querySelector(".next-btn");

  const prevBtn = document.querySelector(".prev-btn");

  const loader = document.getElementById("loader");

  const galleryImages = document.querySelectorAll(".gallery-item img");

  let currentIndex = 0;

  /* ==========================================
       LOADING ANIMATION
    ========================================== */

  window.addEventListener("load", () => {
    setTimeout(() => {
      loader.style.display = "none";
    }, 1000);
  });

  /* ==========================================
       CATEGORY FILTER
    ========================================== */

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterButtons.forEach((btn) => btn.classList.remove("active"));

      button.classList.add("active");

      const filter = button.dataset.filter;

      galleryItems.forEach((item) => {
        if (filter === "all" || item.classList.contains(filter)) {
          item.classList.remove("hide");
        } else {
          item.classList.add("hide");
        }
      });
    });
  });

  /* ==========================================
       SEARCH FUNCTIONALITY
    ========================================== */

  searchInput.addEventListener("keyup", () => {
    const searchValue = searchInput.value.toLowerCase();

    galleryItems.forEach((item) => {
      const category = item.className.toLowerCase();

      if (category.includes(searchValue)) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  });

  /* ==========================================
       OPEN LIGHTBOX
    ========================================== */

  galleryImages.forEach((image, index) => {
    image.addEventListener("click", () => {
      currentIndex = index;

      openLightbox(image.src);
    });
  });

  function openLightbox(imageSrc) {
    lightbox.classList.add("active");

    lightboxImage.src = imageSrc;

    document.body.style.overflow = "hidden";
  }

  /* ==========================================
       CLOSE LIGHTBOX
    ========================================== */

  function closeLightbox() {
    lightbox.classList.remove("active");

    document.body.style.overflow = "auto";
  }

  closeBtn.addEventListener("click", closeLightbox);

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  /* ==========================================
       SHOW IMAGE
    ========================================== */

  function showImage(index) {
    if (index >= galleryImages.length) {
      currentIndex = 0;
    }

    if (index < 0) {
      currentIndex = galleryImages.length - 1;
    }

    lightboxImage.src = galleryImages[currentIndex].src;
  }

  /* ==========================================
       NEXT IMAGE
    ========================================== */

  nextBtn.addEventListener("click", () => {
    currentIndex++;

    showImage(currentIndex);
  });

  /* ==========================================
       PREVIOUS IMAGE
    ========================================== */

  prevBtn.addEventListener("click", () => {
    currentIndex--;

    showImage(currentIndex);
  });

  /* ==========================================
       KEYBOARD NAVIGATION
    ========================================== */

  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("active")) return;

    if (e.key === "ArrowRight") {
      currentIndex++;

      showImage(currentIndex);
    }

    if (e.key === "ArrowLeft") {
      currentIndex--;

      showImage(currentIndex);
    }

    if (e.key === "Escape") {
      closeLightbox();
    }
  });

  /* ==========================================
       IMAGE HOVER EFFECT
    ========================================== */

  galleryItems.forEach((item) => {
    item.addEventListener("mouseenter", () => {
      item.style.transform = "translateY(-5px)";
    });

    item.addEventListener("mouseleave", () => {
      item.style.transform = "translateY(0)";
    });
  });

  /* ==========================================
       CONSOLE MESSAGE
    ========================================== */

  console.log("Modern Image Gallery Loaded Successfully 🚀");
});
