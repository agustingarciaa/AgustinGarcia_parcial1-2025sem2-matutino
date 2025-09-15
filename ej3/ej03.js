/*
# Ejercicio 03.

La función `showRandomDigit` está asociada al click en el display. Al ejecutarse
debe definir un valor aleatorio entre 0 y 9 y mostrar el dígito correspondiente.
*/
function showRandomDigit() {
  const random = Math.floor(Math.random() * 9) + 1;
  const abc = ["a", "b", "c", "d", "e", "f", "g"];
  let seg;
  switch (random) {
    case 0:
      for (let i = 0; i < 6; i++) {
        seg = document.getElementById(`seg-${abc[i]}`);
        seg.style.backgroundColor = "yellow";
      }
    case 1:
      for (let i = 0; i < 3; i++) {
        //Puede haber errores de iteracion pero la logica en general es esa
        seg = document.getElementById(`seg-${abc[i]}`);
        seg.style.backgroundColor = "yellow";
      }
    case 2:
      for (let i = 0; i < abc.length; i++) {
        seg = document.getElementById(`seg-${abc[i]}`);
        seg.style.backgroundColor = "yellow";
      }
      seg = document.getElementById(`seg-c`);
      seg.style.backgroundColor = "white";
      seg = document.getElementById(`seg-f`);
      seg.style.backgroundColor = "white";

    case 3:
      for (let i = 0; i < abc.length; i++) {
        seg = document.getElementById(`seg-${abc[i]}`);
        seg.style.backgroundColor = "yellow";
      }
      seg = document.getElementById(`seg-e`);
      seg.style.backgroundColor = "white";
      seg = document.getElementById(`seg-f`);
      seg.style.backgroundColor = "white";

    case 4:
      for (let i = 0; i < abc.length; i++) {
        seg = document.getElementById(`seg-${abc[i]}`);
        seg.style.backgroundColor = "yellow";
      }
      seg = document.getElementById(`seg-e`);
      seg.style.backgroundColor = "white";
      seg = document.getElementById(`seg-f`);
      seg.style.backgroundColor = "white";

    case 5:
      for (let i = 0; i < abc.length; i++) {
        seg = document.getElementById(`seg-${abc[i]}`);
        seg.style.backgroundColor = "yellow";
      }
      seg = document.getElementById(`seg-b`);
      seg.style.backgroundColor = "white";
      seg = document.getElementById(`seg-e`);
      seg.style.backgroundColor = "white";

    case 6:
      for (let i = 0; i < abc.length; i++) {
        seg = document.getElementById(`seg-${abc[i]}`);
        seg.style.backgroundColor = "yellow";
      }
      seg = document.getElementById(`seg-a`);
      seg.style.backgroundColor = "white";

    case 7:
      for (let i = 0; i < 3; i++) {
        seg = document.getElementById(`seg-${abc[i]}`);
        seg.style.backgroundColor = "yellow";
      }
      seg = document.getElementById(`seg-g`);
      seg.style.backgroundColor = "yellow";

    case 8:
      for (let i = 0; i < 7; i++) {
        seg = document.getElementById(`seg-${abc[i]}`);
        seg.style.backgroundColor = "white";
      }

    case 9:
      for (let i = 0; i < 7; i++) {
        seg = document.getElementById(`seg-${abc[i]}`);
        seg.style.backgroundColor = "white";
      }
      seg = document.getElementById(`seg-e`);
      seg.style.backgroundColor = "white";
  }
  console.log(random);
}
