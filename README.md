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

5. Saving Items with ShopingList Service
    * Update the ShoppingList Compoent to call the service to add new Item
    * Reset the form after the Item is added.
    * Display the newly added items on the below the form

6. Implement Delete Item from List
    * Implement slide to remove item
        ```html
        <ion-item-sliding *ngFor="let item of shoppingList; let i = index">
            <ion-item>
            <h2>{{item.name}}</h2>
            <ion-note item-end>{{item.amount}}</ion-note>
            </ion-item>
            <ion-item-options side="right">
                <button ion-button color="danger" (tap)="onRemoveItem(i)">
                <ion-icon name="trash"></ion-icon>
                Delete
                </button>
            </ion-item-options>
        </ion-item-sliding>
        ```

7. Implement Create New Recipe Page
    * Update the Recipe component's heard tpo add + button
    * Implement the onNewRecipe method to go to the Receipe Form Page
    * Implement Receipe Form Component with Reactive Approch
        * HTML implementation        
            ```html
            <form [formGroup]="recipeForm" (ngSubmit)="onSubmit()">
                <ion-list>
                    <ion-item>
                    <ion-label floating>Title</ion-label>
                    <ion-input type="text" formControlName="title"></ion-input> 
                    </ion-item>
                    <ion-item>
                        <ion-label floating>Description</ion-label>
                        <ion-textarea formControlName="description"></ion-textarea> 
                    </ion-item>
                    <ion-item>
                        <ion-label floating>Difficulty</ion-label>
                        <ion-select formControlName="difficulty" >
                            <ion-option *ngFor="let option of selectDifficultyOptions" [value]="option">{{ option }}</ion-option>
                        </ion-select>
                    </ion-item>
                </ion-list>
                <button type="submit" block ion-button [disabled]="recipeForm.invalid">{{mode}}</button>
            </form>
            ```
        * Initialize the form via FormGrop and Form Controll classes 
            ```javascript
                private initializeForm(){
                    this.recipeForm = new FormGroup({
                    title : new FormControl(null,Validators.required),
                    description : new FormControl(null,Validators.required),
                    deficulty: new FormControl('Medium',Validators.required)  
                    });
                }
            ```

8. Implment Add Ingreediants to the Recipe Form
    * Add manager ingredient Button to Open the Action Sheet.
        ```html
        <button type="button" clear ion-button block clear 
        (click)="onManageIngredients()">Manage Ingredients</button>
        ```
    * Show Action sheet on Manage Ingredegent Button clicked
        ```javascript
            onManageIngredients(){
                const  actionSheet = this.actionSheetCtr.create({
                title:'What do you want to do?',
                buttons: [
                    {
                    text: 'Add Ingredient',
                    handler: () => {
                        this.createNewIngredientAlert().present();
                    }
                    },
                    {
                    text: 'Remove all Ingredients',
                    handler: () => {
                    }
                    },
                    {
                    text:'Cancel',
                    role:'cancel'
                    }
                ]
                });
                actionSheet.present();
            }
        ```        
    * Show Aler button to on Add Ingredient Button Selected
        ```javascript
            private createNewIngredientAlert(){
                const newIngredientAlert = this.alertCtrl.create({
                title: 'Add Ingredient',
                inputs: [
                    {
                    name: 'name',
                    placeholder: "Name"
                    },
                ], 
                buttons: [
                    {
                    text: 'Cancel',
                    role:'cancel'

                    },
                    {
                    text: 'Add',
                    handler: data => {
                        if(data.name.trim()=='' || data.name == null){
                        return;
                        }
                        (<FormArray>this.recipeForm.get('ingredients')).
                        push(new FormControl(data.name,Validators.required));
                    }
                    }
                ]  
                });
                return newIngredientAlert;
            }
        ```
    * Implement Removing Ingredients Controls
        ```javascript
        {
          text: 'Remove all Ingredients',
          handler: () => {
            const  fArray: FormArray = <FormArray>this.recipeForm.get('ingredients');
            const len = fArray.length;
            if(len>0){
              for(let i = len-1;i>=0; i--){
                fArray.removeAt(i);
              }
            }
          }
        },
        ```
    * Show toast when user did not enter valid value 
        ```javascript
         if(data.name.trim()=='' || data.name == null){
              this.toastCtrl.create({
                message: 'Please Enter Valid Value',
                duration: 1000,
                position: 'bottom'
              }).present();
              return;
            }
        ```   

9. Implement Recipe Model and Service
    * Recipe Model
    ```javascript
        import { Ingrediant } from './ingrediant.model';
        export class Recipe{
            constructor(
                public title: string,
                public description: string,
                public difficulty: string,
                public ingredients: Ingrediant[]) {}
        }
    ```
    * Recipe Service
        `addRecipe`
        `removeRecipe`
        `getRecipes`
        `updateRecipe`

10. Save and display recipes 
    * Update the Recipe form onSave method to use the RecipeService to store data
    * Update the RecipeComponent to dipsplay recipe list   

11. Implement the Edit Page
    * Push data via Nav Controller
        ```javascript
        onEditRecipe(){
            this.navCtrl.push(RecipeFormPage,
                { mode:'Edit',
                recipe:this.recipe,
                index:this.index
                }
            );
        }
        ```
    * Update the initializeForm method to handle the edit mode
    ```javascript
        private initializeForm(){
            let title = null;
            let description = null;
            let difficulty = 'Medium';
            let ingredients = [];

            if(this.mode =='Edit'){
            title = this.recipe.title;
            description = this.recipe.description;
            difficulty = this.recipe.difficulty;
            for( let ingredient of this.recipe.ingredients ){
                console.log(ingredient);
                ingredients.push(new FormControl(ingredient.name,Validators.required));
            }
        }

    ```
    * Update the init method to suppror both edit and new mode
    ```javascript
        ngOnInit(){
            this.mode = this.navParams.get('mode');
            if(this.mode=='Edit'){
            this.recipe = this.navParams.get('recipe');
            this.index = this.navParams.get('index');
            }
            this.initializeForm();
        }
    ```
    * Update onSubmit method to call the server correct service method
    
12. Implement send ingrediants to shopping list and delete recipe

#Advance Features
* User Signup Authentication
* Save/Load Data from/to Firebase
* Resticted acces to pages      

## App Pages
SigninPage
SignupPage
Menu

1. Generate the Signup and SignIn pages
2. Implement the Side Menu
3. Implement the nav bar menu button

