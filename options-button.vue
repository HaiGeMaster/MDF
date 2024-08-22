<template>
  <v-menu rounded="xxl" offset-y top transition="scroll-y-reverse-transition">
    <template v-slot:activator="{ attrs, on }">
      <v-btn icon @click.stop.prevent="tests" v-bind="attrs" v-on="on" v-show="LookButtonShowRule"
        color="grey darken-1">
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </template>
    <v-list >
      <v-list-item v-if="LookCopyShowRule" @click="SpawnCopyLink()">
        <v-list-item-avatar>
          <v-icon>mdi-link</v-icon>
        </v-list-item-avatar>
        <v-list-item-title>{{ $t('Message.Client.Topic.Topic.CopyLink') }}</v-list-item-title>
      </v-list-item>

      <v-list-item v-if="LookFollowersShowRule" :disabled="FollowCount == 0"
        @click="
        $store.dispatch('Dialog/Set_UsersDialog', {
          id:GetItemID(),
          type:type,
          modes:'followers',
          model:true
        })
        ">
        <v-list-item-avatar>
          <v-icon>mdi-account-star</v-icon>
        </v-list-item-avatar>
        <v-list-item-title>{{
          $t('Message.Client.Topic.Topic.LookFollowers',{value:FollowCount})
        }}</v-list-item-title>
      </v-list-item>

      <v-dialog v-model="ReportDialog" max-width="290" v-if="LookReportDialogShowRule">
        <template v-slot:activator="{ on, attrs }">
          <v-list-item v-bind="attrs" v-on="on">
            <v-list-item-avatar>
              <v-icon>mdi-flag</v-icon>
            </v-list-item-avatar>
            <v-list-item-title>{{ $t('Message.Components.OptionsButton.Report') }}</v-list-item-title>
          </v-list-item>
        </template>
        <v-card :class="[ 'glass-container']">
          <v-card-title class="text-h5">
            {{ $t('Message.Components.OptionsButton.Report') }}
          </v-card-title>
          <v-card-text>
            <v-radio-group v-model="radioGroup">
              <v-radio v-for="n in radioGroupItem" :key="n.value" :label="$t(n.text)" :value="n.value"></v-radio>
            </v-radio-group>
            <v-text-field v-model="OtherReasons" v-if="radioGroup == 'Message.Components.OptionsButton.OtherReasons'"
              :label="$t('Message.Components.OptionsButton.OtherReasons')"></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <!-- <v-btn text rounded @click="ReportDialog = false" color="accent">
              {{ $t('Message.Components.OptionsButton.Cancel') }}
            </v-btn>
            <v-btn depressed rounded :disabled="radioGroup == null" color="primary" @click="AddReport()">
              {{ $t('Message.Components.OptionsButton.Submit') }}
            </v-btn> -->

            
            <Cancel 
              @cancel="ReportDialog = false" 
              :text="$t('Message.Components.OptionsButton.Cancel')"
            />

            <Confirm
              @confirm="AddReport()" :disabled="radioGroup == null"
              :text="$t('Message.Components.OptionsButton.Submit')"
            />
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-list-item v-if="LookEditShowRule" @click="EditItem()" :disabled="!$store.getters['User/GetIsLogin']">
        <v-list-item-avatar>
          <v-icon>mdi-pencil</v-icon>
        </v-list-item-avatar>
        <v-list-item-title>
          {{
            EditText
          }}
        </v-list-item-title>
      </v-list-item>

      <v-dialog v-model="deleteDialog" max-width="400px" max-height="200px" v-if="LookDeleteShowRule">
        <template v-slot:activator="{ on, attrs }">
          <v-list-item v-bind="attrs" v-on="on" :disabled="!$store.getters['User/GetIsLogin']">
            <v-list-item-avatar>
              <v-icon>mdi-delete</v-icon>
            </v-list-item-avatar>
            <v-list-item-title>{{ DeleteText }}</v-list-item-title>
          </v-list-item>
        </template>
        <v-card :class="['glass-container']">
          <v-card-title class="headline">
            {{
              $t('Message.Components.DataTable.Delete')
            }}
          </v-card-title>
          <v-card-text>
            {{
              $t('Message.Components.DataTable.AreYouSureYouWantToDeleteIt')
            }}
            <br>
            <code>{{ delete_preview_text }}</code>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <!-- <v-btn text rounded @click="deleteDialog = false" color="accent">
              {{
                $t('Message.Components.DataTable.Cancel')
              }}
            </v-btn>
            <v-btn depressed rounded color="primary" @click="DeleteItem()
              ">
              {{
                $t('Message.Components.DataTable.Confirm')
              }}
            </v-btn> -->

            <Cancel 
              @cancel="deleteDialog = false" 
              :text="$t('Message.Components.DataTable.Cancel')"
            />

            <Confirm
              @confirm="DeleteItem()"
              :text="$t('Message.Components.DataTable.Confirm')"
            />
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-list-item @click="ResetCover()"
        v-if="LookResetCoverShowRule">
        <v-list-item-avatar>
          <v-icon>mdi-image-edit-outline</v-icon>
        </v-list-item-avatar>
        <v-list-item-title>{{ $t('Message.Components.OptionsButton.ResetCover') }}</v-list-item-title>
      </v-list-item>
      <v-list-item @click="ResetAvatar()"
        v-if="LookResetAvatarShowRule">
        <v-list-item-avatar>
          <v-icon>mdi-account-edit-outline</v-icon>
        </v-list-item-avatar>
        <v-list-item-title>{{ $t('Message.Components.OptionsButton.ResetAvatar') }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>
<script>
import {
  DeleteDatas,
  AddReport,
  UserAvatarReset,
  UserCoverReset,
} from '@/utils/global.js'
import Confirm from '@/components/button/confirm.vue'
import Cancel from '@/components/button/cancel.vue'
export default {
  name: 'options-button',
  props: {
    type: {
      type: String,
      default: 'topic',
    },
    item: {
      type: Object,
      default: null
    },
  },
  components: {
    Confirm,
    Cancel
  },
  data: () => ({
    deleteDialog: false,
    delete_preview_text: '',
    editDialog: true,
    ReportDialog: false,
    OtherReasons: '',
    radioGroup: null,
    radioGroupItem: [
      {
        text: 'Message.Components.OptionsButton.GarbageAdvertisingInformation',
        value: 'Message.Components.OptionsButton.GarbageAdvertisingInformation',
      },
      {
        text: 'Message.Components.OptionsButton.UnfriendlyBehavior',
        value: 'Message.Components.OptionsButton.UnfriendlyBehavior',
      },
      {
        text: 'Message.Components.OptionsButton.HarmfulInformation',
        value: 'Message.Components.OptionsButton.HarmfulInformation',
      },
      {
        text: 'Message.Components.OptionsButton.SuspectedInfringement',
        value: 'Message.Components.OptionsButton.SuspectedInfringement',
      },
      {
        text: 'Message.Components.OptionsButton.InducingApprovalAndAttention',
        value: 'Message.Components.OptionsButton.InducingApprovalAndAttention',
      },
      {
        text: 'Message.Components.OptionsButton.OtherReasons',
        value: 'Message.Components.OptionsButton.OtherReasons',
      },
    ],
  }),
  watch:{
    deleteDialog(val){
      if(val){
        // this.delete_preview_text = this.item.title
        switch(this.type){
          case 'topic':
            this.delete_preview_text = this.item.name
            break
          case 'question':
            this.delete_preview_text = this.item.title
            break
          case 'article':
            this.delete_preview_text = this.item.title
            break
          case 'answer':
            this.delete_preview_text = this.item.content_markdown
            break
          case 'comment':
            this.delete_preview_text = this.item.content
            break
          case 'reply':
            this.delete_preview_text = this.item.content
            break
          // case 'user':
          //   this.delete_preview_text = this.item.user_name
          //   break
        }
      }else{
        this.delete_preview_text = ''
      }
    }
  },
  methods: {
    tests(){
      // console.log('tests')
    },
    async ResetAvatar() {
      const response = await UserAvatarReset({
        user_id: this.$G_GetUserID(),
        user_token: this.$G_GetUserToken(),
      })
      if (response.data.is_reset == true) {
      } else {
      }
    },
    async ResetCover() {
      const response = await UserCoverReset({
        user_id: this.$G_GetUserID(),
        user_token: this.$G_GetUserToken(),
      })
      if (response.data.is_reset == true) {
      } else {
      }
    },
    EditItem() {
      const item = this.item
      switch (this.type) {
        case 'topic':
          this.$store.dispatch('Dialog/Set_TopicDialog', {
            mode:'edit',
            edit_topic:item,
            model:true,
          })
          break
        case 'answer':
          this.$store.dispatch('FabDialog/Set_EditorFabDialog', {
            title:this.$t('Message.Components.Editor.EditAnswer'),
            icon:'mdi-comment-plus-outline',
            has_title:false,
            has_topic:false,
            submit_text:this.$t('Message.Components.Editor.Release'),
            edit_type:'answer',
            edit_mode:'edit',
            edit_mode_id:item.answer_id,
            md_content:item.content_rendered,
            model:'moderate',
          })
          break
        case 'question':
          this.$store.dispatch('FabDialog/Set_EditorFabDialog', {
            title:this.$t('Message.Components.Editor.EditQuestion'),
            icon:'mdi-forum',
            has_title:true,
            has_topic:true,
            submit_text:this.$t('Message.Components.Editor.Release'),
            edit_type:'question',
            edit_mode:'edit',
            edit_mode_id:item.question_id,
            md_title:item.title,
            md_topics:item.topics,
            md_content:item.content_rendered,
            model:'moderate',
          })
          break
        case 'article':
          this.$store.dispatch('FabDialog/Set_EditorFabDialog', {
            title:this.$t('Message.Components.Editor.EditArticle'),
            icon:'mdi-file-document',
            has_title:true,
            has_topic:true,
            submit_text:this.$t('Message.Components.Editor.Release'),
            edit_type:'article',
            edit_mode:'edit',
            edit_mode_id:item.article_id,
            md_title:item.title,
            md_topics:item.topics,
            md_content:item.content_rendered,
            model:'moderate',
          })
          break
        case 'comment':
          this.$store.dispatch('Dialog/Set_CommentReplyEditDialog', {
            title:this.$t('Message.Components.OptionsButton.EditComment'),
            type:'comment',
            edit_id:item.comment_id,
            content:item.content,
            model:true,
          })
          break
        case 'reply':
          this.$store.dispatch('Dialog/Set_CommentReplyEditDialog', {
            title:this.$t('Message.Components.OptionsButton.EditReply'),
            type:'reply',
            edit_id:item.reply_id,
            content:item.content,
            model:true,
          })
          break
      }
    },
    async DeleteItem() {
      this.OnAxiosDelete([this.GetItemID()])
    },
    async OnAxiosDelete(item_ids) {
      this.ids = item_ids
      var user_token = this.$G_GetUserToken()
      var data = null
      switch (this.type) {
        case 'topic':
          data = {
            topic_ids: this.ids,
            user_token: user_token
          }
          break;
        case 'article':
          data = {
            article_ids: this.ids,
            user_token: user_token
          }
          break;
        case 'question':
          data = {
            question_ids: this.ids,
            user_token: user_token
          }
          break;
        case 'answer':
          data = {
            answer_ids: this.ids,
            user_token: user_token
          }
          break;
        case 'comment':
          data = {
            comment_ids: this.ids,
            user_token: user_token
          }
          break;
        case 'user':
          data = {
            user_ids: this.ids,
            user_token: user_token
          }
          break;
        case 'reply':
          data = {
            reply_ids: this.ids,
            user_token: user_token
          }
          break;
        case 'report':
          data = {
            report_ids: this.ids,
            user_token: user_token
          }
          break;
        case 'user_group':
          data = {
            user_group_ids: this.ids,
            user_token: user_token
          }
          break;
      }
      const response = await DeleteDatas(`${this.type}s`, data)
      if (response.data.is_delete == true) {
        this.deleteDialog = false
      } else {
      }
    },
    GetItemID() {
      var a = 0
      switch (this.type) {
        case 'topic':
          a = this.item.topic_id
          break
        case 'question':
          a = this.item.question_id
          break
        case 'article':
          a = this.item.article_id
          break
        case 'answer':
          a = this.item.answer_id
          break
        case 'comment':
          a = this.item.comment_id
          break
        case 'reply':
          a = this.item.reply_id
          break
      }
      return a
    },
    SpawnCopyLink() {
      var text = ''
      switch(this.type) {
        case 'answer':
          text = `${window.location.origin}${this.$G_UrlHeaderLang()}/questions/${this.item.question_id}/answers/${this.item.answer_id}`
          break
        case 'topic':
          text = `${window.location.origin}${this.$G_UrlHeaderLang()}/topics/${this.item.topic_id}`
          break
        case 'user':
          text = `${window.location.origin}${this.$G_UrlHeaderLang()}/users/${this.item.user_id}`
          break
        case 'article':
          text = `${window.location.origin}${this.$G_UrlHeaderLang()}/articles/${this.item.article_id}`
          break
        case 'question':
          text = `${window.location.origin}${this.$G_UrlHeaderLang()}/questions/${this.item.question_id}`
          break
      }
      var input = document.createElement('input');
      input.setAttribute('readonly', 'readonly');
      input.setAttribute('value', text);
      document.body.appendChild(input);
      input.setSelectionRange(0, 9999);
      input.select();
      if (document.execCommand('copy')) {
        document.execCommand('copy');
      }
      input?document.body.removeChild(input):null;
    },
    AddReport() {
      if (!this.$store.getters['User/GetIsLogin']) {
        this.$store.dispatch('Dialog/Set_LoginDialog', true)
        return
      }
      this.StartAddReport()
    },
    async StartAddReport() {
      var user_token = this.$G_GetUserToken()
      var reportable_id = (
        this.type == 'topic' ? this.item.topic_id :
        this.type == 'question' ? this.item.question_id :
          this.type == 'article' ? this.item.article_id :
            this.type == 'answer' ? this.item.answer_id :
              this.type == 'comment' ? this.item.comment_id :
                this.type == 'reply' ? this.item.reply_id : 
                  this.type == 'user' ? this.item.user_id : 0)
      const response = await AddReport({
        user_token: user_token,
        reportable_type: this.type,
        reportable_id: reportable_id,
        reason: this.OtherReasons || this.radioGroup,
      })
      if (response.data.is_add == true) {
        this.ReportDialog = false
      } else {
      }
    },
  },
  computed: {
    EditText() {
      var a = ''
      switch (this.type) {
        case 'topic':
          a = this.$t('Message.Components.OptionsButton.EditTopic')
          break
        case 'question':
          a = this.$t('Message.Components.OptionsButton.EditQuestion')
          break
        case 'article':
          a = this.$t('Message.Components.OptionsButton.EditArticle')
          break
        case 'answer':
          a = this.$t('Message.Components.OptionsButton.EditAnswer')
          break
        case 'comment':
          a = this.$t('Message.Components.OptionsButton.EditComment')
          break
        case 'reply':
          a = this.$t('Message.Components.OptionsButton.EditReply')
          break
      }
      return a
    },
    DeleteText() {
      var a = ''
      switch (this.type) {
        case 'topic':
          a = this.$t('Message.Components.OptionsButton.DeleteTopic')
          break
        case 'question':
          a = this.$t('Message.Components.OptionsButton.DeleteQuestion')
          break
        case 'article':
          a = this.$t('Message.Components.OptionsButton.DeleteArticle')
          break
        case 'answer':
          a = this.$t('Message.Components.OptionsButton.DeleteAnswer')
          break
        case 'comment':
          a = this.$t('Message.Components.OptionsButton.DeleteComment')
          break
        case 'reply':
          a = this.$t('Message.Components.OptionsButton.DeleteReply')
          break
      }
      return a
    },
    FollowCount() {
      var a = 0
      switch (this.type) {
        case 'topic':
          a = this.item.follower_count
          break
        case 'question':
          a = this.item.follower_count
          break
        case 'article':
          a = this.item.follower_count
          break
      }
      return a
    },
    LookEditShowRule() {
      var a = false
      try {
        switch (this.type) {
          case 'topic':
            if (
              this.$store.getters['User/GetUser'].user_group['ability_edit_own_topic'] &&
              this.item.user_id == this.$G_GetUserID()
            ) {
              if (this.$store.getters['User/GetUser'].user_group['ability_edit_topic_only_no_article_or_question']) {
                if (this.item.article_count == 0 && this.item.question_count == 0) {
                  let time = this.$store.getters['User/GetUser'].user_group['time_before_edit_topic']; 
                  if (time == 0) {
                    a = true
                  } else {
                    time = time * 60; 
                    const time1 = Math.floor(Date.now() / 1000) - this.item.create_time; 
                    if (time1 < time) { 
                      a = true
                    } else {
                      a = false
                    }
                  }
                } else {
                  a = false
                }
              } else {
                let time = this.$store.getters['User/GetUser'].user_group['time_before_edit_topic']; 
                if (time == 0) {
                  a = true
                } else {
                  time = time * 60; 
                  const time1 = Math.floor(Date.now() / 1000) - this.item.create_time; 
                  if (time1 < time) { 
                    a = true
                  } else {
                    a = false
                  }
                }
              }
            } else {
              a = false
            }
            break
          case 'question':
            if (
              this.$store.getters['User/GetUser'].user_group['ability_edit_own_question'] &&
              this.item.user_id == this.$G_GetUserID()
            ) {
              if (this.$store.getters['User/GetUser'].user_group['ability_edit_question_only_no_answer']) {
                if (this.item.answer_count == 0) {
                  let time = this.$store.getters['User/GetUser'].user_group['time_before_edit_question']; 
                  if (time == 0) {
                    a = true
                  } else {
                    time = time * 60; 
                    const time1 = Math.floor(Date.now() / 1000) - this.item.create_time; 
                    if (time1 < time) { 
                      a = true
                    } else {
                      a = false
                    }
                  }
                } else {
                  a = false
                }
              } else {
                let time = this.$store.getters['User/GetUser'].user_group['time_before_edit_question']; 
                if (time == 0) {
                  a = true
                } else {
                  time = time * 60; 
                  const time1 = Math.floor(Date.now() / 1000) - this.item.create_time; 
                  if (time1 < time) { 
                    a = true
                  } else {
                    a = false
                  }
                }
              }
              if (this.$store.getters['User/GetUser'].user_group['ability_edit_question_only_no_comment']) {
                if (this.item.comment_count == 0) {
                  let time = this.$store.getters['User/GetUser'].user_group['time_before_edit_question']; 
                  if (time == 0) {
                    a = true
                  } else {
                    time = time * 60; 
                    const time1 = Math.floor(Date.now() / 1000) - this.item.create_time; 
                    if (time1 < time) { 
                      a = true
                    } else {
                      a = false
                    }
                  }
                } else {
                  a = false
                }
              } else {
                let time = this.$store.getters['User/GetUser'].user_group['time_before_edit_question']; 
                if (time == 0) {
                  a = true
                } else {
                  time = time * 60; 
                  const time1 = Math.floor(Date.now() / 1000) - this.item.create_time; 
                  if (time1 < time) { 
                    a = true
                  } else {
                    a = false
                  }
                }
              }
            } else {
              a = false
            }
            break
          case 'article':
            if (
              this.$store.getters['User/GetUser'].user_group['ability_edit_own_article'] &&
              this.item.user_id == this.$G_GetUserID()
            ) {
              if (this.$store.getters['User/GetUser'].user_group['ability_edit_article_only_no_comment']) {
                if (this.item.comment_count == 0) {
                  let time = this.$store.getters['User/GetUser'].user_group['time_before_edit_article']; 
                  if (time == 0) {
                    a = true
                  } else {
                    time = time * 60; 
                    const time1 = Math.floor(Date.now() / 1000) - this.item.create_time; 
                    if (time1 < time) { 
                      a = true
                    } else {
                      a = false
                    }
                  }
                } else {
                  a = false
                }
              } else {
                let time = this.$store.getters['User/GetUser'].user_group['time_before_edit_article']; 
                if (time == 0) {
                  a = true
                } else {
                  time = time * 60; 
                  const time1 = Math.floor(Date.now() / 1000) - this.item.create_time; 
                  if (time1 < time) { 
                    a = true
                  } else {
                    a = false
                  }
                }
              }
            } else {
              a = false
            }
            break
          case 'answer':
            if (
              this.$store.getters['User/GetUser'].user_group['ability_edit_own_answer'] &&
              this.item.user_id == this.$G_GetUserID()
            ) {
              if (this.$store.getters['User/GetUser'].user_group['ability_edit_answer_only_no_comment']) {
                if (this.item.comment_count == 0) {
                  let time = this.$store.getters['User/GetUser'].user_group['time_before_edit_answer']; 
                  if (time == 0) {
                    a = true
                  } else {
                    time = time * 60; 
                    const time1 = Math.floor(Date.now() / 1000) - this.item.create_time; 
                    if (time1 < time) { 
                      a = true
                    } else {
                      a = false
                    }
                  }
                } else {
                  a = false
                }
              } else {
                let time = this.$store.getters['User/GetUser'].user_group['time_before_edit_answer']; 
                if (time == 0) {
                  a = true
                } else {
                  time = time * 60; 
                  const time1 = Math.floor(Date.now() / 1000) - this.item.create_time; 
                  if (time1 < time) { 
                    a = true
                  } else {
                    a = false
                  }
                }
              }
            } else {
              a = false
            }
            break
          case 'comment':
            if (
              this.$store.getters['User/GetUser'].user_group['ability_edit_own_comment'] &&
              this.item.user_id == this.$G_GetUserID()
            ) {
              if (this.$store.getters['User/GetUser'].user_group['ability_edit_comment_only_no_reply']) {
                if (this.item.reply_count == 0) {
                  let time = this.$store.getters['User/GetUser'].user_group['time_before_edit_comment']; 
                  if (time == 0) {
                    a = true
                  } else {
                    time = time * 60; 
                    const time1 = Math.floor(Date.now() / 1000) - this.item.create_time; 
                    if (time1 < time) { 
                      a = true
                    } else {
                      a = false
                    }
                  }
                } else {
                  a = false
                }
              } else {
                let time = this.$store.getters['User/GetUser'].user_group['time_before_edit_comment']; 
                if (time == 0) {
                  a = true
                } else {
                  time = time * 60; 
                  const time1 = Math.floor(Date.now() / 1000) - this.item.create_time; 
                  if (time1 < time) { 
                    a = true
                  } else {
                    a = false
                  }
                }
              }
            } else {
              a = false
            }
            break
          case 'reply':
            if (
              this.$store.getters['User/GetUser'].user_group['ability_edit_own_reply'] &&
              this.item.user_id == this.$G_GetUserID()
            ) {
              if (this.$store.getters['User/GetUser'].user_group['ability_edit_reply_only_no_reply']) {
                if (this.item.reply_count == 0) {
                  let time = this.$store.getters['User/GetUser'].user_group['time_before_edit_reply']; 
                  if (time == 0) {
                    a = true
                  } else {
                    time = time * 60; 
                    const time1 = Math.floor(Date.now() / 1000) - this.item.create_time; 
                    if (time1 < time) { 
                      a = true
                    } else {
                      a = false
                    }
                  }
                } else {
                  a = false
                }
              } else {
                let time = this.$store.getters['User/GetUser'].user_group['time_before_edit_reply']; 
                if (time == 0) {
                  a = true
                } else {
                  time = time * 60; 
                  const time1 = Math.floor(Date.now() / 1000) - this.item.create_time; 
                  if (time1 < time) { 
                    a = true
                  } else {
                    a = false
                  }
                }
              }
            } else {
              a = false
            }
            break
        }
      } catch (e) {
      }
      return a
    },
    LookCopyShowRule() {
      var a = false
      switch (this.type) {
        case 'user':
        case 'topic':
        case 'question':
        case 'article':
        case 'answer':
          a = true
          break
      }
      return a
    },
    LookDeleteShowRule() {
      var a = false
      try {
        switch (this.type) {
          case 'topic':
            if (
              this.$store.getters['User/GetUser'].user_group['ability_delete_own_topic'] &&
              this.item.user_id == this.$G_GetUserID()
            ) {
              if (this.$store.getters['User/GetUser'].user_group['ability_delete_topic_only_no_article_or_question']) {
                if (this.item.article_count == 0 && this.item.question_count == 0) {
                  let time = this.$store.getters['User/GetUser'].user_group['time_before_delete_topic']; 
                  if (time == 0) {
                    a = true
                  } else {
                    time = time * 60; 
                    const time1 = Math.floor(Date.now() / 1000) - this.item.create_time; 
                    if (time1 < time) { 
                      a = true
                    } else {
                      a = false
                    }
                  }
                } else {
                  a = false
                }
              } else {
                let time = this.$store.getters['User/GetUser'].user_group['time_before_delete_topic']; 
                if (time == 0) {
                  a = true
                } else {
                  time = time * 60; 
                  const time1 = Math.floor(Date.now() / 1000) - this.item.create_time; 
                  if (time1 < time) { 
                    a = true
                  } else {
                    a = false
                  }
                }
              }
            } else {
              a = false
            }
            break
          case 'question':
            if (
              this.$store.getters['User/GetUser'].user_group['ability_delete_own_question'] &&
              this.item.user_id == this.$G_GetUserID()
            ) {
              if (this.$store.getters['User/GetUser'].user_group['ability_delete_question_only_no_answer']) {
                if (this.item.answer_count == 0) {
                  let time = this.$store.getters['User/GetUser'].user_group['time_before_delete_question']; 
                  if (time == 0) {
                    a = true
                  } else {
                    time = time * 60; 
                    const time1 = Math.floor(Date.now() / 1000) - this.item.create_time; 
                    if (time1 < time) { 
                      a = true
                    } else {
                      a = false
                    }
                  }
                } else {
                  a = false
                }
              } else {
                let time = this.$store.getters['User/GetUser'].user_group['time_before_delete_question']; 
                if (time == 0) {
                  a = true
                } else {
                  time = time * 60; 
                  const time1 = Math.floor(Date.now() / 1000) - this.item.create_time; 
                  if (time1 < time) { 
                    a = true
                  } else {
                    a = false
                  }
                }
              }
              if (this.$store.getters['User/GetUser'].user_group['ability_delete_question_only_no_comment']) {
                if (this.item.comment_count == 0) {
                  let time = this.$store.getters['User/GetUser'].user_group['time_before_delete_question']; 
                  if (time == 0) {
                    a = true
                  } else {
                    time = time * 60; 
                    const time1 = Math.floor(Date.now() / 1000) - this.item.create_time; 
                    if (time1 < time) { 
                      a = true
                    } else {
                      a = false
                    }
                  }
                } else {
                  a = false
                }
              } else {
                let time = this.$store.getters['User/GetUser'].user_group['time_before_delete_question']; 
                if (time == 0) {
                  a = true
                } else {
                  time = time * 60; 
                  const time1 = Math.floor(Date.now() / 1000) - this.item.create_time; 
                  if (time1 < time) { 
                    a = true
                  } else {
                    a = false
                  }
                }
              }
            } else {
              a = false
            }
            break
          case 'article':
            if (
              this.$store.getters['User/GetUser'].user_group['ability_delete_own_article'] &&
              this.item.user_id == this.$G_GetUserID()
            ) {
              if (this.$store.getters['User/GetUser'].user_group['ability_delete_article_only_no_comment']) {
                if (this.item.comment_count == 0) {
                  let time = this.$store.getters['User/GetUser'].user_group['time_before_delete_article']; 
                  if (time == 0) {
                    a = true
                  } else {
                    time = time * 60; 
                    const time1 = Math.floor(Date.now() / 1000) - this.item.create_time; 
                    if (time1 < time) { 
                      a = true
                    } else {
                      a = false
                    }
                  }
                } else {
                  a = false
                }
              } else {
                let time = this.$store.getters['User/GetUser'].user_group['time_before_delete_article']; 
                if (time == 0) {
                  a = true
                } else {
                  time = time * 60; 
                  const time1 = Math.floor(Date.now() / 1000) - this.item.create_time; 
                  if (time1 < time) { 
                    a = true
                  } else {
                    a = false
                  }
                }
              }
            } else {
              a = false
            }
            break
          case 'answer':
            if (
              this.$store.getters['User/GetUser'].user_group['ability_delete_own_answer'] &&
              this.item.user_id == this.$G_GetUserID()
            ) {
              if (this.$store.getters['User/GetUser'].user_group['ability_delete_answer_only_no_comment']) {
                if (this.item.comment_count == 0) {
                  let time = this.$store.getters['User/GetUser'].user_group['time_before_delete_answer']; 
                  if (time == 0) {
                    a = true
                  } else {
                    time = time * 60; 
                    const time1 = Math.floor(Date.now() / 1000) - this.item.create_time; 
                    if (time1 < time) { 
                      a = true
                    } else {
                      a = false
                    }
                  }
                } else {
                  a = false
                }
              } else {
                let time = this.$store.getters['User/GetUser'].user_group['time_before_delete_answer']; 
                if (time == 0) {
                  a = true
                } else {
                  time = time * 60; 
                  const time1 = Math.floor(Date.now() / 1000) - this.item.create_time; 
                  if (time1 < time) { 
                    a = true
                  } else {
                    a = false
                  }
                }
              }
            } else {
              a = false
            }
            break
          case 'comment':
            if (
              this.$store.getters['User/GetUser'].user_group['ability_delete_own_comment'] &&
              this.item.user_id == this.$G_GetUserID()
            ) {
              if (this.$store.getters['User/GetUser'].user_group['ability_delete_comment_only_no_reply']) {
                if (this.item.reply_count == 0) {
                  let time = this.$store.getters['User/GetUser'].user_group['time_before_delete_comment']; 
                  if (time == 0) {
                    a = true
                  } else {
                    time = time * 60; 
                    const time1 = Math.floor(Date.now() / 1000) - this.item.create_time; 
                    if (time1 < time) { 
                      a = true
                    } else {
                      a = false
                    }
                  }
                } else {
                  a = false
                }
              } else {
                let time = this.$store.getters['User/GetUser'].user_group['time_before_delete_comment']; 
                if (time == 0) {
                  a = true
                } else {
                  time = time * 60; 
                  const time1 = Math.floor(Date.now() / 1000) - this.item.create_time; 
                  if (time1 < time) { 
                    a = true
                  } else {
                    a = false
                  }
                }
              }
            } else {
              a = false
            }
            break
          case 'reply':
            if (
              this.$store.getters['User/GetUser'].user_group['ability_delete_own_reply'] &&
              this.item.user_id == this.$G_GetUserID()
            ) {
              if (this.$store.getters['User/GetUser'].user_group['ability_delete_reply_only_no_reply']) {
                if (this.item.reply_count == 0) {
                  let time = this.$store.getters['User/GetUser'].user_group['time_before_delete_reply']; 
                  if (time == 0) {
                    a = true
                  } else {
                    time = time * 60; 
                    const time1 = Math.floor(Date.now() / 1000) - this.item.create_time; 
                    if (time1 < time) { 
                      a = true
                    } else {
                      a = false
                    }
                  }
                } else {
                  a = false
                }
              } else {
                let time = this.$store.getters['User/GetUser'].user_group['time_before_delete_reply']; 
                if (time == 0) {
                  a = true
                } else {
                  time = time * 60; 
                  const time1 = Math.floor(Date.now() / 1000) - this.item.create_time; 
                  if (time1 < time) { 
                    a = true
                  } else {
                    a = false
                  }
                }
              }
            } else {
              a = false
            }
            break
        }
      } catch (e) {
      }
      return a
    },
    LookFollowersShowRule() {
      var a = false
      switch (this.type) {
        case 'topic':
          a = true
          break
        case 'question':
          a = true
          break
        case 'article':
          a = true
          break
      }
      return a
    },
    LookResetCoverShowRule() {
      return this.type == 'user' && this.item.user_id == this.$G_GetUserID()&&(this.$route.name=='user'||this.$route.name=='lang-user')
    },
    LookResetAvatarShowRule() {
      return this.type == 'user' && this.item.user_id == this.$G_GetUserID()&&(this.$route.name=='user'||this.$route.name=='lang-user')
    },
    LookReportDialogShowRule() {
      return this.item.user_id != this.$G_GetUserID()
    },
    LookButtonShowRule() {
      var a = false
      switch (this.type) {
        case 'topic':
          a = this.LookEditShowRule||this.LookDeleteShowRule||this.LookReportDialogShowRule||this.LookFollowersShowRule||this.LookCopyShowRule
          break
        case 'question':
          a = this.LookEditShowRule||this.LookDeleteShowRule||this.LookReportDialogShowRule||this.LookCopyShowRule
          break
        case 'article':
          a = this.LookEditShowRule||this.LookDeleteShowRule||this.LookReportDialogShowRule||this.LookCopyShowRule
          break
        case 'answer':
          a = this.LookEditShowRule||this.LookDeleteShowRule||this.LookReportDialogShowRule||this.LookCopyShowRule
          break
        case 'comment':
          a = this.LookEditShowRule||this.LookDeleteShowRule||this.LookReportDialogShowRule
          break
        case 'reply':
          a = this.LookEditShowRule||this.LookDeleteShowRule||this.LookReportDialogShowRule
          break
        case 'user':
          a = this.LookResetAvatarShowRule||this.LookResetCoverShowRule||this.LookReportDialogShowRule||this.LookCopyShowRule
          break
      }
      return a
    },
  },
}
</script>