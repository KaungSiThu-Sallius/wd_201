/* eslint-disable no-undef */
const todoList = () => {
  all = [];
  const add = (todoItem) => {
    all.push(todoItem);
  };
  const markAsComplete = (index) => {
    all[index].completed = true;
  };

  const overdue = () => {
    // Write the date check condition here and return the array
    // of overdue items accordingly.
    dueArr = all.filter((element) => element.dueDate == yesterday);

    return dueArr;
  };

  const dueToday = () => {
    // Write the date check condition here and return the array
    // of todo items that are due today accordingly.
    todayArr = all.filter((element) => element.dueDate == today);

    return todayArr;
  };

  const dueLater = () => {
    // Write the date check condition here and return the array
    // of todo items that are due later accordingly.
    tmrArr = all.filter((element) => element.dueDate == tomorrow);
    return tmrArr;
  };

  const toDisplayableList = (list) => {
    // Format the To-Do list here, and return the output string
    // as per the format given above.
    newList = [];
    list.forEach((element) => {
      // const completionStatus = item.completed ? "[x]" : "";
      // const displayedDate = item.dueDate === new Date().toLocaleDateString("en-CA") ? "" : item.dueDate;
      str = "";
      if (element.completed) {
        str += "[x] ";
      } else {
        str += "[ ] ";
      }
      str += element.title;
      if (element.dueDate != today) {
        str += " " + element.dueDate;
      }
      newList.push(str);
    });
    return newList.join("\n");
  };

  return {
    all,
    add,
    markAsComplete,
    overdue,
    dueToday,
    dueLater,
    toDisplayableList,
  };
};

module.exports = todoList;
// ####################################### #
// DO NOT CHANGE ANYTHING BELOW THIS LINE. #
// ####################################### #

const formattedDate = (d) => {
  return d.toISOString().split("T")[0];
};

var dateToday = new Date();
const today = formattedDate(dateToday);
const yesterday = formattedDate(
  new Date(new Date().setDate(dateToday.getDate() - 1))
);
const tomorrow = formattedDate(
  new Date(new Date().setDate(dateToday.getDate() + 1))
);
// const todos = todoList();

// todos.add({ title: 'Submit assignment', dueDate: yesterday, completed: false })
// todos.add({ title: 'Pay rent', dueDate: today, completed: true })
// todos.add({ title: 'Service Vehicle', dueDate: today, completed: false })
// todos.add({ title: 'File taxes', dueDate: tomorrow, completed: false })
// todos.add({ title: 'Pay electric bill', dueDate: tomorrow, completed: false })

// console.log("My Todo-list\n")

// console.log("Overdue")
// var overdues = todos.overdue()
// var formattedOverdues = todos.toDisplayableList(overdues)
// console.log(formattedOverdues)
// console.log("\n")

// console.log("Due Today")
// let itemsDueToday = todos.dueToday()
// let formattedItemsDueToday = todos.toDisplayableList(itemsDueToday)
// console.log(formattedItemsDueToday)
// console.log("\n")

// console.log("Due Later")
// let itemsDueLater = todos.dueLater()
// let formattedItemsDueLater = todos.toDisplayableList(itemsDueLater)
// console.log(formattedItemsDueLater)
// console.log("\n\n")
