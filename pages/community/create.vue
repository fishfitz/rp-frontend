<template>
  <div class="section">
    <h1 class="title is-4"> Créez votre communauté </h1>

    <section>
      <b-steps size="is-small" vertical :has-navigation="false" ref="steps" @change="saveCommunity">

        <b-step-item label="Plateforme" icon="forum">
          <div class="section">
            <h2 class="title is-5 has-text-primary"> Quelle plateforme tu utilises ? </h2>
            <b-field>
              <b-radio-button v-for="(type, key) in types" :key="type.name" v-model="community.type" :native-value="key" size="is-medium">
                <b-icon :icon="type.icon"/> {{ type.name }}
              </b-radio-button>
            </b-field>
            <br/>
            <template v-if="community.type">
              <h2 class="title is-5 has-text-primary"> {{ types[community.type].message }} </h2>
              <b-input v-model="community.url" :icon="types[community.type].icon" @keyup.native.enter="community.url && next()"
                :placeholder="types[community.type].placeholder" style="max-width: 500px" />
              <br/>
              <b-button v-if="community.url" type="is-primary" icon-left="check-bold" @click="next"> Suivant </b-button>
            </template>
          </div>
        </b-step-item>

        <b-step-item label="Nom" icon="duck">
          <div class="section">
            <h2 class="title is-5 has-text-primary"> Comment s'appelle ta communauté ? </h2>
            <b-field>
              <b-input maxlength="40" v-model="community.name" placeholder="Les canards & moi 🦆" size="is-medium"
                @keyup.native.enter="community.name && next()"/>
            </b-field>
            <br/>
            <b-button v-if="community.name" type="is-primary" icon-left="check-bold" @click="next"> Suivant </b-button>
          </div>
        </b-step-item>

        <b-step-item label="Description" icon="script-text">
          <div class="section">
            <h2 class="title is-5 has-text-primary"> Décris-nous ta communauté en quelques lignes. </h2>
            <b-field>
              <b-input maxlength="280" type="textarea" v-model="community.description_short" :placeholder="duck_poetry"
                @keyup.native.enter="community.name && next()"/>
            </b-field>
            <!-- todo: ajouter un moyen de choisir des tags dans une courte liste -->
            <br/>
            <b-button v-if="community.description_short" type="is-primary" icon-left="check-bold" @click="next"> Suivant </b-button>
          </div>
        </b-step-item>

        <b-step-item label="Ouverture" icon="calendar">
          <div class="section">
            <h2 class="title is-5 has-text-primary"> Depuis quand ta communauté existe ? </h2>
            <date-picker v-model="community.opened_at" inline :disabled="community.status === 'WIP'"/>
            <br/>
            <b-checkbox size="is-medium" v-model="status"> C'est encore en travaux ! 🚧 </b-checkbox>
            <br/><br/>
            <b-button type="is-primary" icon-left="check-bold" @click="next"> Suivant </b-button>
          </div>
        </b-step-item>

        <b-step-item label="Bannière" icon="image-filter-hdr">
          <div class="section">
            <h2 class="title is-5 has-text-primary"> On a besoin d'une image. </h2>
            <p>
              Ici on t'affiche en grand. <big> 🖼️ </big>
              <br/> Du coup, le format idéal c'est <b>320x160</b>.
              <br/> Mais ta bannière en 100x35 devrait être OK.
            </p>
            <br/>
            <image-picker v-model="community.image_small" ref="image_small" :resize="{ maxHeight: 160, maxWidth: 320 }"/>
            <br/>
            <b-button v-if="community.image_small" type="is-primary" icon-left="check-bold" @click="uploadAndNext" :loading="uploading"> Suivant </b-button>
          </div>
        </b-step-item>

        <b-step-item label="Fin" icon="party-popper">
          <div class="section">
            <template v-if="$store.state.user">
              <b-button type="is-primary" size="is-medium" @click="create" :loading="uploading">
                Créer la communauté
              </b-button>
            </template>
            <template v-else>
              <h2 class="title is-5 has-text-primary"> On a l'essentiel ! </h2>
              <p> Si tu en as envie, tu pourras ajouter un peu plus de détails plus tard. </p>
              <p> Pour sécuriser l'accès à ta communauté, on doit la lier à ton compte Discord. </p>
              <br/>
              <discord-login text="Lier mon compte"/>
            </template>

          </div>
        </b-step-item>

      </b-steps>
    </section>

  </div>
</template>

<script>
import DiscordLogin from '../../components/users/discord-login.vue';
import DatePicker from '../../components/input/date-picker.vue';
import ImagePicker from '../../components/input/image-picker.vue';

export default {
  components: { DiscordLogin, DatePicker, ImagePicker },
  data() {
    return {
      uploading: false,
      duck_poetry: 'Barboteurs et frétillards,\nHeureux de troubler l’eau claire,\nIls vont, les petits 🦆.',
      types: {
        FORUM: {
          name: 'Forum',
          message: 'Extra ! Colle la page d\'accueil là-dessous.',
          icon: 'forum',
          placeholder: 'http://coincoin-paradise.forumactif.fr/'
        },
        DISCORD: {
          name: 'Discord',
          message: 'Top ! Colle là-dessous une invitation (qui n\'expire pas !).',
          icon: 'discord',
          placeholder: 'https://discord.gg/coincoin'
        },
        FACEBOOK: {
          name: 'Facebook',
          message: 'Cool ! Colle ta page là-dessous.',
          icon: 'facebook',
          placeholder: 'https://www.facebook.com/canardcorp'
        },
        OTHER: {
          name: 'Autre',
          message: 'Super ! Colle ta page là-dessous.',
          icon: 'shape-plus',
          placeholder: 'https://www.canard-rp.net/'
        }
      },
      community: {
        type: null,
        name: '',
        url: '',
        description_short: '',
        opened_at: new Date(),
        status: 'ACTIVE',
        image_small: ''
      }
    };
  },
  computed: {
    status: {
      get() {
        return this.community.status === 'WIP';
      },
      set(v) {
        this.community.status = v ? 'WIP' : 'ACTIVE';
        if (this.community.status === 'WIP') this.community.opened_at = null;
      }
    }
  },
  methods: {
    next() {
      this.community.ready = false;
      this.$refs.steps.next();
    },
    async uploadAndNext() {
      this.community.ready = true;
      this.uploading = true;
      await this.$refs.image_small.upload();
      this.uploading = false;
      this.$refs.steps.next();
    },
    saveCommunity() {
      this.$store.commit('SET_SAVED_COMMUNITY', this.community);
    },
    async create() {
      this.uploading = true;
      await this.$store.dispatch('CREATE_COMMUNITY', this.community);
      this.uploading = false;
      this.$router.push('/');
    }
  },
  watch: {
    'community.type': function () {
      this.community.url = '';
    }
  }
};
</script>

<style lang="scss" scoped>
  .section {
    min-height: 650px;
  }
</style>
