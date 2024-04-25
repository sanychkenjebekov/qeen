const parsedData = JSON.parse(localStorage.getItem('persist:store:users') || '{}');
const localStorageData = JSON.parse(parsedData.user || '{}');

export const access_token =
    localStorageData && localStorageData.access ? localStorageData.access : null;

export const refresh_token =
    localStorageData && localStorageData.refresh ? localStorageData.refresh : null;
export const isAdmin =
    localStorageData && localStorageData.is_staff ? localStorageData.is_staff : false;
