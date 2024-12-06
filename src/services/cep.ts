import axios from 'axios'

// export const viacepWs = axios.create({
//   baseURL: 'https://brasilapi.com.br/api/cep/v1/',
//   headers: {
//     'Accept': 'application/json'
//   }
// });

export const viacepWs = axios.create({
  baseURL: 'https://viacep.com.br/ws',
  headers: {
    'Accept': 'application/json'
  }
});

type AddressTypeViaCep = {
  cep: string
  logradouro: string
  complemento: string
  bairro: string
  localidade: string
  uf: string
}

type Error = {
  error: boolean
}

type AddressType = {
  cep: string;
  state: string;
  city: string;
  neighborhood: string;
  street: string;
} | Error

// { city, neighborhood, street, state }

export const getAddress = async (cep: string): Promise<any> => {
  try {
    const { data } = await viacepWs.get<AddressTypeViaCep>(`/${cep}/json/`);

    return {
      city: data.localidade,
      state: data.uf,
      neighborhood: data.bairro,
      street: data.logradouro,
    }
  } catch (error: any) {
    throw error
  }
};
