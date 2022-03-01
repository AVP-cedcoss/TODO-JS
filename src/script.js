//GLOBAL TODO ARRAY
let TODO=[];

//GLOBAL VARIABLE FOR ID OF TASK
let uniqueIDForTask=0;

//Event Listener for Add New Task Button
document.getElementById("add-new-task").addEventListener("click",add);

//Adding data to the ARRAY
function add()
{
    uniqueIDForTask += 1;
    let newTask = pullValue();
    pushData(newTask);
    clearFields();
    displayIncomplete();
}

//Clear Fields
function clearFields()
{
    document.getElementById("new-task").value = "";
}

//Creating and Pushing Object to the Array
function pushData(newTask)
{
    //creating Object and assigning Values
    let task = 
    {
        "ID": uniqueIDForTask,
        "task": newTask,
        "completed": false
    };
    
    //Adding Object to TODO Array
    TODO.push(task);

    return;
}

//Fetching Value from Input Field
function pullValue()
{
    return document.getElementById('new-task').value;
}

//Incomplete Task Checked
function taskChecked(id)
{
    for (var i = 0; i < TODO.length; i++)
    {
        console.log(id);
        if (TODO[i].ID == id)
        {
            if (TODO[i].completed == false)
            {
                TODO[i].completed = true;
                break;
            }
            else
            {
                TODO[i].completed = false;
                break;
            }
        }
    }
    displayIncomplete();
    displayComplete();
}

//Edit Function
function editClicked(id)
{
    let html="";
    document.getElementById("input-field").innerHTML = "";
    var i = TODO.length - 1;
    while (i >= 0)
    {
        if (TODO[i].ID == id)
        {
            html = '\
                    <input id="edit-task" type="text" value='+TODO[i].task+'>\
                    <button id="edit-task" onclick="editUpdate('+TODO[i].ID+')">\
                        Update\
                    </button>\
                ';
                document.getElementById("input-field").innerHTML = html;
                break;
        }
        i--;
    }
}

function editUpdate(id)
{
    for (var i = 0; i < TODO.length; i++)
    {
        if (TODO[i].ID == id)
        {
            TODO[i].task = document.getElementById("edit-task").value;
            if (TODO[i].completed == true)
            {
                displayComplete();
            }
            else
            {
                displayIncomplete();
            }
            html = '\
                    <input id="new-task" type="text" value="">\
                    <button id="add-new-task">\
                        Add\
                    </button>\
                ';
                document.getElementById("input-field").innerHTML = html;
            break;
        }
    }
}

//Delete
function deleteClicked(id)
{
    var i = TODO.length - 1;
    while (i >= 0)
    {
        if (TODO[i].ID == id && TODO[i].completed == true)
        {
            TODO.splice(i,1);
            displayComplete();
        }
        else if (TODO[i].ID == id && TODO[i].completed == false)
        {
            TODO.splice(i,1);
            displayIncomplete();
        }
        i-=1;
    }
}

//DISPLAY Incomplete Tasks
function displayIncomplete()
{
    //Fecthing the Division
    var incomplete = document.getElementById("incomplete-tasks");

    //Incomplete Task
    incomplete.innerHTML = "";
    let html="";

    for (var i = 0; i < TODO.length; i++)
    {
        if (TODO[i].completed == false)
        {
            html += '\
                <li id='+TODO[i].ID+'>\
                    <input type="checkbox" id="chk" onclick="taskChecked('+TODO[i].ID+')">\
                    <label>\
                        '+TODO[i].task+'\
                    </label>\
                    <input type="text">\
                    <button class="edit" onclick=editClicked('+TODO[i].ID+')>\
                        Edit\
                    </button>\
                    <button class="delete" onclick=deleteClicked('+TODO[i].ID+')>\
                        Delete\
                    </button>\
                </li>\
                ';
        }
    }
    incomplete.innerHTML = html;
}

//Display Complete Tasks
function displayComplete()
{
    //Fetching the Division
    var completed = document.getElementById("completed-tasks");

    //Complete Task
    completed.innerHTML = "";
    let html="";

    for (var i = 0; i < TODO.length; i++)
    {
        if (TODO[i].completed == true)
        {
            html += '\
                <li id='+TODO[i].ID+'>\
                    <input type="checkbox" id="chk" onclick="taskChecked('+TODO[i].ID+')" checked>\
                    <label>\
                        '+TODO[i].task+'\
                    </label>\
                    <input type="text">\
                    <button class="edit" onclick=editClicked('+TODO[i].ID+')>\
                        Edit\
                    </button>\
                    <button class="delete" onclick=deleteClicked('+TODO[i].ID+')>\
                        Delete\
                    </button>\
                </li>\
                ';
        }
    }
    completed.innerHTML = html;

}
