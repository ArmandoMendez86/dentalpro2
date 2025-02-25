class Paciente {
  constructor(
    id,
    nombre,
    telefono,
    email,
    direccion,
    fecha_cumple,
    ocupacion,
    enfermedadesC,
    antecedentesP,
    alergias,
    medicacion
  ) {
    this.id = id;
    this.nombre = nombre;
    this.telefono = telefono;
    this.email = email;
    this.direccion = direccion;
    this.fecha_cumple = fecha_cumple;
    this.ocupacion = ocupacion;
    this.enfermedadesC = enfermedadesC;
    this.antecedentesP = antecedentesP;
    this.alergias = alergias;
    this.medicacion = medicacion;
  }

  //-----------------------------------GUARDAR-----------------------------------//
  async guardar() {
    const errores = this.validar();
    if (errores.length > 0) {
      return { success: false, errores };
    }

    const respuesta = await fetch(
      "../../app/controladores/PacienteController.php?action=guardar",
      {
        method: "POST",
        body: JSON.stringify(this),
        headers: { "Content-Type": "application/json" },
      }
    );
    return await respuesta.json();
  }
  //-----------------------------------EDITAR-----------------------------------//
  async editar() {
    const errores = this.validar();
    if (errores.length > 0) {
      return { success: false, errores };
    }
    const respuesta = await fetch(
      "../../app/controladores/PacienteController.php?action=editar",
      {
        method: "POST",
        body: JSON.stringify(this),
        headers: { "Content-Type": "application/json" },
      }
    );
    return await respuesta.json();
  }
  //-----------------------------------ELIMINAR-----------------------------------//
  async eliminar() {
    const respuesta = await fetch(
      "../../app/controladores/PacienteController.php?action=eliminar",
      {
        method: "POST",
        body: JSON.stringify(this.id),
        headers: { "Content-Type": "application/json" },
      }
    );
    return await respuesta.json();
  }

  //-----------------------------------LISTAR TODOS-----------------------------------//
  static async obtenerTodos() {
    const respuesta = await fetch(
      "../../app/controladores/PacienteController.php?action=listar"
    );
    return await respuesta.json();
  }

  //-----------------------------------VALIDACIONES-----------------------------------//

  validar() {
    const errores = [];

    if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(this.nombre)) {
      errores.push("El nombre solo puede contener letras, acentos, ñ y espacios.");
    }
    

    const fechaIngresada = new Date(this.fecha_cumple);

    if (isNaN(fechaIngresada.getTime())) {
      errores.push("La fecha no puede estar vacía.");
    }

    /*   if (!/^[a-zA-Z\s]+$/.test(this.apellido)) {
      errores.push("El apellido solo puede contener letras y espacios.");
    }
 */
    if (!/^\d{8,15}$/.test(this.telefono)) {
      errores.push("El teléfono debe contener entre 8 y 15 dígitos.");
    }

    /* if (!/^\S+@\S+\.\S+$/.test(this.email)) {
      errores.push("El email no es válido.");
    } */

    /*  if (this.direccion.length < 5) {
      errores.push("La dirección debe tener al menos 5 caracteres.");
    } */

    return errores;
  }
}
