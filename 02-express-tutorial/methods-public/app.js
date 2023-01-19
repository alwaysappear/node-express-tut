const result = document.querySelector('.result')

const fetchPeople = async () => {
    try {
        const {
            data
        } = await axios.get('/api/people')

        const people = data.data.map((person) => {
            return `<h5>${person.name}</h5>`
        })
        result.innerHTML = people.join('')
    } catch (error) {
        result.innerHTML = `<div class="alert alert-danger">Can't Fetch Data</div>`
    }
}
fetchPeople()
// submit form
const btn = document.querySelector('.submit-btn')
const input = document.querySelector('.form-input')
const formAlert = document.querySelector('.form-alert')
btn.addEventListener('click', async (e) => {
    e.preventDefault()
    const nameValue = input.value

    try {
        const {
            data
        } = await axios.post('/api/people', {
            name: nameValue
        })
        const h5 = document.createElement('h5')
        h5.textContent = data.person
        result.appendChild(h5)
    } catch (error) {
        // console.log(error.response)
        formAlert.textContent = error.response.data.msg
    }
    input.value = ''
})