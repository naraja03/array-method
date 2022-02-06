<template>
  <div>
    <h1>Fetch data</h1>
    <button @click="fetch">Fetch</button>
    <button @click="filter">Filter Data</button>
    <button @click="arrayPush">Filter object Data</button>
    <p>{{ testArray }}</p>
    <hr>
    <h3>{{newArray}}</h3>
  </div>
</template>

<script>
import axios from "axios";
import { reactive, ref } from "vue";
export default {
  setup() {
    let arrayData = ref({
      
    });

    let newArray = reactive();

    let testArray = ref([]);

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
      arrayData.value.forEach((parent) => {
        if (parent.data) {
          testArray.value.push(parent.id);
          recursion(parent);
        }
      });
      console.log("Id count", testArray.value.length);
      console.log("Filter Data", testArray.value);
    };

    let recursion = (childData) => {
      if (childData.hasChild == true) {
        childData.children.forEach((grandChild) => {
          if (grandChild.data) {
            testArray.value.push(grandChild.id);
            recursion(grandChild);
          }
        });
      }
    };

    let arrayPush = () => {
      for (let values in testArray.value) {
        newArray.push({
          id: values,
        });
      }
    };

    return {
      fetch,
      filter,
      arrayPush,
      arrayData,
      newArray,
      testArray,
      recursion,
    };
  },
};
</script>

<style scoped></style>
