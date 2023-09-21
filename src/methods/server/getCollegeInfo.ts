import { Organization } from 'diary-shared';
import { getCookie } from '../bridge/getCookie';
import makeRequest from './makeRequest';

const getCollegeInfo = async (): Promise<Organization | 418 | 429> => {
  const cookie = await getCookie() ?? localStorage.getItem('cookie');

  if (!cookie) {
    return 418;
  }

  return makeRequest<Organization>('/organization');
};

export default getCollegeInfo;
