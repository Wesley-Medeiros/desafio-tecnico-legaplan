import { TaskProvider } from "@/context/task-context";
import { Header } from "../header";
import { Tasks } from "../tasks";

export default function Home() {
  return (
    <>
      <Header />
      <TaskProvider>
            <Tasks />
        </TaskProvider>
    </>
  );
}
