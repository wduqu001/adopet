import { API_BASE_URL, PET_SEARCH } from "./config";
import { headersConfig } from "./Types";

import Axios from "axios";

export async function findPets(
    { access_key, gender, size, age, currentPage }: 
    { access_key: string; gender: string; size: string; age: string; currentPage: number; }
    ): Promise<any> {
    const searchUrl = API_BASE_URL + PET_SEARCH;
    const requestHeader: headersConfig = {
      headers: { Authorization: "Bearer " + access_key }
    };

    const request = {
      "search": {
        sex_key: gender,
        size_key: size,
        age_key: age,
        "_fields": [
          "id",
          "uuid",
          "custom_code",
          "name",
          "specie_id",
          "breed_primary_id",
          "price",
          "created_date",
          "status_key",
          "branch_id",
          "payment_model_key",
          "sex_key",
          "size_key",
          "age_key"
        ],
        "specie": {
          "with": {
            "_fields": ["id", "name"]
          }
        },
        "breed_primary": {
          "with": {
            "_fields": ["id", "name"]
          }
        },
        "branch": {
          "with": {
            "uuid": "ef71cadf-fa9b-4c8b-a1a8-0e31e784c3ff",
            "_fields": ["id", "uuid"]
          }
        }
      },
      "options": {
        "page": currentPage,
        "limit": 5,
        "sort": []
      }
    };
    return (await Axios.post(searchUrl, request, requestHeader)).data.data;
  }