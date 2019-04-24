
const incomingData = document.querySelector('form')
const search = document.querySelector('input')

incomingData.addEventListener('submit',(e)=>{
    const messageOne = document.querySelector('#message-1')
    const messageTwo = document.querySelector('#message-2')
    const messageThree = document.querySelector('#message-3')
    const messageFour = document.querySelector('#message-4')
    const messageFive = document.querySelector('#message-5')
    const messageSix = document.querySelector('#message-6')
    const messageSeven = document.querySelector('#message-7')


    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    messageThree.textContent = ''
    messageFour.textContent = ''
    messageFive.textContent = ''
    messageSix.textContent = ''
    messageSeven.textContent = ''
    

    
    e.preventDefault()
    const location = search.value

    fetch('/weather?address='+location).then((response) =>{
    response.json().then((data)=>{
        if (data.error)
            messageOne.textContent = "Error: " + data.error
        else{
            
            messageOne.textContent = "Location: " + data.location
            messageTwo.textContent ="Forecast: " + data.forecast 
            messageThree.textContent = "Precipitation: " + data.prec
            messageFour.textContent = "Tempature High: " + data.tempHigh + " F degree"
            messageFive.textContent = "Tempature Low: " +data.tempLow + " F degree"
            messageSix.textContent = "Geographic Coordinates: " +data.latitude + " Latitude, "+ data.longitude + " Longitude"


        }
    })
})

    console.log(location)
})
