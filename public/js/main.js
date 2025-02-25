 //----------------------------------------SELECCIONAR CAJAS DE TEXTO----------------------------------------//
 document.querySelectorAll("input[type='text'], textarea").forEach(element => {
    element.addEventListener("focus", function() {
        this.select();
    });
});