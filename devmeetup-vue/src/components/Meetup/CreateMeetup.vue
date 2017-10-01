<template>
    <v-container>
        <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
                <h4 class="primary--text">Create new Meetup!</h4>
            </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex xs12>
                <form @submit.prevent="onCreateMeetup">
                    <v-layout row>
                        <v-flex x12 sm6 offset-sm3>
                            <v-text-field name="title" label="Title" v-model="title" required></v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex x12 sm6 offset-sm3>
                            <v-text-field name="location" label="Location" v-model="location" required></v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex x12 sm6 offset-sm3>
                            <v-btn raised class="primary" @click="onPickFile">Upload Image</v-btn>
                            <input 
                            type="file" 
                            style="display: none" 
                            ref="fileInput" 
                            accept="image/*"
                            @change="onFilePicked"
                            > 
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex x12 sm6 offset-sm3>
                            <img :src="imageUrl" height="150">
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex x12 sm6 offset-sm3>
                            <v-text-field name="description" label="Description" v-model="description" multi-line required></v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex x12 sm6 offset-sm3>
                            <h5>Choose a date and time</h5>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex x12 sm6 offset-sm3>
                            <v-date-picker v-model="date" landscape></v-date-picker>
                        </v-flex>
                    </v-layout>
                    <v-layout row mt-4>
                        <v-flex x12 sm6 offset-sm3>
                            <v-time-picker v-model="time" format="24hr" landscape></v-time-picker>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex x12 sm6 offset-sm3>
                            <v-btn class="primary" :disabled="!formIsValid" type="submit">Create Meetup</v-btn>
                        </v-flex>
                    </v-layout>
                </form>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
    data() {
        return {
            title: '',
            location: '',
            imageUrl: '',
            image: null,
            description: '',
            date: new Date(),
            time: new Date()
        }
    },
    computed: {
        formIsValid() {
            return this.title !== '' &&
                this.location !== '' &&
                this.imageUrl !== '' &&
                this.description !== ''
        },
        submitableDateTime() {
            const date = new Date(this.date);
            let hours = "";
            let minutes = "";

            if (typeof this.time === 'string') {
                hours = this.time.match(/^(\d+)/)[1];
                minutes = this.time.match(/:(\d+)/)[1];
            }
            else {

                hours = this.time.getHours();
                minutes = this.time.getMinutes();
            }

            date.setHours(hours);
            date.setMinutes(minutes);
            return date;
        }
    },
    methods: {
        onCreateMeetup() {

            if (this.formIsValid == false) {
                return;
            }
            if(this.image == false){
                return;
            }

            const meetupObj = {
                title: this.title,
                location: this.location,
                image: this.image,
                description: this.description,
                date: new Date()
            }
            this.$store.dispatch('createMeetup', meetupObj);
            this.$router.push("/meetups");
        },
        onPickFile(){
            this.$refs.fileInput.click();
        },
        onFilePicked(event){
            const files = event.target.files;
            let file = files[0];
            let fileName = file.name;
            if(fileName.lastIndexOf('.') <= 0){
                return alert('Please add a valid file.');
            }
            const fileReader = new FileReader();
            fileReader.addEventListener('load', () => {
                this.imageUrl = fileReader.result;
            });

            fileReader.readAsDataURL(file);
            this.image = file;
        }
    }
}
</script>
