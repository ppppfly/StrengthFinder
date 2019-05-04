export default {

  namespace: 'FCScopes',  // fiveCirclesScopes 的缩写

  state: {
    topic: ['天赋', '自信', '兴趣', '专注', '满足'],
    occupations: [],
    scopes: [],
  },

  subscriptions: {
    setup({ dispatch, history }) {
    },
  },

  effects: {
    * fetch({ payload }, { call, put }) {
      yield put({ type: 'save' });
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
    calculate(state, { payload }) {

      const { occupations, selects, questions } = payload;

      // 计算每个职业的五环分值
      let scopes = Array(occupations.length).fill([0, 0, 0, 0, 0]);  // 初始化为 0
      let questionIdx = 0;

      function reducer(scopes, select) {
        const topicIdx = questions[questionIdx].t;
        questionIdx ++;
        const mapper = (value, index) => {
          value[topicIdx] += select[index];
          return [...value];
        };
        return scopes.map(mapper)
      }
      scopes = selects.reduce(reducer, scopes);

      console.log(scopes);
      return { ...state, occupations, scopes};
    }
  },

};
