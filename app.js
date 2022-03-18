
var my_todo_list = JSON.parse(localStorage.getItem("list"));

if(my_todo_list !== null){
  for(i=0;i<my_todo_list.length;i++){
      $("section").append(`
      <div class="todo-item">
        <span>${my_todo_list[i]['todotext']}</span>
        <span>${my_todo_list[i]['month']}/${my_todo_list[i]['day']}</span>
        <button class="success">O</button>
        <button class="delete" data-delete-text="${my_todo_list[i]['todotext']}">X</button>
      </div>
    `);
  }

  $(".success").click(function(){
    if($(this).parent().hasClass("done")){
      $(this).parent().removeClass("done")
    }else{
      $(this).parent().addClass("done")
    }
  })
  
  $(".delete").click(function(){
    let be_delete_text  = $(this).attr("data-delete-text")
    DeleteLocalStorage(be_delete_text)

    $(this).parent().remove()
  })
}

$("form button").click(function(e){
  e.preventDefault();

  let todotext  = $("input[name='todo-text-content']").val()
  let month     = $("input[name='todo-month-content']").val()
  let day       = $("input[name='todo-day-content']").val()

  if(todotext === ""){
    alert("沒寫要幹嘛")
    return;
  }
  if(month === ""){
    alert("沒說哪個月")
    return;
  }
  if(month > 12){
    alert("沒那麼多月rr")
    return;
  }
  if(day === ""){
    alert("沒說哪一天")
    return;
  }
  if(day > 31){
    alert("沒那麼多天rr")
    return;
  }

  let todo_json = {
    todotext: todotext,
    month: month,
    day: day
  }

  if(my_todo_list == null) {
    localStorage.setItem("list", JSON.stringify([todo_json]))
  }else{
    let list_array = my_todo_list
    list_array.push(todo_json);
    localStorage.setItem("list", JSON.stringify(list_array));
  }

    $("section").append(`
    <div class="todo-item">
      <span>${todotext}</span>
      <span>${month}/${day}</span>
      <button class="success">O</button>
      <button class="delete" data-delete-text="${todotext}">X</button>
    </div>
  `);

  $(".success").click(function(){
    if($(this).parent().hasClass("done")){
      $(this).parent().removeClass("done")
    }else{
      $(this).parent().addClass("done")
    }
  })

  $(".delete").click(function(){
    let be_delete_text  = $(this).attr("data-delete-text")
    DeleteLocalStorage(be_delete_text)

    $(this).parent().remove()
  })
  
  $("input[name='todo-text-content']").val("")
  $("input[name='todo-month-content']").val("")
  $("input[name='todo-day-content']").val("")
})

function DeleteLocalStorage(be_delete_text){
    new_array = JSON.parse(localStorage.getItem("list"));
    new_array.forEach((item,index)=>{
      if(item.todotext == be_delete_text){
        new_array.splice(index, 1);
        localStorage.setItem("list", JSON.stringify(new_array))
      }
    })
}