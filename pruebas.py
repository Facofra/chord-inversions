# def encontrar_mas_cercano(numero, lista):
#     min_distancia = float('inf')
#     numero_mas_cercano = None
    
#     for num in lista:
#         distancia = min(abs((num - numero) % 12), abs((numero - num) % 12))
#         if distancia < min_distancia:
#             min_distancia = distancia
#             numero_mas_cercano = num
            
#     return numero_mas_cercano

# numero = 3
# lista = [11,8]
# numero_cercano = encontrar_mas_cercano(numero, lista)
# print("El número más cercano a", numero, "es:", numero_cercano)


distancia = min(abs((12 - 1) % 12), abs((1 - 12) % 12))

print(distancia)
