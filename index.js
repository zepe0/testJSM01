import { showToast } from "./toast.js";

document.addEventListener("DOMContentLoaded", () => {
  const pollForm = document.getElementById("poll-form");
  const addOptionBtn = document.getElementById("add-option");
  const optionsContainer = document.getElementById("options-container");
  const pollList = document.getElementById("poll-list");
  const openPollBtn = document.getElementById("open-poll-btn");
  const openPost = document.getElementById("open-post");
  const formPost = document.getElementById("post");
  const btnIcon = document.getElementById("add-emoji");

  let countVot = 0;
  let optionCount = 0;
  let data = {
    "😷": ["😀", "😁", "😂", "🤣"],
    "🐕 ": ["🐶", "🐱", "🐭", "🐹"],
    "🍩": ["🍏", "🍎", "🍐", "🍊"],
  };
  btnIcon.addEventListener("click", (e) => {
    e.preventDefault();

    let existingPicker = document.querySelector(".emoji-categories");

    if (existingPicker) {
      existingPicker.remove();
      document.getElementById("ContentIconList").remove();
      return;
    }

    const emojiPicker = document.createElement("div");
    emojiPicker.classList.add("emoji-categories");

    Object.keys(data).forEach((catIcon, index) => {
      const emojiFaces = document.createElement("button");
      emojiFaces.type = "button";
      emojiFaces.classList.add("emoji-button");
      emojiFaces.textContent = catIcon;
      emojiFaces.id = `category-${index}`;

      emojiFaces.addEventListener("click", (e) => {
        e.preventDefault();

        let existingList = document.getElementById("ContentIconList");
        if (existingList) {
          existingList.remove();
        }

        const familyIcons = data[e.target.textContent];
        if (!familyIcons) return;
        const existIconList = document.getElementById("divIcons");
        if (existIconList) existIconList.remove();
        const iconList = document.createElement("div");
        iconList.id = "divIcons";
        const emojiList = document.createElement("ul");
        emojiList.classList.add("emoji-categories");

        emojiList.classList.add("p-l0");
        emojiList.id = "ContentIconList";
        emojiList.classList.add("emoji-list");
        iconList.appendChild(emojiList);
        emojiPicker.after(iconList);

        familyIcons.forEach((iconFamili, emojiIndex) => {
          const emojiItem = document.createElement("button");

          emojiItem.type = "button";
          emojiItem.classList.add("emoji-button");
          emojiItem.textContent = iconFamili;
          emojiItem.id = `emoji-${index}-${emojiIndex}`;
          emojiList.appendChild(emojiItem);

          emojiItem.addEventListener("click", (e) => {
            e.preventDefault();
            const input = document.getElementById("TextContentPost");
            input.value += e.target.textContent;
            input.innerText = input.value;
            input.focus();
          });
        });
      });

      emojiPicker.appendChild(emojiFaces);
    });

    btnIcon.after(emojiPicker);
  });

  openPollBtn.addEventListener("click", () => {
    pollForm.classList.toggle("hidden");
    openPost.classList.toggle("hidden");

    if (openPollBtn.textContent === "Crear Encuesta")
      openPollBtn.textContent = "Cerrar Encuesta";
    else {
      openPollBtn.textContent = "Crear Encuesta";
    }
  });

  openPost.addEventListener("click", () => {
    openPollBtn.classList.toggle("hidden");
    formPost.classList.toggle("hidden");

    if (openPost.textContent === "Crear Post")
      openPost.textContent = "Cerrar Post";
    else {
      openPost.textContent = "Crear Post";
    }
  });

  addOptionBtn.addEventListener("click", () => {
    if (optionCount < 3) {
      const optionDiv = document.createElement("div");
      optionDiv.className = "option-input";
      const optionInput = document.createElement("input");
      optionInput.type = "text";
      optionInput.placeholder = `Opción ${optionCount + 1}`;
      optionInput.maxLength = 25;
      optionInput.required = true;

      const charCount = document.createElement("span");
      charCount.className = "char-count";
      charCount.textContent = "25";

      optionInput.addEventListener("input", () => {
        charCount.textContent = 25 - optionInput.value.length;
      });

      optionDiv.appendChild(optionInput);
      optionDiv.appendChild(charCount);
      optionsContainer.appendChild(optionDiv);
      optionCount++;
    } else {
      showToast("No se pueden añadir más de 4 opciones.", "error");
    }
  });

  pollForm.addEventListener("submit", (e) => {
    e.preventDefault();
    openPollBtn.textContent = "Crear Encuesta";

    const pollTitle = document.getElementById("poll-title").value;
    const options = Array.from(
      document.querySelectorAll(".option-input input")
    ).map((input) => input.value);
    if (options.length <= 1) {
      let emptys = 2 - options.length;
      showToast(
        `Se necesitan al menos 2 opciones para poder hacer una encuesta, faltan ${emptys} opción mas`,
        "error"
      );
    } else {
      createPoll(pollTitle, options);

      pollForm.reset();

      optionsContainer.innerHTML = "";
      optionCount = 0;

      pollForm.classList.add("hidden");
      openPost.classList.remove("hidden");
      formPost.classList.add("hidden");
    }
  });

  formPost.addEventListener("submit", (e) => {
    e.preventDefault();
    const textpost = document.getElementById("TextContentPost");
    const text = textpost.value;
    createPost(text);
    formPost.reset();
  });

  function createPost(text) {
    const pollpost = document.createElement("div");
    pollpost.className = "poll";

    const polltext = document.createElement("h2");
    polltext.textContent = text;

    pollpost.appendChild(polltext);
    pollList.appendChild(pollpost);
  }

  function createPoll(title, options) {
    const pollDiv = document.createElement("div");
    pollDiv.className = "poll";

    const pollTitle = document.createElement("h3");
    pollTitle.textContent = title;

    pollDiv.appendChild(pollTitle);

    formPost.classList.remove("hidden");
    if (!options) return;
    options.forEach((option) => {
      const optionDiv = document.createElement("div");
      optionDiv.className = "progress-bar-container";
      const optionLabel = document.createElement("span");
      optionLabel.textContent = option;
      optionLabel.className = "option-label";

      const progressBar = document.createElement("div");
      progressBar.className = "progress-bar";
      progressBar.dataset.value = 0;

      optionDiv.appendChild(optionLabel);
      optionDiv.appendChild(progressBar);
      pollDiv.appendChild(optionDiv);

      optionDiv.addEventListener("click", (event) => {
        debugger;
        if (countVot === 0) {
          updateVotes(pollDiv, optionLabel.textContent);
          countVot++;
        } else {
          const confirmed = confirm(
            `
            ¿Estás seguro de que quieres cambiar tu opción de voto?
           
            al confirmar se se cambiara el Voto !

            Se sumara par Modificar el progreso"
          `
          );
          if (confirmed) {
            updateVotes(pollDiv, optionLabel.textContent);
          }
        }
      });
    });

    pollList.appendChild(pollDiv);
  }

  function updateVotes(pollDiv, selectedOption) {
    const options = pollDiv.querySelectorAll(".progress-bar-container");

    const totalVotes =
      Array.from(options).reduce((sum, option) => {
        const progressBar = option.querySelector(".progress-bar");
        return sum + parseInt(progressBar.dataset.value);
      }, 0) + 1;

    options.forEach((option) => {
      const progressBar = option.querySelector(".progress-bar");
      const optionLabel = option.querySelector(".option-label");

      if (optionLabel.textContent === selectedOption) {
        progressBar.dataset.value = parseInt(progressBar.dataset.value) + 1;
      }

      const percentage =
        (parseInt(progressBar.dataset.value) / totalVotes) * 100;
      progressBar.style.width = `${percentage}%`;
      progressBar.textContent = `${percentage.toFixed(2)}%`;
    });
  }
});
