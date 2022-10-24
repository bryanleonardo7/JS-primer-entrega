
// let y while

let entrada = alert ("Bienvenido Agencias de Autos!");
let ingresarEdad = parseInt(prompt("Ingresa tu edad"));
while (ingresarEdad < 16) {
    console.log("No tenes Edad para Comprar Autos");
    ingresarEdad = parseInt(prompt("Ingresa tu Edad"));
}


 //let 

let valorAutos;

let auto = prompt(`Seleccione un Auto para Comprar!:
    1. Auto (ford)
    2. Auto (Peugeot)
    3. Auto (Fiat)
    4. Auto (Volkswagen)`)

    while (auto != "x" && auto != "X") {
        switch (auto) {
            case "1":
                valorAutos = 4500000;
                break;
            case "2":
                valorAutos = 3321500;
                break;
            case "3":
                valorAutos = 1312000;
                break;
            case "4":
                valorAutos = 3568450;
                break;
                break;
            default:
                prompt(`Seleccione un Auto para manejar en nuestra Agencia!:
                1. Auto (ford)
                2. Auto (Peugeot)
                3. Auto (Fiat)
                4. Auto (Volkswagen)`);
                break;
        }break;
    }alert(`El valor del Auto seleccionada es de $${valorAutos}`);

    alert('Gracias por eligirnos para comprar el auto de tus sueños!')