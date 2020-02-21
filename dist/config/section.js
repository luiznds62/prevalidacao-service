"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid = require("uuid/v1");
function section(nome = "", listaValidacoes = []) {
    let totalErros = 0;
    let totalAvisos = 0;
    let sectionId = uuid();
    let buttonId = uuid();
    let idQtdErro = uuid();
    let idQtdAviso = uuid();
    let idQtdCorrecao = uuid();
    let pId = uuid();
    let inputId = uuid();
    let tableId = uuid();
    let html = "";
    html += `<section id="${nome.concat(sectionId)}" class="tab-panel">`;
    html +=
        '<button id="btnShow' +
            buttonId +
            '" type="button" class="btn btn-default btn-sm" onclick="acaoMostrarEsconder(' +
            "'" +
            "btnShow" +
            buttonId +
            "'" +
            ')">Esconder resolvidos</button>';
    html += "<h2>" + nome + "</h2>";
    html += "<p>Verifique atentamente as validações informadas abaixo:</p>";
    html += '<p style="font-size:85%" id ="p' + pId + '">';
    html +=
        '<i class="fas fa-exclamation-triangle"></i><h7>&nbspErros:</h7><h7 id="qtdErro' +
            idQtdErro +
            '">' +
            totalErros +
            "&nbsp" +
            "</h7>&nbsp";
    html +=
        '<i class="fas fa-exclamation-circle"></i><h7>&nbspAvisos:</h7><h7 id="qtdAviso' +
            idQtdAviso +
            '">' +
            totalAvisos +
            "&nbsp" +
            "</h7>&nbsp";
    html +=
        '<i class="fas fa-check-circle"></i><h7>&nbspCorreções:</h7><h7 id="qtdCorrecao' +
            "&nbsp" +
            idQtdCorrecao +
            '">0<h7>';
    html += "</p>";
    html += "<br>";
    html += '<div id="$inputgroup" class="input-group open">';
    html +=
        '<input class="form-control input-sm search-field" type="text" id="' +
            inputId +
            '" onkeyup=' +
            "'" +
            "searchTableTodos" +
            '("' +
            tableId +
            '","' +
            inputId +
            '")' +
            "'" +
            ' placeholder="Pesquisar">';
    html += '<div class="input-group-btn">';
    html +=
        '<button type="button" class="btn btn-default btn-sm" title="Pesquisar"><i class="fa fa-search"></i></button>';
    html += "</div>";
    html += "</div>";
    html += "<br>";
    html +=
        '<table class="table table-unfixed table-unstriped" id="' + tableId + '">';
    html += "<thead>";
    html += "<tr>";
    html += '<th class="col-fit">';
    html +=
        '<a type="button" class="btn btn-default btn-xs" id="chbox' +
            nome +
            '" onclick="acaoCheckBoxHeader(' +
            "'" +
            nome +
            sectionId +
            "'" +
            "," +
            "'chbox" +
            nome +
            "'" +
            ')" style="">';
    html += '<i class="fas fa-check-double"></i>';
    html += "</a>";
    html += "</th>";
    html += "<th>Sistema</th>";
    html += "<th>Tipo</th>";
    html += "<th>Descrição</th>";
    html += '<th class="col-fit"> Solução</th>';
    html += '<th class="col-fit"> Link</th>';
    html += "</tr>";
    html += "</thead>";
    html += "<tbody>";
    let indice = 0;
    for (let i = 0; i < listaValidacoes.length; i++) {
        indice++;
        let it = listaValidacoes[i];
        let msg = it.msg;
        let solucao = it.solucao;
        let link = it.link;
        let imagem = it.imagem;
        let video = it.video;
        let sistema = it.sistema;
        let idTR = uuid();
        if (it.tipoMsg == "A") {
            if (solucao != "") {
                html += '<tr class="table-warning" id="tr' + idTR + '">';
                html += "<td>" + sistema + "</td>";
                html += "<td>Aviso</td><td>" + msg + "</td>";
                html += "<td>";
                if (imagem) {
                    let botaoImgIdTodos = "botaoImgTodosAviso" + indice;
                    let idImg = "imagemValidAviso" + indice;
                    html +=
                        '<div style="display: none;"><img id="$idImg" src="$imagem" alt="Validação" style="width:100%;max-width:300px"></div>';
                    html +=
                        "<button onclick=\"abrirModalImgTodos('#" +
                            botaoImgIdTodos +
                            "','#" +
                            idImg +
                            '\')" id="$botaoImgIdTodos" type="button" data-html="true" class="btn btn-default btn-sm">';
                }
                if (video) {
                    let btnVideo = "videoId" + indice;
                    html += `<button id="${btnVideo}" type=\"button\" onclick=\"abrirModalVideoTodos('$video')\" class=\"btn btn-default btn-sm\">`;
                }
                if (!imagem && !video) {
                    html +=
                        '<button type="button" data-html="true" class="btn btn-default btn-sm" data-toggle="popover" data-trigger="focus" data-placement="left" title="Solução" data-content="' +
                            solucao +
                            '">';
                }
                html += '<i class="fas fa-question">';
                html += "</i>";
                html += "</button>";
                html += "</td>";
                if (link != "") {
                    html += "<td>";
                    html += '<a target="_blank" href="' + link + '">';
                    html +=
                        '<button type="button" class="btn btn-default btn-sm" data-toggle="tooltip" data-trigger="focus" title="Clique para acessar o sistema" data-content="">';
                    html += '<i class="fas fa-link">';
                    html += "</i>";
                    html += "</button>";
                    html += "</a>";
                    html += "</td>";
                }
                else {
                    html += "<td>";
                    html += "<a>";
                    html +=
                        '<button type="button" class="btn btn-default btn-sm disabled" data-toggle="tooltip" data-trigger="focus" title="" data-content="" disabled>';
                    html += '<i class="fas fa-link">';
                    html += "</i>";
                    html += "</button>";
                    html += "</a>";
                    html += "</td>";
                }
            }
            else {
                html += '<tr class="table-warning" id="tr' + idTR + '">';
                html += "<td>" + sistema + "</td>";
                html += "<td>Aviso</td><td>" + msg + "</td>";
                html += "<td>";
                if (imagem) {
                    let botaoImgIdTodos = "botaoImgTodosAviso" + indice;
                    let idImg = "imagemValidAviso" + indice;
                    html += `<div style="display: none;"><img id="${idImg}" src="$imagem" alt="Validação" style="width:100%;max-width:300px"></div>`;
                    html += `<button onclick="abrirModalImgTodos('#${botaoImgIdTodos}','#${idImg}')" id="${botaoImgIdTodos}" type="button" data-html="true" class="btn btn-default btn-sm">`;
                }
                if (video) {
                    let btnVideo = "videoId" + indice;
                    html += `<button id="${btnVideo}" type="button" onclick="abrirModalVideoTodos('${video}')" class="btn btn-default btn-sm">`;
                }
                if (!imagem && !video) {
                    html +=
                        '<button type="button" data-html="true" class="btn btn-default btn-sm" data-toggle="popover" data-trigger="focus" data-placement="left" title="Solução" data-content="' +
                            solucao +
                            '" disabled>';
                }
                html += '<i class="fas fa-question">';
                html += "</i>";
                html += "</button>";
                html += "</td>";
                if (link != "") {
                    html += "<td>";
                    html += '<a target="_blank" href="' + link + '">';
                    html +=
                        '<button type="button" class="btn btn-default btn-sm" data-toggle="tooltip" data-trigger="focus" title="Clique para acessar o sistema" data-content="">';
                    html += '<i class="fas fa-link">';
                    html += "</i>";
                    html += "</button>";
                    html += "</a>";
                    html += "</td>";
                }
                else {
                    html += "<td>";
                    html += "<a>";
                    html +=
                        '<button type="button" class="btn btn-default btn-sm disabled" data-toggle="tooltip" data-trigger="focus" title="" data-content="" disabled>';
                    html += '<i class="fas fa-link">';
                    html += "</i>";
                    html += "</button>";
                    html += "</a>";
                    html += "</td>";
                }
            }
        }
        if (it.tipoMsg == "E") {
            if (solucao != "") {
                html += '<tr class="table-danger" id="tr' + idTR + '">';
                html += "<td>" + sistema + "</td>";
                html += "<td>Erro</td><td>" + msg + "</td>";
                html += "<td>";
                if (imagem) {
                    let botaoImgIdTodos = "botaoImgTodosAviso" + indice;
                    let idImg = "imagemValidAviso" + indice;
                    html += `<div style="display: none;"><img id="${idImg}" src="$imagem" alt="Validação" style="width:100%;max-width:300px"></div>`;
                    html += `<button onclick="abrirModalImgTodos('#${botaoImgIdTodos}','#${idImg}')" id="${botaoImgIdTodos}" type="button" data-html="true" class="btn btn-default btn-sm">`;
                }
                if (video) {
                    let btnVideo = "videoId" + indice;
                    html += `<button id="${btnVideo}" type="button" onclick="abrirModalVideoTodos('${video}')" class="btn btn-default btn-sm">`;
                }
                if (!imagem && !video) {
                    html +=
                        '<button type="button" data-html="true" class="btn btn-default btn-sm" data-toggle="popover" data-trigger="focus" data-placement="left" title="Solução" data-content="' +
                            solucao +
                            '" disabled>';
                }
                html += '<i class="fas fa-question">';
                html += "</i>";
                html += "</button>";
                html += "</td>";
                if (link != "") {
                    html += "<td>";
                    html +=
                        '<a target="_blank" href="' +
                            link +
                            '"><button type="button" class="btn btn-default btn-sm" data-toggle="popover" data-trigger="focus" title="Clique para acessar o sistema" data-content="">';
                    html += '<i class="fas fa-link">';
                    html += "</i>";
                    html += "</button>";
                    html += "</a>";
                    html += "</td>";
                }
                else {
                    html += "<td>";
                    html += "<a>";
                    html +=
                        '<button type="button" class="btn btn-default btn-sm disabled" data-toggle="popover" data-placement="left" data-trigger="focus" title="" data-content="" disabled>';
                    html += '<i class="fas fa-link">';
                    html += "</i>";
                    html += "</button>";
                    html += "</a>";
                    html += "</td>";
                }
            }
            else {
                html += '<tr class="table-danger" id="tr' + idTR + '">';
                html += "<td>" + sistema + "</td>";
                html += "<td>Erro</td><td>" + msg + "</td>";
                html += "<td>";
                if (imagem) {
                    let botaoImgIdTodos = "botaoImgTodosAviso" + indice;
                    let idImg = "imagemValidAviso" + indice;
                    html += `<div style="display: none;"><img id="${idImg}" src="$imagem" alt="Validação" style="width:100%;max-width:300px"></div>`;
                    html += `<button onclick="abrirModalImgTodos('#${botaoImgIdTodos}','#${idImg}')" id="${botaoImgIdTodos}" type="button" data-html="true" class="btn btn-default btn-sm">`;
                }
                if (video) {
                    let btnVideo = "videoId" + indice;
                    html += `<button id="${btnVideo}" type="button" onclick="abrirModalVideoTodos('${video}')" class="btn btn-default btn-sm">`;
                }
                if (!imagem && !video) {
                    html +=
                        '<button type="button" data-html="true" class="btn btn-default btn-sm" data-toggle="popover" data-trigger="focus" data-placement="left" title="Solução" data-content="' +
                            solucao +
                            '" disabled>';
                }
                html += '<i class="fas fa-question">';
                html += "</i>";
                html += "</button>";
                html += "</td>";
                if (link != "") {
                    html += "<td>";
                    html +=
                        '<a target="_blank" href="' +
                            link +
                            '"><button type="button" class="btn btn-default btn-sm" data-toggle="tooltip" data-trigger="focus" title="Clique para acessar o sistema" data-content="">';
                    html += '<i class="fas fa-link">';
                    html += "</i>";
                    html += "</button>";
                    html += "</a>";
                    html += "</td>";
                }
                else {
                    html += "<td>";
                    html += "<a>";
                    html +=
                        '<button type="button" class="btn btn-default btn-sm disabled" data-toggle="tooltip" data-trigger="focus" title="" data-content="" disabled>';
                    html += '<i class="fas fa-link">';
                    html += "</i>";
                    html += "</button>";
                    html += "</a>";
                    html += "</td>";
                }
            }
        }
    }
    return html;
}
exports.default = section;
//# sourceMappingURL=section.js.map