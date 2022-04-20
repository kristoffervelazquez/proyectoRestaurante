let cliente = {
    mesa: '',
    hora: '',
    pedido: ''
}

const categorias = {
    1: 'Comida',
    2: 'Bebidas',
    3: 'Postres'
}

const btnGuardarCliente = document.querySelector('#guardar-cliente');
btnGuardarCliente.addEventListener('click', guardarCliente);

function guardarCliente() {

    const mesa = document.querySelector('#mesa').value;
    const hora = document.querySelector('#hora').value;

    // Revisar si hay campos vacios
    const camposVacios = [mesa, hora].some(campo => campo === '');

    if (camposVacios) {
        imprimirAlerta('Todos los campos son obligatorios');
        return;
    }

    // Asignar datos del formulario al cliente
    cliente = {...cliente, mesa, hora};
    
    // Ocultar modal
    const modalFormulario = document.querySelector('#formulario');
    const modalBootstrap = bootstrap.Modal.getInstance(modalFormulario);
    modalBootstrap.hide();

    // Mostrar las secciones
    mostrarSecciones();

    //Obtener platillos de la API
    obtenerPlatillos();
}

function mostrarSecciones(){
    const seccionesOcultas = document.querySelectorAll('.d-none');

    seccionesOcultas.forEach(seccion => {
        seccion.classList.remove('d-none')
    })
}

function obtenerPlatillos(){
    const url = 'http://localhost:4000/platillos';

    fetch(url)
        .then(response => response.json())
        .then(response => mostrarPlatillos(response))
        .catch(err => console.error(err))
}

function mostrarPlatillos(platillos){
    const contenido = document.querySelector('#platillos');
    platillos.forEach(platillo => {
        const {categoria, id, nombre, precio} = platillo;

        const row = document.createElement('div');
        row.classList.add('row', 'py-3', 'border-top');
        
        const divNombre = document.createElement('div');
        divNombre.classList.add('col-md-4')
        divNombre.textContent = nombre;

        const divPrecio = document.createElement('div');
        divPrecio.classList.add('col-md-3', 'fw-bold');
        divPrecio.textContent = `$${precio}`;

        const divCategoria = document.createElement('div');
        divCategoria.classList.add('col-md-3');
        divCategoria.textContent = categorias[categoria];

        const inputCantidad = document.createElement('input');
        inputCantidad.type = 'number';
        inputCantidad.min = 0;
        inputCantidad.value = 0;
        inputCantidad.id = `Producto-${id}`;
        inputCantidad.classList.add('form-control');

        const agregar = document.createElement('div');
        agregar.classList.add('col-md-2');
        agregar.appendChild(inputCantidad);
        
        row.appendChild(divNombre);
        row.appendChild(divPrecio);
        row.appendChild(divCategoria);
        row.appendChild(agregar);

        contenido.appendChild(row);
        
    })
}


function imprimirAlerta(mensaje) {
    const existeAlerta = document.querySelector('.invalid-feedback')

    if (!existeAlerta) {
        const alerta = document.createElement('div');
        alerta.classList.add('invalid-feedback', 'd-block', 'text-center');
        alerta.textContent = mensaje;
        document.querySelector('.modal-body form').appendChild(alerta);

        setTimeout(() => {
            alerta.remove();
        }, 3000);
    }
}