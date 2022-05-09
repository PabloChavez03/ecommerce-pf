import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./ChatBot.module.css";
import {
  AllChatBotEmisor,
  AllChatBotReceptor,
  deleteIdChatBotReceptor,
  deleteIdChatBotEmisor,
} from "../../../../redux/actions-types";
import NewEmisor from "./components/Emisor/NewEmisor";
import NewReceptor from "./components/Receptor/NewReceptor";
import PutEmisor from "./components/Emisor/PutEmisorId";
import PutReceptor from "./components/Receptor/PutReceptor";

export default function ChatBot() {
  //useState
  const [newEmisor, setNewEmisor] = useState(false);
  const [newReceptor, setNewReceptor] = useState(false);
  const [putReceptor, setPutReceptor] = useState(false);
  const [putReceptorConteiner, setPutReceptorConteiner] = useState({});
  const [putEmisor, setPutEmisor] = useState(false);
  const [putEmisorConteiner, setPutEmisorConteiner] = useState({});
  //Dispath reducer
  const dispatch = useDispatch();
  const receptor = useSelector((state) => state.chatBotReceptor);
  const emisor = useSelector((state) => state.chatBotEmisor);
  //Effect
  useEffect(() => {
    dispatch(AllChatBotReceptor());
    dispatch(AllChatBotEmisor());
  }, [dispatch]);
  const handleEditReceptor = (data) => {
    if (putReceptor) {
      setPutReceptor(false);
    } else {
      setPutReceptor(true);
      setPutReceptorConteiner({
        id: data.id,
        name: data.name,
        isActive: data.isActive,
      });
    }
  };
  const handleEditEmisor = (data) => {
    if (putEmisor) {
      setPutEmisor(false);
    } else {
      setPutEmisor(true);
      setPutEmisorConteiner({
        id: data.id,
        name: data.name,
        respuestadata: data.respuesta,
        isActive: data.isActive,
        alternativa: data.alternativa,
      });
    }
  };

  const handleDeleteIDReceptor = (id) => {
    dispatch(deleteIdChatBotReceptor(id));
  };
  const handleDeleteIDEmisor = (id) => {
    dispatch(deleteIdChatBotEmisor(id));
  };
  const handleNewEmisor = () => {
    if (newEmisor) {
      setNewEmisor(false);
    } else {
      setNewEmisor(true);
    }
  };
  const handleNewReceptor = () => {
    if (newReceptor) {
      setNewReceptor(false);
    } else {
      setNewReceptor(true);
    }
  };
  return (
    <div>
      <nav className={style.navChat}>
        <h1>Chat bot</h1>
        <div className={style.btnChat}>
          <button>Emisor</button>
          <button>Receptor</button>
        </div>
      </nav>
      {/**----------------------------------------------------------------------------- */}
      <div>
        <button className={style.btnNew} onClick={() => handleNewReceptor()}>
          New Receptor
        </button>
        {newReceptor ? (
          <NewReceptor handleNewReceptor={handleNewReceptor} />
        ) : null}
        {putReceptor ? (
          <PutReceptor
            handleEdit={handleEditReceptor}
            id={putReceptorConteiner.id}
            name={putReceptorConteiner.name}
            isActive={putReceptorConteiner.isActive}
          />
        ) : null}
        <table className={style.table}>
          <thead>
            <tr>
              <th colSpan={6}>
                <h3>Chat Bot Receptor</h3>
              </th>
            </tr>
            <tr>
              <th className={style.idTabla}>Id</th>
              <th>Name</th>
              <th className={style.isActiveTable}>IsActive</th>
              <th className={style.optionBtn}>Option</th>
            </tr>
          </thead>
          <tbody>
            {receptor.length === 0
              ? null
              : receptor.map((item, num) => (
                  <tr
                    className={num % 2 !== 0 ? style.fondoGres : null}
                    key={item.id}
                  >
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.isActive ? "Activo" : "Desactivado"}</td>
                    <td className={style.optionBtn}>
                      <button
                        className={style.orange}
                        onClick={() => handleEditReceptor(item)}
                      >
                        Edit
                      </button>{" "}
                      <button
                        className={style.red}
                        onClick={() => handleDeleteIDReceptor(item.id)}
                      >
                        Clean
                      </button>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
      {/**----------------------------------------------------------------------------- */}
      <div>
        <button className={style.btnNew} onClick={() => handleNewEmisor()}>
          New Emisor
        </button>
        {newEmisor ? <NewEmisor handleNewEmisor={handleNewEmisor} /> : null}
        {putEmisor ? (
          <PutEmisor
            handleEdit={handleEditEmisor}
            id={putEmisorConteiner.id}
            name={putEmisorConteiner.name}
            respuestadata={putEmisorConteiner.respuestadata}
            isActive={putEmisorConteiner.isActive}
            alternativa={putEmisorConteiner.alternativa}
          />
        ) : null}
        <table className={style.table}>
          <thead>
            <tr>
              <th colSpan={6}>
                <h3>Chat Bot Emisor</h3>
              </th>
            </tr>
            <tr>
              <th className={style.idTabla}>Id</th>
              <th className={style.name}>Name</th>
              <th>Respuesta</th>
              <th className={style.name}>Alternativas</th>
              <th className={style.isActiveTable}>IsActive</th>
              <th className={style.optionBtn}>Option</th>
            </tr>
          </thead>
          <tbody>
            {emisor.length === 0
              ? null
              : emisor.map((item, num) => (
                  <tr
                    className={num % 2 !== 0 ? style.fondoGres : null}
                    key={item.id}
                  >
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.respuesta}</td>
                    <td>
                      {item.alternativa.length === 0
                        ? "Null"
                        : item.alternativa.map((index, ls) => (
                            <p key={ls}>{index}</p>
                          ))}
                    </td>
                    <td>{item.isActive ? "Activo" : "Desactivado"}</td>
                    <td className={style.optionBtn}>
                      <button
                        className={style.orange}
                        onClick={() => handleEditEmisor(item)}
                      >
                        Edit
                      </button>{" "}
                      <button
                        className={style.red}
                        onClick={() => handleDeleteIDEmisor(item.id)}
                      >
                        Clean
                      </button>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
