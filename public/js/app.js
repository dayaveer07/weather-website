//abc
console.log('client side javascript loaded')
const weatherform= document.querySelector('form')
const search=document.querySelector('input')
let message1=document.querySelector('#message1')
let message2=document.querySelector('#message2')
weatherform.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location=search.value
    message1.textContent="Loading..."
    message2.textContent=""
    message3.textContent=""
    
    fetch('/weather?location='+location).then((response)=>{
    response.json().then((data)=>{
        //console.log(data)
        if(data.error){
           return message1.textContent=data.error
        }
       
    message2.textContent=data.forecast    
    message1.textContent=data.location
    console.log(data)
})

})
    
})