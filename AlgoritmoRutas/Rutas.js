/*

Esto de aquí es para la función distanciaRutas

Funcion .map
Se utilizamos el método map para iterar sobre
cada ruta en el array rutas esto es para transformar cada ruta en su distancia total de manera
más eficiente y no se ve un bucle pero si lo hay xdd


Funcion .reduce
El método reduce para calcular la distancia total de cada ruta. 
Este método itera sobre los puntos de la ruta (excepto el último punto, ya que slice(0, -1)
lo excluye) y acumula la distancia total sumando las distancias entre puntos consecutivos, utilizando la matriz de distancias.

Estos son métodos de orden superior y en teoría son más eficientes que los bucles for anidados

Además según gpeton dice que tiene una notación de O(m) y el que me hiciste
es O(n * m) donde n es el número de rutas y m es la longitud promedio de cada ruta.


En cambio el mio solo calcula la logitud de ruta y no tiene que hacer el proceso engorroso 
*/


function distanciaRutas(rutas, matriz) {
    return rutas.map(ruta => ruta.slice(0, -1).reduce((distancia, punto, index) => distancia + matriz[punto][ruta[index + 1]], 0));
}

/*
Aquí solo encontré que find es lo mismo que hacer un bucle
pero se ve más bonito xdd
*/

function encontrarRuta(rutas, cliente) {
    return rutas.find(ruta => ruta.includes(cliente)) || null;
}


/*
Esto de aquí es lo mismo que hacer un bucle for solo que utilizo el método indexOf
dale una revisada si no entiendes
*/

function comprobarPuntoInterior(ruta, cliente) {
    const indice = ruta.indexOf(cliente);
    return indice > 1 && indice < ruta.length - 2;
}


/* 
La función some recorre las rutas y devuelve true
cuando encuentre una ruta en la que el segundo elemento 
(índice 1) sea igual al cliente. 
Si no encuentra, devuelve false.
*/


function comprobarPrimeroLista(rutas, cliente) {
    return rutas.some(ruta => ruta[1] === cliente);
}  //Utilizamos el método some es mucho más eficaz que hacer un bucle for xddd


//Esto no sabría cómo hacerlo, no encontré nada para poder hacerlo de manera más eficiente
//Si encuentras algo me avisas

function calcularCargaRuta(ruta, demandas){
    let cargaT = 0;
    for(let i = 1; i < ruta.length - 1; i++){
        cargaT += demandas[ruta[i]];
    }
    return cargaT;
}

function generarRutas(distanceMatrix, vehicles, clients, demandas, capacidad){
    let rutas = [];
    let savings = [];
    //let clientesAtendidos = false;

    for(let i = 1; i < clients; i++){
        for(let j = i+1; j <= clients; j++){
            let a = Math.max(i, j);
            let b = Math.min(i, j);
            let saving = distanceMatrix[0][i] + distanceMatrix[0][j] - distanceMatrix[i][j];
            savings.push([saving, a, b]);
        }
    }

    savings.sort((a, b) => b[0] - a[0]);


    for(let i=0; i < savings.length; i++){
        let ruta_i = encontrarRuta(rutas, savings[i][1]);
        let ruta_j = encontrarRuta(rutas, savings[i][2]);
            
        if(ruta_i == null && ruta_j == null){
            nuevaRuta = [0, savings[i][1], savings[i][2], 0];
            if(calcularCargaRuta(nuevaRuta, demandas) <= capacidad){
                rutas.push(nuevaRuta); 
            }   
        }

        else if(ruta_i != null && ruta_j == null){
            let condicion1 = comprobarPuntoInterior(ruta_i, savings[i][1]); 
                
            if(condicion1 == false){
                let condicion2 = comprobarPrimeroLista(rutas, savings[i][1]);
                rutas.splice(rutas.indexOf(ruta_i), 1);
                if(condicion2 == true){
                    let nuevaRuta = [0, savings[i][2]].concat(ruta_i.slice(1));
                    if(calcularCargaRuta(nuevaRuta, demandas) <= capacidad){
                        rutas.push(nuevaRuta);
                    } else{
                        rutas.push(ruta_i);
                    }
                    
                } else{
                    let nuevaRuta = ruta_i.slice(0,-1).concat([savings[i][2], 0]);
                    if(calcularCargaRuta(nuevaRuta, demandas) <= capacidad){
                        rutas.push(nuevaRuta);
                    } else{
                        rutas.push(ruta_i);
                        
                    }
                }
            }
        }

        else if(ruta_i == null && ruta_j != null){
            let condicion1 = comprobarPuntoInterior(ruta_j, savings[i][2]);

            if(condicion1 == false){
                let condicion2 = comprobarPrimeroLista(rutas, savings[i][2]);
                rutas.splice(rutas.indexOf(ruta_j), 1);
                if(condicion2 == true){
                    let nuevaRuta  = [0, savings[i][1]].concat(ruta_j.slice(1));
                    if(calcularCargaRuta(nuevaRuta, demandas) <= capacidad){
                        rutas.push(nuevaRuta);
                    } else{
                        rutas.push(ruta_j);
                    }
                } else{
                    let nuevaRuta = ruta_j.slice(0,-1).concat([savings[i][1], 0]);
                    if(calcularCargaRuta(nuevaRuta, demandas) <= capacidad){
                        rutas.push(nuevaRuta);
                    } else{
                        rutas.push(ruta_j);
                    }
                        
                }
            }
        }

        if(ruta_i != null && ruta_j != null && ruta_i != ruta_j){
            let condicion1 = comprobarPuntoInterior(ruta_i, savings[i][1]);
            let condicion2 = comprobarPuntoInterior(ruta_j, savings[i][2]);

            if(condicion1 == false && condicion2 == false){
                let condicion3 = comprobarPrimeroLista(rutas, savings[i][1]);
                let condicion4 = comprobarPrimeroLista(rutas, savings[i][2]);

                rutas.splice(rutas.indexOf(ruta_i), 1);
                rutas.splice(rutas.indexOf(ruta_j), 1);

                if(condicion3 == true && condicion4 == false){
                    let nuevaRuta = ruta_j.slice(0,-1).concat(ruta_i.slice(1));
                    if(calcularCargaRuta(nuevaRuta, demandas) <= capacidad){
                        rutas.push(nuevaRuta);
                    } else{
                        rutas.push(ruta_i);
                        rutas.push(ruta_j);
                    }
                    
                } else if (condicion3 == false && condicion4 == true){
                    let nuevaRuta = ruta_i.slice(0,-1).concat(ruta_j.slice(1));
                    if(calcularCargaRuta(nuevaRuta, demandas) <= capacidad){
                        rutas.push(nuevaRuta);
                    } else{
                        rutas.push(ruta_i);
                        rutas.push(ruta_j);
                        
                    }
                } else{
                    let nuevaRuta = ruta_i.slice(0,-1).concat(ruta_j.slice(1));
                    if(calcularCargaRuta(nuevaRuta, demandas) <= capacidad){
                        rutas.push(nuevaRuta);
                    } else{
                        rutas.push(ruta_i);
                        rutas.push(ruta_j);
                    }
                }
            }
        }
    }
    
    console.log(savings);
    console.log(rutas);
    console.log(distanciaRutas(rutas, distanceMatrix));
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
]

const demandas = [0, 4, 6, 5, 4, 7, 3, 5, 4, 4]
const capacidad = 23
const vehicles = 3
const clients = 9

generarRutas(matriz, vehicles, clients, demandas, capacidad)