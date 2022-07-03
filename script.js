const canvas = document.getElementById("canvas"); // Odnajdujemy element canvas
const ctx = canvas.getContext("2d"); // Tworzymy z elementu canvas kontekst 2D w którym będziemy rysować


// Przydzielanie elementów (inputów) do zmiennych
let radiusSlider = document.getElementById("radius"); 
let shiftXSlider = document.getElementById("shiftX"); 
let shiftYSlider = document.getElementById("shiftY")
let lineWidthSlider = document.getElementById("lineWidth");

// Przydzielanie wartości inputów do zmiennych i ich konwersja ze stringów na liczby
let radius = parseInt(radiusSlider.value); // promień krzywej
let shiftX = parseInt(shiftXSlider.value); // przesunięcie w osi X
let shiftY = parseInt(shiftYSlider.value); // przesunięcie w osi Y
let lineWidth = parseFloat(lineWidthSlider.value); // Długość linii łączacych punkty
                                                  // (Mniejsza długość linii odpowiada
                                                  // większej ilości punktów, a co za tym idzie
                                                  // precyyjniej narysowanej krzywej)

// Przydzielanie elementów wyświetlających wartości inputów do zmiennych
let radiusLabel = document.getElementById("radiusLabel");
let shiftXLabel = document.getElementById("shiftXLabel");
let shiftYlabel = document.getElementById("shiftYLabel");
let lineWidthLabel = document.getElementById("lineWidthLabel");



// Do każdego z inputów definiujemy funkcje które będą wywoływane po odpaleniu eventu "change"
// Czyli za każdym razem gdy wartość inputu zmieni się, zostanie wywołana funkcja która czyści
// canvas i rysuje krzywą od nowa
radiusSlider.addEventListener("change", () => {
  radius = parseInt(radiusSlider.value); // Odczytujemy wartość z inputu i aktualizujemy zmienną
  
  radiusLabel.innerHTML = radius; // aktualizujemy wyświetlany licznik podmieniając wartość

  clear(); // czyścimy canvas
  drawCardioid(radius, shiftX, shiftY, lineWidth); // rysujemy cardioid od nowa z aktualizowanymi
                                                   // argumentami
});

  // Reszta event listenerów działa w ten sam sposób jak wyżej operując na odpowiadjących im
  // inputach, zmiennych oraz wyświetlanych licznikach.
shiftXSlider.addEventListener("change", () => {
  shiftX = parseInt(shiftXSlider.value);
  
  shiftXLabel.innerHTML = shiftX;
  clear();
  drawCardioid(radius, shiftX, shiftY, lineWidth);
});

shiftYSlider.addEventListener("change", () => {
  shiftY = parseInt(shiftYSlider.value);
  shiftYlabel.innerHTML = shiftY;
  clear();
  drawCardioid(radius, shiftX, shiftY, lineWidth);
});

shiftYSlider.addEventListener("change", () => {
  shiftY = parseInt(shiftYSlider.value);
  label.innerHTML = shiftY;
  clear();
  drawCardioid(radius, shiftX, shiftY, lineWidth);
});

lineWidthSlider.addEventListener("change", () => {
  lineWidth = parseFloat(lineWidthSlider.value);
  lineWidthLabel.innerHTML = lineWidth;
  console.log(lineWidth);
  clear();
  drawCardioid(radius, shiftX, shiftY, lineWidth);
});



// Po załadowaniu strony wywoływana jest funckja rysująca cardioid z argumentami
// pozyskanymi z domyślnych wartości inputów
drawCardioid(radius, shiftX, shiftY, lineWidth); 


// funckja czyszcząca canvas 
function clear() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Czyści canvas w polu prostokąta od
  // współrzednej 0,0 do skrajnych współrzędnych canvasu
}

// Funkcja rysująca Cardoid.
function drawCardioid(radius, shiftX, shiftY, lineWidth) {
  ctx.beginPath(); // Tworzymy nową ściezke rysowania


  // Obliczamy pierwszy punkt z 2 wzorów parametrycznych na x i y;
  // x(α) = 2A(1 - cos α) * cos α
  // y(α) = 2A(1 - cos α) * sin α

  let x = 2 * radius * (1 - Math.cos(0.1)) * Math.cos(0.1); 
  let y = 2 * radius * (1 - Math.cos(0.1)) * Math.sin(0.1);

  // Przesuwamy współrzedne o wartości przesunięć x i y podane w argumentach
  x += shiftX;
  y += shiftY;

  let x2, y2;  // Tworzymy kolejne współrzędne, które będą stanowiły drugi punkt który będzie łączony
  // przez prostą linię z punktem pierwszym

  const alphaMax = Math.PI * 2 // Maksymalna wartość α wynikająca ze wzoru 0 <= α < 2 * π  
  
  
  for (let i = 0; i < alphaMax; i = i + lineWidth) { 
    // zmienna i jest zwiększana o długość linii regulując tym ilość pozyskanych punktów

    // Obliczamy drugi punkt z 2 wzorów parametrycznych na x i y;
    // x(α) = 2A(1 - cos α) * cos α
    // y(α) = 2A(1 - cos α) * sin α
    x2 = 2 * radius * (1 - Math.cos(i)) * Math.cos(i);
    y2 = 2 * radius * (1 - Math.cos(i)) * Math.sin(i);

    // Przesuwamy współrzedne o wartości przesunięć x i y podane w argumentach
    x2 += shiftX;
    y2 += shiftY;
    ctx.moveTo(x, y); // Tworzymy pod-sciezke na punkcie pierwszym
    ctx.lineTo(x2, y2); // Tworzymy linię między punktem pierwszym, a drugim
    ctx.stroke(); // Rysujemy podścieżkę

    // Nadpisujemy współrzędne punktu drugiego, na spółrzędne pierwszego
    x = x2; 
    y = y2;
    // Powtarzamy proces do ukończenia pętli
  }
  ctx.closePath(); // zamykamy ścieżkę rysowania
}
