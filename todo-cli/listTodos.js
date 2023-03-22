/* eslint-disable no-unused-vars */
//  listTodos.js
const db = require("./models/index");

const listTodo = async () => {
  try {
    await db.Todo.showList();
  } catch (error) {
    console.error(error);
  }
};

const test = async () => {
  try {
    const testF = await db.Todo.dueLater();
    console.log(testF);
  } catch (error) {
    console.error(error);
  }
};

(async () => {
  await listTodo();
  // await test();
})();
