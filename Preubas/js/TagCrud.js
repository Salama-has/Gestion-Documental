//////////////////////////////////Base DE DATOS///////////////////////////////////////////////////
async function solicitarRegistro(datosRequeridos) {
    var ajaxrequest = new XMLHttpRequest();
  
    ajaxrequest.open(
      "POST",
      "https://www.informaticasc.com/curso22_23/salamaDM/DOCS/phpTags/consultarRegistro.php", //change
      true
    );
    ajaxrequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    ajaxrequest.onreadystatechange = async function () {
      //alert(ajaxrequest.readyState + "--" + ajaxrequest.status);
      if (ajaxrequest.readyState === 4 && ajaxrequest.status === 200) {
        let datosLeidos = ajaxrequest.responseText;
        if (datosLeidos) {
          mostrarConsulta(datosLeidos);
          console.log(datosLeidos);
        }
      }
    };
    let envio = "Envio=" + datosRequeridos;
  
    ajaxrequest.setRequestHeader("Content-type", "application/json");
    ajaxrequest.send(envio);
  }
  //-------------------------------------------------------------------------------------------------
  
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
  console.log(lista);
  //alert(lista[0].caTname);

  if (lista != null) {
    rellenarCampos(lista[0]);
  }
}
  //-------------------------------------------------------------------------------------------------
  
  let datosRequeridos = "order by tags.id ASC";
  solicitarRegistro(datosRequeridos);
  
  function rellenarCampos(registro) {
    iId.value = registro.id;
    iTag.value = registro.taGname;
  }
  
  //-------------------------------------------------------------------------------------------------
  
  function limpiarCampos() {
    iId.value = "";
    iTag.value = "";
  }
  //////////////////////////////////////Funciones///////////////////////////////////////
  function grabarRegistro() {
    let formulario = document.getElementById("form");
    //alert(document.getElementsByName("iTag")[0].value);
    console.log(formulario);
    var formData = new FormData(formulario);
    fetch(
      "https://informaticasc.com/curso22_23/salamaDM/DOCS/phpTags/grabarRegistro.php", //change
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
  
  function modificarRegistro() {
    if(validarDatos()){
    swal({
    title: "Registro Modificado",
    text: "El registro se ha Modificado correctamente",
    icon: "success",
    button: "Aceptar",
  });
    let formulario = document.getElementById("form");
    //alert(document.getElementsByName("iTag")[0].value);
    console.log(formulario);
    var formData = new FormData(formulario);
    fetch(
      "https://informaticasc.com/curso22_23/salamaDM/DOCS/phpTags/modificarRegistro.php",
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
    const nombreiTag = iTag.value.trim();
    const pattern = /^[a-zA-Z]+$/;
  
    if (validado) {
      if (nombreiTag === "") {
        mensaje = "Debe definir el nombre del autor.";
        validado = false;
      } else if (!pattern.test(nombreiTag)) {
        mensaje = "El nombre del tag solo puede contener letras.";
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
    //console.log("P")
    let datosRequeridos = "order by tags.id ASC";
    solicitarRegistro(datosRequeridos);
  }
  
  //--------------------------------------------------------------------------------------------------
  function ultimoRegistro() {
    //console.log("U")
    let datosRequeridos = "order by tags.id DESC";
    solicitarRegistro(datosRequeridos);
  }
  
  //--------------------------------------------------------------------------------------------------
  function siguienteRegistro() {
    //console.log("S")
    if (iId.value != "") {
      let datosRequeridos = "where tags.id>" + iId.value + " order by id ASC";
      console.log(datosRequeridos);
      solicitarRegistro(datosRequeridos);
    }
  }
  
  //--------------------------------------------------------------------------------------------------
  function anteriorRegistro() {
    //console.log("A")
    if (iId.value != "") {
      let datosRequeridos = "where tags.id<" + iId.value + " order by id DESC";
      console.log(datosRequeridos);
      solicitarRegistro(datosRequeridos);
    }
  }
  //--------------------------------------------------------------------------------------------------
  
  function borrarRegistro() {
    if (iId.value != "") {
      //Proporciona una forma fácil de obtener información de una URL sin tener que recargar la página completa. XMLHttpRequest es ampliamente usado en la programación AJAX.
      //A pesar de su nombre, XMLHttpRequest puede ser usado para recibir cualquier tipo de dato, no solo XML, y admite otros formatos además de HTTP (incluyendo file y ftp).
      let ajaxrequest = new XMLHttpRequest();
  
      //Inicializa una solicitud recién creada o reinicializa una existente.
      ajaxrequest.open(
        "POST",
        "https://www.informaticasc.com/curso22_23/salamaDM/DOCS/phpTags/borrarRegistro.php", //change
        true
      );
      //Cambio de estado a listo,
      ajaxrequest.onreadystatechange = async function () {
        //alert(ajaxrequest.readyState + '--' + ajaxrequest.status)
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
      //Grabando.
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
  