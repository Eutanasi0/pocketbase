/*function clientesAtender(rutas, clients){

    let clientesVisitados = [];
    for(let i = 0; i < rutas.length; i++){
        for(let j = 1; j <= clients; j++){
            if(rutas[i].includes(j) && !clientesVisitados.includes(j)){
                clientesVisitados.push(j);
            }
        }
    }

    return (clientesVisitados.length == clients);
}*/

function encontrarRuta(rutas, cliente){
    for(let i = 0; i < rutas.length; i++){
        if(rutas[i].includes(cliente)){
            return rutas[i];
        }
    }
    return null;
}

function comprobarPuntoInterior(rutas, cliente){
    let indice = -1;

    for(let i = 0; i < rutas.length; i++){
        if(rutas[i].includes(cliente)){
            indice = rutas[i].indexOf(cliente);
            if(indice == 1 || indice == rutas[i].length - 2){
                return false;
            } else{
                return true;
            }
        }
    }
}

function comprobarPrimeroLista(rutas, cliente){
    for(let i = 0; i < rutas.length; i++){
        if(rutas[i][1] == cliente){
            return true;
        }
    }
    return false;
}

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

    for(let i = 1; i <= vehicles; i++){
        if( i <= clients){
            rutas.push([0, i, 0]);
        } else{
            rutas.push([0, 0]);
        }
    }


    for(let i = 1; i < clients; i++){
        for(let j = i+1; j <= clients; j++){
            let saving = distanceMatrix[0][i] + distanceMatrix[0][j] - distanceMatrix[i][j];
            savings.push([saving, i, j]);
        }
    }

    savings.sort((a, b) => b[0] - a[0]);


    for(let i=0; i < savings.length; i++){
        if(rutas.length >= vehicles){
            let ruta_i = encontrarRuta(rutas, savings[i][1]);
            let ruta_j = encontrarRuta(rutas, savings[i][2]);
            
            if(ruta_i == null && ruta_j == null){
                nuevaRuta = [0, savings[i][1], savings[i][2], 0];
                if(calcularCargaRuta(nuevaRuta, demandas) <= capacidad){
                    rutas.push(nuevaRuta); 
                }   
            }

            else if(ruta_i != null && ruta_j == null){
                let condicion1 = comprobarPuntoInterior(rutas, savings[i][1]); 
                
                if(condicion1 == false){
                    let condicion2 = comprobarPrimeroLista(rutas, savings[i][1]);
                    rutas.splice(rutas.indexOf(ruta_i), 1);
                    if(condicion2 == true && ruta_i.length != 3){
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
                let condicion1 = comprobarPuntoInterior(rutas, savings[i][2]);

                if(condicion1 == false){
                    let condicion2 = comprobarPrimeroLista(rutas, savings[i][2]);
                    rutas.splice(rutas.indexOf(ruta_j), 1);
                    if(condicion2 == true && ruta_j.length != 3){
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
                let condicion1 = comprobarPuntoInterior(rutas, savings[i][1]);
                let condicion2 = comprobarPuntoInterior(rutas, savings[i][2]);

                if(condicion1 == false && condicion2 == false){
                    let condicion3 = comprobarPrimeroLista(rutas, savings[i][1]);
                    let condicion4 = comprobarPrimeroLista(rutas, savings[i][2]);

                    rutas.splice(rutas.indexOf(ruta_i), 1);
                    rutas.splice(rutas.indexOf(ruta_j), 1);

                    if(condicion3 == true && condicion4 == false){
                        let nuevaRuta = ruta_j.slice(0,-1).concat(ruta_i.slice(1));
                        if(calcularCargaRuta(nuevaRuta, demandas) <= capacidad){
                            rutas.push(nuevaRuta);
                            if(rutas.length < vehicles){
                                rutas.pop();
                                rutas.push(ruta_i);
                                rutas.push(ruta_j);
                            }
                        } else{
                            rutas.push(ruta_i);
                            rutas.push(ruta_j);
                        }
                        
                    } else if (condicion3 == false && condicion4 == true){
                        let nuevaRuta = ruta_i.slice(0,-1).concat(ruta_j.slice(1));
                        if(calcularCargaRuta(nuevaRuta, demandas) <= capacidad){
                            rutas.push(nuevaRuta);
                            if(rutas.length < vehicles){
                                rutas.pop();
                                rutas.push(ruta_i);
                                rutas.push(ruta_j);
                            }
                        } else{
                            rutas.push(ruta_i);
                            rutas.push(ruta_j);
                        
                        }
                    } else{
                        let nuevaRuta = ruta_i.slice(0,-1).concat(ruta_j.slice(1));
                        if(calcularCargaRuta(nuevaRuta, demandas) <= capacidad){
                            rutas.push(nuevaRuta);
                            if(rutas.length < vehicles){
                                rutas.pop();
                                rutas.push(ruta_i);
                                rutas.push(ruta_j);
                            }
                        } else{
                            rutas.push(ruta_i);
                            rutas.push(ruta_j);
                        }
                    }
                }
            }
            if(rutas.length > vehicles){
                rutas.pop();
            }
            //clientesAtendidos = clientesAtender(rutas, clients);
            //console.log(rutas);
        }
    }
    console.log(savings);
    console.log(rutas);
}

const matriz = [
    [0, 2, 9, 10, 7, 4, 8, 5],
    [2, 0, 6, 12, 8, 9, 10, 6],
    [9, 6, 0, 3, 6, 9, 4, 9],
    [10, 12, 3, 0, 11, 12, 5, 11],
    [7, 8, 6, 11, 0, 8, 9, 8],
    [4, 9, 9, 12, 8, 0, 7, 6],
    [8, 10, 4, 5, 9, 7, 0, 5],
    [5, 6, 9, 11, 8, 6, 5, 0]
    ]

const demandas = [0, 2, 4, 2, 5, 1, 3, 1]
const capacidad = 7
const vehicles = 3
const clients = 7

generarRutas(matriz, vehicles, clients, demandas, capacidad)