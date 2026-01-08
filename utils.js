function createButton(text, callBack, ...args) {
    const button = document.createElement('button');
    button.textContent = text;
    button.className = 'btn';

    button.addEventListener('click', (e) => {
        if (typeof callBack === 'function') {
            callBack(e, ...args);
        }
    });

    return button;
}


function createInfoElement(content, tag) {
    const element = document.createElement(tag);
    element.append(content);
    return element;
}

function getAge(birthday) {
    const today = new Date();
    let age = today.getFullYear() - birthday.getFullYear();

    if (
        today.getMonth() < birthday.getMonth() ||
        (today.getMonth() === birthday.getMonth() &&
            today.getDate() < birthday.getDate())
    ) {
        age--;
    }
    return age;
}

function renderObjectAsTable(obj, onSave, labels = {}) {
    const table = document.createElement('table');
    table.border = '1';

    Object.entries(obj).forEach(([key, value]) => {
        const tr = document.createElement('tr');

        const tdKey = document.createElement('td');
        tdKey.textContent = labels[key] ?? key; // ← ВОТ ТУТ ВСЯ МАГИЯ

        const tdValue = document.createElement('td');
        const input = document.createElement('input');
        input.value = value ?? '';
        input.dataset.key = key;

        tdValue.append(input);
        tr.append(tdKey, tdValue);
        table.append(tr);
    });

    const saveBtn = document.createElement('button');
    saveBtn.textContent = 'Save';

    saveBtn.onclick = () => {
        const inputs = table.querySelectorAll('input');
        const result = {};

        inputs.forEach(input => {
            result[input.dataset.key] = input.value;
        });

        onSave(result);
        table.remove();
        saveBtn.remove();
    };

    return {table, saveBtn};
}


function createField({label, name, type = 'text', value = ''}) {
    const wrapper = document.createElement('div');

    const labelEl = document.createElement('label');
    labelEl.textContent = label + ': ';

    const input = document.createElement('input');
    input.type = type;
    input.name = 'address' + name;
    input.value = value;
    input.autocomplete = 'new-password';



    labelEl.append(input);
    wrapper.append(labelEl);

    return {
        element: wrapper,
        input
    };
}

function createFieldsFromObject(obj) {
    const fields = {};
    const container = document.createElement('div');

    Object.entries(obj).forEach(([key, value]) => {
        const field = createField({
            label: key,
            name: key,
            value: value ?? ''
        });

        fields[key] = field.input;
        container.append(field.element);
    });

    return {
        container,
        fields
    };
}
function showAddressModal(person) {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';

    const modal = document.createElement('div');
    modal.className = 'modal';

    if (!person.address) {
        person.address = new Address('', '', '', '', '', '', '');

        const { table, saveBtn } = renderObjectAsTable(
            person.address,
            (updatedAddress) => {
                Object.assign(person.address, updatedAddress);
                overlay.remove();
            }
        );

        modal.append(table, saveBtn);
    } else {
        const viewTable = renderObjectAsViewTable(person.address);

        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';

        editBtn.onclick = () => {
            modal.innerHTML = '';

            const { table, saveBtn } = renderObjectAsTable(
                person.address,
                (updatedAddress) => {
                    Object.assign(person.address, updatedAddress);
                    overlay.remove();
                }
            );

            modal.append(table, saveBtn);
        };

        modal.append(viewTable, editBtn);
    }

    overlay.append(modal);
    document.body.append(overlay);

    overlay.onclick = (e) => {
        if (e.target === overlay) overlay.remove();
    };
}



    function renderObjectAsViewTable(obj) {
        const table = document.createElement('table');
        table.border = '1';

        Object.entries(obj).forEach(([key, value]) => {
            const tr = document.createElement('tr');

            const tdKey = document.createElement('td');
            tdKey.textContent = key;

            const tdValue = document.createElement('td');
            tdValue.textContent = value || '—';

            tr.append(tdKey, tdValue);
            table.append(tr);
        });

        return table;
    }


