const allAdd = (scope_list) => value => scope_list[value[0]]++;
const oneSideAdd = (scope_list, select) => value => scope_list[value[0]] += Math.abs(select) + 1;


export default {

  namespace: 'scopes',

  state: {
    talents: [
      '成就', '行动', '适应', '分析', '统筹', '信仰', '统率', '沟通', '竞争', '关联',
      '回顾', '审慎', '伯乐', '纪律', '体谅', '公平', '专注', '前瞻', '和谐', '理念',
      '包容', '个别', '搜集', '思维', '学习', '完美', '积极', '交往', '责任', '排难',
      '自信', '追求', '战略', '取悦',
    ],
    talent_count: [19, 18, 18, 19, 15, 17, 15, 16, 15, 18, 15, 20, 16, 17, 15, 16, 16, 16, 16, 18, 17, 16, 17, 20, 16, 17, 16, 16, 16, 16, 17, 19, 20, 16],
    scopes: [],
    topic: [
      ['执行力', '懂得如何完成某些事，并能从行动本身获得满足感'],
      ['影响力', '知道如何取得主导、令人信服、为确保聆听团队意见'],
      ['关系建立', '具备构建牢固关系的能力，从而将团队凝聚起来并发挥更多的力量'],
      ['战略思维', '能帮助团队思考可能发生的事，他们获取并分析信息，以作出更好的决定'],
    ],
    belong: [0, 1, 2, 3, 0, 0, 1, 1, 1, 2, 3, 0, 2, 0, 2, 0, 0, 3, 2, 3, 2, 2, 3, 3, 3, 1, 2, 2, 0, 0, 1, 1, 3, 1],
    first_10_scope: 0, // 前10优势的分数线
    first_500_scope: 0, // 第一优势 500 分内
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

      let scope_list = Array(state.talents.length).fill(0);

      for (let idx in payload.selects) {

        let select = payload.selects[idx];
        const talents = payload.questions[idx].m;

        if (select === 0) {
          // 问题下的所有"天赋"增加 1 分
          talents.map(allAdd(scope_list));
        } else if (select < 0) {
          // 左边问题，加分
          talents
            .filter(value => value[1] === -1)
            .map(oneSideAdd(scope_list, select));
        } else if (select > 0) {
          // 右边问题，加分
          talents
            .filter(value => value[1] === 1)
            .map(oneSideAdd(scope_list, select));

        }

      }

      scope_list = scope_list.map(
        (value, idx) => parseInt(value * 1000 / state.talent_count[idx]),
      );

      let new_list = [...scope_list].sort((a, b) => b - a);

      return {
        ...state,
        scopes: scope_list,
        first_10_scope: new_list.slice(0, 10)[9],
        first_500_scope: new_list[0] - 500,
      };

    },
  },

};
