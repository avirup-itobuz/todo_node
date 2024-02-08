const fs = require("node:fs");
const input = process.argv.splice(2);
var tasks = [];

try {
  const data = fs.readFileSync("./db.json");
  if (data && Array.isArray(JSON.parse(data))) {
    tasks = JSON.parse(data);
  }
  todoActions(input[0]);
} catch (err) {
  console.error(err);
  console.log("Error!! Please try again");
}

function todoActions(option) {
  if (input.length == 0) {
    console.log(`Enter your choice:
        1. Enter new tasks (option task)
        2. Show tasks (option)
        3. Delete task (option id)
        4. Update task (option id update)
        Execute the code and then mention the correct option and the input`);
  } else if (option === "1") {
    const data = input.splice(1);
    if (data.length == 0) {
      console.log("invalid input!!");
      process.exit();
    }
    const taskobj = {
      taskid: String(Math.round(Math.random() * 1000000)),
      task: data.join(" ").toString(),
      date: new Date().toString().slice(4, 16),
    };
    tasks.push(taskobj);
    fs.writeFileSync("./db.json", JSON.stringify(tasks));
    console.log("Task added!!");
  } else if (option === "2") {
    if (tasks.length === 0) {
      console.log("No tasks to show");
    }
    for (const task of tasks)
      console.log(
        "id:" + task.taskid + " date: " + task.date + " task: " + task.task
      );
  } else if (option === "3") {
    const id = input[1];
    if (id == null) {
      console.log("no id found");
      process.exit();
    }
    const prevlen = tasks.length;
    tasks = tasks.filter((task) => String(task.taskid) !== id);
    fs.writeFileSync("./db.json", JSON.stringify(tasks));
    const length = tasks.length;
    if (prevlen != length) console.log("Task deleted!!");
    else console.log("Item not found");
  } else if (option === "4") {
    const id = input[1];
    if (id == null) {
      console.log("no id found");
      process.exit();
    }
    const data = input.splice(2);
    if (data.length == 0) {
      console.log("invalid input!!");
      process.exit();
    }
    tasks.forEach((task, index) => {
      if (String(task.taskid) === id) {
        tasks[index].task = data.join(" ").toString();
      }
    });
    fs.writeFileSync("./db.json", JSON.stringify(tasks));
    console.log("Task updated!!");
  }
}
