const persona = {
    id: 0,
    nombres: '',
    apellidos: '',
    telefono: '',
    email: '',
    ciudad: '',
    pais: ''
};

function contact(e) {
    persona.nombres = document.forms["fcontact"]["fname"].value;
    persona.apellidos = document.forms["fcontact"]["flastname"].value;
    persona.telefono = document.forms["fcontact"]["fphone"].value;
    persona.email = document.forms["fcontact"]["fmail"].value;
    persona.ciudad = document.forms["fcontact"]["fcity"].value;
    persona.pais = document.forms["fcontact"]["fcountry"].value;

    if (persona.id <= 0) {
        persona.id = new Date().valueOf();
    }

    let personaJson = JSON.stringify(persona);
    localStorage.setItem(persona.id, personaJson);

    e.preventDefault();
    alert("Datos guardados con exito");

    listarContactos();
    resetForm();
}

function resetForm(){
    document.forms["fcontact"].reset();
    persona.id = 0;
}

function listarContactos() {
    let tablaDinamica = "";

    //CABECERA DE LA TABLA
    tablaDinamica += "<table>";

    tablaDinamica += "<tr>";

    tablaDinamica += "<th>ID</th>";
    tablaDinamica += "<th>Nombre(s)</th>";
    tablaDinamica += "<th>Apellido</th>";
    tablaDinamica += "<th>Telefono</th>";
    tablaDinamica += "<th>E-mail</th>";
    tablaDinamica += "<th>Ciudad</th>";
    tablaDinamica += "<th>Pais</th>";
    tablaDinamica += "<th>Accion</th>";

    tablaDinamica += "</tr>";

    //FILAS CON INFORMACION
    let personasGuardadas = [];
    personasGuardadas = allStorage();

    for (let i = 0; i < personasGuardadas.length; i++) {

        tablaDinamica += "<tr>";
        let personaObjeto = JSON.parse(personasGuardadas[i]);

        tablaDinamica += "<td>";
        tablaDinamica += personaObjeto.id;
        tablaDinamica += "</td>";
        tablaDinamica += "<td>";
        tablaDinamica += personaObjeto.nombres;
        tablaDinamica += "</td>";
        tablaDinamica += "<td>";
        tablaDinamica += personaObjeto.apellidos;
        tablaDinamica += "</td>";
        tablaDinamica += "<td>";
        tablaDinamica += personaObjeto.telefono;
        tablaDinamica += "</td>";
        tablaDinamica += "<td>";
        tablaDinamica += personaObjeto.email;
        tablaDinamica += "</td>";
        tablaDinamica += "<td>";
        tablaDinamica += personaObjeto.ciudad;
        tablaDinamica += "</td>";
        tablaDinamica += "<td>";
        tablaDinamica += personaObjeto.pais;
        tablaDinamica += "</td>";
        tablaDinamica += "<td>";
        tablaDinamica += '<a href="./detalles.html?id=' + personaObjeto.id + '">Ver</a>';
        tablaDinamica += "</td>";
        tablaDinamica += "<td>";
        tablaDinamica += '<a href="javascript:editarContacto(' + personaObjeto.id + ');">Editar</a>';
        tablaDinamica += "</td>";
        tablaDinamica += "<td>";
        tablaDinamica += '<a href="javascript:eliminarContacto(' + personaObjeto.id + ');">Eliminar</a>';
        tablaDinamica += "</td>";

        tablaDinamica += "</tr>";
    }
    tablaDinamica += "</table>";
    document.getElementById("tablaContactos").innerHTML = tablaDinamica;
}

function allStorage() {
    let values = [],
        keys = Object.keys(localStorage),
        i = keys.length;

    while (i--) {
        values.push(localStorage.getItem(keys[i]));
    }
    return values;
}

function verDetalles() {
    let contactoID = obtenerParametroUrl();
    let contacto = localStorage.getItem(contactoID);

    if (contacto.length > 0) {
        let personaObjeto = JSON.parse(contacto);
        document.getElementById("onames").innerText = personaObjeto.nombres;
        document.getElementById("osurnames").innerText = personaObjeto.apellidos;
        document.getElementById("ophone").innerText = personaObjeto.telefono;
        document.getElementById("oemail").innerText = personaObjeto.email;
        document.getElementById("ociudad").innerText = personaObjeto.ciudad;
        document.getElementById("opais").innerText = personaObjeto.pais;
    }
}

function editarContacto(id) {
    let contacto = localStorage.getItem(id);

    if (contacto.length > 0) {
        let personaObjeto = JSON.parse(contacto);
        document.getElementById("fname").value = personaObjeto.nombres;
        document.getElementById("flastname").value = personaObjeto.apellidos;
        document.getElementById("fphone").value = personaObjeto.telefono;
        document.getElementById("fmail").value = personaObjeto.email;
        document.getElementById("fcity").value = personaObjeto.ciudad;
        document.getElementById("fcountry").value = personaObjeto.pais;

        persona.id = id;
    }
    listarContactos();
}

function eliminarContacto(id) {
    let contacto = localStorage.getItem(id);

    if (contacto.length > 0) {
        localStorage.removeItem(id);
        alert("Contacto eliminado con exito")
    }
    listarContactos();
}

function obtenerParametroUrl() {
    let url = window.location.href;
    let paramString = url.split('?')[1];
    let queryString = new URLSearchParams(paramString);
    let parameterID = 0;

    for (let pair of queryString.entries()) {
        console.log("key is:" + pair[0]);
        console.log("Value is:" + pair[1]);
        parameterID = Number(pair[1]);

    }
    return parameterID;
}