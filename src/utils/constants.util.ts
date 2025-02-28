//!imports
const PROJECT_ID = import.meta.env.VITE_GCLOUD_PROJECT_ID;


//! exports
export const emailTest = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const dateFormat = 'DD/MM/YYYY HH:mm:ss'

  
export const url = `https://bigquery.googleapis.com/bigquery/v2/projects/${PROJECT_ID}/queries`;