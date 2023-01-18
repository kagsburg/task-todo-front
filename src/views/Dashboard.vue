

<template>
   <div> 

    <Teleport to="body">
     <!-- use the modal component, pass in the prop  -->
    <modal :show="showModal" @close="showModal = false">
      <template #header>
        <h3>custom header</h3>
      </template>
      <template #body>
       
        </template>
      <template #footer>
        <button class="btn btn-default" @click="showModal = false">
          Close
        </button>
        <button class="btn btn-primary" @click="showModal = false">
          OK
        </button>
      </template>
    </modal>
  </Teleport>

    <section class="navigation">
  <div class="nav-container">
    <div class="brand">
      <a href="#!">Kanban Board</a>
    </div>
    <nav>
  <div class="nav-mobile">
    <a id="nav-toggle" href="#!"><span></span></a>
  </div>
  <ul class="nav-list">
    <li><a href="#!">Sign Out </a></li>
    
  </ul>
</nav>
    </div>
</section>
<!-- section for the columns and cards -->
<!-- section for add column button -->
<section class="add-column">
  <div class="add-column__container">
    <button class="add-column__container__button" @click="openModal()">Add Column</button>
  </div>
</section>
<div class="boards-container">
    <div class="boards-container__board">
      <h1>Board One <span class="delete_icon">X</span> </h1> 
      
      <div class="boards-container__board__card">Card #1</div>
      <div class="boards-container__board__card">Card #2</div>
      <div class="boards-container__board__card">Card #3</div>
      <div class="boards-container__board__card">Card #4</div>
    </div>
    <div class="boards-container__board">
      <h1>Board Two</h1>
      
      <div class="boards-container__board__card">Card #1</div>
      <div class="boards-container__board__card">Card #3</div>
      <div class="boards-container__board__card">Card #4</div>
      <div class="boards-container__board__card__addcard">
        <span>+</span> Add New Card
      </div>
    </div>
    <div class="boards-container__board">
      <h1>Board Three</h1>
      
      <div class="boards-container__board__card">Card #1</div>

    </div>
     <div class="boards-container__board">
      <h1>Board Four</h1>
      
      <div class="boards-container__board__card">Card #1</div>
      <div class="boards-container__board__card">Card #2</div>
      <div class="boards-container__board__card">Card #3</div>
    </div>
  </div>
</div>
</template>

<script>
import Modal from '../components/Modal.vue';
import { ref } from 'vue';

 
 export default {
    name: "Dashboard",
    data() {
        return {
        // ...
        showModal: false,
        };
    },
    methods: {
      openModal () {
        this.showModal = true;
      },
      addColumn: function() {
        this.$modal.show({
          template: `
            <form>
              <input type="text" placeholder="Column Name">
              <input type="submit" value="Add Column">
            </form>
          `
        })
        this.showModal = true;
     

      },

    // ...
    },
    mounted() {
        // ...
    },
    components: { Modal },
}


</script>

<style lang="scss">
$content-width: 1000px;
$breakpoint: 799px;
$nav-height: 70px;
$nav-background: #fff;
$nav-font-color: #0c0c0c;
$link-hover-color: #FF5722;
@mixin btn($fontcolor: #FAFAFA){
  font-family: 'Roboto', sans-serif;
  font-size: 15px;
  outline: 0;
  border: 0;
  width: 100%;
  padding: 15px;
  border-radius: 10px;
  background: #FF5722;
  cursor: pointer;
  color: $fontcolor;
  text-transform: uppercase;
}

@import url('https://fonts.googleapis.com/css?family=Poppins&display=swap');

body{
  font-family: 'Poppins'
}

.navigation {
  height: $nav-height;
  background: $nav-background;
  width: 100%;
  padding: 8px 0 6px;
}

.nav-container {
  margin: 0 auto;
}

.brand {
  position: absolute;
  padding-left: 20px;
  float: left;
  line-height: $nav-height;
  text-transform: uppercase;
  font-size: 1.4em;
  
  &:hover{
    
  }

  a,
  a:visited {
    color: $nav-font-color;
    text-decoration: none;
  }
}

