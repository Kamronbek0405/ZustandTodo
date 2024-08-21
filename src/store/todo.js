import { create } from "zustand";

export const useTodo = create((set) => ({
    data: [],
    addTodo: (newData) => set((state) => ({
        ...state,
        data: [...state.data, newData]
    })),
    deleteTodo: (name) => set((state) => {
        const newData = state.data.filter((item) => item.name !== name);
        return { ...state, data: newData };
    }),
    editTodo: (id, updatedData) => set((state) => ({
        data: state.data.map((item) =>
            item.id === id ? { ...item, ...updatedData } : item
        )
    }))
}));
