<template>
	<div :class="'notification is-'+type">
	  	<a class="delete" @click="close"></a>
		<slot></slot>
	</div>
</template>

<style lang="css">
	.notification {
		word-break: break-word;
	}
</style>

<script>
	export default {
		props: ['type'],
		methods: {
			close() {
				window.Event.fire('closeNotification');
			}
		}
	}
</script>