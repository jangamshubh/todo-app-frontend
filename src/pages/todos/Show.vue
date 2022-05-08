<template>
    <div class="grid">
        <div class="col-12">
            <Card>
				<template v-slot:title>
					<div class="flex align-items-center justify-content-between mb-0">
						<h5>View Todo Details</h5>
                        <Button icon="pi pi-arrow-left" class="p-button-rounded mr-2 mb-2" @click="redirectToIndex()"/>
                    </div>
                </template>
                <template v-slot:content>
                    <table class="min-w-full border divide-y divide-gray-200">
                        <tbody class="bg-white divide-y divide-gray-200 divide-solid">
                            <tr class="bg-white">
                                <th>Title</th>
                                <td class="px-6 py-4 text-sm leading-5 text-gray-900 whitespace-no-wrap">
                                    {{ todo.title }}
                                </td>
                            </tr>
                            <tr>
                                <th>Description</th>
                                <td class="px-6 py-4 text-sm leading-5 text-gray-900 whitespace-no-wrap">
                                    {{ todo.description }}
                                </td>
                            </tr>
                            <tr>
                                <th>Deadline</th>
                                <td class="px-6 py-4 text-sm leading-5 text-gray-900 whitespace-no-wrap">
                                    {{ todo.deadline }}
                                </td>
                            </tr>
                            <tr>
                                <th>Priority</th>
                                <td class="px-6 py-4 text-sm leading-5 text-gray-900 whitespace-no-wrap">
                                    {{ todo.priority }}
                                </td>
                            </tr>
                            <tr>
                                <th>Status</th>
                                <td class="px-6 py-4 text-sm leading-5 text-gray-900 whitespace-no-wrap">
                                    {{ todo.status }}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </template>
            </Card>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import authHeader from '../../services/auth-header';
export default {
    data() {
        return {
            todo:{},
            filters1:null,
            loading1: true,
            loading2: true,
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
        },
    },
    created() {
        this.checkUserLogin();
        this.checkUserRole();
        this.getTodo();
    },
    methods: {
        checkUserLogin() {
            if (!this.loggedIn) {
                this.$router.push("/login");
            }
        },
        checkUserRole() {
            if(this.checkRole != 'Super Admin' && this.checkRole != 'Normal User') {
               this.$router.push("/");
           }
        },
        getTodo() {
            axios.get(`${process.env.VUE_APP_API_URL}/todos/${this.$route.params.id}/show`,{ headers: authHeader() }).then(data => {
                let response = data.data;
                if(response.status == 'success') {
                    this.todo = response.data;
                    this.loading1 = false;
                } else {
                    this.$router.push({ name: 'todos.index' });
                }
            })
        },
        redirectToIndex() {
            this.$router.push({ name: 'todos.index' });
        },
    },
}
</script>
