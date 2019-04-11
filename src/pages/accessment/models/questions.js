export default {

  namespace: 'questions',

  state: {
    topic: ['执行力', '影响力', '关系建立', '战略思维'],
    questions: [
      {

      }
    ]
  },

  subscriptions: {
    setup({ dispatch, history }) {
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      yield put({ type: 'save' });
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

};
