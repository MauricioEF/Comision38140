const form = document.getElementById('registerForm');

form.addEventListener('submit',async evt=>{
    evt.preventDefault();
    const data = new FormData(form);
    const response = await fetch('/api/sessions/register',{
        method:'POST',
        body:data
    })
    const result = await response.json();
    if(result.status==="success")
        window.location.replace('/login');
    else
        alert(result.error);
})