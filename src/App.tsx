import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Stack,
  TextField,
  Button,
} from "@mui/material";
import Todoitems from "./Components/Todoitems";
import { useEffect, useState } from "react";
import { getTodos, savelocal } from "./utils/features";

const App = () => {
  const [todos, settodos] = useState<TodoItemtype[]>(getTodos())

  const[title,settile]=useState<TodoItemtype["title"]>(''); 

  useEffect(()=>{
    savelocal(todos)
  },[todos])



  const deleteHandler=(id:string):void =>{
    const Todos:TodoItemtype[]=todos.filter(i=>i.id!=id)
    settodos(Todos)
    savelocal(todos);
  };
  const completeHandler=(id:TodoItemtype["id"]):void =>{
    const newtodos:TodoItemtype[ ]=todos.map((i)=>{
      if(i.id===id)
      i.isCompleted  = ! i.isCompleted;
    return i;
    })
    settodos(newtodos)
    savelocal(todos);
  };

  const editeHandler=(id:TodoItemtype["id"],title:TodoItemtype["title"]):void =>{
    const Todos:TodoItemtype[]=todos.map((i)=>{
      if(i.id===id)
      i.title= title  ;
    return i;
    })
    
    settodos(Todos)
    savelocal(todos);
  };

  const submitHandler = ():void =>
  {
   const newTodo:TodoItemtype={
    title,
    isCompleted:false,
    id:String(Math.random()*1000),
   }
   settodos((prev)=>([...prev,newTodo]))
   settile("")
   savelocal(todos);
  }
  return (
    <Container maxWidth="sm" sx={{ height: "100vh" }}>
      <AppBar position="static">
        <Toolbar>
          <Typography>To Do List</Typography>
        </Toolbar>
      </AppBar>
      <Stack height={"70%"} direction={"column"} spacing={"1rem"} p={"1rem"}>
        {todos.map((i) => (
          <Todoitems key={i.id} todo={i} completeHandler={completeHandler} deleteHandler={deleteHandler} editeHandler={editeHandler}/>
        ))}
      </Stack>
      <TextField value={title} onChange={(e)=>settile(e.target.value)} fullWidth label={"Add New task"} 
      onKeyDown={(e)=>{
        if(e.key==="Enter" && title!="")
        submitHandler();

      }}
      
      > </TextField>
      <Button
      sx={{
        padding:"0.7rem 0",
        margin:"1rem 0",
      }}
      fullWidth variant="contained"
      onClick={submitHandler}
      disabled={title===""}
      >Add Task</Button>
    </Container>
  );
};

export default App;
