"use strict";(self["webpackChunkMaterialDesignForum"]=self["webpackChunkMaterialDesignForum"]||[]).push([[1776],{1776:function(t,e,i){i.r(e),i.d(e,{default:function(){return k}});var n=i(9618),o=i(3913),s=i(3231),r=i(7098),A=i(369),a=i(4871),c=i(5218),d=i(3893),l=(0,c.Z)((0,r.Z)("bar",["height","window"]),A.Z,a.Z).extend({name:"v-system-bar",props:{height:[Number,String],lightsOut:Boolean,window:Boolean},computed:{classes(){return{"v-system-bar--lights-out":this.lightsOut,"v-system-bar--absolute":this.absolute,"v-system-bar--fixed":!this.absolute&&(this.app||this.fixed),"v-system-bar--window":this.window,...this.themeClasses}},computedHeight(){return this.height?isNaN(parseInt(this.height))?this.height:parseInt(this.height):this.window?32:24},styles(){return{height:(0,d.kb)(this.computedHeight)}}},methods:{updateApplication(){return this.$el?this.$el.clientHeight:this.computedHeight}},render(t){const e={staticClass:"v-system-bar",class:this.classes,style:this.styles,on:this.$listeners};return t("div",this.setBackgroundColor(this.color,e),(0,d.z9)(this))}}),p=i(3468),g=function(){var t=this,e=t._self._c;return e("div",[e(l,{staticClass:"glass-container",attrs:{window:"",app:""}},[e(o.Z,{staticStyle:{"margin-right":"8px","-webkit-app-region":"drag","-webkit-user-select":"none"},attrs:{"max-height":"16","max-width":"16",src:i(3216)}}),t.$store.getters.GetDevice.desktop?e(s.Z,{staticStyle:{"-webkit-app-region":"drag","-webkit-user-select":"none",height:"100%"}}):t._e(),t.$store.getters.GetDevice.mobile?t._e():e("span",{staticStyle:{"-webkit-app-region":"drag","-webkit-user-select":"none"}},[t._v(t._s(t.title))]),e(s.Z,{staticStyle:{"-webkit-app-region":"drag","-webkit-user-select":"none",height:"100%"}}),e("div",{staticStyle:{"-webkit-app-region":"no-drag"}},[e(p.Z,{attrs:{bottom:""},scopedSlots:t._u([{key:"activator",fn:function({on:i,attrs:o}){return[e(n.Z,t._g(t._b({attrs:{color:"grey"},on:{click:function(e){t.top_window=!t.top_window}}},"v-icon",o,!1),i),[t._v(t._s(t.top_window?"mdi-radiobox-marked":"mdi-brightness-1"))])]}}])},[e("span",[t._v(t._s(t.top_window?t.$t("Message.Components.SystemBar.CancelTopWindow"):t.$t("Message.Components.SystemBar.TopWindow")))])]),t.is_admin?t._e():e(p.Z,{attrs:{bottom:""},scopedSlots:t._u([{key:"activator",fn:function({on:i,attrs:o}){return[e(n.Z,t._g(t._b({attrs:{color:"blue"},on:{click:function(e){t.$router.push(`${t.$G_UrlHeaderLang()}/info`)}}},"v-icon",o,!1),i),[t._v("mdi-brightness-1")])]}}],null,!1,3855629274)},[e("span",[t._v(t._s(t.$t("Message.Admin.Options.SiteDescription")))])]),e(p.Z,{attrs:{bottom:""},scopedSlots:t._u([{key:"activator",fn:function({on:i,attrs:o}){return[e(n.Z,t._g(t._b({attrs:{color:"green"},on:{click:function(e){return t._OnElectronWindowOpen("window-min")}}},"v-icon",o,!1),i),[t._v("mdi-brightness-1")])]}}])},[e("span",[t._v(t._s(t.$t("Message.Components.Editor.Minimize")))])]),e(p.Z,{attrs:{bottom:""},scopedSlots:t._u([{key:"activator",fn:function({on:i,attrs:o}){return[e(n.Z,t._g(t._b({attrs:{color:"orange"},on:{click:function(e){return t._OnElectronWindowOpen("window-max")}}},"v-icon",o,!1),i),[t._v("mdi-brightness-1")])]}}])},[e("span",[t._v(t._s(t.$t("Message.Components.Editor.Maximize")))])]),e(p.Z,{attrs:{bottom:""},scopedSlots:t._u([{key:"activator",fn:function({on:i,attrs:o}){return[e(n.Z,t._g(t._b({attrs:{color:"red"},on:{click:function(e){return t._OnElectronWindowOpen("window-close")}}},"v-icon",o,!1),i),[t._v("mdi-brightness-1")])]}}])},[e("span",[t._v(t._s(t.$t("Message.Components.Editor.Close")))])])],1)],1)],1)},u=[],w=i(7079),m={props:{is_admin:{type:Boolean,default:!1}},data:()=>({title:"Material Design Forum",max:!1,top_window:!1}),computed:{Time(){const t=new Date;return t.toLocaleString()}},methods:{UpdateTitle(){const t=this;document.querySelector("title").addEventListener("DOMSubtreeModified",(()=>{t.title=document.querySelector("title").innerText}))},_OnElectronWindowOpen(t){(0,w.j8)(t)}},mounted(){this.UpdateTitle()},watch:{$route(t){},max(t){this._OnElectronWindowOpen("max")},top_window(t){this._OnElectronWindowOpen(t?"window-top":"window-top-cancel")}}},C=m,h=i(1001),B=(0,h.Z)(C,g,u,!1,null,null,null),k=B.exports},3216:function(t){t.exports="data:image/png;base64,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"}}]);