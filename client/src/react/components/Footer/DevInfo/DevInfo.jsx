import React from "react";
import NavBar from "../../NavBar/NavBar";
import github from "../images/github.png";
import linkedin from "../images/logotipo-de-linkedin.png";
import style from "../DevInfo/DevInfo.module.css";
import Swal from 'sweetalert2'



export default function DevInfo() {
  const handleClickImg = (e) => {
    e.preventDefault();
    Swal.fire(
      'Perfil en desarrollo!',
      '',
      'success'
    )
  };
  return (
    <div className={style.container}>
      <NavBar />
      <h2>Desarrolladores que trabajaron en el proyecto</h2>
    <div className={style.sectionContainer}>
      <div className={style.section}>
        <h2>Frontend</h2>
        <div className={style.item}>
          <h3>David Machuca</h3>
          <div>
          <a
            href="https://www.linkedin.com/in/davidmachucadev/"
            target="_blank"
            rel="noreferrer"
          >
            <img src={linkedin} alt="Github" className={style.imageIcon}/>
          </a>
          <a
            href="https://github.com/davidbmr"
            target="_blank"
            rel="noreferrer"
          >
            <img src={github} alt="Linkedin" className={style.imageIcon}/>
          </a>
          </div>
        </div>
        <div className={style.item}>
          <h3>Ramiro Casanova</h3>
          <div>
          <a
            href="https://www.linkedin.com/in/ramiro-casanova-63457420a/"
            target="_blank"
            rel="noreferrer"
          >
            <img src={linkedin} alt="Github" className={style.imageIcon}/>
          </a>
          <a
            href="https://github.com/CasanovaRamiro"
            target="_blank"
            rel="noreferrer"
          >
            <img src={github} alt="Linkedin" className={style.imageIcon} />
          </a>
          </div>
        </div>
        <div className={style.item}>
          <h3>Micaela Medina</h3>
          <div>
          <a
            href="https://www.linkedin.com/in/micaela-medina-1b3979190/"
            target="_blank"
            rel="noreferrer"
          >
            <img src={linkedin} alt="Github" className={style.imageIcon}/>
          </a>
          <a
            href="https://github.com/micaelamedina"
            target="_blank"
            rel="noreferrer"
          >
            <img src={github} alt="Linkedin" className={style.imageIcon} />
          </a>
          </div>
        </div>
      </div>
      <div className={style.section}>
        <h2>Backend</h2>
        <div className={style.item}>
          <h3>Kenneth Mazuelos</h3>
          <div>
          <a
            href="https://www.linkedin.com/in/julio-kenneth-andersson-mazuelos-vargas-kenzhul/"
            target="_blank"
            rel="noreferrer"
          >
            <img src={linkedin} alt="Github" className={style.imageIcon} />
          </a>
          <a
            href="https://github.com/jkamvs"
            target="_blank"
            rel="noreferrer"
          >
            <img src={github} alt="Linkedin" className={style.imageIcon} />
          </a>
          </div>  
        </div>
        <div className={style.item}>
          <h3>Brayan Cerón</h3>
          <div>
          <a
            href=" "
          >
            <img src={linkedin} alt="Github" className={style.imageIcon} onClick={(e) => handleClickImg(e)}/>
          </a>
          <a
            href="https://github.com/bra-i-am"
            target="_blank"
            rel="noreferrer"
          >
            <img src={github} alt="Linkedin" className={style.imageIcon} />
          </a> 
            </div>
          
        </div>
        <div className={style.item}>
          <h3>Pablo Chávez</h3>
          <div>
          <a
            href="https://www.linkedin.com/in/pablo-oscar-chavez/"
            target="_blank"
            rel="noreferrer"
          >
            <img src={linkedin} alt="Github" className={style.imageIcon}/>
          </a>
          <a
            href="https://github.com/PabloChavez03"
            target="_blank"
            rel="noreferrer"
          >
            <img src={github} alt="Linkedin" className={style.imageIcon} />
          </a>
          </div>
        </div>
        <div className={style.item}>
          <h3>Matias Antunez</h3>
          <div>
          <a
            href="https://www.linkedin.com/in/matias-sebastian-antunez-98b0a2166"
            target="_blank"
            rel="noreferrer"
          >
            <img src={linkedin} alt="Github" className={style.imageIcon}/>
          </a>
          <a
            href="https://github.com/MatyAntunez"
            target="_blank"
            rel="noreferrer"
          >
            <img src={github} alt="Linkedin" className={style.imageIcon} />
          </a>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
