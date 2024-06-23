const PocketBase = require('pocketbase/cjs');
const pb = new PocketBase('http://127.0.0.1:8090'); // Asegúrate de que la URL sea correcta

async function createPlan(data) {
    try {
        // Autenticar el usuario (si es necesario)
        await pb.admins.authWithPassword('benja@gmail.com', 'josebenjamin');

        // Datos del plan
        const newPlan = {
            name: data.name,
            description: data.description,
            start: data.start,
            estimated_end: data.estimated_end,
            userId: data.userId,
            data: data.data
        };

        // Crear el plan en la colección 'plans'
        const record = await pb.collection('plans').create(newPlan);

        console.log('Plan creado con éxito:', record);
        return record;
    } catch (error) {
        console.error('Error al crear el plan:', error.response ? error.response.data : error);
        throw error;
    }
}

// Ejemplo de uso
const planData = {
    name: "Nuevo Plan",
    description: "Descripción del nuevo plan",
    start: "2024-07-01",
    estimated_end: "2024-07-31",
    userId: "wohg2x50qzt77bg", // Reemplaza con el ID del usuario correspondiente
    data: {ejemplo: "valo"} // Cualquier dato adicional en formato JSON
};

createPlan(planData).then(plan => {
    console.log('Plan creado:', plan);
}).catch(error => {
    console.error('Error:', error);
});
