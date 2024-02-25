import {
  Button,
  Checkbox,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

type PropsType = {
  todo: TodoItemtype;
  deleteHandler: (id: TodoItemtype["id"]) => void;
  completeHandler: (id: TodoItemtype["id"]) => void;
  editeHandler: (id: TodoItemtype["id"],newtitle:string) => void;
};

const Todoitems = ({ todo, deleteHandler, completeHandler,editeHandler}: PropsType) => {
  const [editActive, seteditActive] = useState<boolean>(false);
  const [textvalu, settextvalu] = useState<string>(todo.title);
  return (
    <Paper
      variant="elevation"
      sx={{
        padding: "1rem",
      }}
    >
      <Stack direction={"row"} p={"1rem"} alignItems={"center"}>
        {editActive ? (
          <TextField
            value={textvalu}
            onChange={(e) => settextvalu(e.target.value)}
            onKeyDown={(e)=>{
              if(e.key==="Enter" && textvalu!="")
             {
              editeHandler(todo.id,textvalu);
              seteditActive(false)
             }
      
            }}
          />
        ) : (
          <Typography marginRight={"auto"}>{todo.title}</Typography>
        )}
        <Checkbox
          checked={todo.isCompleted}
          onClick={() => completeHandler(todo.id)}
        ></Checkbox>
        <Button onClick={() => seteditActive((prev) => !prev)}>
          {
            editActive ? "Done" : "Edit"
          }
        </Button>
        <Button onClick={() => deleteHandler(todo.id)}>🗑️</Button>
      </Stack>
    </Paper>
  );
};

export default Todoitems;
