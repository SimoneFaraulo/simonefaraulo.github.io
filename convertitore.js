//step 1: andare a prendere tutti i valori dai componeneti nel form HTML
//per riferirci ad un elemento HTML uso il suo id
// e ottengo un variabile contenente un riferimento ad esso tramite il metodo getElementById dell' oggetto document (DOM)
//const indica che il riferimento ottenuto non cambia mai

const inputField = document.getElementById("input-temp")
const fromUnitField = document.getElementById("input-unit")
const toUnitField = document.getElementById("output-unit")
const outputField = document.getElementById("output-temp")
const form = document.getElementById("converter")

//step 2: implementare la logica della conversione

function convertTemp (value, fromUnit, toUnit) {
    //uso la stringa "c" per identificare il Celsius
    //uso la stringa "f" per identificare Farenheit
    //uso la stringa "k" per identificare Kelvin

    if(fromUnit === "c") {
        if(toUnit === "f") {
            return value*9/5+ 32;
        } else if(toUnit === "k") {
            return value + 273.15;
        }   
        return value;
    }

    if(fromUnit ==="f") {
        if(toUnit === "c") {
            return(value - 32)*5/9;
        } else if (toUnit === "k") {
            return(value+ 459.67)*5/9;
        }
        return value;
    }

    if(fromUnit === "k") {
        if (toUnit === "c") {
            return (value - 273.15);
        } else if (toUnit ==="f") {
            return value*9/5- 459.67;
        }
        return value;
    }

throw new Error("Invalid unit");
}

form.addEventListener("input", () => {
    console.log("prova");
    const inputTemp = parseFloat(inputField.value);
    const fromUnit = fromUnitField.value;
    const toUnit = toUnitField.value;
    const outputTemp = convertTemp(inputTemp, fromUnit, toUnit);
    outputField.value = (Math.round(outputTemp *100)/100) + " " + toUnit.toUpperCase();
});


