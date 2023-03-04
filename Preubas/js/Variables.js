let grabar = false;
let borrado = false;
let siguiente = false;
let anterior = false;
let hayDatosBD = false;
//------------------------------------------------------------
let iId = document.getElementById("iId");
let iTitulo = document.getElementById("iTitulo");
let iCategoria = document.getElementById("iCategoria");
let iFecha = document.getElementById("iFecha");
let iAutor = document.getElementById("iAutor");
let iTag = document.getElementById("iTag");
let iContenido = document.getElementById("iContenido");
let ifilePut = document.getElementById("ifilePut");
let ifile = document.getElementById("ifile");
//ifilePut.disabled = true;

//------------------------------------------------------------
const bPrimero = document.getElementById("bPrimero");
const bUltimo = document.getElementById("bUltimo");
const bSiguiente = document.getElementById("bSiguiente");
const bAnterior = document.getElementById("bAnterior");
const bGrabar = document.getElementById("bGrabar");
const bModificar = document.getElementById("bModificar");
const bBorrar = document.getElementById("bBorrar");
//const bSalir = document.getElementById("bSalir");
const bBuscar=document.getElementById("bBuscar");
const bVolver=document.getElementById("bVolver");

//------------------------------------------------------------

bPrimero.addEventListener("click", primerRegistro, false);
bUltimo.addEventListener("click", ultimoRegistro, false);
bSiguiente.addEventListener("click", siguienteRegistro, false);
bAnterior.addEventListener("click", anteriorRegistro, false);
bGrabar.addEventListener("click", nuevoRegistro, false);
bBorrar.addEventListener("click", borrarRegistro, false);
bModificar.addEventListener("click", modificarRegistro, false);


