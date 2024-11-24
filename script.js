document.addEventListener('DOMContentLoaded', () => {
    const card = document.querySelector('.card');
    const nameInput = document.getElementById('name-input');
    const addNameButton = document.getElementById('add-name');
    const nameList = document.getElementById('name-list');
    const drawNameButton = document.getElementById('draw-name');
    const spotkankoElement = document.getElementById("spotkanko");
    const allowRepeatsCheckbox = document.getElementById('allow-repeats-checkbox'); // Przełącznik powtarzania

    let allNames = []; // Pełna lista imion
    let remainingNames = []; // Lista imion do losowania (bez powtórzeń)

    // Domyślnie wyłączone powtarzanie
    allowRepeatsCheckbox.checked = false;

    // Obracanie karty po kliknięciu (z wykluczeniem pola tekstowego, przycisku i checkboxa)
    card.addEventListener('click', (event) => {
        if (
            event.target !== nameInput &&
            event.target !== addNameButton &&
            event.target !== allowRepeatsCheckbox && // Wykluczenie checkboxa
            event.target.parentElement !== allowRepeatsCheckbox.parentElement // Wykluczenie kontenera checkboxa
        ) {
            card.classList.toggle('flipped');
        }
    });

    // Obsługa checkboxa - zmiana stanu powtarzania
    allowRepeatsCheckbox.addEventListener('click', (event) => {
        event.stopPropagation(); // Zatrzymanie propagacji, by karta się nie obracała
        const allowRepeats = event.target.checked;
        console.log(`Powtarzanie: ${allowRepeats ? "włączone" : "wyłączone"}`);
    });

    // Funkcja do dodawania imienia
    const addName = (name) => {
        const listItem = document.createElement('li');
        listItem.textContent = name;
        listItem.classList.add('list-item'); // Opcjonalnie: klasa do stylizacji
        nameList.appendChild(listItem);
        allNames.push(name); // Dodanie do pełnej listy
        remainingNames.push(name); // Dodanie do listy losowania
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
            const name = event.target.textContent;
            allNames = allNames.filter(n => n !== name); // Usuń z pełnej listy
            remainingNames = remainingNames.filter(n => n !== name); // Usuń z listy bez powtórzeń
            nameList.removeChild(event.target);
        }
    });

    // Losowanie imienia i wyświetlanie na przodzie karty
    drawNameButton.addEventListener('click', () => {
        if (allNames.length === 0) {
            alert('Dodaj przynajmniej jedno imię przed losowaniem!');
            return;
        }

        const allowRepeats = allowRepeatsCheckbox.checked; // Czy powtarzanie jest włączone?

        let selectedName;
        if (allowRepeats) {
            // Losowanie z pełnej listy
            const randomIndex = Math.floor(Math.random() * allNames.length);
            selectedName = allNames[randomIndex];
        } else {
            // Losowanie z listy bez powtórzeń
            if (remainingNames.length === 0) {
                // Automatyczny reset listy bez powtórzeń
                remainingNames = [...allNames];
            }
            const randomIndex = Math.floor(Math.random() * remainingNames.length);
            selectedName = remainingNames.splice(randomIndex, 1)[0]; // Usuwa wylosowane imię z listy
        }

        // Wyświetlenie wylosowanego imienia na przodzie karty
        card.classList.remove('flipped'); // Obrót na przód
        card.querySelector('.front').textContent = selectedName;
    });
});
