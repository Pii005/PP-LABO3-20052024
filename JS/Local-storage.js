

const delay = 2;

export function leer(clave) {
    return new Promise((resolve, reject) => {
    setTimeout(() => {
    try {
        const valor = JSON.parse(localStorage.getItem(clave));
        resolve(valor);
    } 
    catch (error) {
        reject(error);
    }
    }, delay * 1000);
});
}

export function escribir(clave, valor) {
    return new Promise((resolve, reject) => {
    setTimeout(() => {
    try {
        localStorage.setItem(clave, JSON.stringify(valor));
        resolve();
    } catch (error) {
        reject(error);
    }
    }, delay * 1000);
});
}//cambia el valor 

export function limpiar(clave) {
    return new Promise((resolve, reject) => {
    setTimeout(() => {
    try {
        localStorage.removeItem(clave);
        resolve();
    } catch (error) {
        reject(error);
    }
    }, delay * 1000);
});
}
    
// Función para convertir de JSON string a objeto
export function jsonToObject(jsonString) {
    return JSON.parse(jsonString);
}
    
// Función para convertir de objeto a JSON string
export function objectToJson(objeto) {
    return JSON.stringify(objeto);
}




