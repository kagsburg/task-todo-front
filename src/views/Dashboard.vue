

<template>
   <div> 

    <!-- <Teleport to="body"> -->
     <!-- use the modal component, pass in the prop  -->
    <modal :show="showModal" @close="showModal = false">
      <template #header>
        <h3></h3>
      </template>
      <template #body>
        <div v-if="column" ><form action="#" @submit.prevent="addColumn(formColumn)">
        <div class="form-group">
          <label for="title">Title</label>
          <input type="text"
          v-model="formColumn.title"
           class="form-control" id="title" placeholder="Enter title">
        </div>
      
        <div class="d-f mt-2">
        <button type="submit" class="btn btn-primary">
          Add Column
        </button>
        </div>
    </form>
  </div>
   <div v-if="card" ><form action="#" @submit.prevent="addCard(formCard)">
        <div class="form-group">
          <label for="title">Title</label>
          <input type="text"
          v-model="formCard.title"
           class="form-control" id="title" placeholder="Enter title">
        </div>
        <div class="form-group">
          <label for="title">Description</label>
          <input type="text"
          v-model="formCard.description"
           class="form-control" id="title" placeholder="Enter title">
        </div>
      
        <div class="d-f mt-2">
        <button 
        type="submit" class="btn btn-primary">

         {{ addcards ? 'Add Card' : 'Edit Card' }}
        </button>
        <button v-if="addcards== false" type="button" class="btn btn-danger" @click="deleteCard(formCard.id)">Delete</button>
        </div>
    </form></div>     
    
      </template>
      <template #footer>
        <button class="btn btn-default" 
        v-if="column"
        @click="showModal = false">close</button>
        <button class="btn btn-default" 
        v-if="card"
        @click="closeCardModal()">close</button>
        
          
      </template>
    </modal>
  <!-- </Teleport> -->

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
    <li><a href="#!" @click="signOut()">Sign Out </a></li>
    
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
<!-- section showing success messages -->
  <div class="success" v-if="success.status" >
    <div class="success__container">
      <p>{{ success.message }}</p>
    </div>
  </div>
<div class="boards-container">

    <div 
      v-for="column in columns" 
      :key="column.id" 
    class="boards-container__board">
      <h1>{{column.title }}<span class="delete_icon" @click="deleteColumn(column.id)" >X</span> </h1> 
      
      <div 
        v-for="card in column.cards" 
        :key="card.id" 
        @click="showCard(card.id)"
        class="boards-container__board__card">
        {{card.title}} 
      </div>
      <div v-if ="column.cards.length === 0" class="boards-container__board__card"> <h1>No Available Cards</h1></div>
      <div @click="openCardModal(column.id)" class="boards-container__board__card__addcard">
        <span>+</span> Add New Card
      </div>
     
    </div>
    <!-- if columns is empty -->
    <div v-if="columns.length === 0" class="boards-container__board">
      <div class="boards-container__board__card"> <h1>No Available Columns</h1></div>
     
    </div>
  </div>
</div>

</template>

