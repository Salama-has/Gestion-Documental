//////////////////////////////////Base DE DATOS///////////////////////////////////////////////////

//declarar la variable documeendo para mostrar el fichero indicado
const bDocumento = document.getElementById("bDocumento");
bDocumento.addEventListener("click", abrirDocumento, false);

async function solicitarRegistro(datosRequeridos) {
  var ajaxrequest = new XMLHttpRequest();

  ajaxrequest.open(
    "POST",
    "https://www.informaticasc.com/curso22_23/salamaDM/DOCS/phpTodo/consultarRegistro.php",
    true
  );
  ajaxrequest.setRequestHeader(
    "Content-type",
    "application/x-www-form-urlencoded"
  );
  ajaxrequest.onreadystatechange = async function () {
    //alert(ajaxrequest.readyState + "--" + ajaxrequest.status);
    if (ajaxrequest.readyState === 4 && ajaxrequest.status === 200) {
      let datosLeidos = ajaxrequest.responseText;
      if (datosLeidos) {
        mostrarConsulta(datosLeidos);
      }
    }
  };
  let envio = "Envio=" + datosRequeridos;

  ajaxrequest.setRequestHeader("Content-type", "application/json");
  ajaxrequest.send(envio);
}
//-------------------------------------------------------------------------------------------------
//para leer las categorias lo que estan el la base de datos y lo guando en un select
function leerCategorias() {
  var jdatoselemento = "Categorias";
  let envio = "Envio=" + jdatoselemento;
  var ajaxrequest = new XMLHttpRequest();
  ajaxrequest.open(
    "POST",
    "https://informaticasc.com/curso22_23/salamaDM/DOCS/phpTodo/leerCategorias.php",
    true
  );
  ajaxrequest.onreadystatechange = function () {
    if (ajaxrequest.readyState === 4 && ajaxrequest.status === 200) {
      let datosLeidos = ajaxrequest.responseText;
      console.log("Datos Recibidos response :" + datosLeidos);

      var registrosCategorias = JSON.parse(datosLeidos);
      if (registrosCategorias != null) {
        console.log(registrosCategorias);
        rellenarCamposCAT(registrosCategorias);
      } else {
        swal({
          title: "No Hay Registros que cumplan la condición",
          text: "You won't be able to revert this!",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        });
      }
    }
  };

  ajaxrequest.setRequestHeader(
    "Content-type",
    "application/x-www-form-urlencoded"
  );

  ajaxrequest.send(envio);
}

//-------------------------------------------------------------------------------------------------
//para leer los tags lo que estan el la base de datos y lo guando en un select

function leerTags() {
  var jdatoselemento = "Tags";
  let envio = "Envio=" + jdatoselemento;
  var ajaxrequest = new XMLHttpRequest();
  ajaxrequest.open(
    "POST",
    "https://informaticasc.com/curso22_23/salamaDM/DOCS/phpTodo/leerTags.php",
    true
  );
  ajaxrequest.onreadystatechange = function () {
    if (ajaxrequest.readyState === 4 && ajaxrequest.status === 200) {
      var datosLeidosJSON = ajaxrequest.responseText;
      console.log("Datos Recibidos response :" + datosLeidosJSON);

      var registrosTags = JSON.parse(datosLeidosJSON);
      if (registrosTags != null) {
        console.log(registrosTags);
        rellenarCamposTAG(registrosTags);
      } else {
        swal({
          title: "No Hay Registros que cumplan la condición",
          text: "You won't be able to revert this!",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        });
      }
    }
  };

  ajaxrequest.setRequestHeader(
    "Content-type",
    "application/x-www-form-urlencoded"
  );

  ajaxrequest.send(envio);
}

//-------------------------------------------------------------------------------------------------
//para leer los autores lo que esan el la base de datos y lo guando en un select

