<template>
  <div>
    <h1>Fetch data</h1>
    <button @click="fetch">Fetch</button>
    <button @click="filter">Filter Data</button>
    <h3 v-for="data in dataArrayObj" :key="data">{{ data }}</h3>
  </div>
</template>

<script>
import axios from "axios";
import { ref, reactive, onMounted, onBeforeUnmount } from "vue";
export default {
  setup() {
    onMounted(() => console.log("OnUpdated life cycle"));
    onBeforeUnmount(() => console.log("OnBeforeUpdated life cycle"));

    let arrayData = ref();
    let dataArrayObj = ref([]);

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
          const dataObject = reactive({
            Type: "Parent",
            Name: parent.data.title[0].data,
            ChildType: parent.data.child_type,
            Priority: parent.data.priority_icon,
            StatusId: parent.data.status_id,
            UniqueId: parent.data.unique_id,
            ParentId: parent.data.parent_id,
            hasChild: parent.hasChild,
          });
          dataArrayObj.value.push(dataObject);
          recursion(parent);
        }
      });
      console.log(JSON.parse(JSON.stringify(dataArrayObj.value)));
      console.log(dataArrayObj.value.length);
    };

    let recursion = (parent) => {
      if (parent.hasChild === true) {
        parent.children.map((child) => {
          if (child.data) {
            const dataObject = reactive({
              Type: "Child",
              Name: child.data.title[0].data,
              Child_type: child.data.child_type,
              Priority: child.data.priority_icon,
              StatusId: child.data.status_id,
              UniqueId: child.data.unique_id,
              ParentId: child.data.parent_id,
              hasChild: child.hasChild,
            });

            dataArrayObj.value.push(dataObject);
            recursion(child, dataObject);
          }
        });
      }
    };
    return {
      fetch,
      filter,
      arrayData,
      dataArrayObj,
    };
  },
};
</script>

<style scoped></style>
