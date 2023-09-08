import { PerformanceCurrent } from '../../../../shared';
import { getCookie } from '../bridge/getCookie';
import { getUserId } from '../bridge/getUserId';

export const getPerformance = async (): Promise<PerformanceCurrent | number> => {
  const cookie = await getCookie();
  const id = await getUserId();
  console.log('getUserId', id);

  const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/performance.current/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      secret: cookie as string,
    },
  });

  if (response.status === 429) {
    console.log(response.status);
    return response.status;
  }

  if (!response.ok) {
    throw new Error('Failed to fetch lessons');
  }

  return await response.json() as PerformanceCurrent;
};
