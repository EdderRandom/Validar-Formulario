/*Esta linea de código asegura que se inicie el Java Script desde que el DOM este cargado*/
document.addEventListener("DOMContentLoaded", function() {
    
    const form = document.getElementById("form");
    const nombre = document.getElementById("nombre");
        const correo = document.getElementById("correo");
        const ccorreo = document.getElementById("ccorreo");
        const numero = document.getElementById("numero");
        const genero = document.getElementById("genero");
        const term = document.getElementById("term");
    
    form.addEventListener("submit", e => {
        e.preventDefault();
        validateInputs();
    });
    
    /*Valido cada uno de los campos y les asigno los colores para marcar si están los datos o no */
    const validateInputs = () => {
        const nombreValue = nombre.value.trim();
        const correoValue = correo.value.trim();
        const ccorreoValue = ccorreo.value.trim();
        const numeroValue = numero.value.trim();
        const generoValue = genero.value;
        const termChecked = term.checked;

        if (nombreValue === "") {
            setError(nombre, "Nombre requerido");
        } else {
            setSuccess(nombre);
        }

        if (correoValue === ""){
            setError(correo, "Correo Requerido");
        } else if(!isValidEmail(correoValue)){
            setSuccess(correo,"Ingresa un email valido");
        }else {
            setSuccess(correo);
        }

        if(ccorreoValue === ""){
            setError(ccorreo, "Ingrese correo");
        }else if(ccorreoValue !== correoValue){
            setError(ccorreo, "El correo no coincide");
        }else{
            setSuccess(ccorreo)
        }
        
        if(numeroValue ===""){
            setError(numero,"Numero requerido")
        }else{
            setSuccess(numero);
        }

        if(generoValue ===""){
            setError(genero, "Seleccione un genero");
        }else{
            setSuccess(genero);
        }

        if(!termChecked){
            setError(term, "Debes aceptar los términos y condiciones");
        } else {
            setSuccess(term);
        }
    };

    
    const setError = (element, message) => {
        const inputControl = element.parentElement;
        const errorDisplay = inputControl.querySelector(".error");

        errorDisplay.innerText = message;
        inputControl.classList.add("error");
        inputControl.classList.remove("success");
    };

    const setSuccess = (element) => {
        const inputControl = element.parentElement;
        const errorDisplay = inputControl.querySelector(".error");

        errorDisplay.innerText = "";
        inputControl.classList.add("success");
        inputControl.classList.remove("error");
    };

    const isValidEmail = email => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };
});




