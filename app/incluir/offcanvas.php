<style>
    .radio-input input {
        display: none;
    }

    .radio-input {
        width: 100%;
        --container_width: 100%;
        --item_width: calc(100% / 9);
        position: relative;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-radius: 10px;
        padding: 10px;
        gap: var(--padding);
        background-color: #fff;
        color: #000000;
        height: 80px;
        overflow: hidden;
        border: 1px solid rgba(53, 52, 52, 0.226);
    }

    .radio-input label {
        flex: 1;
        cursor: pointer;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 4px;
        z-index: 1;
        font-weight: 600;
        font-size: 12px;
        color: #2e86c1;
    }

    .selection {
        display: none;
        position: absolute;
        width: var(--item_width);
        height: 100%;
        z-index: 0;
        top: 0;
        left: 0;
        border-radius: 10px;
        transition: transform 0.15s ease;
        background-color: #52b3e5;
        
    }

    .radio-input label:has(input:checked) {
        color: #fff;
    }

    .radio-input label:has(input:checked)~.selection {
        display: block;
    }

    .radio-input label:nth-child(1):has(input:checked)~.selection {
        transform: translateX(calc(var(--item_width) * 0.7));
    }

    .radio-input label:nth-child(2):has(input:checked)~.selection {
        transform: translateX(calc(var(--item_width) * 9.5));
    }

    .radio-input label:nth-child(3):has(input:checked)~.selection {
        transform: translateX(calc(var(--item_width) * 18.2));
    }

    .radio-input label:nth-child(4):has(input:checked)~.selection {
        transform: translateX(calc(var(--item_width) * 27));
    }

   /*  .radio-input label:nth-child(5):has(input:checked)~.selection {
        transform: translateX(calc(var(--item_width) * 36));
    } */

    .radio-input label:nth-child(6):has(input:checked)~.selection {
        transform: translateX(calc(var(--item_width) * 44.7));
    }

    /* .radio-input label:nth-child(7):has(input:checked)~.selection {
        transform: translateX(calc(var(--item_width) * 70));
    } */

    .radio-input label:nth-child(8):has(input:checked)~.selection {
        transform: translateX(calc(var(--item_width) * 62.5));
    }

    .radio-input label:nth-child(9):has(input:checked)~.selection {
        transform: translateX(calc(var(--item_width) * 71.4));
    }
</style>

<!-- From Uiverse.io by Yaya12085 -->
<div class="radio-input">
    <label>
        <input name="value-radio" type="radio" id="pacientes" />
        <i class="fa fa-user fa-2x"></i>
        <span>Paciente</span>
    </label>
    <label>
        <input value="value-2" name="value-radio" type="radio" id="medicos" />
        <i class="fa fa-user-md fa-2x"></i>
        <span>Medico</span>
    </label>
    <label>
        <input value="value-3" name="value-radio" type="radio" id="citas" />
        <i class="fa fa-calendar fa-2x"></i>
        <span>Cita</span>
    </label>
    <label>
        <input value="value-3" name="value-radio" type="radio" id="recetas" />
        <i class="fa fa-file-text-o fa-2x"></i>
        <span>Receta</span>
    </label>
    <label>
        <input value="value-3" name="value-radio" type="radio" id="odontograma" />
        <i class="fa fa-stethoscope fa-2x"></i>
        <span>Odontograma</span>
    </label>
    <label>
        <input value="value-3" name="value-radio" type="radio" id="historial" />
        <i class="fa fa-history fa-2x"></i>
        <span>Historial</span>
    </label>
    <label>
        <input value="value-3" name="value-radio" type="radio" id="expediente" />
        <i class="fa fa-book fa-2x"></i>
        <span>Expediente</span>
    </label>
    <label>
        <input value="value-3" name="value-radio" type="radio" id="pagos" />
        <i class="fa fa-credit-card fa-2x"></i>
        <span>Pago</span>
    </label>
    <label>
        <input value="value-3" name="value-radio" type="radio" id="rol" />
        <i class="fa fa-lock fa-2x"></i>
        <span>Rol</span>
    </label>
    <span class="selection"></span>
</div>



<script>
    document.querySelector(".radio-input").addEventListener("click", (e) => {

        if (e.target.id == "pacientes") {
            window.location.href = "pacientes.php"
        }
        if (e.target.id == "medicos") {
            window.location.href = "medicos.php"
        }
        if (e.target.id == "citas") {
            window.location.href = "citas.php"
        }
        if (e.target.id == "recetas") {
            window.location.href = "recetas.php"
        }
        if (e.target.id == "odontograma") {
            window.location.href = "odontograma.php"
        }
        if (e.target.id == "historial") {
            window.location.href = "historial.php"
        }
        if (e.target.id == "expediente") {
            window.location.href = "expediente.php"
        }
        if (e.target.id == "pagos") {
            window.location.href = "pagos.php"
        }
        if (e.target.id == "rol") {
            window.location.href = "usuarios.php"
        }
    })



    let pagina = window.location.pathname.split("/").pop();
    if (pagina === "pacientes.php") {
        document.querySelector("#pacientes").setAttribute("checked", true)
    } else if (pagina === "citas.php") {
        document.querySelector("#citas").setAttribute("checked", true)
    } else if (pagina === "historial.php") {
        document.querySelector("#historial").setAttribute("checked", true)
    } else if (pagina === "medicos.php") {
        document.querySelector("#medicos").setAttribute("checked", true)
    } else if (pagina === "odontograma.php") {
        document.querySelector("#odontograma").setAttribute("checked", true)
    } else if (pagina === "expediente.php") {
        document.querySelector("#expediente").setAttribute("checked", true)
    } else if (pagina === "recetas.php") {
        document.querySelector("#recetas").setAttribute("checked", true)
    } else if (pagina === "pagos.php") {
        document.querySelector("#pagos").setAttribute("checked", true)
    } else if (pagina === "usuarios.php") {
        document.querySelector("#rol").setAttribute("checked", true)
    }
</script>