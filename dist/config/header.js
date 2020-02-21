"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function header(validadorTCE, uUID, parametrosBanco, idEntidade, nomeEntidade) {
    let apiURL = "https://betha-pdc-prevalidacoes.herokuapp.com";
    let html = "";
    html += "<!DOCTYPE html>";
    html += '<html lang="en">';
    html += "<head>";
    html += "<title>Validações &nbsp" + validadorTCE + "</title>";
    html += '<meta charset="utf-8">';
    html +=
        '<meta name="viewport" content="width=device-width, initial-scale=1">';
    html +=
        '<link rel="shortcut icon" href="https://i.ibb.co/2KddCq7/23113851-300x300.png" type="image/x-icon">';
    html +=
        '<script src="https://cdn.betha.cloud/base/g4/front-end/2.13/js/base.js"></script>';
    html +=
        '<script src="https://cdn.betha.cloud/base/g4/design/3.11.9/bth-design.js"></script>';
    html +=
        '<script src="https://canvasjs.com/assets/script/canvasjs.min.js"></script>';
    html +=
        '<link rel="stylesheet" href="https://cdn.betha.cloud/base/g4/design/3.11.9/bth-design.css">';
    html +=
        '<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossorigin="anonymous">';
    html +=
        '<style> /* CSS for the main interaction */ .tabset {font-size: 15px;} .tabset > input[type="radio"] { position: absolute; left: -200vw; } .tabset .tab-panel { display: none; }';
    html +=
        ".tabset>input:first-child:checked~.tab-panels>.tab-panel:first-child,";
    html +=
        ".tabset>input:nth-child(3):checked~.tab-panels>.tab-panel:nth-child(2),";
    html +=
        ".tabset>input:nth-child(5):checked~.tab-panels>.tab-panel:nth-child(3),";
    html +=
        ".tabset>input:nth-child(7):checked~.tab-panels>.tab-panel:nth-child(4),";
    html +=
        ".tabset>input:nth-child(9):checked~.tab-panels>.tab-panel:nth-child(5),";
    html +=
        ".tabset>input:nth-child(11):checked~.tab-panels>.tab-panel:nth-child(6),";
    html +=
        ".tabset>input:nth-child(13):checked~.tab-panels>.tab-panel:nth-child(7),";
    html +=
        ".tabset>input:nth-child(15):checked~.tab-panels>.tab-panel:nth-child(8),";
    html +=
        ".tabset>input:nth-child(17):checked~.tab-panels>.tab-panel:nth-child(9),";
    html +=
        ".tabset>input:nth-child(19):checked~.tab-panels>.tab-panel:nth-child(10),";
    html +=
        ".tabset>input:nth-child(21):checked~.tab-panels>.tab-panel:nth-child(11),";
    html +=
        ".tabset>input:nth-child(23):checked~.tab-panels>.tab-panel:nth-child(12),";
    html +=
        ".tabset>input:nth-child(25):checked~.tab-panels>.tab-panel:nth-child(13),";
    html +=
        ".tabset>input:nth-child(27):checked~.tab-panels>.tab-panel:nth-child(14),";
    html +=
        ".tabset>input:nth-child(29):checked~.tab-panels>.tab-panel:nth-child(15),";
    html +=
        ".tabset>input:nth-child(31):checked~.tab-panels>.tab-panel:nth-child(16),";
    html +=
        ".tabset>input:nth-child(33):checked~.tab-panels>.tab-panel:nth-child(17),";
    html +=
        ".tabset>input:nth-child(35):checked~.tab-panels>.tab-panel:nth-child(18),";
    html +=
        ".tabset>input:nth-child(37):checked~.tab-panels>.tab-panel:nth-child(19),";
    html +=
        ".tabset>input:nth-child(39):checked~.tab-panels>.tab-panel:nth-child(20),";
    html +=
        ".tabset>input:nth-child(41):checked~.tab-panels>.tab-panel:nth-child(21),";
    html +=
        ".tabset>input:nth-child(43):checked~.tab-panels>.tab-panel:nth-child(22),";
    html +=
        ".tabset>input:nth-child(45):checked~.tab-panels>.tab-panel:nth-child(23),";
    html +=
        ".tabset>input:nth-child(47):checked~.tab-panels>.tab-panel:nth-child(24),";
    html +=
        ".tabset>input:nth-child(49):checked~.tab-panels>.tab-panel:nth-child(25){";
    html += "display: block;";
    html += "}";
    html +=
        '/* Styling */ .tabset > label { position: relative; display: inline-block; padding: 15px 15px 25px; border: 1px solid transparent; border-bottom: 0; cursor: pointer; font-weight: 600; top: 8px; } .tabset > label::after { content: ""; position: absolute; left: 15px; bottom: 10px; width: 22px; height: 4px; background: #8d8d8d; } .tabset > label:hover, .tabset > input:focus + label { color: #06c; } .tabset > label:hover::after, .tabset > input:focus + label::after, .tabset > input:checked + label::after { background: #06c; } .tabset > input:checked + label { border-color: #ccc; border-bottom: 1px solid #fff; margin-bottom: -1px; } .tab-panel { padding: 30px 0; border-top: 1px solid #ccc; } /* Demo purposes only */ *, *:before, *:after { box-sizing: border-box; }';
    html +=
        "#myInput { background-image: url(https://image.flaticon.com/icons/svg/116/116836.svg); background-size: 100% 50%;/* Add a search icon to input */ background-position: 500px 12px; /* Position the search icon */ background-repeat: no-repeat; /* Do not repeat the icon image */ width: 100%; /* Full-width */ font-size: 16px; /* Increase font-size */ padding: 12px 20px 12px 40px; /* Add some padding */ border: 1px solid #ddd; /* Add a grey border */ margin-bottom: 12px; /* Add some space below the input */ } #myTable { border-collapse: collapse; /* Collapse borders */ width: 100%; /* Full-width */ border: 1px solid #ddd; /* Add a grey border */ font-size: 18px; /* Increase font-size */ } #myTable th, #myTable td { text-align: left; /* Left-align text */ padding: 12px; /* Add padding */ } #myTable tr { /* Add a bottom border to all table rows */ border-bottom: 1px solid #ddd; } #myTable tr.header, #myTable tr:hover { /* Add a grey background color to the table header and on hover */ background-color: #f1f1f1; }";
    html +=
        ".fas.fa-exclamation-triangle{color: #ef1f41}.fas.fa-exclamation-circle{color: #deea00}.fas.fa-check-circle{ color: #04ce40 }";
    html +=
        ".table-danger{background-color: #ffccce!important;} .table-warning{background-color: #fcf7b5!important;} .table-success{background-color: #b9d8b4!important;}";
    html += "body {";
    html += "            background-color: #fafafa;";
    html += "            font-size: 16px;";
    html += "            line-height: 1.5;";
    html += "            padding-top: 33px;";
    html += "        }";
    html += "";
    html += "        h1,";
    html += "        h2,";
    html += "        h3,";
    html += "        h4,";
    html += "        h5,";
    html += "        h6 {";
    html += "            font-weight: 400;";
    html += "        }";
    html += "";
    html += "        #header {";
    html += "            border-bottom: 5px solid #37474F;";
    html += "            color: #37474F;";
    html += "            margin-bottom: 1.5rem;";
    html += "        }";
    html += "";
    html += "        #revenue-tag {";
    html += "            font-weight: inherit !important;";
    html += "            border-radius: 0px !important;";
    html += "        }";
    html += "";
    html += "        .card {";
    html += "            border: 0rem;";
    html += "            border-radius: 0rem;";
    html += "        }";
    html += "";
    html += "        .card-header {";
    html += "            background-color: #37474F;";
    html += "            border-radius: 0 !important;";
    html += "            color: white;";
    html += "            margin-bottom: 0;";
    html += "            padding: 1rem;";
    html += "        }";
    html += "";
    html += "        .card-block {";
    html += "            border: 1px solid #cccccc;";
    html += "        }";
    html += "";
    html += "        .shadow {";
    html += "            box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.14),";
    html += "                0 1px 18px 0 rgba(0, 0, 0, 0.12),";
    html += "                0 3px 5px -1px rgba(0, 0, 0, 0.2);";
    html += "        }";
    html += "";
    html += "        #revenue-column-chart,";
    html += "        #products-revenue-pie-chart,";
    html += "        #orders-spline-chart,";
    html += "        #graficoAvisosArquivo,";
    html += "        #graficoAvisosArquivo,";
    html += "		 #graficoEvolucaoInconsistencias,";
    html += "        #chartContainer {";
    html += "            height: 300px;";
    html += "            width: 100%;";
    html += " }";
    html += "#myImg {";
    html += "            border-radius: 5px;";
    html += "            cursor: pointer;";
    html += "            transition: 0.3s;";
    html += "        }";
    html += "";
    html += "        .modal {";
    html += "            display: none;";
    html += "            /* Hidden by default */";
    html += "            position: fixed;";
    html += "            /* Stay in place */";
    html += "            z-index: 1;";
    html += "            /* Sit on top */";
    html += "            padding-top: 60px;";
    html += "            /* Location of the box */";
    html += "            left: 0;";
    html += "            top: 0;";
    html += "            width: 100%;";
    html += "            /* Full width */";
    html += "            height: 100%;";
    html += "            /* Full height */";
    html += "            overflow: auto;";
    html += "            /* Enable scroll if needed */";
    html += "            background-color: rgb(0, 0, 0);";
    html += "            /* Fallback color */";
    html += "            background-color: rgba(0, 0, 0, 0.9);";
    html += "            /* Black w/ opacity */";
    html += "        }";
    html += "";
    html += "        .modal-content {";
    html += "            margin: auto;";
    html += "            display: block;";
    html += "            width: 80%;";
    html += "            max-width: 500px;";
    html += "        }";
    html += "";
    html += "        /* Caption of Modal Image */";
    html += "        #caption {";
    html += "            margin: auto;";
    html += "            display: block;";
    html += "            width: 80%;";
    html += "            max-width: 700px;";
    html += "            text-align: center;";
    html += "            color: #ccc;";
    html += "            padding: 10px 0;";
    html += "            height: 150px;";
    html += "        }";
    html += "";
    html += "        /* Add Animation */";
    html += "        .modal-content,";
    html += "        #caption {";
    html += "            -webkit-animation-name: zoom;";
    html += "            -webkit-animation-duration: 0.6s;";
    html += "            animation-name: zoom;";
    html += "            animation-duration: 0.6s;";
    html += "        }";
    html += "";
    html += "        @-webkit-keyframes zoom {";
    html += "            from {";
    html += "                -webkit-transform: scale(0)";
    html += "            }";
    html += "";
    html += "            to {";
    html += "                -webkit-transform: scale(1)";
    html += "            }";
    html += "        }";
    html += "";
    html += "        @keyframes zoom {";
    html += "            from {";
    html += "                transform: scale(0)";
    html += "            }";
    html += "";
    html += "            to {";
    html += "                transform: scale(1)";
    html += "            }";
    html += "        }";
    html += "";
    html += "        /* The Close Button */";
    html += "        .close {";
    html += "            position: absolute;";
    html += "            top: 15px;";
    html += "            right: 35px;";
    html += "            color: #f1f1f1;";
    html += "            font-size: 40px;";
    html += "            font-weight: bold;";
    html += "            transition: 0.3s;";
    html += "        }";
    html += "";
    html += "        .close:hover,";
    html += "        .close:focus {";
    html += "            color: #bbb;";
    html += "            text-decoration: none;";
    html += "            cursor: pointer;";
    html += "        }";
    html += "";
    html += "        /* 100% Image Width on Smaller Screens */";
    html += "        @media only screen and (max-width: 700px) {";
    html += "            .modal-content {";
    html += "                width: 100%;";
    html += "            }";
    html += "        }";
    html += " #modal1 { background-color: transparent!important}";
    html += "</style>";
    html += "</head>";
    html += "<script>";
    html +=
        'setInterval(function() { atualizaGraficoStacked();console.log("Dashboard atualizado!"); }, 60000);';
    html += "var registrosCorrigidos = [];";
    html += "var paragrafosCorrigidos = [];";
    html += "var numeroCorrecoes = 0;";
    html += "var numeroErros = 0;";
    html += "var numeroAvisos = 0;";
    html += "var qtdErrosFixo = 0;";
    html += "var qtdAvisosFixo = 0;";
    html += "function GetMaiorData(dadosApi){";
    html += '	var ultimaExecucao = "";';
    html += "	for(var i = 0; i < dadosApi.length; i++){";
    html += "		if(i === 0){";
    html += "			ultimaExecucao = dadosApi[i].dataGeracao;";
    html += "		} else{";
    html += "			if(dadosApi[i].dataGeracao > dadosApi[i-1].dataGeracao){";
    html += "				ultimaExecucao = dadosApi[i].dataGeracao;";
    html += "			}";
    html += "		}";
    html += "	}";
    html += '	return ultimaExecucao.replace("-","/").replace("-","/");';
    html += "}";
    html += "async function atualizaGraficoStacked(){";
    html += 'var graficoStackedColumn = "";';
    html += '    var graficoErrosArquivo = "";';
    html += 'var graficoAvisosArquivo = "";';
    html += "var dadosErro = [];";
    html += "var dadosAviso = [];";
    html += "var dadosErroStacked = [];";
    html += "var dadosAvisoStacked = [];";
    html += "var dadosCorrecoesStacked = [];";
    html += "var dadosEvolucaoErros = [];";
    html += "var dadosEvolucaoAvisos = [];";
    html += "var retornoApiChaves = await getDadosPorChave();";
    html += "var dadosCardDashboard = await getDadosPorUUID();";
    html += "var dadosCorrigidoDashboard = 0;";
    html += "qtdErrosFixo = dadosCardDashboard.object[0].quantidadeErrosFixo;";
    html += "qtdAvisosFixo = dadosCardDashboard.object[0].quantidadeAvisosFixo;";
    html += "if(dadosCardDashboard.object[0].tabelaCorrigida){";
    html +=
        "	dadosCorrigidoDashboard = dadosCardDashboard.object[0].tabelaCorrigida.length;";
    html += "}";
    html +=
        'document.querySelector(".ErrosCardDashboard").innerText = dadosCardDashboard.object[0].quantidadeErros;';
    html +=
        'document.querySelector(".AvisosCardDashboard").innerText = dadosCardDashboard.object[0].quantidadeAvisos;';
    html +=
        'document.querySelector(".CorrecoesCardDashboard").innerText = dadosCorrigidoDashboard;';
    html +=
        'document.querySelector(".UltimaExecCardDashboard").innerText = GetMaiorData(retornoApiChaves.object);';
    html += "var first = true;";
    html += 'var arquivos = document.querySelectorAll(".tab-panel");';
    html += "for (var i = 0; i < arquivos.length; i++) {";
    html += 'if (arquivos[i].id != "Dashboard0" && arquivos[i].id != "Todos0") {';
    html += "if (first) {";
    html += "dadosErro.push({";
    html += "y: Number((arquivos[i].children[3].children[2].innerText)),";
    html += "name: (arquivos[i].id.substring(0, arquivos[i].id.length - 1)),";
    html +=
        "indexLabel: (arquivos[i].id.substring(0, arquivos[i].id.length - 1)),";
    html +=
        "legendText: (arquivos[i].id.substring(0, arquivos[i].id.length - 1)),";
    html += "exploded: true,";
    html += "});";
    html += "dadosAviso.push({";
    html += "y: Number((arquivos[i].children[3].children[5].innerText)),";
    html += "name: (arquivos[i].id.substring(0, arquivos[i].id.length - 1)),";
    html +=
        "indexLabel: (arquivos[i].id.substring(0, arquivos[i].id.length - 1)),";
    html +=
        "legendText: (arquivos[i].id.substring(0, arquivos[i].id.length - 1)),";
    html += "exploded: true,";
    html += "});";
    html += "dadosErroStacked.push({";
    html += "y: Number((arquivos[i].children[3].children[2].innerText)),";
    html += "label: (arquivos[i].id.substring(0, arquivos[i].id.length - 1))";
    html += "});";
    html += "dadosAvisoStacked.push({";
    html += "y: Number((arquivos[i].children[3].children[5].innerText)),";
    html += "label: (arquivos[i].id.substring(0, arquivos[i].id.length - 1))";
    html += "});";
    html += "dadosCorrecoesStacked.push({";
    html += "y: Number((arquivos[i].children[3].children[8].innerText)),";
    html += "label: (arquivos[i].id.substring(0, arquivos[i].id.length - 1))";
    html += "});";
    html += "} else {";
    html += "dadosErro.push({";
    html += "y: Number((arquivos[i].children[3].children[2].innerText)),";
    html += "name: (arquivos[i].id.substring(0, arquivos[i].id.length - 1)),";
    html +=
        "indexLabel: (arquivos[i].id.substring(0, arquivos[i].id.length - 1)),";
    html +=
        "legendText: (arquivos[i].id.substring(0, arquivos[i].id.length - 1)),";
    html += "});";
    html += "dadosAviso.push({";
    html += "y: Number((arquivos[i].children[3].children[5].innerText)),";
    html += "name: (arquivos[i].id.substring(0, arquivos[i].id.length - 1)),";
    html +=
        "indexLabel: (arquivos[i].id.substring(0, arquivos[i].id.length - 1)),";
    html +=
        "legendText: (arquivos[i].id.substring(0, arquivos[i].id.length - 1)),";
    html += "exploded: true,";
    html += "});";
    html += "dadosErroStacked.push({";
    html += "y: Number((arquivos[i].children[3].children[2].innerText)),";
    html += "label: (arquivos[i].id.substring(0, arquivos[i].id.length - 1))";
    html += "});";
    html += "dadosAvisoStacked.push({";
    html += "y: Number((arquivos[i].children[3].children[5].innerText)),";
    html += "label: (arquivos[i].id.substring(0, arquivos[i].id.length - 1))";
    html += "});";
    html += "dadosCorrecoesStacked.push({";
    html += "y: Number((arquivos[i].children[3].children[8].innerText)),";
    html += "label: (arquivos[i].id.substring(0, arquivos[i].id.length - 1))";
    html += "});";
    html += "}";
    html += "}";
    html += "}";
    html += "for (var i = 0; i < retornoApiChaves.object.length; i++) {";
    html += "	dadosEvolucaoErros.push({";
    html += "		label: retornoApiChaves.object[i].dataGeracao,";
    html += "		y: Number(retornoApiChaves.object[i].quantidadeErrosFixo),";
    html += "	});";
    html += "	dadosEvolucaoAvisos.push({";
    html += "		label: retornoApiChaves.object[i].dataGeracao,";
    html += "		y: Number(retornoApiChaves.object[i].quantidadeAvisosFixo),";
    html += "	});";
    html += "}";
    html +=
        'graficoEvolucaoInconsistencias = new CanvasJS.Chart("graficoEvolucaoInconsistencias", {';
    html += '	theme: "light2",';
    html += "	animationEnabled: true,";
    html += "	axisY: {";
    html += "		includeZero: false,";
    html += '		title: "Numero de inconsistências",';
    html += "	},";
    html += "	toolTip: {";
    html += '		shared: "true"';
    html += "	},";
    html += "	legend: {";
    html += '		cursor: "pointer",';
    html += "	},";
    html += "	data: [";
    html += "	{";
    html += '		type: "spline",';
    html += '		color: "red",';
    html += "		showInLegend: true,";
    html += '		name: "Erros",';
    html += "		dataPoints: dadosEvolucaoErros";
    html += "	},";
    html += "	{";
    html += '		type: "spline",';
    html += '		color: "gold",';
    html += "		showInLegend: true,";
    html += '		name: "Avisos",';
    html += "		dataPoints: dadosEvolucaoAvisos";
    html += "	}]";
    html += "});";
    html += 'graficoStackedColumn = new CanvasJS.Chart("chartContainer", {';
    html += "data: [{";
    html += 'type: "stackedColumn",';
    html += 'color: "#ffccce",';
    html += "dataPoints: dadosErroStacked";
    html += "}, {";
    html += 'type: "stackedColumn",';
    html += 'color: "#fcf7b5",';
    html += "dataPoints: dadosAvisoStacked";
    html += "}, {";
    html += 'type: "stackedColumn",';
    html += 'color: "#b9d8b4",';
    html += "dataPoints: dadosCorrecoesStacked";
    html += "}]";
    html += "});";
    html +=
        'graficoErrosArquivo = new CanvasJS.Chart("products-revenue-pie-chart", {';
    html += "animationEnabled: true,";
    html += 'theme: "theme2",';
    html += "legend: {";
    html += "fontSize: 14";
    html += "},";
    html += "toolTip: {";
    html += "borderThickness: 0,";
    html +=
        "content: \"<span style='color: {color};'>{name}</span>: #percent%\",";
    html += "cornerRadius: 0";
    html += "},";
    html += "data: [{";
    html += 'indexLabelFontColor: "#676464",';
    html += "indexLabelFontSize: 14,";
    html += 'legendMarkerType: "square",';
    html += 'legendText: "{indexLabel}",';
    html += "showInLegend: true,";
    html += "startAngle: 90,";
    html += 'type: "pie",';
    html += "dataPoints: dadosErro,";
    html += "}]";
    html += "});";
    html += 'graficoAvisosArquivo = new CanvasJS.Chart("graficoAvisosArquivo", {';
    html += "animationEnabled: true,";
    html += 'theme: "theme2",';
    html += "legend: {";
    html += "fontSize: 14";
    html += "},";
    html += "toolTip: {";
    html += "borderThickness: 0,";
    html +=
        "content: \"<span style='color: {color};'>{name}</span>: #percent%\",";
    html += "cornerRadius: 0";
    html += "},";
    html += "data: [{";
    html += 'indexLabelFontColor: "#676464",';
    html += "indexLabelFontSize: 14,";
    html += 'legendMarkerType: "square",';
    html += 'legendText: "{indexLabel}",';
    html += "showInLegend: true,";
    html += "startAngle: 90,";
    html += 'type: "pie",';
    html += "dataPoints: dadosAviso,";
    html += "}]";
    html += "});";
    html += "graficoEvolucaoInconsistencias.render();";
    html += "graficoErrosArquivo.render();";
    html += "graficoAvisosArquivo.render();";
    html += "graficoStackedColumn.render();";
    html += "}";
    html += "";
    html += "$(function () {";
    html += "atualizaGraficoStacked();";
    html += "});";
    html += "function download_csv(csv, filename) {";
    html += "var csvFile;";
    html += "var downloadLink;";
    html += 'csvFile = new Blob(["\ufeff",csv], {type: "text/csv"});';
    html += 'downloadLink = document.createElement("a");';
    html += "downloadLink.download = filename;";
    html += "downloadLink.href = window.URL.createObjectURL(csvFile);";
    html += 'downloadLink.style.display = "none";';
    html += "document.body.appendChild(downloadLink);";
    html += "downloadLink.click();";
    html += "}";
    html += "function export_table_to_csv(html, filename) {";
    html += "var csv = [];";
    html += 'var section = document.querySelector("#Todos0");';
    html +=
        'var rows = section.querySelectorAll(".table-danger , .table-warning, .table-success");';
    html += "for (var i = 0; i < rows.length; i++) {";
    html += 'var row = [], cols = rows[i].querySelectorAll("td, th");';
    html += "for (var j = 0; j < cols.length; j++){ ";
    html += "if(j === 3){";
    html += "row.push(cols[j].children[0].dataset.content);";
    html += "}else{";
    html += "row.push(cols[j].innerText);";
    html += "}";
    html += "}";
    html += "csv.push(row.join(" + "'" + "|" + "'" + "));";
    html += "}";
    let barraN = "\\n";
    html += 'download_csv(csv.join("' + barraN + '"), filename);';
    html += "}";
    let data = new Date();
    let dia = data
        .getDate()
        .toString()
        .padStart(2, "0");
    let mes = (data.getMonth() + 1).toString().padStart(2, "0");
    let ano = data.getFullYear();
    let hora = data.getHours();
    let minuto = data.getMinutes();
    let dataAtual = dia + "/" + mes + "/" + ano;
    let horaAtual = hora + "-" + minuto;
    let nomeArquivo = "validacoes_" + validadorTCE + "_" + dataAtual + "_" + horaAtual;
    html += "function geraRelCSV(){";
    html += 'var html = document.querySelector("table").outerHTML;';
    html += 'export_table_to_csv(html, "' + nomeArquivo + '.csv");';
    html += "}";
    html += "function mostraModalParametros(idModal){";
    html += "var display = document.querySelector(`#${idModal}`).style.display;";
    html += 'if(display === "none"){';
    html +=
        'var display = document.querySelector(`#${idModal}`).style.display = "block";';
    html += "}";
    html += "}";
    html += "function escondeModalParametros(idModal){";
    html += 'document.querySelector(`#${idModal}`).style.display = "none";';
    html += "}";
    html +=
        'function searchTableTodos(tableId,inputId) { var input, filter, found, table, tr, td, i, j; input = document.getElementById(inputId); filter = input.value.toUpperCase(); table = document.getElementById(tableId); tb = table.getElementsByTagName("tbody"); for(i =0; i < tb.length; i++){ tr = tb[i].getElementsByTagName("tr"); } for (i = 0; i < tr.length; i++) { td = tr[i].getElementsByTagName("td"); for (j = 0; j < td.length; j++) { if (td[j].innerHTML.toUpperCase().indexOf(filter) > -1) { found = true; } } if (found) { tr[i].style.display = ""; found = false; } else { tr[i].style.display = "none"; } } }';
    html += "async function progresso(progressId) {";
    html += "var elem = document.getElementById(progressId);";
    html += "var width = 30;";
    html += "var id = setInterval(await frame, 10);";
    html += "async function frame() {";
    html += "if (width >= 100) {";
    html += "clearInterval(id);";
    html += "} else {";
    html += "width++;";
    html += "elem.style.width = width + " + "'" + "%" + "'" + ";";
    html += "}";
    html += "}";
    html += "}";
    html += 'jQuery.each( [ "put", "delete" ], function( i, method ) {';
    html += "jQuery[ method ] = function( url, data, callback, type ) {";
    html += "	if ( jQuery.isFunction( data ) ) {";
    html += "	type = type || callback;";
    html += "	callback = data;";
    html += "	data = undefined;";
    html += "	};";
    html += "	return jQuery.ajax({";
    html += "	url: url,";
    html += "	type: method,";
    html += "	dataType: type,";
    html += "	data: data,";
    html += "	success: callback";
    html += "	});";
    html += "};";
    html += "});";
    html += "async function criaArquivo(uUID) {";
    html += "	var qtdErros = 0;";
    html += "	var qtdAviso = 0;";
    html += '	var dataGeracao = document.querySelector(".dataGeracao").innerText;';
    html += '	var chave = document.querySelector(".parametrosBanco").innerText;';
    html += '	erroAviso = document.querySelectorAll("h7");';
    html += "	erroAviso.forEach(element => {";
    html += '		if (!element.parentElement.parentElement.id.includes("Todos")) {';
    html += '			if (element.id.includes("qtdErro")) {';
    html += "				qtdErros += Number(element.innerText);";
    html += "			}";
    html += '			if (element.id.includes("qtdAviso")) {';
    html += "				qtdAviso += Number(element.innerText);";
    html += "			}";
    html += "		}";
    html += "	});";
    html += "	var dados = {";
    html += "		uuid: uUID,";
    html += "		tabelaCorrigida: [],";
    html += "		paragrafoCorrigido: [],";
    html += "		dataGeracao: dataGeracao,";
    html += "		quantidadeErros: qtdErros,";
    html += "		quantidadeAvisos: qtdAviso,";
    html += "		chave: chave,";
    html += "	};";
    html += "	return new Promise(function (resolve, reject) {";
    html +=
        "		$.post(`" + apiURL + "/api/arquivo/`, dados, function (data, status) {";
    html += "			resolve(data);";
    html += "		});";
    html += "	});";
    html += "}";
    html += "async function getDadosPorUUID() {";
    html += '	var uUID = document.querySelector(".uuid").innerText;';
    html += "	return new Promise((resolve, reject) => {";
    html +=
        "		$.get(`" + apiURL + "/api/arquivo/${uUID}`, function (data, status) {";
    html += "			resolve(data);";
    html += "		});";
    html += "	}";
    html += "	);";
    html += "}";
    html += "async function getDadosPorChave() {";
    html += '	var chave = document.querySelector(".parametrosBanco").innerText;';
    html += "	return new Promise((resolve, reject) => {";
    html +=
        "		$.get(`" +
            apiURL +
            "/api/arquivo/chave/${chave}/5/desc`, function (data, status) {";
    html += "			arrayOrdenado = eval(data);";
    html += "			var results = arrayOrdenado['object'];";
    html += "			results.sort(function(a,b){";
    html += "				if(a.dataGeracao == b.dataGeracao)";
    html += "					return 0;";
    html += "				if(a.dataGeracao < b.dataGeracao)";
    html += "					return -1;";
    html += "				if(a.dataGeracao > b.dataGeracao)";
    html += "					return 1;";
    html += "			});";
    html += "			data.object = results;";
    html += "			resolve(data);";
    html += "		});";
    html += "	});";
    html += "}";
    html += "async function atualizaDadosCorrecao(dadosTabela, dadosParagrafo) {";
    html +=
        '	var uUID = document.querySelector(".uuid").innerText.substring(0, 36);';
    html += "	var qtdErros = 0;";
    html += "	var qtdAviso = 0;";
    html += '	var dataGeracao = document.querySelector(".dataGeracao").innerText;';
    html += '	var chave = document.querySelector(".parametrosBanco").innerText;';
    html += '	erroAviso = document.querySelectorAll("h7");';
    html += "	erroAviso.forEach(element => {";
    html += '		if (!element.parentElement.parentElement.id.includes("Todos")) {';
    html += '			if (element.id.includes("qtdErro")) {';
    html += "				qtdErros += Number(element.innerText);";
    html += "			}";
    html += '			if (element.id.includes("qtdAviso")) {';
    html += "				qtdAviso += Number(element.innerText);";
    html += "			}";
    html += "		}";
    html += "	});";
    html += "	var dados = {";
    html += "		uuid: uUID,";
    html += "		tabelaCorrigida: dadosTabela,";
    html += "		paragrafoCorrigido: dadosParagrafo,";
    html += "		dataGeracao: dataGeracao,";
    html += "		quantidadeErros: qtdErros,";
    html += "		quantidadeAvisos: qtdAviso,";
    html += "		quantidadeErrosFixo: qtdErrosFixo,";
    html += "		quantidadeAvisosFixo: qtdAvisosFixo,";
    html += "		chave: chave,";
    html += "	};";
    html +=
        "	$.put(`" + apiURL + "/api/arquivo/${uUID}`, dados, function (result) {";
    html += "		console.log(result);";
    html += "	});";
    html += "}";
    html += "async function verificaArquivo(uuid) {";
    html += "	return new Promise(function (resolve, reject) {";
    html +=
        "		$.get(`" + apiURL + "/api/arquivo/${uuid}`, function (data, status) {";
    html += "			if (data.object.length === 0) {";
    html += "				resolve(false);";
    html += "			};";
    html += "			resolve(true);";
    html += "		});";
    html += "	});";
    html += "}";
    html += "async function getTabelasCorrigidas(uuid) {";
    html += "	return new Promise(function (resolve, reject) {";
    html +=
        "		$.get(`" + apiURL + "/api/arquivo/${uuid}`, function (data, status) {";
    html += "			if (data.object[0].tabelaCorrigida) {";
    html += "				resolve(data.object[0].tabelaCorrigida);";
    html += "			};";
    html += "			resolve(['']);";
    html += "		});";
    html += "	});";
    html += "}";
    html += "async function getParagrafosCorrigidos(uuid) {";
    html += "	return new Promise(function (resolve, reject) {";
    html +=
        "		$.get(`" + apiURL + "/api/arquivo/${uuid}`, function (data, status) {";
    html += "			if ((data.object[0].paragrafoCorrigido)) {";
    html += "				resolve(data.object[0].paragrafoCorrigido);";
    html += "			};";
    html += "			resolve(['']);";
    html += "		});";
    html += "	});";
    html += "}";
    html += "async function getDadosLocalStorage() {";
    html +=
        '        var uUID = document.querySelector(".uuid").innerText.substring(0, 36);';
    html += "        var arquivoExiste = await verificaArquivo(uUID);";
    html += "        console.log(arquivoExiste);";
    html += "        if (!arquivoExiste) {";
    html += "            console.log(await criaArquivo(uUID));";
    html += "        } else {";
    html +=
        "            var tabelasCorrigida = await getTabelasCorrigidas(uUID);";
    html +=
        "            var paragrafosCorrigido = await getParagrafosCorrigidos(uUID);";
    html += '            if (tabelasCorrigida != "") {';
    html += "                tabelasCorrigida.forEach(tableId => {";
    html +=
        '                    classe = document.getElementById(tableId).getAttribute("class");';
    html += "                    if (classe == 'table-danger') {";
    html +=
        "                        numeroCorrecoes = document.getElementById(paragrafosCorrigido[0]).children[8].innerText;";
    html +=
        "                        numeroErros = document.getElementById(paragrafosCorrigido[0]).children[2].innerText;";
    html += "                        numeroCorrecoes++;";
    html += "                        numeroErros--;";
    html +=
        "                        document.getElementById(paragrafosCorrigido[0]).children[8].innerText = numeroCorrecoes;";
    html +=
        "                        document.getElementById(paragrafosCorrigido[0]).children[2].innerText = numeroErros;";
    html += "                        registrosCorrigidos.push(tableId);";
    html +=
        "                        paragrafosCorrigidos.push(paragrafosCorrigido[0]);";
    html += "                        paragrafosCorrigido.shift();";
    html +=
        "                        tr = document.getElementById(tableId).classList.remove('table-danger');";
    html +=
        "                        tr = document.getElementById(tableId).classList.add('table-success');";
    html +=
        "                        document.getElementById(tableId).children[0].children[0].children[0].checked = true;";
    html += "                    }";
    html += "                    if (classe == 'table-warning') {";
    html +=
        "                        numeroCorrecoes = document.getElementById(paragrafosCorrigido[0]).children[8].innerText;";
    html +=
        "                        numeroAvisos = document.getElementById(paragrafosCorrigido[0]).children[5].innerText;";
    html += "                        numeroCorrecoes++;";
    html += "                        numeroAvisos--;";
    html +=
        "                        document.getElementById(paragrafosCorrigido[0]).children[8].innerText = numeroCorrecoes;";
    html +=
        "                        document.getElementById(paragrafosCorrigido[0]).children[5].innerText = numeroAvisos;";
    html += "                        registrosCorrigidos.push(tableId);";
    html +=
        "                        paragrafosCorrigidos.push(paragrafosCorrigido[0]);";
    html += "                        paragrafosCorrigido.shift();";
    html +=
        "                        tr = document.getElementById(tableId).classList.remove('table-warning');";
    html +=
        "                        tr = document.getElementById(tableId).classList.add('table-success');";
    html +=
        "                        document.getElementById(tableId).children[0].children[0].children[0].checked = true;";
    html += "                    }";
    html += "                });";
    html += "            }";
    html += "        }";
    html += "    }";
    html += "function acaoMostrarEsconder(buttonId){";
    html += "buttonId = `#${buttonId}`;";
    html += 'var tabelasCorrigidas = document.querySelector(".table-success");';
    html += "var button = document.querySelector(buttonId);";
    html += "var display = tabelasCorrigidas.style.display;";
    html += 'if(display === ""){';
    html += 'button.innerText = "MOSTRAR RESOLVIDOS";';
    html += "escondeResolvidos();";
    html += "}else{";
    html += 'button.innerText = "ESCONDER RESOLVIDOS";';
    html += "mostraResolvidos();";
    html += "}";
    html += "}";
    html += "function escondeResolvidos() {";
    html += 'var corrigidos = document.getElementsByClassName("table-success");';
    html += "for (var i = 0; i < corrigidos.length; i++) {";
    html += 'corrigidos[i].style.display = "none";';
    html += "}";
    html += "}";
    html += "function mostraResolvidos() {";
    html += 'var corrigidos = document.getElementsByClassName("table-success");';
    html += "for (var i = 0; i < corrigidos.length; i++) {";
    html += 'corrigidos[i].style.display = "";';
    html += "}";
    html += "}";
    html += "$(document).ready(function() {";
    html += "getDadosLocalStorage();";
    html += '$("body").popover({';
    html +=
        "template: " +
            "'" +
            '<div class="popover med-popover left in" role="tooltip"><div class="arrow"></div><div class="popover-content"></div></div>' +
            "'" +
            ",";
    html += 'container: "body",';
    html += 'trigger: "manual",';
    html += 'placement: "left",';
    html += 'selector: "[data-toggle=popover]"';
    html += "});";
    html += '$("[data-toggle=popover]").on("click", function () {';
    html += '$(this).popover("toggle");';
    html += "});";
    html += "});";
    html += "function marcaResolvido(idTable, paragrafoId) {";
    html += "primeiroErro  = true;";
    html += "primeiroAviso = true;";
    html +=
        "numeroCorrecoes = document.getElementById(paragrafoId).children[8].innerText;";
    html +=
        '        classe = document.getElementById(idTable).getAttribute("class");';
    html += '        if (classe === "table-danger") {';
    html +=
        "            tr = document.getElementById(idTable).classList.remove('table-danger');";
    html +=
        "            tr = document.getElementById(idTable).classList.add('table-success');";
    html += "            numeroCorrecoes++;";
    html +=
        "            numeroErros = document.getElementById(paragrafoId).children[2].innerText;";
    html += "            numeroErros--;";
    html +=
        "            document.getElementById(paragrafoId).children[2].innerText = numeroErros;";
    html +=
        "            document.getElementById(paragrafoId).children[8].innerText = numeroCorrecoes;";
    html += "            registrosCorrigidos.push(idTable);";
    html += "            paragrafosCorrigidos.push(paragrafoId);";
    html +=
        "            atualizaDadosCorrecao(registrosCorrigidos,paragrafosCorrigidos);";
    html += "        }";
    html += '        if (classe === "table-warning") {';
    html +=
        "            tr = document.getElementById(idTable).classList.remove('table-warning');";
    html +=
        "            tr = document.getElementById(idTable).classList.add('table-success');";
    html += "            numeroCorrecoes++;";
    html +=
        "            numeroAvisos = document.getElementById(paragrafoId).children[5].innerText;";
    html += "            numeroAvisos--;";
    html +=
        "            document.getElementById(paragrafoId).children[5].innerText = numeroAvisos;";
    html +=
        "            document.getElementById(paragrafoId).children[8].innerText = numeroCorrecoes;";
    html += "            registrosCorrigidos.push(idTable);";
    html += "            paragrafosCorrigidos.push(paragrafoId);";
    html +=
        "            atualizaDadosCorrecao(registrosCorrigidos,paragrafosCorrigidos);";
    html += "        }";
    html += '        if (classe === "table-success") {';
    html += "            tr = document.getElementById(idTable);";
    html += '            td = tr.getElementsByTagName("td");';
    html += "            var tipoMsg = td[2].innerText;";
    html += '            if (tipoMsg === "Aviso") {';
    html +=
        "                tr = document.getElementById(idTable).classList.remove('table-success');";
    html +=
        "                tr = document.getElementById(idTable).classList.add('table-warning');";
    html += "                numeroCorrecoes--;";
    html +=
        "                numeroAvisos = document.getElementById(paragrafoId).children[5].innerText;";
    html += "                numeroAvisos++;";
    html +=
        "                document.getElementById(paragrafoId).children[5].innerText = numeroAvisos;";
    html +=
        "                document.getElementById(paragrafoId).children[8].innerText = numeroCorrecoes;";
    html +=
        "                for (var i = 0; i < registrosCorrigidos.length; i++) {";
    html += "                    if (registrosCorrigidos[i] === idTable) {";
    html += "                        registrosCorrigidos.splice(i, 1);";
    html += "                    }";
    html += "                }";
    html +=
        "                for (var i = 0; i < paragrafosCorrigidos.length; i++) {";
    html += "                    if (paragrafosCorrigidos[i] === paragrafoId) {";
    html += "					   if(primeiroAviso){";
    html += "                         paragrafosCorrigidos.splice(i, 1);";
    html += "						  primeiroAviso = false;";
    html += "                      }";
    html += "                   }";
    html += "                }";
    html +=
        "                atualizaDadosCorrecao(registrosCorrigidos,paragrafosCorrigidos);";
    html += "            } else {";
    html +=
        "                tr = document.getElementById(idTable).classList.remove('table-success');";
    html +=
        "                tr = document.getElementById(idTable).classList.add('table-danger');";
    html += "                numeroCorrecoes--;";
    html +=
        "                numeroErros = document.getElementById(paragrafoId).children[2].innerText;";
    html += "                numeroErros++;";
    html +=
        "                document.getElementById(paragrafoId).children[2].innerText = numeroErros;";
    html +=
        "                document.getElementById(paragrafoId).children[8].innerText = numeroCorrecoes;";
    html +=
        "                for (var i = 0; i < registrosCorrigidos.length; i++) {";
    html += "                    if (registrosCorrigidos[i] === idTable) {";
    html += "                        registrosCorrigidos.splice(i, 1);";
    html += "                    }";
    html += "                }";
    html +=
        "                for (var i = 0; i < paragrafosCorrigidos.length; i++) {";
    html += "                    if (paragrafosCorrigidos[i] === paragrafoId) {";
    html += "						if(primeiroErro){";
    html += "                        	paragrafosCorrigidos.splice(i, 1);";
    html += "						 	primeiroErro = false;";
    html += "                    	}";
    html += "                    }";
    html += "                }";
    html +=
        "                atualizaDadosCorrecao(registrosCorrigidos,paragrafosCorrigidos);";
    html += "            }";
    html += "        }";
    html += "    }";
    html += "function acaoCheckBoxHeader(sectionId, idCheckBoxHeader) {";
    html +=
        'tipoAcao = document.querySelector(`#${idCheckBoxHeader}`).children[0].getAttribute("class");';
    html += "if(tipoAcao === " + "'" + "fas fa-check-double" + "'" + "){";
    html += "marcarDesmarcarCheck(sectionId,true);";
    html +=
        "document.querySelector(`#${idCheckBoxHeader}`).children[0].className = " +
            "'" +
            "fas fa-times" +
            "'" +
            ";";
    html += "}";
    html += "if(tipoAcao === " + "'" + "fas fa-times" + "'" + "){";
    html += "marcarDesmarcarCheck(sectionId,false);";
    html +=
        "document.querySelector(`#${idCheckBoxHeader}`).children[0].className = " +
            "'" +
            "fas fa-check-double" +
            "'" +
            ";";
    html += "}";
    html += "}";
    html += "function marcarDesmarcarCheck(sectionId, acao) {";
    html += "query = `#${sectionId}`;";
    html += "section = document.querySelector(query);";
    html += 'checkboxes = section.querySelectorAll(".bth-checkbox");';
    html += "paragrafoId = section.children[3].id;";
    html += "tables = section.querySelectorAll(" + "'" + ".table" + "'" + ");";
    html += "for (var i = 0; i < tables.length; i++) {";
    html += "var tbody = tables[i].children[1];";
    html += "for (var j = 0; j < tbody.children.length; j++) {";
    html += "if(acao){";
    html += "tipoMsg = tbody.children[j].children[2].innerText;";
    html +=
        "if(tbody.children[j].className === " + "'" + "table-success" + "'" + "){";
    html += "numeroCorrecoes--;";
    html +=
        "document.getElementById(paragrafoId).children[8].innerText = numeroCorrecoes;";
    html += 'if(tipoMsg === "Erro"){';
    html += "numeroErros++;";
    html +=
        "document.getElementById(paragrafoId).children[2].innerText = numeroErros;";
    html += "}else{";
    html += "numeroAvisos++;";
    html +=
        "document.getElementById(paragrafoId).children[5].innerText = numeroAvisos;";
    html += "}";
    html += "}";
    html += 'if(tipoMsg === "Erro"){';
    html += 'tbody.children[j].className = "table-danger";';
    html +=
        "tbody.children[j].children[0].children[0].children[0].checked = false;";
    html += "}else{";
    html += 'tbody.children[j].className = "table-warning";';
    html +=
        "tbody.children[j].children[0].children[0].children[0].checked = false;";
    html += "}";
    html += "trId = tbody.children[j].id;";
    html += "marcaResolvido(trId,paragrafoId);";
    html += "}else{";
    html +=
        "if(tbody.children[j].className === " + "'" + "table-danger" + "'" + "){";
    html += "numeroErros--;";
    html += "numeroCorrecoes++;";
    html +=
        "document.getElementById(paragrafoId).children[8].innerText = numeroCorrecoes;";
    html +=
        "document.getElementById(paragrafoId).children[2].innerText = numeroErros;";
    html += "}";
    html +=
        "if(tbody.children[j].className === " + "'" + "table-warning" + "'" + "){";
    html += "numeroAvisos--;";
    html += "numeroCorrecoes++;";
    html +=
        "document.getElementById(paragrafoId).children[8].innerText = numeroCorrecoes;";
    html +=
        "document.getElementById(paragrafoId).children[5].innerText = numeroAvisos;";
    html += "}";
    html += 'tbody.children[j].className = "table-success";';
    html += "for (var i = 0; i < checkboxes.length; i++) {";
    html += "checkboxes[i].children[0].checked = acao;";
    html += "}";
    html += "numeroCorrecoes--;";
    html += "trId = tbody.children[j].id;";
    html += "marcaResolvido(trId,paragrafoId);";
    html += "}";
    html += "}";
    html += "}";
    html += "if(acao){";
    html += "for (var i = 0; i < checkboxes.length; i++) {";
    html += "checkboxes[i].children[0].checked = acao;";
    html += "}";
    html += "}";
    html += "}";
    let dataGeracao_atual = `${dia}-${mes}-${ano} ${hora}:${minuto}:${data.getSeconds()}`;
    html += "</script>";
    html += "<body>";
    html += '<div id="myModal" class="modal">';
    html += '    <img class="modal-content" id="img01">';
    html += '    <div id="caption"></div>';
    html += "</div>  ";
    html +=
        '<div id="modalVideo" data-bf-loading-type="dialog" class="modal fade in" style="display: none; z-index: 1070;padding-top: 20px;">';
    html +=
        '    <div style="padding-right: 1000px;" class="modal-dialog" role="document">';
    html +=
        '        <div style="max-width: 1000px; width: 1000px;"  class="modal-content modal-content__sidebar">';
    html += '            <div class="modal-body modal-run">';
    html +=
        '                <div style="width:100%;height:0px;position:relative;padding-bottom:56.250%;">';
    html +=
        '                    <iframe id="iframevideo" src="" frameborder="0" width="100%" height="100%" allowfullscreen style="width:100%;height:100%;position:absolute;left:0px;top:0px;overflow:hidden;">';
    html += "                    </iframe>";
    html += "                </div>";
    html += "            </div>";
    html +=
        '            <div class="modal-footer"><button type="button" class="btn btn-secondary" data-dismiss="modal" onclick="escondeModalVideo()">Fechar</button></div>';
    html += "        </div>";
    html += "    </div>";
    html += "</div>";
    html += '<div style="display: none;" class="uuid">' + uUID + "</div>";
    html +=
        '<div style="display: none;" class="dataGeracao">' +
            dataGeracao_atual +
            "</div>";
    html +=
        '<div style="display: none;" class="parametrosBanco">' +
            parametrosBanco +
            "</div>";
    html +=
        '<div style="display: none;" class="idEntidade">' + idEntidade + "</div>";
    html +=
        '<div id="modal1" data-bf-loading-type="dialog" class="modal fade in" style="display: none; z-index: 1070;">';
    html += '<div class="modal-dialog" role="document">';
    html += '<div class="modal-content modal-content__sidebar">';
    html += '<div class="modal-header">';
    html += '<h5 class="modal-title">Parâmetros da execução</h5>';
    html += "</button>";
    html += "</div>";
    html += '<div class="modal-body modal-run">';
    html += '<table class="table table-unfixed table-unstriped">';
    html += "<thead>";
    html += "<tr>";
    html += "<th>Parâmetro</th>";
    html += "<th>Valor</th>";
    html += "</tr>";
    html += "</thead>";
    html += "<tbody>";
    for (let i = 0; i < parametrosBanco.length; i++) {
        html += "<tr>";
        html += "<td>" + parametrosBanco[i].nome + "</td>";
        html += "<td>" + parametrosBanco[i].valor + "</td>";
        html += "</tr>";
    }
    html += "</tbody>";
    html += "</table> ";
    html += "</div>";
    html += '<div class="modal-footer">';
    html +=
        '<button type="button" class="btn btn-secondary" data-dismiss="modal" onclick="escondeModalParametros(' +
            "'" +
            "modal1" +
            "'" +
            ')">Fechar</button>';
    html += "</div>";
    html += "</div>";
    html += "</div>";
    html += "</div>";
    html += '<div class="container container-fluid">';
    html += '<div ui-view="header" class="ng-scope" style="">';
    html += '<header class="ng-scope">';
    html += '<div id="header" class="megamenu-container">';
    html += '<div class="container iv">';
    html += '<ul class="megamenu">';
    html += '<li class="menu-static">';
    html += '<a href="#" class="drop">';
    html += '<div class="bth-logo bth-logo--brand-blue">';
    html += '<div class="bth-logo__image"></div>';
    html += "</div>";
    html += '<span class="megamenu-title">Relatório de Pré-Validações</span>';
    html += "</a>";
    html += "</li>";
    html += "</ul>";
    html += "</div>";
    html += "</div>";
    html += "</header>";
    html += "</div>";
    html += '<div class="bth-card">';
    html += '<div class="bth-card__header">';
    html += '<div class="row">';
    html += '<div class="col-md-12">';
    html += '<div class="bth-card bth-card--filled">';
    html += '<div class="bth-card__body">';
    html += '<div class="row row-flex bottom">';
    html += '<div class="col-md-1 text-center">';
    html +=
        '<a target="_blank" href="http://www.betha.com.br/"><img src="https://i.ibb.co/TWSgZX4/logo-share-square.png" alt="logo-share-square" border="0" style="height: 10vh;"></a>';
    html += "</div>";
    html +=
        '<div class="col-md-6" style="border-left: 1px solid #E1E3E6;padding-left: 15px;">';
    html += '<label style="font-size: 14px">Entidade</label>';
    html += '<h2 class="top ng-binding">' + nomeEntidade + "</h2>";
    html += "</div>";
    html +=
        '<div class="col-md-3" style="border-left: 1px solid #E1E3E6;padding-left: 15px;">';
    html += '<label style="font-size: 14px">Ano</label>';
    html += '<h2 class="top ng-binding">' + ano + "</h2>";
    html += "</div>";
    html += '<div class="col-md-2 text-right">';
    html +=
        '<button class="btn btn-default btn-sm" onclick="mostraModalParametros(' +
            "'" +
            "modal1" +
            "'" +
            ')"><i class="fas fa-cogs"></i> Parâmetros</button>';
    html += "</div>";
    html += "</div>";
    html += "</div>";
    html += "</div>";
    html += "</div>";
    html += "</div>";
    html += "</div>";
    html += '<div class="bth-card__body">';
    html += "<div>";
    html +=
        '<p style="font-size: 70%;" ><i class="fas fa-info-circle"></i>  Para acesso a todas as funcionalidades do arquivo, recomendamos a utilização dos navegadores <em>Google Chrome</em> e <em>Firefox</em>.</p>';
    html +=
        '<p style="font-size: 70%;" ><i class="fas fa-info-circle"></i> Para que o <em>Link</em> tenha funcionamento adequado, abra este arquivo no mesmo navegador do sistema.</p>';
    html += "</div>";
    html += '<div class="tabset">';
    return html;
}
exports.default = header;
//# sourceMappingURL=header.js.map