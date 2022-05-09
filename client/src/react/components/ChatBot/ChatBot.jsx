import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getChatBot } from "../../../redux/actions-types";
import styles from "./ChatBot.module.css";

export default function ChatBot() {
  const [activeBtn, setActiveBtn] = useState(false);
  const dataChatBot = useSelector((state) => state.chatbot);

  ///Dispatch reducer
  const dispatch = useDispatch();
  const handleactive = () => {
    if (activeBtn) {
      setActiveBtn(false);
    } else {
      setActiveBtn(true);
      dispatch(getChatBot());
    }
  };
  const handleoption = (item) => {
    // console.log(item);
    dispatch(getChatBot(item));
  };
  return (
    <div>
      {activeBtn ? (
        <div className={styles.ChatBotContainer}>
          <div className={styles.ChatBotTitle}>
            <p>Chat Bot</p>
          </div>
          <div className={styles.ChatContainer}>
            <p>{dataChatBot.respuesta}</p>
            <br />
            {dataChatBot.alternativa
              ? dataChatBot.alternativa.map((item) => (
                  <p
                    key={item}
                    className={styles.alterChat}
                    onClick={() => handleoption(item)}
                  >
                    {item}
                  </p>
                ))
              : null}
          </div>
        </div>
      ) : null}
      <div className={styles.botton} onClick={() => handleactive()}>
        {!activeBtn ? <p>CB</p> : <p className={styles.p}>X</p>}
      </div>
    </div>
  );
}
