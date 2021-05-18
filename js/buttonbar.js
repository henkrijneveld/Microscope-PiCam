// SPDX-FileCopyrightText: 2021- Henk Rijneveld <henk@henkrijneveld.nl>
// SPDX-License-Identifier: MIT

Vue.component("button-bar", {
  data: function() {
    return {
    }
  },
  props: {
    buttons: {
      type: Array,
      required: true
    },
    selected: {
      type: String,
      required: true
    }
  },
  computed: {

  },
  methods: {

  },
  template: `
<div class="buttonbar">
  <span class="buttonbar-title"><slot></slot></span><br> 
  <input    style="margin-right: 5px;" 
            type="button" 
            v-for="btn in buttons"
            v-bind:key="btn"
            v-bind:value="btn ? btn : 'None'"
            v-bind:style="btn === selected ? 'color: red; font-weight:bold; outline-color: red;' : 'color: inherit;'"
            v-on:click="$emit('update:selected', btn)"/>
</div>
`
})
