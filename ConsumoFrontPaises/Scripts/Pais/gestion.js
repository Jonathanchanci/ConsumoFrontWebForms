$(function () {
    $.ajax({
        url: "http://localhost:58525/api/pais",
        type: "get",
        success: function (res) {
            var table = "";
            $.each(res, function (i, v) {
                table += `
                            <tr>
                                <th scope="row">${v.IdPais}</th>
                                <td>${v.NombrePais}</td>
                                <td>${v.Descripcion}</td>
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
                    var idPais = fila[0].children[0].textContent;
                    var nombrePais = fila[0].children[1].textContent;
                    Swal.fire({
                        title: `Estas seguro ?`,
                        text: `Eliminaras definitivamente a ${nombrePais}!`,
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Si, eliminar!'
                    }).then((result) => {
                        if (result.value) {
                            $.ajax({
                                url: "http://localhost:58525/api/pais/" + idPais,
                                type: "DELETE",
                                success: function (res) {
                                    Swal.fire(
                                        'Eliminado!',
                                        `Ya no existe ${nombrePais}`,
                                        'success'
                                    ).then( ()=> location.reload());
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
                    var idPais = fila[0].children[0].textContent;
                    var nombrePais = fila[0].children[1].textContent;
                    var descPais = fila[0].children[2].textContent;

                    $("#nombrePais").val(nombrePais);
                    $("#descPais").val(descPais);

                });
            }
        }
    });

    $("#btnSubmit").click(function () {
        var nombre = $("#nombrePais").val();
        var desc = $("#descPais").val();

        var validationForm = formIsValid(nombre, desc);
        if (validationForm === "OK") {
            var pais = new Object();            
            pais.NombrePais = nombre;
            pais.Descripcion = desc;
            
            $.ajax({
                url: "http://localhost:58525/api/pais",
                type: "post",
                data: pais,
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

    function formIsValid(nombre, desc) {
        var msg = "OK";
        if (nombre === "" || nombre === null || nombre === undefined) {
            msg = "El campo nombre es requerido \n";
        }
        return msg;
    }

    function cerrarModal() {
        $("#nombrePais").val("");
        $("#descPais").val("");
        $("#formPises").modal("hide");
    }
});