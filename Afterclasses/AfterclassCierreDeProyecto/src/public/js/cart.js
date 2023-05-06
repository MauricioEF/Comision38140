const button = document.getElementById('purchaseButton');

button.addEventListener('click',async evt=>{
    evt.preventDefault();
    const response = await fetch('/api/carts/purchase',{
        method:'POST'
    })
    const result = await response.json();
    console.log(result);
    if(result.status==="success"){
        window.location.replace(`/purchase/${result.purchaseCode}`);
    }else {
        console.log("Purchase went wrong");
    }
})