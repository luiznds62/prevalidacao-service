export class ResponseBuilder {
  constructor(
    sucesso: Boolean = false,
    mensagem: string = "",
    objeto: any = [],
    proximo: Boolean = false,
    offset: Number = 0,
    limit: Number = 25,
    total: Number = 0
  ) {
    return {
      sucesso: sucesso,
      mensagem: mensagem,
      objeto: objeto,
      proximo: proximo,
      offset: offset,
      limit: limit,
      total: total
    };
  }
}
