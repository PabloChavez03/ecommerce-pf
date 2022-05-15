import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  getAllOrders,
  filterOrderByStatus,
  modifiedStatusOrder,
} from "../../../../redux/actions-types/index";
import style from "./AllOrders.module.css";
import SearchBarOrders from "../SearchBarOrders/SearchBarOrders";
import Swal from "sweetalert2";

export default function AllClients() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.userData);

  useEffect(() => {
    dispatch(getAllOrders(token));
  }, [dispatch]);

  const allOrdersClientes = useSelector((state) => state.ordersAll);

  function handleFilterByStatusOrder(e) {
    e.preventDefault();
    if (e.target.value === "todas") {
      dispatch(getAllOrders());
    } else {
      dispatch(filterOrderByStatus(token, e.target.value));
    }
  }

  function handleModifiedStatus(e, payment_id) {
    e.preventDefault();
    Swal.fire({
      title: "¿Seguro desea modificar?",
      text: "Una vez aceptado no se puede revertir los cambios!",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, modificar!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(modifiedStatusOrder(e.target.value, token, payment_id));
        Swal.fire("Confirmado!", "Su orden ha sido modificada.", "success");
      }
    });
    dispatch(getAllOrders());
  }

  return (
    <div className={style.cardContainer}>
      <div className={style.searchFilter}>
      <label>
        Estado :
        <select
          onChange={(e) => {
            handleFilterByStatusOrder(e);
          }}
        >
          <option value="todas">Todas</option>
          <option value="approved">Success</option>
          <option value="pending">Pending</option>
          <option value="failure">Failure</option>
        </select>
      </label>

      <div>
        <SearchBarOrders />
      </div>
      </div>
      <div className={style.container}>
        <h1 className={style.title}>Todas mis ordenes de compra</h1>
        {allOrdersClientes?.map((client) => {
          return (
              <div
              className={style.orders} key={client.payment_id}>
                    <NavLink
              style={{ textDecoration: "none" }}
              to={`/admin/orders/${client.payment_id}`}
             
            >
              <div className={style.ordenFecha}>
                <span>
                  Nº: <b>{client.payment_id}</b>{" "}
                </span>
                <span>{client.orderDate.slice(0, 10)}</span>
              </div>
              <div className={style.ordenFecha}>
                <span>
                  Total: <b>${client.total}</b>
                </span>
                <div>
                  <span>Status: </span>
                  <span
                    className={
                      client.status === "rejected"
                        ? style.rejected
                        : client.status === "pending"
                        ? style.pending
                        : style.approved
                    }
                  >
                    {client.status}
                  </span>{" "}
                </div>
              </div>
</NavLink>
              {client.status === "pending" && (
                <label>
                  Modificar Estado:
                  <select
                    onChange={(e) => {
                      handleModifiedStatus(e, client.payment_id);
                    }}
                  >
                    <option>Seleccionar</option>
                    <option value="approved">Success</option>
                    <option value="failure">Failure</option>
                  </select>
                </label>
              )}
            
              </div>
            
          
          );
        })}
      </div>
    </div>
  );
}
