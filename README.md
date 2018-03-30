# Recipe Book Application

##Project Setup Steps
* `ionic start recipe-book`  create new project
* `$ cd ecipe-book`  change the dir to the new projct folder
* `code .`  open the project in VS code.

### Git Setup
* Create a git repostory in github
* `echo "# recipe-book" >> README.md`  create a read me file for the project
* `git add README.md` , `git commit -m "Add README.md"`  commit file to the git
* `git remote add origin https://github.com/{{your-git-account>}}/recipe-book.git`  Add remote repo 
* `git push -u origin master`  push to remote branch


## App Structure
###Main functionality of the App

* Display List of Recipes 
* Create New Recipe 
    * Receipe Info
    * Add/Remove Ingrediants
* Add ingridiants to shopping list
* Shopping List
* Add Items to Shopping list    
* Tabs panel to toggle between Recipes and Shopping List

## App Pages
ShoppingListPage
RecipesPage
RecipePage
RecipeFormPage
TabsPage

##Page Navigation
TabsPage -> RecipesPage , ShoppingListPage
RecipesPage -> New Recipe->(Manage Ingrediant)->(Add Ingrediant)->Add Ingrediant[Alert Input]
RecipesPage -> RecipePage->(Add Ingrediants to Shopping List)->ShoppingListPage

## Development Steps
1. Genertae Pages (`$ ionic g page <pagename>`)
    * ionic g page tabs
    * ionic g page recipes
    * ionic g page recipe
    * ionic g page recipe-form
    * ionic g page shopping-list

2. Implement navigation
    * Udpate the tabs.html file add the tabs
        ```html
        <ion-tabs>
            <ion-tab [root]="shopingListPage" tabIcon="list-box" tabTitle="Shopping List"></ion-tab>
            <ion-tab [root]="recipeBook" tabIcon="book" tabTitle="Recipes"></ion-tab>
        </ion-tabs>
        ```
    * Update the tabs.ts file with the tabPage pages variables
        ```javascript
            shopingListPage = ShoppingListPage;
            recipeBook = RecipesPage;
        ```
