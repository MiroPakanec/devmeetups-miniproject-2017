<template>
    <v-dialog width="350px" persistent v-model="editDialog">
        <v-btn fab accent slot="activator">
            <v-icon>edit</v-icon>
        </v-btn>
        <v-card>
            <v-container>
                <v-layout row>
                    <v-flex x12>
                        <v-card-title>Edit Meetup</v-card-title>
                    </v-flex>
                </v-layout>
                <v-divider></v-divider>
                <v-layout row>
                    <v-flex x12>
                        <v-card-text>
                            <v-text-field v-model="editedTitle" name="title" label="Title" required></v-text-field>
                            <v-text-field v-model="editedDescription" name="description" label="Description" multi-line required></v-text-field>
                        </v-card-text>
                    </v-flex>
                </v-layout>
                <v-layout row>
                    <v-flex 12>
                        <v-card-actions>
                            <v-btn flat class="blue--text" @click="editDialog = false">Close</v-btn>
                            <v-btn flat class="blue--text" @click="onSaveChanges">Save</v-btn>

                        </v-card-actions>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    props: ['meetup'],
    data() {
        return {
            editDialog: false,
            editedTitle: this.meetup.title,
            editedDescription: this.meetup.description
        }
    },
    methods:{
        onSaveChanges(){
            if(this.editedTitle.trim() === '' || this.editedDescription.trim() === ''){
                return;
            }

            this.editDialog = false;
            this.$store.dispatch('updateMeetupData', {
                id: this.meetup.id,
                title: this.editedTitle,
                description: this.editedDescription
            })
        }
    }
}
</script>
