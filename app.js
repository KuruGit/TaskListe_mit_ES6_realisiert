//UI Variablen definieren
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//Funktionen 
function loadEventlisteners() {
    //DOM  load event damit Tasks korrekt in Taskliste persistieren
    document.addEventListener('DOMContentLoaded', getTasks);
    //Task Event einfuegen
    form.addEventListener('submit', addTask);
    //Tasks wieder entfernen
    taskList.addEventListener('click', removeTask);
    //Tasks alle leeren
    clearBtn.addEventListener('click', clearTasks);
    //Tasks Filtern
    filter.addEventListener('keyup', filterTasks);

}

// Tasks aus local Storage laden

function getTasks() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function (task) {
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
    });


}

function addTask(e) {
    if (taskInput.value === '') {
        alert('Achtung, leere Aufgaben können nicht angelegt werden!');
    }
    //li Element erstellen
    const li = document.createElement('li');
    //Klasse für das li Element setzen
    li.className = 'collection-item';
    //TextNode erstellen und an li anhaengen
    li.appendChild(document.createTextNode(task));
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
    //Tasks im local storage ablegen --> Browser kann geschlossen und Seite kann refreshed werden ohne dass Daten verloren gehen
    function storeTaskinLocalStorage(taskInput.value);

    //TaskInput loeschen
    taskInput.value = '';

    e.preventDefault();
}

//Tasks im Lokalspeicher ablegen
function storeTaskinLocalStorage(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}
//angelegte Tasks wieder entfernen durch Klick auf das Fontawesome "x"
function removeTask(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {
        if (confirm("Sind Sie sicher dass sie die Aufgabe löschen möchten?")) {
            e.target.parentElement.parentElement.remove();

            //Tasks aus dem local storage löschen
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}

//Tasks aus local storage löschen

function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function (task, index) {
        if (taskItem.textContent === task) {
            tasks.splice(index, 1);
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
//Alle angelegten Tasks über den Button löschen
//Alternativer Weg wäre mit einer Schleife durch alle Tasklist Kinder zu gehen und diese zu löschen.
//Seltsamerweise wäre das sogar schneller, siehe https://jsperf.com/innerhtml-vs-removechild
//Da es hier aber nur um eine einfache Aufgabenliste geht und niemand 10k+ Aufgaben hat nehme ich die einfache Variante....
function clearTasks() {
    taskList.innerHTML = "";
}
// Tasks Filtern
//speichert den Text aus dem Eingabefeld konvertiert in Kleinbuchstaben in der Konstante "text"
//Danach rufen wir alle Elemente mit der Klasse .collection-item ab und loopen mit dem forEach durch diese durch.
//ACHTUNG!: ForEach funktioniert hier nur weil querySelectorAll eine Nodelist anlegt, das kann man direkt loopen.
//Alle anderen Varianten tun dies nicht und man müsste erst in ein Array konvertieren!
function filterTasks(e) {
    const text = e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach(
        function (task) {
            const item = task.firstChild.textContent;
            if (item.toLowerCase().indexOf(text) != -1) {
                task.style.display = 'block';
            } else {
                task.style.display = 'none';
            }
        }
    );

    //Alle tasks aus local storage löschen
    function clearTasksFromLocalStorage(){
        localStorage.clear();
    }

}
//Alle Eventlistener laden
loadEventlisteners();