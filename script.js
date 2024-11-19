document.addEventListener('DOMContentLoaded', () => {
    const card = document.querySelector('.card');
    const nameList = document.getElementById('name-list');
    const nameInput = document.getElementById('name-input');
    const addNameButton = document.getElementById('add-name');
    const drawNameButton = document.getElementById('draw-name');
    let names = [];

    // Obracanie karty po kliknięciu
    card.addEventListener('click', () => {
        card.classList.toggle('flipped');
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
