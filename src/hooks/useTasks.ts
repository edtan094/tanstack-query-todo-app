import {
  useQueryClient,
  useMutation,
  useQuery,
  useSuspenseQuery,
} from "@tanstack/react-query";
import axios from "axios";

const api = axios.create({
  baseURL: "https://686bf2db14219674dcc6b561.mockapi.io/tasks",
  headers: { "Content-Type": "application/json" },
});

export const useTasks = () => {
  return useSuspenseQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const response = await api.get("");
      return response.data;
    },
  });
};

export const useTask = (id: number) => {
  return useSuspenseQuery({
    queryKey: ["task", id],
    queryFn: async () => {
      const response = await api.get(`/${id}`);
      return response.data;
    },
  });
};

export const useAddTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (task: string) => {
      const response = await api.post("", JSON.stringify({ taskName: task }));
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};

export const useUpdateTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (task: { id: string; taskName: string }) => {
      const response = await api.put(`/${task.id}`, JSON.stringify(task));
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["task"] });
    },
  });
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await api.delete(`/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};
