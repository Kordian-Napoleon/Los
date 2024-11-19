document.addEventListener('DOMContentLoaded', () => {
    const card = document.querySelector('.card');
    const nameInput = document.getElementById('name-input');
    const addNameButton = document.getElementById('add-name');
    const nameList = document.getElementById('name-list');

    // Obracanie karty po kliknięciu (z wykluczeniem pola tekstowego i przycisku)
    card.addEventListener('click', (event) => {
        if (event.target !== nameInput && event.target !== addNameButton) {
            card.classList.toggle('flipped');
        }
    });

    // Funkcja do dodawania imienia
    const addName = () => {
        const name = nameInput.value.trim();
        if (name) {
            const listItem = document.createElement('li');
            listItem.textContent = name;
            listItem.classList.add('list-item'); // Opcjonalnie: klasa do stylizacji
            nameList.appendChild(listItem);
            nameInput.value = ''; // Czyszczenie pola tekstowego
        }
    };

    // Kliknięcie przycisku "Dodaj imię"
    addNameButton.addEventListener('click', (event) => {
        event.stopPropagation(); // Zatrzymuje propagację zdarzenia kliknięcia
        addName();
    });

    // Naciśnięcie klawisza Enter w polu tekstowym
    nameInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // Zapobiega domyślnemu zachowaniu (np. przesłaniu formularza)
            addName();
        }
    });

    // Usuwanie imienia z listy po kliknięciu
    nameList.addEventListener('click', (event) => {
    if (event.target.tagName === 'LI') {
        event.stopPropagation(); // Zatrzymuje propagację zdarzenia kliknięcia do karty
        nameList.removeChild(event.target);
    }
});


    // Losowanie imienia i wyświetlanie na karcie
    const drawNameButton = document.getElementById('draw-name');
    drawNameButton.addEventListener('click', () => {
        const nameListItems = document.querySelectorAll('#name-list li');
        if (nameListItems.length > 0) {
            const randomIndex = Math.floor(Math.random() * nameListItems.length);
            const randomName = nameListItems[randomIndex].textContent;
            card.classList.remove('flipped'); // Obrót na przód
            card.querySelector('.front').textContent = randomName;
        } else {
            alert('Dodaj przynajmniej jedno imię przed losowaniem!');
        }
    });
});
