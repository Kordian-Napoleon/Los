document.addEventListener('DOMContentLoaded', () => {
    const card = document.querySelector('.card');
    const nameInput = document.getElementById('name-input');
    const addNameButton = document.getElementById('add-name');
    const nameList = document.getElementById('name-list');
    const drawNameButton = document.getElementById('draw-name');
    const spotkankoElement = document.getElementById("spotkanko");

    // Obracanie karty po kliknięciu (z wykluczeniem pola tekstowego i przycisku)
    card.addEventListener('click', (event) => {
        if (event.target !== nameInput && event.target !== addNameButton) {
            card.classList.toggle('flipped');
        }
    });

    // Funkcja do dodawania imienia
    const addName = (name) => {
        const listItem = document.createElement('li');
        listItem.textContent = name;
        listItem.classList.add('list-item'); // Opcjonalnie: klasa do stylizacji
        nameList.appendChild(listItem);
    };

    // Obsługa przycisku "Dodaj imię"
    addNameButton.addEventListener('click', (event) => {
        event.stopPropagation(); // Zatrzymuje propagację zdarzenia kliknięcia
        const name = nameInput.value.trim();
        if (name) {
            addName(name);
            nameInput.value = ''; // Czyszczenie pola tekstowego
        }
    });

    // Klikanie na "spotkanko"
    spotkankoElement.addEventListener("click", () => {
        const names = ["Oliwier", "Dominik", "Kuba", "Justyna", "Ewa", "Emilia"];
        names.forEach(name => {
            nameInput.value = name; // Wstaw imię do pola tekstowego
            addNameButton.click(); // Symuluj kliknięcie przycisku "Dodaj imię"
        });
    });

    // Naciśnięcie klawisza Enter w polu tekstowym
    nameInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // Zapobiega domyślnemu zachowaniu (np. przesłaniu formularza)
            const name = nameInput.value.trim();
            if (name) {
                addName(name);
                nameInput.value = ''; // Czyszczenie pola tekstowego
            }
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
