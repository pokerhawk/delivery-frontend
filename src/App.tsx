import { yupResolver } from "@hookform/resolvers/yup";
import "react-credit-cards-2/dist/es/styles-compiled.css"
import { FormProvider, useForm } from "react-hook-form";
import Router from "./routes";
import GlobalStyles from "./styles/global";
import { CheckoutSchema } from "./shared/schemas/checkout";

function App() {
  const methods = useForm({
    resolver: yupResolver(CheckoutSchema),
    mode: 'onChange',
    defaultValues: {
      userData: {
        name: "",
        codeArea: "+55",
      },
    },
  });

  return (
    <FormProvider {...methods}>
      <Router />
      <GlobalStyles />
    </FormProvider>
  );
}

export default App;
