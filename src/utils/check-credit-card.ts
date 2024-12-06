export function validarNumeroCartaoCredito(numeroCartao: string): boolean {
  // Remover espaços em branco e verificar se o número é uma string numérica
  numeroCartao = numeroCartao.replace(/\s/g, "");
  if (!/^\d+$/.test(numeroCartao)) {
    return false;
  }

  // Converter a string em um array de dígitos
  const digitos: number[] = numeroCartao.split("").map(Number);

  // Inverter o array
  digitos.reverse();

  // Aplicar o algoritmo de Luhn
  for (let i = 1; i < digitos.length; i += 2) {
    digitos[i] *= 2;
    if (digitos[i] > 9) {
      digitos[i] -= 9;
    }
  }

  const soma: number = digitos.reduce((acc, num) => acc + num, 0);

  return soma % 10 === 0;
}
