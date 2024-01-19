const create_user_id = document.getElementById('create-user-id');
const create_user_password = document.getElementById('create-user-password');

async function createUserFun(){
    // console.log(create_user_id.value,create_user_password.value);
    const res = await fetch(`/admin/create-user/`,{
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body : JSON.stringify({
            id : create_user_id.value,
            password : create_user_password.value
        }),
    });
    const result = await res.json();
    if(result.status === 200 || result.status === 402){
        // console.log("hello")
        create_user_id.value = '';
        create_user_password.value = '';
        alert(result.message);
    }
    else{
        alert(result.message);
    }
    create_user_id.focus();
        // console.log(result);
    return false;
}

const user1 = document.getElementById('view-userId1');
const user2 = document.getElementById('view-userId2');
const view_btn = document.getElementById('view-btn');

user1.addEventListener('keyup',()=>{
    onchange_for_view_user();
})

user2.addEventListener('keyup',()=>{
    onchange_for_view_user();
})

function onchange_for_view_user(){
    // console.log(user1.value," ",user2.value);
    if(user1.value == '' && user2.value == ''){
        view_btn.disabled = true;
        view_btn.style.opacity = 0.3;
        view_btn.style.cursor = 'not-allowed';
    }else{
        view_btn.disabled = false;
        view_btn.style.opacity = 1;
        view_btn.style.cursor = 'pointer';
    }
}