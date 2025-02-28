export let baseQuery = `
  SELECT 
    id AS Company_Id, 
    clientId AS Cliente_Id,
    status AS Estado_De_Transaccion, 
    sentDate AS Fecha_De_Envio,
    country AS Pais_origen, 
    city AS Ciudad_origen, 
    total AS Total, 
    exchange AS Tasa_De_Cambio, 
    calculatedTotal AS Total_final
  FROM dashboard-boston.boston_dataset.boton_db
  WHERE date >= '${import.meta.env.VITE_DATE_SEARCH}'
`;

export let transactionTimeQuery = `
  SELECT 
  DATE(date) AS fecha, 
  SUM(total) AS total_monto
  FROM dashboard-boston.boston_dataset.boton_db
  WHERE date >= '${import.meta.env.VITE_DATE_SEARCH}'
  GROUP BY fecha
  ORDER BY fecha ASC;
`

export let transactionDayQuery = `
  SELECT 
  country, 
  COUNT(*) AS total_transacciones
  FROM dashboard-boston.boston_dataset.boton_db
  WHERE date >= '${import.meta.env.VITE_DATE_SEARCH}'
  GROUP BY country
  ORDER BY total_transacciones DESC;
`

export let cashTypeQuery = `
  SELECT 
  currency, 
  SUM(total) AS total_monto
  FROM dashboard-boston.boston_dataset.boton_db
  WHERE date >= '${import.meta.env.VITE_DATE_SEARCH}'
  GROUP BY currency
  ORDER BY total_monto DESC;
`

export let transactionCityQuery = `
  SELECT 
  city, 
  COUNT(*) AS total_transacciones
  FROM dashboard-boston.boston_dataset.boton_db
  WHERE date >= '${import.meta.env.VITE_DATE_SEARCH}'
  GROUP BY city
  ORDER BY total_transacciones DESC
  LIMIT 10;
`

export let cashForStatusQuery = `
 SELECT 
  city, 
  COUNT(*) AS total_transacciones
  FROM dashboard-boston.boston_dataset.boton_db
  WHERE date >= '${import.meta.env.VITE_DATE_SEARCH}'
  GROUP BY city
  ORDER BY total_transacciones DESC;
`

export let topUsersQuery = `
  SELECT 
    userId, 
    currency,
    COUNT(*) AS total_transacciones, 
    SUM(total) AS total_monto
  FROM dashboard-boston.boston_dataset.boton_db
  WHERE date >= '${import.meta.env.VITE_DATE_SEARCH}'
  GROUP BY userId, currency
  ORDER BY total_transacciones DESC
  LIMIT 5;
`;



export let userStatusQuery = `
 WITH EstadoRanking AS (
  SELECT 
    userId, 
    status, 
    COUNT(*) AS total_transacciones,
    ROW_NUMBER() OVER (PARTITION BY userId ORDER BY COUNT(*) DESC) AS ranking
      FROM dashboard-boston.boston_dataset.boton_db
      WHERE date >= '${import.meta.env.VITE_DATE_SEARCH}'
      GROUP BY userId, status
    )
    SELECT userId, status, total_transacciones
    FROM EstadoRanking
    WHERE ranking = 1;
`;
