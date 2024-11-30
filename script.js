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
    let black = ["Wojtek"];
    let blackCounter = 0;

    // Domyślnie wyłączone powtarzanie
    checkbox.checked = false;
    let reakcjaOn = true;

    const On = "~made by Oliwier Parobczy";
    const Off = "~ made by Oliwier Parobczy";
    /*if(reakcjaOn == true){
        document.getElementById("footer").innerHTML = On;
    } else {
        document.getElementById("footer").innerHTML = On;
    }*/

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
        // console.log(`Powtarzanie: ${checkbox.checked ? "włączone" : "wyłączone"}`);
    });
    // Zablokowanie kliknięcia w tekst przed zmianą stanu checkboxa
    label.addEventListener('click', (event) => {
        if (event.target !== minimalCheckmark) {
            event.preventDefault(); // Zapobiega domyślnemu działaniu (zmiana stanu checkboxa)
        }
    });

    // Funkcja do dodawania imienia
    const addName = (name) => {
        if (black.includes(name) && reakcjaOn === true) {
            if(reakcjaOn) {
                blackCounter++;
                reakcja();
            }
            return;
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
        if(reakcjaOn){
            if(black.includes(selectedName)){
                alert("Ojoj! Wylosowałeś zbanowane imię! \nSkontaktuj się z Oliwierem w celu pomocy")
                return;
            }
        } else {  
        }card.querySelector('.front').textContent = selectedName;
    });

    const reakcja = () => {
        if (blackCounter === 1) {
            //console.log(1);
            alert("ACCESS DENIED");
        } else if (blackCounter > 1 && blackCounter <= 4) {
            let video = document.getElementById("video");
            if (!video) {
                video = document.createElement('video'); // Użyj tej samej zmiennej
                video.id = "video"; // Nadaj id elementowi
                container.appendChild(video); // Dodaj do kontenera
            }


            // Ustaw atrybuty wideo
            video.src = 'access_denied.mp4'; // Ścieżka do pliku wideo
            video.controls = false;       // Dodaj kontrolki (play, pause itp.)
            //video.width = 1920;           // Szerokość wideo
            //video.height = 1080;          // Wysokość wideo
            video.autoplay = true;
            video.id = "video";
            // Opcjonalnie: tekst alternatywny dla przeglądarek bez wsparcia wideo
            // Obsłuż zakończenie odtwarzania
            video.addEventListener('ended', () => {
                //container.style.display = 'none'; // Ukryj kontener po zakończeniu
                container.innerHTML = ''; // Wyczyść zawartość kontenera
            });

            // Usuń stare wideo, jeśli istnieje
            //container.innerHTML = '';
            // Dodaj element <video> do kontenera
            container.appendChild(video);
            //console.log(2);
        } else if (blackCounter > 4) {
            const createGif = () => {
                // Stwórz nowy element img dla każdego GIF-a
                const gif = document.createElement('img');
                gif.src = 'rage.gif';
                gif.classList.add('gif'); // Dodajemy klasę, by można było stylizować wiele GIF-ów
                gifConteiner.appendChild(gif);
            
                // Dodaj listener do każdej instancji GIF-a
                gif.addEventListener('click', () => {
                    gif.remove(); // Usuń konkretną instancję GIF-a po kliknięciu
                    // Opcjonalnie: sprawdź, czy kontener jest pusty i usuń klasę aktywną
                    if (gifConteiner.children.length === 0) {
                        gifConteiner.classList.remove('active');
                    }
                });
            
                // Pokaż kontener, jeśli jeszcze nie jest aktywny
                gifConteiner.classList.add('active');
            };

            if(blackCounter == 5){alert("AAAAAAAA!!!")};
            createGif();
        }
    };

    // Reakcja
    footer.addEventListener("click", () => {
        reakcjaOn = !reakcjaOn;
        if (reakcjaOn == false){
            document.getElementById("footer").innerHTML = Off;
        } else {
            document.getElementById("footer").innerHTML = On;
        }
    });
})
