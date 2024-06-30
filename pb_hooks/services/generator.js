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

function siguienteCapacidad(ruta, demandas, clients, capacidad){
    let cargaTemp = calcularCargaRuta(ruta, demandas);
    let menor = demandas[1];

    for(let k = 1; k <= clients; k++){

        if(ruta.includes(k) == false){
            if(demandas[k] <= menor){
                menor = demandas[k];
            }
        }
    }

    if(cargaTemp + menor > capacidad){
        return true;
    }

    return false;
}

function generarRutas(distanceMatrix, vehicles, clients, demandas, capacidad){
    let rutas = [];
    let copiaRutas = [];
    let savings = [];
    let indGblCpc = 0
    let rutasCreadas = 0

    for(let i=0; i < savings.length; i++){
        let ruta_i = encontrarRuta(rutas, savings[i][1]);
        let ruta_j = encontrarRuta(rutas, savings[i][2]);

        if(ruta_i == null && ruta_j == null){
            nuevaRuta = [0, savings[i][1], savings[i][2], 0];
            if(calcularCargaRuta(nuevaRuta, demandas) <= capacidades[indGblCpc + rutasCreadas]){
                rutas.push(nuevaRuta); 
                if(rutasCreadas + indGblCpc < capacidades.length - 1){
                    rutasCreadas++;
                }
            } 
        }

        else if(ruta_i != null && ruta_j == null){
            let condicion1 = comprobarPuntoInterior(ruta_i, savings[i][1]); 
                
            if(condicion1 == false){
                let condicion2 = comprobarPrimeroLista(rutas, savings[i][1]);
                let totalElementos = rutas.reduce((cont,ruta) => cont + ruta.length, 0);
                let longitudRutas = rutas.length;
                rutas.splice(rutas.indexOf(ruta_i), 1);
                if(condicion2 == true){
                    let nuevaRuta = [0, savings[i][2]].concat(ruta_i.slice(1));
                    if(calcularCargaRuta(nuevaRuta, demandas) <= capacidades[indGblCpc]){
                        rutas.push(nuevaRuta);
                    } else if(totalElementos == (clients + 2*longitudRutas) - 1){
                        rutas.push(ruta_i);
                        rutas.push([0, savings[i][2], 0]);
                    } else{
                        rutas.push(ruta_i);
                    }
                    
                } else{
                    let nuevaRuta = ruta_i.slice(0,-1).concat([savings[i][2], 0]);
                    if(calcularCargaRuta(nuevaRuta, demandas) <= capacidades[indGblCpc]){
                        rutas.push(nuevaRuta);
                    } else if(totalElementos == (clients + 2*longitudRutas) - 1){
                        rutas.push(ruta_i);
                        rutas.push([0, savings[i][2], 0]);
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
                let totalElementos = rutas.reduce((cont,ruta) => cont + ruta.length, 0);
                let longitudRutas = rutas.length;
                rutas.splice(rutas.indexOf(ruta_j), 1);
                if(condicion2 == true){
                    let nuevaRuta  = [0, savings[i][1]].concat(ruta_j.slice(1));
                    if(calcularCargaRuta(nuevaRuta, demandas) <= capacidades[indGblCpc]){
                        rutas.push(nuevaRuta);
                    } else if(totalElementos == (clients + 2*longitudRutas) - 1){
                        rutas.push(ruta_j);
                        rutas.push([0, savings[i][1], 0]);
                    } else{
                        rutas.push(ruta_j);
                    }
                } else{
                    let nuevaRuta = ruta_j.slice(0,-1).concat([savings[i][1], 0]);
                    if(calcularCargaRuta(nuevaRuta, demandas) <= capacidades[indGblCpc]){
                        rutas.push(nuevaRuta);
                    } else if(totalElementos == (clients + 2*longitudRutas) - 1){
                        rutas.push(ruta_j);
                        rutas.push([0, savings[i][1], 0]);
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
                    if(calcularCargaRuta(nuevaRuta, demandas) <= capacidades[indGblCpc]){
                        rutas.push(nuevaRuta);
                    } else{
                        rutas.push(ruta_i);
                        rutas.push(ruta_j);
                    }
                    
                } else if (condicion3 == false && condicion4 == true){
                    let nuevaRuta = ruta_i.slice(0,-1).concat(ruta_j.slice(1));
                    if(calcularCargaRuta(nuevaRuta, demandas) <= capacidades[indGblCpc]){
                        rutas.push(nuevaRuta);
                    } else{
                        rutas.push(ruta_i);
                        rutas.push(ruta_j);
                        
                    }
                } else{
                    let nuevaRuta = ruta_i.slice(0,-1).concat(ruta_j.slice(1));
                    if(calcularCargaRuta(nuevaRuta, demandas) <= capacidades[indGblCpc]){
                        rutas.push(nuevaRuta);
                    } else{
                        rutas.push(ruta_i);
                        rutas.push(ruta_j);
                    }
                }
            }
        }

        for(let j = 0; j < rutas.length; j++){
            if(siguienteCapacidad(rutas[j], demandas, clients, capacidades[indGblCpc])){
                let band = copiaRutas.some(copiaElement => JSON.stringify(copiaElement) === JSON.stringify(rutas[j]));

                if(band == false){
                    if(indGblCpc < capacidades.length - 1){
                        indGblCpc++;
                        rutasCreadas = 0;
                    }
                    copiaRutas.push(rutas[j]);
                }
            }
        }
    }
    
    // console.log(savings);
    // console.log(rutas);
    // console.log(distanciaRutas(rutas, distanceMatrix));
    // if(rutas.length <= vehicles){
    //     console.log("La empresa tiene suficientes vehículos");
    // } else{
    //     console.log("La empresa no tiene suficientes vehículos");
    // }

    return rutas
}

module.exports = generarRutas