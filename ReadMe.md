# Waste Management System


### Cloning and running the repository

```
$ git clone https://{{your username}}@bitbucket.org/itpproject2018/wastemanagement.git
$ cd wastemanagement
$ npm install
$ ng build
$ npm start
```

### Working with git
```
$ git status //to check the status
$ git branch //to check with branch you are working on
$ git branch <branch-name> //to create new branch
                        //make sure that you change <branch-name> with appropriate branch name
$ git checkout <branch-name>
```

#### Branch name convention
- Check the issue from the issue tab and look for the task assigned to you.
- Then name you branch using naming convention mentioned below

```
$ git branch WMP-issue_number
```


#### Example
If the issue number is 10 is assigned to you then you should follow steps described below:
```
$ git branch WMP-10
$ git checkout WMP-10
```


### Working on angular app
While you are working on angular app alone i.e making changes to design or website layout you could just use angular command to view the changes on the browser. So at this point you can just ignore the node server and API's and use angular command to run you code. That means you could use following command to run your code.

```
$ ng serve
      or
$ ng serve -o
      or
$ ng serve --open
```
Using the `--open` (or just `-o`) option will automatically open your browser on `http://localhost:4200/`

Remember, this steps will not allow you to use API provided by node server.

### Running node server

```
$ ng build
$ npm start
```
Alternatively, you can install `nodemon`. `Nodemon` is a utility that will monitor for any changes in your source and automatically restart your server. Perfect for development.Just use `nodemon` instead of node to run your code, and now your process will automatically restart when your code changes. You can install `nodemon` by using `npm` as mentioned below :
```
$ npm install -g nodemon
```
Running node server using nodemon :
```
$ ng build
$ nodemon
```
