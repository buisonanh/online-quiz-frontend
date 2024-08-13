<template>
<div class="modal fade show" tabindex="-1" role="dialog" style="display: block; background-color: rgba(0, 0, 0, 0.5);" aria-modal="true">
    <div class="modal-dialog" role="document">
    <div class="modal-content">
        <!-- Modal Header -->
        <div class="modal-header">
        <h5 class="modal-title text-light">Confirm Deletion</h5>
        <button type="button" class="btn-close" aria-label="Close" @click="cancel" style="color: white;"></button>
        </div>

        <!-- Modal Body -->
        <div class="modal-body text-light">
        <p>{{ message }}</p>
        </div>

        <!-- Modal Footer -->
        <div class="modal-footer">
        <button type="button" class="btn btn-secondary" @click="cancel">Cancel</button>
        <button type="button" class="btn btn-danger" @click="confirm">Delete</button>
        </div>
    </div>
    </div>
</div>
</template>

<script>
export default {
props: {
    message: {
    type: String,
    default: 'Are you sure you want to delete this item?',
    },
},
methods: {
    confirm() {
    this.$emit('confirm');
    },
    cancel() {
    this.$emit('close');
    },
},
}
</script>

<style scoped>
/* No additional custom styles are needed, relying on Bootstrap's default styling */
</style>
