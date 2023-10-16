import { ResponseModel } from "./responseModel";

export interface TokenResponseModel<T> extends ResponseModel{
    data:T
}