function leerAuthors() {
  var jdatoselemento = "Authors";
  let envio = "Envio=" + jdatoselemento;
  var ajaxrequest = new XMLHttpRequest();
  ajaxrequest.open(
    "POST",
    "https://informaticasc.com/curso22_23/salamaDM/DOCS/phpTodo/leerAuthors.php",
    true
  );
  ajaxrequest.onreadystatechange = function () {
    if (ajaxrequest.readyState === 4 && ajaxrequest.status === 200) {
      var datosLeidosJSON = ajaxrequest.responseText;
      console.log("Datos Recibidos response :" + datosLeidosJSON);

      var registrosAuthors = JSON.parse(datosLeidosJSON);
      if (registrosAuthors != null) {
        console.log(registrosAuthors);
        rellenarCamposAUTH(registrosAuthors);
      } else {
        swal({
          title: "No Hay Registros que cumplan la condición",
          text: "You won't be able to revert this!",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        });
      }
    }
  };

  ajaxrequest.setRequestHeader(
    "Content-type",
    "application/x-www-form-urlencoded"
  );

  ajaxrequest.send(envio);
}

//-------------------------------------------------------------------------------------------------
//recibe los datos recuperados del servidor en formato JSON

function mostrarConsulta(datos) {
  let lista = JSON.parse(datos);
  if (lista == null) {
    swal({
      title: "No hay Mas Registros",
      text: "You won't be able to revert this!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    });
  }
  //console.log(lista);
  //alert(lista[0].caTname);

  if (lista != null) {
    rellenarCampos(lista[0]);
  }
}

//-------------------------------------------------------------------------------------------------
leerCategorias();
leerAuthors();
leerTags();
let datosRequeridos = "order by posts.Id ASC";
solicitarRegistro(datosRequeridos);

//rellenar el select de la categoria desde la base de datos
function rellenarCamposCAT(registro) {
  console.log(registro.length);
  iId.value = registro.id;
  console.log(registro.caTname);
  iTitulo.value = registro.title;

  for (let i = 0; i < registro.length; i++) {
    let opcion = document.createElement("option");
    opcion.value = registro[i].id;
    opcion.text = registro[i].caTname;
    console.log("here");
    iCategoria.appendChild(opcion);
  }
}
//rellena el select de la autor desde la base de datos
function rellenarCamposAUTH(registro) {
  console.log(registro.length);
  iId.value = registro.id;
  console.log(registro.caTname);
  iTitulo.value = registro.title;

  for (let i = 0; i < registro.length; i++) {
    let opcion = document.createElement("option");
    opcion.value = registro[i].id;
    opcion.text = registro[i].authorname;
    console.log("here");
    iAutor.appendChild(opcion);
  }
}
//rellenar el select de la tag desde la base de datos

function rellenarCamposTAG(registro) {
  console.log(registro.length);
  iId.value = registro.id;
  console.log(registro.caTname);
  iTitulo.value = registro.title;

  for (let i = 0; i < registro.length; i++) {
    let opcion = document.createElement("option");
    opcion.value = registro[i].id;
    opcion.text = registro[i].taGname;
    iTag.appendChild(opcion);
  }
}
//actualiza los campos del formulario con la información recibida del servidor.
function rellenarCampos(registro) {
  iId.value = registro.id;
  iTitulo.value = registro.title;
  iCategoria.options[0].text = registro.caTname;
  iAutor.options[0].text = registro.authorname;
  iTag.options[0].text = registro.taGname;
  iContenido.value = registro.content;
  iFecha.value = registro.post_date;
  iContenido.value = registro.content;
  //ifilePut.value=registro.file;
  nombreFicheroLeido.innerText = registro.file;
}

//-------------------------------------------------------------------------------------------------
//para limpiar los campos del formulario
function limpiarCampos() {
  iId.value = "";
  iCategoria.value = "Seleccionar";
  iTitulo.value = "";
  iFecha.value = "";
  iAutor.value = "";
  iTag.value = "";
  iContenido.value = "";
  ifilePut.value = "";
}
//////////////////////////////////////Funciones///////////////////////////////////////
function grabarRegistro() {
  let formulario = document.getElementById("form");
  //alert(document.getElementsByName("iTitulo")[0].value);
  console.log(formulario);
  var formData = new FormData(formulario);
  fetch(
    "https://informaticasc.com/curso22_23/salamaDM/DOCS/phpTodo/grabarRegistro.php",
    {
      method: "POST",
      body: formData,
    }
  )
    .then((resp) => {
      console.log(
        "Estado url : " +
          resp.url +
          "  status: " +
          resp.status +
          " type: " +
          resp.type
      );
      return resp.text();
    })
    .then((resultado) => {
      console.log(resultado);
    })
    .catch((err) => {
      console.log("ERROR :" + err);
    });
  ultimoRegistro();
}
//para modificar el registro
function modificarRegistro() {
  if (checkFileExtension() == false) {
    const selectedOptionText = iTag.options[iTag.selectedIndex].text;
    swal({
      icon: "error",
      title: "El Formato no es valido",
      text: `Please select a ${selectedOptionText} file.`,
    });
  } else {
    swal({
      title: "Registro Modificado",
      text: "El registro se ha Modificado correctamente",
      icon: "success",
      button: "Aceptar",
    });
    let formulario = document.getElementById("form");
    //alert(document.getElementsByName("iTitulo")[0].value);
    console.log(formulario);
    var formData = new FormData(formulario);
    fetch(
      "https://informaticasc.com/curso22_23/salamaDM/DOCS/phpTodo/modificarRegistro.php",
      {
        method: "POST",
        body: formData,
      }
    )
      .then((resp) => {
        console.log(
          "Estado url : " +
            resp.url +
            "  status: " +
            resp.status +
            " type: " +
            resp.type
        );
        return resp.text();
      })
      .then((resultado) => {
        console.log(resultado);
      })
      .catch((err) => {
        console.log("ERROR :" + err);
      });
  }
}

//-------------------------------------------------------------------------------------------------

function cambiarNuevo() {
  bGrabar.value = "Nuevo registro";
  habilitarBotones();
  iId.disabled = false;
  grabar = false;
}

//-------------------------------------------------------------------------------------------------
function obtenerFechaActual() {
  let fecha = new Date(); //Fecha actual
  let mes = fecha.getMonth() + 1; //Obtiene el mes
  let dia = fecha.getDate(); //Obtiene el día.
  let anio = fecha.getFullYear(); //Obtiene el año.
  if (dia < 10) dia = "0" + dia; //Agrega cero si es menor de 10
  if (mes < 10) mes = "0" + mes; //Agrega cero si es menor de 10
  return anio + "-" + mes + "-" + dia;
}

///////////////////////////////////VALIDAR DATOS////////////////////////////////
function validarDatos() {
  let validado = true;
  //Valida el Categoria.
  if (validado) {
    if (iCategoria.value == "Seleccionar") {
      mensaje = "No existe un tipo seleccionado.";
      validado = false;
    }
  }
  if (validado) {
    if (iAutor.value == "Seleccionar") {
      mensaje = "No existe un tipo seleccionado.";
      validado = false;
    }
  }
  if (validado) {
    if (iFecha.value == "") {
      mensaje = "No se ha introducido una fecha.";
      validado = false;
    }
  }
  //Valida fecha anterior o igual a la actual.
  if (validado) {
    let fecha = iFecha.value.replaceAll("-", "");
    if (fecha > obtenerFechaActual().replaceAll("-", "")) {
      mensaje = "La fecha introducida es posterior a la actual.";
      validado = false;
    }
  }
  if (validado) {
    if (iTag.value == "") {
      mensaje = "Debe definir el tag.";
      validado = false;
    }
  }
  //validar contenido
  if (validado) {
    if (iContenido.value == "") {
      mensaje = "Debe definir el contenido.";
      validado = false;
    } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(iContenido.value)) {
      mensaje = "El contenido solo puede contener letras.";
      validado = false;
    }
  }

  //validar título
  if (validado) {
    if (iTitulo.value == "") {
      mensaje = "Debe definir el título.";
      validado = false;
    } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(iTitulo.value)) {
      mensaje = "El título solo puede contener letras.";
      validado = false;
    }
  }

  //Muestra mensaje si no está validado.
  if (!validado) {
    swal("Error", mensaje, "error");
  }
  return validado;
}
//////////////////////////////////////////Eventos//////////////////////////////////////////

