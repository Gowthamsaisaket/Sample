const scenes = [...document.querySelectorAll(".scene")];

let current = 0;

const music = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");
const musicText = document.getElementById("musicText");


/* =========================================
   SCENE NAVIGATION
   ========================================= */

function go(n) {

  // Keep scene number within available range
  current = Math.max(0, Math.min(n, scenes.length - 1));

  // Show only the selected scene
  scenes.forEach((scene, index) => {

    scene.classList.toggle("active", index === current);

    // Reset scroll position every time a scene opens
    scene.scrollTop = 0;

  });


  /* =========================================
     MUSIC
     Start music after user interaction
     ========================================= */

  if (current > 0 && music && music.paused) {

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

        // Browser may block autoplay.
        // User can press the music button manually.

      });

  }

}


/* =========================================
   MUSIC BUTTON
   ========================================= */

if (musicBtn) {

  musicBtn.addEventListener("click", () => {

    if (!music) return;

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
   =========================================

   These files must be in the same folder
   as index.html:

   photo01.jpg
   photo02.jpg
   photo03.jpg
   photo04.jpg
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

    // Keep the existing placeholder if image is unavailable
    console.log("Could not load image:", photos[index]);

  };

  image.src = photos[index];

});


/* =========================================
   MUSIC ERROR HANDLING
   ========================================= */

if (music) {

  music.addEventListener("error", () => {

    if (musicText) {
      musicText.textContent = "Add music.mp3";
    }

    if (musicBtn) {
      musicBtn.disabled = true;
    }

  });

}


/* =========================================
   KEYBOARD SUPPORT
   =========================================

   Useful when testing on a laptop/desktop.

   ← Previous scene
   → Next scene
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

});


/* =========================================
   INITIAL STATE
   ========================================= */

scenes.forEach((scene, index) => {

  scene.classList.toggle("active", index === 0);

  scene.scrollTop = 0;

});

current = 0;