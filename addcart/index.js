
import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import{getDatabase,ref,push,onValue,remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"
//import { initializeApp } from "firebase/app";

const appSettings={
    database:"https://playground-58450-default-rtdb.firebaseio.com/"
}

const firebaseConfig = {
    apiKey: "AIzaSyCoBRHJNzWRhG_0sAc9MhHxUjYwEXrj8l0",
    authDomain: "playground-58450.firebaseapp.com",
    databaseURL: "https://playground-58450-default-rtdb.firebaseio.com",
    projectId: "playground-58450",
    storageBucket: "playground-58450.appspot.com",
    messagingSenderId: "178620603135",
    appId: "1:178620603135:web:46e2faf99516c4e8108aca"
  };
  
const app=initializeApp(firebaseConfig)
const database=getDatabase(app)
const moviedb=ref(database,"movies")

console.log(app)
 

const inputField=document.getElementById("inputfield");
const addButtonEl=document.getElementById("add-button");
const shoppinglist=document.getElementById("shopping-list");

onValue(moviedb,function(snapshot){
  
    


    if(snapshot.exists())
    {
        let arr=(Object.entries(snapshot.val()))
            shoppinglist.innerHTML=""
        for(let i=0;i<arr.length;i++)
        {
            let currentitem=arr[i];
            let currentkey=currentitem[0]
            let currentvalue=currentitem[1]
            
            append(currentitem)
        }
    }
    else{
        shoppinglist.innerHTML=""
    }
})


function doi() {
    
    let inputValue=inputField.value
    inputField.value=""
    push(moviedb,inputValue)

    //console.log(`${inputValue} added to database`)
    
    //append(inputValue)

  }
  addButtonEl.onclick = doi;


  function append(item)
  {
    //shoppinglist.innerHTML+=`<li>${item}</li>`

    let itemid=item[0]
    let itemvalue=item[1]

    let newl=document.createElement("li")
    newl.addEventListener("dblclick",function(){
        console.log(itemid)
        let exactloction= ref(database,`movies/${itemid}`)
        remove(exactloction)
    })

    newl.textContent=itemvalue
    shoppinglist.append(newl)

  }