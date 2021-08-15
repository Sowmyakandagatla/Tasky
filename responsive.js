// to get the Dom element we use querySelector open console and see it will be in a array form.and task__container is child we can't use row bcz it is parent .
// we define class name in css as ".task__container".
// we use querySelector to select class name.
const taskContainer= document.querySelector(".task__container");
console.log(taskContainer);
// it is used to store the generated new card data in the array form called variable global store .
let globalStore=[]

const generateNewCard=(taskData)=>`
<div class="col-md-6 col-lg-4">
                <div class="card text-center">     
                  <div class="card-header d-flex justify-content-end gap-2">
                    <button type="button" class="btn btn-outline-success">
                      <i class="fas fa-edit"></i>
                    </button>
                    <button type="button" class="btn btn-outline-danger" id=${taskData.id} onclick="deleteCard.apply(this,arguments)">
                      <i class="fas fa-trash-alt" id=${taskData.id} onclick="deleteCard.apply(this,arguments)"></i>
                    </button>
                  </div>
                  <img src="${taskData.imageUrl}" class="card-img-top" alt="..."> 
                  <div class="card-body">
                    <h5 class="card-title">${taskData.taskTitle}</h5>
                    <p class="card-text">${taskData.taskDescription}</p>
                    <a href="#" class="btn btn-primary">${taskData.taskType}</a>
                  </div>
                  <div class="card-footer text-muted d-flex justify-content-end">
                    <button type="button" class="btn btn-outline-primary">Open Task</button>
                  </div>
                  
                </div> 
                </div>
`;

const loadInitialCardData = () =>{

     // local storage to get tasky card data .
     const getCardData = localStorage.getItem("tasky");

     // convert from string to normal object.
     const {cards} = JSON.parse(getCardData);

     // loop over those array of task object to create HTML card.
     cards.map ((cardObject) =>{

          // inject it to DOM.
          taskContainer.insertAdjacentHTML("beforeend",generateNewCard(cardObject));

          // update our global store.
          globalStore.push(cardObject);

     })
};

const deleteCard=(event) =>{

     event=window.event;

     const targetID=event.target.id;
     const tagname =event.target.tagName;//button


     globalStore= globalStore.filter((cardObject)=> cardObject.id !== targetID);
     localStorage.setItem("tasky",JSON.stringify({cards:globalStore}));

     if(tagname === "BUTTON")
     {
          return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode);
     }
     else
     {
          return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode.parentNode);
    
     }
};


// arrow function
const saveChanges = () =>{
  // object is created
   const taskData ={
        id: `${(Date.now())}`, //unique number for id
        // here to access the value inside ELEMENT ,we need to use ".value". you check in console where you are getting vales or not.
        imageUrl: document.getElementById("imageurl").value,
        taskTitle: document.getElementById("tasktitle").value,
        taskType:document.getElementById("tasktype").value,
        taskDescription:document.getElementById("taskdescription").value,
   };
   console.log(taskData);
// adding the card in the web page using insertAdjacentHTML.here place we are inserting is before end.  
taskContainer.insertAdjacentHTML("beforeend",generateNewCard(taskData));
// here we are pushing the taskData object in the globalstore array. we take taskdate than generatenewcard bcz array stores objects. 
globalStore.push(taskData);
// we are storing it in a local store and setiteam is to add item ,tasky is a id that should ne unique thats y we giving id .
//json.stringify is used to convert the object into string .and we take card as a property to store the globalstore object init.
localStorage.setItem("tasky",JSON.stringify({cards:globalStore}));
};