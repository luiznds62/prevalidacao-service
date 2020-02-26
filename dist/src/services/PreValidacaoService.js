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
    validate(data) {
        if (!data.validadorTce) {
            throw new TypeError("Nome do TCE validador não informado");
        }
        if (!data.idEntidade) {
            throw new TypeError("Id da entidade não informado");
        }
        if (!data.nomeEntidade) {
            throw new TypeError("Nome da entidade não informado");
        }
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
    }
    createValidationFile(data, uuid) {
        return __awaiter(this, void 0, void 0, function* () {
            this.validate(data);
            fs.writeFileSync(path.join(__dirname + `../../pre-validacoes/Parametros - ${uuid}.json`), JSON.stringify(data.parametrosBanco));
            let htmlData = header_1.default(data.validadorTce, uuid, data.parametrosBanco, data.idEntidade, data.nomeEntidade);
            fs.writeFileSync(path.join(__dirname + `../../pre-validacoes/${uuid}.html`), htmlData);
        });
    }
    insertValidation(data, uuid) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!uuid) {
                throw new TypeError("UUID não informado");
            }
            if (!data) {
                throw new TypeError("Dados de validação não informados");
            }
            else {
                if (!data.nome) {
                    throw new TypeError("Nome do Lote não informado");
                }
                if (!data.listaValidacoes) {
                    throw new TypeError("Lista de validações não informada");
                }
                else if (data.listaValidacoes.length === 0) {
                    throw new TypeError("Lista de validações não contém dados");
                }
            }
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
            if (!uuid) {
                throw new TypeError("UUID não informado");
            }
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
                var arquivo = fs.createWriteStream(__dirname + `../../pre-validacoes/${uuid}.html`, {
                    flags: 'a' // 'a' means appending (old data will be preserved)
                });
                let qtdArquivos = dadosValidacao.length;
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
                    arquivo.write('<input onclick="atualizaGraficoStacked()" type="radio" name="tabset" id="Dashboard" aria-controls="Dashboard"><label style="font-size: 15px;" for="Dashboard">Dashboard</label>');
                    arquivo.write('<input type="radio" name="tabset" id="Todos" aria-controls="Todos" checked>');
                    arquivo.write('<label style="font-size: 15px;" for="Todos">Todos</label>');
                }
                dadosValidacao.forEach(it => {
                    if (qtdArquivos == 1) {
                        arquivo.write('<input type="radio" name="tabset" id="' + it.nome + '" aria-controls="' + it.nome + '" checked>');
                        arquivo.write('<label style="font-size: 15px;" for="' + it.nome + '">' + it.nome + "</label>");
                    }
                    else {
                        arquivo.write('<input type="radio" name="tabset" id="' + it.nome + '" aria-controls="' + it.nome + '">');
                        arquivo.write('<label style="font-size: 15px;" for="' + it.nome + '">' + it.nome + "</label>");
                    }
                });
                arquivo.write('<div class ="tab-panels">');
                if (qtdArquivos > 1) {
                    let totalErros = 0;
                    let totalAvisos = 0;
                    let parMes = parametrosValidacao.find(par => par.nome == "Mes").valor;
                    let parAno = parametrosValidacao.find(par => par.nome == "Ano").valor;
                    arquivo.write('<section id="Dashboard0" class="tab-panel">');
                    arquivo.write('	<div class="container container-fluid">');
                    arquivo.write('		<h2 id="header">');
                    arquivo.write("			<strong>Pré-Validações</strong>");
                    arquivo.write('			<small class="text-muted">' + parMes + " - " + parAno + "</small>");
                    arquivo.write("		</h2>");
                    arquivo.write('<div class="row m-b-3">');
                    arquivo.write('	<div class="col-xs-3">');
                    arquivo.write('		<div class="bth-card bth-card--filled">');
                    arquivo.write('			<div class="bth-card__body">');
                    arquivo.write('				<div class="col-xs-12">');
                    arquivo.write('					<h4 style="text-align: center;"><i style="padding-right: 15%;color: #ef1f41;" class="fas fa-exclamation-triangle"></i>Total de erros:<h1 class="ErrosCardDashboard" style="text-align: center;">12345</h1></h4>');
                    arquivo.write("				</div>");
                    arquivo.write("			</div>");
                    arquivo.write("		</div>   ");
                    arquivo.write("	</div>");
                    arquivo.write('	<div class="col-xs-3">');
                    arquivo.write('		<div class="bth-card bth-card--filled">');
                    arquivo.write('			<div class="bth-card__body">');
                    arquivo.write('				<div class="col-xs-12">');
                    arquivo.write('					<h4 style="text-align: center;"><i style="padding-right: 15%;color: #deea00;" class="fas fa-exclamation-circle"></i>Total de avisos:<h1 class="AvisosCardDashboard" style="text-align: center;">12345</h1></h4>');
                    arquivo.write("				</div>");
                    arquivo.write("			</div>");
                    arquivo.write("		</div>   ");
                    arquivo.write("	</div>");
                    arquivo.write('	<div class="col-xs-3">');
                    arquivo.write('		<div class="bth-card bth-card--filled">');
                    arquivo.write('			<div class="bth-card__body">');
                    arquivo.write('				<div class="col-xs-12">');
                    arquivo.write('					<h4 style="text-align: center;"><i style="padding-right: 15%;color: #04ce40;" class="fas fa-check-circle"></i>Correções:<h1 class="CorrecoesCardDashboard" style="text-align: center;">12</h1></h4>');
                    arquivo.write("				</div>");
                    arquivo.write("			</div>");
                    arquivo.write("		</div>   ");
                    arquivo.write("	</div>");
                    arquivo.write('	<div class="col-xs-3">');
                    arquivo.write('		<div class="bth-card bth-card--filled">');
                    arquivo.write('			<div class="bth-card__body">');
                    arquivo.write('				<div class="col-xs-12">');
                    arquivo.write('					<h4 style="text-align: center;"><i style="padding-right: 15%;color: #37474F;" class="far fa-hourglass"></i>Última execução:<h1 class="UltimaExecCardDashboard" style="text-align: center;">21/05/2019</h1></h4>');
                    arquivo.write("				</div>");
                    arquivo.write("			</div>");
                    arquivo.write("		</div>");
                    arquivo.write("	</div>");
                    arquivo.write("</div>");
                    arquivo.write('<div class="row m-b-10">');
                    arquivo.write('	<div class="col-xs-12">');
                    arquivo.write('		<div class="card shadow">');
                    arquivo.write('			<h4 class="card-header">Totais por arquivo</h4>');
                    arquivo.write('			<div class="card-block">');
                    arquivo.write('				<div id="chartContainer"></div>');
                    arquivo.write("			</div>");
                    arquivo.write("		</div>");
                    arquivo.write("	</div>");
                    arquivo.write("</div>");
                    arquivo.write('		<div class="row m-b-1">');
                    arquivo.write('			<div class="col-lg-6">');
                    arquivo.write('				<div class="card shadow">');
                    arquivo.write('					<h4 class="card-header">Erros por arquivo</h4>');
                    arquivo.write('					<div class="card-block">');
                    arquivo.write('						<div id="products-revenue-pie-chart"></div>');
                    arquivo.write("					</div>");
                    arquivo.write("				</div>");
                    arquivo.write("			</div>");
                    arquivo.write('			<div class="col-lg-6">');
                    arquivo.write('				<div class="card shadow">');
                    arquivo.write('					<h4 class="card-header">Avisos por arquivo</h4>');
                    arquivo.write('					<div class="card-block">');
                    arquivo.write('						<div id="graficoAvisosArquivo"></div>');
                    arquivo.write("					</div>");
                    arquivo.write("				</div>");
                    arquivo.write("			</div>");
                    arquivo.write("		</div>");
                    arquivo.write('<div class="row m-b-1">');
                    arquivo.write('	<div class="col-lg-12">');
                    arquivo.write('		<div class="card shadow">');
                    arquivo.write('			<h4 class="card-header">Evolução das inconsistências por data</h4>');
                    arquivo.write('			<div class="card-block">');
                    arquivo.write('				<div id="graficoEvolucaoInconsistencias"></div>');
                    arquivo.write("			</div>");
                    arquivo.write("		</div>");
                    arquivo.write("	</div>");
                    arquivo.write("</div>");
                    arquivo.write("	</div>");
                    arquivo.write("</section>");
                    arquivo.write('<section id="Todos' + sectionId + '" class="tab-panel">');
                    arquivo.write('<button class="btn btn-default btn-sm" id="btnGeraCSV01" onclick="geraRelCSV()"><i class="fas fa-download"></i> Exportar para CSV</button>');
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
                        arquivo.write("<h2>" + it.nome + "</h2>");
                        arquivo.write("<p>Verifique atentamente as validações informadas abaixo:</p>");
                        arquivo.write('<p style="font-size:85%" id ="p' + pId + '">');
                        arquivo.write('<i class="fas fa-exclamation-triangle"></i><h7>&nbspErros:</h7><h7 id="qtdErro' + idQtdErro + '">' + "&nbsp" + totalErros + "</h7>&nbsp");
                        arquivo.write('<i class="fas fa-exclamation-circle"></i><h7>&nbspAvisos:</h7><h7 id="qtdAviso' + idQtdAviso + '">' + "&nbsp" + totalAvisos + "</h7>&nbsp");
                        arquivo.write("</p>");
                        arquivo.write('<table class="table table-unfixed table-unstriped" id="table">');
                        arquivo.write("<thead>");
                        arquivo.write("<tr>");
                        arquivo.write('<th class="col-fit">Sistema</th>');
                        arquivo.write('<th class="col-fit">Tipo</th>');
                        arquivo.write('<th class="col-fit">Descrição</th>');
                        arquivo.write('<th class="col-fit"> Solução</th>');
                        arquivo.write('<th class="col-fit"> Link</th>');
                        arquivo.write("</tr>");
                        arquivo.write("</thead>");
                        arquivo.write("<tbody>");
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
                                    arquivo.write('<tr class="table-warning" id="tr' + idTR + '">');
                                    arquivo.write("<td>" + sistema + "</td>");
                                    arquivo.write("<td>Aviso</td><td>" + msg + "</td>");
                                    arquivo.write("<td>");
                                    if (imagem) {
                                        let botaoImgIdTodos = "botaoImgTodosAviso" + indice;
                                        let idImg = "imagemValidAviso" + indice;
                                        arquivo.write('<div style="display: none;"><img id="$idImg" src="$imagem" alt="Validação" style="width:100%;max-width:300px"></div>');
                                        arquivo.write('<button onclick="abrirModalImgTodos(\'#$botaoImgIdTodos\',\'#$idImg\')" id="$botaoImgIdTodos" type="button" data-html="true" class="btn btn-default btn-sm">');
                                    }
                                    if (video) {
                                        let btnVideo = "videoId" + indice;
                                        arquivo.write('<button id="$btnVideo" type="button" onclick="abrirModalVideoTodos(\'$video\')" class="btn btn-default btn-sm">');
                                    }
                                    if (!imagem && !video) {
                                        arquivo.write('<button type="button" data-html="true" class="btn btn-default btn-sm" data-toggle="popover" data-trigger="focus" data-placement="left" title="Solução" data-content="' + solucao + '">');
                                    }
                                    arquivo.write('<i class="fas fa-question">');
                                    arquivo.write("</i>");
                                    arquivo.write("</button>");
                                    arquivo.write("</td>");
                                    if (link != "") {
                                        arquivo.write("<td>");
                                        arquivo.write('<a target="_blank" href="' + link + '">');
                                        arquivo.write('<button type="button" class="btn btn-default btn-sm" data-toggle="tooltip" data-trigger="focus" title="Clique para acessar o sistema" data-content="">');
                                        arquivo.write('<i class="fas fa-link">');
                                        arquivo.write("</i>");
                                        arquivo.write("</button>");
                                        arquivo.write("</a>");
                                        arquivo.write("</td>");
                                    }
                                    else {
                                        arquivo.write("<td>");
                                        arquivo.write("<a>");
                                        arquivo.write('<button type="button" class="btn btn-default btn-sm disabled" data-toggle="tooltip" data-trigger="focus" title="" data-content="" disabled>');
                                        arquivo.write('<i class="fas fa-link">');
                                        arquivo.write("</i>");
                                        arquivo.write("</button>");
                                        arquivo.write("</a>");
                                        arquivo.write("</td>");
                                    }
                                }
                                else {
                                    arquivo.write('<tr class="table-warning" id="tr' + idTR + '">');
                                    arquivo.write("<td>" + sistema + "</td>");
                                    arquivo.write("<td>Aviso</td><td>" + msg + "</td>");
                                    arquivo.write("<td>");
                                    if (imagem) {
                                        let botaoImgIdTodos = "botaoImgTodosAviso" + indice;
                                        let idImg = "imagemValidAviso" + indice;
                                        arquivo.write('<div style="display: none;"><img id="$idImg" src="$imagem" alt="Validação" style="width:100%;max-width:300px"></div>');
                                        arquivo.write('<button onclick="abrirModalImgTodos(\'#$botaoImgIdTodos\',\'#$idImg\')" id="$botaoImgIdTodos" type="button" data-html="true" class="btn btn-default btn-sm">');
                                    }
                                    if (video) {
                                        let btnVideo = "videoId" + indice;
                                        arquivo.write('<button id="$btnVideo" type="button" onclick="abrirModalVideoTodos(\'$video\')" class="btn btn-default btn-sm">');
                                    }
                                    if (!imagem && !video) {
                                        arquivo.write('<button type="button" data-html="true" class="btn btn-default btn-sm" data-toggle="popover" data-trigger="focus" data-placement="left" title="Solução" data-content="' + solucao + '" disabled>');
                                    }
                                    arquivo.write('<i class="fas fa-question">');
                                    arquivo.write("</i>");
                                    arquivo.write("</button>");
                                    arquivo.write("</td>");
                                    if (link != "") {
                                        arquivo.write("<td>");
                                        arquivo.write('<a target="_blank" href="' + link + '">');
                                        arquivo.write('<button type="button" class="btn btn-default btn-sm" data-toggle="tooltip" data-trigger="focus" title="Clique para acessar o sistema" data-content="">');
                                        arquivo.write('<i class="fas fa-link">');
                                        arquivo.write("</i>");
                                        arquivo.write("</button>");
                                        arquivo.write("</a>");
                                        arquivo.write("</td>");
                                    }
                                    else {
                                        arquivo.write("<td>");
                                        arquivo.write("<a>");
                                        arquivo.write('<button type="button" class="btn btn-default btn-sm disabled" data-toggle="tooltip" data-trigger="focus" title="" data-content="" disabled>');
                                        arquivo.write('<i class="fas fa-link">');
                                        arquivo.write("</i>");
                                        arquivo.write("</button>");
                                        arquivo.write("</a>");
                                        arquivo.write("</td>");
                                    }
                                }
                            }
                            if (itemLog.tipoMsg == "E") {
                                if (solucao != "") {
                                    arquivo.write('<tr class="table-danger" id="tr' + idTR + '">');
                                    arquivo.write("<td>" + sistema + "</td>");
                                    arquivo.write("<td>Erro</td><td>" + msg + "</td>");
                                    arquivo.write("<td>");
                                    if (imagem) {
                                        let botaoImgIdTodos = "botaoImgTodosErro" + indice;
                                        let idImg = "imagemValidErro" + indice;
                                        arquivo.write('<div style="display: none;"><img id="$idImg" src="$imagem" alt="$solucao" style="width:100%;max-width:300px"></div>');
                                        arquivo.write('<button onclick="abrirModalImgTodos(\'#$botaoImgIdTodos\',\'#$idImg\')" id="$botaoImgIdTodos" type="button" data-html="true" class="btn btn-default btn-sm">');
                                    }
                                    if (video) {
                                        let btnVideo = "videoId" + indice;
                                        arquivo.write('<button id="$btnVideo" type="button" onclick="abrirModalVideoTodos(\'$video\')" class="btn btn-default btn-sm">');
                                    }
                                    if (!imagem && !video) {
                                        arquivo.write('<button type="button" data-html="true" class="btn btn-default btn-sm" data-toggle="popover" data-trigger="focus" data-placement="left" title="Solução" data-content="' + solucao + '">');
                                    }
                                    arquivo.write('<i class="fas fa-question">');
                                    arquivo.write("</i>");
                                    arquivo.write("</button>");
                                    arquivo.write("</td>");
                                    if (link != "") {
                                        arquivo.write("<td>");
                                        arquivo.write('<a target="_blank" href="' + link + '"><button type="button" class="btn btn-default btn-sm" data-toggle="popover" data-trigger="focus" title="Clique para acessar o sistema" data-content="">');
                                        arquivo.write('<i class="fas fa-link">');
                                        arquivo.write("</i>");
                                        arquivo.write("</button>");
                                        arquivo.write("</a>");
                                        arquivo.write("</td>");
                                    }
                                    else {
                                        arquivo.write("<td>");
                                        arquivo.write("<a>");
                                        arquivo.write('<button type="button" class="btn btn-default btn-sm disabled" data-toggle="popover" data-placement="left" data-trigger="focus" title="" data-content="" disabled>');
                                        arquivo.write('<i class="fas fa-link">');
                                        arquivo.write("</i>");
                                        arquivo.write("</button>");
                                        arquivo.write("</a>");
                                        arquivo.write("</td>");
                                    }
                                }
                                else {
                                    arquivo.write('<tr class="table-danger" id="tr' + idTR + '">');
                                    arquivo.write("<td>" + sistema + "</td>");
                                    arquivo.write("<td>Erro</td><td>" + msg + "</td>");
                                    arquivo.write("<td>");
                                    if (imagem) {
                                        let botaoImgIdTodos = "botaoImgTodosAviso" + indice;
                                        let idImg = "imagemValidAviso" + indice;
                                        arquivo.write('<div style="display: none;"><img id="$idImg" src="$imagem" alt="Validação" style="width:100%;max-width:300px"></div>');
                                        arquivo.write('<button onclick="abrirModalImgTodos(\'#$botaoImgIdTodos\',\'#$idImg\')" id="$botaoImgIdTodos" type="button" data-html="true" class="btn btn-default btn-sm">');
                                    }
                                    if (video) {
                                        let btnVideo = "videoId" + indice;
                                        arquivo.write('<button id="$btnVideo" type="button" onclick="abrirModalVideoTodos(\'$video\')" class="btn btn-default btn-sm">');
                                    }
                                    if (!imagem && !video) {
                                        arquivo.write('<button type="button" data-html="true" class="btn btn-default btn-sm" data-toggle="popover" data-trigger="focus" data-placement="left" title="Solução" data-content="' + solucao + '"> disabled');
                                    }
                                    arquivo.write('<i class="fas fa-question">');
                                    arquivo.write("</i>");
                                    arquivo.write("</button>");
                                    arquivo.write("</td>");
                                    if (link != "") {
                                        arquivo.write("<td>");
                                        arquivo.write('<a target="_blank" href="' + link + '"><button type="button" class="btn btn-default btn-sm" data-toggle="tooltip" data-trigger="focus" title="Clique para acessar o sistema" data-content="">');
                                        arquivo.write('<i class="fas fa-link">');
                                        arquivo.write("</i>");
                                        arquivo.write("</button>");
                                        arquivo.write("</a>");
                                        arquivo.write("</td>");
                                    }
                                    else {
                                        arquivo.write("<td>");
                                        arquivo.write("<a>");
                                        arquivo.write('<button type="button" class="btn btn-default btn-sm disabled" data-toggle="tooltip" data-trigger="focus" title="" data-content="" disabled>');
                                        arquivo.write('<i class="fas fa-link">');
                                        arquivo.write("</i>");
                                        arquivo.write("</button>");
                                        arquivo.write("</a>");
                                        arquivo.write("</td>");
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
                        arquivo.write("</tbody>");
                        arquivo.write("</table>");
                    });
                }
                arquivo.write("</section>");
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
                    arquivo.write('<section id="' + it.nome + sectionId + '" class="tab-panel">');
                    arquivo.write('<button id="btnShow' + idBtnShow + '" type="button" class="btn btn-default btn-sm" onclick="acaoMostrarEsconder(' + "'" + "btnShow" + idBtnShow + "'" + ')">Esconder resolvidos</button>');
                    arquivo.write("<h2>" + it.nome + "</h2>");
                    arquivo.write("<p>Verifique atentamente as validações informadas abaixo:</p>");
                    arquivo.write('<p style="font-size:85%" id ="p' + pId + '">');
                    arquivo.write('<i class="fas fa-exclamation-triangle"></i><h7>&nbspErros:</h7><h7 id="qtdErro' + idQtdErro + '">' + totalErros + "&nbsp" + "</h7>&nbsp");
                    arquivo.write('<i class="fas fa-exclamation-circle"></i><h7>&nbspAvisos:</h7><h7 id="qtdAviso' + idQtdAviso + '">' + totalAvisos + "&nbsp" + "</h7>&nbsp");
                    arquivo.write('<i class="fas fa-check-circle"></i><h7>&nbspCorreções:</h7><h7 id="qtdCorrecao' + "&nbsp" + idQtdCorrecao + '">0<h7>');
                    arquivo.write("</p>");
                    arquivo.write("<br>");
                    arquivo.write('<div id="$inputgroup" class="input-group open">');
                    arquivo.write('<input class="form-control input-sm search-field" type="text" id="' + inputId + '" onkeyup=' + "'" + "searchTableTodos" + '("' + tableId + '","' + inputId + '")' + "'" + ' placeholder="Pesquisar">');
                    arquivo.write('<div class="input-group-btn">');
                    arquivo.write('<button type="button" class="btn btn-default btn-sm" title="Pesquisar"><i class="fa fa-search"></i></button>');
                    arquivo.write("</div>");
                    arquivo.write("</div>");
                    arquivo.write("<br>");
                    arquivo.write('<table class="table table-unfixed table-unstriped" id="' + tableId + '">');
                    arquivo.write("<thead>");
                    arquivo.write("<tr>");
                    arquivo.write('<th class="col-fit">');
                    arquivo.write('<a type="button" class="btn btn-default btn-xs" id="chbox' + it.nome + '" onclick="acaoCheckBoxHeader(' + "'" + it.nome + sectionId + "'" + "," + "'chbox" + it.nome + "'" + ')" style="">');
                    arquivo.write('<i class="fas fa-check-double"></i>');
                    arquivo.write("</a>");
                    arquivo.write("</th>");
                    arquivo.write("<th>Sistema</th>");
                    arquivo.write("<th>Tipo</th>");
                    arquivo.write("<th>Descrição</th>");
                    arquivo.write('<th class="col-fit"> Solução</th>');
                    arquivo.write('<th class="col-fit"> Link</th>');
                    arquivo.write("</tr>");
                    arquivo.write("</thead>");
                    arquivo.write("<tbody>");
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
                                arquivo.write('<tr class="table-warning" id="tr' + idTR + '">');
                                arquivo.write("<td>");
                                arquivo.write('<div class="bth-checkbox">');
                                arquivo.write('<input id="chbox' + checkboxId + '" type="checkbox" class="ng-pristine ng-valid ng-touched" style="" onclick="marcaResolvido(' + "'tr" + idTR + "'" + "," + "'" + "p" + pId + "'" + ')">');
                                arquivo.write('<label for="chbox' + checkboxId + '"></label>');
                                arquivo.write("</div>");
                                arquivo.write("</td>");
                                arquivo.write("<td>" + sistema + "</td>");
                                arquivo.write("<td>Aviso</td><td>" + msg + "</td>");
                                arquivo.write("<td>");
                                if (imagem) {
                                    let botaoImgId = "botaoImgAviso" + indice;
                                    let idImg = "imagemValidAviso" + (indice + 50);
                                    arquivo.write('<div style="display: none;"><img id="$idImg" src="$imagem" alt="$solucao" style="width:100%;max-width:300px"></div>');
                                    arquivo.write('<button onclick="abrirModalImg(\'#$botaoImgId\',\'#$inputgroup\',\'#$idImg\')" id="$botaoImgId" type="button" data-html="true" class="btn btn-default btn-sm">');
                                }
                                if (video) {
                                    let btnVideo = "videoId" + indice;
                                    arquivo.write('<button id="$btnVideo" type="button" onclick="abrirModalVideoTodos(\'$video\')" class="btn btn-default btn-sm">');
                                }
                                if (!imagem && !video) {
                                    arquivo.write('<button type="button" data-html="true" class="btn btn-default btn-sm" data-toggle="popover" data-trigger="focus" data-placement="left" title="Solução" data-content="' + solucao + '">');
                                }
                                arquivo.write('<i class="fas fa-question"></i>');
                                arquivo.write("</button>");
                                arquivo.write("</td>");
                                if (link != "") {
                                    arquivo.write("<td>");
                                    arquivo.write('<a target="_blank" href="' + link + '">');
                                    arquivo.write('<button type="button" class="btn btn-default btn-sm" data-toggle="tooltip" data-trigger="focus" title="Clique para acessar o sistema" data-content="">');
                                    arquivo.write('<i class="fas fa-link"></i>');
                                    arquivo.write("</button>");
                                    arquivo.write("</a>");
                                    arquivo.write("</td>");
                                }
                                else {
                                    arquivo.write("<td>");
                                    arquivo.write('<a><button type="button" class="btn btn-default btn-sm disabled" data-toggle="tooltip" data-trigger="focus" title="" data-content="" disabled>');
                                    arquivo.write('<i class="fas fa-link"></i>');
                                    arquivo.write("</button>");
                                    arquivo.write("</a>");
                                    arquivo.write("</td>");
                                }
                            }
                            else {
                                arquivo.write('<tr class="table-warning" id="tr' + idTR + '">');
                                arquivo.write("<td>");
                                arquivo.write('<div class="bth-checkbox">');
                                arquivo.write('<input id="chbox' + checkboxId + '" type="checkbox" class="ng-pristine ng-valid ng-touched" style="" onclick="marcaResolvido(' + "'tr" + idTR + "'" + "," + "'" + "p" + pId + "'" + ')">');
                                arquivo.write('<label for="chbox' + checkboxId + '"></label>');
                                arquivo.write("</div>");
                                arquivo.write("</td>");
                                arquivo.write("<td>" + sistema + "</td>");
                                arquivo.write("<td>Aviso</td><td>" + msg + "</td>");
                                arquivo.write("<td>");
                                if (imagem) {
                                    let botaoImgId = "botaoImgAviso" + (indice + 200);
                                    let idImg = "imagemValidAviso" + (indice + 100);
                                    arquivo.write('<div style="display: none;"><img id="$idImg" src="$imagem" alt="$solucao" style="width:100%;max-width:300px"></div>');
                                    arquivo.write('<button onclick="abrirModalImg(\'#$botaoImgId\',\'#$inputgroup\',\'#$idImg\')" id="$botaoImgId" type="button" data-html="true" class="btn btn-default btn-sm">');
                                }
                                if (video) {
                                    let btnVideo = "videoId" + indice;
                                    arquivo.write('<button id="$btnVideo" type="button" onclick="abrirModalVideoTodos(\'$video\')" class="btn btn-default btn-sm">');
                                }
                                if (!imagem && !video) {
                                    arquivo.write('<button type="button" data-html="true" class="btn btn-default btn-sm" data-toggle="popover" data-trigger="focus" data-placement="left" title="Solução" data-content="' + solucao + '" disabled>');
                                }
                                arquivo.write('<i class="fas fa-question"></i>');
                                arquivo.write("</button>");
                                arquivo.write("</td>");
                                if (link != "") {
                                    arquivo.write("<td>");
                                    arquivo.write('<a target="_blank" href="' + link + '">');
                                    arquivo.write('<button type="button" class="btn btn-default btn-sm" data-toggle="tooltip" data-trigger="focus" title="Clique para acessar o sistema" data-content="">');
                                    arquivo.write('<i class="fas fa-link"></i>');
                                    arquivo.write("</button>");
                                    arquivo.write("</a>");
                                    arquivo.write("</td>");
                                }
                                else {
                                    arquivo.write("<td>");
                                    arquivo.write("<a>");
                                    arquivo.write('<button type="button" class="btn btn-default btn-sm disabled" data-toggle="tooltip" data-trigger="focus" title="" data-content="" disabled>');
                                    arquivo.write('<i class="fas fa-link"></i>');
                                    arquivo.write("</button>");
                                    arquivo.write("</a>");
                                    arquivo.write("</td>");
                                }
                            }
                        }
                        if (itemLog.tipoMsg == "E") {
                            if (solucao != "") {
                                arquivo.write('<tr class="table-danger" id="tr' + idTR + '">');
                                arquivo.write("<td>");
                                arquivo.write('<div class="bth-checkbox">');
                                arquivo.write('<input id="chbox' + checkboxId + '" type="checkbox" class="ng-pristine ng-valid ng-touched" style="" onclick="marcaResolvido(' + "'tr" + idTR + "'" + "," + "'" + "p" + pId + "'" + ')">');
                                arquivo.write('<label for="chbox' + checkboxId + '"></label>');
                                arquivo.write("</div>");
                                arquivo.write("</td>");
                                arquivo.write("<td>" + sistema + "</td>");
                                arquivo.write("<td>Erro</td><td>" + msg + "</td>");
                                arquivo.write("<td>");
                                if (imagem) {
                                    let botaoImgId = "botaoImgErro" + (indice + 200);
                                    let idImg = "imagemValidErro" + (indice + 100);
                                    arquivo.write('<div style="display: none;"><img id="$idImg" src="$imagem" alt="$solucao" style="width:100%;max-width:300px"></div>');
                                    arquivo.write('<button onclick="abrirModalImg(\'#$botaoImgId\',\'#$inputgroup\',\'#$idImg\')" id="$botaoImgId" type="button" data-html="true" class="btn btn-default btn-sm">');
                                }
                                if (video) {
                                    let btnVideo = "videoId" + indice;
                                    arquivo.write('<button id="$btnVideo" type="button" onclick="abrirModalVideoTodos(\'$video\')" class="btn btn-default btn-sm">');
                                }
                                if (!imagem && !video) {
                                    arquivo.write('<button type="button" data-html="true" class="btn btn-default btn-sm" data-toggle="popover" data-trigger="focus" data-placement="left" title="Solução" data-content="' + solucao + '">');
                                }
                                arquivo.write('<i class="fas fa-question"></i>');
                                arquivo.write("</button>");
                                arquivo.write("</td>");
                                if (link != "") {
                                    arquivo.write("<td>");
                                    arquivo.write('<a target="_blank" href="' + link + '"><button type="button" class="btn btn-default btn-sm" data-toggle="tooltip" data-trigger="focus" title="Clique para acessar o sistema" data-content="">');
                                    arquivo.write('<i class="fas fa-link"></i>');
                                    arquivo.write("</button>");
                                    arquivo.write("</a>");
                                    arquivo.write("</td>");
                                }
                                else {
                                    arquivo.write("<td>");
                                    arquivo.write("<a>");
                                    arquivo.write('<button type="button" class="btn btn-default btn-sm disabled" data-toggle="tooltip" data-trigger="focus" title="" data-content="" disabled>');
                                    arquivo.write('<i class="fas fa-link"></i>');
                                    arquivo.write("</button>");
                                    arquivo.write("</a>");
                                    arquivo.write("</td>");
                                }
                            }
                            else {
                                arquivo.write('<tr class="table-danger" id="tr' + idTR + '">');
                                arquivo.write("<td>");
                                arquivo.write('<div class="bth-checkbox">');
                                arquivo.write('<input id="chbox' + checkboxId + '" type="checkbox" class="ng-pristine ng-valid ng-touched" style="" onclick="marcaResolvido(' + "'tr" + idTR + "'" + "," + "'" + "p" + pId + "'" + ')">');
                                arquivo.write('<label for="chbox' + checkboxId + '"></label>');
                                arquivo.write("</div>");
                                arquivo.write("</td>");
                                arquivo.write("<td>" + sistema + "</td>");
                                arquivo.write("<td>Erro</td><td>" + msg + "</td>");
                                arquivo.write("<td>");
                                if (imagem) {
                                    let botaoImgId = "botaoImgErro" + (indice + 200);
                                    let idImg = "imagemValidErro" + (indice + 100);
                                    arquivo.write('<div style="display: none;"><img id="$idImg" src="$imagem" alt="$solucao" style="width:100%;max-width:300px"></div>');
                                    arquivo.write('<button onclick="abrirModalImg(\'#$botaoImgId\',\'#$inputgroup\',\'#$idImg\')" id="$botaoImgId" type="button" data-html="true" class="btn btn-default btn-sm">');
                                }
                                if (video) {
                                    let btnVideo = "videoId" + indice;
                                    arquivo.write('<button id="$btnVideo" type="button" onclick="abrirModalVideoTodos(\'$video\')" class="btn btn-default btn-sm">');
                                }
                                if (!imagem && !video) {
                                    arquivo.write('<button type="button" data-html="true" class="btn btn-default btn-sm" data-toggle="popover" data-trigger="focus" data-placement="left" title="Solução" data-content="' + solucao + '" disabled>');
                                }
                                arquivo.write('<i class="fas fa-question"></i>');
                                arquivo.write("</button>");
                                arquivo.write("</td>");
                                if (link != "") {
                                    arquivo.write("<td>");
                                    arquivo.write('<a target="_blank" href="' + link + '"><button type="button" class="btn btn-default btn-sm" data-toggle="tooltip" data-trigger="focus" title="Clique para acessar o sistema" data-content="">');
                                    arquivo.write('<i class="fas fa-link"></i>');
                                    arquivo.write("</button>");
                                    arquivo.write("</a>");
                                    arquivo.write("</td>");
                                }
                                else {
                                    arquivo.write("<td>");
                                    arquivo.write("<a>");
                                    arquivo.write('<button type="button" class="btn btn-default btn-sm disabled" data-toggle="tooltip" data-trigger="focus" title="" data-content="" disabled>');
                                    arquivo.write('<i class="fas fa-link"></i>');
                                    arquivo.write("</button>");
                                    arquivo.write("</a>");
                                    arquivo.write("</td>");
                                }
                            }
                        }
                        idTR++;
                        checkboxId++;
                    });
                    pId++;
                    arquivo.write("</tbody>");
                    arquivo.write("</table>");
                    arquivo.write("</section>");
                });
                arquivo.write("</div></div></div>");
                arquivo.write("<script>");
                arquivo.write("    function abrirModalImg(btnId,input,imgId) {");
                arquivo.write("        var input = document.querySelector(input);");
                arquivo.write("        var btn = document.querySelector(btnId);");
                arquivo.write('        var modal = document.querySelector("#myModal");');
                arquivo.write("        var img = document.querySelector(imgId);");
                arquivo.write('        var modalImg = document.querySelector("#img01");');
                arquivo.write('        var captionText = document.querySelector("#caption");');
                arquivo.write("        btn.onclick = function () {");
                arquivo.write('            modal.style.display = "block";');
                arquivo.write("            modalImg.src = img.src;");
                arquivo.write("            captionText.innerHTML = img.alt;");
                arquivo.write('            input.style.display = "none";');
                arquivo.write("        };");
                arquivo.write("        modal.onclick = function () {");
                arquivo.write('            input.style.display = "";');
                arquivo.write('            modal.style.display = "none";');
                arquivo.write("        };");
                arquivo.write("    btn.onclick();");
                arquivo.write("    };");
                arquivo.write("function abrirModalImgTodos(btnId,imgId) {");
                arquivo.write("    var btn = document.querySelector(btnId);");
                arquivo.write('    var modal = document.querySelector("#myModal");');
                arquivo.write("    var img = document.querySelector(imgId);");
                arquivo.write('    var modalImg = document.querySelector("#img01");');
                arquivo.write('    var captionText = document.querySelector("#caption");');
                arquivo.write("    btn.onclick = function () {");
                arquivo.write('        modal.style.display = "block";');
                arquivo.write("        modalImg.src = img.src;");
                arquivo.write("        captionText.innerHTML = img.alt;");
                arquivo.write("    };");
                arquivo.write("    modal.onclick = function () {");
                arquivo.write('        modal.style.display = "none";');
                arquivo.write("    };");
                arquivo.write("    btn.onclick();");
                arquivo.write("}   ");
                arquivo.write("function abrirModalVideoTodos(srcVideo) {");
                arquivo.write('    var iframe = document.querySelector("#iframevideo").src = srcVideo;');
                arquivo.write('    var display = document.querySelector("#modalVideo").style.display;');
                arquivo.write('    if (display === "none") {');
                arquivo.write('        var display = document.querySelector("#modalVideo").style.display = "block";');
                arquivo.write("    }");
                arquivo.write("};");
                arquivo.write("function escondeModalVideo() {");
                arquivo.write('    document.querySelector("#modalVideo").style.display = "none";');
                arquivo.write("};");
                arquivo.write("$(document).keyup(function (e) {");
                arquivo.write("    var modals = document.querySelectorAll('.modal');");
                arquivo.write('    if (e.key === "Escape") {');
                arquivo.write("        modals.forEach(modal => {");
                arquivo.write('            modal.style.display = "none";');
                arquivo.write("        });");
                arquivo.write("    }");
                arquivo.write("});");
                arquivo.write("</script>");
                arquivo.write("</body></html>");
                arquivo.end();
            }
            catch (error) {
                throw new TypeError(error.message);
            }
        });
    }
}
exports.PreValidacaoService = PreValidacaoService;
//# sourceMappingURL=PreValidacaoService.js.map