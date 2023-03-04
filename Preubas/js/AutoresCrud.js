//////////////////////////////////Base DE DATOS///////////////////////////////////////////////////

/*La función solicitarRegistro hace una solicitud asincrónica a través de 
la API XMLHttpRequest para obtener información de un servidor externo
llama a la función mostrarConsulta para mostrar los datos recuperados */

async function solicitarRegistro(datosRequeridos) {
  var ajaxrequest = new XMLHttpRequest();

  ajaxrequest.open(
    "POST",
    "https://www.informaticasc.com/curso22_23/salamaDM/DOCS/phpAutores/consultarRegistro.php", 
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
        //console.log(datosLeidos);
      }
    }
  };
  let envio = "Envio=" + datosRequeridos;

  ajaxrequest.setRequestHeader("Content-type", "application/json");
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

//let datosRequeridos = "order by authors.id ASC";
//solicitarRegistro(datosRequeridos);

//actualiza los campos del formulario con la información recibida del servidor.
function rellenarCampos(registro) {
  iId.value = registro.id;
  iAutor.value = registro.authorname;
}

//-------------------------------------------------------------------------------------------------
//para limpiar los campos del formulario
function limpiarCampos() {
  iId.value = "";
  iAutor.value = "";
}
//////////////////////////////////////Funciones///////////////////////////////////////
//para grabar registro
function grabarRegistro() {
  let formulario = document.getElementById("form");
  //alert(document.getElementsByName("iAutor")[0].value);
  //console.log(formulario);
  //Se utiliza un objeto FormData para recopilar los datos del formulario.
  var formData = new FormData(formulario);
  fetch(
    "https://informaticasc.com/curso22_23/salamaDM/DOCS/phpAutores/grabarRegistro.php", //change
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
  if(validarDatos()==true){
    swal({
      title: "Registro Modificado",
      text: "El registro se ha Modificado correctamente",
      icon: "success",
      button: "Aceptar",
    });
    let formulario = document.getElementById("form");
    //alert(document.getElementsByName("iAutor")[0].value);
    console.log(formulario);
    var formData = new FormData(formulario);
    fetch(
      "https://informaticasc.com/curso22_23/salamaDM/DOCS/phpAutores/modificarRegistro.php",
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
  };
  
}

//-------------------------------------------------------------------------------------------------
function cambiarNuevo() {
  bGrabar.value = "Nuevo registro";
  habilitarBotones();
  iId.disabled = false;
  grabar = false;
}

///////////////////////////////////VALIDAR DATOS////////////////////////////////
function validarDatos() {
  let validado = true;
  const nombreAutor = iAutor.value.trim();
  const pattern = /^[a-zA-Z]+$/;

  if (validado) {
    if (nombreAutor === "") {
      mensaje = "Debe definir el nombre del autor.";
      validado = false;
    } else if (!pattern.test(nombreAutor)) {
      mensaje = "El nombre del autor solo puede contener letras.";
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
//se utilizan para navegar por los registros de la base de datos y mostrarlos en el formulario.
function primerRegistro() {
  //console.log("P");
  let datosRequeridos = "order by authors.id ASC";
  solicitarRegistro(datosRequeridos);
}

function ultimoRegistro() {
  //console.log("U");
  let datosRequeridos = "order by authors.id DESC";
  solicitarRegistro(datosRequeridos);
}

function siguienteRegistro() {
  //console.log("S");
  if (iId.value != "") {
    let datosRequeridos = "where authors.id>" + iId.value + " order by id ASC";
    //console.log(datosRequeridos);
    solicitarRegistro(datosRequeridos);
  }
}
function anteriorRegistro() {
  //console.log("A");
  if (iId.value != "") {
    let datosRequeridos = "where authors.id<" + iId.value + " order by id DESC";
   //console.log(datosRequeridos);
    solicitarRegistro(datosRequeridos);
  }
}
//--------------------------------------------------------------------------------------------------
//para eliminar los registros de la base de datos
function borrarRegistro() {
  if (iId.value != "") {
    let ajaxrequest = new XMLHttpRequest();

    //Inicializa una solicitud recién creada o reinicializa una existente.
    ajaxrequest.open(
      "POST",
      "https://www.informaticasc.com/curso22_23/salamaDM/DOCS/phpAutores/borrarRegistro.php", //change
      true
    );
    //Cambio de estado a listo,
    ajaxrequest.onreadystatechange = async function () {
      //alert(ajaxrequest.readyState + '--' + ajaxrequest.status)
      if (ajaxrequest.readyState === 4 && ajaxrequest.status === 200) {
        let respuesta = ajaxrequest.responseText;
        if (respuesta) {
          swal("Registro borrado exitosamente!", {
            icon: "success",
          }).then(() => {
            primerRegistro();
          });
        }
      }
    };

    ajaxrequest.setRequestHeader(
      "Content-type",
      "application/x-www-form-urlencoded"
    );
    //Envía la solicitud al servidor.
    let envio = "Id=" + iId.value;
    ajaxrequest.send(envio);
  }
}
//--------------------------------------------------------------------------------------------------
function nuevoRegistro() {
  if (!grabar) {
    limpiarCampos();
    cambiarGrabar();
  } else {
    if (validarDatos()) {
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
    }
  }
}
//para habilitar los botones depende si pulsas nuevo o grabar
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
}
