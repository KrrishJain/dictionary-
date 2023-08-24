let input = document.querySelector("#input")
let searchBtn = document.querySelector("#searchBtn")
let apiKey = "4ff29290-1a2c-40a8-8b8c-4bf0a4f8cb5d"
let notFound = document.querySelector(".not_found")
let defBox = document.querySelector(".def")

searchBtn.addEventListener('click',function(e){
    e.preventDefault();
    
    // Get input data
    let word = input.value;
    //call API get data
    if(word === ''){
        alert('Word is required')
        return;
    }

    getData(word);
})

async function getData(word){
    //Ajax call
   const respnse = await fetch(`https://www.dictionaryapi.com/api/v3/references/learners/json/${word}?key=${apiKey}`)
   const data = await respnse.json();

   // if empty result
   if (!data.length){
       notFound.innerText = 'No result found!!!!!'
    return;
   }

   //If result is suggestion
   if(typeof data[0] === 'string'){
    let heading = document.createElement('h3')
   heading.innerText = 'Did you mean ??'
   notFound.appendChild(heading);

   data.forEach(element =>{
    let suggestion = document.createElement('span');
    suggestion.classList.add('suggested');
    suggestion.innerText = element;
    notFound.appendChild(suggestion);
   })
   return;
   }
   
   //if result found

   let defination = data[0].shortdef[0];
   defBox.innerText = defination

   console.log(data)
}