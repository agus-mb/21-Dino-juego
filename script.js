/*inicializacion de las variables basicas*/

var time = new Date();
var deltaTime = 0;

if (
  document.readyState === "complete" ||
  document.readyState === "interactive"
) {
  setTimeout(Init, 1);
} else {
  document.addEventListener("DOMContentLoaded", Init);
}

function Init() {
  time = new Date();
  Start();
  Loop();
}

function Loop() {
  deltaTime = (new Date() - time) / 1000;
  time = new Date();
  Update();
  requestAnimationFrame(Loop);
}

var sueloY = 22;
var velY = 0;
var impulso = 900;
var gravedad = 2500;
var dinoPosX = 42;
var dinoPosY = sueloY;
var sueloX = 0;
var velEscenario = 1280 / 3;
var gameVel = 1;
var score = 0;
var parado = false;
var saltando = false;

var contenedor;
var dino;
var textScore;
var suelo;

/////////////////////////////////////////////////

var tiempoHastaObstaculo = 2;
var tiempoObstaculoMin = 0.7;
var tiempoObstaculoMax = 1.8;
var obstaculoPosY = 16;
var obstaculos = [];

function Start() {
  contenedor = document.querySelector(".contenedor");
  dino = document.querySelector(".dino");
  suelo = document.querySelector(".suelo");
  textScore = document.querySelector(".score");

  document.addEventListener("keydown", HandleKeydown);
}

function Update() {
    MoverSuelo();
    MoverDinosaurio();
    DecidirCrearObstaculos();
    MoverObstaculos();
    velY -= gravedad * deltaTime;
  }

function HandleKeydown(e) {
  if (e.keyCode == 32) {
    //32=tecla espacio
    Saltar();
  }
}

function Saltar() {
  if (dinoPosY === sueloY) {
    saltando = true;
    velY = impulso;
    dino.classList.remove("dino-corriendo");
  }
}

function MoverDinosaurio() {
  dinoPosY += velY * deltaTime;
  if (dinoPosY < sueloY) {
    TocarSuelo();
  }
  dino.style.bottom = dinoPosY + "px";
}

function TocarSuelo() {
  dinoPosY = sueloY;
  velY = 0;
  if (saltando) {
    dino.classList.add("dino-corriendo");
  }
  saltando = false;
}


function MoverSuelo() {
    sueloX += CalcularDesplazamiento();
    suelo.style.left = -(sueloX % contenedor.clientWidth) + "px";
  }


  
function CalcularDesplazamiento() {
    return velEscenario * deltaTime * gameVel;
  }
  

function DecidirCrearObstaculos() {
  tiempoHastaObstaculo -= deltaTime;
  if (tiempoHastaObstaculo <= 0) {
    CrearObstaculo();
  }
}

function CrearObstaculo() {
  var obstaculo = document.createElement("div");
  contenedor.appendChild(obstaculo);
  obstaculo.classList.add("cactus");
  obstaculo.posX = contenedor.clientWidth;
  obstaculo.style.left = contenedor.clientWidth + "px";

  obstaculos.push(obstaculo);

  tiempoHastaObstaculo =
    tiempoObstaculoMin +
    (Math.random() * (tiempoObstaculoMax - tiempoObstaculoMin)) / gameVel;
}

function MoverObstaculos() {
    for (var i = obstaculos.length - 1; i >= 0; i--) {
        if(obstaculos[i].posX < -obstaculos[i].clientWidth) {
            obstaculos[i].parentNode.removeChild(obstaculos[i]);
            obstaculos.splice(i, 1);

        }else{
            obstaculos[i].posX -= CalcularDesplazamiento();
            obstaculos[i].style.left = obstaculos[i].posX+"px";
        }
    }
}



