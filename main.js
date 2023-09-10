const fichas = document.querySelectorAll(".ficha");
const tabla = document.querySelector("table");
const botonBorrar = document.getElementById("borrarTabla")
const botonBorrarUltimo = document.querySelectorAll(".borrarUltimo")

let acordesATocar = []
let objetoInversions;

fichas.forEach((ficha,index) => {
    ficha.addEventListener("click", () => {
        
        const acorde = ficha.textContent;

        const fila = tabla.insertRow(-1);
        const celdaAcorde = fila.insertCell(0);
        const celdaNotas = fila.insertCell(1);
        const celdaTipoInversion = fila.insertCell(2);
        
        acordesATocar.push(acorde)
        objetoInversions = inversionesMenorMovimiento(acordesATocar);
        
        celdaAcorde.textContent = acorde;
        celdaNotas.innerHTML =`<pre>${formatear_notas(objetoInversions[objetoInversions.length-1]['notasAcorde'])}</pre>`;
        celdaTipoInversion.textContent = objetoInversions[objetoInversions.length-1]['nombreInversion']; 
    });
});

botonBorrar.addEventListener("click",() => {
    borrarTabla();
})


botonBorrarUltimo.forEach((boton) => {
    boton.addEventListener("click",() => {
        borrarUltimo();
    })

})


function borrarUltimo() {
    const filas = tabla.rows.length;
    if (filas > 1) {
        tabla.deleteRow(filas-1);
        acordesATocar.pop()
        
    }
    
    
}

function borrarTabla() {
    const filas = tabla.rows.length;
    for (let i = filas - 1; i > 0; i--) {
        tabla.deleteRow(i);
    }
    acordesATocar = []
}
