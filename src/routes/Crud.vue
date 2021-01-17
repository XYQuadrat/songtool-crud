<template>
  <div style="margin:30px 0px;">
    <h1 style="text-align:center">SongTool</h1>
    <crud
      :prefix="prefix"
      :path="path"
      :page-title="pageTitle"
      :fields-info="fieldsInfo"
      :details-title="detailsTitle"
      :refresh-button="refreshButton"
      :field-filters="fieldFilters"
      :main-filter="mainFilter"
      :create-mode="createMode"
      :edit-mode="editMode"
      :edit-button="editButton"
    ></crud>
    <alert-box></alert-box>
  </div>
</template>

<script>
import Crud from '@/utils/crud/components/Crud.vue'
import AlertBox from '@/utils/crud/components/AlertBox.vue'

export default {
  data () {
    return {
      prefix: 'crud',
      path: 'songs',
      pageTitle: 'crud.songs',
      detailsTitle: '',
      refreshButton: true,
      exportButton: true,
      fieldFilters: true,
      mainFilter: true,
      createMode: true,
      editMode: true,
      editButton: true,
    }
  },
  created () {
    this.detailsTitle = this.$t('detailsTitle')
  },
  computed: {
    fieldsInfo () {
      return [
        {
          type: 'input',
          column: 'songnumber',
          text: this.$t('fields.songnumber'),
          name: 'songnumber',
        },
        {
          type: 'input',
          column: 'title',
          text: this.$t('fields.title'),
          name: 'title',
        },
        {
          type: 'number',
          column: 'difficulty',
          text: this.$t('fields.difficulty'),
          name: 'difficulty',
        },
        {
          type: 'multiselect',
          list: {
            value: 'included_in',
            text: 'label',
            data: [
              { name: 'BMH', label: 'BMH' },
              { name: 'KG/CG', label: 'KG/CG' },
              { name: 'bibl.', label: 'bibl.' },
              { name: 'Dialekt', label: 'Dialekt' },
              { name: 'Kanon', label: 'Kanon' },
              { name: 'Leitvers', label: 'Leitvers' },
              { name: 'Liedruf', label: 'Liedruf' },
              { name: 'Taizé', label: 'Taizé' },
            ],
          },
          required: false,
          column: 'included_in',
          text: this.$t('fields.included_in'),
          name: 'included_in',
        },
        {
          type: 'multiselect',
          list: {
            value: 'kasualien',
            text: 'label',
            data: [
              { name: 'Taufe', label: 'Taufe' },
              { name: 'Trauung', label: 'Trauung' },
              { name: 'Trauerfeier', label: 'Trauerfeier' },
            ],
          },
          required: false,
          stringId: true,
          column: 'kasualien',
          text: this.$t('fields.kasualien'),
          name: 'kasualien',
        },
        {
          type: 'multiselect',
          list: {
            value: 'liturgie',
            text: 'label',
            data: [
              { name: 'Eröffnung', label: 'Eröffnung' },
              { name: 'Anrufung', label: 'Anrufung' },
              { name: 'Anbetung', label: 'Anbetung' },
              { name: 'Verkündigung', label: 'Verkündigung' },
              { name: 'Glaubensbekenntnis', label: 'Glaubensbekenntnis' },
              { name: 'Bitte/Fürbitte', label: 'Bitte/Fürbitte' },
              { name: 'Abendmahl', label: 'Abendmahl' },
              { name: 'Sendung/Segen', label: 'Sendung/Segen' },
            ],
          },
          required: false,
          column: 'liturgie',
          text: this.$t('fields.liturgie'),
          name: 'liturgie',
        },
        {
          type: 'multiselect',
          list: {
            value: 'kirchenjahr',
            text: 'label',
            data: [
              { name: 'Advent', label: 'Advent' },
              { name: 'Weihnachten', label: 'Weihnachten' },
              { name: 'Jahreswechsel', label: 'Jahreswechsel' },
              { name: 'Passion', label: 'Passion' },
              { name: 'Ostern', label: 'Ostern' },
              { name: 'Himmelfahrt', label: 'Himmelfahrt' },
              { name: 'Pfingsten', label: 'Pfingsten' },
              { name: 'Dank-, Buss- und Bettag', label: 'Dank-, Buss- und Bettag' },
              { name: 'Schöpfung', label: 'Schöpfung' },
            ],
          },
          required: false,
          column: 'kirchenjahr',
          text: this.$t('fields.kirchenjahr'),
          name: 'kirchenjahr',
        },
        {
          type: 'multiselect',
          list: {
            value: 'tageskreis',
            text: 'label',
            data: [
              { name: 'Morgen', label: 'Morgen' },
              { name: 'Mittag', label: 'Mittag' },
              { name: 'Abend und Nacht', label: 'Abend/Nacht' },
              { name: 'Bei Tisch', label: 'Bei Tisch' },
            ],
          },
          required: false,
          column: 'tageskreis',
          text: this.$t('fields.tageskreis'),
          name: 'tageskreis',
        },
        {
          type: 'multiselect',
          list: {
            value: 'lebenskreis',
            text: 'label',
            data: [
              { name: 'Glaube', label: 'Glaube' },
              { name: 'Vertrauen', label: 'Vertrauen' },
              { name: 'Klage', label: 'Klage' },
              { name: 'Lob und Dank', label: 'Lob und Dank' },
              { name: 'Geburtstag', label: 'Geburtstag' },
              { name: 'Allein sein', label: 'Allein sein' },
              { name: 'Älter werden', label: 'Älter werden' },
              { name: 'Im Angesicht des Todes', label: 'Im Angesicht des Todes' },
            ],
          },
          required: false,
          column: 'lebenskreis',
          text: this.$t('fields.lebenskreis'),
          name: 'lebenskreis',
        },
        {
          type: 'multiselect',
          list: {
            value: 'gd_in_der_welt',
            text: 'label',
            data: [
              { name: 'weltw. Gemeinschaft', label: 'weltw. Gemeinschaft' },
              { name: 'Leben/Handeln aus Glauben', label: 'Leben/Handeln aus Glauben' },
              { name: 'Reich Gottes', label: 'Reich Gottes' },
            ],
          },
          required: false,
          column: 'gd_in_der_welt',
          text: this.$t('fields.gd_in_der_welt'),
          name: 'gd_in_der_welt',
        },
        {
          type: 'textarea',
          required: false,
          column: 'liedtext',
          text: this.$t('fields.liedtext'),
          name: 'liedtext',
        },
      ]
    },
  },
  components: {
    Crud,
    AlertBox,
  },
  i18n: {
    messages: {
      en: {
        detailsTitle: 'Lied',
        fields: {
          songnumber: 'Nr.',
          title: 'Liedtitel',
          difficulty: 'Level',
          kasualien: 'Kasualien',
          kirchenjahr: 'Kirchenjahr',
          included_in: 'Enthalten in / Liedform',
          liturgie: 'Liturgie',
          tageskreis: 'Tageskreis',
          lebenskreis: 'Lebenskreis',
          liedtext: 'Liedtext',
          gd_in_der_welt: 'GD in der Welt',
        },
      },
    },
  },
}
</script>
