
const incomingData = document.querySelector('form')
const search = document.querySelector('input')

incomingData.addEventListener('submit',(e)=>{
    const messageOne = document.querySelector('#message-1')
    const messageTwo = document.querySelector('#message-2')
    const messageThree = document.querySelector('#message-3')
    const messageFour = document.querySelector('#message-4')

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    messageThree.textContent = ''
    messageFour.textContent = ''
    
    e.preventDefault()
    const location = search.value

    fetch('/weather?address='+location).then((response) =>{
    response.json().then((data)=>{
        if (data.error)
             messageOne.textContent ="Error: " + data.error
        else{
        messageOne.textContent = "Location: " + data.location
        messageTwo.textContent ="Forecast: " + data.forecast 
        messageThree.textContent ="Tempature: " +data.temp
        messageFour.textContent = "Precipitation: " + data.prec
        }
    })
})

    console.log(location)
})
