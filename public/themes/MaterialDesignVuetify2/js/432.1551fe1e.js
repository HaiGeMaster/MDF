"use strict";(self["webpackChunkMaterialDesignForum"]=self["webpackChunkMaterialDesignForum"]||[]).push([[432,7156],{7156:function(t,e,a){a.d(e,{default:function(){return p}});var s=a(4780),i=a(9618),n=a(3468),o=function(){var t=this,e=t._self._c;return e(n.Z,{attrs:{bottom:"",disabled:!t.only_icon},scopedSlots:t._u([{key:"activator",fn:function({on:a,attrs:n}){return[e(s.Z,t._g(t._b({staticClass:"glass-container",staticStyle:{margin:"16px 0"},attrs:{text:"",color:"primary",rounded:"",icon:t.only_icon},on:{click:function(e){return t.$router.go(-1)}}},"v-btn",n,!1),a),[e(i.Z,[t._v(" "+t._s(t.icon||"mdi-arrow-left")+" ")]),t._v(" "+t._s(t.only_icon?"":t.text||t.$t("Message.Components.BackButton.Back"))+" ")],1)]}}])},[e("span",[t._v(t._s(t.text||t.$t("Message.Components.BackButton.Back")))])])},l=[],r={props:{text:{type:String,default:""},icon:{type:String,default:""},only_icon:{type:Boolean,default:!1}}},c=r,d=a(1001),u=(0,d.Z)(c,o,l,!1,null,null,null),p=u.exports},6417:function(t,e,a){a.r(e),a.d(e,{default:function(){return m}});var s=a(4780),i=a(3162),n=a(116),o=a(7986),l=a(9485),r=a(8561),c=function(){var t=this,e=t._self._c;return t.$store.getters["User/GetUser"].user_group.ability_admin_manage_option?e(o.Z,{staticStyle:{"max-width":"830px"}},[e("ReturnButton"),e("br"),e("br"),e(i.Z,{staticClass:"glass-container",attrs:{rounded:"xxl",outlined:t.$vuetify.theme.dark||t.$store.getters.GetDevice.mobile}},[e(n.ZB,[e(r.Z,{attrs:{label:t.$t("Message.Admin.Options.SiteName")},model:{value:t.form_data.site_name,callback:function(e){t.$set(t.form_data,"site_name",e)},expression:"form_data.site_name"}}),e(r.Z,{attrs:{label:t.$t("Message.Admin.Options.SiteDescription")},model:{value:t.form_data.site_description,callback:function(e){t.$set(t.form_data,"site_description",e)},expression:"form_data.site_description"}}),e(r.Z,{attrs:{label:t.$t("Message.Admin.Options.SiteKeywords"),hint:t.$t("Message.Admin.Options.SiteKeywordsHint"),"persistent-hint":""},model:{value:t.form_data.site_keywords,callback:function(e){t.$set(t.form_data,"site_keywords",e)},expression:"form_data.site_keywords"}}),e(r.Z,{attrs:{label:t.$t("Message.Admin.Options.SiteICP"),hint:t.$t("Message.Admin.Options.SiteICPHint"),"persistent-hint":""},model:{value:t.form_data.site_icp_beian,callback:function(e){t.$set(t.form_data,"site_icp_beian",e)},expression:"form_data.site_icp_beian"}}),e(r.Z,{attrs:{label:t.$t("Message.Admin.Options.SitePolice"),hint:t.$t("Message.Admin.Options.SitePoliceHint"),"persistent-hint":""},model:{value:t.form_data.site_gongan_beian,callback:function(e){t.$set(t.form_data,"site_gongan_beian",e)},expression:"form_data.site_gongan_beian"}}),e(l.Z,{attrs:{items:t.LanguageList,label:t.$t("Message.Admin.Options.DefaultLanguage")+":"+t.form_data.default_language,"item-value":"value","item-text":"text"},model:{value:t.form_data.default_language,callback:function(e){t.$set(t.form_data,"default_language",e)},expression:"form_data.default_language"}}),e(s.Z,{attrs:{loading:t.IsLoading,color:"primary"},on:{click:t.SetData}},[t._v(t._s(t.$t("Message.Admin.Options.Save")))])],1)],1)],1):t._e()},d=[],u=a(7156),p=a(7079),g={name:"admin-page-options-info",components:{ReturnButton:u["default"]},data:()=>({LanguageList:[],form_data:{site_name:"",site_description:"",site_keywords:"",site_icp_beian:"",site_gongan_beian:"",default_language:""},IsLoading:!1}),methods:{SetLanguageList(){const t=this.$store.getters.GetLangMessages;for(let e in t)if(t[e].Message.langInfo.show){const a=t[e].Message.langInfo.langname,s=t[e].Message.langInfo.usability,i=t[e].Message.langInfo.flagicon;this.LanguageList.push({text:a,locale:e,usability:s,flagicon:i})}},async GetData(){this.$G_GetUserToken();const t=await(0,p.aG)();t.data.is_get&&(this.form_data=t.data.form_data,this.$forceUpdate())},async SetData(){this.IsLoading=!0;var t=this.$G_GetUserToken();const e=await(0,p._5)({form_data:this.form_data,user_token:t});e.data.is_set?(this.IsLoading=!1,this.GetData()):this.IsLoading=!1}},created(){this.GetData(),this.SetLanguageList()},watch:{form_data:{handler(t){},deep:!0}}},h=g,f=a(1001),_=(0,f.Z)(h,c,d,!1,null,null,null),m=_.exports},1515:function(){},7285:function(t,e,a){a.d(e,{Z:function(){return h}});var s=a(5218),i=a(4681),n=a(9211),o=a(369),l=a(3768),r=a(4871),c=a(7987),d=a(4949),u=a(1759),p=a(6096),g=a(3893),h=(0,s.Z)(o.Z,u.Z,d.Z,r.Z,(0,l.d)("chipGroup"),(0,c.d)("inputValue")).extend({name:"v-chip",props:{active:{type:Boolean,default:!0},activeClass:{type:String,default(){return this.chipGroup?this.chipGroup.activeClass:""}},close:Boolean,closeIcon:{type:String,default:"$delete"},closeLabel:{type:String,default:"$vuetify.close"},disabled:Boolean,draggable:Boolean,filter:Boolean,filterIcon:{type:String,default:"$complete"},label:Boolean,link:Boolean,outlined:Boolean,pill:Boolean,tag:{type:String,default:"span"},textColor:String,value:null},data:()=>({proxyClass:"v-chip--active"}),computed:{classes(){return{"v-chip":!0,...d.Z.options.computed.classes.call(this),"v-chip--clickable":this.isClickable,"v-chip--disabled":this.disabled,"v-chip--draggable":this.draggable,"v-chip--label":this.label,"v-chip--link":this.isLink,"v-chip--no-color":!this.color,"v-chip--outlined":this.outlined,"v-chip--pill":this.pill,"v-chip--removable":this.hasClose,...this.themeClasses,...this.sizeableClasses,...this.groupClasses}},hasClose(){return Boolean(this.close)},isClickable(){return Boolean(d.Z.options.computed.isClickable.call(this)||this.chipGroup)}},created(){const t=[["outline","outlined"],["selected","input-value"],["value","active"],["@input","@active.sync"]];t.forEach((([t,e])=>{this.$attrs.hasOwnProperty(t)&&(0,p.fK)(t,e,this)}))},methods:{click(t){this.$emit("click",t),this.chipGroup&&this.toggle()},genFilter(){const t=[];return this.isActive&&t.push(this.$createElement(n.Z,{staticClass:"v-chip__filter",props:{left:!0}},this.filterIcon)),this.$createElement(i.Zq,t)},genClose(){return this.$createElement(n.Z,{staticClass:"v-chip__close",props:{right:!0,size:18},attrs:{"aria-label":this.$vuetify.lang.t(this.closeLabel)},on:{click:t=>{t.stopPropagation(),t.preventDefault(),this.$emit("click:close"),this.$emit("update:active",!1)}}},this.closeIcon)},genContent(){return this.$createElement("span",{staticClass:"v-chip__content"},[this.filter&&this.genFilter(),(0,g.z9)(this),this.hasClose&&this.genClose()])}},render(t){const e=[this.genContent()];let{tag:a,data:s}=this.generateRouteLink();s.attrs={...s.attrs,draggable:this.draggable?"true":void 0,tabindex:this.chipGroup&&!this.disabled?0:s.attrs.tabindex},s.directives.push({name:"show",value:this.active}),s=this.setBackgroundColor(this.color,s);const i=this.textColor||this.outlined&&this.color;return t(a,this.setTextColor(i,s),e)}})},7986:function(t,e,a){a(1290),a(1515);var s=a(7504),i=a(5477);e.Z=(0,s.Z)("container").extend({name:"v-container",functional:!0,props:{id:String,tag:{type:String,default:"div"},fluid:{type:Boolean,default:!1}},render(t,{props:e,data:a,children:s}){let n;const{attrs:o}=a;return o&&(a.attrs={},n=Object.keys(o).filter((t=>{if("slot"===t)return!1;const e=o[t];return t.startsWith("data-")?(a.attrs[t]=e,!1):e||"string"===typeof e}))),e.id&&(a.domProps=a.domProps||{},a.domProps.id=e.id),t(e.tag,(0,i.ZP)(a,{staticClass:"container",class:Array({"container--fluid":e.fluid}).concat(n||[])}),s)}})},7504:function(t,e,a){a.d(e,{Z:function(){return i}});var s=a(144);function i(t){return s["default"].extend({name:`v-${t}`,functional:!0,props:{id:String,tag:{type:String,default:"div"}},render(e,{props:a,data:s,children:i}){s.staticClass=`${t} ${s.staticClass||""}`.trim();const{attrs:n}=s;if(n){s.attrs={};const t=Object.keys(n).filter((t=>{if("slot"===t)return!1;const e=n[t];return t.startsWith("data-")?(s.attrs[t]=e,!1):e||"string"===typeof e}));t.length&&(s.staticClass+=` ${t.join(" ")}`)}return a.id&&(s.domProps=s.domProps||{},s.domProps.id=a.id),e(a.tag,s,i)}})}}}]);