//SELECTORS
const predioSelect = document.querySelector("select")
const localInput = document.querySelector("input")
const addButton = document.querySelector("button")
const list = document.querySelector("tbody")

//EVENT LISTENERS
addButton.addEventListener("click", addItem)
list.addEventListener("click", deleteEdit)

//FUNCTIONS

//mostra a LISTA
function showList() {
  //remove a lista antiga
  list.replaceChildren()
  const arrLocaisTrabalho = JSON.parse(sessionStorage.getItem("arrLocaisTrabalho"))
  arrLocaisTrabalho.map((obj,index) => {
    appendItem(obj,index)
  })
}

//mostra a LISTA ao recarregar a página
if (sessionStorage.getItem("arrLocaisTrabalho")){
  window.onload = showList()
}

//append ITEM from OBJECT
function appendItem(obj,index) {
  //local TR
  const itemTr = document.createElement("tr")
  itemTr.setAttribute("id",index)
  //criar TD novoPredio
  const novoPredio = document.createElement("td")
  novoPredio.innerText = `Prédio ${obj.predio}`
  itemTr.appendChild(novoPredio)
  //criar TD novoLocal
  const novoLocal = document.createElement("td")
  novoLocal.innerText = obj.local
  itemTr.appendChild(novoLocal)
  //criar TD buttons
  const buttons = document.createElement("td")
  //edit BUTTON
  const editButton = document.createElement("button")
  editButton.innerHTML = '<i class="bi-pencil-fill"></i>'
  editButton.className = ("edit-btn btn btn-sm px-1 py-0")
  buttons.appendChild(editButton)
  //trash BUTTON
  const trashButton = document.createElement("button")
  trashButton.innerHTML = '<i class="bi-trash-fill"></i>'
  trashButton.className = ("trash-btn btn btn-sm px-1 py-0")
  buttons.appendChild(trashButton)
  itemTr.appendChild(buttons)
  //append to LIST
  list.appendChild(itemTr)
}

//adiciona um novo ITEM a LISTA
function addItem(evt) {
  //impedir submição
  evt.preventDefault()
  // "validação" do formulário
  if (!predioSelect.value) {
    predioSelect.classList.add('is-invalid')
  } else if (!localInput.value) {
    localInput.classList.add('is-invalid')
  } else {
    //armazena a LISTA em 'arrLocaisTrabalho'
    const strLocaisTrabalho = sessionStorage.getItem("arrLocaisTrabalho")
    const newObj = { predio: predioSelect.value, local: localInput.value }
    if (strLocaisTrabalho) {
      const arrLocaisTrabalho = JSON.parse(strLocaisTrabalho)
      sessionStorage.setItem("arrLocaisTrabalho", JSON.stringify([...arrLocaisTrabalho, newObj]))
    } else {
      sessionStorage.setItem("arrLocaisTrabalho", JSON.stringify([newObj]))
    }
    //recarrega a LISTA atual
    showList()
    //limpa SELECT & INPUT value
    predioSelect.value = ""
    localInput.value = ""
    //limpa o feedback de invalidez
    predioSelect.classList.remove('is-invalid')
    localInput.classList.remove('is-invalid')
  }
}

//botões DELETE e EDIT
let valueLocal = ""
function deleteEdit(evt) {
  let arrLocaisTrabalho = JSON.parse(sessionStorage.getItem("arrLocaisTrabalho"))
  const item = evt.target

  //DELETE
  if (item.classList[0] === "trash-btn") {
    arrLocaisTrabalho = arrLocaisTrabalho.filter((obj,index) => index != item.parentElement.parentElement.id)
    sessionStorage.setItem("arrLocaisTrabalho", JSON.stringify(arrLocaisTrabalho))
    //regarrega a LISTA e reordena os IDs de cada TR
    showList()
  }

  //"Formulário" EDIT
  if (item.classList[0] === "edit-btn") {
    const valuePredio = item.parentElement.parentElement.querySelectorAll("td")[0].innerText.slice(7)
    valueLocal = item.parentElement.parentElement.querySelectorAll("td")[1].innerText
    let options = ""
    for (let i = 1; i <= 5; i++) {
      let isSelected = valuePredio == i ? "selected" : ""
      options += `<option ${isSelected} value="${i}">Prédio ${i}</option>`
    }
    //insere o "formulário" de edição em cada TD
    item.parentElement.parentElement.querySelectorAll("td")[0].innerHTML = `<select class="form-select">${options}`
    item.parentElement.parentElement.querySelectorAll("td")[1].innerHTML = `<input type="text" class="form-control" value="${valueLocal}"}/>`
    item.parentElement.parentElement.querySelectorAll("td")[2].innerHTML =
      '<button class="check-btn btn btn-sm px-1 py-2"><i class="bi-check-lg"></i></button><button class="x-btn btn btn-sm px-1 py-2"><i class="bi-x-lg"></i></button>'
  }

  //Confirm EDIT
  if (item.classList[0] === "check-btn") {
    const newValuePredio = item.parentElement.parentElement.querySelector("select").value
    const newValueLocal = item.parentElement.parentElement.querySelector("input").value
    const id = item.parentElement.parentElement.id
    //armazena ITEM em 'arrLocaisTrabalho'
    arrLocaisTrabalho.splice( id, 1, { predio: newValuePredio, local: newValueLocal ? newValueLocal : valueLocal, id: id })
    sessionStorage.setItem("arrLocaisTrabalho", JSON.stringify(arrLocaisTrabalho))
    //recarrega a LISTA
    showList()  
  }

  //Cancel EDIT
  if (item.classList[0] === "x-btn") {
    //recarrega a LISTA
    showList()  
  }
}
