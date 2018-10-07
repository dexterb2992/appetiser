<template>
	<section class="section">
		<h2 class="title is-3 has-text-grey">
			"Register  <b-icon icon="rocket" size="is-large" />"
		</h2>

		<form-register></form-register>
	</section>
</template>

<script>
	import RegistrationForm from '@/components/RegistrationForm';

	export default {
		components: {
			'form-register': RegistrationForm
		},
		data() {
			return {

			};
		},
	}

</script>
