<%@ Page MasterPageFile="~/Site.Master" Language="C#" AutoEventWireup="true" CodeBehind="index.aspx.cs" Inherits="ConsumoFrontPaises.Departamento.index" %>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">
    <h1>Lista de Departamentos</h1>
    <hr />
    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#formDep" id="btnNuevo">
        <span class="glyphicon glyphicon-plus"></span>
        Nuevo
    </button>
    <div class="row">
        <table class="table" id="tblDep">
            <thead>
                <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Descripción</th>
                    <th scope="col">Id Pais</th>
                    <th scope="col">Pais</th>
                    <th scope="col">Gestión</th>
                </tr>
            </thead>
            <tbody id="contentTable">
            </tbody>
        </table>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="formDep" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title" id="myModalLabel">Gestión de Departamentos</h4>
                </div>
                <div class="modal-body">
                    <form>
                        <input type="hidden" id="idDep" />
                        <div class="form-group">
                            <label for="nombreDep">Nombre</label>
                            <input type="text" class="form-control" id="nombreDep" placeholder="Ingrese el nombre del pais">
                        </div>
                        <div class="form-group">
                            <label for="descDep">Descripción</label>
                            <textarea rows="3" class="form-control" id="descDep" placeholder="Ingrese la descripcion del pais"></textarea>
                        </div>
                        <div class="form-group">
                            <label for="idPais">Pais</label>
                            <select class="form-control" id="idPais">
                                <option value="">-- Seleecione un pais --</option>
                            </select>
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
    <script src="../Scripts/Departamento/gestion.js"></script>
</asp:Content>
