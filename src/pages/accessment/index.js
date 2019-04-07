import React, { Component } from 'react';
import { Button, Modal, Table } from 'antd';
// import writeJsonFile from 'write-json-file';

import './index.css';

import Form from '../../components/Form';
import TopHeader from '../../components/TopHeader';

const questions = [
  ['当别人遇到困难的时候，我特别愿意去帮助他们。', '当我看到一个东西，或者遇见一些事情，我特别想刨根问底，探究东西背后的运作或工作原理，或是事情发生的原因。'],
  ['我特别喜欢和朋友畅想未来，规划未来，期待未来。', '我特别喜欢回忆过去，反思人生，也喜欢思考历史，从中获得教训。'],
  ['我希望每个人都喜欢我，我知道如何让人愿意和我相处。', '我渴望获得他人的高度认可，关注，称赞，尊重，甚至崇拜，我渴望成为一个有名望的人。'],
  ['我总是渴望赢，凡事尽量力争第一，好胜心比较强，渴望做得更好，总要做出一点成绩来。', '我通常凡事只是重在参与，顺其自然，不太会较真。'],
  ['我向来非常努力，勤奋，做很多事情，闲不住。', '我做事不追求快，但我一定会尽力让事情照事先承诺的完全落实。'],
  ['我更加关注自己的优点，尽量发挥自己的优点。', '我特别在意自己的缺点，并努力去改变它。'],
  ['我是一个重感情的人，做事情也比较注重感受。', '我是一个比较理性的人，通常会比较冷静的看待一些现象，或处理一些事情。'],
  ['我特别会留意每一个人不同的个性特点，以不同的方式对待他们。。', '我能够接受各种不同性格类型的人，对他们尽可能一视同仁。'],
  ['我不喜欢主动和人交谈，不随便交朋友。', '我特别喜欢主动与人交谈，想要认识更多人。'],
  ['我觉得生活是美好的，我热爱生活。', '我觉得自己蛮有能力，能做好许多事情。'],
  ['我喜欢与人协作，与人共事。', '我喜欢个人的空间，一个人做事感觉会更好些。'],
  ['我喜欢帮助人获得成就感，我善于鼓励人成长。', '我特别愿意让别人感到我对他们很重要，我总是给他们我的建议。'],
  ['我追求按照自己的价值观去过有意义的生活。', '我渴望追求自己理想中的生活。'],
  ['我渴望成为他人的知己，建立深厚的友谊。', '我渴望成为他人的领导，指挥他人做事。'],
  ['我不太在意别人怎么看我，我只努力做我认为正确的事情。', '我总是在意并尽量了解别人对我的看法。'],
  ['我更愿意专注于自己未来的发展。', '我更愿意追求实现自己的价值观。'],
  ['我总是谨慎的保持生活的平衡和家庭的稳定。', '我总是希望我的家庭能够过上比现在更好的生活。'],
  ['我经常不假思索地畅谈未来，描绘愿景，几乎每天都会谈到对未来的展望。', '我特别愿意腾出时间来思考未来，力求愿景的实现。'],
  ['只要我在场，就会常使别人兴奋起来，使气氛活跃起来。', '只要我在场，就会尽力让所有的争执平息下来，让一切归复平静。'],
  ['我一旦作出决定就急切希望立刻付诸行动。', '我在每次行动之前都尽量仔细确认自己的行动无误。'],
  ['我会更加着眼于眼前的事。', '我更习惯于统观全局，明确目的。'],
  ['我认为世上没有纯粹的巧合，一切都事出有因，世界是一个整体，互相关联，彼此影响。', '对我来说巧合就是指运气，机遇，侥幸，偶然，我积极迎接这一切。'],
  ['我觉得我更善于交谈，解释，我的表达，描述很清晰，总之我喜欢说话。', '我认为我更善于倾听，能理解他人，能说出他人的感受。'],
  ['我更喜欢表扬别人，称赞别人。', '我更喜欢被别人表扬，称赞。'],
  ['我特别喜欢比赛，这让我特别有动力。', '我喜欢工作。'],
  ['我觉得我思考问题的方式比较平稳，更多是借助专家寻找正确答案。', '我觉得我思考问题的方式比较富有创造性，追求独到的观点，有战略的眼光，对规律和问题容易一目了然。'],
  ['我觉得我更多时候是充满活力，满怀喜悦和欢乐的。', '我经常很容易就发觉一些影响形势的因素和一些内在原因。'],
  ['我内心有成为一家大公司总裁的渴望。', '我比较喜欢为别人牵线搭桥，喜欢成全别人，喜欢看到别人因我而进步或成功。'],
  ['我有时会不知不觉的威逼别人。', '我在大人物面前的时候，常常会自觉渺小。'],
  ['我觉得我比较会设身处地为别人着想。', '我特别愿意去爱所有的人。'],
  ['我比较喜欢鼓励或推动别人成功。', '我的出现常会让人快乐起来。'],
  ['我觉得我是一个无忧无虑的人。', '我显得比别人在思想，处事方面更成熟一些，遇事总是从容不迫，总有更好的方案。'],
  ['我比较喜欢在一个团队里和大家一起做事情。', '我比较喜欢帮助别人张罗，为别人想办法或解决问题。'],
  ['我通过研究历史，常能够对未来有某种的预测，我喜欢回顾我的过去，我认为它和我的未来很有关系。', '我觉得我的过去和我的未来没什么关系。'],
  ['我属于超越自我的宏观世界，我属于未来。', '我是一个脚踏实地，着眼于眼前的人。'],
  ['我认为工作和生活是融为一体的，是一种生活方式，一种意义和价值的所在。', '我认为工作只是谋生的一种手段而已。'],
  ['当我知道别人不喜欢我，轻视我的时候，我会觉得很沮丧。', '当我做了自己认为不正确的事时，就会感到内疚，我更注重事情本身的正确性。'],
  ['我比较喜欢参与组织些什么。', '我比较喜欢花时间作分析。'],
  ['我喜欢说话，能够把握别人说话的要点，懂得如何回应，使他们感觉很好。', '我喜欢倾听别人，使人感觉被理解。'],
  ['我喜欢有思想，富于哲理的人。', '我喜欢那些勤快，做事雷厉风行的人。'],
  ['我比较留意每个人的自身特点和特有的价值，也很乐意帮助他们认识自己身上的这些特质。', '我喜欢鼓励人，使人觉得有成就感。'],
  ['我习惯靠直觉解决问题。', '我会慎重的使用来源可靠的准确信息解决问题。'],
  ['我对生活持有一种健康的怀疑态度，这使我不断的去探究背后的来龙去脉。', '我相信自己与全人类相连，我能感受到我是其中的一员，与所有人息息相关。'],
  ['我的朋友们喜欢听我讲故事，我也常常用故事来解释一些事情。', '许多朋友遇到问题都会找我出主意，想办法。'],
  ['我在上午的时间工作效率比较高。', '我在晚上安静的时候工作效率会比较高。'],
  ['我觉得我绝不会比别人更差，所以我觉得我无需工作更努力，更持久。', '我觉得我精力充沛 通常都比大多数人工作更努力，更持久。'],
  ['任何与行动，运动，活动等相关的事都会引起我的兴趣。', '任何与思想，概念，人文，原理等有关的事都会引起我的兴趣。'],
  ['我是一个十分整洁的人。', '我是一个挺固执的人。'],
  ['我喜欢通过与别人分享而获得成长。', '我喜欢通过自己学习来获得成长。'],
  ['我喜欢按照自己的书面规划来行动。', '我比较喜欢走一步，看一步。'],
  ['我通常会比较着眼于未来可能取得的成就。', '我比较喜欢研究未来可能发生的事情，事先做好应对的策略。'],
  ['我不喜欢排斥任何人，也不愿意伤害任何人的感情。', '我通常会很慎重的仔细选择我的朋友。'],
  ['我不在乎别人对我的看法，别人是否把我视为可信专业化和成功人士并不重要。', '我很在意别人对我的看法，别人是否把我视为可信专业化和成功人士对我很重要。'],
  ['我对历史上一些战争或者历史事件的起因比较感兴趣。', '我对50年后的世界经济是如何的比较感兴趣。'],
  ['我习惯于对我生活中已经发生的事情，遭遇等进行分析。', '我对影响我未来生活的事件充满了激情。'],
  ['我常常通过发挥自身的才干而取得进步。', '我常常通过改变自身的弱点而取得进步。'],
  ['对我来说，我喜欢每件事情都事先计划好。', '我比较喜欢一切事情顺其自然，不需要太多的规划。'],
  ['我做事情比较喜欢寻找或发现各种不同的做事方法。', '我做事情比较喜欢确立常规的做事方法。'],
  ['我不喜欢爱发脾气的人。', '我认为有必要的时候是可以发脾气的。'],
  ['我比较喜欢一切都轻松一些。', '我喜欢做清洁，把一切都弄的整整齐齐，干干净净。'],
  ['我觉得有钱就是幸福。', '我觉得有钱不等于幸福'],
  ['很多事情我都会征求别人的意见。', '有什么事情别人常常会来征求我的意见。'],
  ['我认为应该平等对待所有人，并制定明确的规则，这很重要。', '我觉得应该了解每个人的特点，并对他们进行不同的激励。'],
  ['遇到问题，我常常会通过专家寻找正确答案。', '我觉得我对许多问题和答案常常很容易一目了然。'],
  ['我常常非常慷慨的称赞别人。', '我总是有选择的称赞别人。'],
  ['我常常只有在竞争或比赛中赢得第一，才能觉得完全满意。', '在比赛中，我通常只要名列前茅，就感到非常高兴。'],
  ['我常常能够使一些个性截然不同的人相互合作。', '我觉得我有平等对待每个人的天赋。'],
  ['我不喜欢轻易离开自己觉得舒适的环境。', '我喜欢寻求刺激，接受挑战。'],
  ['在工作中我常常能够体会到同事内心的感受。', '在工作中我喜欢和同事们高谈阔论，打成一片。'],
  ['我发现我会不自觉的关注每个人的特点，并不在乎我是不是喜欢他们。', '我发现我特别不喜欢某一些人，我觉得他们和我格格不入。'],
  ['我常常都是凭直觉进行重要的决策。', '我必须凭理智，有凭有据的进行重要的决策。'],
  ['我发现我常常是随着事情的发生而采取行动。', '我必须事先分清楚事情的轻重缓急，然后再采取行动。'],
  ['通常我会喜欢每个人。', '我希望每个人都喜欢我。'],
  ['我总是根据当前的需要，专注做好眼前的事情。', '我会更多的着眼于未来的发展。'],
  ['我每周通常都会设定一些具体的目标。', '我总是根据当日的需求来定我该做什么。'],
  ['我总是觉得我必须强迫自己才能坚持学习。', '我对于自己感兴趣的事情，通常都能够集中注意力，专注去做。'],
  ['我喜欢那些要求精确性的工作。', '我更喜欢团队的合作，与大家共事。'],
  ['我对研究别人行为背后的根源挺感兴趣。', '我习惯于思考自己的行为和思想。'],
  ['我处事比较喜欢按部就班，按照套路来做。', '我面对人事物热情洋溢。'],
  ['我对教育满怀热忱。', '我对消除暴力（利）满怀热忱。'],
  ['我比较喜欢别人听我说话。', '我比较喜欢听别人说话。'],
  ['我很喜欢讲故事，我善于将故事运用到我的说话或演讲中。', '我比较善于辅导别人，为别人解决问题。'],
  ['我很喜欢说话。', '相比之下我比较喜欢思考。'],
  ['我喜欢追求完美，希望总是做到第一。', '我是一个实干家，说干就干。'],
  ['我做事情或者思考问题喜欢实实在在，尽可能广泛调查分析。', '我思考问题富于创造性，常常具有全局的战略眼光。'],
  ['我总是拿最出色的人或者同行作为标准，不断的改进自己，尽力超越他们。', '我比较喜欢与欣赏我长处的人交往。'],
  ['我发现我常常能够同时处理好许多事情，将它们安排得井井有条。', '我还是比较愿意为别人付出甚至做出牺牲的。'],
  ['我善于与人来往，交谈。', '我很喜欢与朋友们一起努力工作。'],
  ['我觉得我的思维敏捷，常常能够提出独特的观点。', '通常我的谈话会使人觉得愉快，气氛很好。'],
  ['我特别喜欢安静学习，享受学习的过程。', '我特别喜欢外出，对一切都充满好奇。'],
  ['我喜欢一切都按照规章制度处理。', '我常常会反复检查，以确保一切无误，井井有条。'],
  ['我常常不知不觉就会发现人们之间的区别，我相信每个人是具有其独特性的。', '我比较喜欢平等对待每一个人，也尽量尽量做。'],
  ['我觉得要想成功就需要不断的克服弱点，弥补缺陷。', '我觉得成功在于不断的增强自身的才干，发展自己所擅长的。'],
  ['在遇到困难，必须圆满完成任务时，我大多数都是亲自去完成。', '在遇到困难，必须圆满完成任务时，我更多的是依靠团队成员的各自优势，而不是事必躬亲。'],
  ['我认为我的性格比较外向，喜欢与人打交道。', '我在必要的时候或场合，还是可以做到开朗大方的。'],
  ['我比较喜欢解释或研究一些事情。', '我比较喜欢做事情。'],
  ['我觉得有时候必要时也可以歪曲事实。', '我认为永远没有理由可以说谎。'],
  ['我感觉我的工作已经满负荷了。', '我觉得我还有很大的潜力可以发挥。'],
  ['我向来以为人严谨而著称。', '朋友们都觉得我富有幽默感。'],
  ['我认为我正在创造我的未来。', '我觉得我需要不断的研究我的未来。'],
  ['我更喜欢挑战别人。', '我更喜欢鼓励别人。'],
  ['我是一个非常在意隐私的人，通常对别人总是有保留的敞开我的生活。', '我的生活如同一本敞开的书，任意人都可以看，所以我喜欢发朋友圈。'],
  ['我认为我挺慷慨大方的。', '我比较留意节约。'],
  ['我希望自己是一名领导者。', '我希望成为一名很有成就的人。'],
  ['我有时会奉承别人。', '我为人正直实在。'],
  ['我通常能够根据需要长时间的学习。', '我发现我能够集中注意力的时间很短。'],
  ['我不太会随便的去赞扬人，所以当我这样做的时候是很有分量的。', '我总是很慷慨的赞扬我的同事或朋友。'],
  ['我很喜欢了解新事物，对一切事情都充满好奇。', '我觉得我的价值观很稳定，我知道我想要怎样的人生。'],
  ['我的生活总是有目标。', '我的生活总是充满欢乐积极。'],
  ['我喜欢富有深度思想的讨论。', '我喜欢讨论制定目标的会议。'],
  ['我更喜欢独处，这让我觉得享受。', '我常常想念我的好朋友们，因为我喜欢和好朋友在一起。'],
  ['我喜欢想象，憧憬我的未来。', '我总是希望知道或了解造成当前情形的原因。'],
  ['我觉得我能够实事求是的看待自己，我了解自己。', '我觉得我通常很难坦诚的看待自己，有时容易高估自己。'],
  ['我非常愿意花大量的时间和我的朋友们在一起。', '我更喜欢专心做我认为重要的事情。'],
  ['我小时候很喜欢和一大帮的朋友们一起玩，我喜欢拥有很多朋友。', '我小时候总是循规蹈矩，很少给小伙伴或大人惹麻烦。'],
  ['我很喜欢接待别人。', '通常我答应别人的事就一定要完成，否则就难受。'],
  ['我讨厌受控制。', '我喜欢制定规则，遵守规矩。'],
  ['我觉得我是一个好老师，善于教导。', '我觉得我是一个好顾问，为人解决问题。'],
  ['我不喜欢与大大咧咧的人交往。', '我不喜欢雨不诚实的人交往。'],
  ['在不了解情况的时候，我总会向心中有数的人请教。', '我觉得无论何时何地我总能悟出该做什么，该怎么做。'],
  ['我不喜欢生活没有目标的人，我觉得他们是没追求的人。', '我不喜欢和那些无法放松的人相处，他们总是带着目标生活，好累啊！'],
  ['我讨厌期限，我更喜欢灵活点。', '我的责任感总是给我动力。'],
  ['我喜欢鼓励别人。', '我能够加强别人，使人成长。'],
  ['我觉得我常常过于轻信别人。', '我觉得有时候我有点过于雄心勃勃。'],
  ['过去发生的事情常常激励我。', '我每当想到未来可能取得的成就，觉得很受激励。'],
  ['时间紧迫，情况紧急时产生的压力，会使我的思想高度集中。', '当我能够事先安排好，并提前完成任务时，我的思维更加清晰。'],
  ['我认为只要环境所迫，大多数人都会偷窃。', '我认为偷窃的人就应该受到惩罚。'],
  ['我最大的愿望是能够做自己热爱的工作。', '我最大的需求是能够被别人接受。'],
  ['我认为我是一个通情达理，善解人意的人。', '我认为我是一个很有责任心的人。'],
  ['我觉得我更关注当下的此时此地。', '我经常通过研究过去而增长见识。'],
  ['只要尽力而为，我就感到满足了。', '我立志要有所建树，获得成就。'],
  ['我有非常强烈的求知欲。', '我非常需要被别人认可和理解。'],
  ['我常常会研究一些因果关系。', '我遇到事情时通常都能够及时应对。'],
  ['当我遭遇失败时，常常都会去寻找失败的原因。', '我更愿意享受目前的成功。'],
  ['我特别喜欢收藏，什么都好奇，什么都想收藏。', '我只收集一些我认为十分精美或特别有价值的东西。'],
  ['我通常都能提出一些具有建设性的建议。', '每当解决了难题，排除了故障的时候，我都感到特别有成就感。'],
  ['我觉得我待人还是比较随和的。', '我觉得我很善于发挥不同人的长处。'],
  ['我更愿意花时间考虑如何取得竞争优势。', '我更愿意花时间考虑如何应对未来可能发生的问题。'],
  ['我认为只有竞争才能发挥人的最大潜能，所以我刺激我的员工们互相竞争。', '我愿意使很多人在一起同甘共苦，相互合作，并建立很深的友谊。'],
  ['我常常都从失败中总结教训。', '我只关注如何把我最擅长的事情做的尽善尽美。'],
  ['在团队中我更注重鼓励别人发挥其特长。', '在团队中我尽量使每个人都能得到进步。'],
  ['把晚间和周末的工作时间加起来，我通常一周工作40~50个小时以内。', '把晚间和周末的工作时间加起来，我通常一周工作60个小时以上。'],
  ['我这个人显得轻松愉快。', '我显得比较严肃认真，一丝不苟。'],
  ['开始一项新任务对我来讲很容易。', '我做事情必须有始有终才行。'],
  ['我愿意，也能够和所有人和睦相处。', '我会仔细分析我的合作伙伴，尽可能了解每个人的个性和背景。'],
  ['我的兴趣特别广泛，对什么都感到好奇。', '我只专注把我感兴趣的事情做到极致。'],
  ['我特别留意观察生活。', '我特别留意主宰自己的生活。'],
  ['为了解决一个问题，我能够锲而不舍的长时间工作。', '我最多只能集中精力工作学习一个小时左右。'],
  ['我更注重我的成就非凡。', '我向来注重创造出积极的成果。'],
  ['我觉得我会比别人更机智一些。', '我觉得我在很多人面前感到自己很渺小。'],
  ['我善于高效的安排许多事情，并且处理好它们。', '我习惯一次只专注做一件事。'],
  ['我希望能够经常与我的同事和上司进行沟通。', '我希望能够有更多的自己独立支配的时间。'],
  ['我比较善于构思并发起一个新的项目。', '我比较善于组织并实际落实一个项目。'],
  ['我经常思考数字，对数字比较敏感。', '我比较喜欢思考宏观形象的事物。'],
  ['我比较喜欢讨论一些思想。', '我比较喜欢体育运动。'],
  ['我所用的词汇更多是富于哲理的。', '我所用的词汇偏重实用性。'],
  ['我比较喜欢用简短的词汇。', '我常常使用比较复杂抽象的词汇。'],
  ['我的大脑总是不停的思考。', '我的身体需要经常活动。'],
  ['我比较喜欢听别人讲。', '我比较喜欢小组讨论。'],
  ['帮助别人解决问题，排除障碍使我感到特别快乐。', '从数据中发现规律会使我感到特别兴奋。'],
  ['我会花时间去关注分析时事。', '我很少花时间去关注时事。'],
  ['我总是能及时完成任务。', '我总是言而有信，说到就一定要做到。'],
  ['产生一个新的创意会使我激动不已。', '完成一件交给我的任务会使我激动不已。'],
  ['和别人在一起，我觉得我的点子是最多的。', '我喜欢和大家一起讨论解决问题的办法。'],
  ['我能够为人详细的解释复杂的过程。', '我觉得我具有通过研究分析，化繁为简的天赋。'],
  ['我能够一口气读完200页的书。', '我读书的速度比较慢，因为我总是认真琢磨理解书中的内容。'],
  ['我认为取得成就，获得胜利是最重要的。', '我认为按照规矩做事情是最重要的。'],
  ['我依靠自己的价值观和哲学指引我的生活。', '我总是自己主导自己的生活'],
  ['我每周都至少花5个小时独自思考。', '我更喜欢和别人待在一起。'],
  ['我了解自己的优势胜过劣势。', '我了解自身的弱点胜过长处。'],
  ['我并不在乎别人是不是喜欢我。', '我热爱人们，尽力爱每个人。'],
  ['我比较喜欢和别人谈起我已过的旅行经历。', '我比较喜欢不断的去策划我的下一个旅行目标，和别人谈论我的旅行计划。'],
  ['我经常以我以过的亲身经历来教育别人。', '我更喜欢树立展示当下的榜样来激励别人。'],
  ['我认为一个好的领导就是要能够安排别人完成事情。', '我认为一个好的领导就是要帮助别人如何更好的完成事情。'],
  ['我善于处理纷繁复杂的事务。', '我比较喜欢制定统一的常规制度。'],
  ['我比较习惯于根据一个统计的数字来预测未来。', '我比较习惯于根据当前的形势来预测未来。'],
  ['我特别善于通过列举过去已经取得的成就来鼓励别人。', '我特别擅于通过描绘未来愿景来鼓励别人。'],
  ['我有几个特别要好的老朋友。', '我认识了很多的朋友，但几乎没有交情非常深的。'],
  ['我习惯于事先想好要采购商品的标准到了商场只要看到基本符合我需求的商品立刻就买。', '我习惯是先不考虑太多到了商场现场调查一遍之后再决定购买。'],
  ['每当遇到故障或者困难的时候我经常是一马当先。', '每当遇到故障或困难时我往往首先想到找个这方面有能力的人来解决。'],
];

