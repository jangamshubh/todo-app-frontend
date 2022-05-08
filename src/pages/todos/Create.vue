<template>
    <div class="row">
        <div class="col-12">
            <div class="card">
                <Toast />
                <div class="card-header flex justify-content-between flex-column sm:flex-row">
                    <h5>Create Todo</h5>
                    <Button type="button" icon="pi pi-arrow-left" label="Back To Index Page" class="p-button-outlined mb-2" @click="redirectToIndexPage()" />
                </div>
                <div class="field p-fluid">
                    <label for="name1">Title</label>
                    <InputText id="name1" type="text" v-model="v$.todo.title.$model"/>
                </div>
                <div class="field p-fluid">
                    <label for="description1">Description</label>
                    <Textarea id="description1" type="text" v-model="v$.todo.description.$model"/>
                </div>
                <div class="field p-fluid">
                    <label for="deadline1">Deadline</label>
                    <Datepicker id="deadline1" v-model="v$.todo.deadline.$model" :format="'d-M-Y HH:ii'"/>
                </div>
                <div class="field p-fluid">
                    <label for="priority1">Priority</label>
                    <Dropdown id="priority1" v-model="v$.todo.priority.$model" :options="priorities" optionLabel="name" optionValue="id" placeholder="Priority"/>
                </div>
                <div class="field p-fluid">
                    <label for="status1">Status</label>
                    <Dropdown id="status1" v-model="v$.todo.status.$model" :options="status" optionLabel="name" optionValue="id" placeholder="Status"/>
                </div>
                <Button label="Submit" v-on:click="saveTodo()" :disabled="v$.todo.$invalid"></Button>
            </div>
        </div>
    </div>
</template>

<script>
import { required, minLength, maxLength } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import axios from 'axios';
import authHeader from '../../services/auth-header';
import Datepicker from 'vue3-date-time-picker';
import 'vue3-date-time-picker/dist/main.css'
export default {
    name:"Create Todo",
    components: { Datepicker },
    data() {
        return {
            todo: {
                title: '',
                description: '',
                deadline: '',
                priority: '',
                status: '',
            },
            priorities: [
                { name: 'Low', id: 'Low' },
                { name: 'Medium', id: 'Medium' },
                { name: 'High', id: 'High' }
            ],
            status: [
                { name: 'Pending', id: 'Pending' },
                { name: 'In Progress', id: 'In Progress' },
                { name: 'Done', id: 'Done' },
            ],
        };
    },
    setup: () => ({ v$: useVuelidate() }),
    validations () {
        return {
            todo: {
                title: { required, minLength: minLength(2) },
                description: { maxLength:maxLength(1000) },
                deadline: { required },
                priority: { required },
                status: { required },
            }
        }
    },
    computed: {
        loggedIn() {
            return this.$store.state.auth.status.loggedIn;
        },
        checkUser() {
            return this.$store.state.auth.user;
        },
        checkRole() {
            return this.$store.state.auth.role;
        }
    },
    created() {
        this.checkUserLogin();
        this.checkUserRole();
    },
    methods: {
        checkUserLogin() {
            if (!this.loggedIn) {
                this.$router.push("/login");
            }
        },
        checkUserRole() {
            if(this.checkRole != 'Normal User' && this.checkRole != 'Super Admin') {
                this.$router.push({ name: 'todos.index' });
            }
        },
        showSuccess(status,message) {
            this.$toast.add({ severity: status, summary: message, detail: message, life: 3000 });
        },
        redirectAfterSuccess() {
            setTimeout(() => this.$router.push({ name: 'todos.index'}), 3000)
        },
        saveTodo() {
            axios.post(`${process.env.VUE_APP_API_URL}/todos/store`,this.todo,{ headers: authHeader() }).then(data => {
                let response = data.data;
                if(response.status == 'success') {
                    let status = response.status;
                    let message = response.message;
                    this.showSuccess(status,message);
                    this.redirectAfterSuccess();
                } else {
                    console.log(response);
                }
            })
        },
        redirectToIndexPage() {
            this.$router.push({ name: 'todos.index' });
        },
    },
}
</script>
