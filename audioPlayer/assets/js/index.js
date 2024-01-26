//@ts-nocheck
document.addEventListener("DOMContentLoaded", () => {
  const audioPlayers = document.querySelectorAll(".audio-player");

  const buildDuration = (duration) => {
    const minutes = Math.floor(duration / 60);
    let secondes = Math.floor(duration % 60);
    secondes = String(secondes).padStart(2, "0");
    return minutes + ":" + secondes;
  };

  const pauseAllOtherPlayersExcept = (currentPlayer) => {
    audioPlayers.forEach((otherPlayer) => {
      if (otherPlayer !== currentPlayer) {
        const otherAudio = otherPlayer.querySelector("audio");
        if (!otherAudio.paused && !otherAudio.ended) {
          pauseAudio(otherPlayer);
        }
      }
    });
  };

  const playAudio = (currentPlayer) => {
    const audio = currentPlayer.querySelector("audio");
    const pauseButton = currentPlayer.querySelector(".pause-button");
    const playButton = currentPlayer.querySelector(".play-button");
    const title = currentPlayer.querySelector(".title");
    const playerElements = currentPlayer.querySelector(".player");
    const buttonSection = currentPlayer.querySelector(".button-section");

    audio.play();
    pauseButton.style.display = "initial";
    buttonSection.style.marginLeft = "-0.5%";
    playButton.style.display = "none";
    title.style.display = "none";
    playerElements.style.display = "flex";
  };

  const pauseAudio = (currentPlayer) => {
    const audio = currentPlayer.querySelector("audio");
    const pauseButton = currentPlayer.querySelector(".pause-button");
    const playButton = currentPlayer.querySelector(".play-button");
    const title = currentPlayer.querySelector(".title");
    const playerElements = currentPlayer.querySelector(".player");
    const buttonSection = currentPlayer.querySelector(".button-section");

    audio.pause();
    pauseButton.style.display = "none";
    buttonSection.style.marginLeft = 0;
    playButton.style.display = "initial";
    title.style.display = "block";
    playerElements.style.display = "none";
  };

  audioPlayers.forEach((player) => {
    const audio = player.querySelector("audio");
    const track = player.querySelector(".track");
    const elapsed = player.querySelector(".elapsed");
    const trackTime = player.querySelector(".track-time");
    const playButton = player.querySelector(".play-button");
    const pauseButton = player.querySelector(".pause-button");

    audio.addEventListener("loadedmetadata", () => {
      const duration = audio.duration;
      trackTime.textContent = buildDuration(duration);
    });

    playButton.addEventListener("click", () => {
      pauseAllOtherPlayersExcept(player);
      playAudio(player);
    });

    pauseButton.addEventListener("click", () => {
      pauseAudio(player);
    });

    audio.addEventListener("timeupdate", () => {
      track.value = audio.currentTime;
      elapsed.textContent = buildDuration(audio.currentTime);
    });

    track.addEventListener("input", () => {
      elapsed.textContent = buildDuration(audio.currentTime);
      audio.currentTime = track.value;
    });
  });
});
