"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const header_1 = require("../../config/header");
class PreValidacaoService {
    createValidationFile(data, uuid) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!data.parametrosBanco) {
                throw new TypeError("Parametros não informados");
            }
            else {
                let mes = data.parametrosBanco.find(par => par.nome == "Mes");
                if (!mes) {
                    throw new TypeError("Parametro mês não informado");
                }
                let ano = data.parametrosBanco.find(par => par.nome == "Ano");
                if (!ano) {
                    throw new TypeError("Parametro ano não informado");
                }
                let entidade = data.parametrosBanco.find(par => par.nome == "Entidade");
                if (!entidade) {
                    throw new TypeError("Parametro entidade não informado");
                }
            }
            fs.writeFileSync(path.join(__dirname + `../../pre-validacoes/Parametros - ${uuid}.json`), JSON.stringify(data.parametrosBanco));
            let htmlData = header_1.default(data.validadorTce, uuid, data.parametrosBanco, data.idEntidade, data.nomeEntidade, data.multiplosArquivos);
            fs.writeFileSync(path.join(__dirname + `../../pre-validacoes/${uuid}.html`), htmlData);
        });
    }
    insertValidation(data, uuid) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let jsonData = JSON.parse(fs.readFileSync(path.join(__dirname + `../../pre-validacoes/${uuid}.json`), "utf-8"));
                let newData = "";
                if (JSON.stringify(jsonData)[0] != "[") {
                    newData = `[${JSON.stringify(jsonData).concat("," + JSON.stringify(data))}]`;
                }
                else {
                    let newString = "";
                    let json = JSON.stringify(jsonData);
                    if (json.substr(json.length - 1) == "]") {
                        newString = json.substr(0, json.length - 1);
                    }
                    if (newString != "") {
                        newData = `${newString.concat("," + JSON.stringify(data))}]`;
                    }
                    else {
                        newData = `${json.concat("," + JSON.stringify(data))}`;
                    }
                }
                fs.writeFileSync(path.join(__dirname + `../../pre-validacoes/${uuid}.json`), newData);
            }
            catch (error) {
                fs.writeFileSync(path.join(__dirname + `../../pre-validacoes/${uuid}.json`), `[${JSON.stringify(data)}]`);
            }
        });
    }
    mountValidations(uuid = "") {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let dadosValidacao = [];
                let parametrosValidacao = [];
                try {
                    dadosValidacao = JSON.parse(fs.readFileSync(path.join(__dirname + `../../pre-validacoes/${uuid}.json`), "utf-8"));
                }
                catch (error) {
                    throw new TypeError("Não foram encontradas validações para gerar o arquivo");
                }
                try {
                    parametrosValidacao = JSON.parse(fs.readFileSync(path.join(__dirname + `../../pre-validacoes/Parametros - ${uuid}.json`), "utf-8"));
                }
                catch (error) {
                    throw new TypeError("Não foram encontradas validações para gerar o arquivo");
                }
                let htmlData = fs.readFileSync(path.join(__dirname + `../../pre-validacoes/${uuid}.html`), "utf-8");
                let qtdArquivos = dadosValidacao.length;
                let tabPanes = "";
                let checkboxHeaderId = 0;
                let sectionId = 0;
                let tableId = 0;
                let progressId = 0;
                let checkboxId = 0;
                let idTR = 0;
                let idQtdCorrecao = 0;
                let pId = 0;
                let idQtdErro = 0;
                let idQtdAviso = 0;
                let idBtnShow = 0;
                let inputId = 200;
                let totalErros_geral = 0;
                let totalAvisos_geral = 0;
                let tabPages = "";
                if (qtdArquivos > 1) {
                    tabPages +=
                        '<input onclick="atualizaGraficoStacked()" type="radio" name="tabset" id="Dashboard" aria-controls="Dashboard"><label style="font-size: 15px;" for="Dashboard">Dashboard</label>';
                    tabPages +=
                        '<input type="radio" name="tabset" id="Todos" aria-controls="Todos" checked>';
                    tabPages += '<label style="font-size: 15px;" for="Todos">Todos</label>';
                }
                dadosValidacao.forEach(it => {
                    if (qtdArquivos == 1) {
                        tabPages +=
                            '<input type="radio" name="tabset" id="' +
                                it.nome +
                                '" aria-controls="' +
                                it.nome +
                                '" checked>';
                        tabPages +=
                            '<label style="font-size: 15px;" for="' +
                                it.nome +
                                '">' +
                                it.nome +
                                "</label>";
                    }
                    else {
                        tabPages +=
                            '<input type="radio" name="tabset" id="' +
                                it.nome +
                                '" aria-controls="' +
                                it.nome +
                                '">';
                        tabPages +=
                            '<label style="font-size: 15px;" for="' +
                                it.nome +
                                '">' +
                                it.nome +
                                "</label>";
                    }
                });
                htmlData = htmlData.concat(tabPages);
                tabPanes = '<div class ="tab-panels">';
                if (qtdArquivos > 1) {
                    let totalErros = 0;
                    let totalAvisos = 0;
                    let parMes = parametrosValidacao.find(par => par.nome == "Mes").valor;
                    let parAno = parametrosValidacao.find(par => par.nome == "Ano").valor;
                    tabPanes += '<section id="Dashboard0" class="tab-panel">';
                    tabPanes += '	<div class="container container-fluid">';
                    tabPanes += '		<h2 id="header">';
                    tabPanes += "			<strong>Pré-Validações</strong>";
                    tabPanes +=
                        '			<small class="text-muted">' + parMes + " - " + parAno + "</small>";
                    tabPanes += "		</h2>";
                    tabPanes += '<div class="row m-b-3">';
                    tabPanes += '	<div class="col-xs-3">';
                    tabPanes += '		<div class="bth-card bth-card--filled">';
                    tabPanes += '			<div class="bth-card__body">';
                    tabPanes += '				<div class="col-xs-12">';
                    tabPanes +=
                        '					<h4 style="text-align: center;"><i style="padding-right: 15%;color: #ef1f41;" class="fas fa-exclamation-triangle"></i>Total de erros:<h1 class="ErrosCardDashboard" style="text-align: center;">12345</h1></h4>';
                    tabPanes += "				</div>";
                    tabPanes += "			</div>";
                    tabPanes += "		</div>   ";
                    tabPanes += "	</div>";
                    tabPanes += '	<div class="col-xs-3">';
                    tabPanes += '		<div class="bth-card bth-card--filled">';
                    tabPanes += '			<div class="bth-card__body">';
                    tabPanes += '				<div class="col-xs-12">';
                    tabPanes +=
                        '					<h4 style="text-align: center;"><i style="padding-right: 15%;color: #deea00;" class="fas fa-exclamation-circle"></i>Total de avisos:<h1 class="AvisosCardDashboard" style="text-align: center;">12345</h1></h4>';
                    tabPanes += "				</div>";
                    tabPanes += "			</div>";
                    tabPanes += "		</div>   ";
                    tabPanes += "	</div>";
                    tabPanes += '	<div class="col-xs-3">';
                    tabPanes += '		<div class="bth-card bth-card--filled">';
                    tabPanes += '			<div class="bth-card__body">';
                    tabPanes += '				<div class="col-xs-12">';
                    tabPanes +=
                        '					<h4 style="text-align: center;"><i style="padding-right: 15%;color: #04ce40;" class="fas fa-check-circle"></i>Correções:<h1 class="CorrecoesCardDashboard" style="text-align: center;">12</h1></h4>';
                    tabPanes += "				</div>";
                    tabPanes += "			</div>";
                    tabPanes += "		</div>   ";
                    tabPanes += "	</div>";
                    tabPanes += '	<div class="col-xs-3">';
                    tabPanes += '		<div class="bth-card bth-card--filled">';
                    tabPanes += '			<div class="bth-card__body">';
                    tabPanes += '				<div class="col-xs-12">';
                    tabPanes +=
                        '					<h4 style="text-align: center;"><i style="padding-right: 15%;color: #37474F;" class="far fa-hourglass"></i>Última execução:<h1 class="UltimaExecCardDashboard" style="text-align: center;">21/05/2019</h1></h4>';
                    tabPanes += "				</div>";
                    tabPanes += "			</div>";
                    tabPanes += "		</div>";
                    tabPanes += "	</div>";
                    tabPanes += "</div>";
                    tabPanes += '<div class="row m-b-10">';
                    tabPanes += '	<div class="col-xs-12">';
                    tabPanes += '		<div class="card shadow">';
                    tabPanes += '			<h4 class="card-header">Totais por arquivo</h4>';
                    tabPanes += '			<div class="card-block">';
                    tabPanes += '				<div id="chartContainer"></div>';
                    tabPanes += "			</div>";
                    tabPanes += "		</div>";
                    tabPanes += "	</div>";
                    tabPanes += "</div>";
                    tabPanes += '		<div class="row m-b-1">';
                    tabPanes += '			<div class="col-lg-6">';
                    tabPanes += '				<div class="card shadow">';
                    tabPanes += '					<h4 class="card-header">Erros por arquivo</h4>';
                    tabPanes += '					<div class="card-block">';
                    tabPanes += '						<div id="products-revenue-pie-chart"></div>';
                    tabPanes += "					</div>";
                    tabPanes += "				</div>";
                    tabPanes += "			</div>";
                    tabPanes += '			<div class="col-lg-6">';
                    tabPanes += '				<div class="card shadow">';
                    tabPanes += '					<h4 class="card-header">Avisos por arquivo</h4>';
                    tabPanes += '					<div class="card-block">';
                    tabPanes += '						<div id="graficoAvisosArquivo"></div>';
                    tabPanes += "					</div>";
                    tabPanes += "				</div>";
                    tabPanes += "			</div>";
                    tabPanes += "		</div>";
                    tabPanes += '<div class="row m-b-1">';
                    tabPanes += '	<div class="col-lg-12">';
                    tabPanes += '		<div class="card shadow">';
                    tabPanes +=
                        '			<h4 class="card-header">Evolução das inconsistências por data</h4>';
                    tabPanes += '			<div class="card-block">';
                    tabPanes += '				<div id="graficoEvolucaoInconsistencias"></div>';
                    tabPanes += "			</div>";
                    tabPanes += "		</div>";
                    tabPanes += "	</div>";
                    tabPanes += "</div>";
                    tabPanes += "	</div>";
                    tabPanes += "</section>";
                    tabPanes += '<section id="Todos' + sectionId + '" class="tab-panel">';
                    tabPanes +=
                        '<button class="btn btn-default btn-sm" id="btnGeraCSV01" onclick="geraRelCSV()"><i class="fas fa-download"></i> Exportar para CSV</button>';
                    sectionId++;
                    dadosValidacao.forEach(it => {
                        let nomeEntidade = parametrosValidacao.find(par => par.nome == "Entidade").valor;
                        it.listaValidacoes.forEach(itLog => {
                            if (itLog.tipoMsg == "A") {
                                totalAvisos++;
                                totalAvisos_geral++;
                            }
                            else {
                                totalErros++;
                                totalErros_geral++;
                            }
                        });
                        tabPanes += "<h2>" + it.nome + "</h2>";
                        tabPanes +=
                            "<p>Verifique atentamente as validações informadas abaixo:</p>";
                        tabPanes += '<p style="font-size:85%" id ="p' + pId + '">';
                        tabPanes +=
                            '<i class="fas fa-exclamation-triangle"></i><h7>&nbspErros:</h7><h7 id="qtdErro' +
                                idQtdErro +
                                '">' +
                                "&nbsp" +
                                totalErros +
                                "</h7>&nbsp";
                        tabPanes +=
                            '<i class="fas fa-exclamation-circle"></i><h7>&nbspAvisos:</h7><h7 id="qtdAviso' +
                                idQtdAviso +
                                '">' +
                                "&nbsp" +
                                totalAvisos +
                                "</h7>&nbsp";
                        tabPanes += "</p>";
                        tabPanes +=
                            '<table class="table table-unfixed table-unstriped" id="table">';
                        tabPanes += "<thead>";
                        tabPanes += "<tr>";
                        tabPanes += '<th class="col-fit">Sistema</th>';
                        tabPanes += '<th class="col-fit">Tipo</th>';
                        tabPanes += '<th class="col-fit">Descrição</th>';
                        tabPanes += '<th class="col-fit"> Solução</th>';
                        tabPanes += '<th class="col-fit"> Link</th>';
                        tabPanes += "</tr>";
                        tabPanes += "</thead>";
                        tabPanes += "<tbody>";
                        let indice = 0;
                        it.listaValidacoes.forEach(itemLog => {
                            indice++;
                            let msg = itemLog.msg;
                            let solucao = itemLog.solucao ? itemLog.solucao : "";
                            let link = itemLog.link ? itemLog.link : "";
                            let imagem = itemLog.imagem ? itemLog.imagem : "";
                            let video = itemLog.video ? itemLog.video : "";
                            let sistema = itemLog.sistema ? itemLog.sistema : "Indefinido";
                            if (itemLog.tipoMsg == "A") {
                                if (solucao != "") {
                                    tabPanes += '<tr class="table-warning" id="tr' + idTR + '">';
                                    tabPanes += "<td>" + sistema + "</td>";
                                    tabPanes += "<td>Aviso</td><td>" + msg + "</td>";
                                    tabPanes += "<td>";
                                    if (imagem) {
                                        let botaoImgIdTodos = "botaoImgTodosAviso" + indice;
                                        let idImg = "imagemValidAviso" + indice;
                                        tabPanes +=
                                            '<div style="display: none;"><img id="$idImg" src="$imagem" alt="Validação" style="width:100%;max-width:300px"></div>';
                                        tabPanes +=
                                            '<button onclick="abrirModalImgTodos(\'#$botaoImgIdTodos\',\'#$idImg\')" id="$botaoImgIdTodos" type="button" data-html="true" class="btn btn-default btn-sm">';
                                    }
                                    if (video) {
                                        let btnVideo = "videoId" + indice;
                                        tabPanes +=
                                            '<button id="$btnVideo" type="button" onclick="abrirModalVideoTodos(\'$video\')" class="btn btn-default btn-sm">';
                                    }
                                    if (!imagem && !video) {
                                        tabPanes +=
                                            '<button type="button" data-html="true" class="btn btn-default btn-sm" data-toggle="popover" data-trigger="focus" data-placement="left" title="Solução" data-content="' +
                                                solucao +
                                                '">';
                                    }
                                    tabPanes += '<i class="fas fa-question">';
                                    tabPanes += "</i>";
                                    tabPanes += "</button>";
                                    tabPanes += "</td>";
                                    if (link != "") {
                                        tabPanes += "<td>";
                                        tabPanes += '<a target="_blank" href="' + link + '">';
                                        tabPanes +=
                                            '<button type="button" class="btn btn-default btn-sm" data-toggle="tooltip" data-trigger="focus" title="Clique para acessar o sistema" data-content="">';
                                        tabPanes += '<i class="fas fa-link">';
                                        tabPanes += "</i>";
                                        tabPanes += "</button>";
                                        tabPanes += "</a>";
                                        tabPanes += "</td>";
                                    }
                                    else {
                                        tabPanes += "<td>";
                                        tabPanes += "<a>";
                                        tabPanes +=
                                            '<button type="button" class="btn btn-default btn-sm disabled" data-toggle="tooltip" data-trigger="focus" title="" data-content="" disabled>';
                                        tabPanes += '<i class="fas fa-link">';
                                        tabPanes += "</i>";
                                        tabPanes += "</button>";
                                        tabPanes += "</a>";
                                        tabPanes += "</td>";
                                    }
                                }
                                else {
                                    tabPanes += '<tr class="table-warning" id="tr' + idTR + '">';
                                    tabPanes += "<td>" + sistema + "</td>";
                                    tabPanes += "<td>Aviso</td><td>" + msg + "</td>";
                                    tabPanes += "<td>";
                                    if (imagem) {
                                        let botaoImgIdTodos = "botaoImgTodosAviso" + indice;
                                        let idImg = "imagemValidAviso" + indice;
                                        tabPanes +=
                                            '<div style="display: none;"><img id="$idImg" src="$imagem" alt="Validação" style="width:100%;max-width:300px"></div>';
                                        tabPanes +=
                                            '<button onclick="abrirModalImgTodos(\'#$botaoImgIdTodos\',\'#$idImg\')" id="$botaoImgIdTodos" type="button" data-html="true" class="btn btn-default btn-sm">';
                                    }
                                    if (video) {
                                        let btnVideo = "videoId" + indice;
                                        tabPanes +=
                                            '<button id="$btnVideo" type="button" onclick="abrirModalVideoTodos(\'$video\')" class="btn btn-default btn-sm">';
                                    }
                                    if (!imagem && !video) {
                                        tabPanes +=
                                            '<button type="button" data-html="true" class="btn btn-default btn-sm" data-toggle="popover" data-trigger="focus" data-placement="left" title="Solução" data-content="' +
                                                solucao +
                                                '" disabled>';
                                    }
                                    tabPanes += '<i class="fas fa-question">';
                                    tabPanes += "</i>";
                                    tabPanes += "</button>";
                                    tabPanes += "</td>";
                                    if (link != "") {
                                        tabPanes += "<td>";
                                        tabPanes += '<a target="_blank" href="' + link + '">';
                                        tabPanes +=
                                            '<button type="button" class="btn btn-default btn-sm" data-toggle="tooltip" data-trigger="focus" title="Clique para acessar o sistema" data-content="">';
                                        tabPanes += '<i class="fas fa-link">';
                                        tabPanes += "</i>";
                                        tabPanes += "</button>";
                                        tabPanes += "</a>";
                                        tabPanes += "</td>";
                                    }
                                    else {
                                        tabPanes += "<td>";
                                        tabPanes += "<a>";
                                        tabPanes +=
                                            '<button type="button" class="btn btn-default btn-sm disabled" data-toggle="tooltip" data-trigger="focus" title="" data-content="" disabled>';
                                        tabPanes += '<i class="fas fa-link">';
                                        tabPanes += "</i>";
                                        tabPanes += "</button>";
                                        tabPanes += "</a>";
                                        tabPanes += "</td>";
                                    }
                                }
                            }
                            if (itemLog.tipoMsg == "E") {
                                if (solucao != "") {
                                    tabPanes += '<tr class="table-danger" id="tr' + idTR + '">';
                                    tabPanes += "<td>" + sistema + "</td>";
                                    tabPanes += "<td>Erro</td><td>" + msg + "</td>";
                                    tabPanes += "<td>";
                                    if (imagem) {
                                        let botaoImgIdTodos = "botaoImgTodosErro" + indice;
                                        let idImg = "imagemValidErro" + indice;
                                        tabPanes +=
                                            '<div style="display: none;"><img id="$idImg" src="$imagem" alt="$solucao" style="width:100%;max-width:300px"></div>';
                                        tabPanes +=
                                            '<button onclick="abrirModalImgTodos(\'#$botaoImgIdTodos\',\'#$idImg\')" id="$botaoImgIdTodos" type="button" data-html="true" class="btn btn-default btn-sm">';
                                    }
                                    if (video) {
                                        let btnVideo = "videoId" + indice;
                                        tabPanes +=
                                            '<button id="$btnVideo" type="button" onclick="abrirModalVideoTodos(\'$video\')" class="btn btn-default btn-sm">';
                                    }
                                    if (!imagem && !video) {
                                        tabPanes +=
                                            '<button type="button" data-html="true" class="btn btn-default btn-sm" data-toggle="popover" data-trigger="focus" data-placement="left" title="Solução" data-content="' +
                                                solucao +
                                                '">';
                                    }
                                    tabPanes += '<i class="fas fa-question">';
                                    tabPanes += "</i>";
                                    tabPanes += "</button>";
                                    tabPanes += "</td>";
                                    if (link != "") {
                                        tabPanes += "<td>";
                                        tabPanes +=
                                            '<a target="_blank" href="' +
                                                link +
                                                '"><button type="button" class="btn btn-default btn-sm" data-toggle="popover" data-trigger="focus" title="Clique para acessar o sistema" data-content="">';
                                        tabPanes += '<i class="fas fa-link">';
                                        tabPanes += "</i>";
                                        tabPanes += "</button>";
                                        tabPanes += "</a>";
                                        tabPanes += "</td>";
                                    }
                                    else {
                                        tabPanes += "<td>";
                                        tabPanes += "<a>";
                                        tabPanes +=
                                            '<button type="button" class="btn btn-default btn-sm disabled" data-toggle="popover" data-placement="left" data-trigger="focus" title="" data-content="" disabled>';
                                        tabPanes += '<i class="fas fa-link">';
                                        tabPanes += "</i>";
                                        tabPanes += "</button>";
                                        tabPanes += "</a>";
                                        tabPanes += "</td>";
                                    }
                                }
                                else {
                                    tabPanes += '<tr class="table-danger" id="tr' + idTR + '">';
                                    tabPanes += "<td>" + sistema + "</td>";
                                    tabPanes += "<td>Erro</td><td>" + msg + "</td>";
                                    tabPanes += "<td>";
                                    if (imagem) {
                                        let botaoImgIdTodos = "botaoImgTodosAviso" + indice;
                                        let idImg = "imagemValidAviso" + indice;
                                        tabPanes +=
                                            '<div style="display: none;"><img id="$idImg" src="$imagem" alt="Validação" style="width:100%;max-width:300px"></div>';
                                        tabPanes +=
                                            '<button onclick="abrirModalImgTodos(\'#$botaoImgIdTodos\',\'#$idImg\')" id="$botaoImgIdTodos" type="button" data-html="true" class="btn btn-default btn-sm">';
                                    }
                                    if (video) {
                                        let btnVideo = "videoId" + indice;
                                        tabPanes +=
                                            '<button id="$btnVideo" type="button" onclick="abrirModalVideoTodos(\'$video\')" class="btn btn-default btn-sm">';
                                    }
                                    if (!imagem && !video) {
                                        tabPanes +=
                                            '<button type="button" data-html="true" class="btn btn-default btn-sm" data-toggle="popover" data-trigger="focus" data-placement="left" title="Solução" data-content="' +
                                                solucao +
                                                '"> disabled';
                                    }
                                    tabPanes += '<i class="fas fa-question">';
                                    tabPanes += "</i>";
                                    tabPanes += "</button>";
                                    tabPanes += "</td>";
                                    if (link != "") {
                                        tabPanes += "<td>";
                                        tabPanes +=
                                            '<a target="_blank" href="' +
                                                link +
                                                '"><button type="button" class="btn btn-default btn-sm" data-toggle="tooltip" data-trigger="focus" title="Clique para acessar o sistema" data-content="">';
                                        tabPanes += '<i class="fas fa-link">';
                                        tabPanes += "</i>";
                                        tabPanes += "</button>";
                                        tabPanes += "</a>";
                                        tabPanes += "</td>";
                                    }
                                    else {
                                        tabPanes += "<td>";
                                        tabPanes += "<a>";
                                        tabPanes +=
                                            '<button type="button" class="btn btn-default btn-sm disabled" data-toggle="tooltip" data-trigger="focus" title="" data-content="" disabled>';
                                        tabPanes += '<i class="fas fa-link">';
                                        tabPanes += "</i>";
                                        tabPanes += "</button>";
                                        tabPanes += "</a>";
                                        tabPanes += "</td>";
                                    }
                                }
                            }
                            idTR++;
                            checkboxId++;
                        });
                        idQtdCorrecao++;
                        idQtdErro++;
                        idQtdAviso++;
                        pId++;
                        progressId++;
                        totalErros = 0;
                        totalAvisos = 0;
                        tabPanes += "</tbody>";
                        tabPanes += "</table>";
                    });
                }
                tabPanes += "</section>";
                let indice = 0;
                dadosValidacao.forEach(it => {
                    let totalErros = 0;
                    let totalAvisos = 0;
                    indice++;
                    it.listaValidacoes.forEach(itLog => {
                        if (itLog.tipoMsg == "A") {
                            totalAvisos++;
                        }
                        else {
                            totalErros++;
                        }
                    });
                    let inputId = "inputTodos" + 100;
                    let inputgroup = "inputgrptd" + indice;
                    tabPanes +=
                        '<section id="' + it.nome + sectionId + '" class="tab-panel">';
                    tabPanes +=
                        '<button id="btnShow' +
                            idBtnShow +
                            '" type="button" class="btn btn-default btn-sm" onclick="acaoMostrarEsconder(' +
                            "'" +
                            "btnShow" +
                            idBtnShow +
                            "'" +
                            ')">Esconder resolvidos</button>';
                    tabPanes += "<h2>" + it.nome + "</h2>";
                    tabPanes +=
                        "<p>Verifique atentamente as validações informadas abaixo:</p>";
                    tabPanes += '<p style="font-size:85%" id ="p' + pId + '">';
                    tabPanes +=
                        '<i class="fas fa-exclamation-triangle"></i><h7>&nbspErros:</h7><h7 id="qtdErro' +
                            idQtdErro +
                            '">' +
                            totalErros +
                            "&nbsp" +
                            "</h7>&nbsp";
                    tabPanes +=
                        '<i class="fas fa-exclamation-circle"></i><h7>&nbspAvisos:</h7><h7 id="qtdAviso' +
                            idQtdAviso +
                            '">' +
                            totalAvisos +
                            "&nbsp" +
                            "</h7>&nbsp";
                    tabPanes +=
                        '<i class="fas fa-check-circle"></i><h7>&nbspCorreções:</h7><h7 id="qtdCorrecao' +
                            "&nbsp" +
                            idQtdCorrecao +
                            '">0<h7>';
                    tabPanes += "</p>";
                    tabPanes += "<br>";
                    tabPanes += '<div id="$inputgroup" class="input-group open">';
                    tabPanes +=
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
                    tabPanes += '<div class="input-group-btn">';
                    tabPanes +=
                        '<button type="button" class="btn btn-default btn-sm" title="Pesquisar"><i class="fa fa-search"></i></button>';
                    tabPanes += "</div>";
                    tabPanes += "</div>";
                    tabPanes += "<br>";
                    tabPanes +=
                        '<table class="table table-unfixed table-unstriped" id="' +
                            tableId +
                            '">';
                    tabPanes += "<thead>";
                    tabPanes += "<tr>";
                    tabPanes += '<th class="col-fit">';
                    tabPanes +=
                        '<a type="button" class="btn btn-default btn-xs" id="chbox' +
                            it.nome +
                            '" onclick="acaoCheckBoxHeader(' +
                            "'" +
                            it.nome +
                            sectionId +
                            "'" +
                            "," +
                            "'chbox" +
                            it.nome +
                            "'" +
                            ')" style="">';
                    tabPanes += '<i class="fas fa-check-double"></i>';
                    tabPanes += "</a>";
                    tabPanes += "</th>";
                    tabPanes += "<th>Sistema</th>";
                    tabPanes += "<th>Tipo</th>";
                    tabPanes += "<th>Descrição</th>";
                    tabPanes += '<th class="col-fit"> Solução</th>';
                    tabPanes += '<th class="col-fit"> Link</th>';
                    tabPanes += "</tr>";
                    tabPanes += "</thead>";
                    tabPanes += "<tbody>";
                    idBtnShow++;
                    tableId++;
                    idQtdCorrecao;
                    idQtdErro++;
                    idQtdAviso++;
                    progressId++;
                    sectionId++;
                    it.listaValidacoes.forEach(itemLog => {
                        let msg = itemLog.msg;
                        let solucao = itemLog.solucao ? itemLog.solucao : "";
                        let link = itemLog.link ? itemLog.link : "";
                        let sistema = itemLog.sistema ? itemLog.sistema : "Indefinido";
                        let imagem = itemLog.imagem ? itemLog.imagem : "";
                        let video = itemLog.video ? itemLog.video : "";
                        if (itemLog.tipoMsg == "A") {
                            if (solucao != "") {
                                tabPanes += '<tr class="table-warning" id="tr' + idTR + '">';
                                tabPanes += "<td>";
                                tabPanes += '<div class="bth-checkbox">';
                                tabPanes +=
                                    '<input id="chbox' +
                                        checkboxId +
                                        '" type="checkbox" class="ng-pristine ng-valid ng-touched" style="" onclick="marcaResolvido(' +
                                        "'tr" +
                                        idTR +
                                        "'" +
                                        "," +
                                        "'" +
                                        "p" +
                                        pId +
                                        "'" +
                                        ')">';
                                tabPanes += '<label for="chbox' + checkboxId + '"></label>';
                                tabPanes += "</div>";
                                tabPanes += "</td>";
                                tabPanes += "<td>" + sistema + "</td>";
                                tabPanes += "<td>Aviso</td><td>" + msg + "</td>";
                                tabPanes += "<td>";
                                if (imagem) {
                                    let botaoImgId = "botaoImgAviso" + indice;
                                    let idImg = "imagemValidAviso" + (indice + 50);
                                    tabPanes +=
                                        '<div style="display: none;"><img id="$idImg" src="$imagem" alt="$solucao" style="width:100%;max-width:300px"></div>';
                                    tabPanes +=
                                        '<button onclick="abrirModalImg(\'#$botaoImgId\',\'#$inputgroup\',\'#$idImg\')" id="$botaoImgId" type="button" data-html="true" class="btn btn-default btn-sm">';
                                }
                                if (video) {
                                    let btnVideo = "videoId" + indice;
                                    tabPanes +=
                                        '<button id="$btnVideo" type="button" onclick="abrirModalVideoTodos(\'$video\')" class="btn btn-default btn-sm">';
                                }
                                if (!imagem && !video) {
                                    tabPanes +=
                                        '<button type="button" data-html="true" class="btn btn-default btn-sm" data-toggle="popover" data-trigger="focus" data-placement="left" title="Solução" data-content="' +
                                            solucao +
                                            '">';
                                }
                                tabPanes += '<i class="fas fa-question"></i>';
                                tabPanes += "</button>";
                                tabPanes += "</td>";
                                if (link != "") {
                                    tabPanes += "<td>";
                                    tabPanes += '<a target="_blank" href="' + link + '">';
                                    tabPanes +=
                                        '<button type="button" class="btn btn-default btn-sm" data-toggle="tooltip" data-trigger="focus" title="Clique para acessar o sistema" data-content="">';
                                    tabPanes += '<i class="fas fa-link"></i>';
                                    tabPanes += "</button>";
                                    tabPanes += "</a>";
                                    tabPanes += "</td>";
                                }
                                else {
                                    tabPanes += "<td>";
                                    tabPanes +=
                                        '<a><button type="button" class="btn btn-default btn-sm disabled" data-toggle="tooltip" data-trigger="focus" title="" data-content="" disabled>';
                                    tabPanes += '<i class="fas fa-link"></i>';
                                    tabPanes += "</button>";
                                    tabPanes += "</a>";
                                    tabPanes += "</td>";
                                }
                            }
                            else {
                                tabPanes += '<tr class="table-warning" id="tr' + idTR + '">';
                                tabPanes += "<td>";
                                tabPanes += '<div class="bth-checkbox">';
                                tabPanes +=
                                    '<input id="chbox' +
                                        checkboxId +
                                        '" type="checkbox" class="ng-pristine ng-valid ng-touched" style="" onclick="marcaResolvido(' +
                                        "'tr" +
                                        idTR +
                                        "'" +
                                        "," +
                                        "'" +
                                        "p" +
                                        pId +
                                        "'" +
                                        ')">';
                                tabPanes += '<label for="chbox' + checkboxId + '"></label>';
                                tabPanes += "</div>";
                                tabPanes += "</td>";
                                tabPanes += "<td>" + sistema + "</td>";
                                tabPanes += "<td>Aviso</td><td>" + msg + "</td>";
                                tabPanes += "<td>";
                                if (imagem) {
                                    let botaoImgId = "botaoImgAviso" + (indice + 200);
                                    let idImg = "imagemValidAviso" + (indice + 100);
                                    tabPanes +=
                                        '<div style="display: none;"><img id="$idImg" src="$imagem" alt="$solucao" style="width:100%;max-width:300px"></div>';
                                    tabPanes +=
                                        '<button onclick="abrirModalImg(\'#$botaoImgId\',\'#$inputgroup\',\'#$idImg\')" id="$botaoImgId" type="button" data-html="true" class="btn btn-default btn-sm">';
                                }
                                if (video) {
                                    let btnVideo = "videoId" + indice;
                                    tabPanes +=
                                        '<button id="$btnVideo" type="button" onclick="abrirModalVideoTodos(\'$video\')" class="btn btn-default btn-sm">';
                                }
                                if (!imagem && !video) {
                                    tabPanes +=
                                        '<button type="button" data-html="true" class="btn btn-default btn-sm" data-toggle="popover" data-trigger="focus" data-placement="left" title="Solução" data-content="' +
                                            solucao +
                                            '" disabled>';
                                }
                                tabPanes += '<i class="fas fa-question"></i>';
                                tabPanes += "</button>";
                                tabPanes += "</td>";
                                if (link != "") {
                                    tabPanes += "<td>";
                                    tabPanes += '<a target="_blank" href="' + link + '">';
                                    tabPanes +=
                                        '<button type="button" class="btn btn-default btn-sm" data-toggle="tooltip" data-trigger="focus" title="Clique para acessar o sistema" data-content="">';
                                    tabPanes += '<i class="fas fa-link"></i>';
                                    tabPanes += "</button>";
                                    tabPanes += "</a>";
                                    tabPanes += "</td>";
                                }
                                else {
                                    tabPanes += "<td>";
                                    tabPanes += "<a>";
                                    tabPanes +=
                                        '<button type="button" class="btn btn-default btn-sm disabled" data-toggle="tooltip" data-trigger="focus" title="" data-content="" disabled>';
                                    tabPanes += '<i class="fas fa-link"></i>';
                                    tabPanes += "</button>";
                                    tabPanes += "</a>";
                                    tabPanes += "</td>";
                                }
                            }
                        }
                        if (itemLog.tipoMsg == "E") {
                            if (solucao != "") {
                                tabPanes += '<tr class="table-danger" id="tr' + idTR + '">';
                                tabPanes += "<td>";
                                tabPanes += '<div class="bth-checkbox">';
                                tabPanes +=
                                    '<input id="chbox' +
                                        checkboxId +
                                        '" type="checkbox" class="ng-pristine ng-valid ng-touched" style="" onclick="marcaResolvido(' +
                                        "'tr" +
                                        idTR +
                                        "'" +
                                        "," +
                                        "'" +
                                        "p" +
                                        pId +
                                        "'" +
                                        ')">';
                                tabPanes += '<label for="chbox' + checkboxId + '"></label>';
                                tabPanes += "</div>";
                                tabPanes += "</td>";
                                tabPanes += "<td>" + sistema + "</td>";
                                tabPanes += "<td>Erro</td><td>" + msg + "</td>";
                                tabPanes += "<td>";
                                if (imagem) {
                                    let botaoImgId = "botaoImgErro" + (indice + 200);
                                    let idImg = "imagemValidErro" + (indice + 100);
                                    tabPanes +=
                                        '<div style="display: none;"><img id="$idImg" src="$imagem" alt="$solucao" style="width:100%;max-width:300px"></div>';
                                    tabPanes +=
                                        '<button onclick="abrirModalImg(\'#$botaoImgId\',\'#$inputgroup\',\'#$idImg\')" id="$botaoImgId" type="button" data-html="true" class="btn btn-default btn-sm">';
                                }
                                if (video) {
                                    let btnVideo = "videoId" + indice;
                                    tabPanes +=
                                        '<button id="$btnVideo" type="button" onclick="abrirModalVideoTodos(\'$video\')" class="btn btn-default btn-sm">';
                                }
                                if (!imagem && !video) {
                                    tabPanes +=
                                        '<button type="button" data-html="true" class="btn btn-default btn-sm" data-toggle="popover" data-trigger="focus" data-placement="left" title="Solução" data-content="' +
                                            solucao +
                                            '">';
                                }
                                tabPanes += '<i class="fas fa-question"></i>';
                                tabPanes += "</button>";
                                tabPanes += "</td>";
                                if (link != "") {
                                    tabPanes += "<td>";
                                    tabPanes +=
                                        '<a target="_blank" href="' +
                                            link +
                                            '"><button type="button" class="btn btn-default btn-sm" data-toggle="tooltip" data-trigger="focus" title="Clique para acessar o sistema" data-content="">';
                                    tabPanes += '<i class="fas fa-link"></i>';
                                    tabPanes += "</button>";
                                    tabPanes += "</a>";
                                    tabPanes += "</td>";
                                }
                                else {
                                    tabPanes += "<td>";
                                    tabPanes += "<a>";
                                    tabPanes +=
                                        '<button type="button" class="btn btn-default btn-sm disabled" data-toggle="tooltip" data-trigger="focus" title="" data-content="" disabled>';
                                    tabPanes += '<i class="fas fa-link"></i>';
                                    tabPanes += "</button>";
                                    tabPanes += "</a>";
                                    tabPanes += "</td>";
                                }
                            }
                            else {
                                tabPanes += '<tr class="table-danger" id="tr' + idTR + '">';
                                tabPanes += "<td>";
                                tabPanes += '<div class="bth-checkbox">';
                                tabPanes +=
                                    '<input id="chbox' +
                                        checkboxId +
                                        '" type="checkbox" class="ng-pristine ng-valid ng-touched" style="" onclick="marcaResolvido(' +
                                        "'tr" +
                                        idTR +
                                        "'" +
                                        "," +
                                        "'" +
                                        "p" +
                                        pId +
                                        "'" +
                                        ')">';
                                tabPanes += '<label for="chbox' + checkboxId + '"></label>';
                                tabPanes += "</div>";
                                tabPanes += "</td>";
                                tabPanes += "<td>" + sistema + "</td>";
                                tabPanes += "<td>Erro</td><td>" + msg + "</td>";
                                tabPanes += "<td>";
                                if (imagem) {
                                    let botaoImgId = "botaoImgErro" + (indice + 200);
                                    let idImg = "imagemValidErro" + (indice + 100);
                                    tabPanes +=
                                        '<div style="display: none;"><img id="$idImg" src="$imagem" alt="$solucao" style="width:100%;max-width:300px"></div>';
                                    tabPanes +=
                                        '<button onclick="abrirModalImg(\'#$botaoImgId\',\'#$inputgroup\',\'#$idImg\')" id="$botaoImgId" type="button" data-html="true" class="btn btn-default btn-sm">';
                                }
                                if (video) {
                                    let btnVideo = "videoId" + indice;
                                    tabPanes +=
                                        '<button id="$btnVideo" type="button" onclick="abrirModalVideoTodos(\'$video\')" class="btn btn-default btn-sm">';
                                }
                                if (!imagem && !video) {
                                    tabPanes +=
                                        '<button type="button" data-html="true" class="btn btn-default btn-sm" data-toggle="popover" data-trigger="focus" data-placement="left" title="Solução" data-content="' +
                                            solucao +
                                            '" disabled>';
                                }
                                tabPanes += '<i class="fas fa-question"></i>';
                                tabPanes += "</button>";
                                tabPanes += "</td>";
                                if (link != "") {
                                    tabPanes += "<td>";
                                    tabPanes +=
                                        '<a target="_blank" href="' +
                                            link +
                                            '"><button type="button" class="btn btn-default btn-sm" data-toggle="tooltip" data-trigger="focus" title="Clique para acessar o sistema" data-content="">';
                                    tabPanes += '<i class="fas fa-link"></i>';
                                    tabPanes += "</button>";
                                    tabPanes += "</a>";
                                    tabPanes += "</td>";
                                }
                                else {
                                    tabPanes += "<td>";
                                    tabPanes += "<a>";
                                    tabPanes +=
                                        '<button type="button" class="btn btn-default btn-sm disabled" data-toggle="tooltip" data-trigger="focus" title="" data-content="" disabled>';
                                    tabPanes += '<i class="fas fa-link"></i>';
                                    tabPanes += "</button>";
                                    tabPanes += "</a>";
                                    tabPanes += "</td>";
                                }
                            }
                        }
                        idTR++;
                        checkboxId++;
                    });
                    pId++;
                    tabPanes += "</tbody>";
                    tabPanes += "</table>";
                    tabPanes += "</section>";
                });
                tabPanes += "</div></div></div>";
                tabPanes += "<script>";
                tabPanes += "    function abrirModalImg(btnId,input,imgId) {";
                tabPanes += "        var input = document.querySelector(input);";
                tabPanes += "        var btn = document.querySelector(btnId);";
                tabPanes += '        var modal = document.querySelector("#myModal");';
                tabPanes += "        var img = document.querySelector(imgId);";
                tabPanes += '        var modalImg = document.querySelector("#img01");';
                tabPanes +=
                    '        var captionText = document.querySelector("#caption");';
                tabPanes += "        btn.onclick = function () {";
                tabPanes += '            modal.style.display = "block";';
                tabPanes += "            modalImg.src = img.src;";
                tabPanes += "            captionText.innerHTML = img.alt;";
                tabPanes += '            input.style.display = "none";';
                tabPanes += "        };";
                tabPanes += "        modal.onclick = function () {";
                tabPanes += '            input.style.display = "";';
                tabPanes += '            modal.style.display = "none";';
                tabPanes += "        };";
                tabPanes += "    btn.onclick();";
                tabPanes += "    };";
                tabPanes += "function abrirModalImgTodos(btnId,imgId) {";
                tabPanes += "    var btn = document.querySelector(btnId);";
                tabPanes += '    var modal = document.querySelector("#myModal");';
                tabPanes += "    var img = document.querySelector(imgId);";
                tabPanes += '    var modalImg = document.querySelector("#img01");';
                tabPanes += '    var captionText = document.querySelector("#caption");';
                tabPanes += "    btn.onclick = function () {";
                tabPanes += '        modal.style.display = "block";';
                tabPanes += "        modalImg.src = img.src;";
                tabPanes += "        captionText.innerHTML = img.alt;";
                tabPanes += "    };";
                tabPanes += "    modal.onclick = function () {";
                tabPanes += '        modal.style.display = "none";';
                tabPanes += "    };";
                tabPanes += "    btn.onclick();";
                tabPanes += "}   ";
                tabPanes += "function abrirModalVideoTodos(srcVideo) {";
                tabPanes +=
                    '    var iframe = document.querySelector("#iframevideo").src = srcVideo;';
                tabPanes +=
                    '    var display = document.querySelector("#modalVideo").style.display;';
                tabPanes += '    if (display === "none") {';
                tabPanes +=
                    '        var display = document.querySelector("#modalVideo").style.display = "block";';
                tabPanes += "    }";
                tabPanes += "};";
                tabPanes += "function escondeModalVideo() {";
                tabPanes +=
                    '    document.querySelector("#modalVideo").style.display = "none";';
                tabPanes += "};";
                tabPanes += "$(document).keyup(function (e) {";
                tabPanes += "    var modals = document.querySelectorAll('.modal');";
                tabPanes += '    if (e.key === "Escape") {';
                tabPanes += "        modals.forEach(modal => {";
                tabPanes += '            modal.style.display = "none";';
                tabPanes += "        });";
                tabPanes += "    }";
                tabPanes += "});";
                tabPanes += "</script>";
                tabPanes += "</body></html>";
                htmlData = htmlData.concat(tabPanes);
                fs.writeFileSync(path.join(__dirname + `../../pre-validacoes/${uuid}.html`), htmlData);
            }
            catch (error) {
                throw new TypeError(error.message);
            }
        });
    }
}
exports.PreValidacaoService = PreValidacaoService;
//# sourceMappingURL=PreValidacaoService.js.map