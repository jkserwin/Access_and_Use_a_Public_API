// global variables
let employees = [];
const urlAPI = `https://randomuser.me/api/?results=12&inc=name, picture,
email, location, phone, dob &noinfo &nat=US`;
const gridContainer = document.querySelector(".grid-container");
const overlay = document.querySelector(".overlay");
const modalContainer = document.querySelector(".modal-content");
const modalClose = document.querySelector(".modal-close");

// fetch employee data from API and create cards to display it

fetch(urlAPI)
    .then(res => res.json())
    .then(res => res.results)
    .then(displayEmployees)
    .catch(err => console.log(err))

function displayEmployees(employeeData) {
    employees = employeeData;
    let employeeHTML = '';
    employees.forEach((employee, index) => {
        let name = employee.name;
        let email = employee.email;
        let city = employee.location.city;
        let state = employee.location.state;
        let picture = employee.picture;

        employeeHTML += `
        <div class="card" data-index="${index}">
            <img class="avatar" src="${picture.large}" alt="${name.first} ${name.last}'s Profile Photo">
            <div class="text-container">
                <h2 class="name">${name.first} ${name.last}</h2>
                <p class="email">${email}</p>
                <p class="address">${city}, ${state}</p>
            </div>
        </div>
        `
        gridContainer.innerHTML = employeeHTML;
    });

}

// displays a modal window with additional employee info from fetched data

function displayModal(index) {

    let { name, dob, phone, email, location: { city, street, state, postcode}, picture } = employees[index];
    
    let date = new Date(dob.date);

    const modalHTML = `
        <img class="avatar" src="${picture.large}" alt="${name.first} ${name.last}'s Photo">
        <div class="text-container">
            <h2 class="name">${name.first} ${name.last}</h2>
            <p class="email">${email}</p>
            <p class="address">${city}, ${state}</p>
            <hr />
            <p>${phone}</p>
            <p class="address">${street.number} ${street.name}.<br>${city}, ${state} ${postcode}</p>
            <p>Birthday: ${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}</p>
        </div>
    `;

    overlay.classList.remove("hidden");
    modalContainer.innerHTML = modalHTML;
    modalContainer.setAttribute("data-index", index);
}

// event listener to display modal on click

gridContainer.addEventListener('click', e => {
    if (e.target !== gridContainer) {
        const card = e.target.closest(".card");
        const index = card.getAttribute('data-index');

        displayModal(index);
    }
});

// event listener to hide modal when close button is clicked

modalClose.addEventListener('click', () => {
    overlay.classList.add("hidden");
});