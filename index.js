import { menuArray } from './data.js'

let totalPrice = 0
let itemObjects = []
const foodItemsContainer = document.getElementById('food-items-container')
const priceTotal = document.getElementById('total-price')
const completeOrderBtn = document.getElementById('complete-order-btn')
const popUp = document.getElementById('outer-pop-up-container')
const orderContainer = document.getElementById('order-container')
const orderSummary = document.getElementById('order-summary')
const thankYouText = document.getElementById('thank-you-text')
const formInformation = document.getElementById('form-information')
const closeBtn = document.getElementById('close-btn')
const nameInput = document.querySelector('input[name="name"]')
const cardInput = document.querySelector('input[name="card"]')
const cvvInput = document.querySelector('input[name="cvv"]')

foodItemsContainer.innerHTML = menuArray.map((menu) =>
        `
        <div class="food-item">
            <h1 class="food-emoji">${menu.emoji}</h1>
            <div class="food-details">
                <h3>${menu.name}</h3>
                <p>${menu.ingredients}</p>
                <h4>$${menu.price}</h4>
            </div>
            <button class="add-btn" data-add="${menu.id}">
            </button>
        </div>
        `
).join('')

foodItemsContainer.addEventListener('click', function(e){
    if (e.target.dataset.add) {
        renderYourOrder(e.target.dataset.add)
    }
})

function renderYourOrder(orderId) {
    const targetOrderArray = menuArray.filter(item => item.id === parseInt(orderId, 10))

    if (targetOrderArray.length > 0) {
        const targetOrderObj = targetOrderArray[0];

        const orderContent = `
                <div class="item-checkout">
                    <div class="item-details">
                        <h3>${targetOrderObj.name}</h3>
                        <button class="remove-btns">remove</button>
                    </div>
                    <h4>$${targetOrderObj.price}</h4>
                </div>
                `

                orderSummary.innerHTML += orderContent

                itemObjects.push(targetOrderObj)

                calculateTotalPrice()

                checkOrderArray()
    }
}

function calculateTotalPrice() {

    let itemPrices = itemObjects.map(function(item) {
        return item.price
    })

    totalPrice = itemPrices.reduce(function(total, current) {
        return total + current
    }, 0)

    if (`${totalPrice}` > 0) {
        priceTotal.textContent = `$${totalPrice}`
    } else {
        priceTotal.textContent = ''
    }
}

orderSummary.addEventListener('click', function(e) {
    if (e.target.classList.contains('remove-btns')) {
        const itemToRemove = e.target.closest('.item-checkout')
        const indexToRemove = Array.from(itemToRemove.parentNode.children).indexOf(itemToRemove)

        itemObjects.splice(indexToRemove, 1)
        itemToRemove.remove()

        calculateTotalPrice()

        checkOrderArray()
    }
});

completeOrderBtn.addEventListener('click', function() {
    if (itemObjects.length > 0) {
        popUp.style.display = 'flex'
    } else {
        console.log('Add items to your order!')
    }
})

formInformation.addEventListener('submit', function(event) {

    event.preventDefault()

    popUp.style.display = 'none'
    thankYouText.style.display = 'flex'
    orderSummary.innerHTML = ''
    itemObjects = []
    nameInput.value = ""
    cardInput.value = ""
    cvvInput.value = ""

    checkOrderArray()
})

closeBtn.addEventListener('click', function() {
    popUp.style.display = 'none'
    nameInput.value = ""
    cardInput.value = ""
    cvvInput.value = ""
})

function checkOrderArray() {
    if (itemObjects.length > 0) {
        orderContainer.style.display = 'block'
        thankYouText.style.display = 'none'
    } else {
        orderContainer.style.display = 'none'
    }
}