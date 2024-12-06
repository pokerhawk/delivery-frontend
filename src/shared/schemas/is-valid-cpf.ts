import {AnyObject, TestContext} from "yup";
import {isValidCPF} from "../../utils/validateCpf";

export const isValidCpf = {
  name: "isValidCpf",
  test(currentCpf: string | undefined, context: TestContext<AnyObject>) {
    if(currentCpf) {
      if(isValidCPF(currentCpf)) return true;

      return context.createError({ message: "Documento não é válido" })
    }
    return true;
  }
}