function primerRegistro() {
  let datosRequeridos = "order by posts.Id ASC";
  solicitarRegistro(datosRequeridos);
}

//--------------------------------------------------------------------------------------------------
function ultimoRegistro() {
  let datosRequeridos = "order by posts.Id DESC";
  solicitarRegistro(datosRequeridos);
}

//--------------------------------------------------------------------------------------------------
function siguienteRegistro() {
  if (iId.value != "") {
    let datosRequeridos = "where posts.Id>" + iId.value + " order by Id ASC";
    console.log(datosRequeridos);
    solicitarRegistro(datosRequeridos);
  }
}

//--------------------------------------------------------------------------------------------------
function anteriorRegistro() {
  if (iId.value != "") {
    let datosRequeridos = "where posts.Id<" + iId.value + " order by Id DESC";
    console.log(datosRequeridos);
    solicitarRegistro(datosRequeridos);
  } else if (datosRequeridos == null) {
    console.log("ntg");
  }
}
//--------------------------------------------------------------------------------------------------

function borrarRegistro() {
  if (iId.value != "") {
    let ajaxrequest = new XMLHttpRequest();
    ajaxrequest.open(
      "POST",
      "https://www.informaticasc.com/curso22_23/salamaDM/DOCS/phpTodo/borrarRegistro.php",
      true
    );
    ajaxrequest.onreadystatechange = async function () {
      if (ajaxrequest.readyState === 4 && ajaxrequest.status === 200) {
        let respuesta = ajaxrequest.responseText;
        if (respuesta) {
          // Use SweetAlert to display a success message
          swal("Registro borrado exitosamente!", {
            icon: "success",
          }).then(() => {
            // Reload the page to show the updated list of records
            primerRegistro();
          });
        }
      }
    };
    ajaxrequest.setRequestHeader(
      "Content-type",
      "application/x-www-form-urlencoded"
    );
    let envio = "Id=" + iId.value;
    ajaxrequest.send(envio);
  }
}

