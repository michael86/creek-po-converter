import { UpdateGenericResponse } from "../../types/api";
import api from "../index";
import { useMutation } from "@tanstack/react-query";

export const useUpdateUserRole = () =>
  useMutation({
    mutationKey: ["updateUserRole"],
    mutationFn: async ({ id, role }: { id: number; role: number }) => {
      const response = await api.put(`manage/users/update-role/${id}`, { role });
      return response.data as UpdateGenericResponse;
    },
  });
