import { fetchTodos, fetchTodo, addTodo, updateTodo} from '../ajaxTodo.js';


const formItem= document.querySelector('.add')
const SubmitButton = document.getElementById('add-button')
const titleField = document.getElementById('title-field')
const descriptionField = document.getElementById('description-field')
const dueField = document.getElementById('due-field')
let toastLiveSubmit = document.getElementById('liveToast')
let toastLiveEdit = document.getElementById('liveToast-plus')
let toastSubmit = new bootstrap.Toast(toastLiveSubmit)
let toastEdit = new bootstrap.Toast(toastLiveEdit)
let itemId = null
let ids =[]

SubmitButton.addEventListener('click', (e) => {
    e.preventDefault()
    if (titleField.value) {
        console.log(titleField.value)
        switch(SubmitButton.innerText){
            case 'Submit':
                addItem()
                break;
            case 'Save':
                editItem(itemId);
                break;
        }
    } else {
            titleField.setCustomValidity("uuuuuuuuuuuu");
    }
})

// Add function
function addItem() {
    addTodo({
        title: titleField.value,
        description:descriptionField.value,
        dueDate: dueField.value,
        checked: false
    })
        .then(() => {
            // fetchTodos()
            formItem.reset()
            toastSubmit.show()
            }
        )
}

// get ids
function getIds() {
    return fetchTodos().then(response =>{
        response.forEach(item =>{
            return ids.push(item.id)
        })
    })
}

console.log(window.location)
const id = window.location.search.split('=')[1]
if(id){
    getIds().then(() =>{
        for(let i=0 ; i<ids.length ; i++){
            if(id==ids[i]){
                fetchTodo(id)
                    .then((data) => {
                        titleField.value= data.title
                        descriptionField.value= data.description
                        dueField.value= data.dueDate
                    })
                titleField.focus()
                SubmitButton.innerText = 'Save'
            }
        }
    })
}

// Edit function

function editItem(getId) {
    getId = id
    updateTodo({
        title: titleField.value,
        description:descriptionField.value,
        dueDate: dueField.value,
        checked: false
    } , getId)
        .then(() => {
            formItem.reset()
            SubmitButton.innerText = 'Submit'
            toastEdit.show()
            setTimeout(() =>
                    location.href ='index.html'
                , 3000)
        })

}

