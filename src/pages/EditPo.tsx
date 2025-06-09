import EditPoTable from "../components/EditPoTable";
import PoSelect from "../components/PoSelect";
import "../styles/edit_po.css";
const EditPo = () => {
  return (
    <>
      <h2>Edit Po</h2>
      <PoSelect />
      <EditPoTable />
    </>
  );
};

export default EditPo;
