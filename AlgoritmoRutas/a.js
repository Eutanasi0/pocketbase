function distanciaRutas(rutas, matriz) {
    return rutas.map(ruta => ruta.slice(0, -1).reduce((distancia, punto, index) => distancia + matriz[punto][ruta[index + 1]], 0));
}

function encontrarRuta(rutas, cliente) {
    return rutas.find(ruta => ruta.includes(cliente)) || null;
}

function comprobarPuntoInterior(ruta, cliente) {
    const indice = ruta.indexOf(cliente);
    return indice > 1 && indice < ruta.length - 2;
}

function comprobarPrimeroLista(ruta, cliente) {
    return ruta[1] === cliente;
}

function calcularCargaRuta(ruta, demandas) {
    return ruta.slice(1, -1).reduce((carga, cliente) => carga + demandas[cliente], 0);
}

function combinarRutas(ruta1, ruta2, demandas, capacidad) {
    const nuevaRuta = [...ruta1.slice(0, -1), ...ruta2.slice(1)];
    return calcularCargaRuta(nuevaRuta, demandas) <= capacidad ? nuevaRuta : null;
}

function calcularSavings(distanceMatrix, clients) {
    let savings = [];
    for (let i = 1; i < clients; i++) {
        for (let j = i + 1; j <= clients; j++) {
            const saving = distanceMatrix[0][i] + distanceMatrix[0][j] - distanceMatrix[i][j];
            savings.push([saving, i, j]);
        }
    }
    savings.sort((a, b) => b[0] - a[0]);
    return savings;
}

function generarRutas(distanceMatrix, vehicles, clients, demandas, capacidad) {
    let rutas = Array.from({ length: clients }, (_, i) => (i < vehicles ? [0, i + 1, 0] : null)).filter(r => r);
    let savings = calcularSavings(distanceMatrix, clients);

    for (const [saving, a, b] of savings) {
        let rutaA = encontrarRuta(rutas, a);
        let rutaB = encontrarRuta(rutas, b);

        if (!rutaA && !rutaB) {
            const nuevaRuta = [0, a, b, 0];
            if (calcularCargaRuta(nuevaRuta, demandas) <= capacidad) rutas.push(nuevaRuta);
        } else if (rutaA && !rutaB && !comprobarPuntoInterior(rutaA, a)) {
            rutas = rutas.filter(r => r !== rutaA);
            const nuevaRuta = comprobarPrimeroLista(rutaA, a)
                ? [0, b, ...rutaA.slice(1)]
                : [...rutaA.slice(0, -1), b, 0];
            if (calcularCargaRuta(nuevaRuta, demandas) <= capacidad) rutas.push(nuevaRuta);
            else rutas.push(rutaA);
        } else if (!rutaA && rutaB && !comprobarPuntoInterior(rutaB, b)) {
            rutas = rutas.filter(r => r !== rutaB);
            const nuevaRuta = comprobarPrimeroLista(rutaB, b)
                ? [0, a, ...rutaB.slice(1)]
                : [...rutaB.slice(0, -1), a, 0];
            if (calcularCargaRuta(nuevaRuta, demandas) <= capacidad) rutas.push(nuevaRuta);
            else rutas.push(rutaB);
        } else if (rutaA && rutaB && rutaA !== rutaB && !comprobarPuntoInterior(rutaA, a) && !comprobarPuntoInterior(rutaB, b)) {
            rutas = rutas.filter(r => r !== rutaA && r !== rutaB);
            const nuevaRuta = comprobarPrimeroLista(rutaA, a) ? combinarRutas(rutaA, rutaB, demandas, capacidad) : combinarRutas(rutaB, rutaA, demandas, capacidad);
            if (nuevaRuta) rutas.push(nuevaRuta);
            else rutas.push(rutaA, rutaB);
        }
    }

    return {
        savings: savings,
        rutas: rutas,
        distancias: distanciaRutas(rutas, distanceMatrix)
    };
}

const matriz = [
    [0, 25, 43, 57, 43, 61, 29, 41, 48, 71],
    [25, 0, 29, 34, 43, 68, 49, 66, 72, 91],
    [43, 29, 0, 52, 72, 96, 72, 81, 89, 114],
    [57, 34, 52, 0, 45, 71, 71, 95, 99, 108],
    [43, 43, 72, 45, 0, 27, 36, 65, 65 ,65],
    [61, 68, 96, 71, 27, 0, 40, 66, 62, 46],
    [29, 49, 72, 71, 36, 40, 0, 31, 31, 43],
    [41, 66, 81, 95, 65, 66, 31, 0, 11, 46],
    [48, 72, 89, 99, 65, 62, 31, 11, 0, 36],
    [71, 91, 114, 108, 65, 46, 43, 46, 36, 0]
];

const demandas = [0, 4, 6, 5, 4, 7, 3, 5, 4, 4];
const capacidad = 23;
const vehicles = 3;
const clients = 9;

const resultado = generarRutas(matriz, vehicles, clients, demandas, capacidad);
console.log(resultado.savings);
console.log(resultado.rutas);
console.log(resultado.distancias);
