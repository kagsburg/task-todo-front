<template>
    <modal name="example" v-show="modalActive">

     <slot></slot>
    </modal>
  </template>
<script>

export default {
  name: 'Example',
 props:['modalActive']
}
</script>





