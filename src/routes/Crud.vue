<template>
  <div style="margin:30px 0px;">
    <h1 style="text-align:center">SongTool</h1>
    <crud
      :prefix="prefix"
      :path="path"
      :page-title="pageTitle"
      :fields-info="fieldsInfo"
      :details-title="detailsTitle"
      :create-mode="createMode"
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
      createMode: true,
      editButton: true,
    }
  },
  created () {
    this.detailsTitle = 'Lied'
  },
  computed: {
    fieldsInfo () {
      return [
        {
          type: 'input',
          column: 'songnumber',
          text: 'Nr.',
          name: 'songnumber',
        },
        {
          type: 'input',
          column: 'title',
          text: 'Titel',
          name: 'title',
        },
        {
          type: 'multiselect',
          list: {
            value: 'difficulty',
            text: 'label',
            data: [
              { name: '1', label: '1' },
              { name: '2', label: '2' },
              { name: '3', label: '3' },
              { name: '4', label: '4' },
              { name: '5', label: '5' },
            ],
          },
          column: 'difficulty',
          text: 'Anspruchsgrad',
          name: 'difficulty',
        },
        {
          type: 'multiselect',
          list: {
            value: 'included_in',
            text: 'label',
            data: [
              { name: 'Blasmusikheft', label: 'Blasmusikheft' },
              { name: 'Katholisches Gesangsbuch', label: 'Katholisches Gesangsbuch' },
              { name: 'Christkatholisches Gesangsbuch', label: 'Christkatholisches Gesangsbuch' },
            ],
          },
          required: false,
          column: 'included_in',
          text: 'Enthalten in',
          name: 'included_in',
        },
        {
          type: 'multiselect',
          list: {
            value: 'liedform',
            text: 'label',
            data: [
              { name: 'Biblischer Gesang', label: 'Biblischer Gesang' },
              { name: 'Dialekt', label: 'Dialekt' },
              { name: 'Kanon', label: 'Kanon' },
              { name: 'Leitvers', label: 'Leitvers' },
              { name: 'Liedruf', label: 'Liedruf' },
              { name: 'Genfer Psalter', label: 'Genfer Psalter' },
              { name: 'Taizé', label: 'Taizé' },
            ],
          },
          required: false,
          column: 'liedform',
          text: 'Liedform',
          name: 'liedform',
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
          text: 'Kasualien',
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
          text: 'Liturgie',
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
          text: 'Kirchenjahr',
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
          text: 'Tageskreis',
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
          text: 'Lebenskreis',
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
          text: 'GD in der Welt',
          name: 'gd_in_der_welt',
        },
        {
          type: 'textarea',
          required: false,
          column: 'liedtext',
          text: 'Liedtext',
          name: 'liedtext',
          table: false,
        },
      ]
    },
  },
  components: {
    Crud,
    AlertBox,
  },
}
</script>
