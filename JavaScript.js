// Función auxiliar para convertir saltos de línea (\n) en párrafos (<p>)
function convertirSaltosDeLinea(texto) {
  if (!texto) return "";
  // Dividimos el texto por saltos de línea y creamos un <p> por cada línea
  return texto
    .split("\n")
    .map((linea) => linea.trim()) // Eliminar espacios innecesarios
    .filter((linea) => linea.length > 0) // Ignorar líneas vacías
    .map((linea) => `<p>${linea}</p>`) // Envolver cada línea en un <p>
    .join(""); // Unir los párrafos sin agregar saltos de línea adicionales
}

// Función para leer archivos y convertirlos a base64
function leerArchivo(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

async function generarPortadaeInformacion() {
  const fileInput = document.getElementById("psel");
  const file = fileInput.files[0];

  // Capturar las imágenes de los anexos
  const anexos = {};
  const anexoIds = ["a1", "a2", "a3", "a4", "a5"];
  for (const id of anexoIds) {
    const input = document.getElementById(id);
    if (input.files[0]) {
      anexos[id] = await leerArchivo(input.files[0]);
    }
  }

  const datos = {
    propiedad: document.getElementById("propiedad").value,
    cif: document.getElementById("cif").value,
    direccion: document.getElementById("direccion").value,
    localidad: document.getElementById("localidad").value,
    cp: document.getElementById("cp").value,
    ingeniero: document.getElementById("ingeniero").value,
    colegiado: document.getElementById("colegiado").value,
    colegio: document.getElementById("colegio").value,
    fecha: document.getElementById("fecha").value,
    objeto: document.getElementById("objeto").value,
    dsel: document.getElementById("dsel").value,
    dlp: document.getElementById("dlp").value,
    nds: document.getElementById("nds").value,
    sacv: document.getElementById("sacv").value,
    cta: document.getElementById("cta").value,
    mds: document.getElementById("mds").value,
    dcem: document.getElementById("dcem").value,
    cra: document.getElementById("cra").value,
    dc: document.getElementById("dc").value,
    anexos: anexos, // Almacenar las imágenes de los anexos
  };

  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      datos.plano = e.target.result; // base64 image
      localStorage.setItem("datosProyecto", JSON.stringify(datos));
      window.location.href = "Portada.html";
    };
    reader.readAsDataURL(file);
  } else {
    localStorage.setItem("datosProyecto", JSON.stringify(datos));
    window.location.href = "Portada.html";
  }
}

