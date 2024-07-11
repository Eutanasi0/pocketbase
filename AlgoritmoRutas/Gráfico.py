import matplotlib.pyplot as plt
import networkx as nx

# Datos del problema
distance_matrix = [
    [0, 25, 43, 57, 43, 61, 29, 41, 48, 71],
    [25, 0, 29, 34, 43, 68, 49, 66, 72, 91],
    [43, 29, 0, 52, 72, 96, 72, 81, 89, 114],
    [57, 34, 52, 0, 45, 71, 71, 95, 99, 108],
    [43, 43, 72, 45, 0, 27, 36, 65, 65, 65],
    [61, 68, 96, 71, 27, 0, 40, 66, 62, 46],
    [29, 49, 72, 71, 36, 40, 0, 31, 31, 43],
    [41, 66, 81, 95, 65, 66, 31, 0, 11, 46],
    [48, 72, 89, 99, 65, 62, 31, 11, 0, 36],
    [71, 91, 114, 108, 65, 46, 43, 46, 36, 0]
]

ventanas_tiempo = [
    (0, 1000), (10, 50), (20, 60), (30, 70), (40, 80),
    (50, 90), (60, 100), (70, 110), (80, 120), (90, 130)
]

distancia_rutas = [108, 100, 116, 178]
vehicles = 3

# Crear el gráfico
G = nx.DiGraph()

# Agregar nodos con ventanas de tiempo
for i in range(len(distance_matrix)):
    G.add_node(i, label=f'{i}\nTW: {ventanas_tiempo[i][0]}-{ventanas_tiempo[i][1]}')

# Agregar aristas con distancias
for i in range(len(distance_matrix)):
    for j in range(len(distance_matrix)):
        if i != j:
            G.add_edge(i, j, weight=distance_matrix[i][j])

# Posiciones para los nodos
pos = nx.spring_layout(G)

# Dibujar nodos y etiquetas de nodos
plt.figure(figsize=(12, 8))
nx.draw(G, pos, with_labels=True, node_size=7000, node_color='skyblue', font_size=10, font_color='black', font_weight='bold', labels=nx.get_node_attributes(G, 'label'))

# Dibujar etiquetas de aristas (distancias)
edge_labels = nx.get_edge_attributes(G, 'weight')
nx.draw_networkx_edge_labels(G, pos, edge_labels=edge_labels, font_size=8)

# Añadir texto explicativo
plt.text(0, -1.5, f"Distancias Totales de Rutas: {distancia_rutas}\nVehículos Disponibles: {vehicles}\nRutas Generadas: {len(distancia_rutas)}\nLa empresa no tiene suficientes vehículos para las rutas generadas", 
         fontsize=12, ha='center', va='top', bbox=dict(facecolor='white', alpha=0.5))

# Mostrar el gráfico
plt.title("Gráfico de Rutas con Ventanas de Tiempo")
plt.show()
