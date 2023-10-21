import { PerformanceCurrent } from 'diary-shared';
import { getCookie } from '../bridge/getCookie';
import { getUserId } from '../bridge/getUserId';
import makeRequest from './makeRequest';

export const getPerformance = async (): Promise<PerformanceCurrent | 418 | 429> => {
  const cookie = await getCookie() ?? localStorage.getItem('cookie');
  const id = await getUserId() || localStorage.getItem('id');
  console.log(id);
  console.log(cookie);
  if (!cookie) {
    return 418;
  }

  return makeRequest<PerformanceCurrent>(`/performance.current/${id}`);
};
