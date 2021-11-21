import {fetchTodos, delTodo} from '../ajaxTodo.js';

const list = document.getElementById('ul-list')
const listItem = document.getElementById('list-item').content
const popWrapper = document.querySelector('.pop-wrapper')
const cancelBtn = document.querySelector('.cancel-btm')
const deleteBtn = document.querySelector('.done-btm')
const todoTitle = document.querySelector('.todo-title')
const todoDate = document.querySelector('.todo-date')
let itemId = null
let page = 0
let pageNum =[]


function render(myTodos) {
  const pagList = document.querySelectorAll('.pagination');
  function paginationBtn(arr,size = 10){
    let btn = '';
    pagList.forEach((elem,i) => {
      for(let i = 0; i < arr.length/size; i++){
        btn += `<button class='pagination__btn'>${i + 1}</button>`
        pageNum.push(i+1);
      }
      elem.innerHTML = btn;
    });

  }
  paginationBtn(myTodos);
  const btnPag = document.querySelectorAll('.pagination__btn');
  function smartList(page ,size = 10){
    list.innerHTML = ''
    let arrayList = [];
    arrayList = myTodos.slice().splice(page*size,size);
    arrayList.forEach((item , index) => {
      listItem.querySelector('.item-status').checked = item.checked
      listItem.querySelector('.item-text').textContent = item.title
      listItem.querySelector('.item-date').textContent = item.dueDate
      listItem.querySelector('.item-description').textContent = item.description
      listItem.querySelector('.item-text').style.textDecoration = item.checked ? 'line-through': 'none'
      listItem.children[0].setAttribute('data-id', item.id)
      const clone = listItem.cloneNode(true).firstElementChild
      list.insertAdjacentElement('beforeend', clone)
    })
    btnPag[page].classList.add('pagination__btn-active');
  }
  function addClass(btnElem, prevBtn){
    prevBtn.forEach(elem => elem.classList.remove('pagination__btn-active'));
    btnElem.classList.add('pagination__btn-active');
  }
  btnPag.forEach((elem,i) => {
    const queryParam = new URLSearchParams(window.location.search);
    if(queryParam.get("page")>elem.childNodes.length+1){
      queryParam.delete("page");
      history.replaceState(null, null, 'http://localhost:63342/hw-10/notFound/notFound.html?_ijt=i1dogppmg7bef1bmk7kbsgtjou');
      location.assign(window.location.search)
    }
    elem.addEventListener('click', () => {
      page =i
      smartList(i);
      addClass(elem,btnPag);
      const urlParams = new URLSearchParams(window.location.search);
      urlParams.set('page',`${+page+1}`);
      history.pushState(null, null, '?'+urlParams.toString());
      // window.history.replaceState({}, '', '?'+urlParams.toString());
    });
  });
  smartList(page);
}


 // click event - edit & delete

list.addEventListener('click', (e) => {
  const t = e.target
  if (t.classList.contains('delete')) {
    const id = t.parentElement.parentElement.parentElement.getAttribute('data-id')
    const titleValue = t.parentElement.parentElement.querySelector('.item-text').innerHTML
    const dueDateValue = t.parentElement.parentElement.querySelector('.item-date').innerHTML
    deleteItem(id)
    getItem(titleValue,dueDateValue)
  }
  if (t.classList.contains('edit')) {
    const id = t.parentElement.parentElement.parentElement.getAttribute('data-id')
    startEdit(id)
  }
})

// startEdit function

function startEdit(id) {
  window.location.replace(`http://localhost:63342/hw-10/Home/index.html?id=${id}`)
}


// Delete function:

function getItem(titleValue,dueDateValue) {
  // fetchTodo(id)
  //     .then((data) => {
  //       todoTitle.innerHTML = data.title
  //       todoDate.innerHTML = data.dueDate
  //     })
  todoTitle.innerHTML = titleValue
  todoDate.innerHTML = dueDateValue
}
function deleteItem(id) {
    itemId= id;
    popWrapper.style.display = 'block';
    getItem()
}

deleteBtn.addEventListener('click', ()=>{
  delTodo(itemId)
      .then(() =>fetchTodos())
      .then((data) => render(data))
  itemId = null;
  popWrapper.style.display = 'none'
})

cancelBtn.addEventListener('click', ()=>{
  popWrapper.style.display = 'none'
  itemId = null
})
popWrapper.addEventListener('click', (e)=>{
  if(e.target === popWrapper) {
    popWrapper.style.display = 'none'
    itemId = null
  }
})



// const pag = window.location.search.split('=')[1]
// if(pag){
//   console.log('hi')
//   console.log(pageNum.length)
//   for(let z=0 ; z<pageNum.length ; z++){
//     console.log(pageNum[z])
//     console.log(pag)
//     if(pag==pageNum[z]){
//       window.location.replace('http://www.google.com')
//     }
//   }
// }

// render data from server

fetchTodos().then(data => {
  console.log(data)
  render(data)
})