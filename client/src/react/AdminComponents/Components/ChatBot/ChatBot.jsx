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

export default function ChatBot() {
  //useState
  const [activeChat, setActiveChat] = useState(true);
  const [newEmisor, setNewEmisor] = useState(false);
  //Dispath reducer
  const dispatch = useDispatch();
  const receptor = useSelector((state) => state.chatBotReceptor);
  const emisor = useSelector((state) => state.chatBotEmisor);
  //Effect
  useEffect(() => {
    dispatch(AllChatBotReceptor());
    dispatch(AllChatBotEmisor());
  }, [dispatch]);

  const handleDeleteIDReceptor = (id) => {
    dispatch(deleteIdChatBotReceptor(id));
  };
  const handleDeleteIDEmisor = (id) => {
    dispatch(deleteIdChatBotEmisor(id));
  };
  const handleNewEmisor = () => {
    if(newEmisor){
      setNewEmisor(false)
    }else{
      setNewEmisor(true);
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
        <button className={style.btnNew}>New Receptor</button>

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
                      <button className={style.orange}>Edit</button>{" "}
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
                      <button className={style.orange}>Edit</button>{" "}
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
