import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import styles from "./table.module.css";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import FunctionHttp from "../../hooks/functionHttp";
import { useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const Alert = withReactContent(Swal);

const DeleteButton = (props) => {
  const handleClick = async () => {
    if (props.selected != null) {
      Alert.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      }).then(async (results) => {
        if (results.isConfirmed) {
          var deleted = await FunctionHttp(
            `http://localhost:8080/api/moneyExchange/delete/${props.selected.id}`,
            "delete"
          );
          if (deleted.delete) {
            props.query("/");
            Alert.fire("Deleted!", "Your item has been deleted.", "success");
          }
        } else if (results.dismiss === Swal.DismissReason.cancel) {
          Alert.fire("Cancelled", "The item has not been deleted", "error");
        }
      });
    }
  };
  return (
    <div style={{ margin: "0 10px" }}>
      <button className="btn btn-danger" onClick={handleClick}>
        Delete
      </button>
    </div>
  );
};
const AddButton = (props) => {
  const handleClick = () => {};
  return (
    <div style={{ margin: "0 10px" }}>
      <button className="btn btn-success" onClick={handleClick}>
        Add
      </button>
    </div>
  );
};
export default function Table({ data, query }) {
  var dataTable = data;
  const [selected, setSelected] = useState(null);
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
    paginationSize: 10,
    sizePerPageList: [
      {
        text: "10",
        value: 10,
      },
    ],

    pageStartIndex: 0,
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
    onSelect: (row, isSelect, rowIndex, e) => {
      setSelected(row);
    },
  };
  return (
    <ToolkitProvider keyField="id" data={dataTable} columns={columns}>
      {(props) => (
        <div>
          <div className={styles.buttonDiv}>
            <DeleteButton query={query} selected={selected} />
            <AddButton query={query} selected={selected} />
          </div>
          <hr />
          <BootstrapTable
            selectRow={selectRow}
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
