// DOM references

const form = document.getElementsByTagName('form')[0]
const nameInput = document.getElementById('name')
const brandInput = document.getElementById('brand')
const descriptionInput = document.getElementById('description')
const imageInput = document.getElementById('image')
const priceInput = document.getElementById('price')
const resetButton = document.getElementById('reset')
const result = document.getElementById('result')
const modalTitle = document.getElementById('modal-title')

// Variables

const API_KEY = localStorage.getItem('apikey')
const apiUrl = localStorage.getItem('apiUrl')

// Functions

const resetForm = function () {
  nameInput.value = ''
  brandInput.value = ''
  descriptionInput.value = ''
  imageInput.value = ''
  priceInput.value = ''
}
// Event listeners

resetButton.addEventListener('click', function () {
  resetForm()
})

form.addEventListener('submit', function (e) {
  e.preventDefault()

  const newItem = {
    name: nameInput.value,
    description: descriptionInput.value,
    brand: brandInput.value,
    imageUrl: imageInput.value,
    price: parseInt(priceInput.value),
  }

  fetch(apiUrl, {
    method: 'POST',
    body: JSON.stringify(newItem),
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
    },
  })
    .then((res) => {
      if (res.ok) {
        resetForm()
        modalTitle.innerText = 'SUCCESS!'
        result.innerText = 'Item successfully added to the store!'
      } else {
        throw new Error(res.status)
      }
    })
    .then()
    .catch((err) => {
      modalTitle.innerText = 'ERROR!'
      result.innerText = err
    })
})
