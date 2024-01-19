


function chenge_image_Fun(){
    const file_name = document.getElementById('image-input');
    if(file_name.value == ""){
        console.log("if")
        document.getElementById('show-input-image').style.display = "none";
        document.getElementById('image-input-label').style.display = 'block';
    }else{
        document.getElementById('image-input-label').style.display = 'none';
        document.getElementById('show-input-image').style.display = "block";

        document.querySelector('#show-input-image img').src = URL.createObjectURL(file_name.files[0]);
    }
}

function cancel_photo_fun(){
    document.getElementById('image-input').value = "";
    chenge_image_Fun();
}


async function UploadFun(){
    const res = await fetch(`/user/upload`,{
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body : JSON.stringify({
            name : create_user_id.value,
            avatar : file_name,
        }),
    });
    const result = await res.json();
}



function open_view_fun(){
    const view_div = document.getElementById('view-div');
    view_div.style.display = 'flex';
}


function close_view_fun(){
    const view_div = document.getElementById('view-div');
    view_div.style.display = 'none';
}