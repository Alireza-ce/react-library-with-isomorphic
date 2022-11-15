declare module 'history/cjs/history' {
  import { getConfirmation } from '@types/history/DOMUtils';
  import { History as OriginalHistory, Location, LocationState } from '@types/history';

  type LocationType = Location & {
    key: string;
    state: unknown;
  };
  export type InitialEntry = string | Partial<Location>;

  export interface MemoryHistoryBuildOptions {
    getUserConfirmation?: typeof getConfirmation | undefined;
    initialEntries?: InitialEntry[] | undefined;
    initialIndex?: number | undefined;
    keyLength?: number | undefined;
  }

  export interface History<HistoryLocationState = LocationState> extends Omit<OriginalHistory<HistoryLocationState>, 'listen'> {
    location: LocationType;
    index: number;
    entries: Location<HistoryLocationState>[];
    canGo(n: number): boolean;
    listen(arg: (location: LocationType, action: Action) => void): LocationType;
  }

  export interface BrowserHistoryBuildOptions {
    basename?: string | undefined;
    forceRefresh?: boolean | undefined;
    getUserConfirmation?: typeof getConfirmation | undefined;
    keyLength?: number | undefined;
  }

  function createMemoryHistory<S = LocationState>(options?: MemoryHistoryBuildOptions): History<S>;

  function createPath<S>(location: LocationDescriptorObject<S>): Path;

  function createBrowserHistory<S = LocationState>(options?: BrowserHistoryBuildOptions): History<S>;

  export { createPath, createBrowserHistory, createMemoryHistory };
}
