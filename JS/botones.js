export function ocultarBotones() {
    document.getElementById('btn-edit').style.display = 'none';
    document.getElementById('btn-back').style.display = 'none';
    document.getElementById('btn-save-all').style.display = 'flex';
    document.getElementById('btn-delete-all').style.display = 'flex';
}

export function mostrarBotones() {
    document.getElementById('btn-edit').style.display = 'flex';
    document.getElementById('btn-back').style.display = 'flex';
    document.getElementById('btn-save-all').style.display = 'none';
    document.getElementById('btn-delete-all').style.display = 'none';
}
