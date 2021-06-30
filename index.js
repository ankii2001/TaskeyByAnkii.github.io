const taskContainer = document.querySelector(".task__container");

let globalStore = [];

const GenerateNewCard = (taskData) => `
<div class="col-md-6 col-lg-4">
<div class="card">
    <div class="card-header d-flex justify-content-end gap-2">
        <button type="button" class="btn btn-outline-success">
        <i class="fas fa-pencil-alt"></i>
        </button>
        <button type="button" class="btn btn-outline-danger" id=${taskData.id} onclick="deleteCard.apply(this, arguments)">
        <i class="fas fa-trash-alt id=${taskData.id} onclick="deleteCard.apply(this, arguments)"></i>
        </button>
    </div>
    <img src="${taskData.imageUrl}" class="card-img-top" alt="task1">
    <div class="card-body">
      <h5 class="card-title">${taskData.taskTitle}</h5>
      <p class="card-text">${taskData.taskDescription}</p>
      <a href="#" class="btn btn-primary">${taskData.taskType}</a>
    </div>
    <div class="card-footer">
        <button type="button" class="btn btn-outline-primary float-end">
            Open Task</button>                       
        </div>
</div>
</div>
`;

const loadInitialCardData = () => {
    // localStorage to get taskey card data
    const getCardData = localStorage.getItem("Taskey");
    
    // convert from string to normal object
    const {cards} = JSON.parse(getCardData);

    // loop over those array of task object to create HTML card, 
    cards.map((cardObject)=>{
        //& inject it to DOM
        taskContainer.insertAdjacentHTML("beforeend", GenerateNewCard(cardObject));
    
    // Update our globalStore
        globalStore.push(cardObject);
    })

    
};

const saveChanges = () => {
    const taskData = {
        id: `${Date.now()}`, // unique number for id
        imageUrl: document.getElementById("imageurl").value,
        taskTitle: document.getElementById("tasktitle").value,
        taskType: document.getElementById("tasktype").value,
        taskDescription: document.getElementById("taskdescription").value,
    };

    taskContainer.insertAdjacentHTML("beforeend", GenerateNewCard(taskData));

    globalStore.push(taskData);

    localStorage.setItem("Taskey", JSON.stringify({cards:globalStore}));

};

const deleteCard = (event) => {
    
    event = window.event;

    // id
    const targetID = event.target.id;
    const tagname = event.target.tagName; // BUTTON

    // match the id of the element with the id inside the globalStore
    // if match found delete it
    globalStore = globalStore.filter((cardObject) => cardObject.id !==  targetID);
    
    // Update localStorage
    localStorage.setItem("Taskey", JSON.stringify({cards:globalStore}));
    // contact parent
    if(tagname === "BUTTON"){
        return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode);
    }else{
        return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode.parentNode);
    }
};