document.addEventListener('DOMContentLoaded', () => {
    const card = document.querySelector('.card');
    const nameInput = document.getElementById('name-input');

    // Obracanie karty po kliknięciu (z wykluczeniem pola tekstowego)
    card.addEventListener('click', (event) => {
        if (event.target !== nameInput) {
            card.classList.toggle('flipped');
        }
    });

    // Dodawanie imienia do listy
    addNameButton.addEventListener('click', () => {
        const name = nameInput.value.trim();
        if (name) {
            names.push(name);
            const listItem = document.createElement('li');
            listItem.textContent = name;
            nameList.appendChild(listItem);
            nameInput.value = ''; // Czyszczenie pola
        }
    });

    // Losowanie imienia i wyświetlanie na karcie
    drawNameButton.addEventListener('click', () => {
        if (names.length > 0) {
            const randomIndex = Math.floor(Math.random() * names.length);
            const randomName = names[randomIndex];
            card.classList.remove('flipped'); // Obrót na przód
            card.querySelector('.front').textContent = randomName;
        } else {
            alert('Dodaj przynajmniej jedno imię przed losowaniem!');
        }
    });
});
