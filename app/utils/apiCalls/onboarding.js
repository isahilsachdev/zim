import apiCall from '../api';
import { endpoints } from '../endpoints';

// Auth functions
export const registerUser = (email) => {
  return apiCall('post', `${endpoints['register']}`, { email });
};

// register SSO
export const registerWithSSO = async (code, platform = 'google') => {
  const data = {
    code, platform
  };
  return apiCall('post', endpoints['register'], data);
};

export const loginUser = (email, password) => {
  return apiCall('post', `${endpoints['login']}`, { email, password });
};

// login SSO
export const loginWithSSO = async (code, platform = 'google') => {
  const data = {
    code, platform
  };
  return apiCall('post', endpoints['login'], data);
};

export const createPassword = (email) => {
  return apiCall('post', `${endpoints['register']}`, { email });
};

export const userGetLoginOtp = (email) => {
  return apiCall('post', `${endpoints['getLoginOtp']}`, { email });
}

export const userVerifyOtp = (payload) => {
  return apiCall('post', `${endpoints['verifyOtp']}`, payload);
}

export const updateUserInfo = (payload) => {
  return apiCall('post', `${endpoints['updateUserInfo']}`, payload);
};


// Company funcitons
export const addYourCompany = (payload) => {
  return apiCall('post', `${endpoints['addCompany']}`, payload, {}, {
    "Content-Type": "multipart/form-data",
  });
}

export const listCompany = () => {
  return apiCall('get', `${endpoints['listCompany']}`);
}

export const updateCompany = (payload) => {
  return apiCall('put', `${endpoints['updateCompany']}`, payload);
}

// Company Member functions
export const updateUserProfile = (payload) => {
  return apiCall('post', `${endpoints['updateUserProfile']}`, payload, {}, {
    "Content-Type": "multipart/form-data",
  });
}

export const updateCompanyMember = (company_member_id, socials) => {
  return apiCall('post', `${endpoints['updateCompanyMember']}`, { company_member_id, socials });
}