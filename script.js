document.addEventListener("DOMContentLoaded", () => {
  AOS.init({
    once: true,
    duration: 900,
    easing: "ease-in-out",
  });

  // Tự động phát nhạc nền trên mobile (nếu bị chặn)
  const music = document.getElementById("bg-music");
  if (music) {
    const playMusic = () => {
      music.play().catch(() => {});
      document.body.removeEventListener("touchstart", playMusic);
      document.body.removeEventListener("click", playMusic);
    };
    document.body.addEventListener("touchstart", playMusic);
    document.body.addEventListener("click", playMusic);
  }

  // Nút tắt/mở nhạc nền
  const musicToggle = document.getElementById("music-toggle");
  const musicIcon = document.getElementById("music-icon");
  if (musicToggle && music) {
    musicToggle.addEventListener("click", () => {
      if (music.paused) {
        music.play();
        musicIcon.textContent = "🔊";
      } else {
        music.pause();
        musicIcon.textContent = "🔇";
      }
    });
    // Cập nhật icon theo trạng thái nhạc
    music.addEventListener("play", () => {
      musicIcon.textContent = "🔊";
    });
    music.addEventListener("pause", () => {
      musicIcon.textContent = "🔇";
    });
  }

  // Popup ảnh cho memorable moments và zigzag
  const popupOverlay = document.getElementById("img-popup");
  const popupImg = document.getElementById("popup-img");
  const popupClose = document.querySelector(".popup-close");

  function openPopup(src) {
    popupImg.src = src;
    popupOverlay.style.display = "flex";
    setTimeout(() => popupOverlay.classList.add("show"), 10);
  }

  function closePopup() {
    popupOverlay.classList.remove("show");
    setTimeout(() => {
      popupOverlay.style.display = "none";
      popupImg.src = "";
    }, 300);
  }

  // Áp dụng cho cả memorable và zigzag
  [...document.querySelectorAll("img[data-popup]")].forEach((img) => {
    img.addEventListener("click", () => openPopup(img.src));
  });

  popupClose.addEventListener("click", closePopup);
  popupOverlay.addEventListener("click", (e) => {
    if (e.target === popupOverlay) closePopup();
  });

  // Đảm bảo bấm ra ngoài ảnh (overlay) sẽ tắt lightbox (Lightbox2)
  const observeLightboxOverlay = () => {
    const observer = new MutationObserver(() => {
      const lbOverlay = document.querySelector(".lightboxOverlay");
      const lbContainer = document.querySelector(".lightbox");
      if (lbOverlay && lbContainer && !lbOverlay._hasClick) {
        lbOverlay._hasClick = true;
        lbOverlay.addEventListener("click", function (e) {
          if (e.target === lbOverlay) {
            const closeBtn = lbContainer.querySelector(".lb-close");
            if (closeBtn) closeBtn.click();
          }
        });
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
  };
  observeLightboxOverlay();
});
