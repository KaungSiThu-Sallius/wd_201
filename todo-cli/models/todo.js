/* eslint-disable no-unused-vars */
// models/todo.js
"use strict";
const { Op } = require("sequelize");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static async addTask(params) {
      return await Todo.create(params);
    }
    static async showList() {
      const todos = await Todo.findAll();

      let todayfilter = (todo) => {
        return todo.dueDate == ttdy;
      };
      let todayList = todos.filter(todayfilter);

      let duefilter = (todo) => {
        return todo.dueDate < ttdy;
      };
      let dueList = todos.filter(duefilter);

      let laterfilter = (todo) => {
        return todo.dueDate > ttdy;
      };
      let laterList = todos.filter(laterfilter);

      console.log("My Todo list \n");

      console.log("Overdue");
      let dueDisplay = dueList
        .map((todo) => todo.displayableString())
        .join("\n");
      console.log(dueDisplay);
      console.log();

      console.log("Due Today");
      let todayDisplay = todayList
        .map((todo) => todo.displayableString())
        .join("\n");
      console.log(todayDisplay);
      console.log();

      console.log("Due Later");
      let laterDisplay = laterList
        .map((todo) => todo.displayableString())
        .join("\n");
      console.log(laterDisplay);
      console.log();
    }

    static async overdue() {
      const todos = await Todo.findAll({
        where: {
          dueDate: {
            [Op.lt]: ttdy,
          },
        },
      });
      return todos;
    }

    static async dueLater() {
      const todos = await Todo.findAll({
        where: {
          dueDate: {
            [Op.gt]: ttdy,
          },
        },
      });
      return todos;
    }

    static async dueToday() {
      const todos = await Todo.findAll({
        where: {
          dueDate: {
            [Op.eq]: ttdy,
          },
        },
      });
      return todos;
    }

    static async markAsComplete(id) {
      await Todo.update(
        {
          completed: true,
        },
        {
          where: {
            id: id,
          },
        }
      );
    }

    displayableString() {
      let checkbox = this.completed ? "[x]" : "[ ]";
      let pDate = this.dueDate == ttdy ? "" : " " + this.dueDate;
      return `${this.id}. ${checkbox} ${this.title}${pDate}`;
    }
  }
  Todo.init(
    {
      title: DataTypes.STRING,
      dueDate: DataTypes.DATEONLY,
      completed: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Todo",
    }
  );
  return Todo;
};

const formattedDate = (d) => {
  return d.toISOString().split("T")[0];
};

var dateToday = new Date();
// var tdy = new Date(dateToday);
// tdy.setDate(dateToday.getDate());
// tdy.toLocaleDateString();
// const ttdy = formattedDate(tdy)
const ttdy = formattedDate(dateToday);
