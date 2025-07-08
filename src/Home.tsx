import React, { useState } from "react";
import { useAddTask, useTasks } from "./hooks/useTasks";
import { Link } from "react-router-dom";

export default function Home() {
  const [taskName, setTaskName] = useState<string>("");
  const { data, status } = useTasks();
  const addTask = useAddTask();

  return (
    <>
      <p>Tasks</p>
      <div>
        {data?.map((task: any) => (
          <div key={task.id}>
            <h3>
              <Link to={`/tasks/${task.id}`}>{task.taskName}</Link>
            </h3>
          </div>
        ))}
      </div>
      <input value={taskName} onChange={(e) => setTaskName(e.target.value)} />
      <button onClick={() => addTask.mutate(taskName as string)}>
        Add Task
      </button>
    </>
  );
}
