import { Planeta } from "./Planeta.js";
import { leer, escribir, limpiar, jsonToObject, objectToJson } from "./Local-storage.js";
import { mostrarSpinner, ocultarSpinner } from "./spinner.js";
import { mostrarBotones, ocultarBotones} from "./botones.js";

const KEY_STORAGE = "Planeta";
let items = [];

let form = null;

document.addEventListener("DOMContentLoaded", onInit);

function onInit() {
    loadItems();
    obtenerform();
    escuchandoForm();
    escuchandoBtnDeleteAll();
    escuchandoBtnBack()
}

function obtenerform() {
    form = document.getElementById("form-items");
}

async function loadItems() {
    mostrarSpinner(); // muestro el spinner
    let str = await leer(KEY_STORAGE);
    ocultarSpinner(); // ya cargado lo oculto
    let object = jsonToObject(str) || [];

    object.forEach(obj => {
        const model = new Planeta(
            obj.id,
            obj.nombre,
            obj.tamaño,
            obj.masa,
            obj.tipo,
            obj.distancia, // Asegúrate de que esto coincide
            obj.presentaVida,
            obj.anillo,
            obj.composicion
        );
        items.push(model);
    });
    rellenarTabla();
}

function actualizarFormulario() {
    form.reset();
}

function rellenarTabla() {
    const tabla = document.getElementById("table-items");
    var tbody = tabla.getElementsByTagName("tbody")[0];

    tbody.innerHTML = ''; // Me aseguro que esté vacío, hago referencia al agregar otro

    const celdas = ["id", "nombre", "tamaño", "masa", "tipo", "distancia", "presentaVida", "anillo", "composicion"];

    items.forEach((item, index) => {
        let nuevaFila = document.createElement("tr");

        celdas.forEach((celda) => {
            let nuevaCelda = document.createElement("td");
            nuevaCelda.textContent = item[celda];
            nuevaFila.appendChild(nuevaCelda);
        });

        let eliminarCelda = document.createElement("td");
        let eliminarBtn = document.createElement("button");
        eliminarBtn.textContent = "Eliminar";
        eliminarBtn.classList.add("red-button");
        eliminarBtn.addEventListener("click", () => eliminarItem(index));
        

        eliminarCelda.appendChild(eliminarBtn);
        nuevaFila.appendChild(eliminarCelda);
        addRowClickListener(nuevaFila);
        // Agregar la fila al tbody
        tbody.appendChild(nuevaFila);
    });
}

async function eliminarItem(index) {
    items.splice(index, 1);
    const str = objectToJson(items);
    try {
        mostrarSpinner();
        await escribir(KEY_STORAGE, str);
        ocultarSpinner();
        rellenarTabla();
    } catch (error) {
        alert(error);
    }
}

function escuchandoForm() {
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const model = new Planeta(
            crearId(),
            form.querySelector("#nombre").value,
            form.querySelector("#tamaño").value,
            form.querySelector("#masa").value,
            form.querySelector("#tipo").value,
            form.querySelector("#distancia").value,
            obtenerValorRadio('presentaVida'),
            obtenerValorRadio('presentaAnillo'),
            form.querySelector("#composicion").value
        );

        items.push(model);
        const str = objectToJson(items);

        try {
            mostrarSpinner();
            await escribir(KEY_STORAGE, str);
            ocultarSpinner();

            actualizarFormulario();
            rellenarTabla(); // <- Asegúrate de llamar a rellenarTabla() aquí

        } catch (error) {
            alert(error);
        }
    });
}

function obtenerValorRadio(id) {
    const radios = document.getElementsByName(id);
    let seleccionado = "No";

    for (const radio of radios) {
        if (radio.checked) {
            seleccionado = radio.value;
            break;
        }
    }

    return seleccionado; // <- Devuelve el valor seleccionado
}

function crearId() {
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Los meses empiezan desde 0
    const day = String(now.getDate()).padStart(2, '0');

    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const milliseconds = String(now.getMilliseconds()).padStart(3, '0');

    const dateTimeString = `${year}${month}${day}${hours}${minutes}${seconds}${milliseconds}`;
    return parseInt(dateTimeString, 10);
}

function escuchandoBtnDeleteAll() {
    const btn = document.getElementById("btn-delete-all");

    btn.addEventListener("click", async () => {
        const rta = confirm('Desea eliminar todos los Items?');

        if (rta) {
            items.splice(0, items.length);

            try {
                mostrarSpinner();
                await limpiar(KEY_STORAGE);
                ocultarSpinner();

                rellenarTabla();
            } catch (error) {
                alert(error);
            }
        }
    });
}


function addRowClickListener(row) {//se encarga de poner la caracteristica de click 
    //y manda los datos a consola
    row.addEventListener('click', () => {
        const cells = row.querySelectorAll('td');
        const rowData = Array.from(cells).map(cell => cell.textContent);
        console.log(rowData);
        editarTabla(rowData);
    });
}

async function editarTabla(data) {
    form.querySelector("#nombre").value = data[1];
    form.querySelector("#tamaño").value = data[2];
    form.querySelector("#masa").value = data[3];
    form.querySelector("#tipo").value = data[4];
    form.querySelector("#distancia").value = data[5];
    if (data[6] === "Sí") {
        document.querySelector("#pVida[value='Sí']").checked = true;
    } 
    if (data[7] === "Sí") {
        document.querySelector("#pAnillo[value='Sí']").checked = true;
    } 
    form.querySelector("#composicion").value = data[8];
    mostrarBotones(); // Mostrar botones al editar
}


function escuchandoBtnBack() {
    const btn = document.getElementById("btn-back");

    btn.addEventListener("click", async () => {
        const rta = confirm('¿Desea dejar de editar?');

        if (rta) {
            try {
                mostrarSpinner();
                actualizarFormulario();
                ocultarBotones(); // Ocultar botones al dejar de editar
                ocultarSpinner();
            } catch (error) {
                alert(error);
            }
        }
    });
}




