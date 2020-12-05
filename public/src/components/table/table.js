import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import styles from "./table.module.css";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider from "react-bootstrap-table2-toolkit";

const DeleteButton = (props) => {
  const handleClick = () => {
    console.log(1);
  };
  return (
    <div>
      <button className="btn btn-danger" onClick={handleClick}>
        Eliminar
      </button>
    </div>
  );
};
export default function Table({ data }) {
  var dataTable = data;

  const columns = [
    {
      dataField: "id",
      text: "ID",
      headerStyle: {
        width: 50,
        textAlign: "center",
      },
    },
    {
      dataField: "concept",
      text: "Concept",
      border: "3px solid grey",
      headerStyle: {
        textAlign: "center",
      },
    },
    {
      dataField: "amount",
      text: "Mount",
      headerStyle: {
        textAlign: "center",
      },
    },
    {
      dataField: "type.name",
      text: "Type",
    },
    {
      dataField: "category.name",
      text: "Category",
      headerStyle: {
        textAlign: "center",
      },
    },
  ];
  const options = {
    onSizePerPageChange: (sizePerPage, page) => {
      console.log("Size per page change!!!");
      console.log("Newest size per page:" + sizePerPage);
      console.log("Newest page:" + page);
    },
    onPageChange: (page, sizePerPage) => {
      console.log("Page change!!!");
      console.log("Newest size per page:" + sizePerPage);
      console.log("Newest page:" + page);
    },
  };
  const selectRow = {
    mode: "radio",
    clickToSelect: true,
  };
  return (
    <ToolkitProvider
      selectRow={selectRow}
      keyField="id"
      data={dataTable}
      columns={columns}
      exportCSV
    >
      {(props) => (
        <div>
          <DeleteButton {...props.csvProps} />
          <hr />
          <BootstrapTable
            classes={styles.table}
            striped
            hover
            condensed
            pagination={paginationFactory(options)}
            noDataIndication="Table is Empty"
            {...props.baseProps}
          />
        </div>
      )}
    </ToolkitProvider>
    // <BootstrapTable

    // />
  );
}
