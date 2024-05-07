import { useState } from "react";
import { Button, Typography } from "@mui/material";
import { useAppSelector } from "../hooks";
import AddIcon from "@mui/icons-material/Add";
import EditPoRow from "./EditPoRow";

const EditPoTable = () => {
  const { order } = useAppSelector((state) => state.purchase);
  const [newRows, setNewRows] = useState<
    { name: string; description: string; totalOrdered: string }[]
  >([]);

  const handleAddRow = () => {
    const newRow = { name: "", description: "", totalOrdered: "" };
    setNewRows([...newRows, newRow]);
  };

  const renderNewRow = () => {
    if (newRows.length === 0) return null;

    //Use index to call back what row to save to database
    console.log("new rows render ", newRows);
    return newRows.map((row, index) => {
      return (
        <EditPoRow
          key={`new-row-${index}`}
          name={row.name}
          description={row.description}
          quantity={+row.totalOrdered}
          onNewRowDelete={() => {
            const copy = structuredClone(newRows);
            setNewRows(copy);
          }}
        />
      );
    });
  };

  return (
    <>
      {order ? (
        <>
          <table className="edit-po-table">
            <thead>
              <tr>
                <th scope="col">
                  <Typography variant="subtitle2">Part Number</Typography>
                </th>
                <th>
                  <Typography variant="subtitle2">Description</Typography>
                </th>
                <th>
                  <Typography variant="subtitle2">Count</Typography>
                </th>
                <th>
                  <Typography variant="subtitle2">Date Due</Typography>
                </th>

                <th>
                  <Typography variant="subtitle2">Last Edited</Typography>
                </th>
                <th>
                  <Typography variant="subtitle2">Actions</Typography>
                </th>
              </tr>
            </thead>

            <tbody>
              {order.partNumbers.map((part, index) => {
                const { name, description, totalOrdered, lastEdited, dateDue } = part;
                return (
                  <EditPoRow
                    key={`${part}-${index}`}
                    name={name}
                    description={description}
                    quantity={totalOrdered}
                    lastEdited={lastEdited}
                    dateDue={dateDue}
                    lineId={part.lineId}
                  />
                );
              })}

              {/* Render new row */}
              {renderNewRow()}
            </tbody>
          </table>

          <div className="add-new-item-container">
            <Button variant="contained" endIcon={<AddIcon />} onClick={handleAddRow}>
              Add new Item
            </Button>
          </div>
        </>
      ) : null}
    </>
  );
};

export default EditPoTable;
