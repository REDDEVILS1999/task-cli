import fs from 'fs';
const readJSON = () => {
  try {
    const data = fs.readFileSync("task.json", "utf8");
    if (!data || data.trim() === "") {
      return [];
    }
    return JSON.parse(data); // Parse it so it's an object/array, not just text
  } catch (err) {
    console.log(err);
  }
};

readJSON();

// fs.writeFile("task.json", "hello", "utf8", (err) => {
//   if (err) {
//     console.error("Failed to write file:", err);
//     return;
//   }
//   console.log("File written successfully!");
// });
// const data = { name: "John", age: 30, city: "New York" };
// fs.writeFileSync("task.json", JSON.stringify(data, null, 4), "utf8");

const instruction = process.argv[2];
console.log(instruction);

const saveJSON = (data) => {
  fs.writeFileSync("task.json", JSON.stringify(data, null, 4), "utf8");
};

if (instruction == "add") {
  const taskData = process.argv[3];
  console.log(taskData);
  let tasks = readJSON();
  let myID = tasks.length == 0 ? 1 : tasks[tasks.length - 1].id + 1;
  let desc = "adding data into json";
  let status = null;
  let createdAt = new Date();
  let updatedAt = new Date();
  let tempValue = {
    id: myID,
    data: taskData,
    description: desc,
    status: status,
    createdAt: createdAt,
    updatedAt: updatedAt,
  };
  tasks.push(tempValue);
  saveJSON(tasks);
}

if (instruction == "delete") {
  const taskID = process.argv[3];
  let tasks = readJSON();
  console.log(tasks);
  let updatedData = tasks.filter((task) => task.id != taskID);
  saveJSON(updatedData);
}

if (instruction == "update") {
  const updateId = Number(process.argv[3]); 
  const newText = process.argv.slice(4).join(" ");
  let tasks1 = readJSON();
  let index = tasks1.findIndex((task) => task.id === updateId);
  if (index === -1) {
  console.log("Task not found");
  process.exit();
}
tasks1[index].description = newText;
tasks1[index].updatedAt = new Date().toISOString();
saveJSON(tasks1);
console.log("Task updated successfully");
}

if (instruction == "mark-in-progress") {
  const updateId = Number(process.argv[3]); 
  let tasks1 = readJSON();
  let index = tasks1.findIndex((task) => task.id === updateId);
  if (index === -1) {
  console.log("Not in progress");
  process.exit();
}
tasks1[index].status = "in-progress";
tasks1[index].updatedAt = new Date().toISOString();
saveJSON(tasks1);
console.log("Task marked as in-progress successfully");
}