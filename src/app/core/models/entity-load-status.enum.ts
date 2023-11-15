/**
 * List of possible loading status when receiving data from an HTTP request
 *
 * @example
 * export function reducer(state: BaseState = initialState, action: featureActions.Actions): BaseState {
 *   switch (action.type) {
 *     case featureActions.LOAD_LANGUAGES: {
 *       return {
 *         ...state,
 *         languages: {
 *           ...state.languages,
 *           loadStatus: EntityLoadStatus.LOADING,
 *         },
 *       };
 *     }
 *   }
 * }
 */
export enum EntityLoadStatus {
  /**
   * Entity has not be requested from the server
   */
  INITIAL = 'INITIAL',
  /**
   * Waiting on server response
   */
  LOADING = 'LOADING',
  /**
   * Entity successfully loaded from the server
   */
  SUCCESS = 'SUCCESS',
  /**
   * Failure loading entity from server (500,502,503)
   */
  FAILURE = 'FAILURE',
  /**
   * User was not authorized to load entity from server (401,403)
   */
  UNAUTHORIZED = 'UNAUTHORIZED',
}
