
async function Accepted_Fun(id){
    // console.log(id)
    const result = await fetch('/admin/accepted',{
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body : JSON.stringify({
            id
        }),
    })
    const response = await result.json();
    alert(response.message);
    if(response.status == 200){
        location.reload();
    }
}



async function Delete_Fun(id){
    const result = await fetch('/admin/delete',{
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body : JSON.stringify({
            id
        }),
    })
    const response = await result.json();
    alert(response.message);
    if(response.status == 200){
        location.reload();
    }
}