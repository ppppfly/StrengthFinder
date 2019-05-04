export default {

  namespace: 'FCQuestions',  // fiveCirclesQuestions 的缩写

  state: {
    questions: [
      { id: 1, q: "对于将这个领域做到极致所需要的因素，你前500分的天赋是否有优势？", t: 0 },
      { id: 2, q: "你能否找到你的天赋组合对这个领域的积极影响？", t: 0 },
      { id: 3, q: "你天赋检测结果中的弱点，对这个领域的发展是否有较严重的负面影响？", t: 0 },
      { id: 4, q: "你能否通过发展你的天赋，而消除你的弱点对这个领域的负面影响？", t: 0 },
      { id: 5, q: "你排名前五名的天赋中，是否有两项以上对这个领域起到积极因素？", t: 0 },
      { id: 6, q: "在这一领域的事情，你有把握教会别人吗？", t: 1 },
      { id: 7, q: "常常有人向你请教这一领域的问题吗？", t: 1 },
      { id: 8, q: "你和别人聊天的时候，会常常不知不觉聊起这个领域的话题吗？", t: 1 },
      { id: 9, q: "每当你聊到这个领域的话题时，你会不会有一种优越感？", t: 1 },
      { id: 10, q: "你在做这个领域相关的事情时，会不会感到有压力？", t: 1 },
      { id: 11, q: "你在做这一领域的事情时，会拖延吗？", t: 2 },
      { id: 12, q: "长时间的休假之后，你最想做的事情是不是和这个领域有关？", t: 2 },
      { id: 13, q: "你会不会因为要做这一领域的事情，而宁愿放弃休息时间？", t: 2 },
      { id: 14, q: "你是否能感受到做这一领域相关事情时的乐趣？或者每当你想到这一领域的相关事情时，是否觉得很兴奋？", t: 2 },
      { id: 15, q: "你在平常的时间是否会不知不觉的想起这个领域的相关事情或者想法？", t: 2 },
      { id: 16, q: "你在做这一领域的事情时，会不会常常忘记时间？", t: 3 },
      { id: 17, q: "你做一件事情以至于忘了刷微信，这件事是否和这个领域相关？", t: 3 },
      { id: 18, q: "你在做这个领域的事情时，是否觉得不容易感到疲倦和厌烦？", t: 3 },
      { id: 19, q: "你在做这个领域相关事情时，是否总是有头有尾？", t: 3 },
      { id: 20, q: "当这个领域的相关事情需要长时间坚持去做的时候，你是否觉得很容易坚持？", t: 3 },
      { id: 21, q: "每当你完成这个领域的事情时，哪怕非常疲劳，你是否依然觉得很满足？", t: 4 },
      { id: 22, q: "你是否经常因为做这个领域相关事情而同时满足了别人的需求？或者解决了别人的问题？帮到了别人的忙？", t: 4 },
      { id: 23, q: "是否经常有人因为你做了这个领域相关的事情而向你致谢？", t: 4 },
      { id: 24, q: "每当你在做这个领域相关事情时，是否觉得有很多人正需要你做这事？", t: 4 },
      { id: 25, q: "你是否满足于一生之久都从事这个领域？", t: 4 },
    ],
    occupations: [],
    selects: Array(180).fill(2),
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
    save(state, {payload}) {
      return { ...state, ...payload };
    },
    saveOccupations(state, {payload}) {
      // 保存 occupations，并且重新生成 selects 二维阵列
      const {occupations} = payload;

      const genArray = length => () => Array(length).fill(0);
      let selects = state.questions.map(genArray(occupations.length));

      return {...state, occupations, selects}
    },
    setChoices(state, {payload}) {
      const { questionId, selectedOccupations } = payload;

      let selects = [...state.selects];
      let newSet = Array(state.occupations.length).fill(0);
      for (let i in selectedOccupations) {
        newSet[selectedOccupations[i]] = 1;
      }
      selects[questionId - 1] = newSet;

      return {...state, selects}
    }
  },

};
