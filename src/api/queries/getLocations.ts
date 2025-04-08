import { FetchLocations } from "../../types/api";
import api from "../index";
import { useQuery } from "@tanstack/react-query";

export const getLocations = () => {
  const {
    data: locations,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["locations"],
    queryFn: async () => await api.get<FetchLocations>("locations/"),
  });

  if (isLoading) return "loading";
  if (isError || !locations?.data.data.length)
    return "Error selecting locations, are you sure you added some";

  return locations.data.data;
};
