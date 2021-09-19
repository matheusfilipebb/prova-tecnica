//selectors
const predioSelect = document.querySelector("select")
const localInput = document.querySelector("input")
const addButton = document.querySelector("button")
const list = document.querySelector("tbody")

//event listeners
addButton.addEventListener("click", addItem)
list.addEventListener("click", deleteEdit)

//functions
function addItem(evt) {
  //impedir submição
  evt.preventDefault()
  // "validação" do formulário
  if (document.querySelector("input").value == "" || document.querySelector("select").value == "") {
    alert("Por favor, preencha todos os campos")
  } else {
    //local TR
    const itemTr = document.createElement("tr")
    itemTr.classList.add("local")
    //criar TD novoPredio
    const novoPredio = document.createElement("td")
    novoPredio.innerText = `Prédio ${predioSelect.value}`
    novoPredio.classList.add("predio-td")
    itemTr.appendChild(novoPredio)
    //criar TD novoLocal
    const novoLocal = document.createElement("td")
    novoLocal.innerText = localInput.value
    novoLocal.classList.add("local-td")
    itemTr.appendChild(novoLocal)
    //criar TD buttons
    const buttons = document.createElement("td")
    buttons.classList.add("buttons-td")
    //edit BUTTON
    const editButton = document.createElement("button")
    editButton.innerHTML = '<i class="bi-pencil-fill"></i>'
    editButton.classList.add("edit-btn")
    buttons.appendChild(editButton)
    //trash BUTTON
    const trashButton = document.createElement("button")
    trashButton.innerHTML = '<i class="bi-trash-fill"></i>'
    trashButton.classList.add("trash-btn")
    buttons.appendChild(trashButton)
    itemTr.appendChild(buttons)
    //append to LIST
    list.appendChild(itemTr)
    //limpar SELECT & INPUT value
    predioSelect.value = ""
    localInput.value = ""
  }
}

let valuePredio = "", valueLocal = ""
function deleteEdit(e) {
  const item = e.target

  //DELETE
  if (item.classList[0] === "trash-btn") {
    item.parentElement.parentElement.remove()
  }

  //Formulário EDIT
  if (item.classList[0] === "edit-btn") {
    valuePredio = item.parentElement.parentElement.querySelectorAll("td")[0].innerText.slice(7)
    valueLocal = item.parentElement.parentElement.querySelectorAll("td")[1].innerText
    let options = ""
    for (let i = 1; i <= 5; i++) {
      let isSelected = valuePredio == i ? "selected" : ""
      options += `<option ${isSelected} value="${i}">Prédio ${i}</option>`
    }
    item.parentElement.parentElement.querySelectorAll("td")[0].innerHTML = `<select class="form-select">${options}`
    item.parentElement.parentElement.querySelectorAll("td")[1].innerHTML = `<input type="text" class="form-control" value="${valueLocal}"}/>`
    item.parentElement.parentElement.querySelectorAll("td")[2].innerHTML =
      '<button class="check-btn"><i class="bi-check-lg"></i></button><button class="x-btn"><i class="bi-x-lg"></i></button>'
  }

  //Submit EDIT
  if (item.classList[0] === "check-btn") {
    const newValuePredio = item.parentElement.parentElement.querySelector("select").value
    const newValueLocal = item.parentElement.parentElement.querySelector("input").value
    item.parentElement.parentElement.querySelectorAll("td")[0].innerHTML = `Prédio ${newValuePredio}`
    item.parentElement.parentElement.querySelectorAll("td")[1].innerHTML = newValueLocal ? newValueLocal : valueLocal
    item.parentElement.parentElement.querySelectorAll("td")[2].innerHTML =
      '<button class="edit-btn"><i class="bi-pencil-fill"></i></button><button class="trash-btn"><i class="bi-trash-fill"></i></button>'
  }

  //Cancel EDIT
  if (item.classList[0] === "x-btn") {
    item.parentElement.parentElement.querySelectorAll("td")[0].innerHTML = `Prédio ${valuePredio}`
    item.parentElement.parentElement.querySelectorAll("td")[1].innerHTML = valueLocal
    item.parentElement.parentElement.querySelectorAll("td")[2].innerHTML =
      '<button class="edit-btn"><i class="bi-pencil-fill"></i></button><button class="trash-btn"><i class="bi-trash-fill"></i></button>'
  }
}
