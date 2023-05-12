instead of postman, we use thunderclient because it is integrated in our vsCode,
and install it in extensions: thunder client

after installed done, it will show in sidebar, click into it to use

/\*
model.aggregation([...])

first step: 
    - when querys in $match run, it will give we a single document, and
    that document will contain our userids
second step: 
    - we use $lookup when we have to match the document in an other model
    by placing query in an ohter model 
    - it mean we are placing the query on the user model and we wanna
    get the result from post model 
    - at above code, we wanna integrate with my post model, because the name of postmodel
    in database is posts 
    - localfield is against which we want to integrate with an other model
\*/

/_
in the third video, i'll learn or revise: 
    + React router v6 
    + Redux 
    + Store persistance 
    + JWT Authentication 
    + Redux thunk Middleware
_/


=============================
Redux:
    --------------------------------   STORE
    | STATE                              |
    |                        -------------------------
    |                        |           |           |
    |                       \|/         \|/         \|/
    |                     Reducer1    Reducer2    Reducer3
    |                     |     /|\   |     /|\   |     /|\
    |                    \|/     |   \|/     |   \|/     |
    |       ----------->   Action1     Action2     Action3
    |       |             |     /|\   |     /|\   |     /|\
    |       |            \|/     |   \|/     |   \|/     |
   \|/      |              \     \    \      /    /      /
COMPONENT----                        API-SERVER

Explain: 
    - We have all our states basically the global states in a store 
    and these states are stored by the reducers, means the states of
    type 1 will be stored in reducer 1, type 2 will be in reducer 2 ...
    - The next question is how these reducers get the state, so these
    reducers seek for a specefic action to change or to make a new 
    global state, and following the pineline, the action can receive 
    a state from two side, either from react component of from an api,
    so overall let's device the api is sending a new state towards the
    action and action is sending this request to the reducer
    - If we talk about our react component so our react component receive
    thus(therefor) global states from the Store, and now if any component
    wants to manipulate(control) any type of global state, then it will
    call a a specific type of action 
=================================

- in this project, we will use redux, redux-thunk and react-redux
- note:  before use axios, we have to config proxy in package.json
    this means proxy is a type of url that is accepteed by our application
    to interact because if we allow all the urls to interact with our app
    then there will be a lot of vulnerabilities, so to avoid this problem,
    at that, we have to declare inside that file, and at there, our proxy
    is local host of server: http://localhost:5000/
=================================
- cors: basically allow us to send requests throught the cross origin,
means we are sending requests from the port 3000 to the port 5000

=================================
useSelector
- We can use the useSelector hook to get the data from the Redux store in a React component.
- It takes 2 arguments. The first argument is a function that returns the state, and the second
argument is a function that checks if the previous and current state are equal to determine when to update.

useDispatch
- is a hook of react-redux which allows us to dispatch our actions without connecting our component with 
connect method.
=================================
JWT jsonWebTokens
- implement web tokens on server side, it very important and critical topic to understand
- jwt.sign(1, 2, 3):
    1: data from state return from server(choose any) to make signature(ussally is username and id)
    to combine become a hash token
    2: secret key cript of our signature
    3: time limt of our token, vd {expiresIn: "1h"}, so that token wanna be expire within 1hour, and 
    after that, he and she will login again
- and we will res.status(200).json({user, token}): user and token will be stored in our localstorage
and in our redux
==================================
In the document of mongodb, they say themselves that storing the images or any kind of media in the
mongodb database is not a good choice, you have to make a separate strategy
- and this project, we will store all of the multimedia in my server localstorage, and then when 
someone wants to fecth the data, i will simply call the name of that image from the localstorage
and display it on the UI
=================================
multer: make us a very easy and handy to upload the multimedia on the server side