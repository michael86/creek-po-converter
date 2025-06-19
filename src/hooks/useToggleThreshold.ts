import { useMutation } from "@tanstack/react-query";
import { putDeliveryThreshold } from "../api/queries/putDeliveryThreshold";

export const useToggleThreshold = () =>
  useMutation({
    mutationFn: ({ uuid, state }: { uuid: string; state: boolean }) =>
      putDeliveryThreshold(uuid, state),
  });
