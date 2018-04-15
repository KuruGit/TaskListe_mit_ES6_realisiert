//UI Variablen definieren
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//Funktionen 
function loadEventlisteners(){
    //Task Event einfuegen
    form.addEventListener('submit',addTask);
}

function addTask(e){

    if(taskInput.value === '') {
        alert('Achtung, leere Aufgaben können nicht angelegt werden!');
    }
    //li Element erstellen
    const li = document.createElement('li');
    //Klasse für das li Element setzen
    li.className = 'collection-item';
    //TextNode erstellen und an li anhaengen
    li.appendChild(document.createTextNode(taskInput.value));
    //neues link Element erstellen
    const link = document.createElement('a');
    //dem link Element Klassen zuweisen
    link.className = 'delete-item secondary-content';
    //li Element fontawesome symbol einfuegen
    link.innerHTML = '<i class="fa fa-times"></i>';
    //Link an li anfuegen
    li.appendChild(link);
    //li an ul anfuegen
    taskList.appendChild(li);
    //TaskInput loeschen
    taskInput.value = '';

    e.preventDefault();
}

//Alle Eventlistener laden
loadEventlisteners();


