// Función auxiliar para convertir saltos de línea (\n) en párrafos (<p>)
function convertirSaltosDeLinea(texto) {
  if (!texto) return "";
  return texto
    .split("\n")
    .map((linea) => linea.trim())
    .filter((linea) => linea.length > 0)
    .map((linea) => `<p>${linea}</p>`)
    .join("");
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

// Función para capturar datos y redirigir a Portada.html guardando en localStorage
async function generarPortadaeInformacion() {
  const fileInput = document.getElementById("psel");
  const file = fileInput.files[0];

  // Captura imágenes de anexos
  const anexos = {};
  const anexoIds = ["a1", "a2", "a3", "a4", "a5"];
  for (const id of anexoIds) {
    const input = document.getElementById(id);
    if (input && input.files[0]) {
      anexos[id] = await leerArchivo(input.files[0]);
    }
  }

  // Captura tablas como HTML
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
    mds1: document.getElementById("mds1").value,
    dcem: document.getElementById("dcem") ? document.getElementById("dcem").value : "",
    cra: document.getElementById("cra").value,
    dc: document.getElementById("dc").value,
    tablaMantenimiento: document.getElementById("tabla-mantenimiento")?.outerHTML || "",
    tablaDcem: document.getElementById("tabla-dcem")?.outerHTML || "",
    tablaDc: document.getElementById("tabla-dc")?.outerHTML || "",
    tablaFalsasAlarmas: document.getElementById("tabla-falsas-alarmas")?.outerHTML || "",
    anexos: anexos
  };

  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      datos.plano = e.target.result;
      localStorage.setItem("datosProyecto", JSON.stringify(datos));
      window.location.href = "Portada.html";
    };
    reader.readAsDataURL(file);
  } else {
    localStorage.setItem("datosProyecto", JSON.stringify(datos));
    window.location.href = "Portada.html";
  }
}

// Código que se ejecuta al cargar Portada.html para mostrar los datos
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
        <div class="gris"></div>
        <br>
        <p><strong>INGENIERO TÉCNICO INDUSTRIAL:</strong></p>
        <p>${datos.ingeniero || ""}</p>
        <p>Colegiado Nº ${datos.colegiado || ""}</p>
        <p>${datos.colegio || ""}</p>
        <div class="gris"></div>
      </div>
      <div class="footer">
        ${datos.fecha || ""}
      </div>
      
    `;

    // Construcción de HTML para anexos
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

    infoDiv.innerHTML = `
      <div class="info-box1">
        <p><strong>OBJETO</strong></p>
        ${convertirSaltosDeLinea(datos.objeto)}
        <p><strong>DISEÑO DEL SISTEMA Y ESTUDIO DE EMPLAZAMIENTO DEL LOCAL</strong></p>
        ${convertirSaltosDeLinea(datos.dsel)}
        ${
          datos.plano
            ? `<p><strong><br>PLANO DE SITUACIÓN DEL EMPLAZAMIENTO DEL LOCAL</strong><br><img src="${datos.plano}" alt="Plano del local" style="max-width:90%;height:auto;"></p>`
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
        ${convertirSaltosDeLinea(datos.mds1)}
        ${datos.tablaMantenimiento || ""}
        <p><strong>DATOS DE CONTACTO DE LA EMPRESA MANTENEDORA</strong></p>
        ${datos.tablaDcem || ""}
        <p><strong>CENTRAL RECEPTORA DE ALARMAS</strong></p>
        ${convertirSaltosDeLinea(datos.cra)}
        <p><strong>DATOS DE CONTACTO DE LA C.R.A</strong></p>
        ${datos.tablaDc || ""}
        ${convertirSaltosDeLinea(datos.dc)}
        ${datos.tablaFalsasAlarmas || ""}
        ${anexosHTML}
      </div>
    `;

    // Añadir sangría a párrafos que empiezan por mayúscula
    infoDiv.querySelectorAll("p").forEach(p => {
      if (/^[A-ZÁÉÍÓÚÑ]/.test(p.textContent.trim())) {
        p.classList.add("tabulado");
      }
    });
  }
});

// Función para descargar el contenido como PDF con numeración de páginas
function descargarPDF() {
  const btn = document.getElementById("btnDescargarPDF");
  btn.style.display = "none";

  // Logo en base64 o URL
  const logoMarcaAgua = "data:image/png;base64,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";

  setTimeout(() => {
    const elemento = document.body;

    const opt = {
      margin: [0.5, 0.5, 0.7, 0.5],
      filename: "Proyecto.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, scrollY: 0, useCORS: true },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
      pagebreak: { mode: ["avoid-all", "css", "legacy"] },
    };

    html2pdf()
      .set(opt)
      .from(elemento)
      .toPdf()
      .get("pdf")
      .then((pdf) => {
        const totalPages = pdf.internal.getNumberOfPages();
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();

        // Tamaño del logo para la marca de agua
        const logoWidth = 4.0;  // pulgadas (ajustado para que sea más grande como marca de agua)
        const logoHeight = 2.0; // pulgadas (manteniendo proporción)
        const posX = (pageWidth - logoWidth) / 2; // Centrado horizontalmente
        const posY = (pageHeight - logoHeight) / 2; // Centrado verticalmente

        for (let i = 1; i <= totalPages; i++) {
          pdf.setPage(i);

          // Número de página centrado abajo
          pdf.setFontSize(10);
          pdf.setTextColor(100);
          pdf.text(`Página ${i} de ${totalPages}`, pageWidth / 2, pdf.internal.pageSize.getHeight() - 0.3, { align: "center" });

          // Logo como marca de agua desde página 2 en adelante
          if (i !== 1) {
            pdf.setGState(new pdf.GState({ opacity: 0.1 })); // Establecer opacidad baja para marca de agua
            pdf.addImage(logoMarcaAgua, "PNG", posX, posY, logoWidth, logoHeight, undefined, 'LOW');
            pdf.setGState(new pdf.GState({ opacity: 1.0 })); // Restaurar opacidad normal
          }
        }
      })
      .save()
      .then(() => {
        btn.style.display = "inline-block";
      });
  }, 100);
}








