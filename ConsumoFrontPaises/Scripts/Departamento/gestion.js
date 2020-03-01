$(function () {

    $("#btnNuevo").click(function () {
        $("#idDep").val("");
    });

    $.ajax({
        url: "http://localhost:58525/api/pais/",
        type: "get",
        success: function (res) {
            var paises = "";
            $.each(res, function (i, v) {
                paises += `<option value='${v.IdPais}'> ${v.NombrePais}</option>`;
            });
            $("#idPais").append(paises);
        },
        error: function (err) {
            console.log(err);
        }
    });

    $.ajax({
        url: "http://localhost:58525/api/Departamentos",
        type: "get",
        success: function (res) {
            var table = "";
            $.each(res, function (i, v) {
                table += `
                            <tr>
                                <th scope="row">${v.id}</th>
                                <td>${v.nombre}</td>
                                <td>${v.descripcion}</td>
                                <td>${v.idPais}</td>
                                <td>${getNamePais(v.idPais).NombrePais}</td>
                                <td>
                                    <button class="btn btn-warning" title="Editar" type="button">
                                        <span class="glyphicon glyphicon-pencil"></span>
                                    </button> |
                                    <button class="btn btn-danger" title="Eliminar" type="button">
                                        <span class="glyphicon glyphicon-trash"></span>
                                    </button> 
                                </td>
                            </tr>
                        `;
            });
            $("#contentTable").append(table);
        },
        error: function (err) {
            console.log(err);
        },
        complete: function (jqXHR, textStatus) {
            if (textStatus === "success") {
                //Eliminar
                $(".btn-danger").click(function () {
                    var fila = $(this).closest("tr");
                    var idDep = fila[0].children[0].textContent;
                    var nombreDep = fila[0].children[1].textContent;
                    Swal.fire({
                        title: `Estas seguro ?`,
                        text: `Eliminaras definitivamente a ${nombreDep}!`,
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Si, eliminar!'
                    }).then((result) => {
                        if (result.value) {
                            $.ajax({
                                url: "http://localhost:58525/api/departamentos/" + idDep,
                                type: "DELETE",
                                success: function (res) {
                                    Swal.fire(
                                        'Eliminado!',
                                        `Ya no existe ${nombreDep}`,
                                        'success'
                                    ).then(() => location.reload());
                                },
                                error: function (err) {
                                    console.log(err);
                                }
                            });

                        }
                    });

                });
                //Actualizar
                $(".btn-warning").click(function () {
                    var fila = $(this).closest("tr");
                    var idDep = fila[0].children[0].textContent;
                    var nombreDep = fila[0].children[1].textContent;
                    var descDep = fila[0].children[2].textContent;
                    var idPais = fila[0].children[3].textContent;

                    $("#nombreDep").val(nombreDep);
                    $("#descDep").val(descDep);
                    $("#idDep").val(idDep);
                    $("#idPais").val(idPais);
                    $("#formDep").modal("show");

                });
            }
        }
    });

    function getNamePais(idPais) {
        var pais = "";
        $.ajax({
            url: "http://localhost:58525/api/pais/" + idPais,
            type: "get",
            async : false,
            success: function (res) {
                pais = res;           
            },
            error: function (err) {
                console.log(err);
            }
        });
        return pais;
    }

    $("#btnSubmit").click(function () {
        var nombreDep = $("#nombreDep").val();
        var descDep = $("#descDep").val();
        var idDep = $("#idDep").val();
        var idPais = $("#idPais").val();
        var tipo = "POST";

        if (idDep !== "") {
            tipo = "PUT";
        }

        var validationForm = formIsValid(nombreDep,idPais);
        if (validationForm === "") {
            var Dep = new Object();
            if (idDep !== "") {
                Dep.id = idDep;
            }
            Dep.nombre = nombreDep;
            Dep.descripcion = descDep;
            Dep.idPais = idPais;

            $.ajax({
                url: "http://localhost:58525/api/departamentos/" + idDep,
                type: tipo,
                data: Dep,
                success: function (res) {
                    console.log(res);
                    cerrarModal();
                    location.reload();
                },
                error: function (err) {
                    console.log(err);
                }
            });
        } else {
            alert(validationForm);
        }
    });

    function formIsValid(nombre, pais) {
        var msg = "";
        if (nombre === "" || nombre === null || nombre === undefined) {
            msg = "El campo nombre es requerido \n";
        }
        if (pais === "" || pais === null || pais === undefined) {
            msg += "El campo pais es requerido \n";
        }
        return msg;
    }

    function cerrarModal() {
        $("#nombreDep").val("");
        $("#descDep").val("");
        $("#idPais").val("");
        $("#formDep").modal("hide");
    }
});