export const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    alert("Código Copiado");
  } catch (error) {
    alert("Não foi possível copiar o código - Tente novamente");
    console.error(
      "copyToClipboard",
      error
    );
  }
};
