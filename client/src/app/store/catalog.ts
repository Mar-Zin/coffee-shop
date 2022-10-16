import { AppThunk } from './index';
import { ICatalogItem, INewCatalogItem, IState } from './../../models';
import { createAction, createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import catalogService from "../services/catalog.service";

export interface CatalogState {
    entities: ICatalogItem[]
    error: string
    isLoading: boolean
    lastFetch: number
}

const initialState: CatalogState = {
  entities: [],
  error: '',
  isLoading: true,
  lastFetch: 0,
}

const catalogSlice = createSlice({
  name: "catalog",
  initialState,
  reducers: {
    catalogRequested: (state) => {
      state.isLoading = true;
    },
    catalogReceved: (state, action:PayloadAction<ICatalogItem[]>) => {
      state.entities = action.payload;
      state.lastFetch = Date.now();
      state.isLoading = false;
    },
    catalogRequestFailed: (state, action: PayloadAction<Error>) => {
      state.error = action.payload.message;
      state.isLoading = false;
    },
    itemCreated: (state, action) => {
      if (!Array.isArray(state.entities)) {
        state.entities = [];
      }
      state.entities.unshift(action.payload);
    },
    itemCreatedFailed: (state, action: PayloadAction<Error>) => {
      state.error = action.payload.message;
    },
    itemDataUpdated: (state, actions) => {
      const indexUpdateItem = state.entities.findIndex(
        (i) => i._id === actions.payload._id
      );
      state.entities[indexUpdateItem] = actions.payload;
    },
    itemDataUpdatedFailed: (state, actions: PayloadAction<Error>) => {
      state.error = actions.payload.message;
    },
    itemRemoved: (state, action) => {
      state.entities = state.entities.filter(
        (item) => item._id !== action.payload
      );
    },
    itemRemovedFailed: (state, action: PayloadAction<Error>) => {
      state.error = action.payload.message;
    },
  },
});
const itemCreateRequested = createAction("catalog/itemCreateRequested");
const itemRemoveRequested = createAction("catalog/itemRemoveRequested");
const itemUpdateRequested = createAction("catalog/itemUpdateRequested");

const { actions, reducer: catalogReducer } = catalogSlice;
const {
  catalogRequested,
  catalogReceved,
  catalogRequestFailed,
  itemCreated,
  itemCreatedFailed,
  itemDataUpdated,
  itemDataUpdatedFailed,
  itemRemoved,
  itemRemovedFailed,
} = actions;

function isOutdated(date: number) {
  if (Date.now() - date > 10 * 60 * 1000) {
    return true;
  }
  return false;
}

export const loadCatalogList = ():AppThunk => async (dispatch, getState) => {
  const { lastFetch } = getState().catalog;
  if (isOutdated(lastFetch)) {
    dispatch(catalogRequested());
    try {
      const { content } = await catalogService.get();
      dispatch(catalogReceved(content));
    } catch (error) {
      dispatch(catalogRequestFailed(error as Error));
    }
  }
};

export const createItem = (payload: INewCatalogItem) => async (dispatch : Dispatch) => {
  dispatch(itemCreateRequested());
  try {
    const { content } = await catalogService.createItem(payload);
    dispatch(itemCreated(content));
  } catch (error) {
    dispatch(itemCreatedFailed(error as Error));
  }
};

export const updateItemData = (payload: ICatalogItem) => async (dispatch: Dispatch) => {
  dispatch(itemUpdateRequested());
  try {
    const { content } = await catalogService.update(payload);
    dispatch(itemDataUpdated(content));
  } catch (error) {
    dispatch(itemDataUpdatedFailed(error as Error));
  }
};

export const removeItem = (id:string) => async (dispatch: Dispatch) => {
  dispatch(itemRemoveRequested());
  try {
    const { content } = await catalogService.removeItem(id);
    if (!content) {
      dispatch(itemRemoved(id));
    }
  } catch (error) {
    dispatch(itemRemovedFailed(error as Error));
  }
};

export const getCatalog = () => (state:IState) => state.catalog.entities

export const getCatalogLoadingStatus = () => (state:IState) => state.catalog.isLoading;
export const getItemById = (id:string|undefined) => (state:IState) => {
  if (state.catalog.entities) {
    return state.catalog.entities.find((item:ICatalogItem) => item._id === id);
  }
};

export default catalogReducer;
