const persons = [];

const id = document.getElementById('id');
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const birthday = document.getElementById('birthdate'); // FIX
const addPerson = document.getElementById('add');      // FIX
const result = document.getElementById('result');
const stats = document.getElementById('stats');

addPerson.onclick = function () {

    if (persons.findIndex(person => person.id === +id.value) < 0) {

        const person = new Person(
            id.value,
            firstName.value,
            lastName.value,
            new Date(birthday.value) // FIX
        );

        persons.push(person);

        const li = document.createElement('li');

        const buttonDel = createButtonDel(() => {
            const index = persons.findIndex(person => person.id === +id.value);
            persons.splice(index, 1);
            showStats();
        });

        li.append(person.toString(), buttonDel);
        result.appendChild(li);
        showStats();

    } else {
        alert(`Person with ID = ${id.value} exists`); // FIX
    }

    id.value = firstName.value = lastName.value = birthday.value = ''; // FIX
};

function showStats() {

    const divStats = document.createElement('div');
    divStats.className = 'stats-box'; // ← ВАЖНО

    if (persons.length) {

        const ages = persons.map(p => getAge(p.birthday));

        const minY = Math.min(...ages);
        const maxY = Math.max(...ages);
        const averY = Math.round(
            ages.reduce((s, y) => s + y, 0) / ages.length
        );

        divStats.append(
            createInfoElement(`Total persons: ${persons.length}`, 'p'),
            createInfoElement(`Min age: ${minY}`, 'p'),
            createInfoElement(`Max age: ${maxY}`, 'p'),
            createInfoElement(`Average age: ${averY}`, 'p')
        );
    }

    if (stats.children.length > 1) {
        stats.replaceChild(divStats, stats.lastChild);
    } else {
        stats.append(divStats);
    }
}


function Person(id, firstName, lastName, birthday) {
    this.id = +id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.birthday = birthday;

    this.toString = function () {
        return `ID: ${this.id}; First Name: ${this.firstName}; Last Name: ${this.lastName}; Birthday: ${this.birthday.toISOString().slice(0,10)};`; // FIX
    };
}