window.addEventListener("DOMContentLoaded", () => {
  const portadaDiv = document.getElementById("portada");
  const infoDiv = document.getElementById("informacion");
  const datos = JSON.parse(localStorage.getItem("datosProyecto") || "{}");

  if (portadaDiv && infoDiv) {
    portadaDiv.innerHTML = `
      <div class="cabecera">
        <strong>GRUPO SEGURYMAT SIGLO XXI SL</strong><br>
        DGP 4524
      </div>
      <div class="titulo-box">
        <h1>PROYECTO DE DISEÑO Y EJECUCIÓN DE SISTEMA DE SEGURIDAD</h1>
        <div class="gris"></div>
      </div>
      <div class="info-box">
        <h2>PROYECTO</h2>
        <p><strong>PROPIEDAD:</strong> ${datos.propiedad || ""}</p>
        <p><strong>CIF:</strong> ${datos.cif || ""}</p>
        <p><strong>Dirección:</strong> ${datos.direccion || ""}</p>
        <p><strong>Localidad:</strong> ${datos.localidad || ""}</p>
        <p><strong>CP:</strong> ${datos.cp || ""}</p>
        <br />
        <p><strong>INGENIERO TÉCNICO INDUSTRIAL:</strong></p>
        <p>${datos.ingeniero || ""}</p>
        <p>Colegiado Nº ${datos.colegiado || ""}</p>
        <p>${datos.colegio || ""}</p>
      </div>
      <div class="footer">
        ${datos.fecha || ""}
      </div>
    `;

    // Generar las imágenes de los anexos como imágenes, no como texto
    let anexosHTML = "";
    if (datos.anexos) {
      if (datos.anexos.a1) {
        anexosHTML += `<p><strong>ANEXO I: PLANO DE ELEMENTOS DE SEGURIDAD</strong></p>
                       <img src="${datos.anexos.a1}" alt="Anexo I" style="max-width:90%;height:auto;">`;
      }
      if (datos.anexos.a2) {
        anexosHTML += `<p><strong>ANEXO II: CERTIFICADOS DE EQUIPOS</strong></p>
                       <img src="${datos.anexos.a2}" alt="Anexo II" style="max-width:90%;height:auto;">`;
      }
      if (datos.anexos.a3) {
        anexosHTML += `<p><strong>ANEXO III: CERTIFICADO DE CONEXIÓN A C.R.A</strong></p>
                       <img src="${datos.anexos.a3}" alt="Anexo III" style="max-width:90%;height:auto;">`;
      }
      if (datos.anexos.a4) {
        anexosHTML += `<p><strong>ANEXO IV: CERTIFICADOS DE INSTALACIÓN</strong></p>
                       <img src="${datos.anexos.a4}" alt="Anexo IV" style="max-width:90%;height:auto;">`;
      }
      if (datos.anexos.a5) {
        anexosHTML += `<p><strong>ANEXO V: MANUAL DE USUARIO</strong></p>
                       <img src="${datos.anexos.a5}" alt="Anexo V" style="max-width:90%;height:auto;">`;
      }
    }

    // Procesamos cada campo de texto para convertir saltos de línea en párrafos
    infoDiv.innerHTML = `
      <div class="info-box1">
        <p><strong>OBJETO</strong></p>
        ${convertirSaltosDeLinea(datos.objeto)}
        <p><strong>DISEÑO DEL SISTEMA Y ESTUDIO DE EMPLAZAMIENTO DEL LOCAL</strong></p>
        ${convertirSaltosDeLinea(datos.dsel)}
        ${
          datos.plano
            ? `<p><strong><br>PLANO DE SITUACIÓN DEL EMPLAZAMIENTO DEL LOCAL</strong><br><img src="${
                datos.plano
              }" alt="Plano del local" style="max-width:90%;height:auto;"></p>`
            : ""
        }
        <p><strong>DESCRIPCIÓN DEL LUGAR A PROTEGER</strong></p>
        ${convertirSaltosDeLinea(datos.dlp)}
        <p><strong>NIVEL DE SEGURIDAD</strong></p>
        ${convertirSaltosDeLinea(datos.nds)}
        <p><strong>EMPLAZAMIENTO DE EQUIPOS Y PLANIFICACIÓN DE LA INSTALACIÓN</strong></p>
        <p><strong>SISTEMA DE ALARMAS Y CÁMARAS DE VIDEOVIGILANCIA:</strong></p>
        ${convertirSaltosDeLinea(datos.sacv)}
        <p><strong>COMUNICACIÓN Y TRANSMISIÓN DE ALARMAS</strong></p>
        ${convertirSaltosDeLinea(datos.cta)}
        <p><strong>MANTENIMIENTO DEL SISTEMA</strong></p>
        ${convertirSaltosDeLinea(datos.mds)}
        <p><strong>DATOS DE CONTACTO DE LA EMPRESA MANTENEDORA</strong></p>
        ${convertirSaltosDeLinea(datos.dcem)}
        <p><strong>CENTRAL RECEPTORA DE ALARMAS</strong></p>
        ${convertirSaltosDeLinea(datos.cra)}
        <p><strong>DATOS DE CONTACTO DE LA C.R.A</strong></p>
        ${convertirSaltosDeLinea(datos.dc)}
        ${anexosHTML} <!-- Insertamos las imágenes de los anexos aquí -->
      </div>
    `;
  }
});

function descargarPDF() {
  const btn = document.getElementById("btnDescargarPDF");
  btn.style.display = "none";

  setTimeout(() => {
    const elemento = document.body;

    const opt = {
      margin: [0.5, 0.5, 0.7, 0.5], // Aumentamos el margen inferior para dejar espacio al número de página
      filename: "Proyecto.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, scrollY: 0, useCORS: true },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
      pagebreak: { mode: ["avoid-all", "css", "legacy"] },
    };

    // Usamos el evento output para acceder al objeto jsPDF y agregar los números de página
    html2pdf()
      .set(opt)
      .from(elemento)
      .toPdf()
      .get("pdf")
      .then((pdf) => {
        const totalPages = pdf.internal.getNumberOfPages();

        // Iteramos sobre cada página para agregar el número de página
        for (let i = 1; i <= totalPages; i++) {
          pdf.setPage(i);
          pdf.setFontSize(10);
          pdf.setTextColor(100); // Gris oscuro
          const pageWidth = pdf.internal.pageSize.getWidth();
          const pageHeight = pdf.internal.pageSize.getHeight();
          pdf.text(
            `Página ${i} de ${totalPages}`,
            pageWidth / 2, // Centrado horizontalmente
            pageHeight - 0.3, // A 0.3 pulgadas del borde inferior
            { align: "center" }
          );
        }
      })
      .save()
      .then(() => {
        btn.style.display = "inline-block";
      });
  }, 100);
}