const talents = [
  '成就', '行动', '适应', '分析', '统筹', '信仰', '统率', '沟通', '竞争', '关联',
  '回顾', '审慎', '伯乐', '纪律', '体谅', '公平', '专注', '前瞻', '和谐', '理念',
  '包容', '个别', '搜集', '思维', '学习', '完美', '积极', '交往', '责任', '排难',
  '自信', '追求', '战略', '取悦',
];

const topic = ['执行力', '影响力', '关系建立', '战略思维'];

const belong = [0, 1, 2, 3, 0, 0, 1, 1, 1, 2, 3, 0, 2, 0, 2, 0, 0, 3, 2, 3, 2, 2, 3, 3, 3, 1, 2, 2, 0, 0, 1, 1, 3, 1];

const talent_count = [19, 18, 18, 19, 15, 17, 15, 16, 15, 18, 15, 20, 16, 17, 15, 16, 16, 16, 16, 18, 17, 16, 17, 20, 16, 17, 16, 16, 16, 16, 17, 19, 20, 16];

const mapping = [
  [[3, 1], [5, -1], [14, -1], [24, 1], [27, -1], [29, -1]],
  [[10, 1], [17, -1]],
  [[31, 1], [33, -1]],
  [[0, -1], [8, -1], [24, 1], [25, -1]],
  [[0, -1], [28, 1]],
  [[25, -1], [31, 1]],
  [[3, 1], [4, 1], [5, -1], [6, 1], [11, 1], [14, -1], [15, -1], [32, 1], [33, -1]],
  [[14, -1], [15, 1], [20, 1], [21, -1]],
  [[11, -1], [33, 1]],
  [[26, -1], [30, 1]],
  [[20, -1], [23, 1], [27, -1], [30, 1]],
  [[6, 1], [12, -1]],
  [[5, -1], [25, 1]],
  [[6, 1], [27, -1]],
  [[6, -1], [14, 1]],
  [[5, 1], [17, -1]],
  [[11, -1], [25, 1], [31, 1]],
  [[17, -1], [31, 1], [32, 1]],
  [[18, 1], [26, -1]],
  [[1, -1], [11, 1]],
  [[2, 1], [16, -1]],
  [[2, 1], [9, -1]],
  [[7, -1], [14, 1]],
  [[0, 1], [12, -1], [26, -1], [31, 1], [33, -1]],
  [[8, -1], [27, 1]],
  [[9, -1], [19, 1], [23, 1], [32, 1]],
  [[3, 1], [11, -1], [26, -1]],
  [[0, -1], [6, -1], [12, 1], [31, -1]],
  [[6, -1], [18, 1]],
  [[5, 1], [14, -1], [15, 1], [21, -1]],
  [[12, -1], [26, 1]],
  [[4, 1], [11, 1], [26, -1], [32, 1]],
  [[4, 1], [12, 1], [18, -1], [20, -1], [29, 1], [33, 1]],
  [[2, 1], [10, -1]],
  [[1, 1], [17, -1]],
  [[2, 1], [5, -1], [31, -1]],
  [[28, 1], [31, -1]],
  [[1, -1], [3, 1], [6, -1]],
  [[7, -1], [14, -1], [33, 1]],
  [[1, 1], [19, -1]],
  [[21, -1], [26, 1]],
  [[2, -1], [3, 1], [11, 1], [22, 1], [30, -1]],
  [[3, -1], [9, 1], [11, -1]],
  [[7, -1], [29, 1], [32, 1]],
  [[1, -1], [23, 1]],
  [[0, 1], [30, -1]],
  [[1, -1], [19, 1], [23, 1]],
  [[1, -1], [6, 1], [30, 1]],
  [[22, 1], [23, 1], [24, 1], [27, -1]],
  [[2, 1], [13, -1], [18, 1]],
  [[11, 1], [17, -1], [32, 1]],
  [[11, 1], [15, -1], [18, -1]],
  [[8, 1], [9, -1], [31, 1]],
  [[10, -1], [17, 1]],
  [[3, -1], [10, -1], [17, 1], [23, -1], [25, -1], [26, 1]],
  [[10, 1], [25, 1]],
  [[2, 1], [13, -1]],
  [[13, 1], [15, 1], [21, -1]],
  [[6, 1], [9, -1]],
  [[13, 1], [26, -1]],
  [[9, 1], [26, -1]],
  [[4, 1], [6, 1], [9, -1], [18, -1], [20, -1], [22, -1], [32, 1]],
  [[15, -1], [21, 1]],
  [[22, -1], [23, 1]],
  [[11, 1], [26, -1]],
  [[0, -1], [8, -1], [24, 1], [25, -1], [26, 1], [31, -1]],
  [[15, 1], [18, -1], [21, -1], [27, -1]],
  [[11, -1], [30, 1]],
  [[7, 1], [14, -1], [18, -1], [20, 1], [21, -1], [33, 1]],
  [[11, 1], [21, -1], [22, -1]],
  [[3, 1], [11, 1], [30, -1], [32, 1]],
  [[2, -1], [4, 1]],
  [[14, -1], [33, 1]],
  [[2, -1], [16, -1], [17, 1], [32, 1]],
  [[2, 1], [13, -1], [16, -1], [17, -1]],
  [[16, 1], [23, 1], [24, 1]],
  [[13, -1], [20, 1], [27, 1]],
  [[3, -1], [9, -1], [23, 1]],
  [[2, 1], [4, -1], [13, -1], [16, -1], [26, 1]],
  [[5, -1], [29, 1]],
  [[6, -1], [14, 1]],
  [[7, -1], [10, -1], [12, 1], [29, 1]],
  [[7, -1], [23, 1]],
  [[1, 1], [8, -1], [25, -1]],
  [[1, -1], [3, -1], [19, 1], [22, -1], [32, 1]],
  [[0, -1], [8, -1], [22, -1], [24, -1], [25, 1], [31, -1]],
  [[4, -1], [5, 1]],
  [[7, -1], [18, 1], [20, 1], [27, -1], [33, -1]],
  [[7, 1], [19, -1], [27, 1], [33, 1]],
  [[1, 1], [22, 1], [24, -1]],
  [[11, -1], [13, -1], [15, -1]],
  [[14, -1], [15, 1], [21, -1]],
  [[25, 1], [28, -1], [31, -1]],
  [[1, -1], [4, 1], [6, 1], [28, -1]],
  [[7, -1], [14, 1], [33, -1]],
  [[1, 1], [32, -1]],
  [[2, -1], [5, 1], [13, 1]],
  [[30, 1]],
  [[7, 1], [13, -1], [26, 1]],
  [[1, -1], [17, 1], [32, 1]],
  [[12, 1], [30, -1], [31, -1]],
  [[11, -1], [27, 1]],
  [[11, -1], [27, -1]],
  [[0, 1], [6, -1], [28, -1]],
  [[11, 1], [33, -1]],
  [[16, -1], [24, -1]],
  [[11, -1], [33, 1]],
  [[5, 1], [22, -1]],
  [[0, -1], [26, 1]],
  [[0, 1], [19, -1]],
  [[23, -1], [27, 1]],
  [[3, 1], [9, 1], [10, 1], [17, -1]],
  [[9, -1], [30, 1]],
  [[16, 1], [27, -1]],
  [[13, 1], [20, -1]],
  [[20, -1], [28, 1]],
  [[13, 1], [31, -1]],
  [[7, -1], [12, 1], [29, 1]],
  [[5, 1], [28, 1]],
  [[22, -1], [30, 1]],
  [[26, 1], [31, -1]],
  [[2, -1], [13, 1], [28, 1]],
  [[12, -1], [20, -1]],
  [[27, -1], [30, 1]],
  [[0, 1], [10, -1], [17, 1]],
  [[4, -1], [28, -1], [29, -1]],
  [[2, -1], [5, 1], [28, 1]],
  [[5, -1], [24, -1], [31, 1]],
  [[14, -1], [15, -1], [28, 1]],
  [[10, 1], [16, -1]],
  [[0, 1], [18, -1], [24, -1], [31, 1]],
  [[24, -1], [31, 1]],
  [[1, 1], [3, -1], [32, -1]],
  [[0, 1], [3, -1], [9, -1], [10, -1]],
  [[22, -1], [25, 1]],
  [[0, 1], [19, -1], [29, 1]],
  [[12, 1], [15, -1], [20, -1], [21, 1], [25, 1], [33, -1]],
  [[8, -1], [17, 1], [29, 1], [32, 1]],
  [[7, 1], [8, -1], [9, 1], [15, -1], [18, 1], [20, 1], [27, 1], [29, -1]],
  [[3, -1], [10, -1], [16, 1], [23, 1], [24, 1], [25, 1], [29, -1]],
  [[12, -1], [15, 1], [21, -1], [25, -1]],
  [[0, 1], [16, 1]],
  [[0, 1], [8, 1], [13, 1], [28, 1], [32, 1]],
  [[1, -1], [28, 1]],
  [[7, -1], [8, -1], [9, -1], [11, 1], [12, 1], [14, -1], [15, -1], [18, -1], [20, -1], [21, 1], [22, 1], [33, -1]],
  [[16, 1], [22, -1], [23, 1], [25, 1]],
  [[2, -1], [4, 1], [14, -1], [18, -1], [19, 1], [30, 1]],
  [[16, -1], [29, -1]],
  [[0, -1], [8, -1], [24, 1], [25, -1], [30, -1]],
  [[4, -1], [8, -1], [18, 1], [19, -1], [32, -1]],
  [[4, -1], [16, 1]],
  [[2, -1], [7, -1], [9, -1], [20, -1], [21, -1], [22, -1], [23, 1], [31, 1]],
  [[1, 1], [4, 1], [6, -1], [19, -1], [29, 1], [32, -1]],
  [[3, -1], [6, 1], [16, -1], [19, 1], [32, 1]],
  [[8, 1], [19, -1], [23, -1], [24, -1]],
  [[1, 1], [19, -1]],
  [[3, 1], [7, -1]],
  [[1, 1], [19, -1], [23, -1]],
  [[18, -1], [20, 1]],
  [[0, -1], [3, 1], [5, -1], [28, -1], [29, -1]],
  [[19, -1], [23, -1], [24, -1]],
  [[5, 1], [13, -1], [28, 1]],
  [[16, 1], [19, -1], [28, -1]],
  [[9, 1], [19, -1], [20, 1], [21, 1], [23, -1]],
  [[3, -1], [16, -1], [19, 1], [23, -1]],
  [[3, -1], [24, 1]],
  [[0, -1], [8, -1], [13, 1], [15, 1], [21, -1]],
  [[5, -1], [30, 1], [32, 1]],
  [[9, 1], [18, 1], [20, 1], [23, -1]],
  [[9, 1], [25, -1]],
  [[5, 1], [30, -1]],
  [[10, -1], [17, 1]],
  [[8, 1], [10, -1], [12, -1], [22, 1]],
  [[4, -1], [12, 1], [29, 1]],
  [[2, -1], [4, -1], [13, 1], [15, 1]],
  [[10, -1], [17, 1]],
  [[7, 1], [10, -1], [12, -1], [17, 1], [22, -1]],
  [[27, -1], [33, 1]],
  [[2, 1], [22, 1], [32, -1]],
  [[9, 1], [12, 1], [21, 1], [29, -1], [30, -1]],
];

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selects: Array(questions.length).fill(null),
      visible: false,
      scope_list: [],
    };
  }

  onChange(idx) {
    const that = this;

    function set(e) {
      let selects = that.state.selects;
      selects[idx] = e.target.value;
      that.setState({selects: selects});
    }

    return set;
  }

  gen_question_data() {
    return questions.map((value, idx) => {
      return {
        index: idx + 1,
        q1: questions[idx][0],
        select: this.state.selects[idx],
        q2: questions[idx][1],
      };
    });
  }

  count_down(idx, scope_list, scope, mode) {
    for (let _idx in mapping[idx]) {
      let point = mapping[idx][_idx];

      if (point[1] !== mode) continue;

      scope_list[point[0]] += scope * point[1] + 1;
    }
  }

  get_result() {
    const {selects} = this.state;

    let check_mode = false;
    let lack_question_idx = [];
    let scope_list = Array(talents.length).fill(0);

    for (let idx in selects) {
      let scope = selects[idx];

      if (scope == null) {

        if (!check_mode) check_mode = true;

        lack_question_idx.push(parseInt(idx) + 1)

      } else if (check_mode) {
        continue;
      }

      if (scope === 0) {

        for (let _idx in mapping[idx]) {
          let point = mapping[idx][_idx];
          scope_list[point[0]]++;
        }

      } else if (scope < 0) {

        this.count_down(idx, scope_list, scope, -1)

      } else if (scope > 0) {

        this.count_down(idx, scope_list, scope, 1)

      } else {
        check_mode = true;
      }

    }

    if (lack_question_idx.length) {

      // 若发现还有没有做完的题目，则报错
      Modal.error({
        title: '请完成所有的题目',
        content: (
          lack_question_idx.map((value, idx) =>
            (<span key={idx} style={{
              backgroundColor: '#212121',
              color: '#fff',
              marginRight: '10px',
            }}>{value}</span>))
        ),
      })

    } else {

      // 仅在全部题目都完成的情况下，才显示 Modal
      this.setState({
        scope_list,
        visible: true
      });

    }

  }

  handleOk = (e) => {
    this.setState({
      visible: false,
    });
  };

  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  };

  showResult() {
    const data = this.state.scope_list.map(
      (val, idx) => ({
        name: talents[idx],
        scope: parseInt(val * 1000 / talent_count[idx]),
        index: parseInt(idx) + 1,
        topic: topic[belong[idx]],
        belong: belong[idx]
      }));

    const columns = [
      {
        title: '序号',
        dataIndex: 'index',
        sorter: (a, b) => a.index - b.index,
      },
      {
        title: '主题',
        dataIndex: 'topic',
        sorter: (a, b) => a.belong - b.belong,
        filters: topic.map((value, idx) => ({text: value, value: idx})),
        onFilter: (value, record) => record.belong === value,
      },
      {
        title: '优势',
        dataIndex: 'name',
      },
      {
        title: '分数',
        dataIndex: 'scope',
        sorter: (a, b) => a.scope - b.scope,
      },
    ];

    return (
      <Table rowKey='index'
             columns={columns} dataSource={data}
             size="small" pagination={false}/>
    )

  }

  render = () => (
    <TopHeader title="公益人优势测评 v.1.3.0" subTitle="寻找你的优势领域">
      <div className="App">
        <Form questions={this.gen_question_data()} onChange={this.onChange.bind(this)}/>
        <Button type="primary" onClick={this.get_result.bind(this)} style={{margin: "50px"}}>
          提交报告 生成测试结果
        </Button>
        <Modal
          title="评测报告"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >

          {this.showResult()}

        </Modal>

      </div>
    </TopHeader>
  );
}
