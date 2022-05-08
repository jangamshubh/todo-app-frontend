<template>
    <div class="grid">
        <div class="col-12">
            <Toast />
            <div class="card">
                <div class="card-header flex justify-content-between flex-column sm:flex-row">
                    <h5>Todos</h5>
                    <Button type="button" icon="pi pi-plus" label="Add Todo" class="p-button-outlined mb-2" @click="redirectToCreatePage()"/>
                </div>
                <DataTable :value="todos" :paginator="true" class="p-datatable-gridlines" :rows="10" dataKey="id" :rowHover="true"
                v-model:filters="filters1" filterDisplay="menu" :loading="loading1" :filters="filters1" responsiveLayout="scroll"
                :globalFilterFields="['title']" >
                    <template #header>
                        <div class="flex justify-content-between flex-column sm:flex-row">
                            <Button type="button" icon="pi pi-filter-slash" label="Clear" class="p-button-outlined mb-2" @click="clearFilter1()"/>
                            <span class="p-input-icon-left mb-2">
                                <i class="pi pi-search" />
                                <InputText v-model="filters1['global'].value" placeholder="Keyword Search" style="width: 100%"/>
                            </span>
                        </div>
                    </template>
                    <template #empty>
                        No Data found.
                    </template>
                    <template #loading>
                        Loading data. Please wait.
                    </template>
                    <Column field="name" header="Name" style="min-width:12rem">
                        <template #body="{data}">
                            {{ data.title }}
                        </template>
                        <template #filter="{filterModel}">
                            <InputText type="text" v-model="filterModel.value" class="p-column-filter" placeholder="Search by title"/>
                        </template>
                    </Column>
                    <Column field="deadline" header="Deadline" style="min-width:12rem">
                        <template #body="{data}">
                            {{ data.deadline }}
                        </template>
                    </Column>
                    <Column field="priority" header="Priority" style="min-width:12rem">
                        <template #body="{data}">
                            {{ data.priority }}
                        </template>
                    </Column>
                    <Column field="status" header="Status" style="min-width:12rem">
                        <template #body="{data}">
                            {{ data.status }}
                        </template>
                    </Column>
                    <Column>
                        <template #body="data">
                            <Button icon="pi pi-pencil" class="p-button-rounded p-button-success mr-2" @click="editTodo(data.data)" />
                            <Button icon="pi pi-eye" class="p-button-rounded p-button-info mr-2" @click="showTodo(data.data)" />
                            <Button icon="pi pi-trash" class="p-button-rounded p-button-warning mr-2" @click="confirmDeleteTodo(data.data)" />
                        </template>
                    </Column>
                </DataTable>
                <Dialog v-model:visible="deleteTodoDialog" :style="{width: '450px'}" header="Confirm" :modal="true">
                    <div class="flex align-items-center justify-content-center">
                        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                        <span v-if="todo_data">Are you sure you want to delete <b>{{ todo_data.title }}</b>?</span>
                    </div>
                    <template #footer>
                        <Button label="No" icon="pi pi-times" class="p-button-text" @click="deleteTodoDialog = false"/>
                        <Button label="Yes" icon="pi pi-check" class="p-button-text" @click="deleteTodo(todo_data.id)" />
                    </template>
                </Dialog>
            </div>
        </div>
    </div>
</template>
<script>
import { FilterMatchMode,FilterOperator } from 'primevue/api';
import axios from 'axios'
import authHeader from '../../services/auth-header';
export default {
    data() {
        return {
            todos: null,
            filters1: null,
            filters2: {},
            loading1: true,
            loading2: true,
            deleteTodoDialog: false,
        }
    },
    computed: {
        loggedIn() {
            return this.$store.state.auth.status.loggedIn;
        },
        checkRole() {
            return this.$store.state.auth.role;
        }
    },
    created() {
        this.checkUserLogin();
        this.checkUserRole();
        this.initFilters1();
    },
    mounted() {
        this.getAllTodos();
    },
    methods: {
        checkUserLogin() {
            if (!this.loggedIn) {
                this.$router.push("/login");
            }
        },
        checkUserRole() {
            if(this.checkRole != 'Super Admin' && this.checkRole != 'Normal User') {
               this.$router.push({ name: 'dashboard' });
            }
        },
        getAllTodos() {
            axios.get(`${process.env.VUE_APP_API_URL}/todos`, { headers: authHeader() }).then(data => {
                let response = data.data
                if(response.status == 'success') {
                    this.todos = response.data;
                    this.loading1 = false;
                } else {
                    this.$router.push({ name: 'dashboard'});
                }
            })
            this.loading2 = false;
        },
        initFilters1() {
            this.filters1 = {
                'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
                'title': {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}]},
            }
        },
        clearFilter1() {
            this.initFilters1();
        },
        editTodo(data) {
            this.$router.push({ name: 'todos.edit', params: { id: data.id }});
        },
        showTodo(data) {
            this.$router.push({ name: 'todos.show', params: { id: data.id }});
        },
        confirmDeleteTodo(data) {
			this.todo_data = data;
			this.deleteTodoDialog = true;
		},
        deleteTodo(id){
            axios.get(`${process.env.VUE_APP_API_URL}/todos/${id}/delete`, { headers: authHeader() }).then(() => {
                this.getAllTodos();
                this.deleteTodoDialog = false;
                this.showDeleteSuccess();
            })
        },
        showDeleteSuccess() {
            this.$toast.add({ severity:'success', summary: 'Todo Deleted Successfully', detail:'', life: 3000 });
        },
        redirectToCreatePage() {
            this.$router.push({ name: 'todos.create' });
        },
    },
}
</script>

<style scoped lang="scss">

</style>
