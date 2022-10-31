<template>
  <button
			:disabled="disabled"
			:class="disabled ? '' : 'enabled'"
			:style="color ? 'background-color: ' + color + ';' : ''"
			@click="onClick"
	>
    <slot />
  </button>
</template>

<script>
export default {
  name: 'BaseButton',
  props: { disabled: Boolean, color: String, onClick: Function }
}
</script>

<style scoped>
	button {
		border: 1px solid rgba(27, 31, 35, .15);
		border-radius: 3px;
		font-family: -apple-system, system-ui, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
		font-weight: 500;
		padding: 3px 5px;
		margin: 3px;
		cursor: not-allowed;
	}
	button.enabled {
		background-color: #c76565;
		color: #462a32;
		cursor: pointer;
	}
</style>
