import Cookies from 'js-cookie';

export const csrfFetch = async (url, options = {}) => {
    options.method = options.method || 'GET';
    options.headers = options.headers || {};

    if (options.method.toUpperCase() !== 'GET') {
        options.headers['Content-Type'] = options.headers['Content-Type'] || 'application/json';
        options.headers['XSRF-Token'] = Cookies.get('XSRF-TOKEN');
      }

    const response = await window.fetch(url, options);

    if (!response.ok) throw response;

    return response;

    }

    // call this to get the "XSRF-TOKEN" cookie, should only be used in development
export function restoreCSRF() {
    return csrfFetch('/api/csrf/restore');
  }
