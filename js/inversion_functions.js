function invertir(acorde, numeroInversion) {
    const inversion = [...acorde]

    for (let i = 0; i < numeroInversion; i++) {
        inversion.push(inversion.shift());
    }

    return inversion;
}

function calcularDistanciaEntreNotas(nota1, nota2, totalNotas = 12) {
    const distancia = Math.min(Math.abs(nota1 - nota2), totalNotas - Math.abs(nota1 - nota2));
    return distancia;
}

function calcularMovimientosPorInversion(notasAcorde, notasAcordeAnterior) {

    const movimientosPorInversion = [0, 0, 0];

    for (let i = 0; i < notasAcorde.length; i++) {
        let totalMovimientos = 0;
        const notasAcordeActual = invertir(notasAcorde.slice(), i);

        for (let j = 0; j < notasAcordeAnterior.length; j++) {
            totalMovimientos += calcularDistanciaEntreNotas(notasAcordeActual[j], notasAcordeAnterior[j]);
        }

        movimientosPorInversion[i] = totalMovimientos;
    }

    return movimientosPorInversion;
}


const notas = {
    1:'C',
    2:'C#',
    3:'D',
    4:'D#',
    5:'E',
    6:'F',
    7:'F#',
    8:'G',
    9:'G#',
    10:'A',
    11:'A#',
    12:'B'
}

// const notas = {
//     1:'DO',
//     2:'DO#',
//     3:'RE',
//     4:'RE#',
//     5:'MI',
//     6:'FA',
//     7:'FA#',
//     8:'SOL',
//     9:'SOL#',
//     10:'LA',
//     11:'LA#',
//     12:'SI'
// }

const acordes = {
    // MAYORES
    'C':[1,5,8],
    'C#':[2,6,9],
    'D':[3,7,10],
    'D#':[4,8,11],
    'E':[5,9,12],
    'F':[6,10,1],
    'F#':[7,11,2],
    'G':[8,12,3],
    'G#':[9,1,4],
    'A':[10,2,5],
    'A#':[11,3,6],
    'B':[12,4,7], 

    'DO':[1,4,8],
    'DO#':[2,5,9],
    'RE':[3,6,10],
    'RE#':[4,7,11],
    'MI':[5,8,12],
    'FA':[6,9,1],
    'FA#':[7,10,2],
    'SOL':[8,11,3],
    'SOL#':[9,12,4],
    'LA':[10,1,5],
    'LA#':[11,2,6],
    'SI':[12,3,7], 

    // MENORES
    'Cm':[1,4,8],
    'C#m':[2,5,9],
    'Dm':[3,6,10],
    'D#m':[4,7,11],
    'Em':[5,8,12],
    'Fm':[6,9,1],
    'F#m':[7,10,2],
    'Gm':[8,11,3],
    'G#m':[9,12,4],
    'Am':[10,1,5],
    'A#m':[11,2,6],
    'Bm':[12,3,7], 

    'DOm':[1,4,8],
    'DO#m':[2,5,9],
    'REm':[3,6,10],
    'RE#m':[4,7,11],
    'MIm':[5,8,12],
    'FAm':[6,9,1],
    'FA#m':[7,10,2],
    'SOLm':[8,11,3],
    'SOL#m':[9,12,4],
    'LAm':[10,1,5],
    'LA#m':[11,2,6],
    'SIm':[12,3,7], 
}

function inversionesMenorMovimiento(acordes_input) {
    
    let acordesATocar = [...acordes_input]
    let resultado  = [];
    acordesATocar = acordesATocar.map(nombre => ({ nombre: nombre, notas: acordes[nombre] }));
    for (let index = 0; index < acordesATocar.length; index++) {
        const acorde = acordesATocar[index];
        const notasAcorde = acorde.notas;
        const nombreAcorde = acorde.nombre;
        if (index === 0) {
            resultado.push({'nombreAcorde':nombreAcorde,'notasAcorde':notasAcorde.map(nota => notas[nota]),'nombreInversion':'Estado fundamental'})
            continue;
        }

        const notasAcordeAnterior = acordesATocar[index - 1].notas;

        const movimientosPorInversion = [0, 0, 0];

        for (let i = 0; i < notasAcorde.length; i++) {
            let totalMovimientos = 0;
            const notasAcordeActual = invertir(notasAcorde.slice(), i);

            for (let j = 0; j < notasAcordeAnterior.length; j++) {
                totalMovimientos += calcularDistanciaEntreNotas(notasAcordeActual[j], notasAcordeAnterior[j]);
            }

            movimientosPorInversion[i] = totalMovimientos;
        }

        const minimaInversion = movimientosPorInversion.indexOf(Math.min(...movimientosPorInversion));

        const acordeInvertido = invertir(notasAcorde.slice(), minimaInversion);
        acorde.notas = acordeInvertido;

        const nombreInversion = minimaInversion === 0 ? 'Estado fundamental' : minimaInversion === 1 ? 'Primera inversion' : 'Segunda inversion';

        resultado.push({'nombreAcorde':nombreAcorde,'notasAcorde':acordeInvertido.map(nota => notas[nota]),'nombreInversion':nombreInversion})
    }
    return resultado
}

// acordes_a_tocar = [
//     'DO',
//     'FA#',
//     'LA#',
//     ]
    
// console.log(inversionesMenorMovimiento(acordes_a_tocar))
