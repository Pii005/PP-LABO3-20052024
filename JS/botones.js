export function mostrarBotones() {
    action(true);
}

// Función para ocultar el spinner
export function ocultarBotones() {
    action();
}

function action(visible = false) {
    // Mostrar 'btn-edit' y ocultar 'btn-save-all'
    document.getElementById('btn-edit').style.display = visible ? 'flex' : 'none';
    document.getElementById('btn-back').style.display = visible ? 'flex' : 'none';
    document.getElementById('btn-save-all').style.display = visible ? 'none' : 'flex';
    document.getElementById('btn-delete-all').style.display = visible ? 'none' : 'flex';
}
