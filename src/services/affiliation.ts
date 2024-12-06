import api from "./axios";

const baseURL = import.meta.env.VITE_BASE_URL;

export type TAffiliationResponse = {
    code: string;
    active: number;
    userId: string;
    productId: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
    owner: number;
    extraCommission: number;
  }

const getAffiliation = async (affiliationCode: string|undefined):Promise<TAffiliationResponse> => {
  const { data } = await api.get<TAffiliationResponse>(`${baseURL}/affiliation${affiliationCode}`);
  return data;
}

export default getAffiliation;