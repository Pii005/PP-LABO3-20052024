import { PlanetaBase } from "./PlanetaBase.js";

class Planeta extends PlanetaBase {
    constructor(id, nombre, tamaño, masa, tipo, distancia, presentaVida, anillo, composicion) {
        super(id, nombre, tamaño, masa, tipo); // Llamada al constructor de la clase padre PlanetaBase
        this.distancia = distancia;
        this.presentaVida = presentaVida;
        this.anillo = anillo;
        this.composicion = composicion;
    }
}




export { Planeta };
