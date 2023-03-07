//유저가 값을 입려갛ㄴ다.
//+버튼 클릭 시 할일이 추가
//delete버튼 클릭 시 할일이 삭제
//check버튼을 누르면 할일이 끝나면서 밑줄이간다.
//1. check 버튼 클릭 순간 true false
//2. true이면 끝난걸로 간주하고 밑줄 보여주기
//3. false이면 안끝난는거롤 간주
//진행중 끝남 탭을 누르면 언더바가 이동한다.
//끝남탭은 끝난 아이템만, 진행중인 아이템은 진행중만
//전체탭을 누르면 다시 전체 아이템으로 돌아옴

let taskInput = document.getElementById("task-Input");
let addButton = document.getElementById("add-button");
let tabs = document.querySelectorAll(".task-tabs div");
let underline= document.getElementById("under-line");


let taskList=[];
let mode ="all";
let filterList=[];
addButton.addEventListener("click",addTask)


for(let i=1;i<tabs.length;i++){
    tabs[i].addEventListener("click",function(event) {filter(event)})
}

function addTask(){
    let task = {
        id:randomIDGenerate(),
        taskContent:taskInput.value,
        isComplete:false
    }
    taskList.push(task);
    console.log(taskList)
    render();
}


function render(){
    let list = [];
    if(mode =="all"){
        list = taskList;
    }else if(mode == "ongoing" || mode =="done"){
        list = filterList;
    }
    let resultHTML =``;
    for(let i=0;i<list.length;i++){
        if(list[i].isComplete == true){
            resultHTML+=` <div class="task">
            <div class="task-done">${list[i].taskContent}</div>
            <div>
              <button onclick="toggleComplete(${list[i].id})">check</button>
              <button onclick="DeleteTask(${list[i].id})">Delete</button>
            </div>
          </div>`;
        }else{
            resultHTML += `<div class="task">
            <div>${list[i].taskContent}</div>
            <div>
              <button onclick="toggleComplete(${list[i].id})">check</button>
              <button onclick="DeleteTask(${list[i].id})">Delete</button>
            </div>
          </div>`;
        }
        
 
    } 


    document.getElementById("task-board").innerHTML=resultHTML;
}

function toggleComplete(id){
    console.log("id:",id);
    for(let i =0;i<taskList.length;i++){
        if(taskList[i].id==id){
            taskList[i].isComplete= !taskList[i].isComplete;
            break;
        }
    }
    render();
}

function randomIDGenerate(){
    return Date.now();
}

function DeleteTask(id){
    for(let i =0;i<taskList.length;i++){
        if(taskList[i].id==id){
            taskList.splice(i,1)
            break;
        }
    }
    render();
    console.log(taskList)
}

function filter(e){
    if(e){
        mode = e.target.id;
        underline.style.width = e.target.offsetWidth + "px";
        underline.style.left = e.target.offsetLeft + "px";
        underline.style.top = e.target.offsetTop + (e.target.offsetheight-4) +"px";
    }
    filterList=[];
    if(mode=="all"){
        render()
    }else if(mode=="ongoing"){
        for(let i=0;i<taskList.length;i++){
            if(taskList[i].isComplete==false)
            filterList.push(taskList[i])
        }
        render();
    }else if(mode =="done"){
        for(let i=0;i<taskList.length;i++){
            if(taskList[i].isComplete==true){
                filterList.push(taskList[i])
            }
        }
        render();
    }
}