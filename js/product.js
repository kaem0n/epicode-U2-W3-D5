// DOM references

const imgContainer = document.getElementById('img')
const contentContainer = document.getElementById('content')
const deleteButton = document.getElementById('delete')
const form = document.getElementsByTagName('form')[0]
const nameInput = document.getElementById('name')
const brandInput = document.getElementById('brand')
const descriptionInput = document.getElementById('description')
const imageInput = document.getElementById('image')
const priceInput = document.getElementById('price')
const main = document.getElementsByTagName('main')[0]
const spinner = document.getElementById('spinner')

// Variables

const API_KEY = localStorage.getItem('apikey')
const apiUrl = localStorage.getItem('apiUrl')
const productId = new URLSearchParams(location.search).get('id')
let product
const mainSection = document.getElementsByTagName('section')[0]

// Functions

const pageLoad = function () {
  fetch(apiUrl + '/' + productId, {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  })
    .then((res) => {
      if (res.ok) {
        spinner.classList.add('d-none')
        return res.json()
      } else {
        throw new Error(res.status)
      }
    })
    .then((data) => {
      fillCard(data)
      product = data
    })
    .catch((err) => {
      errorMsg(err)
    })
}

const fillCard = function (obj) {
  imgContainer.innerHTML = ''
  contentContainer.innerHTML = ''

  const img = document.createElement('div')
  img.innerHTML = `
    <img src="${obj.imageUrl}" alt="${obj.imageUrl}" class="w-100"/>
  `
  imgContainer.appendChild(img)

  const data = document.createElement('div')
  data.innerHTML = `
    <h1 class="mb-1">${obj.name}</h1>
    <h2 class="text-secondary">${obj.brand}</h2>
    <hr />
    <p class="d-flex flex-column">
      <span class="fw-semibold fs-5">Description:</span>
      ${obj.description}
    </p>
    <p><span class="fw-semibold fs-5">Price:</span> ${obj.price}.99€</p>
    <hr />
    <div class="d-flex justify-content-between">
      <a href="./index.html" class="btn btn-primary fw-semibold">GO BACK</a>
      <div>
        <button
          class="btn btn-dark"
          data-bs-toggle="modal"
          data-bs-target="#edit-modal"
          >
            <i class="fas fa-cog"></i>
        </button>
        <button
          class="btn btn-danger"
          data-bs-toggle="modal"
          data-bs-target="#delete-modal">
            <i class="fas fa-trash-alt"></i>
        </button>
      </div>
    </div>
  `
  contentContainer.appendChild(data)

  nameInput.value = obj.name
  brandInput.value = obj.brand
  descriptionInput.value = obj.description
  imageInput.value = obj.imageUrl
  priceInput.value = obj.price
}

const editProduct = function () {
  product.name = nameInput.value
  product.brand = brandInput.value
  product.description = descriptionInput.value
  product.price = priceInput.value
  product.imageUrl = imageInput.value
  fillCard(product)
}

const errorMsg = function (str) {
  const msg = document.createElement('h1')
  msg.classList.add('text-center', 'display-1')
  msg.innerText = str
  mainSection.appendChild(msg)
}

// Event listeners

form.addEventListener('submit', function (e) {
  e.preventDefault()
  editProduct()
  fetch(apiUrl + '/' + productId, {
    method: 'PUT',
    body: JSON.stringify(product),
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
    },
  })
    .then((res) => {
      if (res.ok === false) {
        throw new Error(res.status)
      }
    })
    .catch((err) => {
      errorMsg(err)
    })
})

deleteButton.addEventListener('click', function () {
  fetch(apiUrl + '/' + productId, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  })
    .then((res) => {
      if (res.ok) {
        mainSection.innerHTML = ''
        errorMsg('Item has been deleted.')
        setTimeout(() => {
          location.assign('./index.html')
        }, 1000)
      } else {
        throw new Error(res.status)
      }
    })
    .catch((err) => {
      errorMsg(err)
    })
})

// Page load

pageLoad()
