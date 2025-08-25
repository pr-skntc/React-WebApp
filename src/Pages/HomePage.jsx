import React, { useState } from "react";
import NewTask from "../Components/NewTask";
import TodoItem from "../Components/TodoItem";
function HomePage() {
  const [todos, setTodos] = useState([]); //เก็บรายการ To-do ทั้งหมดเป็น array 

  const addTask = (task) => {  
    setTodos((prevTodos) => [...prevTodos, task]); //เพิ่มงานใหม่ลงใน array ของ todos และคัดลอกงานเก่าๆ มาไว้ด้วย
  };
  return (
    <>
      <NewTask addTask={addTask} />  
      {/*ส่งฟังก์ชัน addTask ไปยังคอมโพเนนต์ NewTask เพื่อให้ NewTask สามารถเพิ่มงานใหม่ได้*/}
      <ul className="bg-gray-200 rounded-md shadow-sm p-4">
        {todos.map((todo, i) => (  //วนลูปผ่าน array ของ todos 
          <TodoItem key={i} id={i} todo={todo} />  //ส่งค่า todo และดัชนี i ไปยังคอมโพเนนต์ TodoItem  
        ))}
      </ul>
    </>
  );
}

export default HomePage;
