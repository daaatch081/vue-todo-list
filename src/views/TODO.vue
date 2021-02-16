<template lang="pug">
.todo-list-page
  .title TODO List
  .list-area
    el-button.signout(@click="signOut") SignOut
    el-col.todo-card(:span="8")
      el-card.box-card
        .card-header(slot="header")
          el-input(v-model="cardTitle")
        .card-body
          el-input(type="textarea" :rows="10" v-model="cardBody")
        el-button.card-button.card-create-button(type="primary" @click="create") 作成
    el-col.todo-card(:span="8" v-for="item in listItems" :key="item.name")
      el-card.box-card
        .card-header(slot="header")
          .text {{ item.name }}
        .card-body
          .text {{ item.description }}
        el-button.card-button.card-delete-button(type="danger" @click="remove(item.id)") 削除
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Auth, API, graphqlOperation } from "aws-amplify";
import router from "@/router";

type listItemType = {
  id: string,
  name: string,
  description: string
};

@Component({})
export default class TODO extends Vue {
  cardBody: string = "";
  cardTitle: string = "";
  listItems: listItemType[] = [];

  async created() {
    await this.getListItems();
  }

  // サインアウト処理
  public signOut() {
    Auth.signOut().then(data => {
      return router.push("/signIn");
    }).catch(err => {
      console.error(err);
    });
  }

  // TODOリストの作成
  public async create() {
    console.log(this);
    const gqlBody = `
      mutation create {
        createTodo(input: {
          name: "${this.cardTitle}"
          description: "${this.cardBody}"
        }) {
          id
          name
          description
        }
      }
    `;
    const result: any = await API.graphql(graphqlOperation(gqlBody));
    this.listItems.unshift(result.data.createTodo);
  }

  // TODOリストの削除
  public async remove(id: string) {
    console.log(id);
    const gqlBody = `
      mutation delete {
        deleteTodo(input: {
          id: "${id}"
        }) {
          id
        }
      }
    `;
    const result: any = await API.graphql(graphqlOperation(gqlBody));
    const newListItems: listItemType[] = [];
    this.listItems.filter(item => {
      console.log(item);
      if (result.data.deleteTodo.id !== item.id) {
        newListItems.push(item);
      }
    });
    this.listItems = newListItems;
  }

  // TODOリスト取得
  public async getListItems() {
    const gqlBody = `
      query list {
        listTodos(limit: 10) {
          items {
            id
            name
            description
          }
        }
      }
    `;
    const result: any = await API.graphql(graphqlOperation(gqlBody));
    this.listItems = result.data.listTodos.items;

    console.log(this.listItems);
  }
}
</script>

<style scoped lang="scss">
.list-area {
  margin: 28px auto 0;
  width: 90vw;

  .signout {
    font-weight: bold;
    position: absolute;
    right: 40px;
    top: 40px;
  }

  .todo-card {
    padding: 15px;

    .box-card {
      height: 380px;
      position: relative;

      .card-body {
        text-align: left;
      }

      .el-button {
        font-weight: bold;

        &.card-button {
          bottom: 10px;
          left: 0;
          margin: auto;
          position: absolute;
          right: 0;
          width: 80px;
        }
      }
    }
  }
}
</style>
