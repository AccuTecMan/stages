import { EntityLoadStatus } from './entity-load-status.enum';

/**
 * Representation of the loading status of entities
 *
 * This interface is intended to be extended by the features' state interface.
 *
 * @example
 * export interface LanguagesState extends EntityState<Language>, LoadStatus {}
 *
 * export const languagesAdapter = createEntityAdapter<Language>({
 *   selectId: (lang: Language) => lang.languageGuid,
 * });
 *
 * export const initialState: BaseState = {
 *   languages: {
 *     ...languagesAdapter.getInitialState(),
 *     loadStatus: EntityLoadStatus.INITIAL,
 *   },
 * };
 */
export interface LoadStatus {
  status: EntityLoadStatus;
}
