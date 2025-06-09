import { DataGrid, GridColDef } from "@mui/x-data-grid";

import { useEffect, useState } from "react";
import axios from "../utils/interceptors";
import { useAppDispatch } from "../hooks";
import { setToast } from "../slices/alert";
import { getDate } from "../utils";

const columns: GridColDef[] = [
  { field: "user", headerName: "User Email", width: 550 },
  { field: "log", headerName: "Action Made", width: 550 },
  {
    field: "date",
    headerName: "Date/Time",
    width: 250,
  },
];

type Log = { user: string; log: string; dateCreated: number };

const Logs = () => {
  const dispatch = useAppDispatch();
  const [logs, setLogs] = useState<Log[] | null>(null);

  useEffect(() => {
    const fetchLogs = async () => {
      const res = await axios.get("/logs");
      if (res.status !== 200) {
        dispatch(
          setToast({ type: "error", show: true, message: "Failed to fetch logs, contact michael" })
        );
        return;
      }

      const logs: Log[] = res.data.logs.map((entry: Log, i: number) => {
        return { id: i, user: entry.user, log: entry.log, date: getDate(entry.dateCreated) };
      });

      setLogs(logs);
    };

    fetchLogs();
  }, [dispatch]);

  return (
    <>
      <h2>Logs</h2>
      {logs && (
        <div style={{ height: 800, width: "90%", margin: "auto" }}>
          <DataGrid
            rows={logs}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10, 20, 50]}
            checkboxSelection
          />
        </div>
      )}
    </>
  );
};

export default Logs;
