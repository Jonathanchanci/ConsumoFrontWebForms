<%@ Page Title="Home Page" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="ConsumoFrontPaises._Default" %>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">

    <h1>Lista de paises</h1>
    <hr />
    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#formPises">
        <span class="glyphicon glyphicon-plus"></span>
        Nuevo
    </button>
    <div class="row">
        <table class="table" id="tblPais">
            <thead>
                <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Descripción</th>
                    <th scope="col">Gestión</th>
                </tr>
            </thead>
            <tbody id="contentTable">
            </tbody>
        </table>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="formPises" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title" id="myModalLabel">Gestión de pais</h4>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="form-group">
                            <label for="nombrePais">Nombre</label>
                            <input type="text" class="form-control" id="nombrePais" placeholder="Ingrese el nombre del pais">
                        </div>
                        <div class="form-group">
                            <label for="descPais">Descripción</label>
                            <textarea rows="3" class="form-control" id="descPais" placeholder="Ingrese la descripcion del pais"></textarea>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
                    <button type="button" id="btnSubmit" class="btn btn-primary">Guardar</button>
                </div>
            </div>
        </div>
    </div>

    <script src="Scripts/Pais/gestion.js"></script>
</asp:Content>

