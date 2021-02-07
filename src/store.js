import { isLoggedIn, logOut } from "./components/shared/utils/auth"
import axios from 'axios'
import firebase from "firebase";
import { db, Timestamp, GeoPoint } from "./main";
import router from "./routes";


export default {
    // vuex store
    state: {
        notHome: false,
        menu: false,
        env: process.env.VUE_APP_DB_ENV,
        isHomePage: true,
        isMetamorphosis: false,
        lastSearch: {
            from: null,
            to: null,
        },
        basket: {
            items: []
        },
        isLoggedIn: false,
        isEmailVerified: true,
        userRole: "",
        user: {},
        globalMessage: '',
        menuEl: {
            mHome: {
                val: false,
                slug: "mHome",
            },
            mAbout: {
                val: false,
                slug: "mAbout",
            },
            mContents: {
                val: false,
                slug: "mContents",
            },
            mBlog: {
                val: false,
                slug: "mBlog",
            },
            mShop: {
                val: false,
                slug: "mShop",
            },
            mContacts: {
                val: false,
                slug: "mContacts",
            },
            login: {
                val: false,
                slug: "login",
            },
            userProfile: {
                val: false,
                slug: "userProfile",
            },
        },
    },
    // le mutations hanno solo il compito di mutare lo stato dell'app, sono
    // come semplici funzioni
    mutations: {
        toggleHomeMenuColor(state, payload) {
            state.notHome = payload
        },
        selectEl(state, payload) {
            var menu = state.menuEl;
            for (const el in menu) {
                if (menu[el].slug != payload) {
                    menu[el].val = false;
                } else {
                    menu[el].val = true;
                }
            }
        },
        toggleMenu(state) {
            state.menu = !state.menu;
        },
        closeMenu(state) {
            state.menu = false;
        },
        isMetamorphosis(state, payload) {
            state.isMetamorphosis = payload
        },
        setLastSearch(state, payload) {
            state.lastSearch = payload
        },
        addToBasket(state, payload) {
            payload["added"] = true;

            state.basket.items.push(payload)
        },
        removeFromBasket(state, payload) {
            // col filter tengo solo gli elementi che rispettano la condizione, cioè tutti
            // quelli che hann un id differente da quello che passo alla mutation
            // console.log(payload)
            state.basket.items = state.basket.items.filter(item => {
                // console.log(item.id)
                return item.id !== payload
            })
        },
        setBasket(state, payload) {
            state.basket = payload
        },
        setGlobalMessage(state, payload) {
            state.globalMessage = payload

        },
        setUser(state, payload) {
            state.user = payload
        },
        setUserRole(state, payload) {
            state.userRole = payload
            localStorage.setItem('userRole', payload)
        },
        getUserRole(state) {
            state.userRole = localStorage.getItem('userRole')
        },

        getUserOnRefresh(state) {
            if (localStorage.getItem("isLoggedIn") === "true") {
                state.user = JSON.parse(localStorage.getItem("currentUser"));
            }
        },
        setLoggedIn(state) {
            state.isLoggedIn = true
            localStorage.setItem('isLoggedIn', true);
            localStorage.setItem('currentUser', JSON.stringify(state.user))
        },
        setLoggedOut(state) {
            state.isLoggedIn = false
            localStorage.setItem('isLoggedIn', false);
            localStorage.setItem('currentUser', '')
        },
        setEmailVerified(state, payload) {
            state.isEmailVerified = payload
        },

        toggleHomePage(state, payload) {
            state.isHomePage = payload
        },
        addItemNumberToBasketItem(state, payload) {
            state.basket.items.forEach((prod) => {
                if (prod.id === payload) {
                    prod.itemsNumber += 1;
                }
            })
        },
        removeItemNumberFromBasketItem(state, payload) {
            state.basket.items.forEach((prod) => {
                if (prod.id === payload) {
                    if (prod.itemsNumber > 1) {
                        prod.itemsNumber -= 1;
                    }
                }
            })
        }
    },
    // le actions mi chiamano le mutations e in più salvano nel local storage
    // di modo che anche al refresh i dati rimangano salvati
    actions: {

        addItemNumberToBasketItem({ commit, state }, payload) {
            commit('addItemNumberToBasketItem', payload)
            localStorage.setItem('basket', JSON.stringify(state.basket))
        },
        removeItemNumberFromBasketItem({ commit, state }, payload) {
            commit('removeItemNumberFromBasketItem', payload)
            localStorage.setItem('basket', JSON.stringify(state.basket))
        },
        loadBasketOnRefresh(context) {
            // basket
            const basket = localStorage.getItem('basket')
            if (basket) {
                context.commit('setBasket', JSON.parse(basket));
            }
        },
        // questo metodo mi va a caricare i dati salvati in sessione, viene chiamato
        // in app.js alla creazione dell'app
        loadStoredState(context) {
            // last search
            const lastSearch = localStorage.getItem('lastSearch')
            if (lastSearch) {
                context.commit('setLastSearch', JSON.parse(lastSearch));
            }
            // basket
            const basket = localStorage.getItem('basket')
            if (basket) {
                context.commit('setBasket', JSON.parse(basket));
            }

            // questo mi va a fixare il delay causato dall' action async loadUser
            // quindi appena mi si apre l app carico subito il valore del loggedin
            // nello stored state, cosa che e immediata e non asincrona
            context.commit('setLoggedIn', isLoggedIn())
        },
        setLastSearch(context, payload) {
            context.commit('setLastSearch', payload);
            localStorage.setItem('lastSearch', JSON.stringify(payload))
        },
        addToBasket({ commit, state }, payload) {
            commit('addToBasket', payload);
            localStorage.setItem('basket', JSON.stringify(state.basket))
        },
        removeFromBasket(context, payload) {
            context.commit('removeFromBasket', payload);
            localStorage.setItem('basket', JSON.stringify(context.state.basket))
            // this.$store.dispatch("loadBasketOnRefresh");

        },
        // {commit, state} è il deconstructed object di context (è la stessa cosa, soloche posso
        // accedere direttamente a quei valori, avendo decostruito l'oggetto passato alla action)
        clearBasket({ commit, state }, payload) {
            commit('setBasket', { items: [] });
            localStorage.setItem('basket', JSON.stringify(state.basket))
        },
        // ################################################
        //######################## firebase  ##################
        // ################################################


        getEnvVariables() {
            return new Promise((resolve, reject) => {
                var env = db.collection("env")
                    .where("name", "==", 'env_prod')
                    .get()
                    .then((querySnapshot) => {
                        env = querySnapshot.docs.map((doc) => doc.data());
                        return env
                    })
                    .catch((err) => console.log(err));
                resolve(env)

            })
        },

        signOut({ commit, dispatch }) {
            firebase
                .auth()
                .signOut()
                .then(() => {
                    commit('setLoggedOut')
                    commit('setUser', {})
                    commit('setUserRole', '')

                    if (router.currentRoute.name !== 'home') {
                        router.replace({
                            name: "mHome"
                        });
                    }
                });
        },
        async getUserRole({ commit, state }, payload) {
            var user = firebase.auth().currentUser

            const role = await db.collection(`users${state.env}`)
                .doc(user.uid)
                .get()
                .then((querySnapshot) => {
                    // console.log(querySnapshot.data().role);
                    if (querySnapshot.data().role) {
                        return querySnapshot.data().role;
                    }
                })
            commit('setUserRole', role)
        },
        async editUser({ commit, dispatch }, payload) {
            const user = firebase.auth().currentUser;
            user.updateProfile({ displayName: payload.displayName });

            db.collection('users').doc(payload.id).update({
                displayName: payload.displayName,
                description: payload.description,
                birthDate: payload.birthDate,
                age: payload.age,
                gender: payload.gender[0],
                address: payload.address,
                media: payload.media,
            }).then(() => {
                commit('setGlobalMessage', 'successfully edited user')

            })
        },
        async removeUser({ commit, dispatch }, payload) {
            var user = firebase.auth().currentUser;
            db.collection('users')
                .doc(user.uid)
                .delete()

            user.delete().then(function () {
                router.push({
                    name: "toccaVinoHome",
                });
                commit('setGlobalMessage', 'successfully removed user')

            }).catch(function (error) {
                // An error happened.
            });
        },
        registration({ commit, dispatch }, payload) {

            const err = firebase
                .auth()
                .createUserWithEmailAndPassword(payload.email, payload.password)
                .then((data) => {
                    // console.log(data)
                    db.collection("users")
                        .doc(data.user.uid)
                        .set({ displayName: payload.name, email: payload.email });
                })
                .then(() => {
                    // now we have access to the signed in user
                    const user = firebase.auth().currentUser;
                    user.updateProfile({ displayName: payload.name });
                    // send the signed in user a verification email
                    // const actionCodeSettings = {
                    //     url: `https://${window.location.hostname}/auth/login`,
                    // };
                    user.sendEmailVerification();
                    commit('setGlobalMessage', 'successfully registered: check your email address')
                    setTimeout(() => {
                        commit('setGlobalMessage', '')
                    }, 3000)

                    router.replace({
                        name: "mHome"
                    });
                }).then(() => dispatch('signOut'))
                .catch((err) => {
                    // console.log(err.message)
                    return err
                });
            return err
        },
        async googleLogin({ commit, dispatch }, payload) {
            const provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithPopup(provider).then(function (result) {
                // This gives you a Google Access Token. You can use it to access the Google API.
                var token = result.credential.accessToken;
                // The signed-in user info.
                var user = result.user;


                // salvo su db
                // const user = firebase.auth().currentUser


                // se non ho ancora creato l user nel db, lo creo al primo login
                db.collection("users")
                    .doc(user.uid)
                    .set({ displayName: user.displayName, email: user.email }, { merge: true });



                commit('setUser', {
                    displayName: firebase.auth().currentUser.displayName,
                    email: firebase.auth().currentUser.email,
                    id: firebase.auth().currentUser.uid,

                })
                commit('setLoggedIn')


                router.replace({ name: "mHome" });
                commit('setGlobalMessage', 'successfully logged in')
                setTimeout(() => {
                    commit('setGlobalMessage', '')
                }, 3000)
            }).then(() => {
                // ruolo utente
                dispatch("getUserRole");


            }).catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                // ...
            });
        },

        login({ commit, dispatch }, payload) {
            const err = firebase
                .auth()
                .signInWithEmailAndPassword(payload.email, payload.password)
                .then((data) => {
                    if (!firebase.auth().currentUser.emailVerified) {
                        dispatch("signOut");
                        return
                    }
                    const user = firebase.auth().currentUser


                    // se non ho ancora creato l user nel db, lo creo al primo login
                    db.collection("users")
                        .doc(user.uid)
                        .set({ displayName: user.displayName, email: user.email }, { merge: true });

                    commit('setUser', {
                        displayName: firebase.auth().currentUser.displayName,
                        email: firebase.auth().currentUser.email,
                        id: firebase.auth().currentUser.uid,
                    })
                    commit('setLoggedIn')

                    router.replace({ name: "mHome" });
                    commit('setGlobalMessage', 'successfully logged in')
                    setTimeout(() => {
                        commit('setGlobalMessage', '')
                    }, 3000)
                }).then(() => {
                    // ruolo utente
                    dispatch("getUserRole");
                })
                .catch((err) => {
                    return err
                });
            return err

        },
        loadFirebaseUserAfterRefresh({ commit, dispatch }) {

            firebase.auth().onAuthStateChanged(function (user) {
                if (user) {
                    commit('setLoggedIn')
                    // console.log(user)

                } else {
                    commit('setLoggedOut')

                }
            });
        },
        forgotPassword({ commit, dispatch }, payload) {
            if (!payload) {
                return "Please type in a valid email address.";
            }
            firebase
                .auth()
                .sendPasswordResetEmail(payload)
                .then(() => {
                    return true;
                })
                .catch(error => {
                    return error.message;
                });
        },
        closeGlobalSnackbar({ commit, dispatch }) {
            commit('setGlobalMessage', false)
        },
        async saveEvent({ commit, dispatch }, payload) {
            // console.log(payload)
            return db.collection('wineEvents').add({
                userId: firebase.auth().currentUser.uid,
                createdTimestamp: firebase.firestore.Timestamp.fromDate(new Date()),
                name: payload.name,
                cellar: payload.cellar,
                description: payload.description,
                city: payload.city,
                address: payload.address,
                price: payload.price,
                media: payload.media,
                date: payload.date,
                // date: Timestamp.fromDate(new Date(payload.date)),
                location: new GeoPoint(payload.location.latitude, payload.location.longitude),
            }).then(() => commit('setGlobalMessage', 'successfully created new event'))
        },
        async saveCellar({ commit, dispatch }, payload) {
            // console.log(payload)
            return db.collection('cellars').add({
                userId: firebase.auth().currentUser.uid,
                createdTimestamp: firebase.firestore.Timestamp.fromDate(new Date()),
                isCellar: true,
                cellarType: payload.selectedCellarType,
                name: payload.name,
                description: payload.description,
                city: payload.city,
                address: payload.address,
                media: payload.media,
                location: new GeoPoint(payload.location.latitude, payload.location.longitude),
            }).then(() => commit('setGlobalMessage', 'successfully created new cellar'))
        },


        async updateEvent({ commit, dispatch }, payload) {
            // console.log(payload)
            return db.collection('wineEvents').doc(payload.id).update({
                userId: firebase.auth().currentUser.uid,
                updatedTimestamp: firebase.firestore.Timestamp.fromDate(new Date()),
                name: payload.name,
                cellar: payload.cellar,
                description: payload.description,
                city: payload.city,
                address: payload.address,
                price: payload.price,
                media: payload.media,
                date: payload.date,
                // date: Timestamp.fromDate(new Date(payload.date)),
                location: new GeoPoint(payload.location.latitude, payload.location.longitude),

            }).then(() => commit('setGlobalMessage', 'successfully updated new event'))
        },
        async updateCellar({ commit, dispatch }, payload) {
            // console.log(payload)
            return db.collection('cellars').doc(payload.id).update({
                userId: firebase.auth().currentUser.uid,
                updatedTimestamp: firebase.firestore.Timestamp.fromDate(new Date()),
                isCellar: true,
                cellarType: payload.selectedCellarType,
                name: payload.name,
                description: payload.description,
                city: payload.city,
                address: payload.address,
                media: payload.media,
                location: new GeoPoint(payload.location.latitude, payload.location.longitude),
            }).then(() => commit('setGlobalMessage', 'successfully updated new cellar'))
        },


        async savePost({ commit, dispatch, state }, payload) {
            console.log(payload)
            // return db.collection(`blogPosts${state.env}`).add({
            //     userId: firebase.auth().currentUser.uid,
            //     createdTimestamp: firebase.firestore.Timestamp.fromDate(new Date()),
            //     title: payload.title,
            //     cellar: payload.cellar,
            //     description: payload.description,
            //     city: payload.city,
            //     address: payload.address,
            //     price: payload.price,
            //     media: payload.media,
            //     date: payload.date,
            //     // date: Timestamp.fromDate(new Date(payload.date)),
            //     location: new GeoPoint(payload.location.latitude, payload.location.longitude),
            // }).then(() => commit('setGlobalMessage', 'successfully created new post'))
        },


    },
    // sono come le computed properties del componente vue
    getters: {
        itemsInBasket: (state) => state.basket.items.length,

        // higher horder function: is a functions composition, this means that is a function
        // that returns another function
        // Questa funzione controlla che l'elemento sia già o meno nel basket
        // con un reduce(function abbastanza complicata)
        // inBasketAlready(state) {
        //     // returns Boolean
        //     return function (id) {
        //         return state.basket.items.reduce((result, item) => result || item.bookable.id === id, false)
        //     }
        // }
    }
}
