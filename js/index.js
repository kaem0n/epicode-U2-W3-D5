// localStorage

localStorage.setItem(
  'apikey',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWFhNTMwNDE4N2U1YzAwMTgxNGM2OWUiLCJpYXQiOjE3MDU2NjExODgsImV4cCI6MTcwNjg3MDc4OH0.ii9Cgp-ciQLSUampuatWO4LQ8oKStYp3XmN0mvGpPnA'
)
localStorage.setItem(
  'apiUrl',
  'https://striveschool-api.herokuapp.com/api/product/'
)

// DOM references

const row = document.getElementById('card-row')
const mainSection = document.getElementsByTagName('section')[0]

// Variables

const API_KEY = localStorage.getItem('apikey')
const apiUrl = localStorage.getItem('apiUrl')

// Functions

const pageLoad = function () {
  fetch(apiUrl, {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json()
      } else {
        throw new Error(res.status)
      }
    })
    .then((data) => {
      for (let i = 0; i < data.length; i++) {
        cardGen(data[i])
      }
    })
    .catch((err) => {
      errorMsg(err)
    })
}

const cardGen = function (arrayElement) {
  const newCol = document.createElement('div')
  newCol.classList.add('col')
  newCol.innerHTML = `
    <div class="card h-100">
      <a href="./product.html?id=${arrayElement._id}">
        <img 
          src="${arrayElement.imageUrl}"
          class="card-img-top" alt="${arrayElement._id}" 
        />
      </a>
      <div class="card-body d-flex flex-column justify-content-between">
        <div class="mb-3">
          <h5 class="card-title">${arrayElement.name}</h5>
          <h6 class="card-subtitle mb-3 text-body-secondary">${
            arrayElement.brand
          }</h6>
          <p class="card-text mb-2">
            ${arrayElement.description.slice(0, 100).concat('...')}
          </p>
        </div>
        <div class="d-flex flex-column">
          <p class="card-text">
            <span class="fw-semibold">Price:</span> ${arrayElement.price}.99€
          </p>
          <a href="./product.html?id=${
            arrayElement._id
          }" class="btn btn-primary">Details</a>
        </div>
      </div>
    </div>
  `
  row.appendChild(newCol)
}

const errorMsg = function (str) {
  const msg = document.createElement('h1')
  msg.classList.add('text-center', 'display-1')
  msg.innerText = str
  mainSection.appendChild(msg)
}

// Page load

pageLoad()
