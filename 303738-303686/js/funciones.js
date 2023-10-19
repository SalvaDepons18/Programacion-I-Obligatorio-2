/*Salvador Depons(303738) y Gino Mazza(303686)*/

//Agrego un evento que al cargar la pagina me lleva a la funcion inicio
window.addEventListener("load", inicio);

//Creo el objeto del sistema
var miSistema = new Sistema();

//Defino una variable var para mantener global el numero de reclamo (ya sea para ingresar como para mostrar)
var numReclamo = 1;

//Defino una variable global para guardar la letra del ultimo boton seleccionado
var ultimaLetra = "*";

//Defino una funcion que dependiendo de que elemento clickee dentro de la navegacion del sistema me lleva al resto de funciones
function inicio() {
	ocultarElementos("sec1");
	document.getElementById("principal").addEventListener("click", principal);
	document.getElementById("ver").addEventListener("click", ver);
	document.getElementById("estadisticas").addEventListener("click", function(){ estadisticas(); ordenar(); pintar("*"); });
	document.getElementById("agregarempresa").addEventListener("click", agregarempresa);
	document.getElementById("boton").addEventListener("click", agregarreclamo);
	document.getElementById("botonBuscador").addEventListener("click", buscador);
}

//Funcion que crea un evento al hacer click en Agregar Reclamo y lleva a otra funcion (En caso de no haber empresas lo indica)
function principal() {
	ocultarElementos("sec1");
	
	if (miSistema.listaEmpresas.length === 0){
		let boton = document.getElementById("boton");
		boton.style.display="none";
		let texto = document.getElementById("aviso");
		texto.innerHTML = "No existen empresas";
	}else{
		let texto = document.getElementById("aviso");
		texto.style.display="none";
		let boton = document.getElementById("boton");
		boton.style.display="block";
	}
	document.getElementById("boton").addEventListener("click", agregarreclamo);
	
}

//Funcion que muestra los reclamos existentes (mediante la llamada de la funcion crearDivReclamos())
function ver() {
    ocultarElementos("sec3");
	crearDivReclamos(miSistema.listaReclamos);
}

//Funcion que se encarga de la seccion de estadisticas (Funcionamiento de buttons, radios, creacion de tabla y muestra de datos)
function estadisticas() {
	ocultarElementos("sec4");
	
	document.getElementById("crec").addEventListener("click", ordenar);
	document.getElementById("decrec").addEventListener("click", ordenar);
	
	let aux = document.getElementById("tbody");
	let botones = document.getElementById("botones");
	
	aux.innerHTML = "";
	botones.innerHTML = "";	
		
	//Creo boton para mostrar todas las empresas en la tabla (Tambien lleva a ordenar())
	let todos = document.createElement("input");
	todos.type = "button";
	todos.className = "botones2";
	todos.value = "*";
	todos.id = "*";
	botones.appendChild(todos);
		
	todos.addEventListener("click", function() {
		ultimaLetra = "*";
		let capt = document.getElementById("empiezanCon");
		capt.innerHTML = "Todas las empresas";
		pintar("*");
		ordenar();
	});
		
		
	//Creo botones con las iniciales de cada Empresa usando la funcion inicialesEmpresa (Lleva a mostrarEmpresasPorInicial() para mostrar en la tabla solo las empresas con esa inicial)
	for (let i=0; i<miSistema.inicialesEmpresa().length; i++){
			
		let input = document.createElement("input");
		input.type = "button";
		input.className = "botones2";
		input.id = miSistema.inicialesEmpresa()[i];
		input.value = miSistema.inicialesEmpresa()[i];
			
			
		input.addEventListener("click", function() {
			ultimaLetra = this.value;
			mostrarEmpresasPorInicial(this.value);
			pintar(miSistema.inicialesEmpresa()[i]);
		});
		botones.appendChild(input);	
	}
	
	 
	//Llamo las funciones de miSistema para mostrar los datos en la seccion de Informacion General
	let promedio = document.getElementById("promedio");
	promedio.innerHTML = miSistema.promedioReclamosTotal();
	 
	let cantidadEmpresas = document.getElementById("cantidadEmpresas");
	cantidadEmpresas.innerHTML = miSistema.cantEmpresas();
	
	//Uso los datos obtenidos en la funcion empresasSinReclamo para crear los distintos li en Empresas sin Reclamos
	let auxiliar = document.getElementById("ulId");
	auxiliar.innerHTML = "";
	if (miSistema.empresasSinReclamo().length === 0){
		let span = document.createElement("span");
		span.innerHTML = "No hay empresas sin reclamos";
		auxiliar.appendChild(span);
	}else{
		for (let e of miSistema.empresasSinReclamo()){
			let li = document.createElement("li");
			li.innerHTML = e;
			let ul = document.getElementById("ulId");
			ul.appendChild(li);
		}
	}
	
	//Uso los datos de rubroMaxReclamo para crear los distintos li en Rubros con maxima cantidad de reclamos
	let rubrosConMasReclamos = miSistema.rubroMaxReclamo();
	let auxiliar2 = document.getElementById("ulId2");
	auxiliar2.innerHTML = "";
	if (miSistema.listaReclamos.length === 0){
		let span = document.createElement("span");
		span.innerHTML = "No hay Reclamos";
		auxiliar2.appendChild(span);
	}else{
		for (let i=0; i<rubrosConMasReclamos.length-1; i++){
			let li = document.createElement("li");
			li.innerHTML = rubrosConMasReclamos[i] + " Cantidad: " + rubrosConMasReclamos[rubrosConMasReclamos.length-1];
			let ul = document.getElementById("ulId2");
			ul.appendChild(li);
		}
		
	}
}

