let todos = JSON.parse(localStorage.getItem("todos") || "[]");


function importTodos() {
    todos.forEach(todo => {
        let todoElement = $(`
        <li class="todo" id="${todo.id}">
            <button onclick="toggleTodo(this)" class="button check"><i class="far fa-circle"></i></i></button>
            <div class="text">${todo.text}</div>
            <button onclick="removeTodo(this)" class="button remove"><i class="fas fa-trash"></i></button>
        </li>
        `);

        if(todo.checked === true) {
            todoElement = $(`
            <li class="todo" id="${todo.id}">
                <button onclick="toggleTodo(this)" class="button check checked"><i class="fas fa-check-circle"></i></button>
                <div class="text checked">${todo.text}</div>
                <button onclick="removeTodo(this)" class="button remove"><i class="fas fa-trash"></i></button>
            </li>
            `);
        }
        $(".todos-container").append(todoElement);
        setTimeout(function(){ todoElement.addClass('visible') }, 0);
    });
}


function addTodo(todo) {
    let todoId = Math.floor(Math.random() * 1000000);
    todos.push({
        text: todo,
        id: todoId,
        checked: false
    });

    localStorage.setItem("todos", JSON.stringify(todos));

    let todoElement = $(`
    <li class="todo" id="${todoId}">
        <button onclick="toggleTodo(this)" class="button check"><i class="far fa-circle"></i></button>
        <div class="text">${todo}</div>
        <button onclick="removeTodo(this)" class="button remove"><i class="fas fa-trash"></i></button>
    </li>
    `);
    $(".todos-container").append(todoElement);
    setTimeout(function(){ todoElement.addClass('visible') }, 0);
}


function removeTodo(todo) {
    let todoElement = $(todo).parent();

    todoElement.removeClass('visible');
    setTimeout(function(){ todoElement.remove(); }, 300);

    let todoId = todoElement.attr("id");
    todos = todos.filter(todo => todo.id.toString() !== todoId );
    localStorage.setItem("todos", JSON.stringify(todos));
}



function toggleTodo(todo) {
    let todoElement = $(todo).parent();
    todoElement.find('.text').toggleClass("checked");
    let todoId = todoElement.attr("id");
    for (let i = 0; i < todos.length; i++) {
        if(todos[i].id.toString() === todoId ) {
            if(todos[i].checked === true) {
                todos[i].checked = false;
                todoElement.find('button').removeClass("checked");
                todoElement.find('button.check').find('i').addClass("far fa-circle");
                todoElement.find('button.check').find('i').removeClass("fas fa-check-circle");                
            } else {
                todos[i].checked = true;
                todoElement.find('button').addClass("checked");
                todoElement.find('button.check').find('i').removeClass("far fa-circle");
                todoElement.find('button.check').find('i').addClass("fas fa-check-circle checked");
            }
        }
    }

    localStorage.setItem("todos", JSON.stringify(todos));
}


$(document).ready(function(){
    setInterval(function(){ $(".logo").toggleClass('shadow') }, 1000);
    setInterval(function(){
        if(!($(".filter-btn").attr('class')).includes('open')) {
         $(".filter-btn").toggleClass('scale');
        }
    }, 1000);

    importTodos();

    $(".filter-btn").on("click", function() {
        $(".filter-btn").toggleClass("open");
        $(".filter-input").toggleClass("open");
    });

    $(".filter-input").on("keyup", function() {
        let value = $(this).val();
        $(".todos-container li").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
        });
    });


    $("form").submit(function(e){
        e.preventDefault(); //prevent refreshing
        let todo = $(this).find('input').val();
        addTodo(todo);
        $(this).find('input').val('');
    });
});