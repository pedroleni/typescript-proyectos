export class ErrorHttp extends Error {
  status: number

  constructor(status: number, mensaje: string) {
    super(mensaje)
    this.name = 'ErrorHttp'
    this.status = status
  }
}

export class ErrorValidacion extends Error {
  constructor(mensaje: string) {
    super(mensaje)
    this.name = 'ErrorValidacion'
  }
}
