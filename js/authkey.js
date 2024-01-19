const form = document.getElementsByTagName('form')[0]
const apiInput = document.getElementById('api')
const contentCol = document.getElementById('content')

form.addEventListener('submit', function (e) {
  e.preventDefault()
  localStorage.setItem('apikey', apiInput.value)
  const success = document.createElement('h2')
  success.classList.add('text-success', 'mt-5')
  success.innerText = 'API key successfully changed!'
  contentCol.appendChild(success)
  setTimeout(() => {
    location.assign('./index.html')
  }, 1000)
})
