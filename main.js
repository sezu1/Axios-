const txtPost = document.getElementById('txtPost');
const form = document.forms.form;



let url = "http://localhost:8000/posts"


function getPost (){
    axios.get(url)
.then(response => {
    txtPost.innerHTML = ''
    response.data.forEach(post => {
        txtPost.innerHTML += `<li>${JSON.stringify(post)}</li> <button class="delBtns" data-id="${post.id}">delete</button>`
    
    })
    const delBtns = document.querySelectorAll('.delBtns')
    delBtns.forEach(btn => {
        btn.addEventListener('click', deletePost)
    })
})
.catch(error => console.log(error))
}



function deletePost (event) {
    event.preventDefault();
    const {id} = event.target.dataset
    axios.delete(`${url}/${id}`)
    
}

getPost();


function addNewPost (event){
    const formData = new FormData(form)
    const values = Object.fromEntries(formData.entries())

axios.post(url, values
).then(response => response.data)
}

form.addEventListener('submit', addNewPost)