const form = document.getElementById('videogameForm');

form.addEventListener('submit',async evt=>{
    evt.preventDefault();
    const data = new FormData(form);
    const response = await fetch('/api/videogames/',{
        method:'POST',
        body:data
    })
    const result = await response.json();
    console.log(result);
})