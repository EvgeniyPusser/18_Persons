const persons = [];

const id = document.getElementById('id');
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const birthday = document.getElementById('birthdate'); // FIX
const addPerson = document.getElementById('add');      // FIX
const result = document.getElementById('result');
const stats = document.getElementById('stats');

addPerson.onclick = function () {
    if (persons.findIndex(person => person.id === id) < 0) {
        const person = new Person(
            id.value,
            firstName.value,
            lastName.value,
            new Date(birthday.value) // FIX
        );
        persons.push(person);
        // const addressFields = createFieldsFromObject(person.address);
        // document.body.append(addressFields.container);
        // const saveAddressBtn = createButton(
        //     'Save address',
        //     () => {
        //         Object.keys(addressFields.fields).forEach(key => {
        //             person.address[key] = addressFields.fields[key].value;
        //         });
        //         console.log('Saved address:', person.address);
        //     }
        // );

        const li = document.createElement('li');
        const buttonDel = createButton(
            'Delete',
            (e, array, person, showStats, message) => {
                e.target.parentElement.remove();
                removeFromArrayById(array, person.id);
                showStats();
                alert(message + person.firstName);
            },
            persons,                 // array
            person,                  // person
            showStats,               // функция
            'Удалён пользователь: '  // строка
        );

        // const buttonAddress = createButton(
        //     'Address',
        //     (e, person) => {
        //         if (!person.address) {
        //             person.address = new Address('', '', '', '', '', '', '');
        //         }
        //         const { container, fields } = createFieldsFromObject(person.address);
        //         const saveBtn = createButton('Save', () => {
        //             Object.keys(fields).forEach(key => {
        //                 person.address[key] = fields[key].value;
        //             });
        //             container.remove();
        //         });
        //         document.body.append(container, saveBtn);
        //     },
        //     person
        // );
        //
        // const buttonAddress = createButton(
        //     'Address',
        //     (e, person) => {
        //         if (!person.address) {
        //             person.address = new Address('', '', '', '', '', '', '');
        //         }
        //
        //         const { table, saveBtn } = renderObjectAsTable(
        //             person.address,
        //             (updatedAddress) => {
        //                 Object.assign(person.address, updatedAddress);
        //             },
        //             addressLabels // ← ЛЕЙБЛЫ
        //         );
        //
        //         document.body.append(table, saveBtn);
        //     },
        //     person
        // );

        const buttonAddress = createButton(
            'Address',
            (e, person) => {
                showAddressModal(person);
            },
            person
        );





        // li.append(person.toString(), buttonDel);
        li.append(person.toString(), buttonDel, buttonAddress);

        result.appendChild(li);
        document.body.append(saveAddressBtn);
        showStats();
    } else {
        alert(`Person with ID = ${id.value} exists`); // FIX
    }
    id.value = firstName.value = lastName.value = birthday.value = ''; // FIX
};


function showStats() {
    const divStats = document.createElement('div');
    divStats.className = 'stats-box';
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
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.birthday = birthday;
    this.toString = function () {
        return `ID: ${this.id}; First Name: ${this.firstName}; Last Name: ${this.lastName}; Birthday: ${this.birthday.toISOString().slice(0,10)};`; // FIX
    };
}



function removeFromArrayById(array, id) {
    const index = array.findIndex(item => item.id === id);
    if (index !== -1) {
        array.splice(index, 1);
    }
}

function Address(index, country, city, street, house, apartment, phone) {
    this.index = index;
    this.country = country;
    this.city = city;
    this.street = street;
    this.house = house;
    this.apartment = apartment;
    this.phone = phone;
    this.toString = function () {
        return `Index: ${this.index}; Country: ${this.country}; City: ${this.city}; Street: ${this.street} House: ${this.house}; Apartment: ${this.apartment}; Phone: ${this.phone}`;
    };


}