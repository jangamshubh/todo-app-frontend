<template>
	<div class="grid">
		<div class="col-12 lg:col-6 xl:col-3">
			<div class="card mb-0">
				<div class="flex justify-content-between mb-3">
					<div>
						<span class="block text-500 font-medium mb-3">Total Todos</span>
						<div class="text-900 font-medium text-xl">{{ todo.total_todos }}</div>
					</div>
				</div>
			</div>
		</div>
		<div class="col-12 lg:col-6 xl:col-3">
			<div class="card mb-0">
				<div class="flex justify-content-between mb-3">
					<div>
						<span class="block text-500 font-medium mb-3">Pending Todos</span>
						<div class="text-900 font-medium text-xl">{{ todo.pending_todos }}</div>
					</div>
				</div>
			</div>
		</div>
		<div class="col-12 lg:col-6 xl:col-3">
			<div class="card mb-0">
				<div class="flex justify-content-between mb-3">
					<div>
						<span class="block text-500 font-medium mb-3">In Progress Todos</span>
						<div class="text-900 font-medium text-xl">{{ todo.in_progress_todos }}</div>
					</div>
				</div>
			</div>
		</div>
		<div class="col-12 lg:col-6 xl:col-3">
			<div class="card mb-0">
				<div class="flex justify-content-between mb-3">
					<div>
						<span class="block text-500 font-medium mb-3">Done Todos</span>
						<div class="text-900 font-medium text-xl">{{ todo.done_todos }}</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import axios from 'axios';
import authHeader from '../services/auth-header';
export default {
	data() {
		return {
			todo: {
				total_todos: '',
				pending_todos: '',
				in_progress_todos: '',
				done_todos: '',
			}
		}
	},
	computed: {
        currentUser() {
            return this.$store.state.auth.user;
        },
        currentAccessToken() {
            return this.$store.state.auth.access_token;
        }
    },
	created() {
		if(!this.currentUser){
			this.$router.push('/login')
		}
	},
	mounted() {
		this.getDashboardData();
	},
	methods: {
		getDashboardData() {
			axios.get(`${process.env.VUE_APP_API_URL}/dashboard`, { headers: authHeader() }).then(data => {
				let response = data.data;
				if(response.status == 'success') {
					this.todo.total_todos = response.total_todos;
					this.todo.pending_todos = response.pending_todos;
					this.todo.in_progress_todos = response.in_progress_todos;
					this.todo.done_todos = response.done_todos;
				}
			})
		},
	},
}
</script>
