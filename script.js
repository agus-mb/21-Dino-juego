document.addEventListener('DOMContentLoaded',function(){
    console.log("Inicia juego");
    var a1=new Area(0,30,100,100);
    var a2=new Area(100,30,100,100);
    medidas.tomaMedida();
    medidas.dibujarTiles();
    teclas.iniciar();
});

var start=document.getElementById("start");
start.addEventListener('click',function(){
    bucleInfinito.bucle();
});
var start=document.getElementById("mostrar");
start.addEventListener('click',function(){
    teclas.mostrarTeclas();
});
window.addEventListener('resize',function () {
    medidas.dibujarTiles();
});


////////////////////////////

var teclas={
    arregloTeclas:new Array(),
    iniciar:function () {
        document.onkeydown=teclas.guardaTeclas;
    },
    guardaTeclas:function (e) {
        teclas.arregloTeclas.push(e.key);
        console.log(e.key);
    },
    teclaPulsada:function (codLetra){
        return (teclas.arregloTeclas.indexOf(codLetra))?true:false;
    },
    borrarTeclas:function () {
        teclas.arregloTeclas=new Array();
    },
    mostrarTeclas:function () {
        console.log(teclas.arregloTeclas);
    }
}