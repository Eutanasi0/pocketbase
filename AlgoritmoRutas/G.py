import matplotlib.pyplot as plt
import networkx as nx

# Crear un grafo
G = nx.DiGraph()

# Nodos (Depósito 0 y puntos de demanda 1, 2, ..., 9)
nodes = {
    0: (0, 0),
    1: (1, 4),
    2: (2, 6),
    3: (3, 8),
    4: (4, 6),
    5: (5, 4),
    6: (6, 2),
    7: (7, 0),
    8: (8, -2),
    9: (9, -4),
    10: (-1, -4),
    11: (-3, -6),
    12: (-5, -8)
}

# Agregar nodos al grafo
for node, pos in nodes.items():
    G.add_node(node, pos=pos)

# Rutas finales
routes = [
    [0, 1, 3, 5, 0],
    [0, 7, 10, 11, 0],
    [0, 2, 4, 6, 0],
    [0, 8, 9, 12, 0]
]

# Colores para las rutas
colors = ['red', 'green', 'blue', 'orange']

# Agregar aristas (edges) al grafo para cada ruta y asignar colores
edges = []
edge_colors = []

for idx, route in enumerate(routes):
    route_edges = [(route[i], route[i + 1]) for i in range(len(route) - 1)]
    edges.extend(route_edges)
    edge_colors.extend([colors[idx]] * len(route_edges))

G.add_edges_from(edges)

# Obtener posiciones de los nodos
pos = nx.get_node_attributes(G, 'pos')

# Dibujar nodos
nx.draw_networkx_nodes(G, pos, node_size=500, node_color='lightblue')

# Dibujar etiquetas de nodos
nx.draw_networkx_labels(G, pos, labels={node: node for node in G.nodes()}, font_size=12, font_color='black')

# Dibujar aristas delgadas con colores
nx.draw_networkx_edges(G, pos, edgelist=edges, edge_color=edge_colors, width=2, alpha=0.7)

# Ajustar el gráfico para que se vea en toda la pantalla
plt.figure(figsize=(10, 8))

# Mostrar el gráfico
plt.title("Rutas Óptimas usando el Algoritmo de Clarke y Wright")
plt.axis('equal')  # Asegurar que los ejes estén proporcionados
plt.show()
