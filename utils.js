function createButtonDel(callBack) {
  const buttonDelete = document.createElement('button');
  buttonDelete.append('Delete');
buttonDelete.addEventListener('click', function (e) {
    e.target.parentElement.remove();
    if (typeof callBack === 'function') {
        callBack();
    }
})
    buttonDelete.className = 'delB';
    return buttonDelete;
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