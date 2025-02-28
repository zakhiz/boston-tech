import axios from "axios";
import { url } from "../utils/constants.util";
import { baseQuery, cashForStatusQuery, cashTypeQuery, topUsersQuery, transactionTimeQuery, userStatusQuery } from "../sql/querys.sql";
import { getCurrentUserToken } from "./auth.service";
import { notify } from "../config/toastify.notification";

let queryBaseForApp = baseQuery;
let queryTransactionTime = transactionTimeQuery
let queryCashStatus = cashForStatusQuery
let queryCashTransaction = cashTypeQuery
let queryTopUserPlatform = topUsersQuery

const token = await getCurrentUserToken();

export const runBigQuery = async ( filters : any) => {
  
  const filterConditions: string[] = [];

  if (filters.status) filterConditions.push(`status = '${filters.status}'`);
  if (filters.country) filterConditions.push(`country = '${filters.country}'`);
  if (filters.clientId) filterConditions.push(`clientId = '${filters.clientId.trim()}'`);

  let queryToExecute = filterConditions.length > 0 
    ? `${queryBaseForApp} AND ${filterConditions.join(' AND ')}`
    : queryBaseForApp;

  try {
    const response = await axios.post(
      url,
      { query: queryToExecute, useLegacySql: false },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return response;
  } catch (error) {
    notify({
        title: 'No se pudo cargar los datos del historial',
        icon: 'error',
        color: "#fff",
        position:'top'
    });
    throw error;
  }
};


export const getTransactionTime = async () => {

  try {
    const response = await axios.post(
      url,
      { query : queryTransactionTime, useLegacySql: false },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data;
  } catch (error) {
    notify({
      title: 'Error al ejecutar la consulta de transacciones por ciudades',
      icon: 'error',
      color: "#fff",
      position:'top'
  });
    throw error;
  }
};


export const getCashTransactionStatus = async () => {

  try {
    const response = await axios.post(
      url,
      { query : queryCashStatus, useLegacySql: false },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data;
  } catch (error) {
    notify({
      title: 'Error al ejecutar la consulta de transacciones',
      icon: 'error',
      color: "#fff",
      position:'top'
  });
    throw error;
  }
};


export const getCashTransaction = async () => {

  try {
    const response = await axios.post(
      url,
      { query : queryCashTransaction, useLegacySql: false },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data;
  } catch (error) {
    notify({
        title: 'Error al ejecutar la consulta de transacciones por tipo de moneda y monto',
        icon: 'error',
        color: "#fff",
        position:'top'
    });
    throw error;
  }
};


export const getTopUsers = async () => {

  try {
    const response = await axios.post(
      url,
      { query : queryTopUserPlatform, useLegacySql: false },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data;
  } catch (error) {
    notify({
        title: 'Error al ejecutar la consulta de transacciones por usuarios',
        icon: 'error',
        color: "#fff",
        position:'top'
    });
    throw error;
  }
};

export const getUserTransactionStatus = async () => {

  try {
    const response = await axios.post(
      url,
      { query : userStatusQuery, useLegacySql: false },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data;
  } catch (error) {
    
    notify({
        title: 'Error al ejecutar la consulta de transacciones de usuarios',
        icon: 'error',
        color: "#fff",
        position:'top'
    });
    throw error;
  }
};