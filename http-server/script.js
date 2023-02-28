let user_form = document.getElementById('data_form')

const retireve_entries = () => {
    let entries = localStorage.getItem("user_data")
    if (entries) {
        entries = JSON.parse(entries)
    } else {
        entries = []
    }
    return entries;
}

const display_entries = () => {
    let data_entries = retireve_entries()

    const result = data_entries.map((entry) => {
        const name_tag = "<td>" + entry.name + "</td>"
        const email_tag = "<td>" + entry.email + "</td>"
        const password_tag = "<td>" + entry.password + "</td>"
        const dob_tag = "<td>" + entry.dob + "</td>"
        const isAccept_tag = "<td>" + entry.isAccept + "</td>"
        const row = "<tr>" + name_tag + email_tag + password_tag + dob_tag + isAccept_tag + "</tr>"
        return row
    }).join('\n')

    let entries_table = document.getElementById('entries_body')
    entries_table.innerHTML = result
}

date = new Date()
day = String(date.getDate()).padStart(2, '0');
month = String(date.getMonth() + 1).padStart(2, '0');
year = date.getFullYear();
older = year - 55 + "-" + month + "-" + day
younger = year - 18 + "-" + month + "-" + day

const _dob = document.getElementById("dob")
_dob.setAttribute('max', younger)
_dob.setAttribute('min', older)

_dob.addEventListener('input', () => validate(_dob))

function validate(element) {
    isOverMin = element.value > younger
    isOverMax = element.value < older

    if (isOverMax) {
        element.setCustomValidity("Value must be " + older + " or later.")
        element.reportValidity();
    } else if (isOverMin) {
        element.setCustomValidity("Value must be " + younger + " or earlier.")
        element.reportValidity();
    }
    else {
        element.setCustomValidity("")
    }
}


let users_entries = retireve_entries()
let saveData = (event) => {
    event.preventDefault();
    const name = document.getElementById('name').value
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    const dob = document.getElementById('dob').value
    const isAccept = document.getElementById('isAccept').checked

    let entries = {
        name,
        email,
        password,
        dob,
        isAccept
    }

    users_entries.push(entries)
    localStorage.setItem('user_data', JSON.stringify(users_entries))
    display_entries()
}

user_form.addEventListener('submit', saveData)

display_entries()

