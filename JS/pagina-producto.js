const inputQuantity = document.querySelector('.input-quantity')
const btnIncrement = document.querySelector('#increment')
const btnDecrement = document.querySelector('#decrement')

let valueByDefault = parseInt(inputQuantity.value)

// funciones click

btnIncrement.addEventListener('click', () => {
    valueByDefault += 1
    inputQuantity.value = valueByDefault
})

btnDecrement.addEventListener('click', () => {
    if (valueByDefault === 1) {
        return
    }
    valueByDefault -= 1
    inputQuantity.value = valueByDefault
})

//Constantes Toggle Titles

const toggleDescripcion = document.querySelector (".title-descripcion")
const toggleAdditional = document.querySelector (".title-additional")
const toggleReviews = document.querySelector (".title-reviews")

//Constantes Contenido texto

const contentDescripcion = document.querySelector (".text-descripcion")
const contentAdditionalInformation = document.querySelector (".text-additional-information")
const contentReviews = document.querySelector (".text-reviews")


// Funcion Toggle 
toggleDescripcion.addEventListener ("click", () => {
    contentDescripcion.classList.toggle("hidden")
})

toggleAdditional.addEventListener ("click", () => {
    contentAdditionalInformation.classList.toggle("hidden")
})

toggleReviews.addEventListener ("click", () => {
    contentReviews.classList.toggle("hidden")
})