import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
let todoList = [];
app.get("/", (req, res) => {
    res.render("index.ejs", {todoList:todoList})
  });

app.post("/Create", (req, res)=> {
    const newItem = req.body.todoItem
    todoList.push(newItem)
    res.redirect("/");
})

app.post("/delete", (req, res) => {
    const deleteItem = req.body.delItem;
    const index = todoList.indexOf(deleteItem);
    if (index !== -1) {
        todoList.splice(index, 1);
      } else {
        res.status(404).send('Item not found.');
      }
    res.redirect("/")
  });

app.post("/update",(req, res)=>{
    const update = req.body.updateItem;
    const updatedValue = req.body.updatedValue;
    const index = todoList.indexOf(update);
    if(index !== -1){
      todoList[index] = updatedValue;
      res.redirect("/")
    }else {
      res.status(404).send('Item dose not exist.');
    }
})


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
