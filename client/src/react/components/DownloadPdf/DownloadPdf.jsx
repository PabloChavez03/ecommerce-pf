import React from "react";
import jsPDF from "jspdf";
import NavBar from "../NavBar/NavBar";

export default function DownloadPdf() {
  const print = () => {
    const pdf = new jsPDF();
    pdf.text(20, 20, "Prueba PDF");
    pdf.save("pdf");
  };
  return (
    <div>
      <NavBar />
      <h2>Prueba Mica Download PDF</h2>
      <button onClick={(e) => print(e)}>Download</button>
    </div>
  );
}
