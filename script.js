document.addEventListener("DOMContentLoaded", () => {

  const scenes = [...document.querySelectorAll(".scene")];
  let current = 0;

  const music = document.getElementById("bgMusic");
  const musicBtn = document.getElementById("musicBtn");
  const musicText = document.getElementById("musicText");
  const musicPill = document.getElementById("musicPill");


  /* =========================================
     SCENE NAVIGATION
     ========================================= */
  function go(n) {

    current = Math.max(0, Math.min(n, scenes.length - 1));

    scenes.forEach((scene, index) => {

      scene.classList.toggle("active", index === current);

      // Reset the individual scene's scroll position
      scene.scrollTop = 0;

    });

    // Reset the page scroll too, so the new scene starts at the top
    window.scrollTo(0, 0);


    /* Start music after user interaction */

    if (current > 0 && music && music.paused && !music.dataset.broken) {

      music.play()
        .then(() => {

          if (musicBtn) {
            musicBtn.textContent = "Ⅱ";
          }

          if (musicText) {
            musicText.textContent = "Music playing";
          }

        })
        .catch(() => {

          // Browser may block automatic playback.
          // User can press the music button manually.

        });

    }

  }

  // Expose globally in case anything else needs it
  window.go = go;


  /* =========================================
     STORY BUTTONS (data-goto="N")
     ========================================= */

  document.querySelectorAll("[data-goto]").forEach((btn) => {

    btn.addEventListener("click", () => {

      const target = parseInt(btn.getAttribute("data-goto"), 10);

      if (!Number.isNaN(target)) {
        go(target);
      }

    });

  });


  /* =========================================
     MUSIC BUTTON
     ========================================= */

  if (musicBtn) {

    musicBtn.addEventListener("click", () => {

      if (!music || music.dataset.broken) return;

      if (music.paused) {

        music.play()
          .then(() => {

            musicBtn.textContent = "Ⅱ";

            if (musicText) {
              musicText.textContent = "Music playing";
            }

          })
          .catch(() => {

            if (musicText) {
              musicText.textContent = "Tap again to play";
            }

          });

      } else {

        music.pause();

        musicBtn.textContent = "▶";

        if (musicText) {
          musicText.textContent = "Music paused";
        }

      }

    });

  }


  /* =========================================
     PHOTO LOADER
     ========================================= */

  const photos = [
    "photo01.jpg",
    "photo02.jpg",
    "photo03.jpg",
    "photo04.jpg"
  ];


  ["photo1", "photo2", "photo3", "photo4"].forEach((id, index) => {

    const element = document.getElementById(id);

    if (!element) return;

    const image = new Image();

    image.onload = () => {

      element.classList.remove("placeholder");

      element.innerHTML = "";

      element.appendChild(image);

    };

    image.onerror = () => {

      console.log("Could not load image:", photos[index]);

    };

    image.src = photos[index];

  });


  /* =========================================
     MUSIC ERROR HANDLING
     ========================================= */

  if (music) {

    music.addEventListener("error", () => {

      music.dataset.broken = "1";

      if (musicText) {
        musicText.textContent = "Add music.mp3";
      }

      if (musicBtn) {
        musicBtn.disabled = true;
      }

      if (musicPill) {
        musicPill.style.opacity = "0.6";
      }

    });

  }


  /* =========================================
     KEYBOARD SUPPORT
     ========================================= */

  document.addEventListener("keydown", (event) => {

    if (event.key === "ArrowRight") {

      if (current < scenes.length - 1) {
        go(current + 1);
      }

    }

    if (event.key === "ArrowLeft") {

      if (current > 0) {
        go(current - 1);
      }

    }

  });


  /* =========================================
     INITIAL STATE
     ========================================= */

  scenes.forEach((scene, index) => {

    scene.classList.toggle("active", index === 0);

    scene.scrollTop = 0;

  });

  current = 0;

});
