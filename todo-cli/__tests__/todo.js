/* eslint-disable no-undef */
const todoList = require("../todo");

const todos = todoList();
const { all, markAsComplete, add } = todoList();

const formattedDate = (d) => {
  return d.toISOString().split("T")[0];
};

var dateToday = new Date();

describe("Todolist Test Suite", () => {
  beforeAll(() => {
    add({
      title: "Test todo Test",
      completed: false,
      dueDate: new Date().toISOString("en-CA"),
    });
  });
  test("should add new todo", () => {
    const toDoLength = all.length;
    add({
      title: "Test todo",
      completed: false,
      dueDate: new Date().toISOString("en-CA"),
    });
    expect(all.length).toBe(toDoLength + 1);
  });

  test("should mark a todo as complete", () => {
    expect(all[0].completed).toBe(false);
    markAsComplete(0);
    expect(all[0].completed).toBe(true);
  });

  test("should retrieval of overdue items", () => {
    add({
      title: "Test todo yesterday",
      completed: false,
      dueDate: formattedDate(
        new Date(new Date().setDate(dateToday.getDate() - 1))
      ),
    });

    var overdues = todos.overdue();
    let greater = overdues.length > 0;

    expect(true).toBe(greater);
  });

  test("should retrieval of due today items", () => {
    add({
      title: "Test todo due today",
      completed: false,
      dueDate: formattedDate(dateToday),
    });
    var dueToday = todos.dueToday();
    var greater = dueToday.length > 0;
    expect(true).toBe(greater);
  });

  test("should retrieval of due later items", () => {
    add({
      title: "Test todo due later",
      completed: false,
      dueDate: formattedDate(
        new Date(new Date().setDate(dateToday.getDate() + 1))
      ),
    });
    var dueLater = todos.dueLater();
    var greater = dueLater.length > 0;
    expect(true).toBe(greater);
  });
});
