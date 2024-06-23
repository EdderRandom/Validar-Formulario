/* Agrego los elementos para que se muestren y queden almacenados en un parrafo*/
document.addEventListener("DOMContentLoaded", function(){
let listaUsuario = [];

const objUsuario = {
    id: "",
    nombre: "",
    correo: "",
    numero: "",
    genero:"",
    term: false
}

let editando = false;

const formulario = document.getElementById("form");
const nombreInput = document.getElementById("nombre");
const correoInput = document.getElementById("correo");
const ccorreoInput = document.getElementById("ccorreo");
const numeroInput = document.getElementById("numero");
const generoInput = document.getElementById("genero");
const termInput = document.getElementById("term")
const btnAgregarInput = document.getElementById("enviar");


formulario.addEventListener("submit", validarFormulario);

function validarFormulario(e) {
    e.preventDefault();

    /*Valida los campos vacíos, ! con este operador que invierta el booleano me aseguro de que se cumpla la condición que el checkbox este marcado */
    if (nombreInput.value === "" || correoInput.value === "" || ccorreoInput.value === "" || numeroInput.value === "" || generoInput.value ==="" || !termInput.checked) {
        alert("Todos los campos deben ser completados");
        return;
    } 

    /*Valido coincidencia de correos*/
    if (correoInput.value !== ccorreoInput.value) {
        alert("Los correos no coinciden");
        return;
    }

    /*De vuelvo un mensaje de ingreso exitoso del formulario*/
    alert("Formulario enviado exitosamente");

    /*Actualizado el usuario sin borrarlo*/
    if (editando) {
        editarUsuario();
        editando = false;

    } else{
        objUsuario.id = Date.now();
        objUsuario.nombre = nombreInput.value;
        objUsuario.correo = correoInput.value;
        objUsuario.numero = numeroInput.value;
        objUsuario.genero = generoInput.value;

        agregarUsuario();
    }
}

function agregarUsuario() {

    listaUsuario.push({ ...objUsuario });

    mostrarUsuario();

    formulario.reset();
    limpiarObjeto();
}

function limpiarObjeto() {
    objUsuario.id = "";
    objUsuario.nombre = "";
    objUsuario.correo = "";
    objUsuario.numero = "";
    objUsuario.genero ="";
}

function mostrarUsuario() {
    limpiarHTML();

    // Selecciono el div donde se mostraran los usuarios
    const divUsuario = document.getElementById("div-usuario");

    // Verifico si se encuentran usuarios en la lista, con length.
    if(listaUsuario.length === 0) {
        const sinDatos = document.createElement("p");
        sinDatos.textContent = "No hay usuarios registrados.";
        divUsuario.appendChild(sinDatos);
        return;
    }
    
    /* El forEach me recorre cada elemento del array dependiendo de la función o lo que necesite puede ir variando # leer mas del forEach*/
    listaUsuario.forEach(usuario => {
        const { id, nombre, correo, numero, genero } = usuario;

        const parrafo = document.createElement("p");
        parrafo.textContent = `${id} - ${nombre} - ${correo} - ${numero} - ${genero}`;
        parrafo.dataset.id = id;

        const editarBoton = document.createElement("button");
        editarBoton.onclick = () => cargarUsuario(usuario);
        editarBoton.textContent = "Editar";
        editarBoton.classList.add("btn", "btn-editar");
        parrafo.append(editarBoton);

        const eliminarBoton = document.createElement("button");
        eliminarBoton.onclick = () => eliminarUsuario(id);
        eliminarBoton.textContent = "Eliminar";
        eliminarBoton.classList.add("btn", "btn-eliminar");
        parrafo.append(eliminarBoton);

        /*Separa visualmente a cada usuario (hr = linea)*/
        const hr = document.createElement("hr");

        divUsuario.appendChild(parrafo);
        divUsuario.appendChild(hr);
    });
}

function cargarUsuario(usuario) {
    const { id, nombre, correo, numero, genero } = usuario;

    nombreInput.value = nombre;
    correoInput.value = correo;
    ccorreoInput.value = correo;
    numeroInput.value = numero;
    generoInput.value = genero;

    objUsuario.id = id;

    btnAgregarInput.textContent = "Actualizar";


    editando = true;
}

function editarUsuario() {
    objUsuario.nombre = nombreInput.value;
    objUsuario.correo = correoInput.value;
    objUsuario.numero = numeroInput.value;
    objUsuario.genero = generoInput.value;

    listaUsuario = listaUsuario.map(usuario => {
        if (usuario.id === objUsuario.id) {
            usuario.nombre = objUsuario.nombre;
            usuario.correo = objUsuario.correo;
            usuario.numero = objUsuario.numero;
            usuario.genero = objUsuario.genero;
        }
        return usuario;
    });


    limpiarHTML();
    mostrarUsuario();
    formulario.reset();
    limpiarObjeto();

    btnAgregarInput.textContent = "Agregar";

    editando = false;
}

function eliminarUsuario(id) {
    listaUsuario = listaUsuario.filter(usuario => usuario.id !== id);

    limpiarHTML();
    mostrarUsuario();
}

function limpiarHTML() {
    const divUsuario = document.getElementById("div-usuario");
    while (divUsuario.firstChild) {
        divUsuario.removeChild(divUsuario.firstChild);
    }
}    
})

