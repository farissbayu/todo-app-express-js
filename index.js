import express from 'express';
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const todoList = [];

let id;
let result;
let todoListIndex;

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("TODO App");
});

app.get("/todo", (req, res) => {
    res.send(todoList);
});

app.post("/add-todo", (req, res) => {
    const todoItem = {
        "id": todo.length + 1, 
        "todo": req.body.todo
    };
    todoList.push(todoItem);
    res.send("Berhasil menambahkan todo baru!");
});

app.delete("/delete-todo", (req,res) => {
    id = req.body.id;
    todoListIndex = findTodoListIndex(id);

    if(todoListIndex != -1) {
        todoList.splice(todoListIndex, 1);
        result = `Berhasil menghapus todo pada index ke -  ${todoListIndex}`;
    } else {
        result = "Index tidak ditemukan. Gagal menghapus todo.";
    }

    res.send(result);
});

app.put("/update-todo", (req, res) => {
    id = req.body.id;
    result = "";
    todoListIndex = findTodoListIndex(id);

    if(todoListIndex != -1) {
        todoList[id] = {
            "id": id,
            "todo": req.body.todo
        };
        result = `Berhasil mengubah todo pada index ke - ${todoListIndex}`;
    } else {
        result = "Index tidak ditemukan. Gagal mengubah todo.";
    }

    res.send(result);
});

app.listen(port, () => {
    console.log('listening on port ' + port);
});

function findTodoListIndex(id) {
    let index;
    for(let i = 0; i < todoList.length; i++) {
        if(todoList[i].id == id) {
            index = i;
            break;
        } else {
            index = -1;
        }
    };
    return index;
}