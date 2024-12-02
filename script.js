document.addEventListener('DOMContentLoaded', () => {
    const card = document.querySelector('.card');
    const nameInput = document.getElementById('name-input');
    const addNameButton = document.getElementById('add-name');
    const nameList = document.getElementById('name-list');
    const drawNameButton = document.getElementById('draw-name');
    const spotkankoElement = document.getElementById("spotkanko");
    const minimalCheckmark = document.querySelector('#allow-repeats-container .minimal-checkmark');
    const checkbox = document.getElementById('allow-repeats-checkbox');
    const label = document.getElementById('allow-repeats-container');
    const footer = document.querySelector('footer p'); // Tekst stopki
    const container = document.getElementById("video-container");
    const gifConteiner = document.getElementById("gif-container");

    let allNames = []; // Pełna lista imion
    let remainingNames = []; // Lista imion do losowania (bez powtórzeń)
    let black = ["Wojtek", "Wojciech", "Klimek" ,"Jerved", "Kosarz", "Wojteczek", "Wojtunio", "kulka", "mocy", "gruby"];
    let blackCounter = 0;

    // Domyślnie wyłączone powtarzanie
    checkbox.checked = false;
    let reakcjaOn = true;

    const On = "~made by Oliwier Parobczy";
    const Off = "~ made by Oliwier Parobczy";

    // Funkcja sprawdzająca input
    /*const checkInputAndIncrement = (input, blacklist) => {
        // Funkcja normalizująca tekst (usuwa znaki specjalne, zamienia podobne)
        const normalize = (text) => {
            const replacements = {
                '0': 'o',
                '1': 'i',
                '3': 'e',
                '4': 'a',
                '5': 's',
                '7': 't',
                '@': 'a'
            };
            return text
                .toLowerCase()
                .replace(/[^a-z0-9]/g, '') // Usuń wszystkie znaki niealfanumeryczne
                .replace(/[013457@]/g, char => replacements[char] || char) // Zamień znaki na odpowiedniki
                .replace(/(.)\1+/g, '$1'); // Usuń wielokrotne wystąpienia tej samej litery
        };
    
        // Normalizujemy input
        const normalizedInput = normalize(input);
    
        for (let word of blacklist) {
            const normalizedWord = normalize(word);
            const reversedWord = normalizedWord.split('').reverse().join('');
    
            // Sprawdzamy obecność słowa w obu kierunkach
            if (normalizedInput.includes(normalizedWord) || normalizedInput.includes(reversedWord)) {
                blackCounter++;
                reakcja();
                return true; // Znaleziono słowo z listy
            }
        }
    
        return false; // Nie znaleziono słowa z listy
    };*/
    /*const checkInputAndIncrement = (input, blacklist) => {
        // Funkcja normalizująca tekst (usuwa znaki specjalne, zamienia podobne)
        const normalize = (text) => {
            const replacements = {
                '0': 'o',
                '1': 'i',
                '3': 'e',
                '4': 'a',
                '5': 's',
                '7': 't',
                '@': 'a'
            };
            return text
                .toLowerCase()
                .replace(/[013457@]/g, char => replacements[char] || char); // Zamień znaki na odpowiedniki
        };
    
        // Funkcja obliczająca procentowe dopasowanie między dwoma słowami
        const getSimilarityPercentage = (str1, str2) => {
            let commonChars = 0;
            const length = Math.max(str1.length, str2.length);
            
            // Porównaj znaki na tych samych pozycjach
            for (let i = 0; i < Math.min(str1.length, str2.length); i++) {
                if (str1[i] === str2[i]) {
                    commonChars++;
                }
            }
    
            // Oblicz procentowe dopasowanie
            return (commonChars / length) * 100;
        };
    
        // Funkcja sprawdzająca obecność słowa z pomijaniem niealfanumerycznych znaków
        const containsWordWithSkippedChars = (input, word) => {
            // Usuwanie wszystkich znaków niealfanumerycznych z słowa i inputu
            const sanitizedInput = input.replace(/[^a-z0-9]/g, ''); // Usuwamy wszystkie znaki specjalne
            const sanitizedWord = word.replace(/[^a-z0-9]/g, ''); // Zaktualizowany sposób czyszczenia
            return sanitizedInput.includes(sanitizedWord); // Sprawdzamy, czy wyczyszczone input zawiera słowo
        };
    
        // Normalizujemy input, usuwamy wszystkie niealfanumeryczne znaki
        const normalizedInput = normalize(input).replace(/[^a-z0-9]/g, ''); 
        
        for (let word of blacklist) {
            const normalizedWord = normalize(word).replace(/[^a-z0-9]/g, ''); // Również czyszczenie blacklisty
            const reversedWord = normalizedWord.split('').reverse().join('');
    
            // Sprawdzamy obecność słowa w obu kierunkach z uwzględnieniem pomijania tylko niealfanumerycznych znaków
            if (
                containsWordWithSkippedChars(normalizedInput, normalizedWord) ||
                containsWordWithSkippedChars(normalizedInput, reversedWord)
            ) {
                blackCounter++;
                reakcja();
                return true; // Znaleziono słowo z listy
            }
    
            // Sprawdzamy procentowe dopasowanie dla częściowego dopasowania
            const similarityPercentage = getSimilarityPercentage(normalizedInput, normalizedWord);
    
            // Jeśli dopasowanie wynosi co najmniej 50% (±5%)
            if (similarityPercentage >= 50 && similarityPercentage <= 55) {
                blackCounter++;
                reakcja();
                return true; // Znaleziono częściowe dopasowanie
            }
    
            // Sprawdzamy czy pełne dopasowanie słowa w inputie
            if (
                normalizedInput.indexOf(normalizedWord) !== -1 ||  // Dopasowanie pełne lub częściowe
                normalizedInput.indexOf(reversedWord) !== -1
            ) {
                blackCounter++;
                reakcja();
                return true; // Znaleziono dopasowanie częściowe
            }
        }
    
        return false; // Nie znaleziono słowa z listy
    };*/
    
    const addToBlacklist = (newWords) => {
        black = [...black, ...newWords]; // Dodaje nowe słowa do istniejącej listy
    };

    const checkInputAndIncrement = (input, blacklist) => {
        // Funkcja normalizująca tekst (usuwa znaki specjalne, zamienia podobne)
        const normalize = (text) => {
            const replacements = {
                '0': 'o',
                '1': ['i', 'l', 'j'], // '1' może być 'i', 'l', 'j'
                '2': 't',
                '3': 'e',
                '4': 'a',
                '5': 's',
                '7': 't',
                '@': ['a', 'o'], // '@' może być 'a' lub 'o'
                //'l': ['i', 'j'], // 'l' zamieniamy na 'i' lub 'j'
                '!': ['i', 'l', 'j'], // '!' może być 'i', 'l' lub 'j'
                '$': 's',
                '^': 'a',
                '?': 'p',
                //'i': 'j',  // 'i' traktujemy jako 'j'
                //'j': 'i'   // 'j' traktujemy jako 'i'
            };
    
            // Funkcja do zamiany znaków
            return text
                .toLowerCase()
                .split('')
                .map(char => {
                    if (replacements[char]) {
                        if (Array.isArray(replacements[char])) {
                            // Jeśli dla znaku są różne opcje (tablica), zwróć wszystkie warianty
                            return replacements[char][0];
                        }
                        return replacements[char]; // Zamień na jedną wartość
                    }
                    return char; // Jeśli nie ma zamiany, zwróć oryginalny znak
                })
                .join('');
        };
    
        // Funkcja sprawdzająca obecność słowa z pomijaniem niealfanumerycznych znaków
        const containsWordWithSkippedChars = (input, word) => {
            // Usuwanie wszystkich znaków niealfanumerycznych z słowa i inputu
            const sanitizedInput = input.replace(/[^a-z0-9]/g, ''); // Usuwamy wszystkie znaki specjalne
            const sanitizedWord = word.replace(/[^a-z0-9]/g, ''); // Zaktualizowany sposób czyszczenia
            return sanitizedInput.includes(sanitizedWord); // Sprawdzamy, czy wyczyszczone input zawiera słowo
        };
    
        // Funkcja obliczająca procentowe dopasowanie między dwoma słowami
        const getSimilarityPercentage = (str1, str2) => {
            let commonChars = 0;
            const length = Math.max(str1.length, str2.length);
    
            // Porównaj znaki na tych samych pozycjach
            for (let i = 0; i < Math.min(str1.length, str2.length); i++) {
                if (str1[i] === str2[i]) {
                    commonChars++;
                }
            }
    
            // Oblicz procentowe dopasowanie
            return (commonChars / length) * 100;
        };
    
        // Funkcja do sprawdzania, czy wprowadzone słowo jest podobne do jakiegoś słowa z blacklisty
        const isSimilarWord = (input, word, threshold = 50) => {
            const similarity = getSimilarityPercentage(input, word);
            return similarity >= threshold; // Sprawdzamy, czy podobieństwo jest powyżej progu (np. 50%)
        };
    
        // Normalizujemy input
        const normalizedInput = normalize(input).replace(/[^a-z0-9]/g, '');
    
        for (let word of blacklist) {
            const normalizedWord = normalize(word).replace(/[^a-z0-9]/g, ''); // Również czyszczenie blacklisty
            const reversedWord = normalizedWord.split('').reverse().join('');
    
            // Sprawdzamy obecność słowa w obu kierunkach z uwzględnieniem pomijania tylko niealfanumerycznych znaków
            if (
                containsWordWithSkippedChars(normalizedInput, normalizedWord) ||
                containsWordWithSkippedChars(normalizedInput, reversedWord) ||
                normalizedInput.includes(normalizedWord) ||
                normalizedInput.includes(reversedWord) ||
                isSimilarWord(normalizedInput, normalizedWord)
            ) {
                blackCounter++;
                reakcja();
                return true; // Znaleziono słowo z listy
            }
    
            // Sprawdzamy procentowe dopasowanie dla częściowego dopasowania
            const similarityPercentage = getSimilarityPercentage(normalizedInput, normalizedWord);
    
            // Jeśli dopasowanie wynosi co najmniej 50% (±5%)
            if (similarityPercentage >= 50 && similarityPercentage <= 55) {
                blackCounter++;
                reakcja();
                return true; // Znaleziono częściowe dopasowanie
            }
    
            // Sprawdzamy podobieństwo na podstawie progu podobieństwa (np. 50%)
            if (isSimilarWord(normalizedInput, normalizedWord)) {
                blackCounter++;
                reakcja();
                return true; // Znaleziono podobne słowo
            }
    
            // Sprawdzamy czy pełne dopasowanie słowa w inputie
            if (
                normalizedInput.indexOf(normalizedWord) !== -1 ||  // Dopasowanie pełne lub częściowe
                normalizedInput.indexOf(reversedWord) !== -1
            ) {
                blackCounter++;
                reakcja();
                return true; // Znaleziono dopasowanie częściowe
            }
        }
    
        return false; // Nie znaleziono słowa z listy
    };
    
    
    
    
    

    
    // Obracanie karty po kliknięciu (z wykluczeniem pola tekstowego, przycisku i checkboxa)
    card.addEventListener('click', (event) => {
        if (
            event.target === nameInput || // Kliknięcie w input
            event.target === addNameButton || // Kliknięcie w przycisk
            event.target === checkbox || // Kliknięcie w checkbox
            event.target.parentElement === checkbox.parentElement ||
            event.target.closest('img') // Kliknięcie w obraz
        ) {
            return; // Nie obracaj karty
        }
        card.classList.toggle('flipped'); // Obrót karty
    });

    // Zmiana stanu checkboxa po kliknięciu na minimal-checkmark
    minimalCheckmark.addEventListener('click', (event) => {
        event.stopPropagation(); // Zatrzymanie propagacji zdarzenia kliknięcia
        checkbox.checked = !checkbox.checked; // Zmiana stanu checkboxa
    });

    // Zablokowanie kliknięcia w tekst przed zmianą stanu checkboxa
    label.addEventListener('click', (event) => {
        if (event.target !== minimalCheckmark) {
            event.preventDefault(); // Zapobiega domyślnemu działaniu (zmiana stanu checkboxa)
        }
    });

    // Funkcja do dodawania imienia
    const addName = (name) => {
        if (reakcjaOn && checkInputAndIncrement(name, black)) {
            return; // Nie dodawaj, jeśli imię jest w black i reakcja jest włączona
        }

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

        const allowRepeats = checkbox.checked; // Czy powtarzanie jest włączone?

        let selectedName;
        if (allowRepeats) {
            const randomIndex = Math.floor(Math.random() * allNames.length);
            selectedName = allNames[randomIndex];
        } else {
            if (remainingNames.length === 0) {
                remainingNames = [...allNames];
            }
            const randomIndex = Math.floor(Math.random() * remainingNames.length);
            selectedName = remainingNames.splice(randomIndex, 1)[0];
        }

        card.classList.remove('flipped'); // Obrót na przód
        if(reakcjaOn){
            if(checkInputAndIncrement(selectedName, black)){
                // blackCounter--;
                alert("Ojoj! Wylosowałeś zbanowane imię! \nSkontaktuj się z Oliwierem w celu pomocy")
                return;
            }
        }
        card.querySelector('.front').textContent = selectedName;
    });

    // Reakcja
    footer.addEventListener("click", () => {
        reakcjaOn = !reakcjaOn;
        document.getElementById("footer").innerHTML = reakcjaOn ? On : Off;
    });

    // Reakcja funkcjonalna
    const reakcja = () => {
        if (blackCounter === 1) {
            alert("ACCESS DENIED");
        } else if (blackCounter > 1 && blackCounter <= 4) {
            let video = document.getElementById("video");
            if (!video) {
                video = document.createElement('video');
                video.src = 'access_denied.mp4';
                video.controls = false;
                video.autoplay = true;
                video.addEventListener('ended', () => {
                    container.innerHTML = '';
                });
                container.appendChild(video);
            }
        } else if (blackCounter > 4) {
            const createGif = () => {
                const gif = document.createElement('img');
                gif.src = 'rage.gif';
                gif.classList.add('gif');
                gifConteiner.appendChild(gif);
                gif.addEventListener('click', () => gif.remove());
                gifConteiner.classList.add('active');
            };

            if (blackCounter === 5) alert("AAAAAAAA!!!");
            createGif();
        }
    };
});
