def invertir(acorde,numero_inversion):

    inverion = list(acorde)
    for i in range(numero_inversion):
        inverion.append(inverion.pop(0))

    return inverion

def notas_iguales_entre_acordes(acorde1,acorde2):
    notas = [nota for nota in acorde1 if nota in acorde2]
    return notas

def calcular_inversion_necesaria(acorde_fijo,acorde_a_invertir,notas_iguales):
    desplazamiento_notas = acorde_fijo.index(notas_iguales[0]) - acorde_a_invertir.index(notas_iguales[0])  # diferencia entre posicion de acorde anterior con actual en cuanto a nota igual
    if desplazamiento_notas == 0:
        return 0

    numero_inversion = 1 if desplazamiento_notas in (2,-1) else 2 # numero de inversion segun diferencia de posicion

    return numero_inversion

def inversiones_misma_nota(acordes_a_tocar,notas,acordes):

    acordes_a_tocar = [{'nombre':nombre, 'notas': acordes[nombre]} for nombre in acordes_a_tocar]
    for index, acorde in enumerate(acordes_a_tocar):
        notas_acorde = acorde['notas']
        nombre_acorde = acorde['nombre']

        if index == 0:
            print(nombre_acorde, [notas[nota] for nota in notas_acorde], 'estado fundamental')
            continue

        notas_acorde_anterior = acordes_a_tocar[index-1]['notas']
        notas_iguales = notas_iguales_entre_acordes(notas_acorde,notas_acorde_anterior)
        
        if notas_iguales:
            
            numero_inversion = calcular_inversion_necesaria(acorde_fijo= notas_acorde_anterior,acorde_a_invertir= notas_acorde,notas_iguales=notas_iguales)
            
            acorde_invertido = invertir(notas_acorde,numero_inversion)
            acorde['notas'] = acorde_invertido  # modifico el acorde para que la proxima vez calcule en base a esta inversion

            nombre_inversion = 'Estado fundamental'
            if(numero_inversion==1):
                nombre_inversion = 'Primera inversion'
            elif(numero_inversion==2):
                nombre_inversion = 'Segunda inversion'
            

            print(nombre_acorde, [notas[nota] for nota in acorde_invertido], nombre_inversion)
        else:
            print(nombre_acorde, [notas[nota] for nota in notas_acorde], 'Estado fundamental')


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

