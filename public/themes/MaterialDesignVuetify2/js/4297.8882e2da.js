"use strict";(self["webpackChunkMaterialDesignForum"]=self["webpackChunkMaterialDesignForum"]||[]).push([[4297],{4297:function(e,t,s){s.r(t),s.d(t,{default:function(){return g}});var i=s(3162),n=s(7986),o=function(){var e=this,t=e._self._c;return e.$store.getters["User/GetUser"].user_group.ability_admin_manage_question?t(n.Z,[e.$G_AppIsCanUse()?t(i.Z,{staticClass:"glass-container",attrs:{rounded:"xxl",outlined:e.$vuetify.theme.dark||e.$store.getters.GetDevice.mobile}},[e.$store.getters["User/GetIsLogin"]?t("DataTable",{attrs:{headers:e.headers,type:"questions"},on:{edit_item:e.OnEdit}}):e._e()],1):t("NoAllowUse"),t("Loading",{attrs:{need_margin_bottom:!0,show_text:!1}})],1):e._e()},a=[],u=s(9170),d=s(9387),l={name:"admin-page-questions",components:{DataTable:u.Z,Loading:d["default"],NoAllowUse:()=>s.e(8819).then(s.bind(s,8819))},data:()=>({dialog:!1}),computed:{headers(){return[{text:this.$t("Message.Admin.Questions.QuestionID"),align:"start",value:"question_id"},{text:this.$t("Message.Admin.Questions.User"),value:"user"},{text:this.$t("Message.Admin.Questions.Title"),value:"title"},{text:this.$t("Message.Admin.Questions.CommentCount"),value:"comment_count"},{text:this.$t("Message.Admin.Questions.AnswerCount"),value:"answer_count"},{text:this.$t("Message.Admin.Questions.FollowerCount"),value:"follower_count"},{text:this.$t("Message.Admin.Questions.VoteCount"),value:"vote_count"},{text:this.$t("Message.Admin.Questions.VoteUpCount"),value:"vote_up_count"},{text:this.$t("Message.Admin.Questions.VoteDownCount"),value:"vote_down_count"},{text:this.$t("Message.Admin.Questions.CreateTime"),value:"create_time"},{text:this.$t("Message.Admin.Questions.UpdateTime"),value:"update_time"}]}},methods:{OnEdit(e){this.$store.dispatch("FabDialog/Set_EditorFabDialog",{md_title:e.title,md_topics:e.topics,md_content:e.content_rendered,edit_mode_id:e.question_id,title:this.$t("Message.Components.Editor.EditQuestion"),icon:"mdi-forum",has_title:!0,has_topic:!0,submit_text:this.$t("Message.Components.Editor.Release"),edit_type:"question",edit_mode:"edit",model:"maximize"})}}},r=l,m=s(1001),_=(0,m.Z)(r,o,a,!1,null,null,null),g=_.exports}}]);