nav {
  float: right;
  ul {
      list-style: none;
      margin: 0;
      padding: 0;
    li {
      float: left;
      position: relative;
      a {
        display: block;
        padding: 10px 20px 0 20px;
        line-height: 50px;
        background: $nav-background;
        color: $nav-font-color;
        text-decoration: none;
        
        
         &::before {
           transition: 300ms;
           height: 5px;
           content: "";
           position: absolute;
           background-color: $link-hover-color;
           width: 0%;
           bottom: 0px;
        }

        &:hover::before{
          width: 70%;
        }
        &:not(:only-child):after {
          padding-left: 4px;
          content: ' ▾';
        }
      } // Dropdown list
      ul li {
        min-width: 190px;
        a {
          padding: 15px;
          line-height: 20px;
        }
      }
    }
  }
}


.nav-dropdown {
  display: none;
  position: absolute;
  z-index: 1;
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.15);
}

.nav-mobile {
  display: none;
  position: absolute;
  top: 0;
  right: 0;
  background: $nav-background;
  height: $nav-height;
  width: $nav-height;
}

@media only screen and (max-width: $breakpoint) {
  .nav-mobile {
    display: block;
  }
  nav {
      width: 100%;
      padding: $nav-height 0 15px;
    ul {
      display: none;
      
      li{
        float: none;
        
        a {
          padding: 15px;
          line-height: 20px;
          
          &:hover::before{
            width: 20%;
          }
        }
        ul li a {
          padding-left: 30px;
        }
      }
    }
  }
  .nav-dropdown {
    position: static;
  }
}

#nav-toggle {
  position: absolute;
  left: 18px;
  top: 22px;
  cursor: pointer;
  padding: 10px 35px 16px 0px;
  span,
  span:before,
  span:after {
    cursor: pointer;
    border-radius: 1px;
    height: 5px;
    width: 35px;
    background: $link-hover-color;
    position: absolute;
    display: block;
    content: '';
    transition: all 300ms ease-in-out;
  }
  span:before {
    top: -10px;
  }
  span:after {
    bottom: -10px;
  }
  &.active span {
    background-color: transparent;
    &:before,
    &:after {
      top: 0;
    }
    &:before {
      transform: rotate(45deg);
    }
    &:after {
      transform: rotate(-45deg);
    }
  }
}

@media screen and (min-width: $breakpoint) {
  .nav-list {
    display: block !important;
  }
}


.boards-container {
  display: grid;
  grid-auto-columns: 272px;
  grid-auto-flow: column;
  grid-gap: 8px;
  height: 50vh;
  margin: 50px 10px 30px 20px;;
  border-radius: 10px;
  overflow: auto;
}

.boards-container__board {
    background: #EBECF0;
    border-radius: 20px;
    display: grid;
    grid-auto-rows: max-content;
    grid-gap: 10px;
    padding: 10px;
    h1{
      font-size: 16px;
      margin: 0 0 12px 0;
      text-align: center;
      .delete_icon{
        margin: 0 15px 0 0;
        float: right;
        cursor: pointer;
        :hover{
          color: red;
        }
      }
    }
}

.boards-container__board__card__addcard{
  display: inline-block;
  grid-auto-rows: max-content;
  grid-gap: 10px;
  padding: 10px;
  width: 200px;
  background: #FFF;
  box-shadow: 0 1px 0 rgba(9,30,66,.25);
  border-radius: 3px;
  cursor: pointer;
  padding: 10px;
  span {
    font-size: 16px;
  }

}
.boards-container__board__card {
    background: #FFF;
    box-shadow: 0 1px 0 rgba(9,30,66,.25);
    border-radius: 3px;
    cursor: pointer;
    padding: 10px;
}

.add-column{
  display: grid;
  grid-auto-rows: max-content;
  grid-gap: 10px;
  padding: 10px;
  width: 200px;

  .add-column__button{
    background: #FFF;
    box-shadow: 0 1px 0 rgba(9,30,66,.25);
    border-radius: 3px;
    padding: 10px;
    text-align: center;
  }
  .add-column__container__button{
    @include btn;
  }

}

</style>