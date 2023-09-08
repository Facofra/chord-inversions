def invertir(acorde,numero_inversion):

    inverion = list(acorde)
    for i in range(numero_inversion):
        inverion.append(inverion.pop(0))

    return inverion

def calcular_distancia_entre_notas(nota1,nota2,total_notas=12):
    distancia = min(abs(nota1-nota2),total_notas-abs(nota1-nota2))
    return distancia

def calcular_movimientos_por_inversion(notas_acorde,notas_acorde_anterior):
    movimientos_por_inversion = [0,0,0]

    for i, nota in enumerate(notas_acorde):
        total_movimientos = 0
        notas_acorde_actual = invertir(notas_acorde,i)
        for j, nota_anterior in enumerate(notas_acorde_anterior):
            total_movimientos += calcular_distancia_entre_notas(nota1=notas_acorde_actual[j],nota2=notas_acorde_anterior[j])
        movimientos_por_inversion[i] = total_movimientos

    return movimientos_por_inversion

def inversiones_menor_movimiento(acordes_a_tocar,notas,acordes):
    acordes_a_tocar = [{'nombre':nombre, 'notas': acordes[nombre]} for nombre in acordes_a_tocar]

    for index, acorde in enumerate(acordes_a_tocar):
        notas_acorde = acorde['notas']
        nombre_acorde = acorde['nombre']

        if index == 0:
            print(nombre_acorde, [notas[nota] for nota in notas_acorde], 'Estado fundamental')
            continue
        notas_acorde_anterior = acordes_a_tocar[index-1]['notas']
        
        
        movimientos_por_inversion = calcular_movimientos_por_inversion(notas_acorde,notas_acorde_anterior) # devuelve array indicando cuantos movimientos requiere cada inversion respecto al acorde anterior
        minima_inversion = movimientos_por_inversion.index(min(movimientos_por_inversion)) # en base a los movimientos, devuelve indice del menor, que coincide con numero de inversion

        acorde_invertido = invertir(notas_acorde,minima_inversion) 
        acorde['notas'] = acorde_invertido
                
        nombre_inversion = 'Estado fundamental' if minima_inversion == 0 else 'Primera inversion' if minima_inversion == 1 else 'Segunda inversion'
       
        print(nombre_acorde, [notas[nota] for nota in acorde_invertido], nombre_inversion)
        




notas = {
    1:'c',
    2:'c#',
    3:'d',
    4:'d#',
    5:'e',
    6:'f',
    7:'f#',
    8:'g',
    9:'g#',
    10:'a',
    11:'a#',
    12:'b'
}

acordes = {
    # MAYORES
    'c':[1,5,8],
    'c#':[2,6,9],
    'd':[3,7,10],
    'd#':[4,8,11],
    'e':[5,9,12],
    'f':[6,10,1],
    'f#':[7,11,2],
    'g':[8,12,3],
    'g#':[9,1,4],
    'a':[10,2,5],
    'a#':[11,3,6],
    'b':[12,4,7], 
    # MENORES
    'cm':[1,4,8],
    'c#m':[2,5,9],
    'dm':[3,6,10],
    'd#m':[4,7,11],
    'em':[5,8,12],
    'fm':[6,9,1],
    'f#m':[7,10,2],
    'gm':[8,11,3],
    'g#m':[9,12,4],
    'am':[10,1,5],
    'a#m':[11,2,6],
    'bm':[12,3,7], 
}

acordes_a_tocar = [
    'gm',
    'cm',
    'f',
    'a#',
    'd#',
    'cm'
    ]


        
inversiones_menor_movimiento(acordes_a_tocar,notas,acordes)

