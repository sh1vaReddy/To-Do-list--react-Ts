export const savelocal = (todos:TodoItemtype[]):void =>
{
    localStorage.setItem("mytodos",JSON.stringify(todos))
 
}

export const getTodos = ():TodoItemtype[]=>
{
   const todos= localStorage.getItem("mytodos");
    return todos?JSON.parse(todos):[]

}