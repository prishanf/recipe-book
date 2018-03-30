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
3. Implement the Shopping List input form
    * Add Shpping Item 
        ```html
            <form #f="ngForm" (ngSubmit)="onAddItem(f)"> <!-- Get a reference to ngForm via template variable and pass it to the onAddItem method -->
                <ion-list>
                    <ion-item>
                    <ion-label fixed>Name</ion-label>
                    <ion-input type="text" name="ingredientName" placeholder="Milk" required></ion-input>
                    </ion-item>
                    <ion-item>
                    <ion-label fixed>Amount</ion-label>
                    <ion-input type="number" name="amount" placeholder="2" required></ion-input>
                    </ion-item>
                 </ion-list>
                 <button ion-button type="submit" block>Add Item</button>
             </form>
        ``` 
    * Add validation and Disable the Add Item Button
        ```html
        <ion-input ngModel type="text" name="ingredientName" placeholder="Milk" required></ion-input>
        <ion-input ngModel type="number" name="amount" placeholder="2" required></ion-input>
        <button ion-button type="submit" block [disabled]="!f.valid">Add Item</button>
        ```

4. Implement the ShoppingList Service
    * Cretae Ingrediant Model class
    * Implement Shopping List Service Methods
        * `addItem(name:string, amount:numner)`
        * `addItems(ingrediants:Ingrediant[])`
        * `getItems(): Ingrediant[]`
        * `removeItem(index:number)`
    ```javascript
        @Injectable()
        export class ShppingListService {

            private shoppingList :Ingrediant[] =[];

            addItem(name:string,amount:number){
                this.shoppingList.push(new Ingrediant(name,amount));
            }

            addItems(items:Ingrediant[]){
                this.shoppingList.push(...items);
            }

            getItems(): Ingrediant[] {
                return this.shoppingList.slice();
            }

            removeItem(index: number){
                this.shoppingList.splice(index,1);
            }
        }
    ```