//Funcion que recibe la letra del boton pulsado y lo pinta en verde (* o letra)
function pintar(inicial){
	let listaBotones = document.getElementById("botones");
	for (let boton of listaBotones){
		if (inicial === boton.value){
			boton.style.backgroundColor = "lime";
		}else{
			boton.style.backgroundColor = "white";
		}
	}
}

//Funcion que agrega una nueva Empresa al sistema (llamando a nuevaEmpresa())
function agregarempresa() {
	ocultarElementos("sec5");
	document.getElementById("botonEmpresa").addEventListener("click", nuevaEmpresa);	
}

//Funcion que agrega un nuevo Reclamo al sistema (llamando a nuevoReclamo())
function agregarreclamo() {
	document.getElementById("agregarReclamo").addEventListener("click", nuevoReclamo);
	document.getElementById("Volver").addEventListener("click", principal);
	
	if (miSistema.listaEmpresas.length === 0){
		let boton = document.getElementById("boton");
		boton.style.display="none";
		let texto = document.getElementById("aviso");
		texto.innerHTML = "No existen empresas";
	}else{
		let texto = document.getElementById("aviso");
		texto.style.display="none";
		let boton = document.getElementById("boton");
		boton.style.display="block";
		
		ocultarElementos("sec2");
	}
	
	//Usa los datos de listaEmpresas para agregar los nombres de las Empresas a un combo
	let combo = document.getElementById("nomEmpresa");
	combo.innerHTML = "";
	for (let e of miSistema.listaEmpresas){
		let opt = document.createElement("Option");
		opt.innerHTML = e.nombre;
		combo.appendChild(opt);
	}
}

//Funcion que toma el valor ingresado en la barra de busqueda y muestra los reclamos correspondientes llamando la funcion filtrarReclamos (si no encuentra nada lo indica)
function buscador(){
    let busqueda = document.getElementById("buscador").value;
    let filtrados = [];
    filtrados = miSistema.filtrarReclamos(busqueda);
    if (filtrados.length === 0){
       ocultarElementos("sec3"); 
	   let aux = document.getElementById("reclamos");
		aux.innerHTML = "Sin datos";
    }else{
        ocultarElementos("sec3");
        crearDivReclamos(filtrados);
    }
}

//Funcion que es llamada en la mayoria del resto de las funciones, recibe el section que se quiere mostrar y oculta el resto 
function ocultarElementos(mostrado){
	let elementos = ["titulomain", "sec1", "sec2", "sec3", "sec4", "sec5"];
	for (let elem of elementos){
		if (elem!=mostrado){
			let oculto = document.getElementById(elem);
			oculto.style.display="none";
		}else{
			let oculto = document.getElementById(elem);
			oculto.style.display="block";
		}
		if (mostrado === "sec3" || mostrado === "sec1"){
			let oculto = document.getElementById("titulomain");
			oculto.style.display="block";
		}
	}
}

//Funcion que toma los valores ingresados en el formulario y crea un objeto Empresa con esos datos  
function nuevaEmpresa(){
	if(document.getElementById("formEmpresa").reportValidity()){
			
		let nombre = document.getElementById("idNombre").value;
		let direccion = document.getElementById("idDireccion").value;
		let rubro = document.getElementById("idRubro").value;
		
		if(!miSistema.existeEmpresa(nombre)){	
			let eNueva = new Empresa(nombre, direccion, rubro);
			miSistema.agregarEmpresa(eNueva);
		}
		else{
			alert("Ya existe una empresa con el nombre: " + nombre);	
		}	
	}	
	
	document.getElementById("formEmpresa").reset();
}

//Funcion que toma los valores ingresados en el formulario y crea un objeto Reclamo con esos datos  
function nuevoReclamo(){
	document.getElementById("Volver").addEventListener("click", principal);	

	if (document.getElementById("formReclamo").reportValidity()){
				
		let nombre = document.getElementById("nomReclamo").value;
		let empresa = miSistema.empresaConNombre(document.getElementById("nomEmpresa").value);
		let titulo = document.getElementById("tituloReclamo").value;
		let reclamo = document.getElementById("reclamo").value;
		let numero = numReclamo;
		
		numReclamo++;

		if(!miSistema.existeReclamo(titulo)){	
				
			let rNuevo = new Reclamo(nombre, empresa, titulo, reclamo, numero);
			miSistema.agregarReclamo(rNuevo);
		}
		else{
			alert("Ya existe una reclamo con el titulo: " + titulo);	
		}
	}
	document.getElementById("formReclamo").reset();
}

