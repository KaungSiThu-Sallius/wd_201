/* eslint-disable no-unused-vars */
const express = require("express");
const app = express();
const { Todo } = require("./models");

//protect CSRF
var csrf = require('csurf')
var cookieParser = require('cookie-parser')

//for use json file
const bodyParser = require("body-parser");
app.use(bodyParser.json());

//for use ejs file
app.set("view engine", "ejs");

//for css
app.use(express.static("public"));

//for form post request
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser("shh! some secret string"))
app.use(csrf({
    cookie: true,
}))

app.get("/", async function (request, response) {
    const allTodos = await Todo.getTodos();
    const overdue = await Todo.overdue();
    const dueToday = await Todo.dueToday();
    const dueLater = await Todo.dueLater();

    if (request.accepts("html")) {
        response.render("index", {
            title: "Todo Application",
            overdue,
            dueToday,
            dueLater,
            allTodos,
            csrfToken: request.csrfToken(),
        });
    } else {
        response.json({
            overdue,
            dueToday,
            dueLater,
        });
    }
});

app.get("/todos", async function (_request, response) {
    console.log("Processing list of all Todos ...");
    try {
        const todos = await Todo.findAll();
        return response.send(todos);
    } catch (error) {
        console.log(error);
        return response.status(422).json(error);
    }
});

app.get("/todos/:id", async function (request, response) {
    try {
        const todo = await Todo.findByPk(request.params.id);
        return response.json(todo);
    } catch (error) {
        console.log(error);
        return response.status(422).json(error);
    }
});

app.post("/todos", async function (request, response) {
    console.log("Creating a todo", request.body);
    try {
        const todo = await Todo.addTodo({
            title: request.body.title,
            dueDate: request.body.dueDate,
        });
        return response.redirect("/");
    } catch (error) {
        console.log(error);
        return response.status(422).json(error);
    }
});

app.put("/todos/:id/markAsCompleted", async function (request, response) {
    console.log("We have to update a todo with ID: ", request.params.id)
    const todo = await Todo.findByPk(request.params.id);
    try {
        const updatedTodo = await todo.markAsCompleted();
        return response.json(updatedTodo);
    } catch (error) {
        console.log(error);
        return response.status(422).json(error);
    }
});

app.delete("/todos/:id", async function (request, response) {
    console.log("We have to delete a Todo with ID: ", request.params.id);
    try {
        await Todo.remove(request.params.id)
        return response.json({
            success: true,
        })
    } catch (error) {
        return response.status(422).json(error);
    }
});

module.exports = app;
