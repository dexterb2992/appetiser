<template>
	<div class="columns">
		<form class="column" @submit.prevent="register">
			<div class="field">
				<label class="label">Name</label>
				<div class="control">
					<input class="input is-medium" type="text" placeholder="Name" v-model="form.name">
				</div>
			</div>

			<div class="field">
				<label class="label">Email</label>
				<div class="control">
					<input class="input is-medium" type="email" placeholder="Email" v-model="form.email">
				</div>
			</div>

			<div class="field">
				<label class="label">Password</label>
				<div class="control">
					<input class="input is-medium" type="password" placeholder="Password" v-model="form.password">
				</div>
			</div>

			<div class="field">
				<notification :type="notification.type" v-show="notification.show">
					<div v-html="notification.content"></div>
				</notification>
			</div>

			<div class="field is-grouped pull-right">
				<div class="control">
					<button :class="isLoading ? 'is-loading button is-success is-medium' : 'button is-success is-medium'"
						type="submit">Submit</button>
				</div>
				<div class="control">
					<a class="button is-medium" href="javascript:void(0)" @click="cancel">Cancel</a>
				</div>
			</div>
		</form>
		<div class="column"></div>
	</div>
</template>

<script>
	import {post} from '@/helpers/api';
	import Notification from '@/components/Notification.vue';

	export default {
		components: { 'notification': Notification },
		data() {
			return {
				apiUrl: "register",
				notification: {
					type: 'info',
					content: '',
					show: false
				},
				isLoading: false,
				form: {
					name: '',
					email: '',
					password: '',
				}
			}
		},
		mounted() {
			Event.listen('closeNotification', () => {
				this.notification.show = false;
			});
		},
		methods: {
			cancel() {
				this.reset();
				this.notification.show = false;
			},
			reset() {
				this.isLoading = false;
				this.form = {
					name: '',
					email: '',
					password: '',
				}
			},
			register() {
				this.isLoading = true;

				post(this.apiUrl, this.form).then((res) => {
					console.log(res);
					if (res.data.success) {
						this.notification = {
							type: 'success',
							content: `<p><strong>User registered successfully!</strong></p>Token: <code>${res.data.token}</code>`,
							show: true
						};

						this.reset();
					}

					this.isLoading = false;
				}).catch((err) => {
					if (!err.response) {
						this.notification = {
							type: 'danger',
							content: `<p><strong>${err}</strong></p><code>Make sure to configure the API URL on /store/config.js</code>`,
							show: true
						};
					} else {
						if (err.response.hasOwnProperty('data')) {
							this.notification = {
								type: 'danger',
								content: err.response.data.message,
								show: true
							};
						}
					}
					this.isLoading = false;
				});
			}
		}
	}
</script>