//Funcion que dependiendo del radio button seleccionado crea o modifica la tabla de Empresas (llama a ordenarTabla() para pasarle a mostrarTodasEmpresas() la lista ordenada correctamente)
function ordenar(){
	if (document.getElementById("crec").checked){
		if (ultimaLetra === "*"){
			let lista = miSistema.ordenarTabla(miSistema.listaEmpresas, "creciente");
			mostrarTodasEmpresas(lista);
		}else{
			let lista = miSistema.ordenarTabla(miSistema.empresasConInicial(ultimaLetra), "creciente");
			mostrarTodasEmpresas(lista);
		}
	}else{
		if (ultimaLetra === "*"){
			let lista = miSistema.ordenarTabla(miSistema.listaEmpresas, "decreciente");
			mostrarTodasEmpresas(lista);
		}else{
			let lista = miSistema.ordenarTabla(miSistema.empresasConInicial(ultimaLetra), "decreciente");
			mostrarTodasEmpresas(lista);
		}
	}
}


//Funcion que recibe una lista de Empresas y crea una tabla con sus datos
function mostrarTodasEmpresas(lista){
	let aux = document.getElementById("tbody");
	aux.innerHTML = "";
	
	for (let e of lista){
		let tr = document.createElement("tr");
		let td1 = document.createElement("td");
		let td2 = document.createElement("td");
		let td3 = document.createElement("td");
		let td4 = document.createElement("td");

		let cant = 0;
		for (let r of miSistema.listaReclamos) {
			if (r.empresa === e) {
				cant += r.ocurrencia;
			}
		}
	
		td1.innerHTML = e.nombre;
		td2.innerHTML = e.direccion;
		td3.innerHTML = e.rubro;
		td4.innerHTML = cant;

		tr.appendChild(td1);
		tr.appendChild(td2);
		tr.appendChild(td3);
		tr.appendChild(td4);

		aux.appendChild(tr);
	}
}

//Funcion que recibe una inicial y crea una tabla solo con las Empresas con esa inicial
function mostrarEmpresasPorInicial(inicial){
	let aux = document.getElementById("tbody");
	let capt = document.getElementById("empiezanCon");
	aux.innerHTML = "";
	capt.innerHTML = "Empresas que empiezan con: "+inicial;

	
	for (let e of miSistema.listaEmpresas){
		if (e.nombre[0].toUpperCase() === inicial){
			let tr = document.createElement("tr");
			let td1 = document.createElement("td");
			let td2 = document.createElement("td");
			let td3 = document.createElement("td");
			let td4 = document.createElement("td");

			let cant = 0;
			for (let r of miSistema.listaReclamos) {
				if (r.empresa === e) {
				cant++;
				}
			}
	
		  td1.innerHTML = e.nombre;
		  td2.innerHTML = e.direccion;
		  td3.innerHTML = e.rubro;
		  td4.innerHTML = cant;

		  tr.appendChild(td1);
		  tr.appendChild(td2);
		  tr.appendChild(td3);
		  tr.appendChild(td4);

		  aux.appendChild(tr);
		}
	}
}

//Funcion que recibe una lista con los reclamos a mostrar y para cada uno de ellos crea un div con sus datos
function crearDivReclamos(lista){
	let aux = document.getElementById("reclamos");

	if (lista.length === 0) {
	aux.innerHTML = "No hay datos";
	} else {
		aux.innerHTML = "";

		for (let i=lista.length-1; i>=0; i--) {
			let h3 = document.createElement("h3");
			let reclamo=lista[i];
			h3.innerHTML = "Reclamo "+ reclamo.numero;

			let div = document.createElement("div");
			div.className = "cajas";

			let p1 = document.createElement("p");
			p1.innerHTML = lista[i].nombre + ": ";
			let span1 = document.createElement("span");
			span1.className = "rojo";
			span1.innerHTML = lista[i].titulo;
			p1.appendChild(span1);

			let p2 = document.createElement("p");
			p2.innerHTML = "Empresa: ";
			let span2 = document.createElement("span");
			span2.className = "verde";
			span2.innerHTML = lista[i].empresa.nombre;
			p2.appendChild(span2);

			let p3 = document.createElement("p");
			p3.innerHTML = lista[i].reclamo;

			let p4 = document.createElement("p");
			let input = document.createElement("input");
			input.type = "button";
			input.id = "input"+i;
			input.value = "¡A mí también me pasó!";
			
			let span4 = document.createElement("span");
			span4.id = "span"+i;
			span4.innerHTML = " Contador: " +lista[i].ocurrencia;
			
			
			p4.appendChild(input);
			p4.appendChild(span4);
			
			div.appendChild(p1);
			div.appendChild(p2);
			div.appendChild(p3);
			div.appendChild(p4);
			
			aux.appendChild(h3);
			aux.appendChild(div);
			 
			input.addEventListener("click", function() { aumentarContador(i, lista); });

		}
	}
}

// Código para incrementar el contador del reclamo
function aumentarContador(posicion, lista){
	for (let r of miSistema.listaReclamos){
		if (r === lista[posicion]){
			r.ocurrencia++;
		}
	}
	crearDivReclamos(lista);
	
}
	