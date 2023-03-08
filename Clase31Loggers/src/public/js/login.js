const form  = document.getElementById('loginForm');

form.addEventListener('submit',evt=>{
    evt.preventDefault();
    const data = new FormData(form);
    const obj = {};
    data.forEach((value,key)=>obj[key]=value);
    fetch('/api/sessions/logintoken',{
        method:'POST',
        body:JSON.stringify(obj),
        headers: {
            'Content-Type':'application/json'
        }
    }).then(result=>result.json()).then(json=>{
        if(json.status==="success"){
            console.log(json)
            localStorage.setItem('authToken',json.token)
        }
    });
})