<script>
import Vue from 'vue';
import { BadgerAccordion, BadgerAccordionItem } from '@/entry';

export default Vue.extend({
  name: 'app',
  components: {
    BadgerAccordion, BadgerAccordionItem
  }
});
</script>

<template>
  <div id="app">
    <badger-accordion>
    <badger-accordion-item>
        <template slot="header">First Accordion Header</template>    
        <template slot="content">First Accordion Content</template>  
    </badger-accordion-item>
 
    <badger-accordion-item>
        <template slot="header">Second Accordion Header</template>    
        <template slot="content">Second Accordion Content</template>  
    </badger-accordion-item>
</badger-accordion>
  </div>
</template>
