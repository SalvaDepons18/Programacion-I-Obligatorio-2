/*Salvador Depons(303738) y Gino Mazza(303686)*/

//Defino una clase general donde guardo las funciones del sistema y almaceno en listas los objetos de Reclamo y Empresa
class Sistema{
	constructor (){
		this.listaReclamos = [];
		this.listaEmpresas = [];
		
	}
		
	//Funcion que recibe nombre de empresa y retorna si ya hay alguna empresa con ese nombre (Booleano)
	existeEmpresa(elNombre){
		let existe = false;
		for (let e of this.listaEmpresas){
			if (e.nombre.toLowerCase() === elNombre.toLowerCase()){
				existe = true;
			}
		}
		return existe;
	}
	
	//Funcion que recibe titulo de reclamo y retorna si ya hay algun reclamo con ese titulo (Booleano)
	existeReclamo(elTitulo){
		let existe = false;
		for (let r of this.listaReclamos){
			if (r.titulo.toLowerCase() === elTitulo.toLowerCase()){
				existe = true;
			}
		}
		return existe;
	}
	
	//Funcion que recibe un objeto de Empresa y lo guarda en listaEmpresas
	agregarEmpresa(elNombre){
		this.listaEmpresas.push(elNombre);
	}
	
	//Funcion que recibe un objeto de Reclamo y lo guarda en listaReclamos
	agregarReclamo(elTitulo){
		this.listaReclamos.push(elTitulo);
	}
	
	//Funcion que recibe el nombre de una empresa y retorna el objeto de Empresa con ese atributo de nombre
	empresaConNombre(elNombre){
		for (let e of this.listaEmpresas){
			if (e.nombre === elNombre){
				return e;
			}
		}
	}
	
	//Funcion que retorna el promedio de la cantidad de reclamos considerando todos los reclamos de todas las empresas
	promedioReclamosTotal(){
		let total=0;
		for (let e of this.listaEmpresas){
			for (let r of this.listaReclamos){
				if (r.empresa === e){
					total += r.ocurrencia;	
				}
			}
		}
		let ret=0;
		if(this.listaEmpresas.length != 0){
			ret = total/this.listaEmpresas.length;
		}
		return Math.trunc(ret);	
	}
	
	//Funcion que retorna la cantida de empresas ingresadas en listaEmpresas
	cantEmpresas(){
		return this.listaEmpresas.length;
	}
	
	//Funcion que retorna un array con todas las empresas sin reclamos (Retorna los objetos)
	empresasSinReclamo(){
		let ret = [];
		let aux = [];
		for(let r of this.listaReclamos){
			aux.push(r.empresa);
		}
		for(let e of this.listaEmpresas){
			if(!aux.includes(e)){
				ret.push(e);
			}
		}
		return ret.sort();;
	}
	
	//Funcion que retorna un array con los rubros con la mayor cantidad de reclamos (En caso de ser mas de uno retorna todos los maximos)
	rubroMaxReclamo(){
		
		let max = Number.MIN_VALUE;
		let maximos = [];
		let rubros = ["Viajes","Reclamos","Bancos","Muebles","Autos","Servicios","General"];
		let cantXRubro = [0,0,0,0,0,0,0];
		
		for (let r of this.listaReclamos) {
			for (let i=0; i<rubros.length; i++){
				if (r.empresa.rubro === rubros[i]){
					cantXRubro[i] += r.ocurrencia;	
				}
			}
		}
		for (let i=0; i<cantXRubro.length; i++){
			if (cantXRubro[i] >= max){
				max = cantXRubro[i];
			}
		}
		for (let i=0; i<cantXRubro.length; i++){
			if (cantXRubro[i] === max){
				maximos.push(rubros[i]);
			}
		}
		maximos.push(max);
		return maximos;
	}
	
	//Funcion que retorna un array con las iniciales (no repetidas) de todas las empresas ingresadas en listaEmpresas
	inicialesEmpresa(){
		let iniciales=[];
		for (let e of this.listaEmpresas){
			iniciales.push(e.nombre[0].toUpperCase()); 
		}
		for (let i=0; i<iniciales.length; i++){
			let cont=0;
			for (let j=0; j<iniciales.length; j++){
				if (iniciales[i] === iniciales[j]){
					cont++
				}
				if (cont > 1){
				iniciales.splice(j,1);
				}
			}
		}
		return iniciales.sort();
	}
	
	//Funcion que retorna un array con los objetos de Reclamo que incluyan en alguna parte la palabra buscada en la barra de buscador
	filtrarReclamos(filtro){
		let reclamosFiltrados = [];
		filtro = filtro.toLowerCase();
		for (let r of this.listaReclamos){
			if (r.nombre.toLowerCase().includes(filtro) || r.empresa.nombre.toLowerCase().includes(filtro) || r.titulo.toLowerCase().includes(filtro) || r.reclamo.toLowerCase().includes(filtro)){
				reclamosFiltrados.push(r);
			}
		}
		return reclamosFiltrados;
	}
	
	//Funcion que recibe el orden en que se necesita ordenar listaEmpresas (Creciente o Decreciente) y retorna un array con las empresas ordenadas, ademas tiene en cuenta las mayusuclas
	ordenarTabla(lista,orden){
		let listaOrdenada = [];
		let ordenado = [];
		let ret = [];
		
		for (let e of lista){
			listaOrdenada.push(e);
		}
		for (let e of listaOrdenada){
			ordenado.push(e.nombre.toLowerCase());
		}
		ordenado = ordenado.sort();
		for (let i=0; i<listaOrdenada.length; i++){
			ret.push("");
		}	
		for (let i=0; i<listaOrdenada.length; i++){
			let posicion = ordenado.indexOf(listaOrdenada[i].nombre.toLowerCase());
			ret[posicion] = listaOrdenada[i];
		}
		if(orden === "decreciente"){
			ret.reverse();
		}
		
		return ret;
	}
	
	//Funcion que recibe una inicial y devuelve un array con todas las empresas que empiezan con ella
	empresasConInicial(inicial){
		let empresasConEsaInicial = [];
		for (let e of this.listaEmpresas){
			if (e.nombre[0].toUpperCase() === inicial){
				empresasConEsaInicial.push(e);
			}
		}
		return empresasConEsaInicial;
	}
	
}

//Defino una clase para crear Empresas
class Empresa{
	constructor (elNombre, laDireccion, elRubro){
		this.nombre = elNombre;
		this.direccion = laDireccion;
		this.rubro = elRubro;
	}
	toString(){
	return this.nombre + " (" + this.direccion + ")" + " Rubro: " + this.rubro;    
	}
}

//Defino una clase para crear Reclamos
class Reclamo{
	constructor (elNombre, laEmpresa, elTitulo, elReclamo, elNumero, laOcurrencia = 1){
		this.nombre = elNombre;
		this.empresa = laEmpresa;
		this.titulo = elTitulo;
		this.reclamo = elReclamo;
		this.numero = elNumero;
		this.ocurrencia = laOcurrencia;
	}
	toString(){
        return "Nombre: " + this.nombre + " Titulo: " + this.titulo + " Reclamo: " + this.reclamo;
    }
}