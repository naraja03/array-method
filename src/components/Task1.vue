<template>
  <div>
    <h1>Fetch data</h1>
    <button @click="fetch">Fetch</button>
    <button @click="filter">Filter Data</button>
    <h1>no of id in array - {{ testArray.length }}</h1>
    <h3 v-for="data in testArrayObj" :key="data">{{ data }},</h3>
    <!-- <h3> {{testArrayObj}}</h3> -->
    <!-- <Render /> -->
  </div>
</template>

<script>
// import Render from "./Render.vue"
import axios from "axios";
import { ref, reactive } from "vue";
export default {
  setup() {
    let arrayData = ref();
    let testArray = ref([]);
    let testArrayObj = ref([]);

    let fetch = () => {
      console.log("success");
      axios
        .get("/treejson.txt")
        .then((res) => {
          console.log(res.data);
          arrayData.value = res.data;
        })
        .catch((err) => console.log("error", err));
    };

    let filter = () => {
      arrayData.value.map((parent) => {
        if (parent.data) {
          const testObject = reactive({
            id:parent.id
          }) 
          testArrayObj.value.push(testObject);
          recursion(parent);
        }
      });
          console.log(testArrayObj.value,"test Array Object");

    };
    let recursion = (childData) => {
      if (childData.hasChild == true) {
        childData.children.map((grandChild) => {
          if (grandChild.data) {
            const testObject = reactive({
              id:grandChild.id
            }); 
            testArrayObj.value.push(testObject)
            recursion(grandChild);
          }
        });
      }
    };

    return {
      fetch,
      filter,
      arrayData,
      testArray,
      recursion,
      testArrayObj,
    };
  },
};
</script>

<style scoped></style>
