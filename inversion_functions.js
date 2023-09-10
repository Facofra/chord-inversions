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

const notas_bemoles = {
    1:'C',
    2:'Db',
    3:'D',
    4:'Eb',
    5:'E',
    6:'F',
    7:'Gb',
    8:'G',
    9:'Ab',
    10:'A',
    11:'Bb',
    12:'B'
}

const acordes_con_bemoles = [
    'F',
    'Bb',
    'Eb',
    'Ab',
    'Dm',
    'Gm',
    'Cm',
    'Fm',
]

const notas_de_acordes = {'C':['C','E','G'],
'C#':['C#','E#','G#'],
'D':['D','F#','A'],
'Eb':['Eb','G','Bb'],
'E':['E','G#','B'],
'F':['F','A','C'],
'F#':['F#','A#','C#'],
'G':['G','B','D'],
'Ab':['Ab','C','Eb'],
'A':['A','C#','E'],
'Bb':['Bb','D','F'],
'B':['B','D#','F#'],
'Cm':['C','Eb','G'],
'C#m':['C#','E','G#'],
'Dm':['D','F','A'],
'D#m':['D#','F#','A#'],
'Em':['E','G','B'],
'Fm':['F','Ab','C'],
'F#m':['F#','A','C#'],
'Gm':['G','Bb','D'],
'G#m':['G#','B','D#'],
'Am':['A','C','E'],
'A#m':['A#','C#','E#'],
'Bm':['B','D','F#']}


const acordes = {
    // MAYORES
    'C':[1,5,8],
    'C#':[2,6,9],
    'Db':[2,6,9],
    'D':[3,7,10],
    'D#':[4,8,11],
    'Eb':[4,8,11],
    'E':[5,9,12],
    'F':[6,10,1],
    'F#':[7,11,2],
    'Gb':[7,11,2],
    'G':[8,12,3],
    'G#':[9,1,4],
    'Ab':[9,1,4],
    'A':[10,2,5],
    'A#':[11,3,6],
    'Bb':[11,3,6],
    'B':[12,4,7], 

    // MENORES
    'Cm':[1,4,8],
    'C#m':[2,5,9],
    'Dbm':[2,5,9],
    'Dm':[3,6,10],
    'D#m':[4,7,11],
    'Ebm':[4,7,11],
    'Em':[5,8,12],
    'Fm':[6,9,1],
    'F#m':[7,10,2],
    'Gbm':[7,10,2],
    'Gm':[8,11,3],
    'G#m':[9,12,4],
    'Abm':[9,12,4],
    'Am':[10,1,5],
    'A#m':[11,2,6],
    'Bbm':[11,2,6],
    'Bm':[12,3,7], 

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
            resultado.push({'nombreAcorde':nombreAcorde,'notasAcorde':notas_de_acordes[nombreAcorde],'nombreInversion':'Estado fundamental'})
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

        resultado.push({'nombreAcorde':nombreAcorde,'notasAcorde':invertir(notas_de_acordes[nombreAcorde],minimaInversion),'nombreInversion':nombreInversion})
    }
    return resultado
}

function formatear_notas(array_notas){
    let result = ""
    for (const nota of array_notas) {
        let espacios_agregar = " ".repeat(3-nota.length)
        result = result + nota + espacios_agregar
    }
    return result
}
