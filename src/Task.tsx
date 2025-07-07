import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useTask, useUpdateTask, useDeleteTask } from "./hooks/useTasks";
import { useNavigate } from "react-router-dom";

export default function Task() {
  const [taskName, setTaskName] = useState<string>("");
  const { id } = useParams<{ id: string }>();
  const { data } = useTask(Number(id));
  const updateTask = useUpdateTask();
  const deleteTask = useDeleteTask();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    console.log("submit");
    e.preventDefault();
    if (!taskName.trim() || !id) return;

    updateTask.mutate(
      { id, taskName },
      {
        onSuccess: (data) => {
          setTaskName(data.taskName);
          navigate("/");
        },
      }
    );
  };

  const handleDelete = () => {
    if (!id) return;
    deleteTask.mutate(id, {
      onSuccess: () => {
        navigate("/");
      },
    });
  };

  if (!data) return <div>Loading task...</div>;
  return (
    <div>
      <p>{data?.taskName}</p>
      <form onSubmit={handleSubmit}>
        <label>New Task Name</label>
        <input
          type="text"
          defaultValue={data?.taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
        <button type="submit" disabled={updateTask.isPending}>
          {updateTask.isPending ? "Updating..." : "Update Task"}
        </button>
      </form>
      <button onClick={handleDelete}>Delete</button>
      <button onClick={() => navigate("/")}>Back to Tasks</button>
    </div>
  );
}
