import { createAction, handleActions } from "redux-actions";
import createRequestSaga, {
  createRequestActionTypes,
} from "../../../lib/createRequestSaga";
import * as API from "../../../lib/api/schedule/Project";
import { takeLatest } from "redux-saga/effects";

const PROJECTNO = "schedule/PROJECTNO";

const [PROJECT, PROJECT_SUCCESS, PROJECT_FAILURE] =
  createRequestActionTypes("schedule/PROJECT"); //타입유형
const [PROJECTWITH, PROJECTWITH_SUCCESS, PROJECTWITH_FAILURE] =
  createRequestActionTypes("schedule/PROJECTWITH"); //타입유형

const [PROJECTFILE, PROJECTFILE_SUCCESS, PROJECTFILE_FAILURE] =
  createRequestActionTypes("schedule/PROJECTFILE"); //타입유형

export const projectAxios = createAction(PROJECT, (index) => {
  return {
    index,
  };
});
export const projectWithAxios = createAction(PROJECTWITH, (index) => {
  return {
    index,
  };
});

export const projectFileAxios = createAction(PROJECTFILE, (index) => {
  return {
    index,
  };
});

export const projectNoChange = createAction(PROJECTNO, ({ index }) => {
  return {
    index,
  };
});
const projectSelectSaga = createRequestSaga(PROJECT, API.SelectOneProject);

const projectWithSelectSaga = createRequestSaga(PROJECTWITH, API.SelectOneWith);

const projectFileSelectSaga = createRequestSaga(PROJECTFILE, API.SelectOneFile);

export function* projectSaga2() {
  yield takeLatest(PROJECT, projectSelectSaga);
  yield takeLatest(PROJECTWITH, projectWithSelectSaga);
  yield takeLatest(PROJECTFILE, projectFileSelectSaga);
}

const initialState = {
  //초기값을 정의
  projectNo: 0,
  projectContent: {
    PROJECT_INDEX: "",
    PROJECT_TITLE: "",
    PROJECT_CONTENT: "",
    PROJECT_START: "",
    PROJECT_END: "",
    PROJECT_OKAY: "",
    PROJECT_DATE: "",
  },
  projectFile: [
    {
      PROJECT_FILE_INDEX: "",
      PROJECT_FILE_PROJECT_INDEX: "",
      PROJECT_FILE_ORIGIN_NAME: "",
      PROJECT_FILE_NAME: "",
      PROJECT_FILE_PATH: "",
      PROJECT_FILE_DATE: "",
    },
  ],
  projectWith: [
    {
      PROJECT_WITH_INDEX: "",
      PROJECT_WITH_EMP_INDEX: "",
      PROJECT_INDEX: "",
      PROJECT_WITH_OKAY: "",
      PROJECT_WITH_REJECT: "",
      PROJECT_WITH_LEADER: "",
      PROJECT_WITH_COLOR: "",
    },
  ],
  projectError: null,
  projectWithError: null,
  projectFileError: null,
};

// 리듀서 선언부분
const project = handleActions(
  {
    [PROJECT_SUCCESS]: (state, { payload: projectContent }) => ({
      ...state,
      projectError: null,
      projectContent,
    }),

    [PROJECT_FAILURE]: (state, { payload: error }) => ({
      ...state,
      projectError: error,
    }),
    [PROJECTWITH_SUCCESS]: (state, { payload: projectWith }) => ({
      ...state,
      projectWithError: null,
      projectWith,
    }),

    [PROJECTWITH_FAILURE]: (state, { payload: error }) => ({
      ...state,
      projectWithError: error,
    }),
    [PROJECTFILE_SUCCESS]: (state, { payload: projectFile }) => ({
      ...state,
      projectFileError: null,
      projectFile,
    }),

    [PROJECTFILE_FAILURE]: (state, { payload: error }) => ({
      ...state,
      projectFileError: error,
    }),
    [PROJECTNO]: (state, { payload: { index } }) => {
      return {
        ...state,
        projectNo: index,
      };
    },
  },
  initialState
);

export default project;
