/* eslint-disable */

import axios from 'axios';
import { showAlert } from './alerts';

export const updateSettings = async (data, type) => {
  // type is either password or data
  try {
    const res = await axios({
      method: 'PATCH',
      url:
        type === 'password'
          ? 'http://localhost:3000/api/v1/users/updatePassword'
          : 'http://localhost:3000/api/v1/users/updateMe',
      data,
    });
    if (res.data.status === 'success') {
      showAlert('success', `${type.toUpperCase()} updated successfully`);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