<script>
import Modal from '../components/Modal.vue';
import axios from "axios";
import store from '../store/store'
import { ref } from 'vue';
axios.defaults.baseURL = import.meta.env.VITE_API_URL;
// add token to axios headers
axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem('token')}`;

 
 export default {
    name: "Dashboard",
    data() {
        return {
        // ...
        success: {
          status: false,
          message: "",
        },
        showModal: false,
        showCardModal: false,
        column:null,
        card:null,
        addcards: false,
        columns: [],
        cards: [],
        formCard: {
          id: "",
          title: "",
          description: "",
          column_id: "",
        },
        formColumn: {
          title: "",
        },
        };
    },
    methods: {
      openCardModal (id) {
        this.showModal = true;
        this.column= false;
        this.card= true;
        this.addcards = true;
        this.formCard.column_id = id;
        this.formCard.id = "";
        this.formCard.title = "";
        this.formCard.description = "";
      },
      showSuccess(message) {
        this.success.status = true;
        this.success.message = message;
        setTimeout(() => {
          this.success.status = false;
          this.success.message = "";
        }, 3000);
      },
      closeCardModal () {
        this.showModal = false;
        this.column= false;
        this.card= false;
        this.addcards = false;
      },
      openModal () {
        this.showModal = true;
        this.column= true;
        this.card= false;
      },
      //get all columns
      async getColumns() {
        try {
          const response = await axios.get("/columns");
          if (response.data.status === "success"){
            if (response.data.data.length > 0) {
              this.columns = response.data.data;
            }
          }
        } catch (error) {
          console.log(error);
        }
      },
      //delete column
      async deleteColumn(id) {
        try {
          const response = await axios.delete(`/columns/${id}`);
          console.log(response.data);
          if (response.data.status === "success"){
            this.getColumns();
           this.showSuccess(response.data.message);
          }
        } catch (error) {
          console.log(error);
        }
      },
      //add column
      async addColumn(formColumn) {
        try {
          console.log(formColumn);
          const response = await axios.post("/columns", formColumn);
          console.log(response.data);
          if (response.data.status === "success"){
            this.showModal = false;
            this.getColumns();
            this.showSuccess(response.data.message);
          }
        } catch (error) {
          console.log(error);
        }
      },
      //add card
      async addCard(formCard) {
        try {
          if (formCard.id !== "") {
            const response = await axios.put(`/cards/${formCard.id}`, formCard);
            if (response.data.status === "success"){
              this.showModal = false;
              // reset form
              this.formCard = {
                id: "",
                title: "",
                description: "",
                column_id: "",
              };
              this.showSuccess(response.data.message);
              this.getColumns();
            }
            return;
          }
          const response = await axios.post(`/cards/${formCard.column_id}`, formCard);
          if (response.data.status === "success"){
            this.showModal = false;
            this.showSuccess(response.data.message);
            this.getColumns();
          }
        } catch (error) {
          console.log(error);
        }
      },
      //edit card
      async showCard(formCard) {
        try {
          const response = await axios.get(`/cards/${formCard}`);
          console.log(response.data);
          if (response.data.status === "success"){
            this.showModal = true;
            this.card= true;
            this.column= false;
            this.addcards = false;
            this.formCard = response.data.data;
          }
        } catch (error) {
          console.log(error);
        }
      },
      //delete card
      async deleteCard(id) {
        try {
          const response = await axios.delete(`/cards/${id}`);
          if (response.data.status === "success"){
            this.closeCardModal();
            this.showSuccess(response.data.message);
            this.getColumns();
          }
        } catch (error) {
          console.log(error);
        }
      },
      //sign out
      async signOut() {
        try {
          const response = await axios.post("logout");
          if (response.data.status === "success"){
            localStorage.removeItem("token");
            this.$store.commit("setUser", null);
            this.$store.commit("setToken", null);
            this.$router.push("Login");
          }
        } catch (error) {
          console.log(error);
        }
      },

    // ...
    },
    mounted() {
      this.getColumns();
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

.d-f{
  display: flex;
  justify-content: space-between;
}
.mt-2{
  margin-top: 2rem;
}
.btn {
    --bs-btn-padding-x: 0.75rem;
    --bs-btn-padding-y: 0.375rem;
    --bs-btn-font-family: ;
    --bs-btn-font-size: 1rem;
    --bs-btn-font-weight: 400;
    --bs-btn-line-height: 1.5;
    --bs-btn-color: #212529;
    --bs-btn-bg: transparent;
    --bs-btn-border-width: var(--bs-border-width);
    --bs-btn-border-color: transparent;
    --bs-btn-border-radius: 0.375rem;
    --bs-btn-hover-border-color: transparent;
    --bs-btn-box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.15),0 1px 1px rgba(0, 0, 0, 0.075);
    --bs-btn-disabled-opacity: 0.65;
    --bs-btn-focus-box-shadow: 0 0 0 0.25rem rgba(var(--bs-btn-focus-shadow-rgb), .5);
    display: inline-block;
    padding: var(--bs-btn-padding-y) var(--bs-btn-padding-x);
    font-family: var(--bs-btn-font-family);
    font-size: var(--bs-btn-font-size);
    font-weight: var(--bs-btn-font-weight);
    line-height: var(--bs-btn-line-height);
    color: var(--bs-btn-color);
    text-align: center;
    text-decoration: none;
    vertical-align: middle;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
    border: var(--bs-btn-border-width) solid var(--bs-btn-border-color);
    border-radius: var(--bs-btn-border-radius);
    background-color: #FF5722;
    transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
}
.form-control {
    display: block;
    width: 100%;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: var(--bs-body-color);
    background-color:#f8f9fa ;
    background-clip: padding-box;
    border: var(--bs-border-width) solid var(--bs-border-color);
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border-radius: 0.375rem;
    transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
}
.success{
   
    position: relative;
    padding: 0.5rem 0.5rem;
    margin-bottom:1rem;
    color:#146c43 ;
    background-color: #d1e7dd;
    border: 1px solid #a3cfbb;
    border-radius: 0.375rem;
    text-align: center;
}
.success__container{
  display: flex;
  justify-content: center;
  align-items: center;
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
  // .nav-list {
  //   display: block !important;
  // }
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
        &:hover{
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
    span {
      font-size: 16px;
    }
    .delete_icon{
      margin: 0 15px 0 0;
      float: right;
      cursor: pointer;
      :hover{
        color: red;
      }
    }
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