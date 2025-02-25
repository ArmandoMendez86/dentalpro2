document.addEventListener("DOMContentLoaded", async () => {
  const formPaciente = document.getElementById("formPaciente");
  const formEditarPaciente = document.getElementById("formEditarPaciente");
  const listaPacientes = document.getElementById("listaPacientes");

  // Cargar pacientes al cargar la página
  async function cargarPacientes() {
    $(".tabPacientes").DataTable().destroy();
    listaPacientes.innerHTML = "";
    const pacientes = await Paciente.obtenerTodos();
    let plantilla = ``;

    pacientes.forEach((paciente) => {
      plantilla += `
      <tr>
        <td>${paciente.id}</td>
        <td>${paciente.nombre}</td>
        <td>${paciente.telefono}</td>
        <td>${paciente.email}</td>
        <td>${paciente.direccion}</td>
        <td>${paciente.fecha_registro}</td>
        <td>${paciente.fecha_cumple}</td>
        <td>${paciente.ocupacion}</td>
        <td>${paciente.enfermedades_c}</td>
        <td>${paciente.antecedentes_p}</td>
        <td>${paciente.alergias}</td>
        <td>${paciente.medicacion}</td>
        <td>
          <button id='editarCliente' type="button" class='btn btn-warning' data-bs-toggle="modal" data-bs-target="#staticBackdrop">
            <i class='fa fa-pencil'></i>
          </button>
          <button class='btn btn-danger'>
            <i class='fa fa-times'></i>
          </button>
        </td>
      </tr>`;
    });

    listaPacientes.innerHTML = plantilla;
    $(".tabPacientes").DataTable({
      columnDefs: [{ targets: [0], visible: false }],
      language: {
        url: "../../public/js/mx.json",
      },
    });
  }

  formPaciente.addEventListener("submit", async (event) => {
    event.preventDefault();

    const nuevoPaciente = new Paciente(
      null,
      formPaciente.nombre.value,
      formPaciente.telefono.value,
      formPaciente.email.value,
      formPaciente.direccion.value,
      formPaciente.fecha_cumple.value,
      formPaciente.ocupacion.value,
      formPaciente.enfermedades_c.value,
      formPaciente.antecedentes_p.value,
      formPaciente.alergias.value,
      formPaciente.medicacion.value
    );

    const respuesta = await nuevoPaciente.guardar();
    if (respuesta.success) {
      alert("Paciente guardado correctamente");
      formPaciente.reset();
      cargarPacientes();
      document.querySelector("#errorContainer").innerHTML = "";
    } else {
      document.querySelector("#errorContainer").innerHTML = "";
      respuesta.errores.forEach((error) => {
        const p = document.createElement("p");
        p.textContent = error;
        p.style.color = "#FFF";
        p.style.backgroundColor = "red";
        document.querySelector("#errorContainer").appendChild(p);
      });
    }
  });

  document
    .querySelector(".tabPacientes")
    .addEventListener("click", async (e) => {
      let btnEditar = e.target.closest(".btn-warning");
      let btnEliminar = e.target.closest(".btn-danger");
      if (btnEditar) {
        let row = btnEditar.closest("tr");
        let rowData = $(".tabPacientes").DataTable().row(row).data();
        document.querySelector("#idEditarPaciente").value = rowData[0];
        document.querySelector("#editarNombre").value = rowData[1];
        document.querySelector("#editarTelefono").value = rowData[2];
        document.querySelector("#editarEmail").value = rowData[3];
        document.querySelector("#editarDireccion").value = rowData[4];
        document.querySelector("#editar_fecha_cumple").value = rowData[6];
        document.querySelector("#editarOcupacion").value = rowData[7];
        document.querySelector("#editarEnfermedades_c").value = rowData[8];
        document.querySelector("#editarAntecedentes_p").value = rowData[9];
        document.querySelector("#editarAlergias").value = rowData[10];
        document.querySelector("#editarMedicacion").value = rowData[11];
      }
      if (btnEliminar) {
        let row = btnEliminar.closest("tr");
        let rowData = $(".tabPacientes").DataTable().row(row).data();

        Swal.fire({
          title: "Quiere eliminar?",
          text: "Esto no se podra revertir!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Si",
          cancelButtonText: "No",
        }).then(async (result) => {
          if (result.isConfirmed) {
            Swal.fire({
              title: "Eliminado!",
              text: "Registro de paciente eliminado.",
              icon: "success",
            });

            const eliminarPaciente = new Paciente(rowData[0]);
            await eliminarPaciente.eliminar();
            cargarPacientes();
          }
        });
      }
    });

  document
    .querySelector("#formEditarPaciente")
    .addEventListener("submit", async (e) => {
      e.preventDefault();
      const editarPaciente = new Paciente(
        formEditarPaciente.idEditarPaciente.value,
        formEditarPaciente.editarNombre.value,
        formEditarPaciente.editarTelefono.value,
        formEditarPaciente.editarEmail.value,
        formEditarPaciente.editarDireccion.value,
        formEditarPaciente.editar_fecha_cumple.value,
        formEditarPaciente.editarOcupacion.value,
        formEditarPaciente.editarEnfermedades_c.value,
        formEditarPaciente.editarAntecedentes_p.value,
        formEditarPaciente.editarAlergias.value,
        formEditarPaciente.editarMedicacion.value
      );

      const respuesta = await editarPaciente.editar();

      if (respuesta.success) {
        alert("Paciente editado correctamente");
        formEditarPaciente.reset();
        cargarPacientes();
        document.querySelector("#errorEditContainer").innerHTML = "";
        $("#staticBackdrop").modal("hide");
      } else {
        document.querySelector("#errorEditContainer").innerHTML = "";
        respuesta.errores.forEach((error) => {
          const p = document.createElement("p");
          p.textContent = error;
          p.style.color = "#FFF";
          p.style.backgroundColor = "red";
          document.querySelector("#errorEditContainer").appendChild(p);
        });
      }
    });

  await cargarPacientes();
});