//--------------------------------------------------------------------------------------------------
function nuevoRegistro() {
  document.getElementById("nombreFicheroLeido").innerHTML = "";
  if (!grabar) {
    limpiarCampos();
    cambiarGrabar();
  } else {
    //Grabando.
    if (validarDatos() && checkFileExtension() == true) {
      grabarRegistro();
      cambiarNuevo();
      grabar = false;
      hayDatosBD = true;
      habilitarBotones();
      swal({
        title: "Registro agregado",
        text: "El registro se ha agregado correctamente",
        icon: "success",
        button: "Aceptar",
      });
    } else {
      const selectedOptionText = iTag.options[iTag.selectedIndex].text;
      swal({
        icon: "error",
        title: "El Formato no es valido",
        text: `Please select a ${selectedOptionText} file.`,
      });
    }
  }
}
function habilitarBotones() {
  if (!grabar) {
    bGrabar.value = "Nuevo registro";
  } else {
    bGrabar.value = "Grabar registro";
  }
}
function cambiarGrabar() {
  grabar = true;
  habilitarBotones();
  limpiarCampos();
  iFecha.value = obtenerFechaActual();
}
function abrirDocumento() {
  console.log(ifilePut.value);
  const fileName = nombreFicheroLeido.innerText;
  console.log(fileName);
  let sub = fileName.substring(fileName.length - 3);
  console.log(sub);
  clickFile(sub, fileName);
  checkFileExtension(sub);
}

function clickFile(sub, fileName) {
  if (sub == "pdf") {
    window.location = `${fileName}`;
  } else if (sub == "jpg") {
    window.location = `${fileName}`;
  } else if (sub == "mp4") {
    window.location = `${fileName}`;
  } else if (sub == "odt") {
    window.location = `${fileName}`;
  } else {
    console.log("your extention not detected");
  }
}
function checkFileExtension() {
  const fileName = ifilePut.value;
  console.log(fileName);
  const selectedOptionText = iTag.options[iTag.selectedIndex].text;
  let sub = fileName.substring(fileName.length - 3);
  console.log(sub);
  if (sub != selectedOptionText) {
    return false;
  } else {
    return true;
  }
}
