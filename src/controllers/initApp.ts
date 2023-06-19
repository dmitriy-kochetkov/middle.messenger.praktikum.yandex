import { transformUser } from '../utils/apiTransformers';
import { apiHasError } from '../utils/apiHasError';
import type { Dispatch } from '../core/Store';
import { AppState } from '../store';
import authAPI from '../api/AuthAPI';
import { UserDTO } from '../api/types';


export async function initApp(dispatch: Dispatch<AppState>) {

  // // Ручкая задержка для демонстрации загрузочного экрана
  // await new Promise(r => setTimeout(r, 700));

  try {
    const response = await authAPI.fetchUser();

    if (apiHasError(response)) {
        return;
    }

    dispatch({ user: transformUser(response as UserDTO) });

    } catch (err) {
        console.error(err);
    } finally {
        dispatch({ appIsInited: true });
    }
}
