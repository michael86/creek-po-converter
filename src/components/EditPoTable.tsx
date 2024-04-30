import { Button, Input, Typography } from "@mui/material";
import { useAppSelector } from "../hooks";
import { getDate } from "../utils";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import AddIcon from "@mui/icons-material/Add";

const EditPoTable = () => {
  const { order } = useAppSelector((state) => state.purchase);

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
                  <Typography variant="subtitle2">Date Uploaded</Typography>
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
              {Object.keys(order.partNumbers).map((part, index) => {
                return (
                  <tr key={`${part}-${index}`}>
                    <td>
                      <Typography variant="subtitle2">{order.partNumbers[part].name}</Typography>
                    </td>

                    <td>
                      <Input type="text" value={order.partNumbers[part].description} />
                    </td>
                    <td>
                      <Input type="text" value={order.partNumbers[part].totalOrdered} />
                    </td>

                    <td>
                      <Typography variant="subtitle2">{getDate(order.dateCreated)}</Typography>
                    </td>
                    <td>
                      <Typography variant="subtitle2">
                        {order.partNumbers[part].lastEdited
                          ? getDate(order.partNumbers[part].lastEdited)
                          : "Not edited before"}
                      </Typography>
                    </td>
                    <td>
                      <Button variant="contained" endIcon={<SaveIcon />}>
                        save
                      </Button>
                      <Button variant="contained" endIcon={<DeleteIcon />}>
                        delete
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="add-new-item-container">
            <Button variant="contained" endIcon={<AddIcon />}>
              Add new Icon
            </Button>
          </div>
        </>
      ) : null}
    </>
  );
};

export default EditPoTable;
