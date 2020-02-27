
export class story {
    constructor(
        public storyId: String,
        public storyTitle: String, 
        public imageUrl: String,
        public storyDetails: String
        ){
    }
}
export class user {
    constructor(
        public userId: String,
        public email: String,
        public password: String,
        public name: String
    ){

    }
}
export class hospital extends user{
    constructor(
        public userId: String,
        public email: String,
        public password: String,
        public name: String
    ){
        super(
            userId,
            email,
            password,
            name
        )
    }
}
export class donor extends user{
    constructor(
        public userId: String,
        public email: String,
        public password: String,
        public name: String,
        public responseTime: number,
        public location: String,
        public bloodType: String
    ){
        super(
            userId,
            email,
            password,
            name
        )
    }
}
export class alert {
    constructor(
        public date: Date,
        public bloodType: String,
        public current: boolean
    ){

    }
}
export class DB {
    //init dummy data
    //stories, user, hospital, donor, alert
    constructor(
        public stories : story[]
    ){

    }
   
    getDb= function() : {
        stories:{
            getStories: () => story[]
    }
} {
        return {
            stories:{
                getStories: () : story[] => this.stories
            } 

        }
    }
}
