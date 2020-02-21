import { PreValidacao } from "../models/PreValidacao";

export interface LoteValidacao {
  nome: string;
  listaValidacoes: Array<PreValidacao>;
}
