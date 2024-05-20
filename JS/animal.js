class Animal {
    constructor(id, titulo, transaccion, descripcion, precio, puertas, kilometros, potencia) {
        this.id = id;
        this.titulo = titulo;
        this.transaccion = transaccion;
        this.descripcion = descripcion;
        this.precio = precio;
        this.puertas = puertas;
        this.kilometros = kilometros;
        this.potencia = potencia;
    }

    verify() {

        if (isNaN(this.precio) || parseFloat(this.precio) <= 0) {
            alert("En el precio solo pueden ser números positivos");
            return false;
        }
    
        // Verificación de puertas (debe ser un número entero entre 1 y 8)
        if (isNaN(this.puertas) || !Number.isInteger(parseFloat(this.puertas)) || this.puertas < 1 || this.puertas > 8) {
            alert("Las puertas deben ser un número entero mayor a 0 y menor o igual a 8");
            return false;
        }
    
        // Verificación de kilómetros (debe ser un número entero positivo)
        if (isNaN(this.kilometros) || !Number.isInteger(parseFloat(this.kilometros)) || this.kilometros <= 0) {
            alert("Los kilómetros deben ser un número entero positivo");
            return false;
        }
    
        // Verificación de potencia (debe ser un número entero positivo)
        if (isNaN(this.potencia) || !Number.isInteger(parseFloat(this.potencia)) || this.potencia <= 0) {
            alert("La potencia debe ser un número entero positivo");
            return false;
        }
    
        console.log("todo ok");
        // Si todas las verificaciones pasan, retorna true
        return true;
    }

}

export { Animal };
