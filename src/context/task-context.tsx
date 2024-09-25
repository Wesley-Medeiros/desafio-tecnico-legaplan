'use client';  

import { createContext, useContext, useState, ReactNode, ChangeEvent, FormEvent } from "react";

interface ITask {
    id: string;
    title: string;
    isCompleted: boolean;
}

interface TaskContextType {
    tasks: ITask[];
    addTask: (title: string) => void;
    removeTask: () => void;
    taskToRemove: string | null;
    setTaskToRemove: (taskId: string | null) => void;
    toggleTaskCompletion: (taskId: string) => void;
    isModalOpen: boolean;
    openModal: () => void;
    closeModal: () => void;
    isConfirmModalOpen: boolean;
    openConfirmModal: (taskId: string) => void;
    closeConfirmModal: () => void;
    handleSubmit: (event: FormEvent) => void;
    title: string;
    setTitle: (title: string) => void;
    onChangeTitle: (event: ChangeEvent<HTMLInputElement>) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider = ({ children }: { children: ReactNode }) => {
    const [tasks, setTasks] = useState<ITask[]>([]);
    const [title, setTitle] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [taskToRemove, setTaskToRemove] = useState<string | null>(null);

    function addTask(taskTitle: string) {
        setTasks([
            ...tasks,
            {
                id: crypto.randomUUID(),
                title: taskTitle,
                isCompleted: false
            }
        ]);
    }

    function handleSubmit(event: FormEvent) {
        event.preventDefault();
        addTask(title);
        setTitle("");
        closeModal();
    }

    function onChangeTitle(event: ChangeEvent<HTMLInputElement>) {
        setTitle(event.target.value);
    }

    function toggleTaskCompletion(taskId: string) {
        setTasks(tasks.map(task =>
            task.id === taskId ? { ...task, isCompleted: !task.isCompleted } : task
        ));
    }

    function openModal() {
        setIsModalOpen(true);
    }

    function closeModal() {
        setIsModalOpen(false);
    }

    function openConfirmModal(taskId: string) {
        setTaskToRemove(taskId);
        setIsConfirmModalOpen(true);
    }

    function closeConfirmModal() {
        setTaskToRemove(null);
        setIsConfirmModalOpen(false);
    }

    function removeTask() {
        if (taskToRemove) {
            setTasks(tasks.filter(task => task.id !== taskToRemove));
            closeConfirmModal();
        }
    }

    return (
        <TaskContext.Provider
            value={{
                tasks,
                addTask,
                removeTask,
                taskToRemove,
                setTaskToRemove,
                toggleTaskCompletion,
                isModalOpen,
                openModal,
                closeModal,
                isConfirmModalOpen,
                openConfirmModal,
                closeConfirmModal,
                handleSubmit,
                title,
                setTitle,
                onChangeTitle
            }}
        >
            {children}
        </TaskContext.Provider>
    );
};

export const useTaskContext = () => {
    const context = useContext(TaskContext);
    if (!context) {
        throw new Error("useTaskContext must be used within a TaskProvider");
    }
    return context;
};
