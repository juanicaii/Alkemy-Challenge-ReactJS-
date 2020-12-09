import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import styles from "./table.module.css";
import paginationFactory from "react-bootstrap-table2-paginator";
import config from "../../react.config";
import FunctionHttp from "../../hooks/functionHttp";
import { useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { faMinusCircle, faEdit } from "@fortawesome/free-solid-svg-icons";
import Button from "../button";
import { Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Input from "../input";
import Axios from "axios";
import { useForm } from "react-hook-form";

const Alert = withReactContent(Swal);

export default function Table({ data, query, logged }) {
  const [show, setShow] = useState(false);
  const [edit, setEdit] = useState({});

  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data) => {
    if (edit == null) {
      const exchange = {
        concept: data.concept,
        amount: data.amount,
        type: parseInt(data.type),
        user: logged.user.id,
        category: data.category,
      };
      Axios.post(`${config.URL_HOST}/api/moneyexchange/create`, exchange).then(
        (res) => {
          if (res.data.content != null) {
            setShow(false);
            query(true);
            Alert.fire(
              "Created!",
              "Your item has been created successfuly.",
              "success"
            );
            query(false);
          } else {
            Alert.fire("Oops!", res.data.message, "error");
          }
        }
      );
    } else {
      const exchange = {
        concept: data.concept,
        amount: data.amount,
        type: edit["type.id"],
        user: logged.user.id,
        category: data.category,
      };
      Axios.put(
        `${config.URL_HOST}/api/moneyexchange/edit/${edit.id}`,
        exchange
      ).then((res) => {
        if (res.data.content != null) {
          setShow(false);
          query(true);
          Alert.fire(
            "Edited!",
            "Your item has been edited successfuly.",
            "success"
          );
          query(false);
        } else {
          Alert.fire("Oops!", res.data.message, "error");
        }
      });
    }
  };

  const handleClose = () => {
    setShow(!show);
    setEdit(null);
  };
  const deleteClick = async (id) => {
    if (id != null) {
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
          var deleted = await Axios.delete(
            `${config.URL_HOST}/api/moneyExchange/delete/${id}`
          );

          if (deleted.data.content.delete) {
            query(true);
            Alert.fire("Deleted!", "Your item has been deleted.", "success");
            query(false);
          }
        } else if (results.dismiss === Swal.DismissReason.cancel) {
          Alert.fire("Cancelled", "The item has not been deleted", "error");
        }
      });
    }
  };
  const editClick = async (id) => {
    Axios.get(`${config.URL_HOST}/api/exchange/${id}`).then((res) => {
      setEdit(res.data.content);
      setShow(true);
    });
  };

  const amountFormatter = (cell) => {
    var d = `$${cell}`;
    return d;
  };
  const deleteFormatter = (cell, row) => {
    var d = null;
    if (row) {
      var id = row.id;
      d = (
        <FontAwesomeIcon
          size="lg"
          onClick={() => {
            deleteClick(id);
          }}
          icon={faMinusCircle}
        />
      );
    }

    return d;
  };
  const editFormatter = (cell, row) => {
    var d = null;
    if (row) {
      var id = row.id;
      d = (
        <FontAwesomeIcon
          size="lg"
          onClick={() => {
            editClick(id);
          }}
          icon={faEdit}
        />
      );
    }

    return d;
  };

  var deleteColumn = {
    dataField: "delete",
    text: "",
    formatter: deleteFormatter,
  };
  var editColum = {
    dataField: "edit",
    text: "",
    formatter: editFormatter,
  };

  var columns = [
    {
      dataField: "id",
      text: "ID",
    },
    {
      dataField: "concept",
      text: "Concept",
    },
    {
      dataField: "amount",
      text: "Amount",
      sort: true,
      formatter: amountFormatter,
    },
    {
      dataField: "type.name",
      text: "Type",
    },
    {
      dataField: "category.name",
      text: "Category",
    },
  ];
  if (logged.logged) {
    columns = [...columns, editColum, deleteColumn];
  }
  const paginationOption = {
    sizePerPageList: [
      {
        text: "10",
        value: 10,
      },
    ],
  };

  return (
    <div>
      {logged.logged ? (
        <>
          <div className={styles.add}>
            <Button type="button" submit={handleClose}>
              Add
            </Button>
          </div>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Exchange Add</Modal.Title>
            </Modal.Header>

            <form onSubmit={handleSubmit(onSubmit)}>
              <Modal.Body className={styles.formadd}>
                <Input
                  placeholder="Concept"
                  value={edit ? edit.concept : ""}
                  ref={register({
                    required: {
                      value: true,
                      message: "The concept cannot be empty",
                    },
                  })}
                  name="concept"
                  type="text"
                  error={errors.concept ? true : false}
                  messageError={errors.concept && errors.concept.message}
                />
                <br />
                <Input
                  value={edit ? edit.amount : ""}
                  placeholder="Amount"
                  name="amount"
                  ref={register({
                    required: {
                      value: true,
                      message: "The amount cannot be empty",
                    },
                    valueAsNumber: {
                      value: true,
                      message: "The amount must be numerical ",
                    },
                  })}
                  type="number"
                  error={errors.amount ? true : false}
                  messageError={errors.amount && errors.amount.message}
                />
                <br />
                <Input
                  value={edit ? edit["category.name"] : ""}
                  placeholder="Category"
                  name="category"
                  ref={register({
                    required: {
                      value: true,
                      message: "The category cannot be empty",
                    },
                  })}
                  type="text"
                  error={errors.category ? true : false}
                  messageError={errors.category && errors.category.message}
                />
                <br />
                <div className={styles.select}>
                  <select
                    defaultValue={edit ? edit.type : "-1"}
                    disabled={edit ? true : false}
                    name="type"
                    ref={register}
                  >
                    <option disabled value="-1">
                      Exchange Type
                    </option>
                    <option value="1">Money Income</option>
                    <option value="2">Money Outflow</option>
                  </select>
                  <div className={styles.select_arrow}></div>
                </div>
              </Modal.Body>
              <Modal.Footer className={styles.divAdd}>
                <Button onClick={handleClose}>Save </Button>
              </Modal.Footer>
            </form>
          </Modal>
          <hr />
        </>
      ) : (
        ""
      )}
      <BootstrapTable
        pagination={paginationFactory(paginationOption)}
        bootstrap4
        classes={styles.table}
        keyField="id"
        data={data}
        columns={columns}
        noDataIndication="No Data"
      />
    </div>
  );
}
