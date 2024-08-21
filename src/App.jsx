import './App.css';
import { useTodo } from './store/todo';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

function App() {
  const { handleSubmit, register, reset } = useForm();
  const { data, addTodo, deleteTodo, editTodo } = useTodo((state) => state);

  const submit = (formData) => {
    addTodo({
      id: Date.now(),
      name: formData.name,
      description: formData.description
    });
    reset();
  };

  const startEdit = (item) => {
    const newName = prompt("Edit Name", item.name);
    const newDescription = prompt("Edit Description", item.description);
    editTodo(item.id, {
      name: newName,
      description: newDescription
    });
  };

  return (
    <div className='flex items-center justify-center w-[100%] h-[100vh] flex-col bg-[url("https://i.pinimg.com/736x/f9/2e/55/f92e55b3caaa5a031e5a8456845659fb.jpg")] bg-no-repeat bg-cover '>
      <form className='flex flex-col w-[500px] h-[400px] shadow-lg rounded-xl shadow-gray-400 border-2 bg-white border-gray-200 items-center justify-center gap-7' onSubmit={handleSubmit(submit)}>
      <h1 className='mb-12 text-3xl font-bold text-blue-400'>Zustand Todo</h1>
        <input className='w-[320px] h-[50px] border-2 border-blue-300 rounded-full px-3 outline-2 outline-gray-400 shadow-lg shadow-blue-100 hover:shadow-md'   {...register("name")} type="text" placeholder="Name" required />
        <input className='w-[320px] h-[50px] border-2 border-blue-300 rounded-full px-3 outline-2 outline-gray-400 shadow-lg shadow-blue-100 hover:shadow-md'  {...register("description")} type="text" placeholder="Description" required />
        <button className='w-[320px] h-[50px] bg-blue-500 text-white font-medium text-lg rounded-full shadow-lg hover:bg-transparent hover:text-blue-500 hover:border-2 hover:border-blue-500 shadow-blue-100 hover:shadow-md'  type="submit">Send</button>
      </form>

      {data.map((item) => (
        <div className='w-[500px] bg-white h-[200px] shadow-xl shadow-gray-400 rounded-xl mt-10 border-2 border-gray-300 flex  flex-col items-center justify-center' key={item.id} >
          <h1 className='font-medium text-xl '>{item.name}</h1>
          <p>{item.description}</p>
         <div className='mt-5'>
          <button className='w-[130px] h-[50px] bg-green-400 rounded-lg text-white font-medium hover:bg-transparent hover:border-2 hover:border-green-500 hover:text-green-500' onClick={() => startEdit(item)}>Edit</button>
          <button className='w-[130px] h-[50px] bg-red-400 rounded-lg text-white font-medium hover:bg-transparent hover:border-2 ml-5 hover:border-red-500 hover:text-red-500' onClick={() => deleteTodo(item.name)}>Delete</button>
         </div>
        </div>
      ))}
    </div>
  );
}

export default App;
