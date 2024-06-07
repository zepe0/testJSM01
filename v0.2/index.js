document.addEventListener('DOMContentLoaded', () => {
    const pollForm = document.getElementById('poll-form');
    const addOptionBtn = document.getElementById('add-option');
    const optionsContainer = document.getElementById('options-container');
    const pollList = document.getElementById('poll-list');
    const openPollBtn = document.getElementById('open-poll-btn');

    let optionCount = 0;

    openPollBtn.addEventListener('click', () => {
        pollForm.classList.toggle('hidden');
    });

    addOptionBtn.addEventListener('click', () => {
        if (optionCount < 10) {
            const optionDiv = document.createElement('div');
            optionDiv.className = 'option-input';
            const optionInput = document.createElement('input');
            optionInput.type = 'text';
            optionInput.placeholder = `Opción ${optionCount + 1}`;
            optionInput.maxLength = 25;
            optionInput.required = true;
            const charCount = document.createElement('span');
            charCount.className = 'char-count';
            charCount.textContent = '25';
            optionInput.addEventListener('input', () => {
                charCount.textContent = 25 - optionInput.value.length;
            });
            optionDiv.appendChild(optionInput);
            optionDiv.appendChild(charCount);
            optionsContainer.appendChild(optionDiv);
            optionCount++;
        } else {
            alert('No se pueden añadir más de 10 opciones.');
        }
    });

    pollForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const pollTitle = document.getElementById('poll-title').value;
        const options = Array.from(document.querySelectorAll('.option-input input')).map(input => input.value);
        createPoll(pollTitle, options);
        pollForm.reset();
        optionsContainer.innerHTML = '';
        optionCount = 0;
        pollForm.classList.add('hidden');
    });

    function createPoll(title, options) {
        const pollDiv = document.createElement('div');
        pollDiv.className = 'poll';
        const pollTitle = document.createElement('h3');
        pollTitle.textContent = title;
        pollDiv.appendChild(pollTitle);

        options.forEach(option => {
            const optionDiv = document.createElement('div');
            optionDiv.className = 'progress-bar-container';
            const optionLabel = document.createElement('span');
            optionLabel.textContent = option;
            optionLabel.className = 'option-label';
            const progressBar = document.createElement('div');
            progressBar.className = 'progress-bar';
            progressBar.dataset.value = 0;
            optionDiv.appendChild(optionLabel);
            optionDiv.appendChild(progressBar);
            pollDiv.appendChild(optionDiv);

           
            optionDiv.addEventListener('click', (event) => {
                const confirmed = confirm('¿Estás seguro de que quieres cambiar tu opción de voto?');
                if (confirmed) {
                    updateVotes(pollDiv, optionLabel.textContent);
                }
            });
        });

        pollList.appendChild(pollDiv);
    }

    function updateVotes(pollDiv, selectedOption) {
        const options = pollDiv.querySelectorAll('.progress-bar-container');
        const totalVotes = Array.from(options).reduce((sum, option) => {
            const progressBar = option.querySelector('.progress-bar');
            return sum + parseInt(progressBar.dataset.value);
        }, 0) + 1;

        options.forEach(option => {
            const progressBar = option.querySelector('.progress-bar');
            const optionLabel = option.querySelector('.option-label');
            if (optionLabel.textContent === selectedOption) {
                progressBar.dataset.value = parseInt(progressBar.dataset.value) + 1;
            }
            const percentage = (parseInt(progressBar.dataset.value) / totalVotes) * 100;
            progressBar.style.width = `${percentage}%`;
            progressBar.textContent = `${percentage.toFixed(2)}%`;
        });
    }
});
