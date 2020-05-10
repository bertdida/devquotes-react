import { axios } from 'common/axios';

export async function signOut() {
  await axios.post('/v1/auth/revoke');
}
